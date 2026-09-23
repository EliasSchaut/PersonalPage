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
  import BriefcaseIcon from '~icons/heroicons/briefcase';
  import PaperAirplaneIcon from '~icons/heroicons/paper-airplane';

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

<div class="flex flex-col gap-y-8">
  <section id="intro" class="flex justify-between gap-x-6">
    <div class="flex flex-col gap-y-4">
      <h1 class="text-lg">{i18n.t('home.intro.hey')}</h1>
      <Avatar class="sm:hidden" />
      {#key i18n.locale}
        <Typewriter
          class="text-3xl font-semibold"
          strings={traits}
          initString={i18n.t('home.intro.my_name')}
          initDelay={2000}
          autostart
          loop
        />
      {/key}
      <p>{i18n.t('home.intro.jobs')}</p>
      <p class="w-full text-second-600 italic lg:w-2/3 dark:text-second-400">
        {i18n.t('home.intro.bio')}
      </p>
      <Socials class="gap-x-4" />
    </div>
    <Avatar class="hidden sm:block" />
  </section>

  <section id="tools" class="flex flex-col gap-y-2">
    <h2 class="text-lg">{i18n.t('home.skills.title')}</h2>
    <Tools />
  </section>

  <div class="flex w-full flex-col justify-between gap-8 md:flex-row">
    <section id="experiences" class="flex w-full flex-col gap-y-4">
      <Card title={i18n.t('home.experiences.title')}>
        {#snippet icon()}<BriefcaseIcon aria-hidden="true" />{/snippet}
        <div class="flex w-full flex-col gap-y-5">
          <ListTime {events} />
          <a
            class="w-full rounded-md bg-second-100 p-2 text-center hover:bg-second-200 dark:bg-second-800 dark:hover:bg-second-700"
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('home.experiences.cv')} ⬇
          </a>
        </div>
      </Card>
    </section>

    <section id="contact" class="flex w-full flex-col gap-y-4">
      <Card title={i18n.t('home.contact.title')}>
        {#snippet icon()}<PaperAirplaneIcon aria-hidden="true" />{/snippet}
        <Contact {form} />
      </Card>
    </section>
  </div>
</div>
<DonateModal bind:open={donateOpen} />
