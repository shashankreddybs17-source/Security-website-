"""Generate optional AVIF hero variants; keep all original WebP assets.

Requires Pillow plus AVIF support (pillow-avif-plugin on older Pillow versions).
"""
import json
from pathlib import Path
from PIL import Image

try:
    import pillow_avif  # noqa: F401 -- registers AVIF support on older Pillow
except ImportError:
    pass

root = Path(__file__).resolve().parents[1]
public = root / 'public'
source = public / 'assets/hitech/new-uniform/november-2026/security-guard-lineup-hero.webp'
image = Image.open(source).convert('RGB')
variants = []
for width in [320, 480, 768, 960, 1280, image.width]:
    resized = image if width == image.width else image.resize(
        (width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
    target = source.with_suffix('.avif') if width == image.width else (
        source.parent / 'responsive' / f'{source.stem}-{width}.avif')
    resized.save(target, 'AVIF', quality=65, speed=4, subsampling='4:2:0')
    variants.append({'src': '/' + target.relative_to(public).as_posix(), 'width': width})
    print(f'{target.name}: {target.stat().st_size} bytes')
(root / 'src/data/heroAvif.json').write_text(json.dumps({
    'src': variants[-1]['src'], 'variants': variants,
}, indent=2) + '\n')
