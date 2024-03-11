<template>
  <div class="bg-white dark:bg-gray-900">
    <div>
      <nuxt-img
        class="h-32 w-full object-cover lg:h-48"
        src="/banner.png"
        alt="Profile Banner"
      />
    </div>
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="flex">
          <nuxt-img
            class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 dark:ring-gray-900"
            src="/avatar_elias.jpg"
            alt="Profile Picture"
          />
        </div>
        <div
          class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
        >
          <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
            <h1
              class="truncate text-2xl font-bold text-gray-900 dark:text-white"
            >
              {{ name }}
            </h1>
          </div>
          <div
            class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <div class="flex flex-row justify-stretch space-x-4">
              <SettingLang class="w-full" />
              <SettingTheme class="w-full" />
            </div>
            <a
              :href="`mailto:${email}`"
              type="button"
              class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-gray-600 dark:hover:bg-white/20"
            >
              <EnvelopeIcon
                class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>{{ $t('banner.contact') }}</span>
            </a>
            <button
              type="button"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              @click="show_donate_modal()"
            >
              <GiftIcon
                class="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>{{ $t('banner.donate') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
        <h1 class="truncate text-2xl font-bold text-gray-900 dark:text-white">
          {{ name }}
        </h1>
      </div>
      <div class="mt-6 min-w-0">
        <h4 class="text-gray-600 dark:text-gray-400">
          {{ $t('banner.desc') }}
        </h4>
      </div>
    </div>
  </div>

  <Modal ref="donate_modal">
    <div
      class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
    >
      <BigGiftIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
    <div class="mt-3 text-center sm:mt-5">
      <DialogTitle
        as="h3"
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >{{ $t('banner.donate_me', { name: 'Elias Schaut' }) }}
      </DialogTitle>
      <div class="mt-4">
        <p class="text-sm text-gray-500">
          <List :list="donate" />
        </p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { EnvelopeIcon, GiftIcon } from '@heroicons/vue/20/solid';
import {
  BuildingLibraryIcon,
  GiftIcon as BigGiftIcon,
} from '@heroicons/vue/24/outline';
import { DialogTitle } from '@headlessui/vue';
import { defineComponent } from 'vue';
import { IconGitHub, IconKoFi, IconPayPal } from '#components';

export default defineComponent({
  name: 'LayoutBanner',
  components: {
    EnvelopeIcon,
    DialogTitle,
    BigGiftIcon,
    GiftIcon,
  },
  setup() {
    return {
      name: 'Elias Schaut',
      email: 'elias@schaut.dev',
      backgroundImage:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      donate: [
        {
          href: 'https://paypal.me/eschaut',
          content: 'PayPal',
          icon: () => IconPayPal,
        },
        {
          href: 'https://ko-fi.com/kid_ilias',
          content: 'Ko-Fi',
          icon: () => IconKoFi,
        },
        {
          href: 'https://github.com/sponsors/EliasSchaut',
          content: 'GitHub Sponsor',
          icon: () => IconGitHub,
        },
        {
          content: 'IBAN: DE24 6605 0101 1022 9775 48',
          icon: () => BuildingLibraryIcon,
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.home.includes('donate')) {
      this.show_donate_modal();
    }
  },
  methods: {
    show_donate_modal() {
      this.$refs.donate_modal.show();
    },
  },
});
</script>
