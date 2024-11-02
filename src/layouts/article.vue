<template>
  <Body class="font-nunito bg-second-50 dark:bg-second-950" />

  <LayoutNav />
  <main
    class="font-sans mx-auto w-full dark:bg-second-950 bg-second-50 px-6 py-32 text-base leading-7 text-second-800 dark:text-second-200 md:w-3/4 lg:w-2/3 lg:px-8 xl:w-1/2"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
