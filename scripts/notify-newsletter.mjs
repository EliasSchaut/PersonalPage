#!/usr/bin/env node
/**
 * Create and start a Listmonk campaign for every article that was ADDED in
 * the last commit and is `published: true` and not older than MAX_AGE_DAYS.
 *
 * Env: LISTMONK_URL, LISTMONK_API_USER, LISTMONK_API_TOKEN,
 *      LISTMONK_LIST_ID_EN, LISTMONK_LIST_ID_DE, SITE_URL
 *
 * Listmonk API: https://listmonk.app/docs/apis/campaigns/
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const MAX_AGE_DAYS = 7;
const {
  LISTMONK_URL,
  LISTMONK_API_USER,
  LISTMONK_API_TOKEN,
  LISTMONK_LIST_ID_EN,
  LISTMONK_LIST_ID_DE,
  SITE_URL = 'https://schaut.dev',
} = process.env;

if (!LISTMONK_URL || !LISTMONK_API_USER || !LISTMONK_API_TOKEN) {
  console.log('Listmonk not configured, skipping.');
  process.exit(0);
}

const listIds = { en: Number(LISTMONK_LIST_ID_EN), de: Number(LISTMONK_LIST_ID_DE) };
const auth =
  'Basic ' + Buffer.from(`${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`).toString('base64');

const added = execSync('git diff --diff-filter=A --name-only HEAD~1 HEAD', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /^content\/articles\/(en|de)\/[^/]+\.md$/.test(f));

if (!added.length) {
  console.log('No new articles.');
  process.exit(0);
}

function frontmatter(file) {
  const src = readFileSync(file, 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  for (const line of (m?.[1] ?? '').split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
  }
  return fm;
}

async function api(path, body) {
  const res = await fetch(`${LISTMONK_URL.replace(/\/$/, '')}/api${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${await res.text()}`);
  return (await res.json()).data;
}

async function setStatus(id, status) {
  const res = await fetch(`${LISTMONK_URL.replace(/\/$/, '')}/api/campaigns/${id}/status`, {
    method: 'PUT',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`status -> ${res.status} ${await res.text()}`);
}

for (const file of added) {
  const [, locale, slug] = file.match(/^content\/articles\/(en|de)\/([^/]+)\.md$/);
  const fm = frontmatter(file);
  if (fm.published !== 'true') {
    console.log(`skip ${file}: not published`);
    continue;
  }
  const age = (Date.now() - new Date(fm.date ?? 0).getTime()) / 86_400_000;
  if (!fm.date || age > MAX_AGE_DAYS) {
    console.log(`skip ${file}: date ${fm.date} older than ${MAX_AGE_DAYS} days`);
    continue;
  }
  if (!listIds[locale]) {
    console.log(`skip ${file}: no list id for ${locale}`);
    continue;
  }
  const url = `${SITE_URL}${locale === 'de' ? '/de' : ''}/articles/${slug}`;
  const readMore = locale === 'de' ? 'Weiterlesen' : 'Read more';
  const cover = fm.cover
    ? `<p><img src="${SITE_URL}${fm.cover}" alt="" style="max-width:100%;border-radius:8px"></p>`
    : '';
  const campaign = await api('/campaigns', {
    name: `${fm.title} (${locale})`,
    subject: fm.title,
    lists: [listIds[locale]],
    type: 'regular',
    content_type: 'richtext',
    body: `<h1>${fm.title}</h1>${cover}<p>${fm.description ?? ''}</p><p><a href="${url}">${readMore} →</a></p>`,
  });
  await setStatus(campaign.id, 'running');
  console.log(`sent campaign #${campaign.id} for ${url}`);
}
