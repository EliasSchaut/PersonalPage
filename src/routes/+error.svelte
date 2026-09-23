<script lang="ts">
  import { page } from '$app/state';
  import { getI18n } from '$lib/i18n/context.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';

  const i18n = getI18n();
  const key = $derived(page.status === 404 ? '404' : '500');
</script>

<SeoHead title={i18n.t(`common.err.${key}.title`)} noindex />

<div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-prime-600 dark:text-prime-400">{page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-second-900 sm:text-5xl dark:text-white">
      {i18n.t(`common.err.${key}.title`)}
    </h1>
    <p class="mt-6 text-base leading-7 text-second-600 dark:text-second-400">
      {i18n.t(`common.err.${key}.desc`)}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a
        href={i18n.path('/')}
        class="rounded-md bg-prime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-prime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prime-600"
      >
        {i18n.t('nav.go_home')}
      </a>
    </div>
  </div>
</div>
