import { getContext, setContext } from 'svelte';
import { type Locale, BCP47, localePath } from './index';
import { translate, type Params } from './messages';

const KEY = Symbol('i18n');

export interface I18n {
  readonly locale: Locale;
  readonly bcp47: string;
  t: (key: string, params?: Params) => string;
  /** Prefix `path` for the current locale. */
  path: (path: string) => string;
  formatDate: (date: string | Date, opts?: Intl.DateTimeFormatOptions) => string;
}

/**
 * Create the i18n helper for the current request/page. The locale is read
 * through a getter so it stays reactive to navigation without leaking state
 * between server requests.
 */
export function createI18n(getLocale: () => Locale): I18n {
  return {
    get locale() {
      return getLocale();
    },
    get bcp47() {
      return BCP47[getLocale()];
    },
    t: (key, params) => translate(getLocale(), key, params),
    path: (path) => localePath(getLocale(), path),
    formatDate: (date, opts = { dateStyle: 'long' }) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      if (Number.isNaN(d.getTime())) return String(date);
      return new Intl.DateTimeFormat(BCP47[getLocale()], opts).format(d);
    },
  };
}

export function setI18n(i18n: I18n): I18n {
  return setContext(KEY, i18n);
}

export function getI18n(): I18n {
  const ctx = getContext<I18n | undefined>(KEY);
  if (!ctx) throw new Error('i18n context missing: call setI18n() in the root layout');
  return ctx;
}
