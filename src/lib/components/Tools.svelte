<script lang="ts">
  import { tools } from '$lib/data/tools';

  let { class: className = '' }: { class?: string } = $props();
</script>

<ul class={['flex flex-wrap gap-1', className]}>
  {#each tools as tool (tool.name)}
    <li>
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        title={tool.name}
        class="flex h-10 w-10 items-center justify-center rounded-md p-1 transition hover:bg-second-200 dark:hover:bg-second-800"
      >
        <img
          src="/devicons/{tool.icon}.svg"
          alt={tool.name}
          width="32"
          height="32"
          class="h-8 w-8"
          loading="lazy"
        />
      </a>
    </li>
  {/each}
</ul>
