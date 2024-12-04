<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in events" :key="event.content">
        <div class="relative pb-8">
          <span
            v-if="eventIdx !== events.length - 1"
            class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-second-200 dark:bg-second-800"
            aria-hidden="true"
          />
          <div class="relative flex gap-x-3">
            <div>
              <span
                :class="[
                  eventIdx === 0
                    ? 'bg-prime-500'
                    : 'bg-second-300 dark:bg-second-800',
                  'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-second-50 dark:ring-second-950',
                ]"
              >
                <component
                  :is="eventIdx === 0 ? ArrowRightIcon : ArrowUpIcon"
                  class="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm">
                  {{ event.content }}
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm">
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
        time: string;
      }>,
      required: true,
    },
  },
});
</script>
