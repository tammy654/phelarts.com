/*
  # Remove always-true read access to contacts

  Every signed-in account could read all inbound enquiries. No client code
  reads this table; the owner uses the dashboard (service role).
*/

DROP POLICY IF EXISTS "Authenticated users can view contacts" ON contacts;
