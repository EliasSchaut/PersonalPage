<template>
  <Body class="bg-second-50 dark:bg-second-900" />

  <LayoutNav />
  <main
    class="dark:bg-second-950 bg-second-50 text-second-800 dark:text-second-200 w-full p-10"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
