<script lang="ts">
  import Socials from '../social/Socials.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import { site } from '$lib/data/socials';

  const i18n = getI18n();
  const year = new Date().getFullYear();

  const links = $derived([
    { title: i18n.t('footer.home'), href: i18n.path('/') },
    { title: i18n.t('footer.source'), href: site.repo, external: true },
    { title: i18n.t('footer.resources'), href: i18n.path('/resources') },
    { title: i18n.t('footer.rss'), href: i18n.path('/rss.xml'), external: true },
    { title: i18n.t('footer.imprint'), href: i18n.path('/imprint') },
    { title: i18n.t('footer.privacy'), href: i18n.path('/privacy') },
  ]);
</script>

<footer class="bg-second-100 dark:bg-second-900">
  <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
    <nav
      class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
      aria-label={i18n.t('footer.title')}
    >
      {#each links as link (link.title)}
        <div class="pb-6">
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            class="text-sm leading-6 text-second-600 hover:text-second-900 dark:text-second-300 dark:hover:text-second-400"
          >
            {link.title}
          </a>
        </div>
      {/each}
    </nav>
    <Socials class="mt-10 justify-center gap-x-10" />
    <p class="mt-10 text-center text-xs leading-5 text-second-500 dark:text-second-300">
      &copy; 2023-{year} Elias Lorenz Schaut
    </p>
  </div>
</footer>
