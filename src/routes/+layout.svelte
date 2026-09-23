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

  const narrow = $derived(/^\/(articles|projects)(\/.*)?$/.test(stripLocale(page.url.pathname)));
</script>

<div class="relative isolate flex min-h-screen flex-col overflow-x-clip">
  <div class="aurora -z-10" aria-hidden="true"></div>
  <Nav />
  {#if narrow}
    <main
      class="mx-auto w-full flex-1 px-6 py-20 text-[17px] leading-7 sm:py-28 md:w-3/4 lg:w-2/3 lg:px-8 xl:w-1/2"
    >
      {@render children()}
    </main>
  {:else}
    <main class="mx-auto w-full max-w-7xl flex-1 px-5 py-8 text-[17px] sm:px-10 sm:py-12">
      {@render children()}
    </main>
  {/if}
  <Footer />
</div>
