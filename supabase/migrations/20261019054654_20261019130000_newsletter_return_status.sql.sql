/*
# Return subscription status from subscribe_to_newsletter

The frontend needs to show a friendly "You're already subscribed" message when
a repeat address is submitted. The function now returns 'subscribed' for a new
subscription and 'already_subscribed' for a duplicate.
*/

DROP FUNCTION IF EXISTS public.subscribe_to_newsletter(text);

CREATE OR REPLACE FUNCTION public.subscribe_to_newsletter(subscriber_email text)
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
