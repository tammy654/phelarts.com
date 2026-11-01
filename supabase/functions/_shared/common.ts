import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2.74.0';

export const ADMIN_EMAIL = 'phelarts@gmail.com';
export const SITE_URL = 'https://phelarts.com';
export const LAGOS_TZ = 'Africa/Lagos';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

let cached: SupabaseClient | null = null;

// Service-role client: bypasses row level security. Only used inside Edge Functions.
export function serviceClient(): SupabaseClient {
  if (cached) return cached;
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

// Returns true only when the request carries a valid session for the admin account.
export async function isAdminRequest(req: Request): Promise<boolean> {
  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  const { data, error } = await serviceClient().auth.getUser(token);
  if (error || !data.user?.email) return false;
  return data.user.email.toLowerCase() === ADMIN_EMAIL;
}

export type SourceType = 'booking' | 'inquiry';
export type DraftKind = 'after_call' | 'quote_check_in' | 'nudge' | 'custom';

export interface Lead {
  id: string;
  full_name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  project_type: string | null;
  call_type: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  project_details: string | null;
  stage: string;
  notes: string | null;
  next_follow_up_at: string | null;
  last_contacted_at: string | null;
  confirmation_sent_at: string | null;
  created_at: string;
}

export const tableFor = (source: SourceType) => (source === 'booking' ? 'bookings' : 'inquiries');

export function firstName(lead: Pick<Lead, 'full_name'>): string {
  const name = (lead.full_name ?? '').trim().split(/\s+/)[0];
  if (!name) return 'there';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Turns plain text (paragraphs separated by blank lines) into simple HTML.
export function textToHtml(text: string): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function formatDateLong(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function formatTime12h(hhmm: string | null): string {
  if (!hhmm) return '';
  const m = hhmm.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return hhmm;
  const h = parseInt(m[1], 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]} ${suffix}`;
}

// Today's date in Lagos as YYYY-MM-DD.
export function todayLagos(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: LAGOS_TZ }).format(new Date());
}
