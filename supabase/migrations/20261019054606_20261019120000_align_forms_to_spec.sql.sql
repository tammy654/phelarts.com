/*
# Align booking, inquiry, and newsletter tables to the form spec

Restructures the lead-capture tables to match the fields and enums the public
forms now send.

1. bookings (restructured in place; existing test row preserved + upgraded)
   - Renamed columns: name->full_name, message->project_details,
     selected_date->preferred_date, selected_time->preferred_time.
   - Dropped unused `budget` column.
   - Old constraints dropped FIRST so the data-upgrade UPDATEs can run.
   - Existing row upgraded: project_type 'motion-graphics'->'Motion Graphics',
     preferred_time '12:00 PM'->'12:00', call_type 'video'->'Video Call'.
   - call_type / preferred_date / preferred_time made NOT NULL (required).
   - New CHECK constraints enforce spec enums and YYYY-MM-DD / HH:MM formats.
   - RLS: anon+authenticated INSERT.

2. inquiries (new table for the general inquiry form)
   - Same columns as bookings; call_type/date/time optional (nullable).
   - force_status trigger sets status='pending' server-side.
   - RLS: anon+authenticated INSERT; authenticated SELECT.

3. newsletter_subscribers (new table, replaces `newsletter`)
   - email unique, canonical (lower+trim). RLS enabled; no public policies.
   - Subscriptions go through subscribe_to_newsletter() (recreated).

4. Security
   - subscribe_to_newsletter is SECURITY DEFINER; revoked from PUBLIC; EXECUTE
     granted to anon+authenticated.
   - Old `contacts`/`newsletter` tables left in place (empty), unreferenced.
*/

-- ---------------------------------------------------------------------------
-- 1. bookings: drop old constraints FIRST, then rename + upgrade + rebuild
-- ---------------------------------------------------------------------------

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_name_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_email_valid;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_company_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_phone_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_project_type_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_budget_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_message_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_selected_date_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_selected_time_len;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_call_type_valid;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='name') THEN
    ALTER TABLE bookings RENAME COLUMN name TO full_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='message') THEN
    ALTER TABLE bookings RENAME COLUMN message TO project_details;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='selected_date') THEN
    ALTER TABLE bookings RENAME COLUMN selected_date TO preferred_date;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='selected_time') THEN
    ALTER TABLE bookings RENAME COLUMN selected_time TO preferred_time;
  END IF;
END $$;

ALTER TABLE bookings DROP COLUMN IF EXISTS budget;

UPDATE bookings SET project_type = 'Motion Graphics' WHERE project_type = 'motion-graphics';
UPDATE bookings SET project_type = '2D Animation' WHERE project_type = '2d-animation';
UPDATE bookings SET project_type = 'Web Animation' WHERE project_type = 'web-animation';
UPDATE bookings SET project_type = 'Video Production' WHERE project_type = 'video-production';
UPDATE bookings SET project_type = 'App Animations' WHERE project_type = 'app-animations';
UPDATE bookings SET project_type = 'Other' WHERE project_type = 'other';

UPDATE bookings SET call_type = 'Video Call' WHERE call_type = 'video';
UPDATE bookings SET call_type = 'Phone Call' WHERE call_type = 'phone';
UPDATE bookings SET call_type = 'Chat Session' WHERE call_type = 'chat';

UPDATE bookings
  SET preferred_time = to_char((preferred_time)::time, 'HH24:MI')
  WHERE preferred_time ~ '(AM|PM)$' AND preferred_time !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$';

ALTER TABLE bookings ALTER COLUMN call_type SET NOT NULL;
ALTER TABLE bookings ALTER COLUMN preferred_date SET NOT NULL;
ALTER TABLE bookings ALTER COLUMN preferred_time SET NOT NULL;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_full_name_len CHECK (char_length(full_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT bookings_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320),
  ADD CONSTRAINT bookings_company_len CHECK (company IS NULL OR char_length(company) <= 200),
  ADD CONSTRAINT bookings_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT bookings_project_type_valid CHECK (project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Web Animation','Video Production','App Animations','Other')),
  ADD CONSTRAINT bookings_call_type_valid CHECK (call_type IN ('Video Call','Phone Call','Chat Session')),
  ADD CONSTRAINT bookings_preferred_date_format CHECK (preferred_date ~ '^\d{4}-\d{2}-\d{2}$'),
  ADD CONSTRAINT bookings_preferred_time_format CHECK (preferred_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  ADD CONSTRAINT bookings_project_details_len CHECK (char_length(project_details) BETWEEN 1 AND 5000);

DROP POLICY IF EXISTS "Anyone can submit bookings" ON bookings;
CREATE POLICY "Anyone can submit bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 2. inquiries: new table for the general inquiry form
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  project_type text,
  call_type text,
  preferred_date text,
  preferred_time text,
  project_details text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON inquiries;
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
CREATE POLICY "Authenticated users can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_full_name_len;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_email_valid;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_company_len;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_phone_len;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_project_type_valid;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_call_type_valid;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_preferred_date_format;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_preferred_time_format;
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_project_details_len;

ALTER TABLE inquiries
  ADD CONSTRAINT inquiries_full_name_len CHECK (char_length(full_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT inquiries_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320),
  ADD CONSTRAINT inquiries_company_len CHECK (company IS NULL OR char_length(company) <= 200),
  ADD CONSTRAINT inquiries_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT inquiries_project_type_valid CHECK (project_type IS NULL OR project_type IN ('2D Animation','Motion Graphics','Web Animation','Video Production','App Animations','Other')),
  ADD CONSTRAINT inquiries_call_type_valid CHECK (call_type IS NULL OR call_type IN ('Video Call','Phone Call','Chat Session')),
  ADD CONSTRAINT inquiries_preferred_date_format CHECK (preferred_date IS NULL OR preferred_date ~ '^\d{4}-\d{2}-\d{2}$'),
  ADD CONSTRAINT inquiries_preferred_time_format CHECK (preferred_time IS NULL OR preferred_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  ADD CONSTRAINT inquiries_project_details_len CHECK (char_length(project_details) BETWEEN 1 AND 5000);

DROP TRIGGER IF EXISTS force_status_on_inquiries ON inquiries;
CREATE TRIGGER force_status_on_inquiries
  BEFORE INSERT ON inquiries
  FOR EACH ROW EXECUTE FUNCTION public.force_submission_status();

-- ---------------------------------------------------------------------------
-- 3. newsletter_subscribers: new table for the newsletter signup
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'subscribed',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_subscribers_email_valid CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' AND char_length(email) <= 320),
  CONSTRAINT newsletter_subscribers_email_canonical CHECK (email = lower(btrim(email)))
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON newsletter_subscribers FROM anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. subscribe_to_newsletter(): point at the new table
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.subscribe_to_newsletter(subscriber_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  normalized text;
BEGIN
  normalized := lower(btrim(coalesce(subscriber_email, '')));

  IF normalized !~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$' OR char_length(normalized) > 320 THEN
    RAISE EXCEPTION 'invalid_email' USING ERRCODE = '22023';
  END IF;

  INSERT INTO newsletter_subscribers (email)
  VALUES (normalized)
  ON CONFLICT (email) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.subscribe_to_newsletter(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.subscribe_to_newsletter(text) TO anon, authenticated;
