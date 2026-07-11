import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content' }),
  schema: z.object({
    title: z.string(),
    part: z.string().optional(),
    section: z.string().optional(),
    guide: z.boolean().optional(),
    keywords: z.array(z.string()).optional(),
    difficulty: z.string().optional(),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = {
  content: contentCollection,
};
