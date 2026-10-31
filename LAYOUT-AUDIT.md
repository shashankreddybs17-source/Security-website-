# Website spacing and background audit

## Routes inspected

Source/layout inspection and HTTP app-shell checks covered Home (`/`), About (`/about-us`), Blog (`/blog`), all three existing blog articles, FAQ (`/faqs`, alias `/faq`), and Contact (`/contact-us`, alias `/contact`). All returned HTTP 200 from the existing localhost preview.

Services currently lives at `/#services`; there are no standalone service or service-detail routes. Its existing content and scroll timeline remain intact.

## Root causes and corrections

- **Home team carousel:** all slides remain in normal flow, so the tallest inactive portrait card reserved height even when shorter cards were visible. A small layout hook now measures only active cards and includes their existing vertical transform offset. It updates after slider navigation, image loading, font readiness and resizing. Images and slide animations are unchanged.
- **Carousel controls:** desktop wrappers reserved `8vw` below the slider, while arrows used an equivalent negative bottom margin. The controls now occupy an 80px area inside the slider. No new negative margins were introduced.
- **Carousel-to-blog gap:** the carousel and Blog section wrappers stacked 150–200px padding on each side of their boundary. Neighboring light sections now use half of a shared section interval on each side.
- **About approach background:** the full-section pale yellow (`--_primary-color---50`) is replaced by the site's existing cream (`--background`, `#fdf9f1`). Yellow highlights, cards, images and interactive steps are preserved.
- **About spacing:** the introduction's outer/inner spacing and the newer About components now use the same content-spacing tokens, with smaller intervals between adjacent light sections.
- **Other content sections:** the new homepage blocks, client strip, Contact sections, Blog banner/articles, FAQ wrappers, story and CTA use consistent responsive spacing. The dark/light hierarchy is preserved.

## Responsive spacing

| Viewport | Section interval | Half interval between neighboring light sections |
| -------- | ---------------- | ------------------------------------------------ |
| 1440px   | 96px             | 48px                                             |
| 1024px   | 80px             | 40px                                             |
| 768px    | 64px             | 32px                                             |
| 390px    | 48px             | 24px                                             |

Tokens are scoped to `.main-wrapper`; navbar and footer styling does not inherit them. No global font or color tokens changed. New selectors target the affected sections directly.

## Files

Created:

- `src/styles/layout.css`
- `src/lib/useVisibleSliderHeight.js`

Modified:

- `src/main.jsx` — imports the scoped layout corrections.
- `src/components/HomeTeamSection.jsx` — attaches the content-height hook; existing markup/content unchanged.
- `src/components/AboutReplacements.module.css` — cream background and section spacing only.
- `src/components/HomeEnhancements.module.css` — outer section spacing only.
- `src/components/HomePartnersSection.module.css` — outer section spacing only.
- `src/components/ContactEnquirySection.module.css` — outer section spacing only.
- `src/pages/Contact.module.css` — outer section spacing only.
- `src/pages/Blog.module.css` — banner/article spacing only.

## Preserved

Page compositions and routes; section order; hero; navbar and logo; footer design; all copy, photographs and aspect ratios; buttons and destinations; forms; carousel arrows, autoplay and transitions; hover interactions; existing vendor runtimes and animation timelines.

The Services scroll runway and About horizontal-gallery scroll runway are intentional animation space, so their heights were not shortened. Backgrounds that provide meaningful dark/light contrast, image-caption treatments and yellow interactive accents are retained.

## Verification and limits

- Production build: passed.
- Active-slide sizing: checked with tall-to-short navigation, delayed image sizing, resizing, initialization fallback, existing stagger offsets and observer cleanup.
- CSS parsing and spacing-rule evaluation: passed at 1440, 1024, 768 and 390px.
- Route HTTP checks: all existing routes return the application shell successfully.
- Baseline comparison: confirms all page compositions, existing copy, image references, navigation, forms, hero, footer, Services animation markup and About scroll-gallery code remain unchanged.

The browser tool failed to connect. Desktop/mobile rendering, before/after screenshots, visual overflow, live carousel movement, accordion behavior and modal/form interactions could not be verified in a rendered browser. HTTP checks confirm routing availability, not client rendering. Responsive checks above evaluate stylesheet rules, not screenshots. Review the updated local preview for final visual confirmation.
