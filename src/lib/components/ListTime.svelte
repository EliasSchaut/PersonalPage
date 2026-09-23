<script lang="ts">
  import ArrowRightIcon from '~icons/heroicons/arrow-right';
  import ArrowUpIcon from '~icons/heroicons/arrow-up';

  export interface TimeEvent {
    content: string;
    organisation: string;
    time: string;
    past?: boolean;
  }

  let { events }: { events: TimeEvent[] } = $props();
</script>

<ol class="relative flex flex-col gap-6">
  <span
    class="absolute top-5 bottom-5 left-4 w-0.5 -translate-x-1/2 bg-second-200 dark:bg-white/15"
    aria-hidden="true"
  ></span>
  {#each events as event (event.content)}
    <li class="relative flex items-start gap-4">
      <span
        class={[
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          event.past
            ? 'bg-second-200 text-second-600 dark:bg-second-700 dark:text-second-200'
            : 'animate-ring bg-prime-500 text-white',
        ]}
      >
        {#if event.past}
          <ArrowUpIcon class="h-4 w-4" aria-hidden="true" />
        {:else}
          <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
        {/if}
      </span>
      <div class="flex min-w-0 flex-1 flex-col pt-0.5">
        <p class="font-bold text-second-900 dark:text-white">{event.content}</p>
        <p class="text-[15px] text-second-600 dark:text-second-300">{event.organisation}</p>
      </div>
      <time
        class="pt-1 text-[15px] font-semibold whitespace-nowrap text-second-600 dark:text-second-300"
      >
        {event.time}
      </time>
    </li>
  {/each}
</ol>
