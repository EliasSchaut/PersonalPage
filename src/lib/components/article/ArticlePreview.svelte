<script lang="ts">
  import Badge from '../Badge.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import type { ArticleMeta } from '$lib/server/content/types';
  import { tagSlug } from '$lib/tags';

  let { article }: { article: ArticleMeta } = $props();
  const i18n = getI18n();
</script>

<article class="glass glass-hover group relative flex flex-col gap-5 rounded-3xl p-5 sm:flex-row">
  {#if article.cover}
    <img
      class="h-32 w-32 shrink-0 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
      height="128"
      width="128"
      src={article.cover}
      alt="{article.title} cover"
      loading="lazy"
    />
  {/if}
  <div class="flex min-w-0 flex-1 flex-col gap-2">
    <div
      class="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-second-600 dark:text-second-300"
    >
      {#if article.date}
        <time datetime={article.date}>{i18n.formatDate(article.date)}</time>
      {/if}
      <span>{i18n.t('articles.reading_time', { minutes: article.readingMinutes })}</span>
      <div class="flex flex-1 justify-end gap-1.5">
        {#each article.tags as tag (tag)}
          <Badge content={tag} href={i18n.path(`/articles/tags/${tagSlug(tag)}`)} />
        {/each}
      </div>
    </div>
    <h3 class="text-xl font-extrabold text-second-900 dark:text-white">
      <a href={i18n.path(article.path)} class="after:absolute after:inset-0 after:rounded-3xl">
        {article.title}
      </a>
    </h3>
    {#if article.description}
      <p class="line-clamp-3 text-base leading-7 text-second-700 dark:text-second-200">
        {article.description}
      </p>
    {/if}
  </div>
</article>
