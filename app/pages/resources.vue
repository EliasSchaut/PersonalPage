<template>
  <Article>
    <ContentRenderer v-if="page" :value="page" />
  </Article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'article',
});
const route = useRoute();
const { locale } = useI18n();

const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = ('content_' + locale.value) as keyof Collections;
    return await queryCollection(collection).path(route.path).first();
  },
  {
    watch: [locale],
  },
);
</script>
