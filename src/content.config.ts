import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    price_from: z.string(),
    duration: z.string(),
    scope: z.string(),
    order: z.number(),
    callout: z
      .object({ quote: z.string(), sub: z.string().optional() })
      .optional(),
    who_for: z.array(z.string()),
    who_not_for: z.array(z.string()),
    what_you_get: z.array(
      z.object({
        label: z.string().optional(),
        description: z.string(),
        sub_items: z.array(z.string()).optional(),
      })
    ),
    outcomes: z.array(z.string()),
    steps: z.array(z.object({ label: z.string(), description: z.string() })),
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string().optional(),
        note: z.string().optional(),
      })
    ),
    tiers_note: z.string().optional(),
    named_products: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          setup: z.string(),
          monthly: z.string(),
        })
      )
      .optional(),
    named_products_note: z.string().optional(),
    tools: z.array(z.string()),
    cta_label: z.string().default('Book a discovery call'),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    summary: z.string(),
    order: z.number(),
    context: z.string(),
    problem: z.string(),
    what_i_did: z.array(z.string()),
    outcome: z.array(z.string()),
    tools: z.array(z.string()),
    tags: z.array(z.string()),
    related_services: z.array(z.string()),
  }),
});

export const collections = { services, cases };
