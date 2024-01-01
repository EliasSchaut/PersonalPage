<template>
  <Body class="bg-white dark:bg-gray-800" />
  <div class="bg-white dark:bg-gray-900 dark:text-white">
    <div class="absolute left-5 top-5">
      <AvatarSmall />
    </div>

    <div class="flex items-center justify-center">
      <div class="absolute top-5">
        <LayoutNav />
      </div>
    </div>

    <div class="absolute right-5 top-5 flex gap-4">
      <SettingLang />
      <SettingTheme />
    </div>

    <div
      class="mx-auto w-1/2 max-w-3xl px-6 py-32 text-base leading-7 text-gray-700 lg:px-8 dark:text-gray-100"
    >
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>
<script setup lang="ts"></script>
