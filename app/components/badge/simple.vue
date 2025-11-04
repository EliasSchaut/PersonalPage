<template>
  <a
    v-if="href !== '#' && href.startsWith('http')"
    class="bg-second-50 text-second-600 hover:bg-second-200 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700 relative z-10 rounded-full px-3 py-1.5 font-medium"
    :href="href"
    target="_blank"
  >
    {{ content }}
  </a>
  <NuxtLink
    v-else-if="href !== '#'"
    class="bg-second-200 text-second-600 hover:bg-second-300 dark:bg-second-800 dark:text-second-400 dark:hover:bg-second-700 relative z-10 rounded-full px-3 py-1.5 font-medium"
    :href="href"
  >
    {{ content }}
  </NuxtLink>
  <span
    v-else
    class="bg-second-50 text-second-600 dark:bg-second-800 dark:text-second-400 relative z-10 rounded-full px-3 py-1.5 font-medium"
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
