import en from './en.json';
import de from './de.json';
import { DEFAULT_LOCALE, type Locale } from './index';

type Messages = Record<string, unknown>;
export const messages: Record<Locale, Messages> = { en, de };

function lookup(tree: Messages, key: string): string | undefined {
  let node: unknown = tree;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === 'string' ? node : undefined;
}

export type Params = Record<string, string | number>;

/** Translate `key` in `locale`, falling back to the default locale and then to the key itself. */
export function translate(locale: Locale, key: string, params?: Params): string {
  const raw = lookup(messages[locale], key) ?? lookup(messages[DEFAULT_LOCALE], key) ?? key;
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
