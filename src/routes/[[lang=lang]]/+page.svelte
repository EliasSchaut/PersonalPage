<script lang="ts">
  import { page } from '$app/state';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Typewriter from '$lib/components/Typewriter.svelte';
  import Socials from '$lib/components/social/Socials.svelte';
  import Tools from '$lib/components/Tools.svelte';
  import Card from '$lib/components/Card.svelte';
  import ListTime from '$lib/components/ListTime.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import DonateModal from '$lib/components/DonateModal.svelte';
  import { experiences, CV_URL } from '$lib/data/experiences';
  import { getI18n } from '$lib/i18n/context.svelte';
  import RocketLaunchIcon from '~icons/heroicons/rocket-launch';
  import ChatBubbleLeftIcon from '~icons/heroicons/chat-bubble-left';
  import WrenchScrewdriverIcon from '~icons/heroicons/wrench-screwdriver';
  import ArrowDownTrayIcon from '~icons/heroicons/arrow-down-tray';

  let { form } = $props();
  const i18n = getI18n();
  const tr = (s: string) => (s.includes('.') ? i18n.t(s) : s);

  let donateOpen = $derived(/\/donate$/.test(page.url.pathname));

  const traits = $derived(Array.from({ length: 7 }, (_, i) => i18n.t(`home.intro.traits.${i}`)));
  const events = $derived(
    experiences.map((e) => ({
      content: tr(e.content),
      organisation: tr(e.organisation),
      time: `${e.from} - ${e.to ?? i18n.t('common.today')}`,
      past: e.past,
    })),
  );
</script>

<SeoHead />

<div class="flex flex-col gap-y-14 sm:gap-y-16">
  <section
    id="intro"
    class="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:text-left"
  >
    <Avatar class="rise rise-1 sm:order-2" />
    <div class="flex min-w-0 flex-1 flex-col items-center gap-y-4 sm:items-start">
      <h1 class="text-grad rise rise-1 text-4xl font-extrabold tracking-tight sm:text-6xl">
        {i18n.t('home.intro.my_name')}
      </h1>
      {#key i18n.locale}
        <p
          class="rise rise-2 font-display text-xl font-semibold text-prime-600 sm:text-2xl dark:text-prime-300"
        >
          <Typewriter strings={traits} initString={traits[1]} initDelay={2000} autostart loop />
        </p>
      {/key}
      <p
        class="rise rise-3 text-[15px] font-semibold tracking-wide text-second-600 dark:text-second-300"
      >
        {i18n.t('home.intro.jobs')}
      </p>
      <p class="rise rise-4 max-w-xl text-lg leading-8 text-second-600 italic dark:text-second-300">
        {i18n.t('home.intro.bio')}
      </p>
      <Socials class="rise rise-5 justify-center sm:justify-start" />
    </div>
  </section>

  <section id="tools" class="flex flex-col gap-y-5">
    <h2 class="flex items-center gap-3 text-2xl font-extrabold text-second-900 dark:text-white">
      <span class="icon-tile"><WrenchScrewdriverIcon aria-hidden="true" /></span>
      <span>{i18n.t('home.skills.title')}</span>
    </h2>
    <Tools />
  </section>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <section id="experiences" class="flex">
      <Card title={i18n.t('home.experiences.title')} class="w-full">
        {#snippet icon()}<RocketLaunchIcon aria-hidden="true" />{/snippet}
        <div class="flex w-full flex-col gap-y-7">
          <ListTime {events} />
          <div>
            <a class="btn btn-ghost" href={CV_URL} target="_blank" rel="noopener noreferrer">
              {i18n.t('home.experiences.cv')}
              <ArrowDownTrayIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Card>
    </section>

    <section id="contact" class="flex">
      <Card title={i18n.t('home.contact.title')} class="w-full">
        {#snippet icon()}<ChatBubbleLeftIcon aria-hidden="true" />{/snippet}
        <Contact {form} />
      </Card>
    </section>
  </div>
</div>
<DonateModal bind:open={donateOpen} />
