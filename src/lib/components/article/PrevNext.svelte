<script lang="ts">
  import type { ArticleMeta } from '$lib/server/content/types';
  import { getI18n } from '$lib/i18n/context.svelte';
  import ArrowLeftIcon from '~icons/heroicons/arrow-left';
  import ArrowRightIcon from '~icons/heroicons/arrow-right';

  let { prev, next }: { prev?: ArticleMeta; next?: ArticleMeta } = $props();
  const i18n = getI18n();
  const linkClass =
    'border-second-200 hover:bg-second-100 dark:border-second-800 dark:hover:bg-second-900 flex flex-1 flex-col gap-1 rounded-xl border p-4 text-sm';
</script>

{#if prev || next}
  <nav class="not-prose mt-12 flex flex-col gap-4 sm:flex-row" aria-label="Pagination">
    {#if prev}
      <a href={i18n.path(prev.path)} class={linkClass} rel="prev">
        <span class="flex items-center gap-1 text-xs text-second-500 dark:text-second-400">
          <ArrowLeftIcon class="h-4 w-4" aria-hidden="true" />
          {i18n.t('articles.prev')}
        </span>
        <span class="font-semibold text-second-900 dark:text-white">{prev.title}</span>
      </a>
    {:else}
      <span class="flex-1"></span>
    {/if}
    {#if next}
      <a href={i18n.path(next.path)} class={[linkClass, 'items-end text-right']} rel="next">
        <span class="flex items-center gap-1 text-xs text-second-500 dark:text-second-400">
          {i18n.t('articles.next')}
          <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
        </span>
        <span class="font-semibold text-second-900 dark:text-white">{next.title}</span>
      </a>
    {/if}
  </nav>
{/if}
