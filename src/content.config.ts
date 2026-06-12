import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      categories: z.array(
        z.enum(['Product', 'Design', 'Development', 'Consulting', 'Review', 'Personal', 'Partnership', 'Tech'])
      ),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      wixUrl: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

const cityKey = z.string();

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    /** Outcome-led <title> for search/social; falls back to title. */
    seoTitle: z.string().optional(),
    summary: z.string(),
    tagline: z.string(),
    categories: z.array(z.enum(['AI', 'Products', 'Design', 'Partnerships', 'Fintech', 'OnePlus'])),
    role: z.string(),
    timeframe: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    /** One-line decision signal shown on project cards: "Chose X over Y because Z." */
    decision: z.string().optional(),
    art: z.string(),
    accent: z.string().optional(),
    externalUrl: z.string().url().optional(),
    relatedPosts: z.array(z.string()).default([]),
    order: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    geo: z
      .object({
        base: cityKey.optional(),
        hq: cityKey.optional(),
        locations: z.array(cityKey).default([]),
        reach: z.union([z.literal('worldwide'), z.array(z.string())]),
        users: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { posts, work };
