<template>
  <Modal ref="modal">
    <div
      class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
    >
      <BigGiftIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
    <div class="mt-3 text-center sm:mt-5">
      <DialogTitle
        as="h3"
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >{{ $t('donate.me', { name: 'Elias Schaut' }) }}
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
import { IconGitHub, IconKoFi, IconPayPal } from '#components';
import {
  BuildingLibraryIcon,
  GiftIcon as BigGiftIcon,
} from '@heroicons/vue/24/outline';
import { DialogTitle } from '@headlessui/vue';

export default defineComponent({
  components: {
    BigGiftIcon,
    DialogTitle,
  },
  methods: {
    show() {
      this.$refs.modal?.show();
    },
    hide() {
      this.$refs.modal?.hide();
    },
  },
  setup() {
    return {
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
});
</script>
