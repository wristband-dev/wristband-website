import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['Auth', 'Engineering', 'Press']),
      pubDate: z.coerce.date(),
      author: z.string().default('Wristband Team'),
      /** Key in src/data/blog/authors.ts. Shows the author card at the end of the post. */
      authorId: z.string().optional(),
      /** Public URL of the cover, used for the share image and the blog index card. */
      coverImage: z.string(),
      /** Cover image file next to the post (e.g. './cover.jpg'). Optimized by Astro; shown at the top of the post. */
      cover: image().optional(),
    }),
});

export const collections = { blog };
