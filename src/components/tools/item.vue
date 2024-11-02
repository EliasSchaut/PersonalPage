<template>
  <a v-if="tool_href !== '#'" class="flex justify-center items-center p-2 rounded-md hover:bg-second-200 dark:hover:bg-second-800"
     :href="tool_href"
     target="_blank">
    <img :src="icon_src" :alt="alt" :title="alt" :height="height" :width="width" />
  </a>
  <img v-else :src="icon_src" :alt="alt" :title="alt" :height="height" :width="width" />
</template>

<script setup lang="ts">
defineProps({
  icon_src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'tool_icon',
  },
  tool_href: {
    type: String,
    default: '#',
  },
  height: {
    type: Number,
    default: 40,
  },
  width: {
    type: Number,
    default: 40,
  },
});
</script>