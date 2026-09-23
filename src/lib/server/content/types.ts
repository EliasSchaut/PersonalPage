import type { Locale } from '$lib/i18n';

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface ArticleMeta {
  slug: string;
  locale: Locale;
  /** Locale-less path, e.g. `/articles/bday24`. */
  path: string;
  title: string;
  description: string;
  cover?: string;
  date?: string;
  published: boolean;
  tags: string[];
  readingMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
  plain: string;
  toc: TocEntry[];
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

export interface SearchDoc {
  slug: string;
  path: string;
  title: string;
  description: string;
  tags: string[];
  text: string;
}
