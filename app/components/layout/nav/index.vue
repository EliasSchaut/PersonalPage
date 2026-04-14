<template>
  <nav
    class="border-second-200 bg-second-100 dark:border-second-800 dark:bg-second-900 flex w-full items-center justify-between border-b-4 p-4"
  >
    <div class="xs:inline top-5 left-5 hidden">
      <nuxt-link href="/" class="flex items-center gap-3">
        <AvatarSmall />
        <span
          class="to-prime-800 dark:to-prime-200 bg-linear-to-r from-blue-800 bg-clip-text font-bold text-transparent select-none dark:from-blue-200"
        >
          Elias Schaut
        </span>
      </nuxt-link>
    </div>

    <div class="xs:left-1/2 xs:absolute xs:-translate-x-1/2 xs:transform block">
      <LayoutNavMenu />
    </div>

    <div
      class="dark:bg-second-800/90 top-5 right-5 flex gap-3 rounded-full bg-white/90"
    >
      <SettingLang />
      <SettingTheme />
    </div>
  </nav>
</template>
