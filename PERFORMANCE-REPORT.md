# Performance audit and optimization — 13 November 2026

The production homepage now measures **98 desktop / 90 mobile**, using the median of three full-category Lighthouse runs per device. The site was not redesigned. No content, photographs, videos, routes, or animations were removed by this audit.

## Measurement method

Lighthouse 13.6.0 against the Vite production preview at `http://127.0.0.1:5174/`, with the desktop preset and default simulated mobile throttling (4x CPU slowdown, 150 ms RTT, 1,638.4 Kbps throughput). Three sequential runs per device before and after, on the same local Edge browser. Normal animations remained enabled during Lighthouse. A separate reduced-motion pass made layout comparisons deterministic.

The supplied screenshot's score of 45 was from a different run/environment. The repeatable baseline here was already 98 desktop / 81 mobile after the preceding responsive-image work. It would be misleading to describe this audit as a measured 45-to-90 improvement. These are local lab measurements, not deployed Vercel or real-user measurements.

| Median metric       | Desktop before | Desktop after | Mobile before | Mobile after |
| ------------------- | -------------: | ------------: | ------------: | -----------: |
| Performance         |             98 |            98 |            81 |           90 |
| FCP                 |        0.377 s |       0.254 s |       0.914 s |      0.911 s |
| LCP                 |        1.191 s |       1.054 s |       5.189 s |      3.685 s |
| Speed Index         |        0.470 s |       0.418 s |       1.235 s |      1.456 s |
| Total Blocking Time |           0 ms |          0 ms |         26 ms |      45.5 ms |
| CLS                 |              0 |             0 |             0 |            0 |
| Accessibility       |             95 |            95 |            95 |           95 |
| Best Practices      |            100 |           100 |           100 |          100 |
| SEO                 |             92 |            92 |            92 |           92 |

Individual performance runs: desktop before **98, 98, 98**, after **98, 98, 98**; mobile before **81, 83, 80**, after **96, 90, 90**. Mobile LCP improved 29%; not every metric improved. Speed Index and TBT varied upward, so no claim is made that main-thread blocking improved. See `PERFORMANCE-AUDIT-RESULTS.json` for exact medians and bundle measurements.

## Findings and implemented changes

- **Unused template CSS:** removed 1,063 selectors that depended on classes absent from application sources. Selectors containing pseudo-classes, attributes or escapes were conservatively retained. Existing component styles, keyframes, responsive rules, spacing and colors were preserved. Lighthouse's mobile unused-CSS estimate fell from 20,053 transfer bytes to zero in the third comparable run.
- **Critical font cost:** the original Archivo WOFF2 was 189,168 bytes and included a width axis the website never uses. Added a 57,868-byte Latin subset at the existing normal width, retaining every weight from 100–900 and the original font as the fallback for other characters. Preload now targets the subset. Compared 469 glyph outlines and advance widths across seven weights: identical. No font family or visual style changed.
- **Unnecessary animation initialization:** the global MutationObserver previously rescanned the entire document three times whenever counter text changed. It now ignores text mutations and initializes only newly mounted element subtrees. Initial loading, lazy pages, FAQ controls, reveal timing and reduced-motion behavior remain supported. A regression test covers this behavior.
- **React list identity:** team slides shared image URLs, creating duplicate React keys. Keys now use the existing unique person names. Content and carousel behavior are unchanged.

The confirmed LCP element is the homepage corporate-security briefing photograph. Its responsive preload, `fetchpriority="high"`, eager loading and explicit dimensions were already correct; these were retained.

## Bundle and transfer results

Bytes are decimal; gzip sizes were measured locally with Node zlib.

| Resource                      |   Before raw / gzip |    After raw / gzip |
| ----------------------------- | ------------------: | ------------------: |
| Main JavaScript               |  341,758 / 98,301 B |  341,877 / 98,382 B |
| All route JavaScript combined | 413,756 / 118,418 B | 413,875 / 118,504 B |
| Main CSS                      |  190,403 / 31,937 B |  115,776 / 20,859 B |
| All route CSS combined        |  223,921 / 40,208 B |  149,294 / 29,130 B |
| Critical font                 |           189,168 B |            57,868 B |

The main CSS is 39.2% smaller raw and 34.7% smaller gzipped. The critical font is 69.4% smaller. JavaScript increased by 119 raw bytes for the scoped initialization logic; it was not artificially split to improve a score.

In the third comparable mobile runs, total transferred bytes decreased from **1,477,079 to 1,334,779** (142,300 B, 9.6%). Image transfer remained **1,155,564 B** in both. Video transfer was zero in both: no active video player is present in the current rendered site. No additional image/video savings are attributed to this audit.

