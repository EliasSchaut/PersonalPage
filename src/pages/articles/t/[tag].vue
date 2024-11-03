<template>
  <Articles :tag="$route.params.tag as string" />
</template>

<script setup lang="ts">
import Articles from '~/pages/articles/index.vue';

definePageMeta({
  layout: 'article',
});
</script>
