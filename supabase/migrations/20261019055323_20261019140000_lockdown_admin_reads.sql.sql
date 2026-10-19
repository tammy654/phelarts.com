/*
# Lock down admin reads on the lead tables

The admin dashboard at /admin needs to list bookings, inquiries, and
newsletter_subscribers, but only the phelarts@gmail.com account may see them.

Problems found in the current posture:
  - bookings: a scoped SELECT policy existed, but the SELECT privilege had been
    revoked from `authenticated`, so the admin could not actually read rows.
  - inquiries: SELECT was `USING (true)` for ALL authenticated users (any
    signed-in account could read every inquiry), and anon/authenticated held
    UPDATE/DELETE grants.
  - newsletter_subscribers: no SELECT policy and no SELECT grant, so nobody
    (including the admin) could read rows.

This migration:
  1. Scopes SELECT on bookings, inquiries, and newsletter_subscribers to the
     single admin email via the JWT `email` claim.
  2. Grants SELECT to `authenticated` (the role the Supabase JS client uses
     once signed in) on all three tables.
  3. Revokes UPDATE and DELETE from anon and authenticated on inquiries (the
     public form only inserts; the admin only reads).
  4. Leaves INSERT policies/grants on bookings and inquiries untouched so the
     public forms keep working.

Security:
  - Only phelarts@gmail.com can read lead data. Any other signed-in account
    sees zero rows (the app additionally signs them out client-side).
  - No public SELECT/UPDATE/DELETE on any lead table.
*/

-- bookings: re-grant SELECT to authenticated and scope the policy
GRANT SELECT ON bookings TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can view bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON bookings;
CREATE POLICY "Phel Arts admin can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- inquiries: scope SELECT to the admin email and remove broad write grants
GRANT SELECT ON inquiries TO authenticated;
REVOKE UPDATE, DELETE ON inquiries FROM anon, authenticated;

DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Phel Arts admin can view inquiries" ON inquiries;
CREATE POLICY "Phel Arts admin can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');

-- newsletter_subscribers: allow the admin to read
GRANT SELECT ON newsletter_subscribers TO authenticated;

DROP POLICY IF EXISTS "Phel Arts admin can view newsletter_subscribers" ON newsletter;
DROP POLICY IF EXISTS "Phel Arts admin can view newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "Phel Arts admin can view newsletter_subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'phelarts@gmail.com');
