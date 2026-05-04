<template>
  <NuxtLink
    class="group hover:bg-second-100 dark:hover:bg-second-900 flex flex-col items-center justify-start gap-6 rounded-2xl p-5 sm:flex-row"
    :href="href"
  >
    <NuxtImg
      class="rounded-md transition-transform duration-300 group-hover:scale-105"
      height="128"
      width="128"
      v-if="cover"
      :src="cover"
      :alt="`${title} cover`"
    />
    <div class="flex max-w-xl flex-col items-start justify-between">
      <div class="flex items-center gap-x-4 text-xs">
        <time v-if="date" :datetime="date" class="text-second-500 dark:text-second-400"
          >{{ formattedDate }}
        </time>
        <div class="flex flex-1 justify-end gap-1">
          <BadgeSimple
            v-for="tag in tags"
            :key="tag"
            :content="tag"
            :href="'/articles?tag=' + tag"
          />
        </div>
      </div>
      <div>
        <h3
          class="text-second-900 mt-3 text-lg leading-6 font-semibold group-hover:underline dark:text-white"
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="text-second-600 dark:text-second-100 mt-5 line-clamp-3 text-sm leading-6"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    href: string;
    description?: string;
    cover?: string;
    date?: string;
    tags?: string[];
  }>(),
  {
    description: '',
    cover: '',
    date: '',
    tags: () => [],
  },
);

const { locale } = useI18n();

const formattedDate = computed(() => {
  if (!props.date) return '';
  const d = new Date(props.date);
  if (Number.isNaN(d.getTime())) return props.date;
  return new Intl.DateTimeFormat(locale.value.replace('_', '-'), {
    dateStyle: 'long',
  }).format(d);
});
</script>
