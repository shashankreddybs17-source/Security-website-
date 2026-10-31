# Homepage enhancements

## Placement

All four new sections are placed together immediately after the existing detailed Services section and before Our Clients:

1. Our Services — “PROTECTION FOR EVERY PURPOSE.” A compact, image-led overview of the six existing service areas.
2. Who We Are — “BUILT ON TRUST. DRIVEN BY PROTECTION.” Company introduction and Mission, Vision and Core Values accordions.
3. Why Choose Us — “WHY CHOOSE HI-TECH?” Four feature cards and an existing Contact-page CTA.
4. Our Work — “PROTECTION IN ACTION.” Six-photo expanding gallery with keyboard-accessible full-image viewing.

The existing About and Services sections are preserved as requested. The new service overview provides a compact browsing view; it links back to the existing detailed Services section. Original sections keep their original relative order.

## Files

- Modified: `src/pages/Home.jsx` — imports and insertion of the four sections only.
- Created: `src/components/HomeEnhancements.jsx` — section components, content and interactions.
- Created: `src/components/HomeEnhancements.module.css` — styles scoped to the new sections.
- Created: `HOMEPAGE-ENHANCEMENTS.md` — this report.

No dependencies, generated images, global styles or other page changes were added.

## Reused content and assets

The six service areas are hotels, banks/financial institutions, corporate offices, factories/industrial units, commercial buildings and residential apartments. They match the existing site and supplied company brochure.

Company content draws from the existing About page and supplied brochure: Bengaluru location, association with Hi-Tech Security Force, experienced Ex-Army management, selected/trained personnel, site-specific requirements, and discipline, vigilance, responsibility, integrity and professionalism. Mission/Vision/Values text summarizes these supplied objectives. No new certifications, performance figures, testimonials or service claims are introduced.

Original client photographs used: `team-10`, `team-13`, `team-14`, `team-15`, `team-23`, `team-24`, `team-26`, `team-28` and `team-31`, all from `public/assets/hitech/`. No phone-watermarked images are selected.

The gallery has no image filters, opacity reduction or dark overlays. Its photographs retain natural colors. Tall previews crop proportionally; selecting a photograph shows the full original with `object-fit: contain`.

## Interaction and accessibility

- Services link to the existing `/#services` section; About and Contact buttons use `/about-us` and `/contact-us`.
- Accordion buttons expose their expanded state and controlled panel; all controls are keyboard accessible.
- Feature cards use restrained hover highlights rather than repeating the accordion pattern.
- The gallery expands on hover or keyboard focus. Mobile uses horizontal scroll with snap points and full-photo viewing.
- The native modal supports Escape, focus containment and returning focus to its trigger.
- New scroll-entry effects respect reduced-motion preferences. Gallery photographs have no reveal opacity effect.
- Existing theme tokens, container widths, fonts and responsive breakpoints are reused. Original components and global styles are unchanged.

## Validation

Production build passes. Every referenced image was opened/decoded successfully. All four sections occur once, and the original homepage section order is preserved. Baseline hashes confirm that `src/pages/Home.jsx` is the only pre-existing source file modified.

Browser verification could not run because the browser connection tool failed. Desktop/tablet/mobile rendering, hover interactions, accordion transitions and modal behavior therefore still need visual confirmation in the local preview; these are not claimed as browser-tested.
