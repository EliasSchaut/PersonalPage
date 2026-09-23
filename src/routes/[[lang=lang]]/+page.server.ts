import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendContactMail, validateContact } from '$lib/server/mail';

export const actions: Actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const error = validateContact(email, message);
    if (error) return fail(400, { contact: { error, email, message } });
    try {
      await sendContactMail({ email, message });
    } catch (err) {
      console.error('contact mail failed', err);
      return fail(500, { contact: { error: 'home.contact.form.error_generic', email, message } });
    }
    return { contact: { success: true } };
  },
};
