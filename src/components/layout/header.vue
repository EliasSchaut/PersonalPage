<template>
  <header class="max-w-2xl">
    <h1
      class="text-4xl font-bold tracking-tight text-second-800 dark:text-second-100 sm:text-5xl"
    >
      {{ title }}
    </h1>
    <p class="mt-6 text-base text-second-600 dark:text-second-400">
      {{ intro }}
    </p>
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
