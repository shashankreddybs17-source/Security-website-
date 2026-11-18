# Extended production optimization report — 13 November 2026

This is the follow-up to `PERFORMANCE-REPORT.md`. The prior optimizations and existing working-tree edits were preserved. The pre-implementation findings and plan are in `PERFORMANCE-NEXT-AUDIT.md`.

## Measured outcome

Three full-category Lighthouse 13.6.0 production-preview runs per device, using the same desktop preset and default simulated mobile settings as the previous audit. Previous refers to the completed optimization pass, not the original score-45 development screenshot. Raw reports remain in ignored `tmp/performance-next/`; exact medians and emitted bundle sizes are in `PERFORMANCE-NEXT-RESULTS.json`.

| Median              | Previous desktop | Final desktop | Previous mobile | Final mobile |
| ------------------- | ---------------: | ------------: | --------------: | -----------: |
| Performance         |               98 |            98 |              90 |           93 |
| Accessibility       |               95 |            95 |              95 |           95 |
| Best Practices      |              100 |           100 |             100 |          100 |
| SEO                 |               92 |           100 |              92 |          100 |
| FCP                 |          0.254 s |       0.362 s |         0.911 s |      0.769 s |
| LCP                 |          1.054 s |       1.154 s |         3.685 s |      3.162 s |
| Speed Index         |          0.418 s |       0.594 s |         1.456 s |      1.958 s |
| Total Blocking Time |             0 ms |          0 ms |         45.5 ms |        96 ms |
| CLS                 |                0 |       0.00156 |               0 |            0 |

Final scores: desktop **98, 98, 98**; mobile **91, 93, 93**. These are local laboratory results, not PageSpeed field data or measurements of the newly deployed site. Mobile LCP remains above 2.5 seconds. TBT and Speed Index increased; route splitting is not claimed to improve every metric. No field INP measurement is available, and TBT must not be presented as INP.

## Implemented changes

### Route delivery and JavaScript

`Home` now uses the same React.lazy/Suspense route strategy as internal pages. Previously all internal routes also downloaded homepage components. The shared entry decreased from **341,877 to 272,643 raw bytes** (20.3%) and from **98,382 to 82,179 gzip bytes** (16.5%). The homepage chunk is 60,624 raw / 15,357 gzip bytes. Shared footer/blog/CTA dependencies are emitted as reusable chunks by Vite; no manual vendor fragmentation was introduced.

All-route JS combined increased from 413,875 to 417,155 raw bytes (118,504 to 122,570 gzip bytes), reflecting metadata logic and chunk overhead. This is an internal-route delivery improvement, not a reduction in the sum of every route. The third mobile Lighthouse run transferred 1,345,486 total bytes versus 1,334,779 previously; the homepage total did not shrink.

A built-in Rollup module analyzer is available through `npm run analyze`; it emits `BUNDLE-ANALYSIS.json` with actual emitted sizes, imports and module composition. No analyzer package is needed. React DOM is the largest shared runtime. Existing icon tree shaking remains enabled. No unused production dependency was identified: React, React DOM and Lucide are all in use.

No blanket memoization was applied. Component state and listener cleanup were inspected; the previous document-mutation scanning fix remains in place. React DevTools Profiler was not installed in the isolated browser, so no React DevTools profiling claim is made.

### CSS and visual preservation

Route CSS now loads with its route. Shared entry CSS is **60,795 raw / 11,860 gzip bytes**, versus the previous 115,776 / 20,859. Summed route CSS is 149,240 raw / 31,690 gzip bytes; gzip totals can increase when a stylesheet is split.

The split exposed a CSS-order dependency in the gallery: its button borders had previously been overridden by the global borderless reset. Made those two borderless values explicit so late-loading route CSS preserves the existing computed appearance. Compared layout, spacing, typography, color, object-fit and overflow on eight page types at 320, 768 and 1440px: **zero differences across 24 comparisons**. No visual redesign or animation removal was used.

### SEO and discovery

Added one shared metadata source for page/service/article titles, descriptions, canonical URLs and Open Graph tags. Selecting another service or using history updates its metadata without changing existing URLs. Descriptions derive from existing service/article information; no new company claims or certifications were invented.

The production build now generates `robots.txt` and a 20-URL XML sitemap: six main paths, 11 existing service query URLs and three articles. FAQ/Contact aliases canonicalize to their primary routes. Metadata uses the existing production origin `https://security-website-omega.vercel.app`; set **VITE_SITE_URL** before building if a custom domain becomes the preferred origin. This variable is public configuration, not a secret.

The initial static HTML has homepage metadata. Internal-route metadata is updated by JavaScript; this remains a client-rendered SPA, not SSR or full prerendering. Social crawlers that do not execute JavaScript can still see homepage metadata for internal links. Build-time per-route rendering would be a separate architecture task. Unknown-route HTTP status behavior remains the existing SPA fallback; no new 404 design or routing change was introduced.

