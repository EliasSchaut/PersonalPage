<script lang="ts">
  import CheckBadgeIcon from '~icons/heroicons/check-badge';

  export interface CheckEvent {
    content: string;
    subcontent: string;
    time: string;
  }

  let { events }: { events: CheckEvent[] } = $props();
</script>

<ul class="flex flex-col gap-6">
  {#each events as event (event.content)}
    <li class="flex items-start gap-4">
      <span class="hidden h-8 w-8 shrink-0 items-center justify-center text-prime-500 sm:flex">
        <CheckBadgeIcon class="h-7 w-7" aria-hidden="true" />
      </span>
      <div class="flex w-full min-w-0 flex-col gap-y-1">
        <time class="text-[15px] font-semibold text-second-600 sm:hidden dark:text-second-300">
          {event.time}
        </time>
        <p class="font-bold text-second-900 dark:text-white">{event.content}</p>
        <p class="text-[15px] text-second-600 dark:text-second-300">{event.subcontent}</p>
      </div>
      <time
        class="hidden pt-0.5 text-[15px] font-semibold whitespace-nowrap text-second-600 sm:block dark:text-second-300"
      >
        {event.time}
      </time>
    </li>
  {/each}
</ul>
