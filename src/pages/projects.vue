<template>
  <LayoutHeader :title="$t('projects.title')" :intro="$t('projects.title')">
    <CardProjects />
  </LayoutHeader>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'article',
});
</script>
