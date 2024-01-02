<template>
  <header class="max-w-2xl">
    <h1
      class="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl dark:text-gray-100"
    >
      {{ title }}
    </h1>
    <p class="mt-6 text-base text-gray-600 dark:text-gray-400">{{ intro }}</p>
  </header>
  <div class="mt-16 sm:mt-20">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
  },
});
</script>
