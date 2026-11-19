import assert from 'node:assert/strict';
import test from 'node:test';
import {
  llmsText,
  pageMetadata,
  sitemapUrls,
  siteOrigin,
  structuredData,
} from '../src/data/siteMetadata.js';
import { allServices } from '../src/data/services.js';
import { seoBuildPlugin } from '../scripts/seo-build.mjs';
import { readFileSync } from 'node:fs';

test('development discovery endpoints bypass HTML fallback and preserve unrelated routes', () => {
  let middleware;
  seoBuildPlugin().configureServer({
    middlewares: {
      use: (handler) => {
        middleware = handler;
      },
    },
  });
  for (const path of ['/robots.txt', '/sitemap.xml?check=1', '/llms.txt']) {
    for (const method of ['GET', 'HEAD']) {
      let body;
      const headers = {};
      const response = {
        setHeader: (key, value) => {
          headers[key] = value;
        },
        end: (value) => {
          body = value;
        },
      };
      middleware({ url: path, method }, response, () => assert.fail('must not reach SPA fallback'));
      assert.equal(response.statusCode, 200);
      assert.ok(!headers['Content-Type'].includes('text/html'));
      if (method === 'HEAD') assert.equal(body, undefined);
      else if (path.startsWith('/robots')) assert.ok(body.includes('User-agent:'));
      else if (path.startsWith('/sitemap')) assert.ok(body.includes('<urlset'));
      else assert.ok(body.includes('Hi-Tech Protection Security'));
    }
  }
  let passed = false;
  middleware({ url: '/about-us', method: 'GET' }, {}, () => {
    passed = true;
  });
  assert.ok(passed);
});

test('service metadata and canonicals preserve every existing service query URL', () => {
  for (const service of allServices) {
    const meta = pageMetadata(
      '/services',
      `?service=${service.id}&tracking=ignored`,
      'https://example.com',
    );
    assert.notEqual(meta.title, `${service.title} | Hi-Tech Protection Security`);
    assert.notEqual(meta.description, service.text);
    assert.equal(meta.canonical, `https://example.com/services?service=${service.id}`);
  }
  assert.equal(pageMetadata('/faq/').canonical, pageMetadata('/faqs').canonical);
  assert.equal(pageMetadata('/contact').canonical, pageMetadata('/contact-us').canonical);
  assert.equal(
    pageMetadata('/services', '?service=unknown').title,
    'Security & Facility Management Services | Hi-Tech Protection',
  );
  assert.throws(() => siteOrigin('javascript:alert(1)'));
});

test('build emits unique sitemap URLs and crawl rules using the configured origin', () => {
  const origin = 'https://example.com';
  const urls = sitemapUrls(origin);
  assert.equal(urls.length, 20);
  assert.equal(new Set(urls).size, urls.length);
  const files = [];
  seoBuildPlugin(origin).generateBundle.call({ emitFile: (file) => files.push(file) });
  assert.match(
    files.find((file) => file.fileName === 'robots.txt').source,
    /Sitemap: https:\/\/example.com\/sitemap.xml/,
  );
  const xml = files.find((file) => file.fileName === 'sitemap.xml').source;
  assert.equal((xml.match(/<url>/g) || []).length, 20);
  assert.ok(xml.includes('service=gunman-services'));
  assert.match(files.find((file) => file.fileName === 'llms.txt').source, /https:\/\/example.com/);
  assert.match(llmsText(origin), /Business details/);
});

test('structured data describes the business and only the matching page type', () => {
  const faqSchema = structuredData('/faqs', '', 'https://example.com');
  assert.ok(faqSchema.some((item) => item['@type'] === 'ProfessionalService'));
  assert.ok(faqSchema.some((item) => item['@type'] === 'FAQPage'));
  const serviceSchema = structuredData(
    '/services',
    '?service=hotel-security',
    'https://example.com',
  );
  assert.ok(serviceSchema.some((item) => item['@type'] === 'Service'));
});

test('immutable cache policy applies only to hashed JS/CSS, while HTML revalidates', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const immutable = config.headers.find((rule) =>
    rule.headers.some((header) => header.value.includes('immutable')),
  );
  const pattern = new RegExp(
    '^/assets/' + immutable.source.slice('/assets/:file('.length, -1) + '$',
  );
  assert.ok(pattern.test('/assets/index-Ab_cd123.js'));
  assert.ok(pattern.test('/assets/About-Cc0Bs66w.css'));
  assert.ok(!pattern.test('/assets/hitech/new-uniform/bodyguards.webp'));
  assert.ok(!pattern.test('/assets/fonts/archivo-latin.woff2'));
  assert.ok(config.headers[0].headers[0].value.includes('must-revalidate'));
  assert.deepEqual(config.rewrites, [{ source: '/(.*)', destination: '/index.html' }]);
});
