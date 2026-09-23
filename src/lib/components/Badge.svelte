<script lang="ts">
  let { content, href }: { content: string; href?: string } = $props();
  const external = $derived(!!href && /^https?:\/\//.test(href));
</script>

{#if href && external}
  <a
    class="relative z-10 rounded-full bg-second-50 px-3 py-1.5 font-medium text-second-600 hover:bg-second-200 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700"
    {href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {content}
  </a>
{:else if href}
  <a
    class="relative z-10 rounded-full bg-second-200 px-3 py-1.5 font-medium text-second-600 hover:bg-second-300 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700"
    {href}
  >
    {content}
  </a>
{:else}
  <span
    class="relative z-10 rounded-full bg-second-50 px-3 py-1.5 font-medium text-second-600 dark:bg-second-800 dark:text-second-400"
  >
    {content}
  </span>
{/if}