### Vercel caching

- Content-hashed JS/CSS: one-year immutable browser caching.
- Replaceable public photos/fonts: existing one-day caching plus seven-day stale-while-revalidate, rather than unsafe year-long caching of unchanged filenames.
- HTML/discovery documents: immediate revalidation.
- Added `nosniff` and the existing-compatible strict-origin referrer policy. No restrictive CSP was introduced that could break maps or inline behavior.

Validated the actual patterns with Vercel's `@vercel/routing-utils`, installed only in an ignored temporary folder. It reported no errors. The hashed JS, photo, font and HTML sample paths each matched the intended distinct policy. No deployment was performed; live cache/compression headers require verification after deployment. Vercel handles transfer compression; no duplicate compressed-file middleware was added. Documentation: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel cache control](https://vercel.com/docs/caching/cache-control-headers).

### Media, fonts, APIs and mobile

The previous WebP responsive-image and Archivo subset work remains intact. No additional images were recompressed, replaced, deleted or generated during this follow-up. Full-resolution source photos remain available; existing gallery framing/focal positions are unchanged. No active video is present in the current application, so no video-saving claim is made.

No backend API, authentication, search integration, React Query cache or subscription exists to optimize. No pagination, request caching or authentication library was added. Contact enquiry retains its email-composition flow; external delivery was not triggered. The existing preview-only newsletter behavior remains unchanged.

Mobile navigation scroll lock, menu placement, submenu, route scroll restoration, tabs, carousel, keyboard FAQ/modal behavior and reduced motion were retained. Touch behavior is supported by the existing pointer handlers; testing used browser emulation rather than physical devices.

## Verification

- `npm install --ignore-scripts --no-audit --no-fund`: up to date; no dependency added/removed/upgraded.
- Standard `npm run build` and `npm run analyze`: passed with no build warnings.
- `npm test`: **54 tests passed**. New tests cover service canonicals, aliases, 20 unique sitemap URLs, configured origin validation, and safe immutable-cache matching.
- 24 computed-style comparisons: zero layout/typography differences.
- All 11 service detail URLs at 320 and 1440px: expected headings and images, no overflow or uncaught exceptions.
- All three article pages plus FAQ/Contact aliases checked on desktop/mobile.
- Six gallery photos at six viewport sizes, including short landscape screens: stable centered frame, preserved cover fit, Previous/Next and Escape passed.
- About page checked separately at 320, 375, 390, 430, 768 and 1440px: eight sections, correct photo proportions, visible heading, no horizontal overflow or hidden reveals after traversing the content. One fast-scroll sweep skipped some reveal positions; direct section traversal verified them without disabling animations.
- Service metadata changed from Bank Security to Bodyguard Services correctly; About-to-Services mobile navigation ended at scroll zero with a closed menu.
- Contact form validation rejects empty required fields and accepts completed valid fields; no external submission was triggered.
- 460 static asset references checked: no missing files.
- External calls/messages/emails were not sent. No live Vercel cache change or PageSpeed result is claimed before deployment.

## Files in this follow-up

- `src/main.jsx`: lazy Home route and metadata initialization/cleanup.
- `src/components/HomeWorkGallery.module.css`: preserve existing borderless computed appearance after CSS splitting.
- `src/data/siteMetadata.js`: reusable metadata and discovery URL definitions.
- `src/lib/metadata.js`: route/service metadata updates and listener cleanup.
- `scripts/seo-build.mjs`: canonical/Open Graph build tags, robots and sitemap generation.
- `scripts/analyze-bundle.mjs`, `package.json`: dependency-free bundle analysis command.
- `vite.config.js`: metadata build plugin and configurable public origin.
- `vercel.json`: distinct caching policies and compatible response headers.
- `tests/metadata.test.js`: three regression tests.
- `BUNDLE-ANALYSIS.json`, `PERFORMANCE-NEXT-AUDIT.md`, `PERFORMANCE-NEXT-RESULTS.json`, this report: audit evidence and reproducible measurements.

The working tree also retains earlier image/font/CSS optimizations listed in `PERFORMANCE-REPORT.md`; those were not duplicated or reverted. Generated `dist/` files and temporary test/browser artifacts are ignored by Git.

## Remaining work requiring deployment or a separate decision

After pushing, run PageSpeed on the production URL for mobile and desktop. Confirm HTML revalidation, immutable hashed-bundle caching and CDN compression in actual response headers. Set VITE_SITE_URL if using a custom domain before rebuilding. Real-user INP and Core Web Vitals need field data; local Lighthouse does not provide them.

The remaining mobile cost includes the React startup, detailed photos and dynamic route loading. Further JS splitting should be profiled against interaction delay rather than added indiscriminately. The footer CTA still uses its original full-resolution CSS background; changing image delivery or introducing deferred background loading would require separate visual checks. No content or functionality was removed merely to hit a score.
