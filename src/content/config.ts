import { defineCollection, z } from 'astro:content';

const showcaseCollection = defineCollection({
  type: 'content',
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