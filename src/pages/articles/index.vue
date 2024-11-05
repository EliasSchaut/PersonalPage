<template>
  <LayoutHeader
    :title="$t('articles.title') + (tag ? ` (${tag})` : '')"
    :intro="$t('articles.intro')"
  >
    <div v-if="tag" class="flex justify-center">
      <nuxt-link
        href="/articles/"
        type="button"
        class="-mt-5 rounded bg-white px-2 py-1 text-sm font-semibold text-second-900 shadow-sm ring-1 ring-inset ring-second-300 hover:bg-second-50 dark:bg-white/10 dark:text-white dark:ring-second-700 dark:hover:bg-white/20"
      >
        {{ $t('articles.return_overview') }}
      </nuxt-link>
    </div>

    <nav>
      <ContentList :path="$i18n.locale + '/articles'" v-slot="{ list }">
        <ul
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-second-200 pt-10 dark:border-second-500 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none"
        >
          <li
            class="text-second-700 dark:text-second-300"
            v-if="
              tag && !list.some((article: any) => article.tags.includes(tag))
            "
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
      </ContentList>
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
</script>
