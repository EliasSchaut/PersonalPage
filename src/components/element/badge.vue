<template>
  <a
    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
    :href="href"
    target="_blank"
  >
    <svg class="h-1.5 w-1.5" :fill="color" viewBox="0 0 6 6" aria-hidden="true">
      <circle cx="3" cy="3" r="3" />
    </svg>
    {{ content }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElementsBadge',
  props: {
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'red',
    },
    href: {
      type: String,
      default: '#',
    },
  },
});
</script>
