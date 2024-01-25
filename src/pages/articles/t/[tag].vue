<template>
  <LayoutHeader :title="`${$t('articles.title')} (${$route.params.tag})`" :intro="$t('articles.intro')">
    <div class="flex justify-center">
      <nuxt-link href="/articles/" type="button" class="-mt-5 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:ring-gray-700">
        {{ $t('articles.return_overview') }}
      </nuxt-link>
    </div>

    <nav>
      <ContentList :path="$i18n.locale + '/articles'" v-slot="{ list }">
        <ul
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-gray-500"
        >
          <li
            class="text-gray-700 dark:text-gray-300"
            v-if="!list.some((article: any) => article.tags.includes($route.params.tag))">
            {{ $t('articles.tag_not_found') }}
          </li>
          <li v-for="article of list" :key="article._path">
            <ArticlePreview
              v-if="article.tags.includes($route.params.tag)"
              :title="article.title"
              :href="article._path.replace(`/${$i18n.locale}`, '')"
              :date="article.date"
              :datetime="article.datetime"
              :description="article.description"
              :tags="article.tags"
            />
          </li>
        </ul>
      </ContentList>
    </nav>
  </LayoutHeader>
</template>
