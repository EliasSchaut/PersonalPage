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

<div class="flow-root">
  <ul class="-mb-8">
    {#each events as event, i (event.content)}
      <li>
        <div class="relative pb-8">
          {#if i !== events.length - 1}
            <span
              class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-second-200 dark:bg-second-800"
              aria-hidden="true"
            ></span>
          {/if}
          <div class="relative flex gap-x-3">
            <div>
              <span
                class={[
                  event.past ? 'bg-second-300 dark:bg-second-800' : 'bg-prime-500',
                  'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white dark:ring-second-900',
                ]}
              >
                {#if event.past}
                  <ArrowUpIcon class="h-5 w-5 text-white" aria-hidden="true" />
                {:else}
                  <ArrowRightIcon class="h-5 w-5 text-white" aria-hidden="true" />
                {/if}
              </span>
            </div>
            <div class="flex flex-1 items-center justify-between gap-x-5">
              <div class="flex min-w-0 flex-col">
                <p class="text-sm">{event.content}</p>
                <p class="text-xs text-second-500 dark:text-second-400">{event.organisation}</p>
              </div>
              <div class="text-right text-sm whitespace-nowrap"><time>{event.time}</time></div>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
