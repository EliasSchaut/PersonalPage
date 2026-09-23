<script lang="ts">
  import { getI18n } from '$lib/i18n/context.svelte';
  import type { SearchDoc } from '$lib/server/content/types';
  import MagnifyingGlassIcon from '~icons/heroicons/magnifying-glass';

  let {
    query = $bindable(''),
    onresults,
  }: { query?: string; onresults: (slugs: string[] | null) => void } = $props();

  const i18n = getI18n();
  let fuse: import('fuse.js').default<SearchDoc> | undefined;
  let loading = $state(false);

  async function ensureIndex() {
    if (fuse || loading) return;
    loading = true;
    try {
      const [{ default: Fuse }, res] = await Promise.all([
        import('fuse.js'),
        fetch(`/api/search-index/${i18n.locale}`),
      ]);
      const docs: SearchDoc[] = await res.json();
      fuse = new Fuse(docs, {
        includeScore: true,
        threshold: 0.35,
        ignoreLocation: true,
        keys: [
          { name: 'title', weight: 3 },
          { name: 'tags', weight: 2 },
          { name: 'description', weight: 1.5 },
          { name: 'text', weight: 1 },
        ],
      });
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    const q = query.trim();
    if (!q) {
      onresults(null);
      return;
    }
    ensureIndex().then(() => {
      if (!fuse) return;
      onresults(fuse.search(q).map((r) => r.item.slug));
    });
  });
</script>

<label class="relative block">
  <span class="sr-only">{i18n.t('articles.search.label')}</span>
  <MagnifyingGlassIcon
    class="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-second-400"
    aria-hidden="true"
  />
  <input
    type="search"
    bind:value={query}
    onfocus={ensureIndex}
    placeholder={i18n.t('articles.search.placeholder')}
    class="block w-full rounded-full bg-white py-2 pr-4 pl-10 text-sm text-second-900 outline-1 -outline-offset-1 outline-second-300 placeholder:text-second-400 focus:outline-2 focus:-outline-offset-2 focus:outline-prime-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus:outline-prime-500"
  />
</label>
