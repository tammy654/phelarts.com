/*
# Allow admin to delete submissions

1. Changes
- Grant DELETE on bookings, inquiries, newsletter_subscribers to anon role.
- Add DELETE policies (USING true) for anon on those tables.
- The admin dashboard uses the anon key (email/password gate, no Supabase Auth).
- Data is intentionally open to the admin gate; this matches the existing read model.

2. Security notes
- This is consistent with the existing open-anon model on these tables.
- When real auth is added later, these should be tightened to authenticated admin-only.
*/

GRANT DELETE ON public.bookings TO anon;
GRANT DELETE ON public.inquiries TO anon;
GRANT DELETE ON public.newsletter_subscribers TO anon;

DROP POLICY IF EXISTS "Anon can delete bookings" ON public.bookings;
CREATE POLICY "Anon can delete bookings" ON public.bookings FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Anon can delete inquiries" ON public.inquiries;
CREATE POLICY "Anon can delete inquiries" ON public.inquiries FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Anon can delete newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Anon can delete newsletter_subscribers" ON public.newsletter_subscribers FOR DELETE TO anon USING (true);
