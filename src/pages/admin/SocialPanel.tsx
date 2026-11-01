import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Copy, ExternalLink, Facebook, Instagram, Loader2, Sparkles, Image as ImageIcon, Check, X, CalendarClock } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { invokeFunction } from './crm';

export interface SocialPost {
  id: string;
  post_date: string | null;
  pillar: string | null;
  theme: string | null;
  facebook_text: string;
  instagram_caption: string;
  hashtags: string;
  visual_idea: string | null;
  status: 'draft' | 'scheduled' | 'posted' | 'discarded';
  created_at: string;
  updated_at: string;
}

type StatusFilter = 'draft' | 'scheduled' | 'posted';

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'draft', label: 'Drafts' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'posted', label: 'Posted' },
];

const META_COMPOSER = 'https://business.facebook.com/latest/composer';

async function copy(text: string, what: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${what} copied`);
  } catch {
    toast.error('Could not copy. Select the text and copy it manually.');
  }
}

const fmtDay = (iso: string | null) =>
  iso
    ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
    : 'No date';

function PostCard({ post, onChanged }: { post: SocialPost; onChanged: (p: SocialPost | null) => void }) {
  const [fb, setFb] = useState(post.facebook_text);
  const [ig, setIg] = useState(post.instagram_caption);
  const [tags, setTags] = useState(post.hashtags);
  const [date, setDate] = useState(post.post_date ?? '');
  const [busy, setBusy] = useState(false);

  const dirty = fb !== post.facebook_text || ig !== post.instagram_caption || tags !== post.hashtags || date !== (post.post_date ?? '');

  const update = async (patch: Partial<SocialPost>, message?: string) => {
    setBusy(true);
    const { data, error } = await supabase
      .from('social_posts')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', post.id)
      .select('*')
      .single();
    setBusy(false);
    if (error) {
      console.error('Social post update failed:', error);
      toast.error('Could not save.');
      return;
    }
    if (message) toast.success(message);
    onChanged(data as SocialPost);
  };

  const saveEdits = () =>
    update({ facebook_text: fb.trim(), instagram_caption: ig.trim(), hashtags: tags.trim(), post_date: date || null }, 'Saved.');

  const setStatus = async (status: SocialPost['status'], message: string) => {
    const patch: Partial<SocialPost> = { status };
    if (dirty) Object.assign(patch, { facebook_text: fb.trim(), instagram_caption: ig.trim(), hashtags: tags.trim(), post_date: date || null });
    await update(patch, message);
  };

  const igFull = `${ig.trim()}\n\n${tags.trim()}`.trim();

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-display text-lg font-bold text-[#16161a]">
            <CalendarClock className="h-4 w-4 text-[#b45309]" /> {fmtDay(date || null)}
          </span>
          {post.pillar && (
            <span className="rounded-full border border-black/[0.08] bg-[#f7f5f1] px-2 py-0.5 text-xs font-semibold capitalize text-[#6b6b73]">{post.pillar}</span>
          )}
          {post.theme && <span className="text-xs text-[#6b6b73]">Theme: {post.theme}</span>}
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Post date"
          className="rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-sm text-[#16161a]"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16161a]"><Facebook className="h-4 w-4 text-[#1877f2]" /> Facebook</span>
            <button type="button" onClick={() => copy(fb.trim(), 'Facebook post')} className="inline-flex items-center gap-1 text-xs font-semibold text-[#16161a] hover:text-[#b45309]">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
          <textarea value={fb} onChange={(e) => setFb(e.target.value)} rows={8} className="w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm leading-relaxed text-[#16161a]" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16161a]"><Instagram className="h-4 w-4 text-[#d6249f]" /> Instagram</span>
            <button type="button" onClick={() => copy(igFull, 'Instagram caption and hashtags')} className="inline-flex items-center gap-1 text-xs font-semibold text-[#16161a] hover:text-[#b45309]">
              <Copy className="h-3.5 w-3.5" /> Copy caption + hashtags
            </button>
          </div>
          <textarea value={ig} onChange={(e) => setIg(e.target.value)} rows={6} className="w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm leading-relaxed text-[#16161a]" />
          <textarea value={tags} onChange={(e) => setTags(e.target.value)} rows={2} aria-label="Hashtags" className="mt-2 w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs text-[#0f5132]" />
        </div>
      </div>

      {post.visual_idea && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#f7f5f1] px-3 py-2 text-sm text-[#3a3a42]">
          <ImageIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b45309]" />
          <span><span className="font-semibold">Visual idea:</span> {post.visual_idea}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {dirty && (
          <button type="button" onClick={saveEdits} disabled={busy} className="rounded-full border border-black/[0.1] px-4 py-2 text-sm font-semibold text-[#16161a] hover:bg-black/[0.03] disabled:opacity-60">
            Save edits
          </button>
        )}
        {post.status !== 'posted' && (
          <button type="button" onClick={() => setStatus('discarded', 'Discarded.')} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-4 py-2 text-sm font-semibold text-[#16161a] hover:bg-black/[0.03] disabled:opacity-60">
            <X className="h-4 w-4" /> Discard
          </button>
        )}
        {post.status === 'draft' && (
          <button type="button" onClick={() => setStatus('scheduled', 'Marked as scheduled.')} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full border border-[#16161a] bg-[#16161a] px-4 py-2 text-sm font-semibold text-[#f7f5f1] hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#16161a] disabled:opacity-60">
            <CalendarClock className="h-4 w-4" /> Mark scheduled
          </button>
        )}
        {post.status !== 'posted' && (
          <button type="button" onClick={() => setStatus('posted', 'Marked as posted.')} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b] bg-[#f59e0b] px-4 py-2 text-sm font-bold text-[#16161a] hover:bg-[#fbbf24] disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Mark posted
          </button>
        )}
      </div>
    </div>
  );
}

export default function SocialPanel() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('draft');
  const [brief, setBrief] = useState('');
  const [savedBrief, setSavedBrief] = useState('');
  const [savingBrief, setSavingBrief] = useState(false);
  const [theme, setTheme] = useState('');
  const [count, setCount] = useState(4);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [postsRes, briefRes] = await Promise.all([
        supabase.from('social_posts').select('*').neq('status', 'discarded').order('post_date', { ascending: true }),
        supabase.from('marketing_settings').select('value').eq('key', 'social_brief').maybeSingle(),
      ]);
      if (!mounted) return;
      if (postsRes.error) {
        console.error('Social load failed:', postsRes.error);
        toast.error('Could not load social posts.');
      } else {
        setPosts((postsRes.data as SocialPost[]) ?? []);
      }
      const value = briefRes.data?.value ?? '';
      setBrief(value);
      setSavedBrief(value);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const visible = useMemo(() => posts.filter((p) => p.status === filter), [posts, filter]);
  const countFor = (s: StatusFilter) => posts.filter((p) => p.status === s).length;

  const saveBrief = async () => {
    setSavingBrief(true);
    const { error } = await supabase
      .from('marketing_settings')
      .upsert({ key: 'social_brief', value: brief.trim(), updated_at: new Date().toISOString() });
    setSavingBrief(false);
    if (error) {
      console.error('Brief save failed:', error);
      toast.error('Could not save the brief.');
      return false;
    }
    setSavedBrief(brief.trim());
    toast.success('Brief saved.');
    return true;
  };

  const generate = async () => {
    if (brief.trim() !== savedBrief && !(await saveBrief())) return;
    setGenerating(true);
    try {
      const res = await invokeFunction<{ posts: SocialPost[] }>('social-drafts', { count, theme });
      setPosts((cur) => [...cur, ...res.posts].sort((a, b) => (a.post_date ?? '').localeCompare(b.post_date ?? '')));
      setFilter('draft');
      setTheme('');
      toast.success(`${res.posts.length} post${res.posts.length === 1 ? '' : 's'} drafted.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not draft posts.');
    } finally {
      setGenerating(false);
    }
  };

  const onChanged = (id: string) => (p: SocialPost | null) =>
    setPosts((cur) => (p ? cur.map((x) => (x.id === id ? p : x)).filter((x) => x.status !== 'discarded') : cur.filter((x) => x.id !== id)));

  return (
    <div>
      <div className="grid gap-4 border-b border-black/[0.05] p-5 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[#16161a]">
            Brief for the AI
            <span className="ml-1 font-normal text-[#6b6b73]">(current offers, real projects it may mention, upcoming events)</span>
          </label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            placeholder="e.g. We just finished a 60s explainer for Kemi's Kitchen (OK to mention). Promoting AI Videos this month. Black Friday: free extra aspect ratio on Starter."
            className="mt-1.5 w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]"
          />
          {brief.trim() !== savedBrief && (
            <button type="button" onClick={saveBrief} disabled={savingBrief} className="mt-2 rounded-full border border-black/[0.1] px-4 py-1.5 text-sm font-semibold text-[#16161a] hover:bg-black/[0.03] disabled:opacity-60">
              {savingBrief ? 'Saving...' : 'Save brief'}
            </button>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[#16161a]">
            Generate posts now <span className="font-normal text-[#6b6b73]">(4 are also drafted every Monday at 8am)</span>
          </label>
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            maxLength={500}
            placeholder="Optional theme, e.g. Christmas promo for AI videos"
            className="mt-1.5 w-full rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select value={count} onChange={(e) => setCount(Number(e.target.value))} aria-label="Number of posts" className="rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm text-[#16161a]">
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} post{n === 1 ? '' : 's'}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={generate}
              disabled={generating}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#16161a] bg-[#16161a] px-4 py-2 text-sm font-semibold text-[#f7f5f1] hover:border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#16161a] disabled:opacity-60"
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              <span>{generating ? 'Writing (up to a minute)...' : 'Generate with AI'}</span>
            </button>
            <a href={META_COMPOSER} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#16161a] hover:text-[#b45309]">
              Open Meta Business Suite <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 border-b border-black/[0.05] px-5 py-3">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${filter === t.key ? 'bg-[#16161a] text-[#f7f5f1]' : 'text-[#6b6b73] hover:text-[#16161a]'}`}
          >
            {t.label} <span className="ml-1 text-xs opacity-70">{countFor(t.key)}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-[#16161a]" /></div>
      ) : visible.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#6b6b73]">
          {filter === 'draft' ? 'No drafts yet. Click "Generate with AI" or wait for Monday.' : `No ${filter} posts.`}
        </div>
      ) : (
        <div className="divide-y divide-black/[0.05]">
          {visible.map((p) => (
            <PostCard key={p.id} post={p} onChanged={onChanged(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
