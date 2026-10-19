/*
# Lock down admin tables to authenticated admins

1. Goal
- Replace the open anon read/delete model with real Supabase Auth.
- Public visitors (anon) keep INSERT only for form submissions (bookings, inquiries, newsletter).
- Any authenticated admin can SELECT (read) on all admin tables — both Super Admin and Manager.
- Only the Super Admin (phelarts@gmail.com) can DELETE rows.
- Projects: authenticated admins get full CRUD (needed to move submissions, change status, delete).

2. Tables affected
- bookings, inquiries, newsletter_subscribers, projects

3. Security
- Drop all "Anon can read/delete" policies.
- Keep "Anyone can submit ..." INSERT policies for anon + authenticated.
- Add SELECT policies TO authenticated (any signed-in admin can read).
- Add DELETE policies TO authenticated scoped to auth.jwt() email = 'phelarts@gmail.com'.
- projects: authenticated full CRUD; DELETE still scoped to super admin.
*/

-- BOOKINGS
DROP POLICY IF EXISTS "Anon can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anon can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Phel Arts admin can view bookings" ON public.bookings;

CREATE POLICY "Admins can read bookings" ON public.bookings
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin can delete bookings" ON public.bookings
  FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

REVOKE SELECT ON public.bookings FROM anon;
REVOKE DELETE ON public.bookings FROM anon;
GRANT SELECT ON public.bookings TO authenticated;
GRANT DELETE ON public.bookings TO authenticated;

-- INQUIRIES
DROP POLICY IF EXISTS "Anon can delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anon can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Phel Arts admin can view inquiries" ON public.inquiries;

CREATE POLICY "Admins can read inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin can delete inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

REVOKE SELECT ON public.inquiries FROM anon;
REVOKE DELETE ON public.inquiries FROM anon;
GRANT SELECT ON public.inquiries TO authenticated;
GRANT DELETE ON public.inquiries TO authenticated;

-- NEWSLETTER_SUBSCRIBERS
DROP POLICY IF EXISTS "Anon can delete newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anon can read newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Phel Arts admin can view newsletter_subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can read newsletter_subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin can delete newsletter_subscribers" ON public.newsletter_subscribers
  FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

REVOKE SELECT ON public.newsletter_subscribers FROM anon;
REVOKE DELETE ON public.newsletter_subscribers FROM anon;
GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT DELETE ON public.newsletter_subscribers TO authenticated;

-- PROJECTS
DROP POLICY IF EXISTS "Anon can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can read projects" ON public.projects;
DROP POLICY IF EXISTS "Anon can update projects" ON public.projects;

CREATE POLICY "Admins can read projects" ON public.projects
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Super admin can delete projects" ON public.projects
  FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

REVOKE ALL ON public.projects FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
