<template>
  <nav>
    <div class="hidden md:inline">
      <ul
        class="text-second-800 shadow-second-800/5 ring-second-900/5 dark:bg-second-800/90 dark:text-second-200 flex rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg ring-1 backdrop-blur dark:ring-white/10"
      >
        <li v-for="page in pages" :key="page.title">
          <nuxt-link
            :href="page.href"
            :class="{
              'relative block px-3 py-2 transition': true,
              'text-prime-500 dark:text-prime-400': page.matches.test(
                route.fullPath,
              ),
              'hover:text-prime-500 dark:hover:text-prime-400':
                !page.matches.test(route.fullPath),
            }"
          >
            {{ page.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <button
      type="button"
      class="group text-second-800 shadow-second-800/5 ring-second-900/5 dark:bg-second-800/90 dark:text-second-200 flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium shadow-lg ring-1 backdrop-blur md:hidden dark:ring-white/10 dark:hover:ring-white/20"
      @click="$refs.mobile_nav!.show()"
    >
      Menu
      <ChevronDownIcon
        class="stroke-second-500 group-hover:stroke-second-700 dark:group-hover:stroke-second-400 ml-3 h-auto w-2"
      />
    </button>
  </nav>
  <Modal ref="mobile_nav" hide_close place_top>
    <div class="flex flex-row-reverse items-center justify-between">
      <button
        aria-label="Close menu"
        class="-m-1 p-1"
        @click="$refs.mobile_nav!.hide()"
      >
        <XMarkIcon class="text-second-500 dark:text-second-400 h-6 w-6" />
      </button>
      <h2 class="text-second-600 dark:text-second-400 text-sm font-medium">
        Navigation
      </h2>
    </div>
    <nav class="mt-6">
      <ul
        class="divide-second-100 text-second-800 dark:divide-second-100/5 dark:text-second-300 -my-2 divide-y text-base"
      >
        <li v-for="page in pages" :key="page.title">
          <nuxt-link
            class="hover:bg-second-200 dark:hover:bg-second-800 block px-2 py-2"
            :href="page.href"
            @click="$refs.mobile_nav!.hide()"
          >
            {{ page.title }}
          </nuxt-link>
        </li>
      </ul>
      <div class="mt-5 flex flex-row justify-stretch space-x-4 sm:hidden">
        <SettingLang class="w-full" />
        <SettingTheme class="w-full" />
      </div>
    </nav>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  components: { ChevronDownIcon, XMarkIcon },
  setup() {
    const { t } = useI18n();

    return {
      route: useRoute(),
      pages: computed(
        () =>
          [
            {
              title: t('nav.about'),
              href: '/',
              matches: /^\/$/,
            },
            {
              title: t('nav.articles'),
              href: '/articles',
              matches: /^\/articles(\/.*)?$/,
            },
            {
              title: t('nav.projects'),
              href: '/projects',
              matches: /^\/projects(\/.*)?$/,
            },
            {
              title: t('nav.wiki'),
              href: 'https://wiki.schaut.dev',
              matches: /^\/wiki.schaut.dev(\/.*)?$/,
            },
          ] as Array<{ title: string; href: string; matches: RegExp }>,
      ),
    };
  },
});
</script>
