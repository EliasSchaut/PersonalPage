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
    <p class="text-grad font-display text-6xl font-extrabold">{page.status}</p>
    <h1
      class="mt-4 text-3xl font-extrabold tracking-tight text-second-900 sm:text-5xl dark:text-white"
    >
      {i18n.t(`common.err.${key}.title`)}
    </h1>
    <p class="mt-6 text-lg leading-8 text-second-600 dark:text-second-300">
      {i18n.t(`common.err.${key}.desc`)}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href={i18n.path('/')} class="btn btn-primary">
        {i18n.t('nav.go_home')}
      </a>
    </div>
  </div>
</div>
