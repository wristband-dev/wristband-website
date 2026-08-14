import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['Auth', 'Engineering', 'Press']),
    pubDate: z.coerce.date(),
    author: z.string().default('Wristband Team'),
    coverImage: z.string(),
  }),
});

export const collections = { blog };
