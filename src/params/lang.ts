import type { ParamMatcher } from '@sveltejs/kit';

/** Matches the non-default locale prefix (`/de/...`). English has no prefix. */
export const match: ParamMatcher = (param) => param === 'de';
