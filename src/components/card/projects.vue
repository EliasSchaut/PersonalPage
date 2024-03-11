<template>
  <Card :title="$t('home.projects.title')" :icon="CodeBracketIcon">
    <List :list="projects" />
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()
import { CodeBracketIcon } from '@heroicons/vue/24/outline';

const projects = computed(() => [
  {
    content: 'WatchVote',
    subcontent: t('projects.subcontents.watchvote'),
    href: 'https://github.com/EliasSchaut/WatchVote',
  },
  {
    content: 'BdayHero',
    subcontent: t('projects.subcontents.bdayhero'),
    href: 'https://github.com/EliasSchaut/Winvite',
  },
  {
    content: 'KaraokeList',
    subcontent: t('projects.subcontents.karaokelist'),
    href: 'https://github.com/EliasSchaut/KaraokeList'
  },
  {
    content: 'Winvite',
    subcontent: t('projects.subcontents.winvite'),
    href: 'https://github.com/EliasSchaut/Winvite',
  },
  {
    content: 'SnakeArena',
    subcontent: t('projects.subcontents.snakearena'),
    href: 'https://github.com/EliasSchaut/SnakeArena'
  },
  {
    content: 'Discord Bots',
    subcontent: t('projects.subcontents.discordbots'),
    href: 'https://github.com/EliasSchaut?tab=repositories&q=Bot',
  },
  {
    content: 'Web Beginnings',
    subcontent: t('projects.subcontents.webbeginnings'),
    href: 'https://legacy.schaut.dev',
  },
]);
</script>
