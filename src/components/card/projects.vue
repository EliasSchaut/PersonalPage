<template>
  <Card :title="$t('home.projects.title')" :icon="CodeBracketIcon">
    <List :list="projects" />
  </Card>
</template>

<script setup lang="ts">
import { CodeBracketIcon } from '@heroicons/vue/24/outline';

const projects = [
  {
    content: 'WatchVote',
    href: 'https://github.com/EliasSchaut/WatchVote',
  },
  {
    content: 'Winvite',
    href: 'https://github.com/EliasSchaut/Winvite',
  },
  {
    content: 'Discord Bots',
    href: 'https://github.com/Kids-Discord-Bots',
  },
  {
    content: 'Web Beginnings',
    href: 'https://legacy.schaut.dev',
  },
];
</script>
