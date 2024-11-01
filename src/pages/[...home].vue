<template>
  <section id="intro" class="flex justify-between">
    <div class="flex flex-col gap-y-4">

      <h2 class="text-lg">Hey There! 🤟</h2>
      <h3 id="typewriter" class="text-3xl font-semibold">I'm Elias Lorenz Schaut</h3>
      <h4>{{ $t('banner.desc') }}</h4>
      <p class="italic w-96 dark:text-second-400">
        It's my mission to spread positivity wherever I go!
        I'm constantly creating ways to enhance the
        fun and productivity of the communities I'm involved in.
      </p>
      <LayoutSocials />
    </div>
    <AvatarBig class="ml-8" />
  </section>

  <ul
    role="list"
    class="mx-4 mt-7 grid grid-cols-1 gap-x-6 gap-y-8 pb-8 sm:mx-6 lg:grid-cols-2 xl:mx-8 xl:gap-x-8"
  >
    <CardBio />
    <CardEducation />
    <CardSkills />
    <CardWork />
  </ul>
</template>

<script lang="ts">
import Typewriter from 'typewriter-effect/dist/core';

export default defineComponent({
  mounted() {
    setTimeout(() => {
      new Typewriter('#typewriter', {
        strings: [
          '🔭 I love to learn new things',
          '🌱 I build apps to improve communities',
          '🔓 I love to code open source',
          '🤔 I\'m open to collaborate',
          '💬 I am full of creative ideas',
          '😄 I like to make people happy',
          '⚡ I am full of energy',
        ],
        autoStart: true,
        loop: true,
        stringSplitter: (string: string) => {
          return [...string];
        },
      });
    }, 2000);
  },
});
</script>