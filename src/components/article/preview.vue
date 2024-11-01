<template>
  <div
    class="flex max-w-xl flex-col items-start justify-between rounded-2xl p-5 hover:bg-second-100 dark:hover:bg-second-800"
  >
    <div class="flex items-center gap-x-4 text-xs">
      <time :datetime="datetime" class="text-second-500 dark:text-second-400">{{
        date
      }}</time>
      <div class="flex flex-1 justify-end gap-1">
        <BadgeSimple v-for="tag in tags" :content="tag" :href="'/articles/t/' + tag" />
      </div>
    </div>
    <div class="group relative">
      <h3
        class="mt-3 text-lg font-semibold leading-6 text-second-900 group-hover:text-second-600 dark:text-white dark:group-hover:text-second-200"
      >
        <a :href="href">
          <span class="absolute inset-0" />
          {{ title }}
        </a>
      </h3>
      <p
        class="mt-5 line-clamp-3 text-sm leading-6 text-second-600 dark:text-second-100"
      >
        {{ description }}
      </p>
    </div>
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
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    tags: {
      type: Array<String>,
      default: [''],
    },
  },
});
</script>
