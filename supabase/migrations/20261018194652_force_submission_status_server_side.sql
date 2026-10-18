/*
  # Force workflow status server-side

  The public forms could set `status` to any value, letting a submitter post a
  lead that already looks handled. Triggers now overwrite the column on insert
  so the value cannot come from the request body.
*/

CREATE OR REPLACE FUNCTION public.force_submission_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF TG_TABLE_NAME = 'newsletter' THEN
    NEW.status := 'subscribed';
  ELSE
    NEW.status := 'pending';
  END IF;
  NEW.created_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS force_status_on_bookings ON bookings;
CREATE TRIGGER force_status_on_bookings
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION public.force_submission_status();

DROP TRIGGER IF EXISTS force_status_on_contacts ON contacts;
CREATE TRIGGER force_status_on_contacts
  BEFORE INSERT ON contacts
  FOR EACH ROW EXECUTE FUNCTION public.force_submission_status();

DROP TRIGGER IF EXISTS force_status_on_newsletter ON newsletter;
CREATE TRIGGER force_status_on_newsletter
  BEFORE INSERT ON newsletter
  FOR EACH ROW EXECUTE FUNCTION public.force_submission_status();
