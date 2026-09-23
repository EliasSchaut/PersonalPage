import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isLocale } from '$lib/i18n';
import { getSearchIndex } from '$lib/server/content';

export const GET: RequestHandler = ({ params }) => {
  if (!isLocale(params.lang)) error(404);
  return json(getSearchIndex(params.lang), {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
};
