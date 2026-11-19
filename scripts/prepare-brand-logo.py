"""Prepare the supplied logo for the website without altering its artwork."""
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(sys.argv[1]).convert('RGB')
# Trim only the empty outer canvas; retain the entire yellow frame and ISO line.
logo = source.crop((455, 112, 1690, 615))
target = root / 'public/assets/hitech/hi-tech-certified-logo.webp'
logo.save(target, 'WEBP', lossless=True, method=6)
for width in (320, 480):
    resized = logo.resize((width, round(logo.height * width / logo.width)), Image.Resampling.LANCZOS)
    resized.save(target.parent / 'responsive' / f'hi-tech-certified-logo-{width}.webp',
                 'WEBP', lossless=True, method=6)
print(f'{target.name}: {logo.width} x {logo.height}')
