<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, intro, children }: { title: string; intro: string; children: Snippet } = $props();
</script>

<header class="max-w-2xl">
  <h1 class="text-4xl font-bold tracking-tight text-second-800 sm:text-5xl dark:text-second-100">
    {title}
  </h1>
  <p class="mt-6 text-base text-second-600 dark:text-second-400">{intro}</p>
</header>
<div class="mt-16 sm:mt-20">
  {@render children()}
</div>
