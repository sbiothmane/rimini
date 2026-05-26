// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site =
	process.env.PUBLIC_SITE_URL ?? 'https://rimini.pages.dev';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
	site,
	output: 'static',
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'ar'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'fr',
				locales: {
					fr: 'fr-MA',
					ar: 'ar-MA',
				},
			},
		}),
	],
	image: {
		layout: 'constrained',
	},
});
