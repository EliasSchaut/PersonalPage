import type { RequestHandler } from './$types';
import { getArticleMetas, getTags } from '$lib/server/content';
import { site } from '$lib/data/socials';
import { LOCALES, localePath } from '$lib/i18n';

const STATIC_PATHS = ['/', '/about', '/projects', '/articles', '/articles/tags', '/newsletter'];

function urlBlock(path: string, lastmod?: string): string {
  const alternates = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.url}${localePath(l, path)}" />`,
  ).join('\n');
  return LOCALES.map(
    (l) => `  <url>
    <loc>${site.url}${localePath(l, path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${path}" />
  </url>`,
  ).join('\n');
}

export const GET: RequestHandler = () => {
  const blocks = STATIC_PATHS.map((p) => urlBlock(p));

  // Articles exist in both locales with the same slug; use the English list as the source of truth.
  for (const a of getArticleMetas('en', { includeDrafts: false }))
    blocks.push(urlBlock(a.path, a.date));
  for (const t of getTags('en')) blocks.push(urlBlock(`/articles/tags/${t.slug}`));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
