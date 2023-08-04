<template>
  <LayoutBanner />
  <ul
    role="list"
    class="mx-4 mt-7 grid grid-cols-1 gap-x-6 gap-y-8 pb-8 sm:mx-6 lg:grid-cols-2 xl:mx-8 xl:gap-x-8"
  >
    <ElementCard title="Bio" :icon="IdentificationIcon">
      Hey, I’m Elias and I would describe myself as a social optimist. It's my
      mission to spread positivity wherever I go, which is precisely why I'm a
      regular face at various social gatherings. As a passionate web and bot
      developer, I'm constantly creating ways to enhance the fun and
      productivity of the communities I'm involved in.
    </ElementCard>
    <ElementCard title="Bildungsweg" :icon="AcademicCapIcon">
      <ElementTimeline :events="graduation_timeline" />
    </ElementCard>
    <ElementCard title="Skills" :icon="TrophyIcon">
      <h1 class="mb-2 text-xl">Technical Skills</h1>
      <ElementBadge
        v-for="skill in skills"
        class="my-0.5 mr-1"
        :key="skill.content"
        :content="skill.content"
        :color="skill.color"
        :href="skill.href"
      />
      <h1 class="my-2 py-2 text-xl">Soft Skills</h1>
    </ElementCard>
    <ElementCard title="Projects" :icon="CodeBracketIcon">
      <ElementList :list="projects" />
    </ElementCard>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IdentificationIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  TrophyIcon,
} from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      graduation_timeline: [
        {
          content: 'Grundschule Jahn- und Schillerschule Brühl',
          time: '2006 - 2010',
        },
        {
          content: 'Abitur Moll Gymnasium Mannheim',
          time: '2010 - 2018',
        },
        {
          content: 'Informatik B.Sc. KIT Karlsruhe',
          time: '2018 - heute',
        },
      ],
      projects: [
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
      ],
      skills: [
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
      ],
    };
  },
  methods: {
    IdentificationIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    TrophyIcon,
  },
});
</script>
