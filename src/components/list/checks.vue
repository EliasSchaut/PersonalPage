<template>
  <ul role="list" class="-mb-8">
    <li v-for="event in events" :key="event.content">
      <div class="relative space-x-3 pb-8">
        <div class="flex min-w-0 items-start justify-center space-x-4 pt-1.5">
          <span class="h-8 w-8">
            <CheckBadgeIcon />
          </span>
          <div class="flex w-full flex-col justify-center">
            <p class="text-sm">
              {{ event.content }}
            </p>
            <p class="text-sm dark:text-gray-500">
              {{ event.subcontent }}
            </p>
          </div>
          <div class="whitespace-nowrap text-right text-sm">
            <time>{{ event.time }}</time>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'timeline',
  components: { CheckBadgeIcon },
  props: {
    events: {
      type: Array<{
        content: string;
        subcontent: string;
        time: string;
      }>,
      required: true,
    },
  },
});
</script>
