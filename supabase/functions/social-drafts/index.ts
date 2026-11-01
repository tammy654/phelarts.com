// Drafts Facebook/Instagram posts and saves them for the admin to review.
// Runs every Monday (pg_cron) and on demand from the admin's Social tab.
import { ADMIN_EMAIL, SITE_URL, corsHeaders, isAdminRequest, json, serviceClient, todayLagos } from '../_shared/common.ts';
import { draftSocialPosts } from '../_shared/social.ts';
import { sendEmail } from '../_shared/email.ts';

// Spread posts across the coming week (offsets in days from today).
const DAY_OFFSETS: Record<number, number[]> = {
  1: [1],
  2: [1, 4],
  3: [1, 3, 5],
  4: [1, 3, 5, 6],
  5: [1, 2, 3, 5, 6],
};

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const db = serviceClient();
  const cronSecret = req.headers.get('x-cron-secret');
  let fromCron = false;
  if (cronSecret) {
    const { data, error } = await db.rpc('crm_verify_cron_secret', { candidate: cronSecret });
    if (error || data !== true) return json({ error: 'Not authorized' }, 401);
    fromCron = true;
  } else if (!(await isAdminRequest(req))) {
    return json({ error: 'Not authorized' }, 401);
  }

  let body: { count?: number; theme?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine
  }
  const count = Math.min(5, Math.max(1, Math.round(Number(body.count) || 4)));
  const theme = (body.theme ?? '').slice(0, 500);

  const today = todayLagos();
  const dates = DAY_OFFSETS[count].map((o) => addDays(today, o));

  const [briefRes, recentRes] = await Promise.all([
    db.from('marketing_settings').select('value').eq('key', 'social_brief').maybeSingle(),
    db
      .from('social_posts')
      .select('pillar, instagram_caption')
      .neq('status', 'discarded')
      .gte('created_at', new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(20),
  ]);
  if (briefRes.error) return json({ error: briefRes.error.message }, 500);
  if (recentRes.error) return json({ error: recentRes.error.message }, 500);

  const recent = (recentRes.data ?? []).map((p) => `${p.pillar ?? 'post'}: ${(p.instagram_caption ?? '').split('\n')[0].slice(0, 140)}`);

  try {
    const posts = await draftSocialPosts({ dates, brief: briefRes.data?.value ?? '', theme, recent });
    const rows = posts.map((p, i) => ({
      post_date: /^\d{4}-\d{2}-\d{2}$/.test(p.post_date) ? p.post_date : dates[i] ?? null,
      pillar: p.pillar?.slice(0, 80) ?? null,
      theme: theme || null,
      facebook_text: p.facebook_text.trim(),
      instagram_caption: p.instagram_caption.trim(),
      hashtags: p.hashtags
        .map((h) => h.trim())
        .filter(Boolean)
        .map((h) => (h.startsWith('#') ? h : `#${h}`))
        .join(' '),
      visual_idea: p.visual_idea?.trim() || null,
    }));
    const { data: saved, error } = await db.from('social_posts').insert(rows).select('*');
    if (error) throw error;

    if (fromCron) {
      try {
        await sendEmail({
          to: ADMIN_EMAIL,
          subject: `${rows.length} social posts drafted for this week`,
          text: `Good morning,\n\n${rows.length} Facebook and Instagram posts are ready for you to review:\n\n${rows
            .map((r) => `- ${r.post_date}: ${r.pillar ?? 'post'}`)
            .join('\n')}\n\nReview, edit and copy them here: ${SITE_URL}/admin (Social tab)`,
        });
      } catch (err) {
        console.error('Social summary email failed:', err);
      }
    }

    return json({ ok: true, posts: saved });
  } catch (err) {
    console.error('Social drafts failed:', err);
    return json({ error: err instanceof Error ? err.message : 'Could not draft posts' }, 500);
  }
});
