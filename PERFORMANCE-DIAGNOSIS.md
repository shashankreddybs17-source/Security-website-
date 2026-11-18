# Measured production diagnosis — 13 November 2026

## Finding

I could **not reproduce a Performance score near 71 in the current production build**. No application changes were made during this audit. The production baseline already exceeds 90, so another speculative optimization would not establish or fix the cause of the different report.

Rebuilt with `npm run build`, then served that build with `npm run preview -- --host 127.0.0.1 --port 4273 --strictPort`. Verified HTTP 200, a hashed production entry and no Vite development client before measuring.

Six cold-navigation audits used Lighthouse **13.6.0** and a new isolated Edge **156.0.4314.58** headless profile on debugging port 9444, without extensions. Desktop preset: 40 ms RTT / 10,240 Kbps / 1x CPU; default mobile: 150 ms RTT / 1,638.4 Kbps / 4x CPU. No app animations, images or features were disabled. No app work, test suites or browser interaction checks ran concurrently with these six measurements. Lighthouse reported no warnings. Cache/storage reset behavior was left at Lighthouse defaults.

The user-provided report used Lighthouse 13.5.0 with unspecified **custom throttling** and did not include its audited URL. Its score is therefore not a controlled before/after comparator. The URL/settings were requested; no matching URL/configuration was supplied during this audit.

## Three-run medians

| Metric             |       Desktop |     Mobile |
| ------------------ | ------------: | ---------: |
| Performance scores | 100, 100, 100 | 96, 96, 96 |
| Median Performance |       **100** |     **96** |
| FCP                |       0.216 s |    0.765 s |
| LCP                |       0.736 s |    2.774 s |
| TBT                |          0 ms |      46 ms |
| CLS                |             0 |          0 |
| Speed Index        |       0.481 s |    1.558 s |

Exact metrics, settings, long tasks and score weights: `PERFORMANCE-DIAGNOSIS-RESULTS.json`. Full Lighthouse JSON reports, DevTools logs, trace files, HTML/build fingerprint and inspection scripts: ignored `tmp/measured-audit/`.

**The only mobile metric losing score points is LCP.** Its metric score is 0.83–0.84, weighted at 25%, costing approximately four Performance points. FCP, TBT, CLS and Speed Index each received a metric score of 1.0. Desktop metrics all received full metric scores. Mobile LCP remains above 2.5 s; that target is not claimed as achieved. INP is not inferred from lab TBT.

In the earlier pasted low-score report, TBT was zero and CLS was 0.003. Its lost points were therefore associated with loading metrics—LCP, FCP and Speed Index—not high JavaScript blocking or visible shifts. That report's specific causes cannot be assigned to this production artifact without its URL and throttling configuration.

## Exact LCP element and loading path

The LCP node is:

```text
section._hero_1cc66_5 > div._photo_1cc66_9 > picture > img
```

It is the instructor briefing five guards beside a fire extinguisher. The selected mobile resource is:

```text
/assets/hitech/new-uniform/responsive/corporate-security-briefing-768.avif
```

- Approximately 70.5 KB transferred, priority High.
- Typed responsive preload is discoverable in initial HTML.
- Eager loading, `fetchpriority="high"`, explicit dimensions and a WebP fallback are present.
- Only one hero resource downloads; no duplicate AVIF/WebP hero request.
- The original image framing/cover behavior remains unchanged.
- Only the 58 KB Latin Archivo font is downloaded. The full fallback font is not fetched.

The first mobile trace's LCP breakdown is TTFB 5.9 ms, resource discovery delay 40.6 ms, image loading 8.1 ms and element render delay 88.6 ms. These are **observed trace timings**, not components that sum to the 2.774 s Lantern-simulated LCP score. The observed render delay is larger than the observed image-loading duration; more lossy image recompression is not justified as the first next step.

The remaining simulated loading path includes the initial React/runtime bundle, stylesheet and rendering the image element. The separate below-the-fold Home chunk is already outside the hero's Suspense boundary. The earlier held-chunk test confirmed the hero can display before that chunk arrives.

## JavaScript, long tasks and reflow

Desktop: **no long tasks in all three runs** and TBT zero.

Mobile long-task examples, as reported by Lighthouse under simulation:

- Main entry bundle: 106–143 ms tasks in the sampled runs.
- Other main-entry tasks: 52–71 ms.
- Home chunk: 52–53 ms in runs 2 and 3.
- HTML/unattributable work: 52–85 ms.

