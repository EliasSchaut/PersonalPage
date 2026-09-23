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

<section
  class={[
    'rounded-xl border border-second-200 bg-white p-6 dark:border-second-700 dark:bg-second-900',
    compact ? '' : 'sm:p-8',
  ]}
>
  <div class="flex items-center gap-x-3">
    <EnvelopeIcon class="h-6 w-6 shrink-0 text-prime-500" aria-hidden="true" />
    <h2 class="text-lg font-semibold text-second-900 dark:text-white">
      {i18n.t('newsletter.title')}
    </h2>
  </div>
  <p class="mt-2 text-sm text-second-600 dark:text-second-400">{i18n.t('newsletter.intro')}</p>

  {#if result?.success}
    <p
      role="status"
      class="mt-4 flex items-center gap-x-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300"
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
          class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-second-900 outline-1 -outline-offset-1 outline-second-300 placeholder:text-second-400 focus:outline-2 focus:-outline-offset-2 focus:outline-prime-600 disabled:opacity-60 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus:outline-prime-500"
        />
        <button
          type="submit"
          disabled={sending}
          class="rounded-md bg-prime-600 px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-xs hover:bg-prime-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-prime-500 dark:hover:bg-prime-400"
        >
          {sending ? i18n.t('newsletter.sending') : i18n.t('newsletter.submit')}
        </button>
      </div>
      <label class="flex items-start gap-x-2 text-xs text-second-600 dark:text-second-400">
        <input type="checkbox" name="consent" required class="mt-0.5 accent-prime-600" />
        <span>
          {i18n.t('newsletter.consent')}
          <a href={i18n.path('/privacy')} class="font-semibold text-prime-600 dark:text-prime-400"
            >{i18n.t('home.contact.form.privacy_policy')}</a
          >.
        </span>
      </label>
      {#if result?.error}
        <p
          role="alert"
          class="flex items-center gap-x-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{i18n.t(result.error)}</span>
        </p>
      {/if}
    </form>
  {/if}
</section>
