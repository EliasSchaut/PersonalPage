import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { localePath } from '$lib/i18n';

/** Merged into the legal page; keep old links working. */
export const load: PageServerLoad = ({ locals }) => {
  redirect(301, localePath(locals.locale, '/legal#privacy'));
};
