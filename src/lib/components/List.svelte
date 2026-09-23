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

<ul class="flex flex-col gap-2">
  {#each list as element (element.content)}
    <li
      class="relative flex justify-between gap-x-6 rounded-2xl border border-transparent px-4 py-4 transition hover:border-prime-400 hover:bg-white/50 dark:hover:bg-white/5"
    >
      <div class="flex min-w-0 gap-x-4">
        {#if element.icon && icon}
          <span class="h-6 w-6 flex-none pt-0.5 [&>svg]:h-6 [&>svg]:w-6">
            {@render icon(element.icon)}
          </span>
        {/if}
        <div class="min-w-0 flex-auto">
          <p class="font-bold text-second-900 dark:text-white">
            {#if element.href}
              <a href={element.href} target="_blank" rel="noopener noreferrer">
                <span class="absolute inset-0"></span>
                {element.content}
              </a>
            {:else}
              <span>{element.content}</span>
            {/if}
          </p>
          {#if element.subcontent}
            <p class="text-[15px] text-second-600 dark:text-second-300">{element.subcontent}</p>
          {/if}
        </div>
      </div>
      {#if element.href}
        <ChevronRightIcon
          class="h-5 w-5 flex-none self-center text-second-400 dark:text-second-400"
          aria-hidden="true"
        />
      {/if}
    </li>
  {/each}
</ul>
