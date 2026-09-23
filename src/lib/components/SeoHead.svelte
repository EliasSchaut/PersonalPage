<script lang="ts">
  import { page } from '$app/state';
  import { LOCALES, OG_LOCALE, localePath, stripLocale } from '$lib/i18n';
  import { getI18n } from '$lib/i18n/context.svelte';
  import { site } from '$lib/data/socials';

  let {
    title,
    description = site.description,
    image,
    type = 'website',
    publishedTime,
    tags = [],
    noindex = false,
  }: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    tags?: string[];
    noindex?: boolean;
  } = $props();

  const i18n = getI18n();
  const fullTitle = $derived(title ? `${title} · ${site.title}` : site.title);
  const basePath = $derived(stripLocale(page.url.pathname));
  const canonical = $derived(site.url + localePath(i18n.locale, basePath));
  const imageUrl = $derived(
    image
      ? image.startsWith('http')
        ? image
        : site.url + image
      : `${site.url}/img/avatar_elias.jpg`,
  );
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={site.keywords} />
  <link rel="canonical" href={canonical} />
  {#if noindex}
    <meta name="robots" content="noindex" />
  {/if}
  {#each LOCALES as locale (locale)}
    <link rel="alternate" hreflang={locale} href={site.url + localePath(locale, basePath)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={site.url + basePath} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="{site.title} ({i18n.locale})"
    href={site.url + i18n.path('/rss.xml')}
  />

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={site.title} />
  <meta property="og:title" content={title ?? site.title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:locale" content={OG_LOCALE[i18n.locale]} />
  {#each LOCALES.filter((l) => l !== i18n.locale) as locale (locale)}
    <meta property="og:locale:alternate" content={OG_LOCALE[locale]} />
  {/each}
  {#if type === 'article' && publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  {#each tags as tag (tag)}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title ?? site.title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
</svelte:head>
