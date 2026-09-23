import type { PageServerLoad } from './$types';
import { getArticleMetas, getTags } from '$lib/server/content';

export const load: PageServerLoad = ({ locals }) => ({
  articles: getArticleMetas(locals.locale),
  tags: getTags(locals.locale),
});
