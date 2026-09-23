import type { PageServerLoad } from './$types';
import { getTags } from '$lib/server/content';

export const load: PageServerLoad = ({ locals }) => ({ tags: getTags(locals.locale) });
