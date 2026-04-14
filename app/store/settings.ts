export const settingsStore = defineStore('settings', {
  state: (): SettingsType => {
    const theme = useColorMode();
    return {
      theme: (theme.preference as SettingsType['theme']) || 'system',
    };
  },
  actions: {
    setTheme(theme: SettingsType['theme']) {
      this.theme = theme;
      useColorMode().preference = theme;
    },
    toggleTheme() {
      if (this.theme === 'light') this.setTheme('dark');
      else if (this.theme === 'dark') this.setTheme('system');
      else this.setTheme('light');
    },
  },
  persist: true,
});

class SettingsType {
  theme!: 'light' | 'dark' | 'system';
}