The preceding image pass is retained: responsive WebP variants at 320, 480, 768, 960 and 1280px, synchronized hero preload, and improved card sizing hints. Original full-resolution photos remain untouched. That earlier pass is already included in this audit's baseline.

## Other areas inspected

- Vite already minifies production output and emits hashed assets. Non-home routes already use React.lazy/Suspense. No new UI/runtime dependencies or deployment settings were introduced.
- No active GSAP, Webflow or jQuery runtime remains. Existing native animation handlers use passive scroll listeners and animation-frame scheduling. Gallery transforms and timing were preserved.
- Statistics state is local to its component, not the entire application. No speculative React.memo/useMemo/useCallback changes were added. The demonstrated repeated work was the document-wide mutation scan, which was fixed directly.
- No above-the-fold third-party script requests were found on the homepage. The Contact page retains its existing lazy Google Maps iframe.
- Existing below-the-fold image lazy loading, responsive dimensions, modal cropping and source photos were retained. No content was hidden to alter Lighthouse results.

## Verification

- Production build passed; 51 tests passed.
- Compared computed layout, typography, colors, image fit and spacing on eight page types at 320, 768 and 1440px: **zero differences across 24 comparisons**.
- Checked six main routes at 320, 375, 390, 430, 768 and 1440px, including full-page scrolling and reveal visibility.
- Checked all 11 service detail URLs at 320 and 1440px, plus all three article URLs and the FAQ/Contact aliases.
- Checked mobile menu positioning, background scroll lock/restoration, Services submenu, service tabs, expert carousel, FAQ mouse/keyboard controls and reduced motion.
- Confirmed About-to-Services navigation from a scrolled mobile page loads at scroll position zero with the menu closed.
- Checked all six modal photos at six desktop/mobile/short-screen sizes: stable centered outer frame, no viewport overflow, Previous/Next and Escape work. Existing cover fit and portrait focal positioning are unchanged.
- Validated 449 static asset references: no missing files. No uncaught browser exceptions were reported by route tests; the navigation console check also reported no errors.
- External telephone, WhatsApp, email and map links were inspected without sending messages or placing calls. Actual delivery remains dependent on the external application/device.

Detailed temporary reports/screenshots are under `tmp/performance-audit/` and `tmp/site-cleanup/` (ignored by Git). Build output is under `dist/` (also ignored).

## Files modified by this audit

- `src/styles/base.css` — safely pruned unused selectors.
- `src/styles/fonts.css` — subset font plus original Unicode fallback.
- `index.html` — critical subset preload.
- `src/lib/interactions.js` — initialize added subtrees only.
- `src/components/HomeTeamSection.jsx` — unique slide keys.
- `public/assets/fonts/archivo-latin.woff2` — optimized font added; source retained.
- `scripts/optimize-fonts.py` — reproducible font subset generation (optional development tool requiring fonttools/brotli; not required by the build).
- `tests/interactionScanning.test.js` — text-mutation and lazy-subtree regression coverage.
- `PERFORMANCE-REPORT.md` and `PERFORMANCE-AUDIT-RESULTS.json` — findings and measured results.

Existing uncommitted files from the earlier responsive-image pass were preserved: `scripts/optimize-images.py`, `src/data/responsiveImages.json`, `src/components/HomeEnhancements.jsx`, `src/components/HomeHomeAboutSection.jsx`, the hero preload sources in `index.html`, and responsive WebP variants under `public/assets/hitech/`.

## Remaining limits and rechecking

Mobile median LCP is **3.685 s**, above the requested 2.5 s target. Large detailed photos and initial React rendering still carry a cost under simulated slow mobile conditions. Lighthouse estimates about 35 KB of unused JS; some supports below-the-fold interactions. Further splitting should be separately profiled for delayed interaction or layout regressions rather than removing features. No INP field data is available: TBT is a lab diagnostic, not an INP measurement.

After pushing these changes, rerun PageSpeed on the deployed URL. Local scores do not guarantee identical Vercel scores or real-user Core Web Vitals.

```powershell
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 5174
# In another terminal, repeat each measurement three times and compare medians:
npx lighthouse http://127.0.0.1:5174/ --preset=desktop --output=json --output-path=desktop.json
npx lighthouse http://127.0.0.1:5174/ --output=json --output-path=mobile.json
```

Use production preview rather than the Vite development server, keep browser/CPU/network conditions consistent, and keep report filenames unique for each run. The optional font regeneration command is `python scripts/optimize-fonts.py`; it does not alter the original source font.
