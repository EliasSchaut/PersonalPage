<script lang="ts">
  import { page } from '$app/state';
  import { LOCALES, LOCALE_COOKIE, localePath, type Locale } from '$lib/i18n';
  import { getI18n } from '$lib/i18n/context.svelte';

  const i18n = getI18n();

  function href(locale: Locale) {
    return localePath(locale, page.url.pathname) + page.url.search;
  }

  function remember(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }
</script>

<div
  class="flex items-center gap-x-2 rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-second-800/5 ring-second-900/5 backdrop-blur-sm transition dark:bg-second-800/90 dark:ring-white/10 dark:hover:ring-white/20"
>
  {#each LOCALES as locale (locale)}
    <a
      href={href(locale)}
      hreflang={locale}
      lang={locale}
      aria-current={i18n.locale === locale ? 'true' : undefined}
      aria-label={i18n.t(`common.lang.${locale}`)}
      onclick={() => remember(locale)}
      class={[
        'font-bold',
        i18n.locale === locale
          ? 'text-second-900 dark:text-second-100'
          : 'text-second-400 hover:text-second-500',
      ]}
    >
      {locale}
    </a>
  {/each}
</div>
