<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in events" :key="event.content">
        <div class="relative pb-8">
          <span
            v-if="eventIdx !== events.length - 1"
            class="bg-second-200 dark:bg-second-800 absolute top-4 left-4 -ml-px h-full w-0.5"
            aria-hidden="true"
          />
          <div class="relative flex gap-x-3">
            <div>
              <span
                :class="[
                  event.past
                    ? 'bg-second-300 dark:bg-second-800'
                    : 'bg-prime-500',
                  'dark:ring-second-900 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
                ]"
              >
                <component
                  :is="event.past ? ArrowUpIcon : ArrowRightIcon"
                  class="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div class="flex flex-1 items-center justify-between gap-x-5">
              <div class="flex min-w-0 flex-col">
                <p class="text-sm">
                  {{ event.content }}
                </p>
                <p class="text-second-500 dark:text-second-400 text-xs">
                  {{ event.organisation }}
                </p>
              </div>
              <div class="text-right text-sm whitespace-nowrap">
                <time>{{ event.time }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArrowRightIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'timeline',
  setup() {
    return {
      ArrowUpIcon,
      ArrowRightIcon,
    };
  },
  props: {
    events: {
      type: Array<{
        content: string;
        organisation: string;
        time: string;
        past?: boolean;
      }>,
      required: true,
    },
  },
});
</script>
