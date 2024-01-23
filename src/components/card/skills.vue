<template>
  <Card :title="$t('home.skills.title')" :icon="TrophyIcon">
    <h1 class="mb-2 text-xl">{{ $t('home.skills.technical') }}</h1>
    <Badge
      v-for="skill in skills_technical"
      class="my-0.5 mr-1"
      :key="skill.content"
      :content="skill.content"
      :color="skill.color"
      :href="skill.href"
    />
    <h1 class="my-2 pt-2 text-xl">{{ $t('home.skills.soft.title') }}</h1>
    <Badge
      v-for="skill in [
        $t('home.skills.soft.skills.events'),
        $t('home.skills.soft.skills.organisation'),
        $t('home.skills.soft.skills.teamwork'),
        $t('home.skills.soft.skills.communication'),
        $t('home.skills.soft.skills.project_management'),
        $t('home.skills.soft.skills.mentoring'),
        $t('home.skills.soft.skills.social'),
        $t('home.skills.soft.skills.overmotivated'),
      ]"
      class="my-0.5 mr-1"
      :key="skill"
      :content="skill"
    />
    <h1 class="my-2 pt-2 text-xl">
      {{ $t('home.skills.etc.title') }}
    </h1>
    <Badge
      v-for="skill in [
        $t('home.skills.etc.skills.games'),
        $t('home.skills.etc.skills.piano'),
        $t('home.skills.etc.skills.trumpet'),
      ]"
      class="my-0.5 mr-1"
      :key="skill"
      :content="skill"
    />
  </Card>
</template>

<script setup lang="ts">
import { TrophyIcon } from '@heroicons/vue/24/outline';

const skills_technical = [
  {
    content: 'Typescript',
    color: '#3178c6',
    href: 'https://www.typescriptlang.org/',
  },
  {
    content: 'Vue.js',
    color: '#41b883',
    href: 'https://vuejs.org/',
  },
  {
    content: 'Nuxt',
    color: '#00DC82',
    href: 'https://nuxt.com/',
  },
  {
    content: 'NestJS',
    color: '#e0234e',
    href: 'https://nestjs.com/',
  },
  {
    content: 'tailwindcss',
    color: '#38bdf8',
    href: 'https://tailwindcss.com/',
  },
  {
    content: 'Bootstrap',
    color: '#8612fb',
    href: 'https://getbootstrap.com/',
  },
  {
    content: 'GraphQL',
    color: '#e10098',
    href: 'https://graphql.org/',
  },
  {
    content: 'Prisma',
    color: '#0c344b',
    href: 'https://www.prisma.io/',
  },
  {
    content: 'PostgreSQL',
    color: '#336791',
    href: 'https://www.postgresql.org/',
  },
  {
    content: 'SQLite',
    color: '#044a62',
    href: 'https://www.sqlite.org/',
  },
  {
    content: 'Prettier',
    color: '#56b3b4',
    href: 'https://prettier.io/',
  },
  {
    content: 'Node.js',
    color: '#026e00',
    href: 'https://nodejs.org',
  },
  {
    content: 'NPM',
    color: '#cb3837',
    href: 'https://www.npmjs.com/',
  },
  {
    content: 'GitHub',
    color: '#adbac7',
    href: 'https://github.com/',
  },
  {
    content: 'GitLab',
    color: '#e24329',
    href: 'https://gitlab.com/',
  },
  {
    content: 'Git',
    color: '#F44D27',
    href: 'https://git-scm.com/',
  },
  {
    content: 'Discord',
    color: '#404eed',
    href: 'https://discord.com/',
  },
  {
    content: 'discord.js',
    color: '#4752c4',
    href: 'https://discord.js.org/',
  },
  {
    content: 'JavaScript',
    color: '#f1e05a',
    href: 'https://developer.mozilla.org/docs/Web/javascript',
  },
  {
    content: 'Java',
    color: '#b07219',
    href: 'https://www.java.com/',
  },
  {
    content: 'Python',
    color: '#3572A5',
    href: 'https://www.python.org/',
  },
  {
    content: 'C',
    color: '#555555',
    href: 'https://gcc.gnu.org/',
  },
  {
    content: 'Godot Engine',
    color: '#355570',
    href: 'https://godotengine.org/',
  },
  {
    content: 'Debian',
    color: '#D70751',
    href: 'https://www.debian.org/',
  },
  {
    content: 'Raspberry Pi',
    color: '#ce1d56',
    href: 'https://www.raspberrypi.com/',
  },
  {
    content: 'Windows',
    color: '#52d5ff',
    href: 'https://www.microsoft.com/windows',
  },
  {
    content: 'Microsoft Office',
    color: '#ffba08',
    href: 'https://www.office.com/',
  },
  {
    content: 'LaTeX',
    color: '#008080',
    href: 'https://www.latex-project.org/',
  },
  {
    content: 'WebStorm',
    color: '#07c3f2',
    href: 'https://www.jetbrains.com/webstorm/',
  },
];
</script>
