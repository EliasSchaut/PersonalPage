<template>
  <Dropdown
    :compo="IconFlagDeFunc"
    :items="[
      {
        label: $t('common.lang.de'),
        callback: () => setLocale('de'),
        icon: IconFlagDeFunc,
      },
      {
        label: $t('common.lang.en'),
        callback: () => setLocale('en'),
        icon: IconFlagUkFunc,
      },
    ]"
  >
    <IconFlagDe
      v-if="$i18n.locale === 'de'"
      class="text-second-400 group-hover:text-second-500 h-5 w-5"
    />
    <IconFlagUk
      v-else
      class="text-second-400 group-hover:text-second-500 h-5 w-5"
    />
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IconFlagDe, IconFlagUk } from '#components';

export default defineComponent({
  name: 'SettingLang',
  methods: {
    IconFlagDeFunc: () => IconFlagDe,
    IconFlagUkFunc: () => IconFlagUk,
  },
  setup() {
    return {
      setLocale: useI18n().setLocale,
    };
  },
});
</script>
