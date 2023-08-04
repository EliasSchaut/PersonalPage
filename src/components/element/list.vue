<template>
  <ul
    role="list"
    class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <li
      v-for="element in list"
      :key="element.content"
      class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
    >
      <div class="flex min-w-0 gap-x-4">
        <component
          v-if="element.icon"
          class="h-6 w-6 flex-none"
          :is="element.icon()"
          alt=""
        />
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a v-if="element.href" :href="element.href" target="_blank">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ element.content }}
            </a>
            <span v-else>{{ element.content }}</span>
          </p>
        </div>
      </div>
      <div v-if="element.href" class="flex shrink-0 items-center gap-x-4">
        <ChevronRightIcon
          class="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'List',
  components: {
    ChevronRightIcon,
  },
  props: {
    list: {
      type: Array<{ content: string; href?: string; icon?: Function }>,
      required: true,
    },
  },
});
</script>
