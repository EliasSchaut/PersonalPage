<template>
  <a
    :key="name"
    :href="href"
    target="_blank"
    class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400 flex h-6 w-6 items-center justify-center"
  >
    <span class="sr-only">{{ name }}</span>
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});
</script>
