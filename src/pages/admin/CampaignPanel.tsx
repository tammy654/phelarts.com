import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Check, ChevronDown, ChevronUp, Loader2, Mail, Repeat } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { invokeFunction } from './crm';

interface CampaignStep {
  id: string;
  item_id: string;
  sort_order: number;
  label: string;
  done: boolean;
  done_at: string | null;
}

interface CampaignItem {
  id: string;
  slug: string;
  campaign: string;
  grp: string | null;
  kind: 'ad' | 'task' | 'routine';
  sort_order: number;
  title: string;
  format: string | null;
  headline: string | null;
  caption: string | null;
  cta: string | null;
  details: string | null;
  due_date: string | null;
  notes: string | null;
}

const CAMPAIGN_ORDER = ['Rebrand Launch Ads', 'Animation Ads', '90-Day Growth Plan'];

const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date());

function ItemCard({
  item,
  steps,
  onToggle,
  onSaveItem,
}: {
  item: CampaignItem;
  steps: CampaignStep[];
  onToggle: (step: CampaignStep) => void;
  onSaveItem: (id: string, patch: Partial<CampaignItem>) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(item.notes ?? '');
  useEffect(() => setNotes(item.notes ?? ''), [item.notes]);

  const doneCount = steps.filter((s) => s.done).length;
  const complete = steps.length > 0 && doneCount === steps.length;
  const overdue = !!item.due_date && !complete && item.due_date < todayIso();
  const hasBrief = !!(item.headline || item.caption || item.cta || item.details);
  const singleStep = item.kind === 'task' && steps.length === 1 ? steps[0] : null;

  const saveNotes = async () => {
    if ((item.notes ?? '') === notes) return;
    if (await onSaveItem(item.id, { notes: notes.trim() || null })) toast.success('Notes saved.');
  };

  return (
    <div className={`p-4 sm:p-5 ${complete ? 'bg-[#0f5132]/[0.03]' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {singleStep && (
            <button
              type="button"
              onClick={() => onToggle(singleStep)}
              aria-pressed={singleStep.done}
              aria-label={singleStep.done ? 'Mark not done' : 'Mark done'}
              className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                singleStep.done ? 'border-[#0f5132] bg-[#0f5132] text-white' : 'border-black/20 bg-white hover:border-[#0f5132]'
              }`}
            >
              {singleStep.done && <Check className="h-4 w-4" />}
            </button>
          )}
          {item.kind === 'routine' && <Repeat className="mt-1 h-4 w-4 flex-shrink-0 text-[#b45309]" />}
          <div className="min-w-0">
            <div className={`font-display font-bold text-[#16161a] ${item.kind === 'ad' ? 'text-lg' : 'text-base'} ${singleStep?.done ? 'line-through opacity-60' : ''}`}>
              {item.title}
            </div>
            {item.format && <div className="text-xs text-[#6b6b73]">{item.format}</div>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {item.kind === 'ad' && (
            <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${complete ? 'border-[#0f5132]/30 bg-[#0f5132]/10 text-[#0f5132]' : 'border-black/[0.08] bg-[#f7f5f1] text-[#16161a]'}`}>
              {complete ? 'Ready' : `${doneCount}/${steps.length}`}
            </span>
          )}
          {item.kind !== 'routine' && (
            <input
              type="date"
              value={item.due_date ?? ''}
              onChange={(e) => onSaveItem(item.id, { due_date: e.target.value || null })}
              aria-label="Due date"
              className={`rounded-lg border bg-white px-2 py-1 text-xs ${overdue ? 'border-red-400 text-red-600' : 'border-black/[0.08] text-[#16161a]'}`}
            />
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-[#6b6b73] hover:text-[#16161a]"
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {hasBrief ? 'Brief & notes' : 'Notes'}
          </button>
        </div>
      </div>

      {item.kind === 'ad' && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onToggle(s)}
              aria-pressed={s.done}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                s.done ? 'border-[#0f5132] bg-[#0f5132] text-white' : 'border-black/[0.1] bg-white text-[#3a3a42] hover:border-[#0f5132]'
              }`}
            >
              {s.done && <Check className="h-3 w-3" />}
              {s.label}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="mt-3 space-y-2 rounded-xl bg-[#f7f5f1] p-3 text-sm text-[#3a3a42]">
          {item.headline && <p><span className="font-semibold text-[#16161a]">Headline:</span> {item.headline}</p>}
          {item.caption && <p><span className="font-semibold text-[#16161a]">Caption:</span> {item.caption}</p>}
          {item.cta && <p><span className="font-semibold text-[#16161a]">CTA:</span> {item.cta}</p>}
          {item.details && <p className="whitespace-pre-wrap">{item.details}</p>}
          <label className="block text-xs font-semibold text-[#6b6b73]">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              rows={2}
              placeholder="Progress notes, file locations, blockers..."
              className="mt-1 block w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm font-normal text-[#16161a]"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default function CampaignPanel() {
  const [items, setItems] = useState<CampaignItem[]>([]);
  const [steps, setSteps] = useState<CampaignStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [itemsRes, stepsRes] = await Promise.all([
        supabase.from('campaign_items').select('*').order('sort_order'),
        supabase.from('campaign_steps').select('*').order('sort_order'),
      ]);
      if (!mounted) return;
      if (itemsRes.error || stepsRes.error) {
        console.error('Campaign load failed:', itemsRes.error ?? stepsRes.error);
        toast.error('Could not load the campaign tracker.');
      } else {
        setItems(itemsRes.data as CampaignItem[]);
        setSteps(stepsRes.data as CampaignStep[]);
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const stepsByItem = useMemo(() => {
    const map = new Map<string, CampaignStep[]>();
    for (const s of steps) map.set(s.item_id, [...(map.get(s.item_id) ?? []), s]);
    for (const list of map.values()) list.sort((a, b) => a.sort_order - b.sort_order);
    return map;
  }, [steps]);

  const toggle = async (step: CampaignStep) => {
    const done = !step.done;
    const done_at = done ? new Date().toISOString() : null;
    setSteps((cur) => cur.map((s) => (s.id === step.id ? { ...s, done, done_at } : s)));
    const { error } = await supabase.from('campaign_steps').update({ done, done_at }).eq('id', step.id);
    if (error) {
      console.error('Step update failed:', error);
      setSteps((cur) => cur.map((s) => (s.id === step.id ? step : s)));
      toast.error('Could not save.');
    }
  };

  const saveItem = async (id: string, patch: Partial<CampaignItem>) => {
    const { error } = await supabase
      .from('campaign_items')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      console.error('Item update failed:', error);
      toast.error('Could not save.');
      return false;
    }
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    return true;
  };

  const sendNow = async () => {
    setSending(true);
    try {
      const res = await invokeFunction<{ emailed: boolean; reason?: string }>('campaign-reminders', {});
      toast.success(res.emailed ? 'Update sent to phelarts@gmail.com' : 'Nothing left to do, so no email was sent.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not send the update.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-[#16161a]" /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6b6b73]">
        The campaign tracker is empty. Run the campaign tracker SQL script in Supabase to load it.
      </div>
    );
  }

  const totalSteps = steps.length;
  const doneSteps = steps.filter((s) => s.done).length;
  const pct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const ads = items.filter((i) => i.kind === 'ad');
  const adsReady = ads.filter((a) => {
    const list = stepsByItem.get(a.id) ?? [];
    return list.length > 0 && list.every((s) => s.done);
  }).length;

  const rank = (c: string) => {
    const i = CAMPAIGN_ORDER.indexOf(c);
    return i === -1 ? CAMPAIGN_ORDER.length : i;
  };
  const campaigns = [...new Set(items.map((i) => i.campaign))].sort((a, b) => rank(a) - rank(b));

  return (
    <div>
      <div className="border-b border-black/[0.05] p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-display text-3xl font-bold text-[#16161a]">{pct}%</div>
            <div className="text-sm text-[#6b6b73]">
              {adsReady} of {ads.length} ads ready · {doneSteps} of {totalSteps} steps complete
            </div>
          </div>
          <button
            type="button"
            onClick={sendNow}
            disabled={sending}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#16161a] bg-[#16161a] px-4 py-2 text-sm font-semibold text-[#f7f5f1] hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#16161a] disabled:opacity-60"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Email me today's update
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/[0.06]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#0f5132] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-[#6b6b73]">A summary of unfinished items is emailed to phelarts@gmail.com every morning at 8am.</p>
      </div>

      {campaigns.map((campaign) => {
        const rows = items.filter((i) => i.campaign === campaign).sort((a, b) => a.sort_order - b.sort_order);
        const groups = [...new Set(rows.map((r) => r.grp ?? ''))];
        return (
          <section key={campaign} className="border-b border-black/[0.05] last:border-b-0">
            <h3 className="bg-[#f7f5f1] px-5 py-3 font-display text-lg font-bold text-[#16161a]">{campaign}</h3>
            {groups.map((g) => (
              <div key={g || 'none'}>
                {g && <div className="px-5 pt-4 text-xs font-bold uppercase tracking-wider text-[#b45309]">{g}</div>}
                <div className="divide-y divide-black/[0.05]">
                  {rows
                    .filter((r) => (r.grp ?? '') === g)
                    .map((item) => (
                      <ItemCard key={item.id} item={item} steps={stepsByItem.get(item.id) ?? []} onToggle={toggle} onSaveItem={saveItem} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
