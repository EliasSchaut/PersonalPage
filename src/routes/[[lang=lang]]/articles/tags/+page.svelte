<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  let { data } = $props();
  const i18n = getI18n();
</script>

<SeoHead title={i18n.t('articles.tags.title')} description={i18n.t('articles.tags.intro')} />

<Header title={i18n.t('articles.tags.title')} intro={i18n.t('articles.tags.intro')}>
  <ul class="flex flex-wrap gap-3">
    {#each data.tags as tag (tag.slug)}
      <li>
        <a
          href={i18n.path(`/articles/tags/${tag.slug}`)}
          class="flex items-baseline gap-2 rounded-xl border border-second-200 px-4 py-3 hover:bg-second-100 dark:border-second-700 dark:hover:bg-second-900"
        >
          <span class="font-semibold text-second-900 dark:text-white">{tag.tag}</span>
          <span class="text-sm text-second-500 dark:text-second-400">
            {tag.count === 1
              ? i18n.t('articles.tags.count_one')
              : i18n.t('articles.tags.count', { count: tag.count })}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</Header>
