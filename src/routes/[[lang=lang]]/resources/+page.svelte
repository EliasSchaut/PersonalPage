<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Article from '$lib/components/article/Article.svelte';

  let { data } = $props();
</script>

<SeoHead title={data.page.title} description={data.page.description} noindex />

<Article>
  <h1>{data.page.title}</h1>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted, repo-owned markdown -->
  {@html data.page.html}
</Article>
