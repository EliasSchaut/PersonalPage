import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticlesByTag, getTags } from '$lib/server/content';

export const load: PageServerLoad = ({ locals, params }) => {
  const slug = params.tag.toLowerCase();
  const info = getTags(locals.locale).find((t) => t.slug === slug);
  if (!info) error(404);
  return { tag: info, articles: getArticlesByTag(locals.locale, slug) };
};
