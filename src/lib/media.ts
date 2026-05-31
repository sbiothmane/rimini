import type { ImageMetadata } from 'astro';

const webpModules = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/media/**/*.webp',
	{ eager: true },
);

/** Resolve `media/products/foo.webp` to an Astro image import. */
export function resolveMedia(path?: string): ImageMetadata | undefined {
	if (!path) return undefined;
	const normalized = path.startsWith('media/') ? path : `media/${path}`;
	const key = `/src/assets/${normalized}`;
	return webpModules[key]?.default;
}

export function mediaSrc(path?: string): string | undefined {
	const img = resolveMedia(path);
	return img?.src;
}
