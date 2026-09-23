<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    icon,
    class: className = '',
    children,
  }: { title: string; icon: Snippet; class?: string; children: Snippet } = $props();
</script>

<div
  class={[
    'overflow-hidden rounded-xl border border-second-200 bg-white dark:border-second-700 dark:bg-second-900 dark:text-second-100',
    className,
  ]}
>
  <div
    class="flex items-center gap-x-4 border-b border-second-900/5 bg-second-50 p-6 dark:bg-second-800"
  >
    <div
      class="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white object-cover ring-1 ring-second-900/10 dark:bg-second-900 dark:ring-second-700 [&>svg]:h-8 [&>svg]:w-8"
    >
      {@render icon()}
    </div>
    <h2 class="text-lg leading-6 font-medium text-second-900 dark:text-second-200">{title}</h2>
  </div>
  <div class="px-6 py-4 text-sm leading-6 wrap-break-word text-second-500 dark:text-second-400">
    {@render children()}
  </div>
</div>
