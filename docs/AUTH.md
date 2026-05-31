# Auth checklist (do these last)

GitHub is already set up: **https://github.com/sbiothmane/rimini**

## 1. Cloudflare (hosting)

```bash
# From the project root (wrangler is a local devDependency, not global):
npm run cf:login
# or: npx wrangler login
```

Then create the Pages project and first deploy:

```bash
npm run build
npx wrangler pages project create rimini --production-branch=main
npm run deploy
```

Production URL: **https://rimini-evz.pages.dev**

## 2. GitHub Actions secrets (auto-deploy on push)

Already set via CLI:

| Name | Status |
|------|--------|
| `CLOUDFLARE_ACCOUNT_ID` | Set (`cd5e57832d2a71bf300422b390267506`) |
| `PUBLIC_SITE_URL` | Variable → `https://rimini-evz.pages.dev` |
| `PUBLIC_WHATSAPP_NUMBER` | Variable → placeholder `212600000000` (update when you have the real number) |
| `PUBLIC_SHOP_NAME` | Variable → `Atelier Rimini` |

**You still need** `CLOUDFLARE_API_TOKEN` — Wrangler login cannot be used in CI.

Full step-by-step (with screenshots descriptions and minimal-permission option): **[docs/CLOUDFLARE_API_TOKEN.md](./CLOUDFLARE_API_TOKEN.md)**

Quick version:

1. [Create token — Edit Cloudflare Workers template](https://dash.cloudflare.com/profile/api-tokens/create?template=workers)
2. Create Token → copy value (shown once)
3. `gh secret set CLOUDFLARE_API_TOKEN -R sbiothmane/rimini`
4. Re-run the GitHub Actions workflow

Optional **Variables** (same settings page, Variables tab):

- `PUBLIC_WHATSAPP_NUMBER` — real number, e.g. `212612345678`
- `PUBLIC_SHOP_NAME`
- `PUBLIC_SITE_URL` — your Pages URL after first deploy

Re-run the failed workflow from the **Actions** tab after secrets are set.

## 3. Local `.env`

```bash
cp .env.example .env
# Edit WhatsApp number and shop name
```

## 4. Decap CMS (`/admin/`) — optional later

Requires Git Gateway or GitHub OAuth. See [DEPLOY.md](./DEPLOY.md#decap-cms-admin).
