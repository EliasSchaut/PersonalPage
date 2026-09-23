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

<div class="pill gap-x-2.5 px-3.5">
  {#each LOCALES as locale (locale)}
    <a
      href={href(locale)}
      hreflang={locale}
      lang={locale}
      aria-current={i18n.locale === locale ? 'true' : undefined}
      aria-label={i18n.t(`common.lang.${locale}`)}
      onclick={() => remember(locale)}
      data-sveltekit-reload
      data-sveltekit-preload-data="off"
      class={[
        'transition',
        i18n.locale === locale
          ? 'text-second-900 dark:text-white'
          : 'text-second-500 hover:text-prime-600 dark:text-second-400 dark:hover:text-prime-300',
      ]}
    >
      {locale}
    </a>
  {/each}
</div>
