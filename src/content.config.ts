import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const showcaseCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/showcase' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    order: z.number(),
    challenge: z.string(),
    solution: z.string(),
    results: z.array(z.string()),
  }),
});

export const collections = {
  showcase: showcaseCollection,
};
