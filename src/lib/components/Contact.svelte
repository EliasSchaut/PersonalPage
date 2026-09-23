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
  const inputClass =
    'text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:placeholder:text-second-500 dark:focus:outline-prime-500 block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 disabled:opacity-60 dark:bg-white/5 dark:text-white dark:outline-white/10';
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
      <label for="email" class="block text-sm/6 font-semibold text-second-900 dark:text-white">
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
      <label for="message" class="block text-sm/6 font-semibold text-second-900 dark:text-white">
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
    <button
      type="submit"
      disabled={sending}
      class="block w-full rounded-md bg-prime-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-prime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prime-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500"
    >
      {sending ? i18n.t('home.contact.form.sending') : i18n.t('home.contact.form.submit')}
    </button>
    <p class="text-sm/6 text-second-600 dark:text-second-400">
      {i18n.t('home.contact.form.agree')}
      <a
        href={i18n.path('/privacy')}
        class="font-semibold whitespace-nowrap text-prime-600 dark:text-prime-400"
        >{i18n.t('home.contact.form.privacy_policy')}</a
      >.
    </p>
    {#if result?.success}
      <p
        role="status"
        class="mt-3 flex items-center gap-x-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300"
      >
        <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{i18n.t('home.contact.form.success')}</span>
      </p>
    {:else if result?.error}
      <p
        role="alert"
        class="mt-3 flex items-center gap-x-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
      >
        <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{i18n.t(result.error)}</span>
      </p>
    {/if}
  </div>
</form>
