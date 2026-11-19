"""Rebuild only the measured critical WebP variants; keep full originals intact."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
public = root / 'public'
directory = public / 'assets/hitech/new-uniform/november-2026'
manifest = json.loads((root / 'src/data/responsiveImages.json').read_text())
before = after = 0
for name in ('gate-security', 'residential-security', 'security-team-outdoor-briefing'):
    source = directory / (name + '.webp')
    image = Image.open(source)
    metadata = manifest['/' + source.relative_to(public).as_posix()]
    for variant in metadata['variants']:
        target = public / variant['src'].lstrip('/')
        backup = root / 'tmp/vercel-2026-11-19/original-variants' / target.name
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            backup.write_bytes(target.read_bytes())
        width = variant['width']
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        temporary = root / 'tmp/vercel-2026-11-19' / target.name
        resized.save(temporary, 'WEBP', quality=80, method=6)
        previous = target.stat().st_size
        before += previous
        if temporary.stat().st_size < previous:
            target.write_bytes(temporary.read_bytes())
        after += target.stat().st_size
        print(f'{target.name}: {previous} -> {target.stat().st_size}', flush=True)
print(f'Total responsive bytes: {before} -> {after}; originals unchanged.')
