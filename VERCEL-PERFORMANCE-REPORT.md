# Vercel production audit — 19 November 2026

Deployment and responsive checks pass. **The requested 90+ performance target is not met on every mobile route.** No deployment, push or commit was performed.

## Final measured performance

Three tests per page/device on the final production build, using Lighthouse 13.6.0 and isolated Chrome 157. Each cell shows the median followed by all three scores. These are local production-preview results, not a forecast or guarantee for Vercel.

| Page        | Desktop median (runs) | Mobile median (runs) | Mobile LCP | Mobile TBT | Mobile CLS |
| ----------- | --------------------- | -------------------- | ---------- | ---------- | ---------- |
| /           | 99 (98, 99, 99)       | 81 (97, 81, 81)      | 5.11 s     | 65 ms      | 0          |
| /about-us   | 97 (97, 97, 97)       | 80 (80, 80, 80)      | 5.56 s     | 11 ms      | 0          |
| /services   | 98 (98, 98, 98)       | 80 (80, 77, 80)      | 5.56 s     | 36 ms      | 0          |
| /faqs       | 97 (97, 97, 97)       | 80 (80, 80, 80)      | 5.41 s     | 0 ms       | 0          |
| /contact-us | 97 (97, 97, 97)       | 77 (77, 77, 77)      | 6.83 s     | 3 ms       | 0          |
| /blog       | 98 (98, 98, 98)       | 78 (77, 78, 81)      | 6.31 s     | 37 ms      | 0          |

| Page        | Mode    | FCP (s) | LCP (s) | TBT (ms) | CLS | Speed Index (s) |
| ----------- | ------- | ------- | ------- | -------- | --- | --------------- |
| /           | desktop | 0.21    | 1.01    | 0        | 0   | 0.49            |
| /           | mobile  | 0.76    | 5.11    | 65       | 0   | 1.49            |
| /about-us   | desktop | 0.33    | 1.25    | 0        | 0   | 0.39            |
| /about-us   | mobile  | 0.76    | 5.56    | 11       | 0   | 0.89            |
| /services   | desktop | 0.33    | 1.17    | 0        | 0   | 0.36            |
| /services   | mobile  | 0.76    | 5.56    | 36       | 0   | 0.76            |
| /faqs       | desktop | 0.21    | 1.21    | 0        | 0   | 0.28            |
| /faqs       | mobile  | 0.76    | 5.41    | 0        | 0   | 0.76            |
| /contact-us | desktop | 0.21    | 1.25    | 0        | 0   | 0.34            |
| /contact-us | mobile  | 0.76    | 6.83    | 3        | 0   | 0.88            |
| /blog       | desktop | 0.21    | 1.17    | 0        | 0   | 0.30            |
| /blog       | mobile  | 0.76    | 6.31    | 37       | 0   | 0.83            |

The initial homepage Edge baseline was 100/100/100 desktop and 96/96/96 mobile. Later Edge runs varied considerably, including slow-CPU warnings. A Chrome cross-check also produced low mobile scores without warnings. Therefore the low results cannot be dismissed as CPU warnings, and the initial/best scores are not used to claim success. Final raw reports, traces and request logs remain under tmp/vercel-2026-11-19; the repository JSON summary preserves every final score and metric.

## Diagnosis and remaining bottleneck

LCP is the principal remaining mobile constraint. CLS is zero in the final runs and TBT is much smaller than the LCP delay. The homepage hero already uses the matching responsive AVIF preload, eager loading and high fetch priority. Its image is unchanged. Internal pages still discover critical images after the entry JavaScript and route chunk; the first Services card now loads eagerly at high priority instead of being lazy.

Exact mobile LCP elements from the median-score runs:

- /: Five Hi-Tech guards receiving instructions beside a fire extinguisher. Selector: `section._hero_1cc66_5 > div._photo_1cc66_9 > picture > img`.
- /about-us: Four Hi-Tech guards in grey uniforms standing beside a blue property gate. Selector: `main.main-wrapper > section.hero-section > div.hero-bg > img.hero-bg-image`.
- /services: White-shirted instructor addressing a line of Hi-Tech guards in grey uniforms. Selector: `div._grid_1147x_27 > a._card_1147x_33 > div._imageFrame_1147x_46 > img`.
- /faqs: Wide view of a white-shirted instructor briefing Hi-Tech security personnel out…. Selector: `main.main-wrapper > section.hero-section > div.hero-bg > img.hero-bg-image`.
- /contact-us: Hi-Tech guard in a grey uniform outside a residential apartment building. Selector: `div.container-default > div._panel_1oryi_13 > figure._photo_1oryi_22 > img`.
- /blog: Participant using a fire extinguisher during supervised practical safety traini…. Selector: `div._container_1cgye_18 > article._featured_1cgye_43 > a._featuredPhoto_1cgye_113 > img`.

