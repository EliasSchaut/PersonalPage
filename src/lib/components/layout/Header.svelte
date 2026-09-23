<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, intro, children }: { title: string; intro: string; children: Snippet } = $props();
</script>

<header class="max-w-2xl">
  <h1 class="text-grad rise text-4xl font-extrabold tracking-tight sm:text-5xl">
    {title}
  </h1>
  <p class="rise rise-1 mt-5 text-lg text-second-600 dark:text-second-300">{intro}</p>
</header>
<div class="mt-12 sm:mt-16">
  {@render children()}
</div>
