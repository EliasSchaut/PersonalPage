import type { LayoutServerLoad } from './$types';
import { localeFromPath } from '$lib/i18n';

export const load: LayoutServerLoad = ({ locals, url }) => ({
  // Derived from the URL so client-side navigation between /… and /de/… re-runs this load.
  locale: localeFromPath(url.pathname),
  theme: locals.theme,
});
