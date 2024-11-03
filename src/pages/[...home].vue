<template>
  <section id="intro" class="flex justify-between gap-x-6">
    <div class="flex flex-col gap-y-4">
      <h1 class="text-lg">{{ $t('home.intro.hey') }}</h1>
      <AvatarBig class="sm:hidden" />
      <Typewriter
        class="text-3xl font-semibold"
        :strings="[
          $t('home.intro.traits.0'),
          $t('home.intro.traits.1'),
          $t('home.intro.traits.2'),
          $t('home.intro.traits.3'),
          $t('home.intro.traits.4'),
          $t('home.intro.traits.5'),
          $t('home.intro.traits.6'),
        ]"
        :init_string="$t('home.intro.my_name')"
        :init_delay="2000"
        autostart
        loop
      />
      <p>{{ $t('home.intro.jobs') }}</p>
      <p class="w-full italic text-second-600 dark:text-second-400 lg:w-2/3">
        {{ $t('home.intro.bio') }}
      </p>
      <LayoutSocials class="gap-x-4" />
    </div>
    <AvatarBig class="hidden sm:block" />
  </section>

  <section id="tools" class="mt-8 flex flex-col gap-y-2">
    <h2 class="text-lg">{{ $t('home.skills.title') }}</h2>
    <Tools class="flex flex-wrap gap-1" />
  </section>

  <section id="education" class="mt-8 flex flex-col gap-y-4">
    <h2 class="text-lg">{{ $t('home.education.title') }}</h2>
    <ListTime
      :events="[
        {
          content: `${$t(
            'home.education.school.computer_science',
          )} M.Sc. KIT Karlsruhe`,
          time: `2024 - ${$t('home.education.today')}`,
        },
        {
          content: `${$t(
            'home.education.school.computer_science',
          )} B.Sc. KIT Karlsruhe`,
          time: `2018 - 2024`,
        },
        {
          content: `${$t(
            'home.education.school.a_levels',
          )} Moll Gymnasium Mannheim`,
          time: '2010 - 2018',
        },
        {
          content: `${$t('home.education.school.elementary')} Jahn- ${$t(
            'common.and',
          )} Schillerschule Brühl`,
          time: '2006 - 2010',
        },
      ]"
    />
  </section>

  <section id="journey" class="mt-10 flex flex-col gap-y-4 sm:mx-6 xl:mx-8">
    <h2 class="space-x-2 text-center text-3xl font-semibold">
      <span>🗺️</span
      ><span
        class="select-none bg-gradient-to-b from-prime-500 to-prime-600 bg-clip-text text-transparent dark:from-prime-200 dark:to-prime-300"
        >{{ $t('home.journey') }}</span
      >
    </h2>
    <CardWork />
  </section>

  <ModalDonate ref="donate_modal" />
</template>

<script lang="ts">
export default defineComponent({
  mounted() {
    if (this.$route.params.home && this.$route.params.home.includes('donate')) {
      this.$refs.donate_modal?.show();
    }
  },
});
</script>
