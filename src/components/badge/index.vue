<template>
  <a
    v-if="href !== '#'"
    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-sm font-medium text-second-900 ring-1 ring-inset ring-second-200 dark:text-second-100 dark:ring-second-700"
    :href="href"
    target="_blank"
  >
    <svg
      v-if="!no_dot"
      class="h-1.5 w-1.5"
      :fill="color"
      viewBox="0 0 6 6"
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
    {{ content }}
  </a>
  <span
    v-else
    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-sm font-medium text-second-900 ring-1 ring-inset ring-second-200 dark:text-second-100 dark:ring-second-700"
  >
    <svg
      v-if="!no_dot"
      class="h-1.5 w-1.5"
      :fill="color"
      viewBox="0 0 6 6"
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
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
    color: {
      type: String,
      default: 'second',
    },
    href: {
      type: String,
      default: '#',
    },
    no_dot: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
