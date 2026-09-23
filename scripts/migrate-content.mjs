#!/usr/bin/env node
/**
 * One-time content migration from the Nuxt Content / MDC flavoured markdown
 * to plain CommonMark + inline HTML that Sveltia CMS and the unified pipeline
 * understand. Idempotent: running it twice yields the same result.
 *
 *  - cover: <file>            -> cover: /articles/covers/<file>
 *  - leading "# Title" line   -> removed (title is rendered from frontmatter)
 *  - [..](/?tag=X) links      -> /articles/tags/x
 *  - :br                      -> <br>
 *  - :orange{content="X"}     -> <mark>X</mark> (paragraph re-wrapped in <em>)
 *  - &#x20;                   -> " "
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../content/', import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

const ORANGE = /:orange\{content="([^"]*)"\}/g;

function convertOrangeParagraph(paragraph) {
  let text = paragraph
    .replace(/&#x20;/g, ' ')
    .replace(ORANGE, '<mark>$1</mark>')
    .replace(/\s*:br\s*/g, ' <br>')
    .replace(/\*/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/[ \t]{2,}/g, ' ');
  const lines = text.split('\n');
  // keep the blank "\_ \_ \_" answer line outside of the emphasis
  const tail = [];
  while (lines.length && lines[lines.length - 1].startsWith('\\_')) tail.unshift(lines.pop());
  return [`<em>${lines.join('\n')}</em>`, ...tail].join('\n');
}

function migrate(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error('no frontmatter');
  let fm = m[1];
  let body = src.slice(m[0].length);

  fm = fm.replace(/^cover:\s*(?!\/)(\S+)\s*$/m, 'cover: /articles/covers/$1');

  body = body.replace(/^\s*\n?# [^\n]*\n+/, '');

  body = body
    .replace(/\]\(\/\?tag=([^)]+)\)/g, (_, t) => `](/articles/tags/${t.toLowerCase()})`)
    .replace(/\]\(\/articles\?tag=([^)]+)\)/g, (_, t) => `](/articles/tags/${t.toLowerCase()})`);

  body = body
    .split(/\n{2,}/)
    .map((p) => (ORANGE.test(p) ? convertOrangeParagraph(p) : p))
    .join('\n\n');

  body = body
    .replace(/ ?:br(?=\s|\*|$)/gm, ' <br>')
    .replace(/&#x20;\*\*\*\*([^*]+)\*\*\*\*/g, ' <strong>$1</strong>')
    .replace(/&#x20;/g, ' ');

  return `---\n${fm}\n---\n\n${body.trimEnd()}\n`;
}

for (const file of walk(root)) {
  const before = readFileSync(file, 'utf8');
  const after = migrate(before);
  if (after !== before) {
    writeFileSync(file, after);
    console.log('migrated', file.replace(root, ''));
  }
}
