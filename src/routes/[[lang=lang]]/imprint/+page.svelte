<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Card from '$lib/components/Card.svelte';
  import { site } from '$lib/data/socials';
  import { getI18n } from '$lib/i18n/context.svelte';
  import IdentificationIcon from '~icons/heroicons/identification';

  const i18n = getI18n();
</script>

<SeoHead title={i18n.t('imprint.title')} noindex />

<div class="mx-4 my-10 flex flex-row justify-center">
  <Card title={i18n.t('imprint.title')} class="w-full align-middle sm:w-1/2">
    {#snippet icon()}<IdentificationIcon aria-hidden="true" />{/snippet}
    <p>{i18n.t('imprint.declaration')}</p>
    <p>{site.name}</p>
    <p>
      <b>{i18n.t('imprint.contact')}:</b><br />
      {i18n.t('imprint.email')}: {site.email}<br />
    </p>
  </Card>
</div>
