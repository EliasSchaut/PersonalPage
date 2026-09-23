<script lang="ts">
  import { enhance } from '$app/forms';
  import { getI18n } from '$lib/i18n/context.svelte';
  import EnvelopeIcon from '~icons/heroicons/envelope';
  import CheckCircleIcon from '~icons/heroicons/check-circle';
  import ExclamationCircleIcon from '~icons/heroicons/exclamation-circle';

  export interface NewsletterResult {
    success?: boolean;
    error?: string;
    email?: string;
  }

  let { form = null, compact = false }: { form?: NewsletterResult | null; compact?: boolean } =
    $props();

  const i18n = getI18n();
  let sending = $state(false);
  let local = $state<NewsletterResult | null>(null);
  const result = $derived(local ?? form);
</script>

<section class={['glass rounded-3xl p-6', compact ? '' : 'sm:p-8']}>
  <div class="flex items-center gap-x-3">
    <span class="icon-tile"><EnvelopeIcon aria-hidden="true" /></span>
    <h2 class="text-xl font-extrabold text-second-900 dark:text-white">
      {i18n.t('newsletter.title')}
    </h2>
  </div>
  <p class="mt-3 text-base text-second-600 dark:text-second-300">{i18n.t('newsletter.intro')}</p>

  {#if result?.success}
    <p
      role="status"
      class="mt-4 flex items-center gap-x-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300"
    >
      <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{i18n.t('newsletter.success')}</span>
    </p>
  {:else}
    <form
      method="POST"
      action={i18n.path('/newsletter')}
      class="mt-4 flex flex-col gap-3"
      use:enhance={() => {
        sending = true;
        return async ({ result: r, update }) => {
          sending = false;
          if (r.type === 'success' || r.type === 'failure') {
            local = (r.data as NewsletterResult | undefined) ?? null;
          } else {
            await update();
          }
        };
      }}
    >
      <input type="hidden" name="locale" value={i18n.locale} />
      <input
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        class="hidden"
        aria-hidden="true"
      />
      <label class="sr-only" for="newsletter-email">{i18n.t('newsletter.email')}</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autocomplete="email"
          placeholder={i18n.t('newsletter.email')}
          value={result?.email ?? ''}
          disabled={sending}
          class="field"
        />
        <button type="submit" disabled={sending} class="btn btn-primary whitespace-nowrap">
          {sending ? i18n.t('newsletter.sending') : i18n.t('newsletter.submit')}
        </button>
      </div>
      <label class="flex items-start gap-x-2 text-sm text-second-600 dark:text-second-300">
        <input type="checkbox" name="consent" required class="mt-0.5 accent-prime-600" />
        <span>
          {i18n.t('newsletter.consent')}
          <a
            href={i18n.path('/legal#privacy')}
            class="font-semibold text-prime-600 dark:text-prime-300"
            >{i18n.t('home.contact.form.privacy_policy')}</a
          >.
        </span>
      </label>
      {#if result?.error}
        <p
          role="alert"
          class="flex items-center gap-x-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{i18n.t(result.error)}</span>
        </p>
      {/if}
    </form>
  {/if}
</section>
