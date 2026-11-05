// Runs every morning (pg_cron, 08:00 Lagos). Finds leads that need a follow-up,
// asks Claude to draft one for each (saved as pending, never sent), and emails
// the admin a short summary. Can also be triggered by the signed-in admin.
import {
  ADMIN_EMAIL,
  SITE_URL,
  type DraftKind,
  type Lead,
  type SourceType,
  corsHeaders,
  isAdminRequest,
  json,
  serviceClient,
  todayLagos,
} from '../_shared/common.ts';
import { draftFollowUp } from '../_shared/ai.ts';
import { sendEmail } from '../_shared/email.ts';

const DAY = 24 * 60 * 60 * 1000;
const MAX_DRAFTS_PER_RUN = 8;
const QUOTE_CHECK_IN_DAYS = 3;
const QUIET_NUDGE_DAYS = 7;
const DRAFT_COOLDOWN_DAYS = 3;

interface Due {
  lead: Lead;
  source: SourceType;
  kind: DraftKind;
  reason: string;
}

const KIND_LABEL: Record<DraftKind, string> = {
  after_call: 'after-call follow-up',
  quote_check_in: 'quote check-in',
  nudge: 'friendly nudge',
  custom: 'follow-up',
};

async function authorized(req: Request): Promise<boolean> {
  const secret = req.headers.get('x-cron-secret');
  if (secret) {
    const { data, error } = await serviceClient().rpc('crm_verify_cron_secret', { candidate: secret });
    return !error && data === true;
  }
  return isAdminRequest(req);
}

function decide(lead: Lead, source: SourceType, today: string, now: number): Due | null {
  if (lead.stage === 'won' || lead.stage === 'lost') return null;
  const lastTouch = new Date(lead.last_contacted_at ?? lead.created_at).getTime();
  const daysQuiet = Math.floor((now - lastTouch) / DAY);
  const callDate = lead.preferred_date;
  const callHappened = !!callDate && callDate < today;
  const callUpcoming = !!callDate && callDate >= today;

  // 1. A follow-up date the admin set has arrived.
  if (lead.next_follow_up_at && lead.next_follow_up_at <= today) {
    const kind: DraftKind =
      lead.stage === 'quote_sent' ? 'quote_check_in' : lead.stage === 'call_booked' && callHappened ? 'after_call' : 'nudge';
    return { lead, source, kind, reason: `follow-up date (${lead.next_follow_up_at})` };
  }

  // 2. Quote sent, no reply.
  if (lead.stage === 'quote_sent' && daysQuiet >= QUOTE_CHECK_IN_DAYS) {
    return { lead, source, kind: 'quote_check_in', reason: `quote sent, quiet for ${daysQuiet} days` };
  }

  // 3. Call happened, not contacted since.
  if (lead.stage === 'call_booked' && callHappened && lastTouch < new Date(`${callDate}T23:59:59Z`).getTime()) {
    return { lead, source, kind: 'after_call', reason: `call was on ${callDate}` };
  }

  // 4. Went quiet (skip if their call is still ahead).
  if ((lead.stage === 'new' || lead.stage === 'call_booked') && !callUpcoming && daysQuiet >= QUIET_NUDGE_DAYS) {
    return { lead, source, kind: 'nudge', reason: `quiet for ${daysQuiet} days` };
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!(await authorized(req))) return json({ error: 'Not authorized' }, 401);

  // Scheduled runs can be paused with the DAILY_DIGEST_PAUSED secret ("true").
  if (req.headers.get('x-cron-secret') && Deno.env.get('DAILY_DIGEST_PAUSED') === 'true') {
    return json({ ok: true, paused: true });
  }

  const db = serviceClient();
  const today = todayLagos();
  const now = Date.now();

  const [bookingsRes, inquiriesRes, draftsRes] = await Promise.all([
    db.from('bookings').select('*').not('stage', 'in', '(won,lost)'),
    db.from('inquiries').select('*').not('stage', 'in', '(won,lost)'),
    db
      .from('followup_drafts')
      .select('source_type, source_id, status, created_at')
      .or(`status.eq.pending,created_at.gte."${new Date(now - DRAFT_COOLDOWN_DAYS * DAY).toISOString()}"`),
  ]);
  const firstError = bookingsRes.error ?? inquiriesRes.error ?? draftsRes.error;
  if (firstError) return json({ error: firstError.message }, 500);

  const recentlyDrafted = new Set((draftsRes.data ?? []).map((d) => `${d.source_type}:${d.source_id}`));

  const leads: { lead: Lead; source: SourceType }[] = [
    ...((bookingsRes.data ?? []) as Lead[]).map((lead) => ({ lead, source: 'booking' as const })),
    ...((inquiriesRes.data ?? []) as Lead[]).map((lead) => ({ lead, source: 'inquiry' as const })),
  ];

  const due = leads
    .map(({ lead, source }) => decide(lead, source, today, now))
    .filter((d): d is Due => d !== null && !recentlyDrafted.has(`${d.source}:${d.lead.id}`));

  const toDraft = due.slice(0, MAX_DRAFTS_PER_RUN);
  const results = await Promise.allSettled(
    toDraft.map(async (d) => {
      const draft = await draftFollowUp(d.lead, d.source, d.kind);
      const { error } = await db.from('followup_drafts').insert({
        source_type: d.source,
        source_id: d.lead.id,
        to_email: d.lead.email,
        to_name: d.lead.full_name,
        kind: d.kind,
        subject: draft.subject,
        body: draft.body,
      });
      if (error) throw error;
    }),
  );
  const failed = results.filter((r) => r.status === 'rejected');
  failed.forEach((r) => console.error('Digest draft failed:', (r as PromiseRejectedResult).reason));

  const { count: pendingCount } = await db
    .from('followup_drafts')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');

  const since = now - DAY;
  const newLeads = leads.filter(({ lead }) => new Date(lead.created_at).getTime() >= since);

  const nothingToReport = newLeads.length === 0 && due.length === 0 && !pendingCount;
  if (!nothingToReport) {
    const sections: string[] = [];
    if (newLeads.length) {
      sections.push(
        `New in the last 24 hours (${newLeads.length}):\n` +
          newLeads
            .map(({ lead, source }) => `- ${lead.full_name ?? lead.email} (${source === 'booking' ? 'call booked' : 'enquiry'}${lead.project_type ? `, ${lead.project_type}` : ''})`)
            .join('\n'),
      );
    }
    if (due.length) {
      sections.push(
        `Follow up today (${due.length}):\n` +
          due.map((d) => `- ${d.lead.full_name ?? d.lead.email}: ${KIND_LABEL[d.kind]} (${d.reason})`).join('\n'),
      );
    }
    sections.push(`Drafts waiting for your approval: ${pendingCount ?? 0}`);
    if (failed.length) sections.push(`Note: ${failed.length} draft(s) could not be written automatically. You can draft them from the admin.`);

    try {
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `Phel Arts daily summary: ${due.length} follow-up${due.length === 1 ? '' : 's'}, ${newLeads.length} new`,
        text: `Good morning,\n\n${sections.join('\n\n')}\n\nReview and send drafts here: ${SITE_URL}/admin`,
      });
    } catch (err) {
      console.error('Digest email failed:', err);
      return json({ error: 'Digest email failed', drafted: toDraft.length - failed.length }, 500);
    }
  }

  return json({
    ok: true,
    newLeads: newLeads.length,
    due: due.length,
    drafted: toDraft.length - failed.length,
    failed: failed.length,
    pending: pendingCount ?? 0,
    emailed: !nothingToReport,
  });
});
