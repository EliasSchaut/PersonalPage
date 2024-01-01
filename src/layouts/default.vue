<template>
  <Body class="bg-white dark:bg-gray-800" />
  <div class="bg-white dark:bg-gray-900 dark:text-white">
    <div class="flex justify-center">
      <LayoutNav />
    </div>
    <LayoutBanner />
    <slot />
    <LayoutFooter />
  </div>
</template>
