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
  <div class="flex flex-wrap justify-center gap-3">
    <a href={i18n.path('/articles')} class="pill">
      {i18n.t('articles.return_overview')}
    </a>
    <a href={i18n.path('/articles/tags')} class="pill">
      {i18n.t('articles.all_tags')}
    </a>
  </div>
  <ul class="mt-10 flex flex-col gap-5">
    {#each data.articles as article (article.slug)}
      <li><ArticlePreview {article} /></li>
    {/each}
  </ul>
</Header>
