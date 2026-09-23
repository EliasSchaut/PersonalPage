import { describe, expect, it } from 'vitest';
import { frontmatterSchema, parseDocument, readingMinutes, renderMarkdown } from './markdown';

describe('frontmatter', () => {
  it('applies defaults and normalises YAML dates', () => {
    const { meta, body } = parseDocument(`---
title: Test
date: 2024-06-04
---

Hello`);
    expect(meta).toEqual({
      title: 'Test',
      description: '',
      date: '2024-06-04',
      published: false,
      tags: [],
    });
    expect(body.trim()).toBe('Hello');
  });

  it('rejects malformed dates', () => {
    expect(() => frontmatterSchema.parse({ title: 'x', date: '04.06.2024' })).toThrow();
  });
});

describe('renderMarkdown', () => {
  it('renders GFM tables and heading ids', () => {
    const { html, toc } = renderMarkdown('## Heading One\n\n| a | b |\n|---|---|\n| 1 | 2 |');
    expect(html).toContain('<table>');
    expect(html).toContain('id="heading-one"');
    expect(toc).toEqual([{ id: 'heading-one', text: 'Heading One', depth: 2 }]);
  });

  it('keeps inline HTML such as <mark> and <br> (converted MDC syntax)', () => {
    const { html } = renderMarkdown('<em>Dear <mark>[role]</mark> master, <br>as a bird</em>');
    expect(html).toContain('<mark>[role]</mark>');
    expect(html).toContain('<br>');
  });

  it('opens external links in a new tab and leaves internal links alone', () => {
    const { html } = renderMarkdown('[ext](https://example.com) [int](/articles/bday21)');
    expect(html).toMatch(/href="https:\/\/example.com"[^>]*target="_blank"/);
    expect(html).toMatch(/href="\/articles\/bday21"(?![^>]*target)/);
  });

  it('adds lazy loading to images', () => {
    const { html } = renderMarkdown('![alt](/articles/hodor.png)');
    expect(html).toContain('loading="lazy"');
  });

  it('extracts plain text and counts words', () => {
    const { plain, words } = renderMarkdown('# Title\n\nOne two **three** four.');
    expect(plain).toBe('Title One two three four.');
    expect(words).toBe(5);
  });
});

describe('readingMinutes', () => {
  it('rounds up and never returns zero', () => {
    expect(readingMinutes(0)).toBe(1);
    expect(readingMinutes(200)).toBe(1);
    expect(readingMinutes(201)).toBe(2);
    expect(readingMinutes(1000)).toBe(5);
  });
});
