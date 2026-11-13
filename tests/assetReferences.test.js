import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import { assetReferences } from '../scripts/asset-references.mjs';

test('escaped lightbox video URLs have no trailing path segments on Linux', () => {
  const source = String.raw`{"html":"<video src=\\"/assets/video.mp4\\"></video>"}`;
  const assets = [...assetReferences(source)];
  assert.deepEqual(assets, ['/assets/video.mp4']);
  assert.equal(
    posix.relative('/project', posix.resolve('/project/public' + assets[0])),
    'public/assets/video.mp4',
  );
});

test('extracts comma-separated media, CSS URLs, query strings and fragments', () => {
  assert.deepEqual(
    [
      ...assetReferences(String.raw`
    data-video-urls="/assets/video.mp4,/assets/video.webm"
    background: url('/assets/image.png?v=2#preview');
    src="/assets/image.png"
  `),
    ],
    ['/assets/video.mp4', '/assets/video.webm', '/assets/image.png'],
  );
});

test('dynamic template paths remain excluded', () => {
  assert.deepEqual([...assetReferences('`/assets/hitech/team-${service.photo}.jpeg`')], []);
});

test('responsive asset manifest resolves to existing local images', () => {
  const source = readFileSync(
    new URL('../src/data/responsiveImages.json', import.meta.url),
    'utf8',
  );
  const assets = [...assetReferences(source)];
  assert.ok(assets.length > 0);
  for (const asset of assets) assert.ok(!asset.includes('\\'), asset);
});
