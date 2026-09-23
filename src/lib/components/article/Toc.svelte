<script lang="ts">
  import type { TocEntry } from '$lib/server/content/types';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { toc }: { toc: TocEntry[] } = $props();
  const i18n = getI18n();
</script>

{#if toc.length > 1}
  <nav
    aria-label={i18n.t('articles.toc')}
    class="not-prose my-8 rounded-xl border border-second-200 bg-second-100/60 p-5 text-sm dark:border-second-800 dark:bg-second-900"
  >
    <details open class="group">
      <summary class="cursor-pointer list-none font-semibold text-second-800 dark:text-second-200">
        {i18n.t('articles.toc')}
      </summary>
      <ol class="mt-3 space-y-1">
        {#each toc as entry (entry.id)}
          <li class={entry.depth === 3 ? 'ml-4' : ''}>
            <a
              href="#{entry.id}"
              class="block py-0.5 text-second-600 hover:text-prime-500 dark:text-second-400 dark:hover:text-prime-400"
            >
              {entry.text}
            </a>
          </li>
        {/each}
      </ol>
    </details>
  </nav>
{/if}
