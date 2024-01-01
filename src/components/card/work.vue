<template>
  <Card :title="$t('home.work.title')" :icon="BriefcaseIcon">
    <Timeline
      :events="[
        {
          content: `eezi - Eine Einführung zum Informatikstudium`,
          time: `2020 - ${$t('home.education.today')}`,
        },
      ]"
    />
  </Card>
</template>

<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/outline';
</script>
