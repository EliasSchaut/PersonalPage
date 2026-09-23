import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString as hastToString } from 'hast-util-to-string';
import type { Root as HastRoot, Element } from 'hast';
import { z } from 'zod';
import type { TocEntry } from './types';

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  cover: z.string().optional(),
  date: z
    .union([z.string(), z.date()])
    .optional()
    .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d))
    .refine((d) => d === undefined || /^\d{4}-\d{2}-\d{2}$/.test(d), {
      message: 'date must be YYYY-MM-DD',
    }),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});
export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface Rendered {
  html: string;
  plain: string;
  toc: TocEntry[];
  words: number;
}

const WORDS_PER_MINUTE = 200;

/** Collect h2/h3 headings (after rehype-slug assigned ids) and plain text. */
function rehypeCollect(store: { toc: TocEntry[]; plain: string }) {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const id = typeof node.properties?.id === 'string' ? node.properties.id : undefined;
        if (id) {
          store.toc.push({ id, text: hastToString(node), depth: node.tagName === 'h2' ? 2 : 3 });
        }
      }
      if (node.tagName === 'img') {
        node.properties = { ...node.properties, loading: 'lazy', decoding: 'async' };
      }
    });
    store.plain = hastToString(tree).replace(/\s+/g, ' ').trim();
  };
}

const processor = (store: { toc: TocEntry[]; plain: string }) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-anchor'] },
    })
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeCollect, store)
    .use(rehypeStringify, { allowDangerousHtml: true });

/** Render markdown (without frontmatter) to HTML plus derived metadata. */
export function renderMarkdown(markdown: string): Rendered {
  const store = { toc: [] as TocEntry[], plain: '' };
  const file = processor(store).processSync(markdown);
  const words = store.plain ? store.plain.split(' ').length : 0;
  return { html: String(file), plain: store.plain, toc: store.toc, words };
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Split a markdown document into validated frontmatter and body. */
export function parseDocument(source: string): { meta: Frontmatter; body: string } {
  const { data, content } = matter(source);
  return { meta: frontmatterSchema.parse(data), body: content };
}
