/*
  # Remove always-true read access to bookings

  The policy "Authenticated users can view bookings" allowed every signed-in
  account (anyone can self-register with the public anon key) to read all lead
  data. The application never reads this table; the owner reads it through the
  Supabase dashboard with the service role, which bypasses RLS.
*/

DROP POLICY IF EXISTS "Authenticated users can view bookings" ON bookings;
