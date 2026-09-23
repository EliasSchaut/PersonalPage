<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChevronRightIcon from '~icons/heroicons/chevron-right-20-solid';

  export interface ListItem {
    content: string;
    subcontent?: string;
    href?: string;
    icon?: string;
  }

  let { list, icon }: { list: ListItem[]; icon?: Snippet<[string]> } = $props();
</script>

<ul
  class="divide-y divide-second-100 overflow-hidden bg-white shadow-sm ring-1 ring-second-900/5 sm:rounded-xl dark:divide-second-700 dark:bg-second-800 dark:ring-second-700"
>
  {#each list as element (element.content)}
    <li
      class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-second-50 sm:px-6 dark:hover:bg-second-900"
    >
      <div class="flex min-w-0 gap-x-4">
        {#if element.icon && icon}
          <span class="h-6 w-6 flex-none [&>svg]:h-6 [&>svg]:w-6">{@render icon(element.icon)}</span
          >
        {/if}
        <div class="min-w-0 flex-auto">
          <p class="text-sm leading-6 font-semibold text-second-900 dark:text-second-100">
            {#if element.href}
              <a href={element.href} target="_blank" rel="noopener noreferrer">
                <span class="absolute inset-x-0 -top-px bottom-0"></span>
                {element.content}
              </a>
            {:else}
              <span>{element.content}</span>
            {/if}
          </p>
          {#if element.subcontent}
            <p class="text-second-600 dark:text-second-400">{element.subcontent}</p>
          {/if}
        </div>
      </div>
      {#if element.href}
        <div class="flex shrink-0 items-center gap-x-4">
          <ChevronRightIcon
            class="h-5 w-5 flex-none text-second-400 dark:text-second-500"
            aria-hidden="true"
          />
        </div>
      {/if}
    </li>
  {/each}
</ul>
