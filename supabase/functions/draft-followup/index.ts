// Admin-only: asks Claude to write a follow-up email for one lead and saves it
// as a pending draft. Nothing is sent from here.
import { type DraftKind, type Lead, type SourceType, corsHeaders, isAdminRequest, json, serviceClient, tableFor } from '../_shared/common.ts';
import { draftFollowUp } from '../_shared/ai.ts';

const KINDS: DraftKind[] = ['after_call', 'quote_check_in', 'nudge', 'custom'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!(await isAdminRequest(req))) return json({ error: 'Not authorized' }, 401);

  let body: { source_type?: SourceType; source_id?: string; kind?: DraftKind; instructions?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { source_type, source_id, kind } = body;
  if ((source_type !== 'booking' && source_type !== 'inquiry') || !source_id || !kind || !KINDS.includes(kind)) {
    return json({ error: 'Invalid request' }, 400);
  }
  const instructions = (body.instructions ?? '').slice(0, 1000);
  if (kind === 'custom' && !instructions.trim()) {
    return json({ error: 'Add instructions for a custom draft' }, 400);
  }

  const db = serviceClient();
  const { data: lead, error } = await db.from(tableFor(source_type)).select('*').eq('id', source_id).maybeSingle();
  if (error) return json({ error: error.message }, 500);
  if (!lead) return json({ error: 'Lead not found' }, 404);

  try {
    const draft = await draftFollowUp(lead as Lead, source_type, kind, instructions);
    const { data: saved, error: insertError } = await db
      .from('followup_drafts')
      .insert({
        source_type,
        source_id,
        to_email: (lead as Lead).email,
        to_name: (lead as Lead).full_name,
        kind,
        subject: draft.subject,
        body: draft.body,
      })
      .select('*')
      .single();
    if (insertError) throw insertError;
    return json({ draft: saved });
  } catch (err) {
    console.error('Draft failed:', err);
    return json({ error: err instanceof Error ? err.message : 'Draft failed' }, 500);
  }
});
