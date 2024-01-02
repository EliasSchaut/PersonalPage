<template>
  <Body class="bg-white dark:bg-gray-800" />
  <div class="bg-white dark:bg-gray-900 dark:text-white">
    <div class="flex items-center justify-center">
      <div class="absolute top-5">
        <LayoutNav />
      </div>
    </div>
    <LayoutBanner />
    <main>
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
