/*
  # Remove always-true read access to newsletter subscribers

  Every signed-in account could download the whole mailing list.
*/

DROP POLICY IF EXISTS "Authenticated users can view newsletter subscribers" ON newsletter;
