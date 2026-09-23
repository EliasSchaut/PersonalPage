<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Card from '$lib/components/Card.svelte';
  import List from '$lib/components/List.svelte';
  import { projects } from '$lib/data/projects';
  import { getI18n } from '$lib/i18n/context.svelte';
  import CodeBracketIcon from '~icons/heroicons/code-bracket';

  const i18n = getI18n();
  const list = $derived(
    projects.map((p) => ({
      content: p.name,
      subcontent: i18n.t(`projects.subcontents.${p.key}`),
      href: p.href,
    })),
  );
</script>

<SeoHead title={i18n.t('nav.projects')} description={i18n.t('projects.intro')} />

<Header title={i18n.t('projects.title')} intro={i18n.t('projects.intro')}>
  <Card title={i18n.t('home.projects.title')}>
    {#snippet icon()}<CodeBracketIcon aria-hidden="true" />{/snippet}
    <List {list} />
  </Card>
</Header>
