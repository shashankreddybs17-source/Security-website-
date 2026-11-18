# Supplied photograph refresh — November 2026

The live site uses the new photographs in
`public/assets/hitech/new-uniform/november-2026/`. Existing layouts, captions,
animations, navigation and company/client logos were preserved.

## Sources and placement

| Supplied source               | Website asset                            | Main uses                                                            |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| PDF page 1                    | `women-security-personnel.webp`          | Residential service and company/team sections                        |
| PDF page 2                    | `security-guard-building-entrance.webp`  | About introduction and About gallery                                 |
| PDF page 3                    | `security-guards-outdoor-formation.webp` | Industrial service, Contact banner, gallery and operations article   |
| PDF page 4                    | `security-team-indoor-briefing.webp`     | About/Home galleries and training article                            |
| PDF page 5                    | `security-team-wide-briefing.webp`       | FAQ banner and outdoor briefing photographs                          |
| PDF page 6                    | `security-team-outdoor-briefing.webp`    | Hotel service, company introduction and outdoor briefing photographs |
| PDF page 7                    | `corporate-security-briefing.webp`       | Homepage hero and Corporate Office Security                          |
| PDF page 8                    | `gate-security.webp`                     | About banner, Bank Security and Event Management Services            |
| PDF page 9                    | `commercial-screening.webp`              | Commercial Security and existing closing CTA background              |
| PDF page 10                   | `housekeeping-lobby.webp`                | Housekeeping Services                                                |
| WhatsApp 11.05.45 AM (2) JPEG | `fire-response.webp`                     | Featured article photograph                                          |
| WhatsApp 11.05.45 AM (1) JPEG | `fire-demonstration.webp`                | About training, Home gallery and article thumbnail                   |
| WhatsApp 11.05.45 AM JPEG     | `bodyguards.webp`                        | Bodyguard Services and personnel photographs                         |
| WhatsApp 11.05.43 AM JPEG     | `entrance-screening.webp`                | Retained in the approved asset archive                               |
| `nw 1 .HEIC`                  | `site-security-portrait.webp`            | Retained in the approved asset archive                               |
| `nw 2 .HEIC`                  | `residential-security.webp`              | Contact enquiry photograph                                           |

The duplicate WhatsApp copy was not imported twice. The pasted gunman photograph
matches the existing approved `new-uniform/gunman.webp`, which remains in use.

### Confirmed supervisors

The subsequently supplied `WhatsApp Image 2026-11-17 at 1.46.08 PM.jpeg` replaces
the placeholder team profiles. The owner confirmed Vinayak B is on the left and
Gopal is on the right. Both are labelled **Supervisor**; no additional job titles
were assigned. Individual portrait crops and a shared 4:3 photograph are stored
in `public/assets/hitech/supervisors/`, with responsive WebP variants and alt text.

`src/data/supervisors.js` manages the two names, portrait paths and shared photo.
The shared photo is used by Supervisor Services on Home, the Services landing
page and the service detail page. The existing mobile carousel remains usable;
desktop arrows are hidden when both available supervisors are visible.

This update changed `HomeTeamSection.jsx`, `services.js`, the two image metadata
JSON files and the existing approved-photo test, and added `supervisors.js` and
the supervisor assets. It was verified at 320px, 390px, 768px and 1440px, with
correct names, image loading and mobile next/previous navigation. Build and all
56 existing tests passed.

PDF photographs were extracted from their original embedded image streams;
page-number strips were removed without cropping the photograph. HEIC files were
decoded to their original upright dimensions. No photos were generated or
uniforms retouched for this refresh.

## Delivery and shared references

- `src/data/approvedPhotos.js` keeps repeated photographs consistent across pages.
- `src/data/services.js` supplies the same image to landing cards, detail pages and
  Home service components.
- `src/data/responsiveImages.json` provides image dimensions, responsive WebP
  variants and portrait crop positions; `imageDescriptions.json` supplies alt text.
- The homepage also has AVIF variants. `heroAvif.json` and `index.html` reference
  matching preload candidates. `scripts/optimize-hero.py` targets the new hero.
- Fresh asset URLs prevent cached versions of the previous photographs from
  appearing after deployment. Previous asset files and the original supplied
  files were retained.
- The existing image optimizer preserves portrait crop positions when regenerating
  the responsive manifest.

## Files changed

- Assets: `public/assets/hitech/new-uniform/november-2026/` (16 photographs,
  responsive WebP sizes and six AVIF hero files).
- Data: `approvedPhotos.js`, `services.js`, `blogPosts.js`, `heroAvif.json`,
  `responsiveImages.json` and `imageDescriptions.json` in `src/data/`.
- Components: `AboutAboutSection.jsx`, `AboutHeroSection.jsx`,
  `AboutTrainingSection.jsx`, `ContactEnquirySection.jsx`, `HomeCtaSection.jsx`,
  `HomeHeaderHeroSection.jsx`, `HomeHomeAboutSection.jsx`, `HomeTeamSection.jsx`,
  `HomeWorkGallery.jsx` and `ResponsiveImage.jsx` in `src/components/`.
- Pages: `src/pages/Contact.jsx` and `src/pages/Faq.jsx`.
- Delivery: `index.html`, `scripts/optimize-hero.py` and
  `scripts/optimize-images.py`.
- This report: `docs/PHOTO-REFRESH.md`.

## Verification

Production build and all 56 existing tests passed. The production preview was
checked at 320px and 1440px across Home, About, Contact, FAQ, Blog, the Services
landing page and all 11 individual services. No broken photo requests, retired
photo references in rendered pages, horizontal overflow or browser exceptions
were found. All six Home gallery images and navigation were checked; modal
dimensions remain constant while switching images.
