export const LOCALES = ['en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_COOKIE = 'i18n_redirected';

export const BCP47: Record<Locale, string> = { en: 'en-US', de: 'de-DE' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', de: 'de_DE' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Accepts legacy Nuxt values like `de_DE` / `en-US` as well. */
export function normalizeLocale(value: string | undefined | null): Locale | undefined {
  if (!value) return undefined;
  const short = value.toLowerCase().slice(0, 2);
  return isLocale(short) ? short : undefined;
}

/** Locale from a URL pathname (`/de/articles` -> `de`). */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en';
}

/** Strip the locale prefix (`/de/articles` -> `/articles`). */
export function stripLocale(pathname: string): string {
  if (pathname === '/de') return '/';
  return pathname.startsWith('/de/') ? pathname.slice(3) : pathname;
}

/** Build a locale-aware path (`localePath('de', '/articles')` -> `/de/articles`). */
export function localePath(locale: Locale, path: string): string {
  const clean = stripLocale(path.startsWith('/') ? path : `/${path}`);
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? '/de' : `/de${clean}`;
}

/** Pick the best locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.toLowerCase(), q: q ? Number(q.split('=')[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of tags) {
    const l = normalizeLocale(tag);
    if (l) return l;
  }
  return DEFAULT_LOCALE;
}
