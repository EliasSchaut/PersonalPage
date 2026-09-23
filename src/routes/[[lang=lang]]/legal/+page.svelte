<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Card from '$lib/components/Card.svelte';
  import Faq from '$lib/components/Faq.svelte';
  import { site } from '$lib/data/socials';
  import { getI18n } from '$lib/i18n/context.svelte';
  import IdentificationIcon from '~icons/heroicons/identification';
  import ClipboardDocumentCheckIcon from '~icons/heroicons/clipboard-document-check';

  const i18n = getI18n();
  const faqs = $derived(
    ['data', 'contact', 'newsletter', 'cookies', 'rights'].map((k) => ({
      question: i18n.t(`privacy.${k}.title`),
      answer: i18n.t(`privacy.${k}.body`),
    })),
  );
</script>

<SeoHead title={i18n.t('legal.title')} noindex />

<div class="mx-auto flex max-w-4xl flex-col gap-y-10">
  <h1 class="text-grad rise text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
    {i18n.t('legal.title')}
  </h1>
  <Card title={i18n.t('imprint.title')} class="rise rise-1">
    {#snippet icon()}<IdentificationIcon aria-hidden="true" />{/snippet}
    <div id="imprint" class="flex flex-col gap-y-3">
      <p>{i18n.t('imprint.declaration')}</p>
      <p class="font-bold text-second-900 dark:text-white">{site.name}</p>
      <p>
        <b>{i18n.t('imprint.contact')}:</b><br />
        {i18n.t('imprint.email')}:
        <a href="mailto:{site.imprintEmail}" class="text-prime-600 dark:text-prime-300"
          >{site.imprintEmail}</a
        >
      </p>
    </div>
  </Card>
  <Card title={i18n.t('privacy.title')} class="rise rise-2">
    {#snippet icon()}<ClipboardDocumentCheckIcon aria-hidden="true" />{/snippet}
    <div id="privacy"><Faq {faqs} /></div>
  </Card>
</div>
