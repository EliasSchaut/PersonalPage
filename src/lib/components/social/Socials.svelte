<script lang="ts">
  import { socials } from '$lib/data/socials';
  import EnvelopeIcon from '~icons/heroicons/envelope-solid';
  import GitHubIcon from '~icons/simple-icons/github';
  import ItchIoIcon from '~icons/simple-icons/itchdotio';
  import DiscordIcon from '~icons/simple-icons/discord';
  import SteamIcon from '~icons/simple-icons/steam';

  let { class: className = '' }: { class?: string } = $props();
</script>

<div class={['flex items-center', className]}>
  {#each socials as social (social.name)}
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      class="flex h-6 w-6 items-center justify-center text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400 [&>svg]:h-5 [&>svg]:w-5"
    >
      <span class="sr-only">{social.name}</span>
      {#if social.icon === 'mail'}<EnvelopeIcon aria-hidden="true" />
      {:else if social.icon === 'github'}<GitHubIcon aria-hidden="true" />
      {:else if social.icon === 'itchio'}<ItchIoIcon aria-hidden="true" />
      {:else if social.icon === 'discord'}<DiscordIcon aria-hidden="true" />
      {:else}<SteamIcon aria-hidden="true" />{/if}
    </a>
  {/each}
</div>
