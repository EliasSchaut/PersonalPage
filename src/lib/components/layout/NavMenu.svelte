<script lang="ts">
  import { page } from '$app/state';
  import { stripLocale } from '$lib/i18n';
  import { getI18n } from '$lib/i18n/context.svelte';
  import { site } from '$lib/data/socials';
  import Modal from '../Modal.svelte';
  import ChevronDownIcon from '~icons/heroicons/chevron-down';
  import XMarkIcon from '~icons/heroicons/x-mark';

  const i18n = getI18n();
  let open = $state(false);

  const pages = $derived([
    { title: i18n.t('nav.home'), href: i18n.path('/'), matches: /^\/$/ },
    { title: i18n.t('nav.about'), href: i18n.path('/about'), matches: /^\/about(\/.*)?$/ },
    { title: i18n.t('nav.articles'), href: i18n.path('/articles'), matches: /^\/articles(\/.*)?$/ },
    { title: i18n.t('nav.projects'), href: i18n.path('/projects'), matches: /^\/projects(\/.*)?$/ },
    { title: i18n.t('nav.wiki'), href: site.wiki, matches: /^$/, external: true },
  ]);
  const current = $derived(stripLocale(page.url.pathname));
</script>

<nav>
  <div class="hidden md:inline">
    <ul
      class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-second-800 shadow-lg ring-1 shadow-second-800/5 ring-second-900/5 backdrop-blur dark:bg-second-800/90 dark:text-second-200 dark:ring-white/10"
    >
      {#each pages as p (p.title)}
        <li>
          <a
            href={p.href}
            target={p.external ? '_blank' : undefined}
            rel={p.external ? 'noopener noreferrer' : undefined}
            class={[
              'relative block px-3 py-2 transition',
              p.matches.test(current)
                ? 'text-prime-500 dark:text-prime-400'
                : 'hover:text-prime-500 dark:hover:text-prime-400',
            ]}
          >
            {p.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <button
    type="button"
    class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-second-800 shadow-lg ring-1 shadow-second-800/5 ring-second-900/5 backdrop-blur md:hidden dark:bg-second-800/90 dark:text-second-200 dark:ring-white/10 dark:hover:ring-white/20"
    onclick={() => (open = true)}
    aria-label={i18n.t('common.sr.open_main_menu')}
  >
    Menu
    <ChevronDownIcon
      class="ml-3 h-auto w-3 stroke-second-500 group-hover:stroke-second-700 dark:group-hover:stroke-second-400"
      aria-hidden="true"
    />
  </button>
</nav>

<Modal bind:open hideClose placeTop>
  <div class="flex flex-row-reverse items-center justify-between">
    <button
      type="button"
      aria-label={i18n.t('common.modal.close')}
      class="-m-1 p-1"
      onclick={() => (open = false)}
    >
      <XMarkIcon class="h-6 w-6 text-second-500 dark:text-second-400" aria-hidden="true" />
    </button>
    <h2 class="text-sm font-medium text-second-600 dark:text-second-400">Navigation</h2>
  </div>
  <nav class="mt-6">
    <ul
      class="-my-2 divide-y divide-second-100 text-base text-second-800 dark:divide-second-100/5 dark:text-second-300"
    >
      {#each pages as p (p.title)}
        <li>
          <a
            class="block px-2 py-2 hover:bg-second-200 dark:hover:bg-second-800"
            href={p.href}
            target={p.external ? '_blank' : undefined}
            rel={p.external ? 'noopener noreferrer' : undefined}
            onclick={() => (open = false)}
          >
            {p.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Modal>
