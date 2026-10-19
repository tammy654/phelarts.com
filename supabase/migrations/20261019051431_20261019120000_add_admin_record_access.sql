/*
# Add protected admin read access

1. Purpose
- Allow the Phel Arts administrator to review website submissions from the hidden admin area.
- Keep public forms able to submit without exposing stored records to anonymous visitors.

2. Existing Tables Affected
- `bookings`: add an authenticated administrator-only SELECT policy.
- `contacts`: add an authenticated administrator-only SELECT policy.
- `newsletter`: add an authenticated administrator-only SELECT policy.

3. Security
- All policies apply only to the `authenticated` role.
- Access is limited to the immutable email claim `phelarts@gmail.com` from the signed-in Supabase session.
- No public read access is added, and no existing submission paths are changed.

4. Important Notes
- The admin page must sign in through Supabase Auth before querying these tables.
- The login screen uses the requested username label `admin`, mapped to the protected administrator email without exposing that email in the form.
*/

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Phel Arts admin can view bookings" ON public.bookings;
CREATE POLICY "Phel Arts admin can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can view contacts" ON public.contacts;
CREATE POLICY "Phel Arts admin can view contacts"
  ON public.contacts
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

DROP POLICY IF EXISTS "Phel Arts admin can view newsletter" ON public.newsletter;
CREATE POLICY "Phel Arts admin can view newsletter"
  ON public.newsletter
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');