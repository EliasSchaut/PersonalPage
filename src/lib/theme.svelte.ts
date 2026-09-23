import { getContext, setContext } from 'svelte';

export const THEMES = ['light', 'dark', 'system'] as const;
export type ThemePreference = (typeof THEMES)[number];
export const THEME_COOKIE = 'theme';
const MAX_AGE = 60 * 60 * 24 * 365;

export function parseTheme(value: string | undefined | null): ThemePreference {
  return (THEMES as readonly string[]).includes(value ?? '')
    ? (value as ThemePreference)
    : 'system';
}

export class Theme {
  preference = $state<ThemePreference>('system');
  #media: MediaQueryList | undefined;

  constructor(initial: ThemePreference) {
    this.preference = initial;
  }

  /** Attach to the document. Call once from the root layout in the browser. */
  mount() {
    this.#media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => this.#apply();
    this.#media.addEventListener('change', onChange);
    this.#apply();
    return () => this.#media?.removeEventListener('change', onChange);
  }

  set(preference: ThemePreference) {
    this.preference = preference;
    document.cookie = `${THEME_COOKIE}=${preference}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
    this.#apply();
  }

  toggle() {
    if (this.preference === 'light') this.set('dark');
    else if (this.preference === 'dark') this.set('system');
    else this.set('light');
  }

  #apply() {
    const dark =
      this.preference === 'dark' ||
      (this.preference === 'system' && (this.#media?.matches ?? true));
    document.documentElement.classList.toggle('dark', dark);
  }
}

const KEY = Symbol('theme');
export const setTheme = (theme: Theme) => setContext(KEY, theme);
export const getTheme = () => getContext<Theme>(KEY);
