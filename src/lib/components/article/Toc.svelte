<script lang="ts">
  import type { TocEntry } from '$lib/server/content/types';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { toc }: { toc: TocEntry[] } = $props();
  const i18n = getI18n();
</script>

{#if toc.length > 1}
  <nav aria-label={i18n.t('articles.toc')} class="not-prose glass my-8 rounded-3xl p-5 text-base">
    <details open class="group">
      <summary
        class="cursor-pointer list-none font-display text-lg font-extrabold text-second-900 dark:text-white"
      >
        {i18n.t('articles.toc')}
      </summary>
      <ol class="mt-3 space-y-1">
        {#each toc as entry (entry.id)}
          <li class={entry.depth === 3 ? 'ml-4' : ''}>
            <a
              href="#{entry.id}"
              class="block py-1 text-second-700 transition hover:text-prime-600 dark:text-second-200 dark:hover:text-prime-300"
            >
              {entry.text}
            </a>
          </li>
        {/each}
      </ol>
    </details>
  </nav>
{/if}
