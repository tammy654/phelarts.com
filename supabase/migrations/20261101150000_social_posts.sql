/*
  # Social media post drafts (Facebook and Instagram)

  1. social_posts: AI-drafted posts the admin edits, schedules and marks posted.
  2. marketing_settings: small key/value store for the admin's brief to the AI.
  3. Weekly job: pg_cron calls the `social-drafts` Edge Function every Monday
     07:00 UTC (08:00 Lagos), using the same Vault secret as the daily digest.

  Admin-only (phelarts@gmail.com). Requires 20261101140000_crm_and_followups.sql.
  Safe to run more than once.
*/

CREATE TABLE IF NOT EXISTS public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_date date,
  pillar text,
  theme text,
  facebook_text text NOT NULL,
  instagram_caption text NOT NULL,
  hashtags text NOT NULL DEFAULT '',
  visual_idea text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','posted','discarded')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS social_posts_status_date_idx ON public.social_posts (status, post_date);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.social_posts FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_posts TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can manage social posts" ON public.social_posts;
CREATE POLICY "Phel Arts admin can manage social posts" ON public.social_posts
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

CREATE TABLE IF NOT EXISTS public.marketing_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketing_settings ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.marketing_settings FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.marketing_settings TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can manage marketing settings" ON public.marketing_settings;
CREATE POLICY "Phel Arts admin can manage marketing settings" ON public.marketing_settings
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

INSERT INTO public.marketing_settings (key, value)
VALUES ('social_brief', '')
ON CONFLICT (key) DO NOTHING;

SELECT cron.schedule(
  'social-weekly-drafts',
  '0 7 * * 1',
  $cron$
  SELECT net.http_post(
    url := 'https://gnvcvidmnjykarvssrhl.supabase.co/functions/v1/social-drafts',
    body := '{"count": 4}'::jsonb,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'crm_cron_secret')
    ),
    timeout_milliseconds := 140000
  );
  $cron$
);
