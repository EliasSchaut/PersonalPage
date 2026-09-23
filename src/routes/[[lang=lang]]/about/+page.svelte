<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Card from '$lib/components/Card.svelte';
  import ListChecks from '$lib/components/ListChecks.svelte';
  import { work } from '$lib/data/work';
  import { getI18n } from '$lib/i18n/context.svelte';
  import MapIcon from '~icons/heroicons/map';

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

<section id="journey" class="mx-auto flex max-w-4xl flex-col gap-y-10">
  <h1 class="text-grad rise text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
    {i18n.t('home.journey')}
  </h1>
  <Card title={i18n.t('home.work.title')} class="rise rise-1">
    {#snippet icon()}<MapIcon aria-hidden="true" />{/snippet}
    <ListChecks {events} />
  </Card>
</section>
