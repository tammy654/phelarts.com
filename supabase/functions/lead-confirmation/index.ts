// Called by a database trigger right after a booking or inquiry is saved.
// Sends the client a confirmation email and gives the admin a heads-up.
// Safe to call repeatedly: each lead is confirmed at most once.
import {
  ADMIN_EMAIL,
  SITE_URL,
  type Lead,
  corsHeaders,
  firstName,
  formatDateLong,
  formatTime12h,
  json,
  serviceClient,
} from '../_shared/common.ts';
import { sendEmail } from '../_shared/email.ts';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function bookingEmail(lead: Lead) {
  const date = formatDateLong(lead.preferred_date);
  const time = formatTime12h(lead.preferred_time);
  const nextStep =
    lead.call_type === 'Phone Call'
      ? lead.phone
        ? `We'll call you on ${lead.phone} at the scheduled time.`
        : 'Please reply with the best phone number to reach you.'
      : lead.call_type === 'Chat Session'
        ? "We'll reach out at the scheduled time to start your chat session."
        : "We'll send you the video call link before the call.";

  const details = [
    `Date: ${date}`,
    `Time: ${time} (Lagos time, WAT)`,
    `Call type: ${lead.call_type ?? 'Video Call'}`,
    lead.project_type ? `Project: ${lead.project_type}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    subject: `Your call with Phel Arts is booked: ${date}`,
    text: `Hi ${firstName(lead)},

Thanks for booking a free consultation with Phel Arts. Here are your details:

${details}

${nextStep} If you need to reschedule, just reply to this email at least 2 hours before the call.

Best regards,
The Phel Arts Team`,
  };
}

function inquiryEmail(lead: Lead) {
  return {
    subject: "We've received your message",
    text: `Hi ${firstName(lead)},

Thanks for reaching out to Phel Arts. We've received your message and will get back to you within 24 hours.

In the meantime, you can see some of our work at ${SITE_URL}/our-work and our packages at ${SITE_URL}/pricing.

Best regards,
The Phel Arts Team`,
  };
}

function adminAlert(lead: Lead, table: string) {
  const kind = table === 'bookings' ? 'booking' : 'enquiry';
  const lines = [
    `Name: ${lead.full_name ?? '—'}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    lead.project_type ? `Project type: ${lead.project_type}` : null,
    lead.preferred_date ? `Call: ${formatDateLong(lead.preferred_date)} ${formatTime12h(lead.preferred_time)} WAT (${lead.call_type ?? ''})` : null,
    lead.project_details ? `\nDetails:\n${lead.project_details}` : null,
  ]
    .filter(Boolean)
    .join('\n');
  return {
    subject: `New ${kind}: ${lead.full_name ?? lead.email}`,
    text: `A new ${kind} just came in.\n\n${lines}\n\nOpen the admin: ${SITE_URL}/admin`,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let payload: { table?: string; id?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const table = payload.table;
  const id = payload.id;
  if ((table !== 'bookings' && table !== 'inquiries') || !id || !UUID_RE.test(id)) {
    return json({ error: 'Invalid request' }, 400);
  }

  const db = serviceClient();

  // Claim the lead so two calls can't both send.
  const { data: claimed, error: claimError } = await db
    .from(table)
    .update({ confirmation_sent_at: new Date().toISOString() })
    .eq('id', id)
    .is('confirmation_sent_at', null)
    .select('*')
    .maybeSingle();

  if (claimError) return json({ error: claimError.message }, 500);
  if (!claimed) return json({ ok: true, skipped: 'already confirmed or not found' });

  const lead = claimed as Lead;
  const email = table === 'bookings' ? bookingEmail(lead) : inquiryEmail(lead);

  try {
    await sendEmail({ to: lead.email, ...email });
  } catch (err) {
    console.error('Confirmation email failed:', err);
    await db.from(table).update({ confirmation_sent_at: null }).eq('id', id);
    return json({ error: 'Email failed' }, 500);
  }

  try {
    await sendEmail({ to: ADMIN_EMAIL, ...adminAlert(lead, table) });
  } catch (err) {
    console.error('Admin alert failed:', err);
  }

  return json({ ok: true });
});
