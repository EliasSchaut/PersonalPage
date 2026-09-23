<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Card from '$lib/components/Card.svelte';
  import Faq from '$lib/components/Faq.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';
  import ClipboardDocumentCheckIcon from '~icons/heroicons/clipboard-document-check';

  const i18n = getI18n();
  const faqs = $derived(
    ['data', 'contact', 'newsletter', 'cookies', 'rights'].map((k) => ({
      question: i18n.t(`privacy.${k}.title`),
      answer: i18n.t(`privacy.${k}.body`),
    })),
  );
</script>

<SeoHead title={i18n.t('privacy.title')} noindex />

<div class="mx-4 my-10 flex flex-row justify-center">
  <Card title={i18n.t('privacy.title')} class="w-full align-middle lg:w-2/3">
    {#snippet icon()}<ClipboardDocumentCheckIcon aria-hidden="true" />{/snippet}
    <Faq {faqs} />
  </Card>
</div>
