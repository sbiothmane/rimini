import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productSchema = z.object({
	title: z.string(),
	description: z.string(),
	priceFrom: z.number().optional(),
	currency: z.enum(['MAD']).default('MAD'),
	featured: z.boolean().default(false),
	materials: z.array(z.string()).default([]),
	care: z.string().optional(),
	provenance: z.string().optional(),
	thumbnail: z.string().optional(),
	gallery: z.array(z.string()).default([]),
	order: z.number().default(0),
});

const craftStepSchema = z.object({
	title: z.string(),
	description: z.string(),
	order: z.number(),
	image: z.string().optional(),
});

const testimonialSchema = z.object({
	author: z.string(),
	location: z.string().optional(),
	quote: z.string(),
	image: z.string().optional(),
	order: z.number().default(0),
});

export const collections = {
	products: defineCollection({
		loader: glob({ base: './src/content/products', pattern: '**/*.{md,mdx}' }),
		schema: productSchema,
	}),
	'craft-steps': defineCollection({
		loader: glob({ base: './src/content/craft-steps', pattern: '**/*.{md,mdx}' }),
		schema: craftStepSchema,
	}),
	testimonials: defineCollection({
		loader: glob({ base: './src/content/testimonials', pattern: '**/*.{md,mdx}' }),
		schema: testimonialSchema,
	}),
};
