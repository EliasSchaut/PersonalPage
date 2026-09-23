<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ArticlePreview from '$lib/components/article/ArticlePreview.svelte';
  import Search from '$lib/components/article/Search.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import NewsletterForm from '$lib/components/NewsletterForm.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { data } = $props();
  const i18n = getI18n();

  let query = $state('');
  let matches = $state<string[] | null>(null);
  const shown = $derived(
    matches === null
      ? data.articles
      : matches
          .map((slug) => data.articles.find((a) => a.slug === slug))
          .filter((a) => a !== undefined),
  );
</script>

<SeoHead title={i18n.t('nav.articles')} description={i18n.t('articles.intro')} />

<Header title={i18n.t('articles.title')} intro={i18n.t('articles.intro')}>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-wrap gap-2">
      {#each data.tags as tag (tag.slug)}
        <Badge content="{tag.tag} ({tag.count})" href={i18n.path(`/articles/tags/${tag.slug}`)} />
      {/each}
    </div>
    <div class="sm:w-72">
      <Search bind:query onresults={(r) => (matches = r)} />
    </div>
  </div>

  <nav>
    {#if shown.length === 0}
      <p class="mt-10 text-center text-lg text-second-600 dark:text-second-300">
        {i18n.t('articles.search.no_results')}
      </p>
    {:else}
      <ul class="mt-10 flex flex-col gap-5">
        {#each shown as article (article.slug)}
          <li><ArticlePreview {article} /></li>
        {/each}
      </ul>
    {/if}
  </nav>

  <div class="mt-16">
    <NewsletterForm />
  </div>
</Header>
