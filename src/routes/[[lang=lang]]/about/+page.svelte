<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Card from '$lib/components/Card.svelte';
  import ListChecks from '$lib/components/ListChecks.svelte';
  import { work } from '$lib/data/work';
  import { getI18n } from '$lib/i18n/context.svelte';
  import BriefcaseIcon from '~icons/heroicons/briefcase';

  const i18n = getI18n();
  const tr = (s: string) => (s.includes('.') && !s.includes(' ') ? i18n.t(s) : s);
  const events = $derived(
    work.map((w) => ({
      content: tr(w.title),
      subcontent: tr(w.desc),
      time: `${w.from} - ${w.to ?? i18n.t('common.today')}`,
    })),
  );
</script>

<SeoHead title={i18n.t('nav.about')} />

<section id="journey" class="mt-10 flex flex-col gap-y-4 sm:mx-6 xl:mx-8">
  <h1 class="space-x-2 text-center text-3xl font-semibold">
    <span>🗺️</span><span
      class="bg-linear-to-b from-prime-500 to-prime-600 bg-clip-text text-transparent select-none dark:from-prime-200 dark:to-prime-300"
      >{i18n.t('home.journey')}</span
    >
  </h1>
  <Card title={i18n.t('home.work.title')}>
    {#snippet icon()}<BriefcaseIcon aria-hidden="true" />{/snippet}
    <ListChecks {events} />
  </Card>
</section>
