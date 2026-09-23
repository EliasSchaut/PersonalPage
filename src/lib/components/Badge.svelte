<script lang="ts">
  let { content, href }: { content: string; href?: string } = $props();
  const external = $derived(!!href && /^https?:\/\//.test(href));
</script>

{#if href}
  <a
    class="badge relative z-10"
    {href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    {content}
  </a>
{:else}
  <span class="badge relative z-10">{content}</span>
{/if}
