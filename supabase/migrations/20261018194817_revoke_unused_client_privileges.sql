/*
  # Remove standing privileges the site never uses

  The client roles held SELECT, UPDATE and DELETE on all three lead tables.
  Nothing in the site uses them, and only the absence of matching policies was
  preventing their use. INSERT stays on bookings and contacts so the public
  forms keep working; newsletter inserts now go through
  public.subscribe_to_newsletter().
*/

REVOKE SELECT, UPDATE, DELETE ON bookings FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON contacts FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON newsletter FROM anon, authenticated;
