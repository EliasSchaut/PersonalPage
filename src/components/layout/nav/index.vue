<template>
  <nav
    class="flex justify-between border border-b-4 border-second-200 bg-second-100 p-4 dark:border-second-800 dark:bg-second-900"
  >
    <div class="left-5 top-5">
      <nuxt-link href="/src/public" class="flex items-center gap-3">
        <AvatarSmall />
        <span
          class="hidden select-none bg-gradient-to-r from-blue-800 to-prime-800 bg-clip-text font-bold text-transparent dark:from-blue-200 dark:to-prime-200 xs:inline"
        >
          Elias Schaut
        </span>
      </nuxt-link>
    </div>

    <div class="absolute left-1/2 -translate-x-1/2 transform">
      <LayoutNavMenu />
    </div>

    <div class="right-5 top-5 hidden gap-4 xs:flex">
      <SettingLang />
      <SettingTheme />
    </div>
  </nav>
</template>
