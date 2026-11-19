# SEO, AEO and AI-search deployment checklist

The application generates the following files at the root of the production site:

- `/robots.txt` — permits crawling and points to the sitemap.
- `/sitemap.xml` — lists every public page, service selection and blog article.
- `/llms.txt` — a concise, factual reference for AI tools that choose to use the emerging convention.

## Before deploying

1. In Vercel, open **Project settings → Environment Variables**.
2. Set `VITE_SITE_URL` to `https://htpsecurity.in` for **Production**. Set it for Preview as well if preview URLs should generate their own canonical URLs.
3. Deploy the project.
4. Confirm these respond with status 200 and use the production domain:

   - `https://htpsecurity.in/robots.txt`
   - `https://htpsecurity.in/sitemap.xml`
   - `https://htpsecurity.in/llms.txt`

## Search-engine setup

1. Add `htpsecurity.in` as a **Domain property** in Google Search Console and verify it with DNS.
2. Submit `https://htpsecurity.in/sitemap.xml` in Search Console.
3. Add or import the site in Bing Webmaster Tools and submit the same sitemap.
4. Create and verify the Google Business Profile using the same name, address and phone number that appear on the website.
5. Use Search Console URL Inspection to request indexing for the home, services, contact, FAQ and each blog page after the first deployment.

## Content rules for future pages

- Write a clear answer to the page's main question in the opening paragraph.
- Use one H1, descriptive H2s, factual service details and meaningful image alt text.
- Add internal links to the relevant service, FAQ and contact pages.
- Add a new public URL to the route/data sources so it is included in the generated sitemap.
- Keep business contact details consistent with the Google Business Profile.
- Do not add invented ratings, reviews, service areas, opening hours, licences or claims to schema or page content.

`llms.txt` does not guarantee inclusion in any AI answer. Search engines and AI features still depend primarily on crawlable, useful pages, accurate business facts and site authority.
