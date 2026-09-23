<script lang="ts">
  import Avatar from '../Avatar.svelte';
  import NavMenu from './NavMenu.svelte';
  import LangToggle from '../settings/LangToggle.svelte';
  import ThemeToggle from '../settings/ThemeToggle.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  const i18n = getI18n();
</script>

<nav
  class="flex w-full items-center justify-between border-b-4 border-second-200 bg-second-100 p-4 dark:border-second-800 dark:bg-second-900"
>
  <div class="hidden xs:inline">
    <a href={i18n.path('/')} class="flex items-center gap-3">
      <Avatar size="small" />
      <span
        class="bg-linear-to-r from-blue-800 to-prime-800 bg-clip-text font-bold text-transparent select-none dark:from-blue-200 dark:to-prime-200"
      >
        Elias Schaut
      </span>
    </a>
  </div>

  <div class="block xs:absolute xs:left-1/2 xs:-translate-x-1/2 xs:transform">
    <NavMenu />
  </div>

  <div class="flex gap-3 rounded-full bg-white/90 dark:bg-second-800/90">
    <LangToggle />
    <ThemeToggle />
  </div>
</nav>
