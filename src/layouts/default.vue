<template>
  <Body class="bg-second-50 dark:bg-second-900" />

  <nav class="flex p-4 justify-between border border-b-4 border-second-200 dark:border-second-800 bg-second-100 sm:dark:bg-second-900">
    <div class="left-5 top-5">
      <nuxt-link href="/" class="flex gap-3 items-center">
        <AvatarSmall />
        <span class="bg-gradient-to-r bg-clip-text from-blue-800 dark:from-blue-200 to-prime-800 dark:to-prime-200 text-transparent font-bold">Elias Schaut</span>
      </nuxt-link>
    </div>

    <div class="absolute left-1/2 transform -translate-x-1/2">
        <LayoutNav />
    </div>

    <div class="right-5 top-5 hidden gap-4 sm:flex">
      <SettingLang />
      <SettingTheme />
    </div>
  </nav>

  <main
    class="dark:bg-second-950 bg-second-50 text-second-800 dark:text-second-200 w-full p-10"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
