import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, dirname, join } from 'node:path';
import { allServices } from '../src/data/services.js';
import { blogPosts } from '../src/data/blogPosts.js';
import { assetReferences } from './asset-references.mjs';

const root = resolve('.');
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}
function exactFile(path) {
  const rel = relative(root, resolve(path));
  assert.ok(!rel.startsWith('..'), `Reference escapes project: ${path}`);
  let current = root;
  for (const segment of rel.split(/[\\/]/)) {
    assert.ok(readdirSync(current).includes(segment), `Missing or Linux case mismatch: ${path}`);
    current = join(current, segment);
  }
  assert.ok(statSync(current).isFile(), `Not a file: ${path}`);
}
const sources = walk('src').filter((p) => /\.(?:jsx?|css)$/.test(p));
const assets = new Set();
for (const file of [...sources, 'reference-metadata.json']) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*|@import\s*)['"]([^'"]+)['"]/g)) {
    if (!match[1].startsWith('.')) continue;
    const base = resolve(dirname(file), match[1]);
    const target = [base, `${base}.js`, `${base}.jsx`, join(base, 'index.js')].find(existsSync);
    assert.ok(target, `Unresolved import: ${file}: ${match[1]}`);
    exactFile(target);
  }
  for (const asset of assetReferences(source)) assets.add(asset);
}
for (const service of allServices)
  assets.add(service.image || `/assets/hitech/team-${service.photo}.jpeg`);
for (const post of blogPosts) {
  assets.add(post.image);
  if (post.featuredImage) assets.add(post.featuredImage);
}
for (const file of walk('public/assets/hitech'))
  if (/team-\d+\.jpeg$/.test(file))
    assets.add('/' + relative('public', file).replaceAll('\\', '/'));
for (const asset of assets) {
  exactFile('public' + asset);
  exactFile('dist' + asset);
}
for (const file of walk('public')) {
  const path = relative('public', file);
  exactFile(join('dist', path));
  assert.equal(
    statSync(file).size,
    statSync(join('dist', path)).size,
    `Incomplete public asset copy: ${path}`,
  );
}
const html = readFileSync('dist/index.html', 'utf8');
assert.ok(!html.includes('/src/main.jsx'), 'Production HTML still points to development source');
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g))
  exactFile('dist' + match[1]);
for (const file of walk('dist').filter((p) => /\.(?:js|css)$/.test(p))) {
  const source = readFileSync(file, 'utf8');
  assert.ok(
    !/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/.test(source),
    `Local-only URL in production: ${file}`,
  );
}
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
assert.equal(config.framework, 'vite');
assert.equal(config.outputDirectory, 'dist');
assert.equal(config.installCommand, 'npm ci');
assert.ok(
  config.rewrites.some((r) => r.source === '/(.*)' && r.destination === '/index.html'),
  'Missing SPA deep-link rewrite',
);
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
assert.deepEqual(pkg.dependencies, lock.packages[''].dependencies);
assert.deepEqual(pkg.devDependencies, lock.packages[''].devDependencies);
assert.equal(pkg.engines.node, '24.x');
const paths = [
  '/',
  '/about-us',
  '/services',
  '/blog',
  '/faqs',
  '/faq',
  '/contact-us',
  '/contact',
  ...allServices.map((s) => `/services?service=${s.id}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];
console.log(
  `PASS: ${sources.length} source files checked for Linux import casing; ${assets.size} asset references and all public files exist in dist; package lock, production entry point, Vercel config and ${paths.length} route targets checked.`,
);
if (process.argv[2]) {
  const base = process.argv[2];
  for (const path of paths) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type') || '', /text\/html/, path);
    assert.match(await response.text(), /id="root"/, path);
  }
  for (const asset of assets) {
    const response = await fetch(new URL(asset, base));
    assert.equal(response.status, 200, asset);
    assert.ok(
      !/text\/html/.test(response.headers.get('content-type') || ''),
      `Asset incorrectly served as SPA HTML: ${asset}`,
    );
    await response.body?.cancel();
  }
  console.log(
    `PASS: HTTP checks against ${base}: ${paths.length} direct routes and ${assets.size} assets return expected status/content types. This does not execute browser JavaScript.`,
  );
}
