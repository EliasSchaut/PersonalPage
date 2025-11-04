import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

const commonSchema = z.object({});

export default defineContentConfig({
  collections: {
    content_de_DE: defineCollection({
      type: 'page',
      source: {
        include: 'de_DE/**/*.md',
        prefix: '',
      },
      schema: commonSchema,
    }),
    content_en_US: defineCollection({
      type: 'page',
      source: {
        include: 'en_US/**/*.md',
        prefix: '',
      },
      schema: commonSchema,
    }),
  },
});
