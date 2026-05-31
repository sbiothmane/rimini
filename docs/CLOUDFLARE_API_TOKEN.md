# Create a Cloudflare API token for GitHub Actions

Wrangler login (`npm run cf:login`) **cannot** be used in GitHub CI. You need a separate **API token** that stays valid until you revoke it.

Cloudflare does not allow creating API tokens via the Wrangler OAuth session — you must create one in the dashboard (about 2 minutes).

## Option A — Recommended (one click template)

1. Open this link while logged into Cloudflare as **sbi.othmane@gmail.com**:
   - [Create token — “Edit Cloudflare Workers” template](https://dash.cloudflare.com/profile/api-tokens/create?template=workers)

2. **Account resources**
   - Leave **Include** → **All accounts** (or pick your account: *Sbi.othmane@gmail.com's Account*).

3. **Zone resources** (if shown)
   - Default is fine for Pages deploy.

4. Click **Continue to summary** → **Create Token**.

5. **Copy the token immediately** — Cloudflare shows it only once. It looks like a long random string (not your email).

6. Add it to GitHub (choose one):

   **Terminal (recommended):**
   ```bash
   cd /path/to/rimini
   gh secret set CLOUDFLARE_API_TOKEN -R sbiothmane/rimini
   ```
   Paste the token when prompted (input is hidden).

   **Or in the browser:**
   - https://github.com/sbiothmane/rimini/settings/secrets/actions
   - **New repository secret**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: paste token → **Add secret**

7. Confirm secrets:
   ```bash
   gh secret list -R sbiothmane/rimini
   ```
   You should see:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`

8. Re-run deploy:
   - https://github.com/sbiothmane/rimini/actions
   - Open the latest **Deploy to Cloudflare Pages** workflow → **Re-run all jobs**

---

## Option B — Custom token (minimal permissions)

Use this if you prefer the smallest scope.

1. Open: https://dash.cloudflare.com/profile/api-tokens
2. **Create Token** → **Create Custom Token**
3. **Token name:** `rimini-github-actions`
4. **Permissions** — add these rows:

   | Type | Permission | Access |
   |------|------------|--------|
   | Account | Cloudflare Pages | Edit |
   | Account | Account Settings | Read |

5. **Account resources:** your account only.
6. **Create Token** → copy the value once.
7. Add to GitHub as `CLOUDFLARE_API_TOKEN` (same as step 6 in Option A).

---

## Already configured on GitHub (do not duplicate)

| Name | Purpose |
|------|---------|
| `CLOUDFLARE_ACCOUNT_ID` | `cd5e57832d2a71bf300422b390267506` |
| `PUBLIC_SITE_URL` | `https://rimini-evz.pages.dev` |
| `PUBLIC_WHATSAPP_NUMBER` | Update when you have the real number |
| `PUBLIC_SHOP_NAME` | `Atelier Rimini` |

---

## Troubleshooting

| Error in GitHub Actions | Fix |
|-------------------------|-----|
| `Authentication error` / `10000` | Token wrong or expired — create a new token |
| `Project not found` | Run `npm run deploy` once locally, or create project `rimini` in Cloudflare Pages |
| Secret not found | Name must be exactly `CLOUDFLARE_API_TOKEN` (case-sensitive) |

## Security

- Never commit the token to git or paste it in chat.
- Revoke old tokens: https://dash.cloudflare.com/profile/api-tokens
