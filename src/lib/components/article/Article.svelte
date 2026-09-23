<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<article
  class={[
    'prose prose-lg max-w-none text-second-800 lg:prose-xl dark:text-second-100 dark:prose-invert',
    className,
  ]}
>
  {@render children()}
</article>
