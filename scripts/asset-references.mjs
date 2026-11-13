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
