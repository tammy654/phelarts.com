/*
  # CRM fields, follow-up drafts and automation

  1. CRM columns on bookings and inquiries: stage, notes, next follow-up date,
     last contacted, confirmation sent.
  2. followup_drafts: AI-written emails waiting for the admin to approve.
  3. Instant confirmation: after a booking/inquiry is inserted, the database
     calls the `lead-confirmation` Edge Function (pg_net).
  4. Daily digest: pg_cron calls the `daily-digest` Edge Function at
     07:00 UTC (08:00 Lagos) with a secret kept in Supabase Vault.

  Only phelarts@gmail.com (signed in) can read or change CRM data.
  Safe to run more than once.
*/

-- 1. CRM columns ---------------------------------------------------------------
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS stage text NOT NULL DEFAULT 'call_booked',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS next_follow_up_at date,
  ADD COLUMN IF NOT EXISTS last_contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz;

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS stage text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS next_follow_up_at date,
  ADD COLUMN IF NOT EXISTS last_contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz;

ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_stage_valid;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_stage_valid
  CHECK (stage IN ('new','call_booked','quote_sent','won','lost'));
ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_stage_valid;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_stage_valid
  CHECK (stage IN ('new','call_booked','quote_sent','won','lost'));

-- Admin may edit only the CRM columns.
GRANT UPDATE (stage, notes, next_follow_up_at, last_contacted_at)
  ON public.bookings, public.inquiries TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can update bookings" ON public.bookings;
CREATE POLICY "Phel Arts admin can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can update inquiries" ON public.inquiries;
CREATE POLICY "Phel Arts admin can update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- 2. Follow-up drafts ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.followup_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL CHECK (source_type IN ('booking', 'inquiry')),
  source_id uuid NOT NULL,
  to_email text NOT NULL,
  to_name text,
  kind text NOT NULL CHECK (kind IN ('after_call','quote_check_in','nudge','custom')),
  subject text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','discarded')),
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS followup_drafts_source_idx
  ON public.followup_drafts (source_type, source_id, created_at DESC);

ALTER TABLE public.followup_drafts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.followup_drafts FROM anon;
GRANT SELECT, UPDATE, DELETE ON public.followup_drafts TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can manage drafts" ON public.followup_drafts;
CREATE POLICY "Phel Arts admin can manage drafts" ON public.followup_drafts
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- 3. Instant confirmation trigger ---------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.notify_lead_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://gnvcvidmnjykarvssrhl.supabase.co/functions/v1/lead-confirmation',
      body := jsonb_build_object('table', TG_TABLE_NAME, 'id', NEW.id),
      headers := '{"Content-Type": "application/json"}'::jsonb,
      timeout_milliseconds := 20000
    );
  EXCEPTION WHEN OTHERS THEN
    -- Never block a form submission because the email call failed.
    RAISE WARNING 'lead confirmation call failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.notify_lead_confirmation() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS lead_confirmation_on_bookings ON public.bookings;
CREATE TRIGGER lead_confirmation_on_bookings
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.notify_lead_confirmation();

DROP TRIGGER IF EXISTS lead_confirmation_on_inquiries ON public.inquiries;
CREATE TRIGGER lead_confirmation_on_inquiries
  AFTER INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.notify_lead_confirmation();

-- 4. Daily digest (pg_cron + Vault secret) -------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'crm_cron_secret') THEN
    PERFORM vault.create_secret(
      replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
      'crm_cron_secret',
      'Shared secret for the daily-digest Edge Function'
    );
  END IF;
END;
$$;

-- The Edge Function checks the secret through this function (service role only).
CREATE OR REPLACE FUNCTION public.crm_verify_cron_secret(candidate text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM vault.decrypted_secrets
    WHERE name = 'crm_cron_secret' AND decrypted_secret = candidate
  );
$$;

REVOKE ALL ON FUNCTION public.crm_verify_cron_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_verify_cron_secret(text) TO service_role;

SELECT cron.schedule(
  'crm-daily-digest',
  '0 7 * * *',
  $cron$
  SELECT net.http_post(
    url := 'https://gnvcvidmnjykarvssrhl.supabase.co/functions/v1/daily-digest',
    body := '{}'::jsonb,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'crm_cron_secret')
    ),
    timeout_milliseconds := 140000
  );
  $cron$
);
