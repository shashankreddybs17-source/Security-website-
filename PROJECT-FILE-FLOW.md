# HI-TECH Protection Security ? Application structure

`index.html` loads `src/main.jsx`. The application selects Home, About, Services, Blog, FAQ or Contact from the URL. The shared React navbar and floating contact links remain available on every route.

Styles are defined in `src/styles/base.css`, `app.css`, `layout.css`, `theme.css` and component CSS modules. Tailwind supplies the shared Archivo font token and utilities.

`src/lib/interactions.js` owns native viewport reveals, rolling statistics, the marquee and keyboard-accessible FAQ disclosures. It initializes lazy-mounted pages and disposes observers and event listeners on cleanup. React components own navigation, service selection, the team carousel, count-up statistics and interactive galleries.

Images are managed in `src/data/approvedPhotos.js`, `responsiveImages.json` and `imageDescriptions.json`. Service content lives in `src/data/services.js` and `serviceDetails.js`.

Run `npm run build` for the production bundle and `npm test` for regression checks.
