<script lang="ts">
  import { enhance } from '$app/forms';
  import { getI18n } from '$lib/i18n/context.svelte';
  import CheckCircleIcon from '~icons/heroicons/check-circle';
  import ExclamationCircleIcon from '~icons/heroicons/exclamation-circle';

  export interface ContactResult {
    contact?: { success?: boolean; error?: string; email?: string; message?: string };
  }

  let { form }: { form: ContactResult | null } = $props();

  const i18n = getI18n();
  let sending = $state(false);
  const result = $derived(form?.contact);
  const inputClass = 'field';
</script>

<form
  class="mx-auto"
  method="POST"
  action="{i18n.path('/')}?/contact"
  use:enhance={() => {
    sending = true;
    return async ({ update }) => {
      await update();
      sending = false;
    };
  }}
>
  <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
    <div class="sm:col-span-2">
      <label for="email" class="block text-[15px] font-bold text-second-900 dark:text-white">
        {i18n.t('home.contact.form.email')}
      </label>
      <div class="mt-2.5">
        <input
          type="email"
          name="email"
          id="email"
          autocomplete="email"
          required
          disabled={sending}
          value={result?.email ?? ''}
          class={inputClass}
        />
      </div>
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block text-[15px] font-bold text-second-900 dark:text-white">
        {i18n.t('home.contact.form.message')}
      </label>
      <div class="mt-2.5">
        <textarea
          name="message"
          id="message"
          rows="4"
          required
          disabled={sending}
          class={inputClass}>{result?.message ?? ''}</textarea
        >
      </div>
    </div>
  </div>
  <div class="mt-6">
    <button type="submit" disabled={sending} class="btn btn-primary w-full sm:w-auto">
      {sending ? i18n.t('home.contact.form.sending') : i18n.t('home.contact.form.submit')}
    </button>
    <p class="mt-3 text-sm text-second-600 dark:text-second-300">
      {i18n.t('home.contact.form.agree')}
      <a
        href={i18n.path('/legal#privacy')}
        class="font-semibold whitespace-nowrap text-prime-600 dark:text-prime-300"
        >{i18n.t('home.contact.form.privacy_policy')}</a
      >.
    </p>
    {#if result?.success}
      <p
        role="status"
        class="mt-3 flex items-center gap-x-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300"
      >
        <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{i18n.t('home.contact.form.success')}</span>
      </p>
    {:else if result?.error}
      <p
        role="alert"
        class="mt-3 flex items-center gap-x-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
      >
        <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{i18n.t(result.error)}</span>
      </p>
    {/if}
  </div>
</form>
