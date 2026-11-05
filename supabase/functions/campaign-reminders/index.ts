// Daily campaign update (pg_cron, 08:00 Lagos): emails the admin what is still
// unfinished in the campaign tracker. The signed-in admin can also send it now.
// Pause scheduled runs with the CAMPAIGN_REMINDERS_PAUSED secret ("true").
import { ADMIN_EMAIL, SITE_URL, corsHeaders, isAdminRequest, json, serviceClient, todayLagos } from '../_shared/common.ts';
import { sendEmail } from '../_shared/email.ts';

interface Step {
  item_id: string;
  sort_order: number;
  label: string;
  done: boolean;
}

interface Item {
  id: string;
  campaign: string;
  grp: string | null;
  kind: 'ad' | 'task' | 'routine';
  sort_order: number;
  title: string;
  due_date: string | null;
  notes: string | null;
}

const CAMPAIGN_ORDER = ['Rebrand Launch Ads', 'Animation Ads', '90-Day Growth Plan'];

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function fmtDay(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const db = serviceClient();
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret) {
    const { data, error } = await db.rpc('crm_verify_cron_secret', { candidate: cronSecret });
    if (error || data !== true) return json({ error: 'Not authorized' }, 401);
    if (Deno.env.get('CAMPAIGN_REMINDERS_PAUSED') === 'true') return json({ ok: true, paused: true });
  } else if (!(await isAdminRequest(req))) {
    return json({ error: 'Not authorized' }, 401);
  }

  const [itemsRes, stepsRes] = await Promise.all([
    db.from('campaign_items').select('id, campaign, grp, kind, sort_order, title, due_date, notes'),
    db.from('campaign_steps').select('item_id, sort_order, label, done'),
  ]);
  if (itemsRes.error) return json({ error: itemsRes.error.message }, 500);
  if (stepsRes.error) return json({ error: stepsRes.error.message }, 500);

  const items = (itemsRes.data ?? []) as Item[];
  const steps = (stepsRes.data ?? []) as Step[];
  const stepsByItem = new Map<string, Step[]>();
  for (const s of steps) {
    const list = stepsByItem.get(s.item_id) ?? [];
    list.push(s);
    stepsByItem.set(s.item_id, list);
  }
  for (const list of stepsByItem.values()) list.sort((a, b) => a.sort_order - b.sort_order);

  const today = todayLagos();
  const soon = addDays(today, 3);
  const isFriday = new Date(`${today}T12:00:00Z`).getUTCDay() === 5;

  const tracked = items.filter((i) => i.kind !== 'routine');
  const totalSteps = steps.length;
  const doneSteps = steps.filter((s) => s.done).length;
  const pct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;

  const open = tracked
    .map((item) => {
      const list = stepsByItem.get(item.id) ?? [];
      const next = list.find((s) => !s.done);
      return { item, list, next };
    })
    .filter((x) => x.next)
    .sort(
      (a, b) =>
        CAMPAIGN_ORDER.indexOf(a.item.campaign) - CAMPAIGN_ORDER.indexOf(b.item.campaign) ||
        a.item.sort_order - b.item.sort_order,
    );

  const line = (x: (typeof open)[number]) => {
    const doneCount = x.list.filter((s) => s.done).length;
    const progress = x.item.kind === 'ad' ? ` (${doneCount}/${x.list.length})` : '';
    const nextStep = x.item.kind === 'ad' ? `: next, ${x.next!.label}` : '';
    const due = x.item.due_date ? ` [due ${fmtDay(x.item.due_date)}]` : '';
    return `- ${x.item.title}${progress}${nextStep}${due}`;
  };

  const overdue = open.filter((x) => x.item.due_date && x.item.due_date < today);
  const dueSoon = open.filter((x) => x.item.due_date && x.item.due_date >= today && x.item.due_date <= soon);
  const routines = items.filter((i) => i.kind === 'routine').sort((a, b) => a.sort_order - b.sort_order);

  if (open.length === 0) {
    return json({ ok: true, emailed: false, reason: 'everything is done' });
  }

  const sections: string[] = [`Progress: ${pct}% (${doneSteps} of ${totalSteps} steps done). ${open.length} item${open.length === 1 ? '' : 's'} still open.`];
  if (overdue.length) sections.push(`OVERDUE (${overdue.length}):\n${overdue.map(line).join('\n')}`);
  if (dueSoon.length) sections.push(`Due in the next 3 days (${dueSoon.length}):\n${dueSoon.map(line).join('\n')}`);

  for (const campaign of CAMPAIGN_ORDER) {
    const rows = open.filter((x) => x.item.campaign === campaign);
    if (!rows.length) continue;
    if (campaign === '90-Day Growth Plan') {
      const byGroup = new Map<string, typeof rows>();
      for (const r of rows) {
        const g = r.item.grp ?? 'Tasks';
        byGroup.set(g, [...(byGroup.get(g) ?? []), r]);
      }
      const parts = [...byGroup.entries()].map(([g, rs]) => `${g}:\n${rs.map(line).join('\n')}`);
      sections.push(`${campaign.toUpperCase()} (${rows.length} open)\n${parts.join('\n')}`);
    } else {
      sections.push(`${campaign.toUpperCase()} (${rows.length} unfinished)\n${rows.map(line).join('\n')}`);
    }
  }

  const routineLines = routines.map((r) => `- ${r.title}`);
  if (routineLines.length) {
    sections.push(`${isFriday ? "IT'S FRIDAY: review your weekly dashboard today.\n" : ''}Weekly routines:\n${routineLines.join('\n')}`);
  }

  const subject = `Campaign update: ${open.length} open${overdue.length ? `, ${overdue.length} overdue` : ''} (${pct}% done)`;
  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject,
      text: `Good morning,\n\nHere's what's left on the campaign tracker.\n\n${sections.join('\n\n')}\n\nUpdate progress here: ${SITE_URL}/admin (Campaign tab)`,
    });
  } catch (err) {
    console.error('Campaign reminder email failed:', err);
    return json({ error: 'Email failed to send' }, 500);
  }

  return json({ ok: true, emailed: true, open: open.length, overdue: overdue.length, pct });
});
