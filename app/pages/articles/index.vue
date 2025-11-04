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
        <li
          class="text-second-700 dark:text-second-300"
          v-if="tag && !list.some((article: any) => article.tags.includes(tag))"
        >
          {{ $t('articles.tag_not_found') }}
        </li>
        <template v-else v-for="article of list" :key="article._path">
          <li
            v-if="!article.hidden && (!tag || article.tags.includes(tag))"
            :key="article._path"
          >
            <ArticlePreview
              :title="article.title!"
              :href="article._path!.replace(`/${$i18n.locale}`, '')"
              :cover="
                article.cover
                  ? joinURL('/articles', 'covers', article.cover)
                  : ''
              "
              :date="article.date"
              :datetime="article.datetime"
              :description="article.description"
              :tags="article.tags"
            />
          </li>
        </template>
      </ul>
    </nav>
  </LayoutHeader>
</template>

<script setup lang="ts">
import { joinURL } from 'ufo';

definePageMeta({
  layout: 'article',
});

defineProps({
  tag: {
    type: String,
    default: '',
  },
});

const { locale } = useI18n();

const { data: list } = await useAsyncData(
  'navigation',
  async () => {
    const collection = ('content_' + locale.value) as keyof Collections;
    return await queryCollectionNavigation(collection)
      .where('published', '=', true)
      .order('date', 'DESC');
  },
  { watch: [locale] },
);
</script>
