import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPage } from '$lib/server/content';

export const load: PageServerLoad = ({ locals }) => {
  const page = getPage(locals.locale, 'resources');
  if (!page) error(404);
  return { page };
};
