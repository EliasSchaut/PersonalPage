<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ArticlePreview from '$lib/components/article/ArticlePreview.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { data } = $props();
  const i18n = getI18n();
  const title = $derived(i18n.t('articles.tags.tagged', { tag: data.tag.tag }));
</script>

<SeoHead {title} description={i18n.t('articles.intro')} />

<Header {title} intro={i18n.t('articles.intro')}>
  <div class="flex justify-center gap-4 text-sm">
    <a href={i18n.path('/articles')} class="font-semibold text-prime-600 dark:text-prime-400">
      {i18n.t('articles.return_overview')}
    </a>
    <a href={i18n.path('/articles/tags')} class="font-semibold text-prime-600 dark:text-prime-400">
      {i18n.t('articles.all_tags')}
    </a>
  </div>
  <ul
    class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-second-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none dark:border-second-500"
  >
    {#each data.articles as article (article.slug)}
      <li><ArticlePreview {article} /></li>
    {/each}
  </ul>
</Header>
