<template>
  <LayoutHeader :title="$t('articles.title')" :intro="$t('articles.intro')">
    <main>
      <ContentList :path="$i18n.locale + '/articles'" v-slot="{ list }">
        <ul
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-second-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-second-500"
        >
          <li v-for="article of list" :key="article._path">
            <ArticlePreview
              :title="article.title!"
              :href="article._path.replace(`/${$i18n.locale}`, '')"
              :date="article.date"
              :datetime="article.datetime"
              :description="article.description"
              :tags="article.tags"
            />
          </li>
        </ul>
      </ContentList>
    </main>
  </LayoutHeader>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'article',
});
</script>