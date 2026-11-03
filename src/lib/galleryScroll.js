// Keep the horizontal journey tied to the first and last visible card stops.
export function galleryMetrics(width, cardWidth, count) {
  const gap = Math.max(20, Math.min(40, width * 0.02));
  const spacing = cardWidth + gap;
  const anchor = width < 600 ? (width - cardWidth) / 2 : width * 0.23;
  return { spacing, anchor, distance: Math.max(0, count - 1) * spacing };
}
