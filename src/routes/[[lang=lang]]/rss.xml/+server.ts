import type { RequestHandler } from './$types';
import { getArticles } from '$lib/server/content';
import { site } from '$lib/data/socials';
import { BCP47, localePath } from '$lib/i18n';
import { translate } from '$lib/i18n/messages';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Make root-relative URLs in article HTML absolute for feed readers. */
const absolutize = (html: string) => html.replace(/(src|href)="\/(?!\/)/g, `$1="${site.url}/`);

export const prerender = false;

export const GET: RequestHandler = ({ locals }) => {
  const locale = locals.locale;
  const self = `${site.url}${localePath(locale, '/rss.xml')}`;
  const articles = getArticles(locale, { includeDrafts: false });
  const lastBuild = articles[0]?.date ? new Date(articles[0].date) : new Date();

  const items = articles
    .map((a) => {
      const url = `${site.url}${localePath(locale, a.path)}`;
      return `
    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${a.date ? `<pubDate>${new Date(a.date).toUTCString()}</pubDate>` : ''}
      <description>${esc(a.description)}</description>
      ${a.tags.map((t) => `<category>${esc(t)}</category>`).join('')}
      ${a.cover ? `<enclosure url="${site.url}${a.cover}" type="image/png" length="0" />` : ''}
      <content:encoded><![CDATA[${absolutize(a.html)}]]></content:encoded>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${site.url}${localePath(locale, '/articles')}</link>
    <description>${esc(translate(locale, 'articles.intro'))}</description>
    <language>${BCP47[locale].toLowerCase()}</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
