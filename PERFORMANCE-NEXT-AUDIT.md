# Additional optimization audit and implementation plan

Baseline: previous three-run production medians, desktop 98 / mobile 90; LCP 1.054 / 3.685 seconds; CLS zero. The current working tree contains those completed optimizations and is preserved.

New findings before edits:

1. `src/main.jsx` statically imports Home, causing all homepage code/styles to enter the shared entry even on internal routes. Trial route splitting will be kept only if production layout/interaction checks and loading measurements remain acceptable.
2. No robots.txt or sitemap.xml exists. Initial HTML contains one generic description and no canonical/Open Graph metadata. Client titles already exist. Add shared route metadata, static HTML heads for known path routes at build time, and service-query updates without altering URLs/content.
3. Vercel uses the same one-day cache policy for both content-hashed application bundles and unversioned photos. Give hashed JS/CSS long immutable caching; retain revalidation for replaceable assets and HTML.
4. Existing route splitting, WebP srcsets, local subset font, lazy image loading, icon tree shaking, native animations, cleaned dependencies and scoped initialization are already implemented. Do not duplicate these changes.
5. No API backend, authentication, search API, data subscription, React Query, GSAP or active video is present. Avoid introducing infrastructure for non-existent features. Contact enquiry composes an email; newsletter signup remains an existing preview-only feature.

Plan: capture module composition using an in-process Rollup report; implement/test the changes above; inspect event cleanup and scrolling; rerun install/build/tests, computed-layout comparisons, route/mobile interaction tests, and repeated Lighthouse against production preview. Preserve original assets. Report local versus live-host verification separately. React DevTools Profiler is not installed in the isolated browser; use available browser performance tooling and code inspection, without claiming React DevTools profiling.
