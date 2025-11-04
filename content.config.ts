import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content_de: defineCollection({
      type: 'page',
      source: '~/app/content/de/**/*.md',
    }),
    content_en: defineCollection({
      type: 'page',
      source: '~/app/content/en/**/*.md',
    }),
  },
});
