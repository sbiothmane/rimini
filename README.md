# Rimini — artisan shoe workshop site

Static marketing site for a Moroccan artisan shoe atelier. Built with **Astro 6**, **Tailwind CSS 4**, bilingual **French / Arabic (RTL)**, optimized for mobile and **WhatsApp** conversion.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

- French: [http://localhost:4321/fr/](http://localhost:4321/fr/)
- Arabic: [http://localhost:4321/ar/](http://localhost:4321/ar/)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy to Cloudflare Pages |
| `npm run cf:login` | Log in to Cloudflare (Wrangler) |
| `npm run cf:whoami` | Check Cloudflare account |

Wrangler is installed **locally** in this repo — there is no global `wrangler` command unless you install it yourself. Use `npm run cf:login` or `npx wrangler login` from the project folder.

## Project structure

```text
src/
  components/     UI (header, WhatsApp CTA, product cards)
  config/         Site + env config
  content/        Markdown collections (products, craft, testimonials)
  i18n/           UI strings (fr / ar)
  layouts/        Base layout
  pages/          Routes (locale-prefixed)
public/
  admin/          Decap CMS (enable after auth setup)
docs/
  DEPLOY.md       Hosting + Cloudflare + GitHub setup
```

## Content

- **Products:** `src/content/products/fr/` and `src/content/products/ar/` (one file per model per language).
- **Craft steps:** `src/content/craft-steps/`
- **Media library:** `src/assets/media/` — see [docs/MEDIA.md](docs/MEDIA.md)
- **Import new AirDrop files:** `npm run media:import`

## Deployment

See [docs/DEPLOY.md](docs/DEPLOY.md) for Cloudflare Pages, GitHub Actions secrets, and `.ma` domain setup.
