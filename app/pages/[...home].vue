<template>
  <div class="flex flex-col gap-y-8">
    <section id="intro" class="flex justify-between gap-x-6">
      <div class="flex flex-col gap-y-4">
        <h1 class="text-lg">{{ $t('home.intro.hey') }}</h1>
        <AvatarBig class="sm:hidden" />
        <Typewriter
          class="text-3xl font-semibold"
          :strings="[
            $t('home.intro.traits.0'),
            $t('home.intro.traits.1'),
            $t('home.intro.traits.2'),
            $t('home.intro.traits.3'),
            $t('home.intro.traits.4'),
            $t('home.intro.traits.5'),
            $t('home.intro.traits.6'),
          ]"
          :init_string="$t('home.intro.my_name')"
          :init_delay="2000"
          autostart
          loop
        />
        <p>{{ $t('home.intro.jobs') }}</p>
        <p class="text-second-600 dark:text-second-400 w-full italic lg:w-2/3">
          {{ $t('home.intro.bio') }}
        </p>
        <SocialLayout class="gap-x-4" />
      </div>
      <AvatarBig class="hidden sm:block" />
    </section>

    <section id="tools" class="flex flex-col gap-y-2">
      <h2 class="text-lg">{{ $t('home.skills.title') }}</h2>
      <Tools class="flex flex-wrap gap-1" />
    </section>

    <div class="flex w-full flex-col justify-between gap-8 md:flex-row">
      <section id="experiences" class="flex w-full flex-col gap-y-4">
        <Card :title="$t('home.experiences.title')" :icon="BriefcaseIcon">
          <div class="flex w-full flex-col gap-y-5">
            <ListTime
              :events="[
                {
                  content: $t('home.experiences.uni.content'),
                  organisation: $t('home.experiences.uni.organisation'),
                  time: `2018 - ${$t('common.today')}`,
                },
                {
                  content: $t('home.experiences.andrena.content'),
                  organisation: 'andrena objects ag',
                  time: `2025 - ${$t('common.today')}`,
                },
                {
                  content: $t('home.experiences.iss.content'),
                  organisation: $t('home.experiences.iss.organisation'),
                  time: '2021 - 2025',
                  past: true,
                },
              ]"
            />
            <a
              class="bg-second-100 dark:bg-second-800 hover:bg-second-200 dark:hover:bg-second-700 w-full rounded-md p-2 text-center"
              href="https://rxresu.me/elias.schaut/lebenslauf"
              target="_blank"
            >
              {{ $t('home.experiences.cv') }} ⬇
            </a>
          </div>
        </Card>
      </section>

      <section id="contact" class="flex w-full flex-col gap-y-4">
        <Card :title="$t('home.contact.title')" :icon="PaperAirplaneIcon">
          <Contact />
        </Card>
      </section>
    </div>
  </div>
  <ModalDonate ref="donate_modal" />
</template>

<script lang="ts">
import { BriefcaseIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  methods: { BriefcaseIcon, PaperAirplaneIcon },
  mounted() {
    if (this.$route.params.home && this.$route.params.home.includes('donate')) {
      this.$refs.donate_modal?.show();
    }
  },
});
</script>
