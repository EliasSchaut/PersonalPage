<script lang="ts">
  import Avatar from '../Avatar.svelte';
  import NavMenu from './NavMenu.svelte';
  import LangToggle from '../settings/LangToggle.svelte';
  import ThemeToggle from '../settings/ThemeToggle.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  const i18n = getI18n();
</script>

<nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
  <a href={i18n.path('/')} class="flex items-center gap-3">
    <Avatar size="small" />
    <span class="text-grad hidden font-display text-lg font-extrabold select-none xs:inline">
      Elias Schaut
    </span>
  </a>

  <div class="hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
    <NavMenu />
  </div>

  <div class="flex items-center gap-2">
    <div class="md:hidden"><NavMenu /></div>
    <LangToggle />
    <ThemeToggle />
  </div>
</nav>
