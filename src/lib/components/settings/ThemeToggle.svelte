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
  class="pill pill-icon"
  onclick={() => theme.toggle()}
  aria-label={i18n.t(`common.theme.${theme.preference}`)}
  title={i18n.t(`common.theme.${theme.preference}`)}
>
  {#if theme.preference === 'light'}
    <SunIcon class="h-6 w-6" aria-hidden="true" />
  {:else if theme.preference === 'dark'}
    <MoonIcon class="h-6 w-6" aria-hidden="true" />
  {:else}
    <ComputerDesktopIcon class="h-6 w-6" aria-hidden="true" />
  {/if}
</button>
