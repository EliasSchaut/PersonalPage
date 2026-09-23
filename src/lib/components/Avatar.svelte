<script lang="ts">
  let { size = 'big', class: className = '' }: { size?: 'big' | 'small'; class?: string } =
    $props();
  const px = $derived(size === 'big' ? 240 : 40);
</script>

<img
  src="/img/avatar_elias.jpg"
  alt="Avatar Elias"
  width={px}
  height={px}
  class={[
    size === 'big'
      ? 'avatar-glow h-44 w-44 rounded-[36px] object-cover sm:h-60 sm:w-60'
      : 'h-10 w-10 rounded-full border-2 border-prime-500 object-cover dark:border-prime-400',
    className,
  ]}
/>
