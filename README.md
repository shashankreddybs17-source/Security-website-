# HI-TECH Protection Security — Website Guide

A responsive security-company website for HI-TECH Protection Security, Bengaluru. The visual identity uses warm cream, deep navy and yellow, with client photography and a shared sticky navbar.

## Technologies

| Technology                     | Purpose                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------- |
| React 19 + JavaScript/JSX      | Reusable components, pages and interactive controls                          |
| Vite 6                         | Local development server and production builds                               |
| CSS Modules + standard CSS     | Section styling, responsive layouts and theme tokens                         |
| Tailwind CSS 4                 | Selected utility classes; preflight is disabled to preserve existing styling |
| Lucide React                   | Icons                                                                        |
| Local Webflow runtime + jQuery | Retained template sliders, lightboxes and some animations                    |
| Google Maps iframe             | Address-based map on the Contact page                                        |

There is currently no connected backend, database or CMS. Some interactions use React; others rely on the locally bundled Webflow runtime.

## Fonts

- **DM Sans:** body text, navigation and form fields; clean sans-serif style.
- **Archivo:** headings, selected buttons and numbered labels; bold sans-serif style.
- The Archivo and DM Sans variable fonts and their open-font licenses are hosted locally in `public/assets/fonts/` and declared in `src/styles/fonts.css`.
- Navbar links: **18px desktop**, **16px compact desktop**, **18px mobile**. Other text sizes adapt by section and screen width.

## Colors

| Use                                  | Color                | Theme token      |
| ------------------------------------ | -------------------- | ---------------- |
| Light backgrounds                    | Cream `#FDF9F1`      | `--site-cream`   |
| Dark backgrounds and main text       | Deep navy `#070616`  | `--site-navy`    |
| Buttons, active states and accents   | Yellow `#F3DF04`     | `--site-yellow`  |
| Supporting text on light backgrounds | Gray `#5D5C5C`       | `--site-muted`   |
| Subtle borders                       | Light gray `#DFDFDF` | `--site-border`  |
| Raised dark panels                   | Dark navy `#111020`  | `--site-surface` |

Theme values live in `src/styles/theme.css`. Supporting text on dark panels uses lighter neutrals for readability.

## Pages and features

- **Home:** `/`
- **About Us:** `/about-us`
- **Services:** `/services`
- **Blog:** `/blog`, with individual articles at `/blog/article-slug`
- **FAQ:** `/faqs`
- **Contact Us:** `/contact-us`

Navigation uses clean page URLs. Older homepage hash links resolve to their corresponding pages. The site includes mobile navigation, service panels, accordions, photo galleries, carousel controls and scroll-driven sections. Reduced-motion preferences are supported in custom effects.

The six service areas are hotels, banks, corporate offices, industrial units, commercial buildings and residential apartments.

## Forms and content

- The Contact form prepares an **email draft**; the visitor must review and send it. A text-file download is available as a fallback.
- Newsletter submission is **preview-only** and does not register subscribers.
- Demo staff profiles, sample statistics and draft blog content remain in some sections; replace these with verified company information before publication.
- Most photos come from the client ZIP. The home hero uses an AI-enhanced version of a supplied team photo. Originals remain available.

## Editing and running

| Location                | What to edit                                                             |
| ----------------------- | ------------------------------------------------------------------------ |
| `src/pages/`            | Page compositions and page-specific content                              |
| `src/components/`       | Navbar, sections and their CSS Modules                                   |
| `src/data/blogPosts.js` | Blog article content                                                     |
| `src/styles/theme.css`  | Shared colors                                                            |
| `src/styles/layout.css` | Shared spacing; full intervals are 96/80/64/48px across responsive sizes |
| `public/assets/hitech/` | Company logo, photos and brochure                                        |
| `src/main.jsx`          | Page selection and shared application setup                              |

Use `npm.cmd run dev` on Windows to start the local server. Use `npm.cmd run build` to generate `dist/`, and `npm.cmd run preview` to preview that build. On other shells, `npm` works in place of `npm.cmd`.

Deploy `dist/` to a static host with an **SPA fallback to `index.html`**, so direct visits and refreshes on `/services`, `/blog`, and other page URLs work. Do not edit `node_modules/` or generated `dist/` files; edit `src/` and rebuild.

## Deploying to Vercel

The project is configured for Vercel in `vercel.json`. It builds as a static Vite website; no server, database, API keys or environment variables are required for the current features.

1. Push this project to your Git provider, including `src/`, `public/`, `index.html`, `vite.config.js`, `reference-metadata.json`, `package.json`, `package-lock.json` and `vercel.json`.
2. In Vercel, import the repository as a new project. Choose the directory containing `package.json` as the **Root Directory** (leave the default if this project is the repository root).
3. Use these settings, already specified by the project configuration:

   | Setting               | Value           |
   | --------------------- | --------------- |
   | Framework Preset      | Vite            |
   | Node.js               | 24.x            |
   | Install Command       | `npm ci`        |
   | Build Command         | `npm run build` |
   | Output Directory      | `dist`          |
   | Environment Variables | None required   |

4. Click **Deploy**. The SPA rewrite sends page URLs to `index.html` so the app can display the correct page. Existing photos, fonts, PDFs, JavaScript and CSS are served from the build output.
5. Open and refresh `/about-us`, `/services`, `/blog`, an individual blog article, `/faqs` and `/contact-us` on the deployed domain. Check the mobile menu, animations and Contact page map.

For a CLI deployment instead, run `npx vercel` from this project directory and follow the prompts for a preview. Run `npx vercel --prod` when ready to publish production. The `.vercelignore` file excludes temporary files, local dependencies, old builds and editor files from CLI uploads. Keep `public/` in the project; Vite copies its assets into `dist/` during the build.

Use Node 24 locally to match Vercel (`.nvmrc` is included for Node version managers). Commit `package-lock.json`; `npm ci` installs the locked dependency versions. Do not set `NODE_ENV=production` for the installation step, because the Vite build needs the development dependencies.

Deployment preserves the current form behavior: Contact prepares a mail draft and newsletter signup is preview-only. Hosting on Vercel does not add a form backend. No production domain is hard-coded, so Vercel preview URLs and a later custom domain use the same build.

Configuration references: [Vercel Vite SPA routing](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas), [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Code formatting

Run `npm.cmd run format` to format project source, styles, configuration and documentation. Run `npm.cmd run format:check` to check formatting without editing files. Prettier ignores dependencies, generated builds, temporary files and public vendor/assets.

VS Code workspace settings enable format on save with the recommended **Prettier - Code formatter** extension (`esbenp.prettier-vscode`). Install that extension to enable automatic formatting in the editor.

Original template, vendor and third-party asset rights remain with their respective owners.
#   S e c u r i t y - w e b s i t e -  
 