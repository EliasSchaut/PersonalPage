<template>
  <Body
    class="bg-second-50 font-nunito selection:bg-prime-100 dark:bg-second-900 dark:selection:bg-prime-900"
  />

  <LayoutNav />
  <main
    class="w-full bg-second-50 p-10 text-second-800 dark:bg-second-950 dark:text-second-200"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
