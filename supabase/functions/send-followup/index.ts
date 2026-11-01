// Admin-only: sends an approved follow-up draft (with any edits) and records
// the contact on the lead.
import { corsHeaders, isAdminRequest, json, serviceClient, tableFor, todayLagos, type SourceType } from '../_shared/common.ts';
import { sendEmail } from '../_shared/email.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!(await isAdminRequest(req))) return json({ error: 'Not authorized' }, 401);

  let body: { draft_id?: string; subject?: string; body?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  if (!body.draft_id) return json({ error: 'Invalid request' }, 400);

  const subject = body.subject?.trim();
  const text = body.body?.trim();
  if (subject !== undefined && !subject) return json({ error: 'Subject is empty' }, 400);
  if (text !== undefined && !text) return json({ error: 'Message is empty' }, 400);

  const db = serviceClient();
  const now = new Date().toISOString();

  // Claim the draft so it can't be sent twice.
  const { data: draft, error } = await db
    .from('followup_drafts')
    .update({
      status: 'sent',
      sent_at: now,
      ...(subject ? { subject } : {}),
      ...(text ? { body: text } : {}),
    })
    .eq('id', body.draft_id)
    .eq('status', 'pending')
    .select('*')
    .maybeSingle();

  if (error) return json({ error: error.message }, 500);
  if (!draft) return json({ error: 'Draft not found or already sent' }, 409);

  try {
    await sendEmail({ to: draft.to_email, subject: draft.subject, text: draft.body });
  } catch (err) {
    console.error('Follow-up send failed:', err);
    await db.from('followup_drafts').update({ status: 'pending', sent_at: null }).eq('id', draft.id);
    return json({ error: 'Email failed to send. Check the Gmail app password.' }, 500);
  }

  // Record the contact; clear a follow-up date that is now handled.
  const table = tableFor(draft.source_type as SourceType);
  const { data: lead } = await db.from(table).select('next_follow_up_at').eq('id', draft.source_id).maybeSingle();
  const update: Record<string, unknown> = { last_contacted_at: now };
  if (lead?.next_follow_up_at && lead.next_follow_up_at <= todayLagos()) update.next_follow_up_at = null;
  await db.from(table).update(update).eq('id', draft.source_id);

  return json({ ok: true, draft: { ...draft } });
});
