"""Build the critical Archivo subset; retain the original as the Unicode fallback.

Requires fonttools and brotli. Run from the project root after updating the source font.
"""

from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent
font = TTFont(root / 'public/assets/fonts/archivo-variable.woff2')
options = subset.Options()
options.layout_features = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=(
    set(range(0x250)) | set(range(0x1E00, 0x1F00)) |
    set(range(0x2000, 0x2070)) | set(range(0x20A0, 0x2150)) |
    set(range(0x2190, 0x2200)) | {0xFEFF, 0xFFFD}
))
subsetter.subset(font)
# The site's existing normal stretch uses width 100. Preserve every weight.
font = instantiateVariableFont(font, {'wdth': 100}, inplace=False)
font.flavor = 'woff2'
font.save(root / 'public/assets/fonts/archivo-latin.woff2')
