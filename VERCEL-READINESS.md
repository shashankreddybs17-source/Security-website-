# Vercel readiness audit

Audit date: 3 November 2026. No deployment was published or modified.

## Result

Local deployment checks pass. No guarantee about the live Vercel environment is made: browser interaction, console/network checks and device tests on the deployed URL remain necessary. Browser automation was unavailable during the audit.

## Changes made

- `src/styles/app.css`: disable Tailwind automatic scanning and retain the existing explicit application source glob. A fresh install initially emitted extra utilities; this change makes output independent of checkout contents. No palette, typography, component layout or image changes.
- `scripts/audit-production.mjs`: repeatable checks for exact-case imports and asset paths, public assets copied into dist, local-only URLs, lockfile dependency consistency, production entry point, SPA rewrite and optional HTTP route/asset checks.
- `package.json`: add `npm run check:deploy` (scroll regression tests, production build, asset/config audit).
- `vercel.json`: run `npm run check:deploy` during deployment. Existing Vite preset, npm ci install, dist output and SPA rewrite retained.

## Checks actually completed

- Isolated `npm ci --no-audit --no-fund` using the committed lockfile and Node 24, in a separate workspace folder; 80 packages installed.
- Working and isolated `npm run check:deploy` both passed.
- All production output files are byte-identical between those builds.
- 13 deterministic scroll-controller regression tests passed. These simulate input; they are not physical mouse/touchpad browser tests.
- 70 source files checked for exact import casing for Linux compatibility. Builds themselves ran on Windows, not Linux.
- 60 existing asset references and the complete public asset tree verified in production output.
- 22 direct route URLs (including all service queries and blog article URLs) plus 60 assets returned HTTP 200 with appropriate content types from the local Vite production preview. HTTP tests do not execute React or prove Vercel edge routing.
- Service landing/detail render checks, company-statistics render/count-up checks and About training render/placement checks passed.
- Changed audit/config/CSS files pass Prettier.

## Deployment settings

Root Directory: the directory containing package.json.
Framework: Vite.
Node: 24.x.
Install: npm ci.
Build: npm run check:deploy.
Output: dist.
No environment variables are required by the current frontend.

Vercel project-level overrides should match these settings. Commit all intended modified and untracked source files, service assets, tests and scripts. Do not commit node_modules, tmp or dist. Many new website files are currently untracked and must be included in the user's commit. No staging or commit was performed by this audit.

## Existing functional limits

- Contact enquiries use mailto and a downloadable draft. They require the visitor's email application; there is no server-side mail delivery.
- Newsletter signup is intentionally disconnected and shows a preview notice.
- Blog articles retain existing draft/demo labels.
- External map/provider availability depends on the visitor's network.
- The requested Our Credentials section remains pending the original certificate photograph; this is not a deployment failure.

## Repeat checks

```sh
npm ci
npm run check:deploy
npm run preview -- --host 127.0.0.1 --port 4173
# In a second terminal:
node scripts/audit-production.mjs http://127.0.0.1:4173
```

After deploying, refresh each main page and a service/blog deep link on the actual Vercel URL. Check desktop/mobile navigation, scrolling both ways, service selection and back/forward history, gallery/lightboxes, FAQs, animations, map and enquiry draft/download. Check the browser console and network panel. Live Vercel behavior has not yet been verified.

References: https://vercel.com/docs/frameworks/frontend/vite ; https://vercel.com/docs/functions/runtimes/node-js/node-js-versions ; https://tailwindcss.com/docs/preflight
