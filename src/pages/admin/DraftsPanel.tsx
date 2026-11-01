import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Send, X } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { DRAFT_KINDS, type FollowUpDraft, invokeFunction } from './crm';

interface Props {
  drafts: FollowUpDraft[];
  onRemoved: (id: string) => void;
}

const kindLabel = (k: string) => DRAFT_KINDS.find((d) => d.key === k)?.label ?? k;

function DraftCard({ draft, onRemoved }: { draft: FollowUpDraft; onRemoved: (id: string) => void }) {
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [busy, setBusy] = useState<'send' | 'discard' | null>(null);

  const send = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error('Subject and message cannot be empty.');
      return;
    }
    setBusy('send');
    try {
      await invokeFunction('send-followup', { draft_id: draft.id, subject, body });
      toast.success(`Sent to ${draft.to_email}`);
      onRemoved(draft.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not send.');
    } finally {
      setBusy(null);
    }
  };

  const discard = async () => {
    setBusy('discard');
    const { error } = await supabase.from('followup_drafts').update({ status: 'discarded' }).eq('id', draft.id);
    setBusy(null);
    if (error) {
      console.error('Discard failed:', error);
      toast.error('Could not discard.');
      return;
    }
    onRemoved(draft.id);
  };

  return (
    <div className="p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-display text-lg font-bold text-[#16161a]">{draft.to_name || draft.to_email}</span>
        <span className="text-[#6b6b73]">{draft.to_email}</span>
        <span className="rounded-full border border-black/[0.08] bg-[#f7f5f1] px-2 py-0.5 text-xs font-semibold text-[#6b6b73]">
          {kindLabel(draft.kind)}
        </span>
        <span className="text-xs text-[#6b6b73]">from {draft.source_type}</span>
      </div>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="mb-2 w-full rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm font-semibold text-[#16161a]"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={9}
        className="w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm leading-relaxed text-[#16161a]"
      />
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={discard}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-4 py-2 text-sm font-semibold text-[#16161a] hover:bg-black/[0.03] disabled:opacity-60"
        >
          {busy === 'discard' ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          <span>Discard</span>
        </button>
        <button
          type="button"
          onClick={send}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b] bg-[#f59e0b] px-4 py-2 text-sm font-bold text-[#16161a] hover:bg-[#fbbf24] disabled:opacity-60"
        >
          {busy === 'send' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span>{busy === 'send' ? 'Sending...' : 'Approve & send'}</span>
        </button>
      </div>
    </div>
  );
}

export default function DraftsPanel({ drafts, onRemoved }: Props) {
  if (drafts.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mb-1 font-semibold text-[#16161a]">Nothing to approve</div>
        <div className="text-sm text-[#6b6b73]">
          AI follow-up drafts appear here. They are written every morning, or when you click "Draft follow-up with AI" on a lead.
        </div>
      </div>
    );
  }
  return (
    <div className="divide-y divide-black/[0.05]">
      {drafts.map((d) => (
        <DraftCard key={d.id} draft={d} onRemoved={onRemoved} />
      ))}
    </div>
  );
}
