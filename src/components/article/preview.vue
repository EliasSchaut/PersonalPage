<template>
  <NuxtLink
    class="group flex flex-col items-center justify-start gap-6 rounded-2xl p-5 hover:bg-second-100 dark:hover:bg-second-900 sm:flex-row"
    :href="href"
  >
    <NuxtImg
      class="rounded-md transition-transform duration-300 group-hover:scale-105"
      height="128"
      width="128"
      v-if="cover"
      :src="cover"
      :alt="`${title} cover`"
    />
    <div class="flex max-w-xl flex-col items-start justify-between">
      <div class="flex items-center gap-x-4 text-xs">
        <time :datetime="datetime" class="text-second-500 dark:text-second-400"
          >{{ date }}
        </time>
        <div class="flex flex-1 justify-end gap-1">
          <BadgeSimple
            v-for="tag in tags"
            :content="tag"
            :href="'/articles/t/' + tag"
          />
        </div>
      </div>
      <div>
        <h3
          class="mt-3 text-lg font-semibold leading-6 text-second-900 group-hover:underline dark:text-white"
        >
          {{ title }}
        </h3>
        <p
          class="mt-5 line-clamp-3 text-sm leading-6 text-second-600 dark:text-second-100"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<String>,
    default: [''],
  },
});
</script>
