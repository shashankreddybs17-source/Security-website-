import {
  defaultSiteOrigin,
  pageMetadata,
  siteOrigin,
  sitemapUrls,
  siteName,
  llmsText,
} from '../src/data/siteMetadata.js';

const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char],
  );

export function seoBuildPlugin(originValue = defaultSiteOrigin) {
  const origin = siteOrigin(originValue);
  const discoveryFiles = {
    '/robots.txt': {
      type: 'text/plain; charset=utf-8',
      source: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    },
    '/sitemap.xml': {
      type: 'application/xml; charset=utf-8',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls(
        origin,
      )
        .map((url) => `  <url><loc>${escape(url)}</loc></url>`)
        .join('\n')}\n</urlset>\n`,
    },
    '/llms.txt': {
      type: 'text/plain; charset=utf-8',
      source: llmsText(origin),
    },
  };
  return {
    name: 'site-discovery-metadata',
    configureServer(server) {
      // These endpoints must precede Vite's SPA fallback, including in development.
      server.middlewares.use((request, response, next) => {
        const file = discoveryFiles[request.url?.split('?')[0]];
        if (!file || !['GET', 'HEAD'].includes(request.method)) return next();
        response.statusCode = 200;
        response.setHeader('Content-Type', file.type);
        response.end(request.method === 'HEAD' ? undefined : file.source);
      });
    },
    transformIndexHtml(html) {
      const meta = pageMetadata('/', '', origin);
      return {
        html,
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: meta.canonical }, injectTo: 'head' },
          ...Object.entries({
            title: meta.title,
            description: meta.description,
            url: meta.canonical,
            image: meta.image,
            type: 'website',
            site_name: siteName,
          }).map(([key, content]) => ({
            tag: 'meta',
            attrs: { property: `og:${key}`, content },
            injectTo: 'head',
          })),
        ],
      };
    },
    generateBundle() {
      for (const [path, file] of Object.entries(discoveryFiles))
        this.emitFile({ type: 'asset', fileName: path.slice(1), source: file.source });
    },
  };
}
