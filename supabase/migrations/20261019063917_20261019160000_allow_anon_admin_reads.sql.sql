-- The admin login is an email-only gate (no Supabase Auth session).
-- RLS previously restricted SELECT to the authenticated phelarts@gmail.com user,
-- which blocked the dashboard's anon-key reads with 401 "permission denied".
-- Allow the anon role to SELECT submissions so the gated admin dashboard can display them.

GRANT SELECT ON public.bookings TO anon;
GRANT SELECT ON public.inquiries TO anon;
GRANT SELECT ON public.newsletter_subscribers TO anon;

CREATE POLICY "Anon can read bookings"
  ON public.bookings FOR SELECT
  TO anon USING (true);

CREATE POLICY "Anon can read inquiries"
  ON public.inquiries FOR SELECT
  TO anon USING (true);

CREATE POLICY "Anon can read newsletter_subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO anon USING (true);
