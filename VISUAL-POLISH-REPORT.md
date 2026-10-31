# Visual consistency and navbar refinement

## What changed

The website uses its actual existing palette: cream `#fdf9f1`, deep navy `#070616`, brand yellow `#f3df04`, existing neutral gray `#5d5c5c`, subtle neutral borders, and the Contact panel surface `#111020`.

A shared theme layer reuses these values. The dark semantic token now resolves to the established navy, so main dark text, the story background and footer band no longer use a separate near-black. Pale-yellow full-page styling was already corrected in the preceding spacing task; the remaining pale-yellow homepage accordion fill is now cream with its yellow active border retained. Brown/olive supporting text was normalized to existing neutral/navy values where appropriate. Dark-panel supporting text stays lighter for readability. Photography and intentional image-caption gradients remain intact.

One reusable navbar now renders before page wrappers on every route. The old headers were removed from rendered pages; their source component remains unused for reference. The new design has the original logo on the left, six centered route links, and a yellow GET A QUOTE button. It uses a solid navy inset shell on cream, yellow active indicators and subtle hover lines. It stays sticky without changing height; scrolling only changes its border/shadow.

At widths below 992px, the mobile menu provides all six links and the quote CTA. It supports keyboard focus, Escape, selecting a link, background-click dismissal, viewport-resize dismissal, body scroll locking and scrollbar-width compensation. The collapsed menu is inert and hidden from assistive technology. No new libraries were installed.

The footer's excessive 100–120px wide-screen vertical padding is capped at 72px while keeping its layout/content. A leftover Webflow clearfix on the flex-based home hero caption was removed to prevent empty flex items from adding gaps, particularly when stacked on mobile. The prior content-driven carousel sizing and shared content-spacing system are retained unchanged. Intentional Services and About-gallery scroll runways are preserved.

## Preserved

The complete home hero photograph/caption markup is identical after removing the old embedded header. Existing company copy, services, addresses, phone/email, image assets, forms and their handlers, Google Maps URLs/iframe, page routes, section ordering and footer content remain unchanged. No WhatsApp feature was added or removed. Existing carousel adapter, animation runtimes and scroll effects outside the navbar were not modified.

## Files

Created:

- `src/components/SiteNavbar.jsx`
- `src/components/SiteNavbar.module.css`
- `src/lib/navigation.js`
- `src/styles/theme.css`

Modified:

- `src/main.jsx`
- `src/components/AboutReplacements.module.css`
- `src/components/ContactEnquirySection.module.css`
- `src/components/HomeEnhancements.module.css`
- `src/components/HomeHeaderHeroSection.jsx`
- `src/components/HomeHeaderHeroSection.module.css`
- `src/pages/About.jsx`
- `src/pages/Blog.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Contact.module.css`
- `src/pages/Faq.jsx`
- `src/pages/Services.jsx`

## Pages checked

Home, About, Services, Blog listing and all three articles, FAQ and Contact; existing `/faq` and `/contact` aliases. All return the application shell with HTTP 200 from the local server. Services remains `/services`, with other page routes and legacy-hash handling preserved.

## Validation

- Production build: passed.
- Navbar handler checks: passed for all route links, article/alias active states, opening, focus containment in both Tab directions, Escape, selection close, resize close, scroll state, scroll-lock padding compensation and cleanup.
- Responsive stylesheet rules: desktop links/CTA at 1440px and 1024px; mobile menu/CTA at 768px and 390px.
- Preservation checks: page body markup equals baseline after removing legacy headers; home hero photo/caption, footer content, contact form, map, Services markup, carousel adapter, existing animation code, routes and article data are unchanged.

The in-app browser connection failed, so rendered desktop/tablet/mobile comparisons, before/after screenshots, live z-index/overflow checks and final visual confirmation could not be performed. Handler tests simulate the component's actual event logic and stylesheet tests evaluate breakpoints; they are not browser screenshots. Review the updated local preview before client presentation.
