import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../config/supabase';
import {
  DRAFT_KINDS,
  STAGES,
  type DraftKind,
  type FollowUpDraft,
  type LeadStage,
  type SourceType,
  invokeFunction,
} from './crm';

export interface CrmFields {
  id: string;
  stage?: LeadStage | null;
  notes?: string | null;
  next_follow_up_at?: string | null;
  last_contacted_at?: string | null;
  confirmation_sent_at?: string | null;
}

interface Props {
  row: CrmFields;
  sourceType: SourceType;
  onUpdated: (id: string, patch: Partial<CrmFields>) => void;
  onDrafted: (draft: FollowUpDraft) => void;
}

const fmtShort = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function LeadCrm({ row, sourceType, onUpdated, onDrafted }: Props) {
  const table = sourceType === 'booking' ? 'bookings' : 'inquiries';
  const [notes, setNotes] = useState(row.notes ?? '');
  const [saving, setSaving] = useState(false);
  const [kind, setKind] = useState<DraftKind>(sourceType === 'booking' ? 'after_call' : 'nudge');
  const [instructions, setInstructions] = useState('');
  const [drafting, setDrafting] = useState(false);

  useEffect(() => setNotes(row.notes ?? ''), [row.notes]);

  const save = async (patch: Partial<CrmFields>) => {
    setSaving(true);
    const { error } = await supabase.from(table).update(patch).eq('id', row.id);
    setSaving(false);
    if (error) {
      console.error('CRM update failed:', error);
      toast.error('Could not save.');
      return false;
    }
    onUpdated(row.id, patch);
    return true;
  };

  const saveNotes = async () => {
    if ((row.notes ?? '') === notes) return;
    if (await save({ notes: notes.trim() || null })) toast.success('Notes saved.');
  };

  const markContacted = async () => {
    if (await save({ last_contacted_at: new Date().toISOString() })) toast.success('Marked as contacted.');
  };

  const draft = async () => {
    if (kind === 'custom' && !instructions.trim()) {
      toast.error('Tell the AI what the email should say.');
      return;
    }
    setDrafting(true);
    try {
      const res = await invokeFunction<{ draft: FollowUpDraft }>('draft-followup', {
        source_type: sourceType,
        source_id: row.id,
        kind,
        instructions,
      });
      onDrafted(res.draft);
      setInstructions('');
      toast.success('Draft ready in "To approve".');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not write a draft.');
    } finally {
      setDrafting(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-black/[0.06] bg-[#f7f5f1] p-4">
      <div className="grid gap-4 lg:grid-cols-[auto_auto_1fr]">
        <label className="text-xs font-semibold text-[#6b6b73]">
          Stage
          <select
            value={row.stage ?? 'new'}
            onChange={(e) => save({ stage: e.target.value as LeadStage })}
            disabled={saving}
            className="mt-1 block w-full rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm font-medium text-[#16161a]"
          >
            {STAGES.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#6b6b73]">
          Next follow-up
          <input
            type="date"
            value={row.next_follow_up_at ?? ''}
            onChange={(e) => save({ next_follow_up_at: e.target.value || null })}
            disabled={saving}
            className="mt-1 block w-full rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]"
          />
        </label>
        <label className="text-xs font-semibold text-[#6b6b73]">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            rows={2}
            placeholder="Private notes (the AI uses these when drafting)"
            className="mt-1 block w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm font-normal text-[#16161a]"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6b6b73]">
        <span>
          Confirmation email:{' '}
          {row.confirmation_sent_at ? (
            <span className="inline-flex items-center gap-1 text-[#0f5132]"><CheckCircle2 className="h-3 w-3" />sent {fmtShort(row.confirmation_sent_at)}</span>
          ) : (
            'not sent'
          )}
        </span>
        <span>Last contacted: {row.last_contacted_at ? fmtShort(row.last_contacted_at) : 'never'}</span>
        <button type="button" onClick={markContacted} disabled={saving} className="font-semibold text-[#16161a] underline-offset-2 hover:underline">
          Mark contacted now
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as DraftKind)}
          className="rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]"
        >
          {DRAFT_KINDS.map((k) => (
            <option key={k.key} value={k.key}>{k.label}</option>
          ))}
        </select>
        {kind === 'custom' && (
          <input
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            maxLength={1000}
            placeholder="e.g. Send the revised quote and mention the 2-week turnaround"
            className="flex-1 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]"
          />
        )}
        <button
          type="button"
          onClick={draft}
          disabled={drafting}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#16161a] bg-[#16161a] px-4 py-2 text-sm font-semibold text-[#f7f5f1] transition-colors hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#16161a] disabled:opacity-60"
        >
          {drafting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>{drafting ? 'Writing...' : 'Draft follow-up with AI'}</span>
        </button>
      </div>
    </div>
  );
}
