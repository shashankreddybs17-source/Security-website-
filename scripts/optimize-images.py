"""Generate responsive WebP assets without changing crops or image content."""
import json
from io import BytesIO
from pathlib import Path
from PIL import Image
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
assets = root / 'public/assets/hitech'
manifest = {}
manifest_path = root / 'src/data/responsiveImages.json'
previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
before = after = 0
for path in sorted(assets.rglob('*.webp')):
    if path.parent.name == 'responsive':
        continue
    image = Image.open(path)
    image.load()
    before += path.stat().st_size
    # Preserve resolution; avoid recompressing assets already smaller than the output.
    encoded = BytesIO()
    image.save(encoded, 'WEBP', quality=88, method=6)
    url = '/' + path.relative_to(root / 'public').as_posix()
    if url not in previous and len(encoded.getvalue()) < path.stat().st_size and path.name != 'hi-tech-protection-security-logo.webp':
        path.write_bytes(encoded.getvalue())
    after += path.stat().st_size
    variants = []
    for width in (480, 960):
        if image.width <= width:
            continue
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        target = path.parent / 'responsive' / f'{path.stem}-{width}.webp'
        target.parent.mkdir(exist_ok=True)
        resized.save(target, 'WEBP', quality=85, method=6)
        variants.append({'src': '/' + target.relative_to(root / 'public').as_posix(), 'width': width})
    manifest[url] = {'width': image.width, 'height': image.height, 'variants': variants}
(root / 'src/data/responsiveImages.json').write_text(json.dumps(manifest, indent=2) + '\n')
for path in (root / 'public/assets/fonts').glob('archivo-variable.ttf'):
    font = TTFont(path)
    font.flavor = 'woff2'
    font.save(path.with_suffix('.woff2'))
print(f'Original image payload: {before:,} -> {after:,} bytes; responsive variants generated.')
