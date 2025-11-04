<template>
  <header class="max-w-2xl">
    <h1
      class="text-second-800 dark:text-second-100 text-4xl font-bold tracking-tight sm:text-5xl"
    >
      {{ title }}
    </h1>
    <p class="text-second-600 dark:text-second-400 mt-6 text-base">
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
