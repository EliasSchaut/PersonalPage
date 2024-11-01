<template>
  <div class="flex gap-x-4">
    <a
      v-for="socal in socials"
      :key="socal.name"
      :href="socal.href"
      class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400"
    >
      <span class="sr-only">{{ socal.name }}</span>
      <component :is="socal.icon" class="h-6 w-6" aria-hidden="true" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/solid';
import { IconDiscord, IconGitHub, IconSteam } from '#components';

const socials = [
  {
    name: 'Mail',
    href: 'mailto:elias@schaut.dev',
    icon: EnvelopeIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/EliasSchaut',
    icon: IconGitHub,
  },
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/501805867369496576',
    icon: IconDiscord,
  },
  {
    name: 'Steam',
    href: 'https://steamcommunity.com/id/kid_ilias/',
    icon: IconSteam,
  },
]
</script>