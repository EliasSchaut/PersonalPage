<script lang="ts">
  import CheckBadgeIcon from '~icons/heroicons/check-badge';

  export interface CheckEvent {
    content: string;
    subcontent: string;
    time: string;
  }

  let { events }: { events: CheckEvent[] } = $props();
</script>

<ul class="-mb-8">
  {#each events as event (event.content)}
    <li>
      <div class="relative space-x-3 pb-8">
        <div class="flex min-w-0 items-center justify-center space-x-4 pt-1.5">
          <span class="hidden h-8 w-8 items-center justify-center sm:flex">
            <CheckBadgeIcon class="h-8 w-8" aria-hidden="true" />
          </span>
          <div class="flex w-full flex-col justify-center gap-y-1">
            <div class="text-left text-sm whitespace-nowrap sm:hidden">
              <time>{event.time}</time>
            </div>
            <p class="text-sm font-bold">{event.content}</p>
            <p class="text-sm dark:text-second-500">{event.subcontent}</p>
          </div>
          <div class="hidden text-right text-sm whitespace-nowrap sm:block">
            <time>{event.time}</time>
          </div>
        </div>
      </div>
    </li>
  {/each}
</ul>
