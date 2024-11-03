<template>
  <Body
    class="bg-second-50 font-nunito selection:bg-prime-100 dark:bg-second-950 dark:selection:bg-prime-900"
  />

  <LayoutNav />
  <main
    class="mx-auto w-full bg-second-50 px-6 py-32 font-sans text-base leading-7 text-second-800 dark:bg-second-950 dark:text-second-200 md:w-3/4 lg:w-2/3 lg:px-8 xl:w-1/2"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
