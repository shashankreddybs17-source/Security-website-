// Stop at escape characters as well as HTML/JS delimiters. Embedded lightbox
// JSON contains escaped quotes after URLs; those escapes are not URL segments.
export function assetReferences(source) {
  const assets = new Set();
  for (const match of source.matchAll(/\/assets\/[^\s'"`<>)};\\]+/g)) {
    for (const candidate of match[0].split(',')) {
      const asset = candidate.split(/[?#]/)[0];
      if (asset.includes('${') || asset.endsWith('team-$') || asset.endsWith('team-')) continue;
      assets.add(asset);
    }
  }
  return assets;
}
