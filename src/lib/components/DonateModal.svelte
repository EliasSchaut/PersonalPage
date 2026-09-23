<script lang="ts">
  import Modal from './Modal.svelte';
  import { donateOptions } from '$lib/data/donate';
  import { getI18n } from '$lib/i18n/context.svelte';
  import GiftIcon from '~icons/heroicons/gift';
  import BankIcon from '~icons/heroicons/building-library';
  import CheckIcon from '~icons/heroicons/check';
  import ClipboardIcon from '~icons/heroicons/clipboard-document';
  import ChevronRightIcon from '~icons/heroicons/chevron-right-20-solid';
  import PayPalIcon from '~icons/simple-icons/paypal';
  import KoFiIcon from '~icons/simple-icons/kofi';
  import GitHubIcon from '~icons/simple-icons/github';

  let { open = $bindable(false) }: { open?: boolean } = $props();
  const i18n = getI18n();

  let copied = $state<string | null>(null);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      copied = value;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = null), 2500);
    } catch {
      copied = null;
    }
  }

  const rowClass =
    'flex w-full items-center gap-x-4 rounded-2xl border border-transparent px-4 py-3.5 text-left transition hover:border-prime-400 hover:bg-white/50 dark:hover:bg-white/5';
</script>

<Modal bind:open>
  <div class="icon-tile mx-auto h-12 w-12">
    <GiftIcon aria-hidden="true" />
  </div>
  <h3 class="mt-4 text-center text-xl font-extrabold text-second-900 dark:text-white">
    {i18n.t('donate.me', { name: 'Elias Schaut' })}
  </h3>
  <ul class="mt-5 flex flex-col gap-1">
    {#each donateOptions as option (option.content)}
      <li>
        {#if option.copy}
          <button
            type="button"
            class={[rowClass, 'select-none']}
            onclick={() => copy(option.copy!)}
            aria-label={i18n.t('donate.copy')}
          >
            <span class="h-6 w-6 shrink-0 [&>svg]:h-6 [&>svg]:w-6"
              ><BankIcon aria-hidden="true" /></span
            >
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="font-bold text-second-900 dark:text-white">{option.content}</span>
              <span class="text-[15px] text-second-600 dark:text-second-300">
                {copied === option.copy ? i18n.t('donate.copied') : option.copy}
              </span>
            </span>
            {#if copied === option.copy}
              <CheckIcon class="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
            {:else}
              <ClipboardIcon class="h-5 w-5 shrink-0 text-second-400" aria-hidden="true" />
            {/if}
          </button>
        {:else}
          <a href={option.href} target="_blank" rel="noopener noreferrer" class={rowClass}>
            <span class="h-6 w-6 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
              {#if option.icon === 'paypal'}<PayPalIcon aria-hidden="true" />
              {:else if option.icon === 'kofi'}<KoFiIcon aria-hidden="true" />
              {:else}<GitHubIcon aria-hidden="true" />{/if}
            </span>
            <span class="flex-1 font-bold text-second-900 dark:text-white">{option.content}</span>
            <ChevronRightIcon class="h-5 w-5 shrink-0 text-second-400" aria-hidden="true" />
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</Modal>
