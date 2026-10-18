/*
  # Enforce a canonical form for subscriber addresses

  The unique constraint applied to the raw text, so the same address could be
  stored several times differing only by case or surrounding spaces. The
  address must now be stored lowercase and trimmed, which makes the existing
  unique constraint effective against those variants.
*/

ALTER TABLE newsletter
  ADD CONSTRAINT newsletter_email_canonical CHECK (email = lower(btrim(email)));
