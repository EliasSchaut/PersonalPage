import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const articleSchema = z.object({
  date: z.string().date().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  published: z.boolean().default(false),
});

export default defineContentConfig({
  collections: {
    content_de_DE: defineCollection({
      type: 'page',
      source: {
        include: 'de_DE/**/*.md',
        prefix: '',
      },
      schema: articleSchema,
    }),
    content_en_US: defineCollection({
      type: 'page',
      source: {
        include: 'en_US/**/*.md',
        prefix: '',
      },
      schema: articleSchema,
    }),
  },
});
