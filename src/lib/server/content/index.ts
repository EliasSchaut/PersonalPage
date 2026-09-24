import { dev } from '$app/environment';
import { LOCALES, isLocale, type Locale } from '$lib/i18n';
import { parseDocument, readingMinutes, renderMarkdown } from './markdown';
import type { Article, ArticleMeta, SearchDoc, TagInfo } from './types';
import { tagSlug } from '$lib/tags';

// Content is baked in at build time: a Sveltia commit needs a rebuild to show up.
const articleFiles = import.meta.glob('/content/articles/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export { tagSlug };

function buildArticle(locale: Locale, slug: string, source: string): Article {
  const { meta, body } = parseDocument(source);
  const rendered = renderMarkdown(body);
  return {
    ...meta,
    slug,
    locale,
    path: `/articles/${slug}`,
    readingMinutes: readingMinutes(rendered.words),
    html: rendered.html,
    plain: rendered.plain,
    toc: rendered.toc,
  };
}

function loadArticles(): Record<Locale, Article[]> {
  const byLocale = Object.fromEntries(LOCALES.map((l) => [l, [] as Article[]])) as Record<
    Locale,
    Article[]
  >;
  for (const [file, source] of Object.entries(articleFiles)) {
    const m = file.match(/\/content\/articles\/([^/]+)\/([^/]+)\.md$/);
    if (!m || !isLocale(m[1])) continue;
    try {
      byLocale[m[1]].push(buildArticle(m[1], m[2], source));
    } catch (err) {
      throw new Error(`Invalid article ${file}: ${(err as Error).message}`, { cause: err });
    }
  }
  for (const list of Object.values(byLocale)) {
    list.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  }
  return byLocale;
}

const articles = loadArticles();

export interface ListOptions {
  includeDrafts?: boolean;
}

export function getArticles(locale: Locale, opts: ListOptions = {}): Article[] {
  const includeDrafts = opts.includeDrafts ?? dev;
  return articles[locale].filter((a) => includeDrafts || a.published);
}

export function getArticleMetas(locale: Locale, opts?: ListOptions): ArticleMeta[] {
  return getArticles(locale, opts).map(toMeta);
}

export function toMeta(article: Article): ArticleMeta {
  const { html: _html, plain: _plain, toc: _toc, ...meta } = article;
  return meta;
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

export function getAdjacent(
  locale: Locale,
  slug: string,
): { prev?: ArticleMeta; next?: ArticleMeta } {
  const list = getArticles(locale);
  const i = list.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  // list is newest-first: "next" is the newer article, "prev" the older one
  return {
    next: i > 0 ? toMeta(list[i - 1]) : undefined,
    prev: i < list.length - 1 ? toMeta(list[i + 1]) : undefined,
  };
}

export function getTags(locale: Locale): TagInfo[] {
  const counts = new Map<string, TagInfo>();
  for (const a of getArticles(locale)) {
    for (const tag of a.tags) {
      const slug = tagSlug(tag);
      const info = counts.get(slug) ?? { tag, slug, count: 0 };
      info.count += 1;
      counts.set(slug, info);
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getArticlesByTag(locale: Locale, slug: string): ArticleMeta[] {
  return getArticleMetas(locale).filter((a) => a.tags.some((t) => tagSlug(t) === slug));
}

export function getSearchIndex(locale: Locale): SearchDoc[] {
  return getArticles(locale).map((a) => ({
    slug: a.slug,
    path: a.path,
    title: a.title,
    description: a.description,
    tags: a.tags,
    text: a.plain.split(' ').slice(0, 400).join(' '),
  }));
}
