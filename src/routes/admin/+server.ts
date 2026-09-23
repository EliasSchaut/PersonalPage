import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/** Sveltia CMS lives in `static/admin/index.html`; `/admin` without a slash lands here. */
export const GET: RequestHandler = () => {
  redirect(302, '/admin/index.html');
};
