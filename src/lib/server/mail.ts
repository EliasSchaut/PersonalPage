import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 5000;

/** Returns an i18n error key, or `undefined` when the input is valid. */
export function validateContact(email: string, message: string): string | undefined {
  if (!EMAIL_RE.test(email.trim())) return 'home.contact.form.error_generic';
  const text = message.trim();
  if (!text || text.length > MAX_MESSAGE) return 'home.contact.form.error_generic';
  return undefined;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function transport() {
  if (!env.SMTP_HOST) throw new Error('SMTP_HOST is not configured');
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT ?? 587),
    secure: env.SMTP_SECURE === 'true',
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } : undefined,
  });
}

export async function sendContactMail({ email, message }: { email: string; message: string }) {
  const from = env.SMTP_FROM ?? 'Personal Page <info@schaut.dev>';
  const to = env.SMTP_TO ?? 'elias@schaut.dev';
  await transport().sendMail({
    from,
    to,
    replyTo: email.trim(),
    subject: `Contact form: ${email.trim()}`,
    text: `From: ${email.trim()}\n\n${message.trim()}`,
    html: `<p><b>From:</b> ${escapeHtml(email.trim())}</p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message.trim())}</pre>`,
  });
}
