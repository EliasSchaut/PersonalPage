<template>
  <footer class="bg-white dark:bg-second-800">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        :aria-label="$t('footer.title')"
      >
        <div v-for="link in links" :key="link.title" class="pb-6">
          <nuxt-link
            v-if="link?.intern"
            :to="link.href"
            class="text-sm leading-6 text-second-600 hover:text-second-900 dark:text-second-300 dark:hover:text-second-400"
          >
            {{ link.title }}
          </nuxt-link>
          <a
            v-else
            :href="link.href"
            target="_blank"
            class="text-sm leading-6 text-second-600 hover:text-second-900 dark:text-second-300 dark:hover:text-second-400"
            >{{ link.title }}</a
          >
        </div>
      </nav>
      <div class="mt-10 flex justify-center space-x-10">
        <a
          v-for="item in social"
          :key="item.name"
          :href="item.href"
          class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400"
          target="_blank"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p
        class="mt-10 text-center text-xs leading-5 text-second-500 dark:text-second-300"
      >
        &copy; 2023-2024 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { IconDiscord, IconGitHub, IconSteam } from '#components';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    const { t } = useI18n();

    return {
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
      links: [
        {
          title: t('footer.home'),
          href: '/',
          intern: true,
        },
        {
          title: t('footer.source'),
          href: 'https://github.com/EliasSchaut/PersonalPage',
        },
        { title: t('footer.resources'), href: '/resources', intern: true },
        { title: t('footer.imprint'), href: '/imprint', intern: true },
        { title: t('footer.privacy'), href: '/privacy', intern: true },
      ] as Array<{ title: string; href: string; intern?: boolean }>,
    };
  },
});
</script>
