<template>
  <a
    v-if="href !== '#'"
    class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
    :href="href"
    target="_blank"
  >
    {{ content }}
  </a>
  <span
    v-else
    class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
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
