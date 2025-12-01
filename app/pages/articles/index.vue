<template>
  <LayoutHeader
    :title="$t('articles.title') + (tag ? ` (${tag})` : '')"
    :intro="$t('articles.intro')"
  >
    <div v-if="tag" class="flex justify-center">
      <nuxt-link
        href="/articles/"
        type="button"
        class="text-second-900 ring-second-300 hover:bg-second-50 dark:ring-second-700 -mt-5 rounded bg-white px-2 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        {{ $t('articles.return_overview') }}
      </nuxt-link>
    </div>

    <nav>
      <ul
        class="border-second-200 dark:border-second-500 mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none"
      >
        <template v-for="article of list" :key="article.id">
          <li
            v-if="
              article.path.startsWith('/articles/') &&
              article.meta.published &&
              (!tag || (article.meta.tags as string[]).includes(tag))
            "
          >
            <ArticlePreview
              :title="article.title!"
              :href="article.path!"
              :cover="
                article.meta.cover
                  ? joinURL('/articles', 'covers', article.meta.cover as string)
                  : ''
              "
              :date="article.meta.date as string"
              :datetime="article.meta.datetime as string"
              :description="article.description"
              :tags="article.meta.tags as string[]"
            />
          </li>
        </template>
      </ul>
    </nav>
  </LayoutHeader>
</template>

<script setup lang="ts">
import { joinURL } from 'ufo';
import type { Collections } from '@nuxt/content';

definePageMeta({
  layout: 'article',
});

const { locale } = useI18n();
const tag = computed(() => (useRoute().query.tag ?? '') as string);

const { data: list } = await useAsyncData(
  () => {
    const collection = ('content_' + locale.value) as keyof Collections;
    return queryCollection(collection)
      .select('id', 'title', 'description', 'meta', 'path')
      .order('id', 'ASC')
      .all();
  },
  { watch: [locale, tag] },
);
console.log(list.value);
</script>
