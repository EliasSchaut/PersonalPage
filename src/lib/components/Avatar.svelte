<script lang="ts">
  let { size = 'big', class: className = '' }: { size?: 'big' | 'small'; class?: string } =
    $props();
  const px = $derived(size === 'big' ? 192 : 40);
</script>

<img
  src="/img/avatar_elias.jpg"
  alt="Avatar Elias"
  width={px}
  height={px}
  class={[
    size === 'big'
      ? 'h-48 w-48 rounded-md'
      : 'h-10 w-10 rounded-full border-2 border-prime-600 dark:border-prime-400',
    className,
  ]}
/>
