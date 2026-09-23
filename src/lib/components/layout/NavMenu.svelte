<script lang="ts">
  import { page } from '$app/state';
  import { stripLocale } from '$lib/i18n';
  import { getI18n } from '$lib/i18n/context.svelte';
  import Modal from '../Modal.svelte';
  import Bars2Icon from '~icons/heroicons/bars-2';
  import XMarkIcon from '~icons/heroicons/x-mark';

  const i18n = getI18n();
  let open = $state(false);

  const pages = $derived([
    { title: i18n.t('nav.home'), href: i18n.path('/'), matches: /^\/$/ },
    { title: i18n.t('nav.about'), href: i18n.path('/about'), matches: /^\/about(\/.*)?$/ },
    { title: i18n.t('nav.articles'), href: i18n.path('/articles'), matches: /^\/articles(\/.*)?$/ },
    { title: i18n.t('nav.projects'), href: i18n.path('/projects'), matches: /^\/projects(\/.*)?$/ },
  ]);
  const current = $derived(stripLocale(page.url.pathname));
</script>

<nav aria-label="Main">
  <ul class="hidden gap-1.5 md:flex">
    {#each pages as p (p.title)}
      <li>
        <a
          href={p.href}
          aria-current={p.matches.test(current) ? 'page' : undefined}
          class={['pill', p.matches.test(current) && 'pill-active']}
        >
          {p.title}
        </a>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    class="pill pill-icon md:hidden"
    onclick={() => (open = true)}
    aria-label={i18n.t('common.sr.open_main_menu')}
  >
    <Bars2Icon class="h-6 w-6" aria-hidden="true" />
  </button>
</nav>

<Modal bind:open hideClose placeTop>
  <div class="flex flex-row-reverse items-center justify-between">
    <button
      type="button"
      aria-label={i18n.t('common.modal.close')}
      class="pill pill-icon"
      onclick={() => (open = false)}
    >
      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
    </button>
    <h2 class="text-base font-bold text-second-600 dark:text-second-300">Navigation</h2>
  </div>
  <nav class="mt-6" aria-label="Main">
    <ul class="flex flex-col gap-2 text-lg font-bold">
      {#each pages as p (p.title)}
        <li>
          <a
            class={[
              'block rounded-2xl px-4 py-3 transition hover:bg-second-100 dark:hover:bg-white/10',
              p.matches.test(current) && 'text-prime-600 dark:text-prime-300',
            ]}
            href={p.href}
            onclick={() => (open = false)}
          >
            {p.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Modal>
