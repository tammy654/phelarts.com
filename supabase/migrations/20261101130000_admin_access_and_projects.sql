/*
  # Admin access and projects table (own Supabase project, replaces Bolt setup)

  - Creates the projects table if missing.
  - Public website visitors (anon) can only INSERT bookings/inquiries and
    subscribe to the newsletter. They cannot read, change or delete anything.
  - Only the signed-in Supabase Auth user phelarts@gmail.com can read and
    delete submissions and manage projects.
  - Ensures the newsletter subscribe function exists.
  Safe to run more than once.
*/

-- 1. projects table ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL CHECK (source_type IN ('booking', 'inquiry')),
  source_id uuid,
  full_name text,
  email text,
  company text,
  phone text,
  project_type text,
  call_type text,
  preferred_date text,
  preferred_time text,
  project_details text,
  status text NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'canceled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 2. Remove open/old policies --------------------------------------------------
DROP POLICY IF EXISTS "Anon can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anon can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anon can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anon can delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anon can read newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anon can delete newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anon can read projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can delete projects" ON public.projects;

-- 3. Table privileges ----------------------------------------------------------
REVOKE SELECT, UPDATE, DELETE ON public.bookings, public.inquiries FROM anon;
REVOKE ALL ON public.newsletter_subscribers, public.projects FROM anon;
GRANT INSERT ON public.bookings, public.inquiries TO anon, authenticated;
GRANT SELECT, DELETE ON public.bookings, public.inquiries, public.newsletter_subscribers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;

-- 4. Public form policies ------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can submit bookings" ON public.bookings;
CREATE POLICY "Anyone can submit bookings" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 5. Admin-only policies -------------------------------------------------------
DROP POLICY IF EXISTS "Phel Arts admin can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Phel Arts admin can delete bookings" ON public.bookings;
CREATE POLICY "Phel Arts admin can view bookings" ON public.bookings
  FOR SELECT TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');
CREATE POLICY "Phel Arts admin can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Phel Arts admin can delete inquiries" ON public.inquiries;
CREATE POLICY "Phel Arts admin can view inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');
CREATE POLICY "Phel Arts admin can delete inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can view newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Phel Arts admin can delete newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Phel Arts admin can view newsletter_subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');
CREATE POLICY "Phel Arts admin can delete newsletter_subscribers" ON public.newsletter_subscribers
  FOR DELETE TO authenticated USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can manage projects" ON public.projects;
CREATE POLICY "Phel Arts admin can manage projects" ON public.projects
  FOR ALL TO authenticated
  USING (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com')
  WITH CHECK (lower(auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- 6. Newsletter subscribe function ---------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_key
  ON public.newsletter_subscribers (email);

DROP FUNCTION IF EXISTS public.subscribe_to_newsletter(text);
CREATE FUNCTION public.subscribe_to_newsletter(subscriber_email text)
RETURNS text
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

  IF FOUND THEN
    RETURN 'subscribed';
  END IF;
  RETURN 'already_subscribed';
END;
$$;

REVOKE ALL ON FUNCTION public.subscribe_to_newsletter(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.subscribe_to_newsletter(text) TO anon, authenticated;
