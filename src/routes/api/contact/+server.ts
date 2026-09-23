import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendContactMail, validateContact } from '$lib/server/mail';

/** JSON variant of the contact form action (kept for compatibility with the old URL). */
export const POST: RequestHandler = async ({ request }) => {
  let body: { email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    error(400, 'Invalid JSON');
  }
  const email = String(body.email ?? '');
  const message = String(body.message ?? '');
  if (validateContact(email, message)) error(400, 'Invalid email or message');
  try {
    await sendContactMail({ email, message });
  } catch (err) {
    console.error('contact mail failed', err);
    error(500, 'Mail could not be sent');
  }
  return json({ ok: true });
};
