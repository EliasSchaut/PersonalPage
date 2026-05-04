<script setup lang="ts">
import { ref } from 'vue';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';

const { t } = useI18n();

const email = ref('');
const message = ref('');
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');
const errorMessage = ref('');

async function submit() {
  if (status.value === 'sending') return;
  status.value = 'sending';
  errorMessage.value = '';
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { email: email.value, message: message.value },
    });
    status.value = 'success';
    email.value = '';
    message.value = '';
  } catch (err: unknown) {
    status.value = 'error';
    const fetchErr = err as { statusMessage?: string; data?: { statusMessage?: string } };
    errorMessage.value =
      fetchErr?.data?.statusMessage ??
      fetchErr?.statusMessage ??
      t('home.contact.form.error_generic');
  }
}
</script>
<template>
  <form class="mx-auto" @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label
          for="email"
          class="text-second-900 block text-sm/6 font-semibold dark:text-white"
          >{{ $t('home.contact.form.email') }}</label
        >
        <div class="mt-2.5">
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            required
            :disabled="status === 'sending'"
            class="text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:placeholder:text-second-500 dark:focus:outline-prime-500 block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 disabled:opacity-60 dark:bg-white/5 dark:text-white dark:outline-white/10"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="message"
          class="text-second-900 block text-sm/6 font-semibold dark:text-white"
          >{{ $t('home.contact.form.message') }}</label
        >
        <div class="mt-2.5">
          <textarea
            v-model="message"
            name="message"
            id="message"
            rows="4"
            required
            :disabled="status === 'sending'"
            class="text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:placeholder:text-second-500 dark:focus:outline-prime-500 block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 disabled:opacity-60 dark:bg-white/5 dark:text-white dark:outline-white/10"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <button
        type="submit"
        :disabled="status === 'sending'"
        class="bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {{
          status === 'sending'
            ? $t('home.contact.form.sending')
            : $t('home.contact.form.submit')
        }}
      </button>
      <label
        class="text-second-600 dark:text-second-400 text-sm/6"
        for="agree-to-policies"
      >
        {{ $t('home.contact.form.agree') }}
        {{ ' ' }}
        <a
          href="/privacy"
          class="text-prime-600 dark:text-prime-400 font-semibold whitespace-nowrap"
          >{{ $t('home.contact.form.privacy_policy') }}</a
        >.
      </label>
      <p
        v-if="status === 'success'"
        role="status"
        class="mt-3 flex items-center gap-x-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300"
      >
        <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{{ $t('home.contact.form.success') }}</span>
      </p>
      <p
        v-else-if="status === 'error'"
        role="alert"
        class="mt-3 flex items-center gap-x-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
      >
        <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{{ errorMessage }}</span>
      </p>
    </div>
  </form>
</template>
