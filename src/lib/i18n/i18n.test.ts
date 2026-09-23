import { describe, expect, it } from 'vitest';
import { localeFromPath, localePath, negotiateLocale, normalizeLocale, stripLocale } from './index';
import { messages, translate } from './messages';

function keys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object'
      ? keys(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

describe('messages', () => {
  it('has the same keys in every locale', () => {
    expect(keys(messages.de).sort()).toEqual(keys(messages.en).sort());
  });

  it('interpolates params and falls back to english, then to the key', () => {
    expect(translate('de', 'donate.me', { name: 'Elias' })).toBe('Spende Elias');
    expect(translate('de', 'articles.reading_time', { minutes: 3 })).toBe('3 Min. Lesezeit');
    expect(translate('de', 'does.not.exist')).toBe('does.not.exist');
  });
});

describe('locale helpers', () => {
  it('derives the locale from the path', () => {
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('/de')).toBe('de');
    expect(localeFromPath('/de/articles')).toBe('de');
    expect(localeFromPath('/design')).toBe('en');
  });

  it('adds and strips the prefix', () => {
    expect(localePath('de', '/')).toBe('/de');
    expect(localePath('de', '/articles/x')).toBe('/de/articles/x');
    expect(localePath('en', '/de/articles/x')).toBe('/articles/x');
    expect(stripLocale('/de')).toBe('/');
  });

  it('accepts legacy nuxt cookie values', () => {
    expect(normalizeLocale('de_DE')).toBe('de');
    expect(normalizeLocale('en-US')).toBe('en');
    expect(normalizeLocale('fr')).toBeUndefined();
  });

  it('negotiates Accept-Language', () => {
    expect(negotiateLocale('de-DE,de;q=0.9,en;q=0.8')).toBe('de');
    expect(negotiateLocale('fr,en;q=0.5')).toBe('en');
    expect(negotiateLocale(null)).toBe('en');
  });
});
