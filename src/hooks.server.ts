import { redirect, type Handle } from '@sveltejs/kit';
import { BCP47, LOCALE_COOKIE, localeFromPath, normalizeLocale } from '$lib/i18n';
import { parseTheme, THEME_COOKIE } from '$lib/theme.svelte';

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Returning visitors who chose German land on the German home page.
  // Only the bare root redirects, so crawlers and deep links stay untouched.
  const cookieLocale = normalizeLocale(event.cookies.get(LOCALE_COOKIE));
  if (pathname === '/' && cookieLocale === 'de') {
    redirect(302, '/de');
  }

  event.locals.locale = localeFromPath(pathname);
  event.locals.theme = parseTheme(
    event.cookies.get(THEME_COOKIE) ?? event.cookies.get('nuxt-color-mode'),
  );

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('%lang%', BCP47[event.locals.locale])
        .replace('%theme.class%', event.locals.theme === 'dark' ? 'dark' : ''),
  });
};
