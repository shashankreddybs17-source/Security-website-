import assert from 'node:assert/strict';
import test from 'node:test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function sources(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sources(path) : [path];
  });
}

test('application source has no platform runtime, attributes or class prefixes', () => {
  for (const path of sources('src')) {
    const text = readFileSync(path, 'utf8');
    assert.doesNotMatch(text, /webflow|jquery|data-wf-|data-w-id|IX2_PAGE_UPDATE/i, path);
    assert.doesNotMatch(
      text,
      /(?<![\w-])w-(?:container|dropdown|slider|layout|inline|mod|dyn)/,
      path,
    );
  }
  assert.ok(!existsSync('public/assets/home-interactions.js'));
  assert.ok(!existsSync('public/assets/about-interactions.js'));
});

test('native interactions initialize and clean up lazy-page observers and accessible disclosures', async () => {
  const { initializeInteractions } = await import('../src/lib/interactions.js');
  assert.equal(typeof initializeInteractions, 'function');
  const source = readFileSync('src/lib/interactions.js', 'utf8');
  for (const token of [
    'MutationObserver',
    'IntersectionObserver',
    'aria-expanded',
    'aria-controls',
    'keydown',
    'prefers-reduced-motion',
    'disconnect()',
    'removeEventListener',
  ]) {
    assert.ok(source.includes(token), token);
  }
});

test('font token and utility button styles do not collide with global component buttons', () => {
  const app = readFileSync('src/styles/app.css', 'utf8');
  const base = readFileSync('src/styles/base.css', 'utf8');
  assert.match(app, /@theme static/);
  assert.match(app, /@source '\.\.\/\.\.\/index\.html'/);
  assert.match(base, /\.ui-button\s*\{/);
  assert.doesNotMatch(base, /\.site-button\s*\{/);
});
