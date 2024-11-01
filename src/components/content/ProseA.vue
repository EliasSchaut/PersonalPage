<template>
  <NuxtLink
    class="border-b-0 border-prime-500 font-semibold text-prime-500 no-underline hover:border-b-2"
    :href="(href.startsWith('http')) ? href : '/articles/' + href"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: "_blank",
    required: false,
  },
});
</script>
