<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-prime-600 dark:text-prime-400">
        {{ code }}
      </p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-second-900 dark:text-white sm:text-5xl"
      >
        {{ title }}
      </h1>
      <p class="mt-6 text-base leading-7 text-second-600 dark:text-second-400">
        {{ desc }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink
          to="/"
          class="rounded-md bg-prime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-prime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prime-600"
          >{{ $t('nav.go_home') }}</NuxtLink
        >
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Err',
  props: {
    code: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
