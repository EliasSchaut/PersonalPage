<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import NewsletterForm from '$lib/components/NewsletterForm.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { form } = $props();
  const i18n = getI18n();
</script>

<SeoHead title={i18n.t('newsletter.title')} description={i18n.t('newsletter.intro')} />

<div class="mx-auto my-10 max-w-xl">
  <NewsletterForm {form} />
</div>
