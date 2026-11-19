# Vercel readiness — 19 November 2026

This audit checks the local production artifact. No deployment, push or commit was performed. Live Vercel performance must be measured again after the new commit is deployed.

Deployment checks pass, but the requested **90+ mobile performance target is not met**. Final three-run Chrome medians are 97–99 on desktop and 77–81 on mobile. See [the measured report](VERCEL-PERFORMANCE-REPORT.md) for every score, remaining LCP delays and the next experiment.

## Deployment settings

| Setting          | Value                                             |
| ---------------- | ------------------------------------------------- |
| Root Directory   | Directory containing package.json and vercel.json |
| Framework        | Vite                                              |
| Node.js          | 24.x                                              |
| Install Command  | npm ci                                            |
| Build Command    | npm run check:deploy                              |
| Output Directory | dist                                              |

These settings are in vercel.json; align conflicting dashboard overrides. No environment variable is required. VITE_SITE_URL is optional when changing the canonical domain; its default is https://security-website-omega.vercel.app.

The SPA rewrite preserves direct visits and refreshes to About Us, Contact Us, FAQ, all service query URLs and all blog article URLs. Existing output files, including robots.txt, sitemap.xml and assets, must continue to be served as files.

HTML revalidates. Content-hashed JavaScript/CSS gets immutable caching; stable photo/font URLs use a one-day cache with revalidation.

## Repeatable checks

```powershell
npm ci
npm run check:deploy
npm run preview -- --host 127.0.0.1 --port 4273 --strictPort
```

In a second terminal:

```powershell
node scripts/audit-production.mjs http://127.0.0.1:4273
```

The deployment check runs regression tests, builds production, then validates exact import/asset filename casing for Linux, copied public-file contents, package/lockfile consistency, the production entry, SPA configuration and crawl files. Its optional HTTP check verifies 22 page URLs and referenced assets return the expected response type.

The previous ENOTDIR failure is covered by a regression test: the checker reads each parent directory and validates the final file. It never calls readdir on an MP4 or another file.

If preview reports that its port is occupied, reuse the existing preview or choose another port and update the audit URL. Do not stop unrelated processes just to free a port.

## Browser verification

The audit covers Home, About Us, Services, FAQ, Contact Us, Blog, all 11 service details and all three articles at 320, 375, 390, 430, 768, 1024 and 1440 CSS pixels. Checks include horizontal overflow, images, fixed navbar, mobile menu locking/restoration, service submenu, page navigation, FAQ state, service tabs, gallery navigation/frame stability and contact form validation. A separate 320×480 check covers short-screen menu access.

These are emulated Chromium checks, not physical iOS/Android testing. Google Maps depends on its external provider. Phone, WhatsApp and mail links are checked without placing calls or sending enquiries.

Performance results and FCP/LCP/TBT/CLS/Speed Index are in VERCEL-PERFORMANCE-RESULTS.json and VERCEL-PERFORMANCE-REPORT.md. Measure the production preview or new deployment, not the development server on port 5173. Do not compare custom-throttled development results with standard-preset production results.

## Before pushing

Include intended modified source, scripts, tests and all new files under public/assets. The residential-desk photograph and short-sleeve briefing variants from preceding tasks remain required. Do not commit node_modules, tmp, dist, .env or output; the deployment ignore file excludes these artifacts.

After deployment, refresh /about-us, /services?service=residential-security, /faqs, /contact-us and a blog article URL directly. Confirm the deployed commit, check for 404s and rerun PageSpeed Insights for desktop and mobile.

## Existing behavior retained

- Contact enquiries prepare a draft in the visitor's email application and provide a download. There is no server-side mail endpoint.
- Newsletter submission retains its existing preview-only notice.
- Content, images, crops, animations and scrolling remain intact. Optimized photo variants come from the same full originals.

References: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).
