import { getCollection } from 'astro:content';
import type { Locale } from '../config/site';

/** Product markdown files live under `src/content/products/{locale}/`. */
export async function getProducts(locale: Locale) {
	const all = await getCollection('products');
	return all
		.filter((entry) => entry.id.startsWith(`${locale}/`))
		.sort((a, b) => a.data.order - b.data.order);
}

export async function getProduct(locale: Locale, slug: string) {
	const products = await getProducts(locale);
	return products.find((p) => p.id === `${locale}/${slug}` || p.id.endsWith(`/${slug}`));
}

export function productSlug(entryId: string): string {
	const parts = entryId.split('/');
	return parts[parts.length - 1]!.replace(/\.mdx?$/, '');
}

export async function getCraftSteps() {
	const steps = await getCollection('craft-steps');
	return steps.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonials() {
	const items = await getCollection('testimonials');
	return items.sort((a, b) => a.data.order - b.data.order);
}
