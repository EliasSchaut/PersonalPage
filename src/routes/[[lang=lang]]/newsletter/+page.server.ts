import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { subscribe } from '$lib/server/newsletter';
import { normalizeLocale } from '$lib/i18n';

export const actions: Actions = {
  default: async ({ request, locals, getClientAddress }) => {
    const data = await request.formData();
    const email = String(data.get('email') ?? '').trim();
    const consent = data.get('consent') === 'on';
    const honeypot = String(data.get('website') ?? '');
    const locale = normalizeLocale(String(data.get('locale') ?? '')) ?? locals.locale;

    if (honeypot) return { success: true }; // silently drop bots
    if (!consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'newsletter.error_invalid', email });
    }
    const result = await subscribe({ email, locale, ip: getClientAddress() });
    if (result === 'rate_limited') return fail(429, { error: 'newsletter.error_rate', email });
    if (result === 'error') return fail(502, { error: 'newsletter.error_generic', email });
    return { success: true };
  },
};
