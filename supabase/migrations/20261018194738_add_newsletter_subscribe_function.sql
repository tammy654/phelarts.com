/*
  # Subscribe through a function that cannot reveal existing subscribers

  Direct inserts into `newsletter` returned a unique-violation error for an
  address that was already on the list, which let anyone test whether a given
  person is subscribed. Subscriptions now go through a definer function that
  canonicalises the address, swallows duplicates, and returns nothing either
  way. Direct INSERT is revoked from the client roles so the function is the
  only path.
*/

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

  INSERT INTO newsletter (email)
  VALUES (normalized)
  ON CONFLICT (email) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.subscribe_to_newsletter(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.subscribe_to_newsletter(text) TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter;
REVOKE INSERT ON newsletter FROM anon, authenticated;
