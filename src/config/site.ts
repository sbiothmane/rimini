export const locales = ['fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const site = {
	name: import.meta.env.PUBLIC_SHOP_NAME ?? 'Atelier Rimini',
	url: import.meta.env.PUBLIC_SITE_URL ?? 'https://rimini.pages.dev',
	whatsapp: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '212600000000',
	city: import.meta.env.PUBLIC_SHOP_CITY ?? '',
	instagram: import.meta.env.PUBLIC_INSTAGRAM_URL ?? '',
	facebook: import.meta.env.PUBLIC_FACEBOOK_URL ?? '',
} as const;

export function whatsappUrl(message: string): string {
	return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function localePath(locale: Locale, path = ''): string {
	const segment = path.startsWith('/') ? path : `/${path}`;
	return `/${locale}${segment === '/' ? '/' : segment}`;
}

export function isRtl(locale: Locale): boolean {
	return locale === 'ar';
}
