<template>
  <div
    class="shadow-second-800/5 ring-second-900/5 dark:bg-second-800/90 flex items-center gap-x-2 rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 backdrop-blur-sm transition dark:ring-white/10 dark:hover:ring-white/20"
  >
    <button
      v-for="lang in $i18n.availableLocales"
      @click="$i18n.setLocale(lang)"
      :class="{
        'text-second-400 group-hover:text-second-500': $i18n.locale !== lang,
        'text-second-900 dark:text-second-100 group-hover:text-second-500':
          $i18n.locale === lang,
      }"
    >
      <b>{{ lang.split('_')[0] }}</b>
    </button>
  </div>
</template>
