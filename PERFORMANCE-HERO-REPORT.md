# Hero image delivery optimization — 13 November 2026

Added AVIF delivery for the existing homepage hero, with the unchanged WebP photograph as a native picture fallback. No photographs, content, dimensions, cropping, animations, or layout were removed or redesigned.

- Full-size hero: **319,032 → 188,168 bytes**, 41% smaller.
- 768px hero: **85,298 → 70,259 bytes**, 18% smaller.
- Matching responsive AVIF preload and picture candidates prevent duplicate hero downloads in supporting browsers.
- All original WebP source and responsive files remain unchanged. Other website photos are unaffected.

## Verification

`npm run build` passed; **56 tests passed**. New regression coverage verifies the preload/picture candidates, format signature, fallback assets, and absence of hero preload on internal routes. All 471 static asset references resolve.

Browser checks passed at 320, 390, 768 and 1440px: AVIF selected and decoded, one initial hero download, unchanged cover fit and focal position, no horizontal overflow. Forcing the AVIF source to an unsupported format correctly selected and decoded the original WebP fallback.

Compared computed layout, spacing, typography, colors and image fit for eight page types at 320, 768 and 1440px: zero differences across 24 comparisons (ignoring only the newly added nonvisual picture/source wrappers). Encoded photographs were visually inspected before implementation.

Production Lighthouse at **http://192.168.0.120:4173/**, standard simulated settings:

- Mobile: **96, 96, 96**, median **96**, median LCP **2.77 s**.
- Desktop verification: **100** (one run).
- Initial mobile transferred bytes: **969,465**, compared with **984,371** in the previous critical-hero pass's representative mobile run. This is a smaller payload, not a claimed score increase: mobile median remains 96.

These measurements are local production checks, not the user's custom-throttled development report or a deployed-site score. Mobile LCP remains above 2.5 s. The first measurement attempt encountered a stopped preview server and was discarded; all reported measurements were rerun after restarting and verifying the production server.

## Files

- `src/components/HomeHeaderHeroSection.jsx`: responsive picture with WebP fallback.
- `src/components/HomeHeaderHeroSection.module.css`: picture uses the existing full image frame.
- `index.html`: type-qualified AVIF preload matching the picture.
- `src/data/heroAvif.json`: responsive candidate manifest.
- `scripts/optimize-hero.py`: optional reproducible AVIF generation, requiring Pillow with AVIF support. No build/runtime dependency was added; the codec used for generation was installed in an ignored temporary directory.
- Six AVIF files under `public/assets/hitech/new-uniform/` and its `responsive/` folder.
- `tests/heroDelivery.test.js`, this report and `PERFORMANCE-HERO-RESULTS.json`.

To run the production preview after it has stopped, use `npm run perf:serve` and open **http://localhost:4173/** or **http://192.168.0.120:4173/**. Development port 5173 deliberately serves development modules. Deploy the source changes before testing the live Vercel URL; no deployment was performed in this pass.
