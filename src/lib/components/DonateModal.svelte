<script lang="ts">
  import Modal from './Modal.svelte';
  import List from './List.svelte';
  import { donateOptions } from '$lib/data/donate';
  import { getI18n } from '$lib/i18n/context.svelte';
  import GiftIcon from '~icons/heroicons/gift';
  import BankIcon from '~icons/heroicons/building-library';
  import PayPalIcon from '~icons/simple-icons/paypal';
  import KoFiIcon from '~icons/simple-icons/kofi';
  import GitHubIcon from '~icons/simple-icons/github';

  let { open = $bindable(false) }: { open?: boolean } = $props();
  const i18n = getI18n();
</script>

<Modal bind:open>
  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
    <GiftIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
  </div>
  <div class="mt-3 text-center sm:mt-5">
    <h3 class="text-base leading-6 font-semibold text-gray-900 dark:text-white">
      {i18n.t('donate.me', { name: 'Elias Schaut' })}
    </h3>
    <div class="mt-4 text-left text-sm text-gray-500">
      <List list={donateOptions}>
        {#snippet icon(name)}
          {#if name === 'paypal'}<PayPalIcon />{:else if name === 'kofi'}<KoFiIcon
            />{:else if name === 'github'}<GitHubIcon />{:else}<BankIcon />{/if}
        {/snippet}
      </List>
    </div>
  </div>
</Modal>
