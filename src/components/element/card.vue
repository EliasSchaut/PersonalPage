<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
  >
    <div
      class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 dark:bg-gray-800"
    >
      <div
        class="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10 dark:dark:bg-gray-900 dark:ring-gray-700"
      >
        <component class="h-8 w-8" :is="icon()" />
      </div>

      <div
        class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
      >
        {{ title }}
      </div>
    </div>
    <div
      class="divide-y divide-gray-100 break-words px-6 py-4 text-sm leading-6 dark:divide-gray-900"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElementCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Function,
      required: true,
    },
  },
});
</script>
