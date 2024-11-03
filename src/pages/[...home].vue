<template>
  <section id="intro" class="flex justify-between gap-x-6">
    <div class="flex flex-col gap-y-4">
      <h1 class="text-lg">Hey There! 🤟</h1>
      <AvatarBig class="sm:hidden" />
      <Typewriter
        class="text-3xl font-semibold"
        :strings="[
          '🔭 I love to learn new things',
          '🌱 I build apps to improve communities',
          '🔓 I love to code open source',
          '🤔 I\'m open to collaborate',
          '💬 I am full of creative ideas',
          '😄 I like to make people happy',
          '⚡ I am full of energy',
        ]"
        init_string="I'm Elias Lorenz Schaut"
        :init_delay="2000"
        autostart
        loop
      />
      <p>{{ $t('banner.desc') }}</p>
      <p class="w-full italic text-second-600 dark:text-second-400 md:w-96">
        It's my mission to spread positivity wherever I go! I'm constantly
        creating ways to enhance the fun and productivity of the communities I'm
        involved in.
      </p>
      <LayoutSocials class="gap-x-4" />
    </div>
    <AvatarBig class="hidden sm:block" />
  </section>

  <section id="tools" class="mt-8 flex flex-col gap-y-2">
    <h2 class="text-lg">🛠️ My Tools & Langs:</h2>
    <Tools class="flex flex-wrap gap-1" />
  </section>

  <section id="education" class="mt-8 flex flex-col gap-y-4">
    <h2 class="text-lg">🎓 My Education:</h2>
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
        class="bg-gradient-to-b from-prime-500 to-prime-600 bg-clip-text text-transparent dark:from-prime-200 dark:to-prime-300"
        >Journey</span
      >
    </h2>
    <CardWork />
  </section>
</template>
