# Auth checklist (do these last)

GitHub is already set up: **https://github.com/sbiothmane/rimini**

## 1. Cloudflare (hosting)

```bash
npx wrangler login
```

Then create the Pages project and first deploy:

```bash
npm run build
npx wrangler pages project create rimini --production-branch=main
npm run deploy
```

Your preview URL will look like `https://rimini.pages.dev` (or similar).

## 2. GitHub Actions secrets (auto-deploy on push)

In the repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Where to get it |
|--------|-----------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create → **Edit Cloudflare Workers** template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard URL (`dash.cloudflare.com/<account_id>/...`) or Workers overview |

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
