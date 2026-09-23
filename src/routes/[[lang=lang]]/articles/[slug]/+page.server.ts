import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAdjacent, getArticle } from '$lib/server/content';

export const load: PageServerLoad = ({ locals, params }) => {
  const article = getArticle(locals.locale, params.slug);
  if (!article) error(404);
  const { plain: _plain, ...rest } = article;
  return { article: rest, ...getAdjacent(locals.locale, params.slug) };
};
