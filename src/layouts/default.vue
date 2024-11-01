<template>
  <Body class="bg-white dark:bg-second-800" />

  <nav class="flex p-4 justify-between bg-second-100 dark:bg-second-900 sm:bg-second-200 sm:dark:bg-second-800">
    <div class="left-5 top-5 hidden sm:inline">
      <nuxt-link href="/">
        <AvatarSmall />
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
    class="dark:bg-second-900 bg-white text-second-800 dark:text-second-200 w-full px-6 py-32"
  >
    <slot />
  </main>
  <LayoutFooter />
</template>
