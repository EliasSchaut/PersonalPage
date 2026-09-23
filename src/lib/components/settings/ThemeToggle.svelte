<script lang="ts">
  import { getTheme } from '$lib/theme.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import SunIcon from '~icons/heroicons/sun';
  import MoonIcon from '~icons/heroicons/moon';
  import ComputerDesktopIcon from '~icons/heroicons/computer-desktop';

  const theme = getTheme();
  const i18n = getI18n();
</script>

<button
  type="button"
  class="flex items-center rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-second-800/5 ring-second-900/5 backdrop-blur-sm transition dark:bg-second-800/90 dark:ring-white/10 dark:hover:ring-white/20"
  onclick={() => theme.toggle()}
  aria-label={i18n.t(`common.theme.${theme.preference}`)}
  title={i18n.t(`common.theme.${theme.preference}`)}
>
  {#if theme.preference === 'light'}
    <SunIcon class="h-6 w-6 text-second-900 dark:text-second-100" aria-hidden="true" />
  {:else if theme.preference === 'dark'}
    <MoonIcon class="h-6 w-6 text-second-900 dark:text-second-100" aria-hidden="true" />
  {:else}
    <ComputerDesktopIcon class="h-6 w-6 text-second-900 dark:text-second-100" aria-hidden="true" />
  {/if}
</button>
