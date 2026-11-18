# Additional media performance pass — 13 November 2026

Implemented further optimizations in the existing website. The screenshot's 67 score was taken on Vite development port 5173; the measurements below use the production build at localhost:5174. They are not a directly comparable 67-to-95 improvement and are not deployed Vercel results.

## Changes

- Replaced the immediately downloaded bottom CTA CSS background with the exact same photograph as an absolutely positioned, decorative, responsive, native-lazy image. Retained centered cover cropping, the same navy overlay, dimensions, text and CTA behavior. The image now loads near the viewport instead of competing with the hero at startup. No image content was removed or replaced.
- Added accurate delivery-size hints for team carousel photos and client logos. These select existing WebP variants; original photographs remain untouched.

## Verification and measurements

- `npm run build`: passed.
- `npm test`: 54 tests passed.
- Formatting and static asset checks passed; all 460 asset references resolve.
- Three mobile production Lighthouse runs: **95, 95, 93**; median **95**.
- Mobile median LCP **2.73 s**, CLS **0**, TBT **132 ms**. LCP remains above the 2.5 s target. Lighthouse flagged the host CPU as slower than expected; results can vary and require production retesting.
- Desktop production Lighthouse: **99** (one verification run).
- Initial homepage transfer decreased from the previous production audit's third mobile run **1,345,486 bytes** to **984,855 bytes** (about 27%). Initial image transfer decreased from **1,155,564 to 795,146 bytes**. The full CTA image is absent from initial requests and still loads on scrolling to the CTA.
- CTA section dimensions before/after: **1425 x 445.5625px** in the 1440px desktop viewport. Its original photograph, overlay and crop were visually checked.
- Twelve CTA layout/loading checks passed on Home, About and Bank Security at 320, 375, 768 and 1440px: image decoded, covers its frame, remains decorative, contact link present, no horizontal overflow.

Files changed in this pass:

- `src/components/HomeCtaSection.jsx`
- `src/components/HomeCtaSection.module.css`
- `src/styles/base.css` (removed only the eager CTA background rules in this pass; the working tree also contains the earlier unused-CSS cleanup)
- `src/components/HomeTeamSection.jsx`
- `src/components/HomePartnersSection.jsx`
- This report

Raw measurements and screenshots: ignored `tmp/media-performance/`. Existing optimizations and prior edits were preserved. No dependencies were added. Push the current source changes to deploy them; test production preview rather than development mode, and rerun PageSpeed on the deployed URL afterward. The live score is not guaranteed by local measurements.

## Verified network testing address

The Vite development URL `http://192.168.0.120:5173/` serves `/@vite/client` and unbundled source. It is not the production build. Added `npm run perf:serve` to build and serve production reliably on port 4173 with strict port selection.

Started and verified `http://192.168.0.120:4173/`: HTTP 200, no development client, subset font and latest hashed bundle. Fresh Lighthouse checks at this exact network URL measured **95 mobile / 98 desktop**. These were one check per device, not new three-run medians. HTTP LAN origins have lower Best Practices scores than HTTPS/localhost; they are useful for checking layout and production delivery, while deployed HTTPS must be audited separately.

`package.json` was modified to add the repeatable production-testing command. The live Vercel URL was separately checked and still served the older bundle `index-C0d2liDP.js` and full Archivo font at verification time; local improvements are not a deployed-site claim.
