<template>
  <nav
    class="border-second-200 bg-second-100 dark:border-second-800 dark:bg-second-900 flex justify-between border-b-4 p-4"
  >
    <div class="top-5 left-5">
      <nuxt-link href="/" class="flex items-center gap-3">
        <AvatarSmall />
        <span
          class="to-prime-800 dark:to-prime-200 xs:inline hidden bg-gradient-to-r from-blue-800 bg-clip-text font-bold text-transparent select-none dark:from-blue-200"
        >
          Elias Schaut
        </span>
      </nuxt-link>
    </div>

    <div class="absolute left-1/2 -translate-x-1/2 transform">
      <LayoutNavMenu />
    </div>

    <div class="xs:flex top-5 right-5 hidden gap-4">
      <SettingLang />
      <SettingTheme />
    </div>
  </nav>
</template>
