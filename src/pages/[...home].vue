<template>
  <section id="intro" class="flex gap-x-6 justify-between">
    <div class="flex flex-col gap-y-4">

      <h2 class="text-lg">Hey There! 🤟</h2>
      <AvatarBig class="sm:hidden" />
      <Typewriter class="text-3xl font-semibold"
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
      <h4>{{ $t('banner.desc') }}</h4>
      <p class="italic w-full md:w-96 text-second-600 dark:text-second-400">
        It's my mission to spread positivity wherever I go!
        I'm constantly creating ways to enhance the
        fun and productivity of the communities I'm involved in.
      </p>
      <LayoutSocials />
    </div>
    <AvatarBig class="hidden sm:block" />
  </section>

  <section id="tools" class="mt-8 flex flex-col gap-y-2">
    <h1 class="text-lg">🛠️ My Tools & Langs:</h1>
    <Tools class="flex flex-wrap gap-1" />
  </section>

  <section id="education" class="mt-8 flex flex-col gap-y-4">
    <h1 class="text-lg">🎓 My Education:</h1>
    <ListTime
      :events="[
        {
          content: `${$t('home.education.school.elementary')} Jahn- ${$t(
            'common.and',
          )} Schillerschule Brühl`,
          time: '2006 - 2010',
        },
        {
          content: `${$t(
            'home.education.school.a_levels',
          )} Moll Gymnasium Mannheim`,
          time: '2010 - 2018',
        },
        {
          content: `${$t(
            'home.education.school.computer_science',
          )} B.Sc. KIT Karlsruhe`,
          time: `2018 - 2024`,
        },
        {
          content: `${$t(
            'home.education.school.computer_science',
          )} M.Sc. KIT Karlsruhe`,
          time: `2024 - ${$t('home.education.today')}`,
        },
      ]"
    />
  </section>

  <ul
    role="list"
    class="mx-4 mt-7 grid grid-cols-1 gap-x-6 gap-y-8 pb-8 sm:mx-6 lg:grid-cols-2 xl:mx-8 xl:gap-x-8"
  >
    <CardWork />
  </ul>
</template>
<script setup lang="ts">
</script>