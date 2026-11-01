import nodemailer from 'npm:nodemailer@6.10.1';
import { ADMIN_EMAIL, SITE_URL, textToHtml } from './common.ts';

// Sends through Gmail SMTP using an app password stored as the GMAIL_APP_PASSWORD secret.
// Port 465 (SSL) is used because Supabase Edge Functions block 25 and 587.
function transport() {
  const user = Deno.env.get('GMAIL_USER') ?? ADMIN_EMAIL;
  const pass = Deno.env.get('GMAIL_APP_PASSWORD');
  if (!pass) throw new Error('Missing GMAIL_APP_PASSWORD secret');
  return {
    user,
    mailer: nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass: pass.replace(/\s+/g, '') },
    }),
  };
}

export interface OutgoingEmail {
  to: string;
  subject: string;
  text: string;
}

const SIGNATURE_HTML = `
  <p style="margin:24px 0 0;color:#6b6b73;font-size:13px">
    Phel Arts · 2D Animation · Motion Graphics · Video Production · AI Videos<br>
    <a href="${SITE_URL}" style="color:#006852">phelarts.com</a>
  </p>`;

function wrapHtml(text: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#16161a;max-width:560px">
    ${textToHtml(text)}
    ${SIGNATURE_HTML}
  </div>`;
}

export async function sendEmail(email: OutgoingEmail): Promise<void> {
  const { user, mailer } = transport();
  await mailer.sendMail({
    from: `Phel Arts <${user}>`,
    to: email.to,
    replyTo: user,
    subject: email.subject,
    text: email.text,
    html: wrapHtml(email.text),
  });
}