The largest main-entry tasks occur around 5.1–5.5 s in these simulated timelines, after the LCP. They do not explain a 71 score in this build; median TBT is 46 ms and receives full metric points. The entry includes React/React DOM, navbar, shared image metadata and native initialization. No third-party scripts were requested.

Lighthouse also identifies a forced-layout call site in `Home-Cnrpc9gl.js` at zero-based line 30, column 7024, totaling about 51 ms in the first mobile sample. Other Home call sites contribute under 1 ms each in that sample. A forced-reflow diagnostic is not itself a score penalty; the associated timing is already represented in measured work. It does not establish that scroll listeners cause the user's low score, and no scroll behavior was changed on that assumption.

## Bundle sizes

| Resource                             | Raw bytes | Gzip bytes |
| ------------------------------------ | --------: | ---------: |
| Main entry `index-DTCJKI9G.js`       |   275,436 |     82,889 |
| Home `Home-Cnrpc9gl.js`              |    58,867 |     14,890 |
| All JS routes/shared chunks combined |   418,427 |    122,969 |
| Main stylesheet                      |    64,481 |     12,501 |
| Home stylesheet                      |    38,833 |      7,448 |
| All CSS chunks combined              |   149,476 |     31,836 |

These are whole-build sums where stated, not all initial-route downloads. Content hashes are retained. JavaScript minification checks pass in every production run. Unused CSS savings are zero in the sampled audit.

The earlier report's **1,282 KiB minification saving** cannot describe this application's current minified JS files alone: every route's JS combined is about 409 KiB raw. This is evidence of a different served artifact, environment or additional injected resources—not proof that the current production minifier is broken. It must be resolved by matching the report URL, files and settings.

## Insights and remaining resources

- Unused JavaScript estimate: approximately **31 KB**, predicted mobile LCP saving 350 ms. Some represents React runtime paths and shared interactive behavior; do not delete runtime/library code based on navigation coverage alone. Splitting/removing it would need a separate measured experiment.
- Render-blocking stylesheet estimate: **150 ms FCP**, **zero estimated LCP saving** in the sampled mobile run. Deferring all CSS would risk flashes and layout shifts and is not warranted here.
- Image-delivery estimate: approximately **333 KiB**, **zero estimated LCP saving** in the sampled mobile run. Largest item is the below-the-fold supervisor card photo (`supervisors-768.webp`, approximately 209 KB). Other flagged images are service/introduction photos, not the hero.
- Initial requests contain eight images, no videos and no third-party resources. Detailed requests are retained in the JSON/DevTools log.
- Gallery modal full-resolution images are not loaded at startup; the CTA background no longer competes with initial resources. Nearby service-card images load under the browser's native lazy-loading proximity policy.
- DOM-size audit passes: approximately 1,070 elements, depth 17. Below-the-fold sections render initially, but this audit does not establish excessive DOM as a scoring bottleneck. Deleting or replacing them with guessed-height placeholders would risk the exact layout and scrolling requirements.
- CLS zero: there are no measured shift culprits to fix in these production runs.

## Decision and next measurable experiment

**No new source optimization was implemented**, because the required baseline is already 100/96 and the reported 71 is not reproduced. This avoids another generic change and preserves the exact design, animations and scrolling. The successful production build was regenerated; existing source edits were not reverted.

The first required diagnostic step for the 71 is the exact audited URL and exported Lighthouse JSON, including custom throttling. Compare its entry script to `index-DTCJKI9G.js` and confirm it does not load `/@vite/client`, `/src/main.jsx`, React Refresh or unminified React development files. Live Vercel results require the current source to have been deployed; a local preview score is not a live-site score.

If further improving the current mobile LCP is desired, the next controlled experiment is to reduce the critical initial JS/render dependency, for example by rendering the existing hero into initial HTML and hydrating identical markup. That is a rendering-architecture change requiring visual/hydration/scroll checks, not a safe recommendation to blindly add more lazy imports. Measure it against this baseline, one change at a time, and retain it only if it improves LCP without regressions.

A secondary bandwidth-only experiment would optimize delivery of the supervisor photo while keeping its original source and framing; the current Lighthouse estimate predicts **no LCP gain**, so it should not be sold as the fix for the score of 71.

## Reproduction

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4273 --strictPort
```

Run three audits for each mode against `http://127.0.0.1:4273/`, retaining default navigation/storage behavior and distinct output filenames. The pinned CLI used here was `lighthouse@13.6.0`, with `--preset=desktop` for desktop and default mobile settings for mobile, plus `--save-assets` to retain traces. Do not substitute development port 5173 or mix custom-throttled and standard-preset scores in one comparison.
