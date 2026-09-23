<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Article from '$lib/components/article/Article.svelte';
  import Toc from '$lib/components/article/Toc.svelte';
  import PrevNext from '$lib/components/article/PrevNext.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import NewsletterForm from '$lib/components/NewsletterForm.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import { tagSlug } from '$lib/tags';
  import ArrowLeftIcon from '~icons/heroicons/arrow-left';

  let { data } = $props();
  const i18n = getI18n();
  const a = $derived(data.article);
</script>

<SeoHead
  title={a.title}
  description={a.description}
  image={a.cover}
  type="article"
  publishedTime={a.date}
  tags={a.tags}
/>

<a
  href={i18n.path('/articles')}
  class="mb-8 inline-flex items-center gap-1 text-sm text-second-500 hover:text-prime-500 dark:text-second-400 dark:hover:text-prime-400"
>
  <ArrowLeftIcon class="h-4 w-4" aria-hidden="true" />
  {i18n.t('articles.back_to_articles')}
</a>

<Article>
  <header class="not-prose mb-10">
    <div
      class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-second-500 dark:text-second-400"
    >
      {#if a.date}
        <time datetime={a.date}>{i18n.formatDate(a.date)}</time>
      {/if}
      <span>{i18n.t('articles.reading_time', { minutes: a.readingMinutes })}</span>
      <span class="flex flex-1 flex-wrap justify-end gap-1">
        {#each a.tags as tag (tag)}
          <Badge content={tag} href={i18n.path(`/articles/tags/${tagSlug(tag)}`)} />
        {/each}
      </span>
    </div>
    <h1 class="mt-4 text-4xl font-bold tracking-tight text-second-900 sm:text-5xl dark:text-white">
      {a.title}
    </h1>
    {#if a.description}
      <p class="mt-4 text-lg text-second-600 dark:text-second-400">{a.description}</p>
    {/if}
    {#if a.cover}
      <img
        src={a.cover}
        alt="{a.title} cover"
        class="mx-auto mt-8 w-full max-w-md rounded-xl"
        width="512"
        height="512"
      />
    {/if}
  </header>

  <Toc toc={a.toc} />

  <!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted, repo-owned markdown -->
  {@html a.html}

  <PrevNext prev={data.prev} next={data.next} />
</Article>

<div class="mt-16">
  <NewsletterForm compact />
</div>
