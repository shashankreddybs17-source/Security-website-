# Native site cleanup

The application now uses first-party React, CSS and browser APIs. The previous bundled animation scripts, template page identifiers, metadata/asset manifests and unused source copies were removed. Shared platform-prefixed class names were replaced consistently in markup and styles while retaining existing layout values and breakpoints.

`src/lib/interactions.js` initializes viewport reveals, About statistics, the marquee and accessible FAQ disclosures, including lazy-mounted routes. The existing React navbar, service tabs, team carousel, statistics and galleries remain component-owned. Reduced-motion preferences and cleanup are supported.

Global base styles live in `src/styles/base.css`. Imported generic button styles use `ui-button` to avoid colliding with the site's composed button class. Tailwind emits the Archivo font token statically and scans the HTML entry.

Validation: 50 automated tests pass. Headless production checks cover six main routes at 320, 375, 390, 430, 768 and 1440px; no horizontal overflow, hidden visible reveal content or browser exceptions. Additional checks cover mobile menu locking/restoration, services submenu, service tabs, team carousel and reduced motion, plus all eleven service detail URLs at 320 and 1440px. Desktop and mobile screenshots were inspected. Production build passes.

Run `npm test` and `npm run build` before deployment.
