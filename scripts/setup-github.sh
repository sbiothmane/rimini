#!/usr/bin/env bash
# Creates the GitHub repo and pushes main. Requires: gh auth login
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_NAME="${1:-rimini}"
VISIBILITY="${2:-public}"

git branch -M main
git add -A
git status

if git diff --staged --quiet; then
  echo "Nothing to commit."
else
  git commit -m "$(cat <<'EOF'
Set up artisan shoe marketing site with Astro 6.

French and Arabic routes, content collections, WhatsApp CTAs,
Decap CMS scaffold, and Cloudflare Pages deploy workflow.
EOF
)"
fi

if git remote get-url origin &>/dev/null; then
  echo "Remote origin already exists."
  git push -u origin main
else
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --push
fi

echo "Done. Add CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID to GitHub secrets for deploy."
