<script lang="ts">
  import '../app.css';
  import { onMount, untrack } from 'svelte';
  import { page } from '$app/state';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { createI18n, setI18n } from '$lib/i18n/context.svelte';
  import { Theme, setTheme } from '$lib/theme.svelte';
  import { stripLocale } from '$lib/i18n';

  let { data, children } = $props();

  setI18n(createI18n(() => data.locale));
  const theme = new Theme(untrack(() => data.theme));
  setTheme(theme);
  onMount(() => theme.mount());

  const narrow = $derived(
    /^\/(articles|projects|resources)(\/.*)?$/.test(stripLocale(page.url.pathname)),
  );
</script>

<Nav />
{#if narrow}
  <main
    class="mx-auto w-full bg-second-50 px-6 py-32 text-base leading-7 text-second-800 md:w-3/4 lg:w-2/3 lg:px-8 xl:w-1/2 dark:bg-second-950 dark:text-second-200"
  >
    {@render children()}
  </main>
{:else}
  <main
    class="w-full bg-second-50 p-4 text-second-800 sm:p-10 dark:bg-second-950 dark:text-second-200"
  >
    {@render children()}
  </main>
{/if}
<Footer />
