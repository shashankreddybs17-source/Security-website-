"""Generate responsive WebP assets without changing crops or image content."""
import json
from pathlib import Path
from PIL import Image
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
assets = root / 'public/assets/hitech'
manifest_path = root / 'src/data/responsiveImages.json'
previous_manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
manifest = {}
before = after = 0
for path in sorted(assets.rglob('*.webp')):
    if path.parent.name == 'responsive':
        continue
    image = Image.open(path)
    image.load()
    before += path.stat().st_size
    url = '/' + path.relative_to(root / 'public').as_posix()
    after += path.stat().st_size
    variants = []
    for width in (320, 480, 768, 960, 1280):
        if image.width <= width:
            continue
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        client_logo = path.parent.name == 'clients' or (
            path.stem.endswith('-logo') and not path.stem.startswith('hi-tech-'))
        suffix = '-lossless' if client_logo else ''
        target = path.parent / 'responsive' / f'{path.stem}-{width}{suffix}.webp'
        target.parent.mkdir(exist_ok=True)
        if client_logo:
            # Logos need clean text edges; avoid another lossy compression pass.
            resized.save(target, 'WEBP', lossless=True, method=6)
        else:
            resized.save(target, 'WEBP', quality=80, method=6)
        variants.append({'src': '/' + target.relative_to(root / 'public').as_posix(), 'width': width})
    manifest[url] = {'width': image.width, 'height': image.height, 'variants': variants}
    if 'objectPosition' in previous_manifest.get(url, {}):
        manifest[url]['objectPosition'] = previous_manifest[url]['objectPosition']
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
for path in (root / 'public/assets/fonts').glob('archivo-variable.ttf'):
    font = TTFont(path)
    font.flavor = 'woff2'
    font.save(path.with_suffix('.woff2'))
print(f'Original image payload: {before:,} -> {after:,} bytes; responsive variants generated.')
