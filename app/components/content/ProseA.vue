<template>
  <NuxtLink
    class="border-b-0 border-prime-500 font-semibold text-prime-500 no-underline hover:border-b-2"
    :href="href"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  href?: string;
  target?: string;
}>();

const isExternal = computed(
  () => !!props.href && /^(https?:)?\/\//.test(props.href),
);
</script>
