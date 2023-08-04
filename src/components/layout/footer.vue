<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        :aria-label="$t('footer.title')"
      >
        <div v-for="item in main" :key="item.name" class="pb-6">
          <nuxt-link
            v-if="item?.intern"
            :to="item.href"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            {{ item.name }}
          </nuxt-link>
          <a
            v-else
            :href="item.href"
            target="_blank"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            >{{ item.name }}</a
          >
        </div>
      </nav>
      <div class="mt-10 flex justify-center space-x-10">
        <a
          v-for="item in social"
          :key="item.name"
          :href="item.href"
          class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          target="_blank"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p
        class="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-gray-300"
      >
        &copy; 2023 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { IconGitHub, IconSteam, IconDiscord } from '#components';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutFooter',
  data() {
    return {
      main: [
        {
          name: 'Home',
          href: '/',
          intern: true,
        },
        {
          name: 'Source Code',
          href: 'https://github.com/EliasSchaut/PersonalPage',
        },
        { name: 'Imprint', href: '/imprint', intern: true },
        { name: 'Privacy', href: '/privacy', intern: true },
      ],
      social: [
        {
          name: 'GitHub',
          href: 'https://github.com/EliasSchaut',
          icon: IconGitHub,
        },
        {
          name: 'Discord',
          href: 'https://discord.gg/vacYz5qpJ3',
          icon: IconDiscord,
        },
        {
          name: 'Steam',
          href: 'https://steamcommunity.com/id/kid_ilias/',
          icon: IconSteam,
        },
      ],
    };
  },
});
</script>
