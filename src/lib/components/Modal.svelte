<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getI18n } from '$lib/i18n/context.svelte';

  let {
    open = $bindable(false),
    placeTop = false,
    hideClose = false,
    children,
  }: { open?: boolean; placeTop?: boolean; hideClose?: boolean; children: Snippet } = $props();

  const i18n = getI18n();
  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  });

  function onBackdropClick(e: MouseEvent) {
    if (e.target === dialog) open = false;
  }
</script>

<dialog
  bind:this={dialog}
  onclose={() => (open = false)}
  onclick={onBackdropClick}
  class={[
    'fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none bg-second-500/75 bg-transparent p-4 text-left break-words backdrop:bg-transparent open:flex sm:p-0 dark:bg-second-900/75',
    placeTop ? 'items-start' : 'items-end sm:items-center',
    'justify-center',
  ]}
>
  <div
    class="relative w-full transform rounded-lg bg-second-50 px-4 pt-5 pb-4 text-second-900 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 dark:bg-second-900 dark:text-white"
  >
    {@render children()}
    {#if !hideClose}
      <div class="mt-5 sm:mt-6">
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-second-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-second-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-second-600 dark:bg-second-800"
          onclick={() => (open = false)}
        >
          {i18n.t('common.modal.close')}
        </button>
      </div>
    {/if}
  </div>
</dialog>
