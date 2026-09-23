<script lang="ts">
  import Badge from '../Badge.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import type { ArticleMeta } from '$lib/server/content/types';
  import { tagSlug } from '$lib/tags';

  let { article }: { article: ArticleMeta } = $props();
  const i18n = getI18n();
</script>

<a
  class="group flex flex-col items-center justify-start gap-6 rounded-2xl p-5 hover:bg-second-100 sm:flex-row dark:hover:bg-second-900"
  href={i18n.path(article.path)}
>
  {#if article.cover}
    <img
      class="h-32 w-32 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
      height="128"
      width="128"
      src={article.cover}
      alt="{article.title} cover"
      loading="lazy"
    />
  {/if}
  <div class="flex w-full max-w-xl flex-col items-start justify-between">
    <div class="flex w-full items-center gap-x-4 text-xs">
      {#if article.date}
        <time datetime={article.date} class="text-second-500 dark:text-second-400">
          {i18n.formatDate(article.date)}
        </time>
      {/if}
      <span class="text-second-500 dark:text-second-400">
        {i18n.t('articles.reading_time', { minutes: article.readingMinutes })}
      </span>
      <div class="flex flex-1 justify-end gap-1">
        {#each article.tags as tag (tag)}
          <Badge content={tag} href={i18n.path(`/articles/tags/${tagSlug(tag)}`)} />
        {/each}
      </div>
    </div>
    <div>
      <h3
        class="mt-3 text-lg leading-6 font-semibold text-second-900 group-hover:underline dark:text-white"
      >
        {article.title}
      </h3>
      {#if article.description}
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-second-600 dark:text-second-100">
          {article.description}
        </p>
      {/if}
    </div>
  </div>
</a>
