import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { assetReferences, assertExactFile as exactFile } from './asset-references.mjs';
import { sitemapUrls } from '../src/data/siteMetadata.js';

const files = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });

const sourceFiles = [...files('src'), ...files('scripts'), 'index.html', 'vite.config.js'];
const assets = new Set();
let importCount = 0;
for (const path of sourceFiles) {
  const source = readFileSync(path, 'utf8');
  for (const asset of assetReferences(source)) {
    if (/\.(?:avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|woff2?|ttf|pdf)$/i.test(asset))
      assets.add(asset);
  }
  for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(?\s*)['"](\.[^'"]+)['"]/g)) {
    const base = resolve(dirname(path), match[1]);
    const candidates = extname(base)
      ? [base]
      : [
          base,
          `${base}.js`,
          `${base}.jsx`,
          `${base}.json`,
          join(base, 'index.js'),
          join(base, 'index.jsx'),
        ];
    const found = candidates.find((candidate) => {
      try {
        return statSync(candidate).isFile();
      } catch {
        return false;
      }
    });
    assert.ok(found, `Unresolved import ${match[1]} in ${path}`);
    exactFile(found);
    importCount++;
  }
  assert.doesNotMatch(
    source,
    /(?:https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?|file:\/\/|[A-Z]:\\Users\\)/i,
    `Local-only URL in ${path}`,
  );
}
for (const asset of assets) {
  exactFile(`public${asset}`);
  exactFile(`dist${asset}`);
}
const publicFiles = files('public');
for (const path of publicFiles) {
  const output = join('dist', relative('public', path));
  exactFile(output);
  assert.ok(
    readFileSync(path).equals(readFileSync(output)),
    `Public asset differs in dist: ${path}`,
  );
}

const pkg = JSON.parse(readFileSync('package.json'));
const lock = JSON.parse(readFileSync('package-lock.json')).packages[''];
for (const key of ['dependencies', 'devDependencies', 'engines'])
  assert.deepEqual(pkg[key], lock[key], `package-lock.json ${key} is out of sync`);
const config = JSON.parse(readFileSync('vercel.json'));
assert.equal(config.framework, 'vite');
assert.equal(config.installCommand, 'npm ci');
assert.equal(config.outputDirectory, 'dist');
assert.ok(
  config.rewrites.some((rule) => rule.source === '/(.*)' && rule.destination === '/index.html'),
);
const html = readFileSync('dist/index.html', 'utf8');
assert.match(html, /\/assets\/index-[\w-]+\.js/);
assert.doesNotMatch(html, /\/@vite\/client|\/src\/main\.jsx/);
assert.match(
  readFileSync('dist/robots.txt', 'utf8'),
  /^User-agent: \*\nAllow: \/\nSitemap: https?:\/\//,
);
assert.match(readFileSync('dist/sitemap.xml', 'utf8'), /<urlset/);
assert.match(readFileSync('dist/llms.txt', 'utf8'), /Hi-Tech Protection Security/);

if (process.argv[2]) {
  const origin = new URL(process.argv[2]).origin;
  const paths = [
    ...new Set([
      '/',
      '/faq',
      '/contact',
      ...sitemapUrls().map((url) => new URL(url).pathname + new URL(url).search),
    ]),
  ];
  for (const path of paths) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type') || '', /text\/html/, path);
    assert.match(await response.text(), /id="root"/, path);
  }
  const requests = [...assets, '/robots.txt', '/sitemap.xml', '/llms.txt'];
  for (let start = 0; start < requests.length; start += 8)
    await Promise.all(
      requests.slice(start, start + 8).map(async (path) => {
        const response = await fetch(origin + path);
        assert.equal(response.status, 200, path);
        assert.doesNotMatch(
          response.headers.get('content-type') || '',
          /text\/html/,
          `Asset returned SPA HTML: ${path}`,
        );
        await response.arrayBuffer();
      }),
    );
  console.log(
    `HTTP checks passed: ${paths.length} page URLs and ${requests.length} assets/discovery files.`,
  );
}
console.log(
  `Production audit passed: ${importCount} imports, ${assets.size} asset references, ${publicFiles.length} copied public files, lockfile, SPA configuration and production entry.`,
);
