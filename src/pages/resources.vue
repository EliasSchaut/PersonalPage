<template>
  <Article>
    <ContentDoc :path="$i18n.locale + $route.path" />
  </Article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'article',
});
</script>