The JSON includes each LCP selector, observed load/render breakdown, long-task bundle URL and duration, and Lighthouse's estimated savings. Those observed trace timings are unthrottled; scored metrics above use simulated throttling. They must not be presented as interchangeable measurements.

The next measurable experiment is a **small parser-discoverable critical-page shell with selective hydration**, rather than pre-rendering every below-the-fold section and loading all page styles. Compare its cold mobile median LCP and request graph against this report before adopting it. A full-page static-rendering trial during this audit scored 76 with 7.45-second LCP and was reverted. Extra AVIF and blanket preload trials were also reverted because they did not improve the measurements.

## Changes retained

- Added npm run check:deploy and made Vercel run it: 58 regression tests, production build, then exact-case imports/assets, copied output, lockfile, SPA and crawl-file checks.
- Covered the previous ENOTDIR failure with a real MP4-path regression test. Directory enumeration now stops at the parent of a file.
- Added the existing brand favicon, resolving its 404; excluded output/ artifacts from Git and deployment.
- Rebuilt 19 responsive variants for three measured critical photographs from their full originals, reducing their combined disk size from 6,470,126 to 5,009,596 bytes (22.6%). This is the total across resolutions, not a per-page transfer saving. Full originals, framing and dimensions are unchanged.
- Corrected Services grid image sizes and prioritized its first visible image.
- Avoided a wasted 189,490-byte full-font download for an unsupported decorative star by requesting its existing system-font fallback directly.
- Yielded long Home/About/Contact/FAQ content mounting until after the hero's first paint. Content, animations and scroll interactions remain enabled; this does not guarantee a 90+ score.
- Included all 11 existing services in the Contact enquiry selector and corrected gallery/article accessible link labels.

## Verification

- Production build and all 58 regression tests pass.
- HTTP checks: 22 direct page URLs plus 187 referenced assets/discovery endpoints; no SPA HTML returned for assets.
- Browser checks cover all six main pages, all 11 service details and all three articles at 320, 375, 390, 430, 768, 1024 and 1440 pixels, plus a 320×480 menu check.
- All 164 responsive checks and five additional touch, wheel/history, keyboard, filter and reduced-motion checks pass, with no runtime exceptions or local HTTP failures.
- Navigation, mobile menu locking/restoration, service submenu/tabs, FAQ default/single-open behavior, gallery frame/navigation and contact validation are checked. No calls, messages or form enquiries were sent.
- Fresh npm ci and a fresh-copy production build pass; all 370 output files are byte-identical to the working production build. See VERCEL-READINESS.md.
- No physical iOS/Safari test or live Vercel PageSpeed test is claimed.

## Files changed by this audit

Deployment: .gitignore, .vercelignore, vercel.json, package.json, index.html, scripts/asset-references.mjs, scripts/audit-production.mjs, tests/assetReferences.test.js, tests/deployment.test.js.

Performance/interaction: src/main.jsx, src/hooks/useAfterFirstPaint.js, src/pages/About.jsx, src/pages/Contact.jsx, src/pages/Faq.jsx, src/components/AboutGallerySection.module.css, src/components/ServicesLanding.jsx, src/data/services.js, scripts/optimize-critical-images.py, and the 19 responsive WebP variants named in that script.

Form/accessibility: src/components/ContactEnquirySection.jsx, src/components/HomeWorkGallery.jsx, src/components/BlogListing.jsx.

Reports: VERCEL-READINESS.md, VERCEL-PERFORMANCE-REPORT.md, VERCEL-PERFORMANCE-RESULTS.json. Pre-existing photo, caption and data edits from earlier requests were preserved.

## Deployment

Use Vite, Node 24.x, npm ci, npm run check:deploy, output dist. Align dashboard overrides with vercel.json. Include required new public/assets files in the commit. After deployment, verify the deployed commit, direct-route refreshes and rerun PageSpeed Insights on both device modes. See [VERCEL-READINESS.md](VERCEL-READINESS.md) for commands and existing enquiry/newsletter limitations.
