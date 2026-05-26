# Deployment guide

## Stack

- **Framework:** Astro 6 (static output)
- **Hosting:** Cloudflare Pages (via Wrangler)
- **Repo:** GitHub

## Local development

```bash
cp .env.example .env
# Edit .env with WhatsApp number, shop name, site URL

npm install
npm run dev
```

Open [http://localhost:4321/fr/](http://localhost:4321/fr/).

## Environment variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SITE_URL` | Canonical URL (sitemap, OG tags) |
| `PUBLIC_WHATSAPP_NUMBER` | International format without `+` |
| `PUBLIC_SHOP_NAME` | Brand name in header/footer |
| `PUBLIC_SHOP_CITY` | Optional city on contact page |
| `PUBLIC_INSTAGRAM_URL` | Optional |
| `PUBLIC_FACEBOOK_URL` | Optional |

Set the same values as **GitHub repository variables** (Settings → Secrets and variables → Actions → Variables) for CI builds.

## GitHub repository

If not created yet:

```bash
gh repo create rimini --public --source=. --remote=origin --push
```

Or private: add `--private`.

Default branch should be `main` (rename from `master` if needed):

```bash
git branch -M main
```

## Cloudflare Pages (one-time setup)

You need a Cloudflare account. Auth at the end:

```bash
npx wrangler login
```

### Option A — GitHub Actions (recommended, already configured)

1. Create a Cloudflare API token: Dashboard → My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** template (includes Pages).
2. Copy your **Account ID** from the Cloudflare dashboard URL or Workers overview.
3. Add GitHub secrets on the repo:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Create the Pages project (first deploy):

```bash
npm run build
npx wrangler pages project create rimini --production-branch=main
npx wrangler pages deploy dist --project-name=rimini
```

5. Push to `main` — the workflow in `.github/workflows/deploy.yml` deploys automatically.

### Option B — Cloudflare dashboard Git integration

1. Workers & Pages → Create → Pages → Connect to Git.
2. Select this repository.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22
4. Add environment variables matching `.env.example`.

## Custom domain (.ma)

1. In Cloudflare Pages → your project → Custom domains → add `www.yourshop.ma`.
2. At your `.ma` registrar, point DNS to Cloudflare (nameservers or CNAME as instructed).
3. Update `PUBLIC_SITE_URL` and `public/robots.txt` sitemap URL.

## Decap CMS (`/admin/`)

Content editor for products and craft steps. Requires Git-backed auth:

1. Deploy the site first.
2. Enable **Netlify Identity + Git Gateway** on Cloudflare, or use [Decap CMS with GitHub backend](https://decapcms.org/docs/github-backend/) (OAuth app).
3. For local editing: `npx decap-server` and set `local_backend: true` in `public/admin/config.yml`.

Until auth is configured, add content by editing markdown in `src/content/` or uploading images to `src/assets/uploads/`.

## Manual deploy CLI

```bash
npm run deploy
```

Requires `wrangler login` and an existing Pages project named `rimini`.
