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
    'fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none bg-second-900/40 p-4 text-left break-words backdrop-blur-sm backdrop:bg-transparent open:flex sm:p-0 dark:bg-second-950/60',
    placeTop ? 'items-start' : 'items-end sm:items-center',
    'justify-center',
  ]}
>
  <div
    class="relative w-full rounded-3xl border border-second-200 bg-second-50 p-5 text-second-900 shadow-2xl sm:my-8 sm:max-w-sm sm:p-6 dark:border-white/15 dark:bg-second-900 dark:text-white"
  >
    {@render children()}
    {#if !hideClose}
      <div class="mt-6">
        <button type="button" class="btn btn-ghost w-full" onclick={() => (open = false)}>
          {i18n.t('common.modal.close')}
        </button>
      </div>
    {/if}
  </div>
</dialog>
