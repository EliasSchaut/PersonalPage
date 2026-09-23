import type { Locale } from '$lib/i18n';
import type { ThemePreference } from '$lib/theme.svelte';

declare global {
  namespace App {
    interface Locals {
      locale: Locale;
      theme: ThemePreference;
    }
    interface PageData {
      locale: Locale;
      theme: ThemePreference;
    }
    // interface Error {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
