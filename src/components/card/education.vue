<template>
  <Card :title="$t('home.education.title')" :icon="AcademicCapIcon">
    <Timeline
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
          time: `2018 - ${$t('home.education.today')}`,
        },
      ]"
    />
  </Card>
</template>

<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/outline';
</script>
