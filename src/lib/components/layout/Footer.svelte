<script lang="ts">
  import { getI18n } from '$lib/i18n/context.svelte';
  import { site } from '$lib/data/socials';

  const i18n = getI18n();
  const year = new Date().getFullYear();

  const links = $derived([
    { title: i18n.t('footer.source'), href: site.repo, external: true },
    { title: i18n.t('footer.rss'), href: i18n.path('/rss.xml'), external: true },
    { title: i18n.t('footer.donate'), href: i18n.path('/donate') },
    { title: i18n.t('footer.legal'), href: i18n.path('/legal') },
  ]);
</script>

<footer class="mt-12 border-t border-second-200 dark:border-white/10">
  <div
    class="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-3 px-5 py-6 text-sm text-second-600 sm:flex-row sm:justify-between sm:px-10 dark:text-second-300"
  >
    <p>&copy; 2023-{year} Elias Lorenz Schaut</p>
    <nav class="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label={i18n.t('footer.title')}>
      {#each links as link (link.title)}
        <a
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          class="transition hover:text-prime-600 dark:hover:text-prime-300"
        >
          {link.title}
        </a>
      {/each}
    </nav>
  </div>
</footer>
