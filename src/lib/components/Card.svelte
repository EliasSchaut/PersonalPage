<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    icon,
    class: className = '',
    children,
  }: { title: string; icon: Snippet; class?: string; children: Snippet } = $props();
</script>

<div class={['glass glass-hover flex flex-col gap-5 rounded-3xl p-6 sm:p-7', className]}>
  <h2 class="flex items-center gap-3 text-xl font-extrabold text-second-900 dark:text-white">
    <span class="icon-tile">{@render icon()}</span>
    <span>{title}</span>
  </h2>
  <div class="text-base leading-7 wrap-break-word text-second-700 dark:text-second-200">
    {@render children()}
  </div>
</div>
