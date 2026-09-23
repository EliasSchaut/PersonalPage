<script lang="ts">
  import { tools } from '$lib/data/tools';

  let { class: className = '' }: { class?: string } = $props();
</script>

<ul class={['flex flex-wrap gap-3', className]}>
  {#each tools as tool (tool.name)}
    <li>
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        title={tool.name}
        class="pill pill-icon tool-tile h-13 w-13 rounded-2xl"
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
