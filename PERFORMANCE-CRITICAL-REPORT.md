# Critical hero rendering fix — 13 November 2026

The existing homepage hero was inside the lazy homepage module. Its image could be preloaded, but React could not display it until the homepage code and styles arrived. Moved the unchanged hero into the initial page shell, with a nested Suspense boundary around the remaining homepage sections. The final DOM structure, content order, image, crop, dimensions, typography and animations are preserved. No sections are delayed with timers, hidden or removed.

Files changed in this pass: `src/main.jsx` and `src/pages/Home.jsx`. Added this report and `PERFORMANCE-CRITICAL-RESULTS.json` as verification records. Earlier image/font/CSS/caching/robots changes remain in the working tree.

## Production measurements

Test URL: **http://192.168.0.120:4173/**. Lighthouse 13.6.0, desktop preset and default mobile simulated throttling. Three runs per device; no Lighthouse run warnings.

| Median metric            | Desktop |  Mobile |
| ------------------------ | ------: | ------: |
| Performance              | **100** |  **96** |
| First Contentful Paint   | 0.337 s | 0.760 s |
| Largest Contentful Paint | 0.814 s | 2.768 s |
| Total Blocking Time      |    0 ms |   27 ms |
| Layout shift             |       0 |       0 |

Individual scores: desktop **100, 100, 100**; mobile **96, 96, 96**. JavaScript minification checks passed in all six runs. Full measurements are under ignored `tmp/critical-performance/`; the retained JSON summary gives the exact values/settings.

These are measurements of the local production build, not a guarantee for the live Vercel deployment or the user's custom-throttled report. The supplied score of 68 used different Lighthouse/version/throttling conditions and still reported 1.28 MB of minifiable JavaScript. It is not a directly comparable before/after baseline. Mobile LCP remains above the 2.5 s target despite the score exceeding 90. INP requires field data; it is not claimed from TBT.

## Verification

- Production build passed; **55 tests passed**; formatting and diff checks passed.
- Deliberately held back the Home JavaScript chunk in a cold browser: the hero heading and decoded photograph were already visible, while the remaining homepage content was not yet mounted. Releasing that chunk mounted the rest of the page normally, with exactly one hero image.
- Compared computed layout, typography, color, image fit and spacing on eight page types at 320, 768 and 1440px: **zero differences in 24 comparisons**.
- Gallery checked at six viewport sizes, including short landscape screens: fixed frame, image fit, Previous/Next and Escape retained.
- Existing mobile menu, submenu, service tabs, carousel and reduced-motion checks rerun, plus all 11 service detail URLs at mobile/desktop widths.

## Test the actual production build

The already-running production preview is at **http://192.168.0.120:4173/**. To restart it later:

```powershell
npm run perf:serve
```

Port **5173** remains Vite's development server and intentionally ships development code. Testing that URL cannot verify production minification. Existing saved Lighthouse reports do not update after code changes; start a new audit at the production URL. For exact comparison with a custom-throttled result, export that Lighthouse report JSON so its URL and throttling parameters can be reproduced.

The last live-site inspection still showed the older deployed bundle. Commit and deploy the current optimized source before treating the Vercel URL as representative of this build. No deployment or live score is claimed here.
