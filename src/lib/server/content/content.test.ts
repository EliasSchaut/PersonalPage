import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  getAdjacent,
  getArticle,
  getArticles,
  getArticlesByTag,
  getPage,
  getSearchIndex,
  getTags,
} from './index';

describe('content', () => {
  it('has the same articles in both locales', () => {
    const en = getArticles('en', { includeDrafts: true })
      .map((a) => a.slug)
      .sort();
    const de = getArticles('de', { includeDrafts: true })
      .map((a) => a.slug)
      .sort();
    expect(en.length).toBeGreaterThan(0);
    expect(de).toEqual(en);
  });

  it('sorts newest first and only lists published articles by default', () => {
    const list = getArticles('en', { includeDrafts: false });
    for (let i = 1; i < list.length; i++) {
      expect((list[i - 1].date ?? '') >= (list[i].date ?? '')).toBe(true);
    }
    expect(list.every((a) => a.published)).toBe(true);
  });

  it('references existing cover files', () => {
    for (const a of getArticles('en', { includeDrafts: true })) {
      if (a.cover) expect(existsSync(`static${a.cover}`), a.cover).toBe(true);
    }
  });

  it('renders no leftover MDC syntax', () => {
    for (const a of [
      ...getArticles('en', { includeDrafts: true }),
      ...getArticles('de', { includeDrafts: true }),
    ]) {
      expect(a.html).not.toMatch(/:br\b|:orange\{|&#x20;/);
    }
  });

  it('computes prev/next within a locale', () => {
    const [newest, second] = getArticles('en');
    const adj = getAdjacent('en', second.slug);
    expect(adj.next?.slug).toBe(newest.slug);
    expect(getAdjacent('en', newest.slug).next).toBeUndefined();
  });

  it('exposes tags and filters by tag slug', () => {
    const tags = getTags('en');
    expect(tags.map((t) => t.slug)).toContain('meta');
    const meta = getArticlesByTag('en', 'meta');
    expect(meta.length).toBeGreaterThan(0);
    expect(meta.every((a) => a.tags.includes('Meta'))).toBe(true);
  });

  it('loads the resources page per locale', () => {
    expect(getPage('en', 'resources')?.title).toBe('Resource Compilation');
    expect(getPage('de', 'resources')?.title).toBe('Verwendete Ressourcen');
  });

  it('builds a compact search index', () => {
    const index = getSearchIndex('en');
    expect(index.length).toBe(getArticles('en').length);
    expect(getArticle('en', index[0].slug)).toBeDefined();
    expect(index[0].text.split(' ').length).toBeLessThanOrEqual(400);
  });
});
