<template>
  <a
    v-if="href !== '#' && href.startsWith('http')"
    class="relative z-10 rounded-full bg-second-50 px-3 py-1.5 font-medium text-second-600 hover:bg-second-200 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700"
    :href="href"
    target="_blank"
  >
    {{ content }}
  </a>
  <NuxtLink
    v-else-if="href !== '#'"
    class="relative z-10 rounded-full bg-second-200 px-3 py-1.5 font-medium text-second-600 hover:bg-second-300 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700"
    :href="href"
  >
    {{ content }}
  </NuxtLink>
  <span
    v-else
    class="relative z-10 rounded-full bg-second-50 px-3 py-1.5 font-medium text-second-600 dark:bg-second-800 dark:text-second-400"
  >
    {{ content }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: '#',
    },
  },
});
</script>
