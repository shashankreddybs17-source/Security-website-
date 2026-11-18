import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('hero preload matches AVIF picture candidates and is absent on internal routes', () => {
  const hero = JSON.parse(readFileSync('src/data/heroAvif.json', 'utf8'));
  const html = readFileSync('index.html', 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const pathname of ['/', '/about-us', '/services']) {
    const links = [];
    runInNewContext(script, {
      location: { pathname },
      document: { createElement: () => ({}), head: { appendChild: (link) => links.push(link) } },
    });
    if (pathname !== '/') {
      assert.equal(links.length, 0);
      continue;
    }
    assert.equal(links.length, 1);
    assert.equal(links[0].type, 'image/avif');
    assert.equal(links[0].href, hero.src);
    assert.equal(
      links[0].imageSrcset,
      hero.variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
    );
    assert.equal(links[0].imageSizes, '100vw');
  }
  for (const candidate of hero.variants) {
    const bytes = readFileSync('public' + candidate.src);
    assert.equal(bytes.toString('ascii', 4, 8), 'ftyp');
    assert.ok(existsSync('public' + candidate.src.replace('.avif', '.webp')));
  }
});
