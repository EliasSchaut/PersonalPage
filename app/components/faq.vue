<template>
  <div class="dark:bg-second-900 bg-white">
    <div class="mx-auto px-6 pb-6">
      <div class="divide-second-900/10 mx-auto divide-y dark:divide-white/10">
        <dl
          class="divide-second-900/10 space-y-6 divide-y dark:divide-white/10"
        >
          <Disclosure
            as="div"
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="text-second-900 flex w-full items-start justify-between text-left dark:text-white"
              >
                <span class="text-base leading-7 font-semibold">{{
                  faq.question
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p
                class="text-second-600 dark:text-second-300 text-base leading-7"
              >
                {{ faq.answer }}
              </p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'faq',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MinusSmallIcon,
    PlusSmallIcon,
  },
  props: {
    faqs: {
      type: Array<{ question: string; answer: string }>,
      required: true,
    },
  },
});
</script>
