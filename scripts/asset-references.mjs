import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { relative, resolve, sep, join } from 'node:path';

/** Check filename case on Windows too, without ever reading a file as a directory. */
export function assertExactFile(path, root = process.cwd()) {
  root = resolve(root);
  const absolute = resolve(path);
  const parts = relative(root, absolute).split(sep);
  assert.ok(parts[0] !== '..' && !parts.includes('..'), `Outside project: ${path}`);
  let parent = root;
  for (const part of parts) {
    assert.ok(statSync(parent).isDirectory(), `Not a directory: ${parent}`);
    assert.ok(readdirSync(parent).includes(part), `Missing or incorrect filename case: ${path}`);
    parent = join(parent, part);
  }
  assert.ok(statSync(parent).isFile(), `Not a file: ${path}`);
}

/** Static public asset URLs in markup, styles and escaped JSON strings. */
export function* assetReferences(source) {
  const found = new Set();
  for (const match of source.matchAll(/\/assets\/[^\s"'`<>\\(),;]+/g)) {
    const url = match[0].split(/[?#]/)[0];
    if (/[${}]/.test(url) || found.has(url)) continue;
    found.add(url);
    yield url;
  }
}
