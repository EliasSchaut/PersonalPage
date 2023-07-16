<template>
  <LayoutBanner />
  <ul
    role="list"
    class="mx-4 mt-7 grid grid-cols-1 gap-x-6 gap-y-8 pb-8 sm:mx-6 lg:grid-cols-2 xl:mx-8 xl:gap-x-8"
  >
    <ElementCard title="Bio" :icon="IdentificationIcon">
      Hey, I’m Elias and I would describe myself as a social optimist. It's my
      mission to spread positivity wherever I go, which is precisely why I'm a
      regular face at various social gatherings. As a passionate web and bot
      developer, I'm constantly creating ways to enhance the fun and
      productivity of the communities I'm involved in.
    </ElementCard>
    <ElementCard title="Bildungsweg" :icon="AcademicCapIcon">
      <ElementTimeline :events="graduation_timeline" />
    </ElementCard>
    <ElementCard title="Projects" :icon="CodeBracketIcon"></ElementCard>
  </ul>
</template>

<script setup lang="ts">
import {
  IdentificationIcon,
  AcademicCapIcon,
  CodeBracketIcon,
} from '@heroicons/vue/24/outline';

const graduation_timeline = [
  {
    content: 'Grundschule Jahn- und Schillerschule Brühl',
    time: '2006 - 2010',
  },
  {
    content: 'Abitur Moll Gymnasium Mannheim',
    time: '2010 - 2018',
  },
  {
    content: 'Informatik B.Sc. KIT Karlsruhe',
    time: '2018 - heute',
  },
];
</script>
