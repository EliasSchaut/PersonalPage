<template>
  <Card :title="$t('home.bio.title')" :icon="IdentificationIcon">
    {{ $t('home.bio.body') }}
  </Card>
</template>

<script setup lang="ts">
import { IdentificationIcon } from '@heroicons/vue/24/outline';
</script>
