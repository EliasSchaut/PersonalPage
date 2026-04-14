<template>
  <button
    class="shadow-second-800/5 ring-second-900/5 dark:bg-second-800/90 flex items-center rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 backdrop-blur-sm transition dark:ring-white/10 dark:hover:ring-white/20"
    @click="settings.toggleTheme"
  >
    <SunIcon
      v-if="settings.theme === 'light'"
      class="text-second-900 group-hover:text-second-500 dark:text-second-100 h-6 w-6"
      aria-hidden="true"
    />
    <MoonIcon
      v-else-if="settings.theme === 'dark'"
      class="text-second-900 group-hover:text-second-500 dark:text-second-100 h-6 w-6"
      aria-hidden="true"
    />
    <ComputerDesktopIcon
      v-else
      class="text-second-900 group-hover:text-second-500 dark:text-second-100 h-6 w-6"
      aria-hidden="true"
    />
  </button>
</template>

<script lang="ts">
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/24/outline';
import { settingsStore } from '~/store/settings';

export default defineComponent({
  name: 'SettingTheme',
  methods: { ComputerDesktopIcon, MoonIcon, SunIcon },
  components: {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
  },
  setup() {
    return {
      settings: settingsStore(),
    };
  },
});
</script>
