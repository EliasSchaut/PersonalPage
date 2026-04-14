<template>
  <Card :title="$t('home.work.title')" :icon="BriefcaseIcon">
    <ListChecks
      :events="[
        {
          content: $t('home.work.event.kit_gamejam'),
          subcontent: $t('home.work.event.kit_gamejam_desc'),
          time: `2024 - ${$t('common.today')}`,
        },
        {
          content: $t('home.work.event.level42'),
          subcontent: $t('home.work.event.level42_desc'),
          time: `2024 - ${$t('common.today')}`,
        },
        {
          content: 'eezi - Eine Einführung zum Informatikstudium',
          subcontent: $t('home.work.event.eezi_desc'),
          time: `2021 - 2025`,
        },
        {
          content: $t('home.work.event.hadiko_vev'),
          subcontent: $t('home.work.event.hadiko_vev_desc'),
          time: `2020 - ${$t('common.today')}`,
        },
        {
          content: 'HaDiKo e.V.',
          subcontent: $t('home.work.event.hadiko_ev_desc'),
          time: `2020 - ${$t('common.today')}`,
        },
        {
          content: $t('home.work.event.lila_pause'),
          subcontent: $t('home.work.event.lila_pause_desc'),
          time: `2018 - 2024`,
        },
        {
          content: 'Akk - Arbeitskreis Kultur und Kommunikation',
          subcontent: $t('home.work.event.akk_desc'),
          time: `2018 - 2024`,
        },
        {
          content: $t('home.work.event.fsmi'),
          subcontent: $t('home.work.event.fsmi_desc'),
          time: '2018 - 2020',
        },
        {
          content: $t('home.work.event.mannheim'),
          subcontent: $t('home.work.event.mannheim_desc'),
          time: '2014 - 2018',
        },
        {
          content: $t('home.work.event.moll'),
          subcontent: $t('home.work.event.moll_desc'),
          time: '2010 - 2018',
        },
      ]"
    />
  </Card>
</template>

<script setup lang="ts">
import { BriefcaseIcon } from '@heroicons/vue/24/outline';
</script>
