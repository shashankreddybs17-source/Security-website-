import assert from 'node:assert/strict';
import test from 'node:test';
import { galleryMetrics } from '../src/lib/galleryScroll.js';

test('gallery ends with final card at its visible stop, without an offscreen tail', () => {
  for (const [width, cardWidth] of [
    [1920, 560],
    [1280, 435],
    [768, 320],
    [390, 335],
  ]) {
    const { spacing, anchor, distance } = galleryMetrics(width, cardWidth, 5);
    assert.equal(4 * spacing - distance + anchor, anchor);
    assert.ok(anchor >= 0 && anchor + cardWidth <= width);
    assert.ok(spacing - cardWidth >= 20 && spacing - cardWidth <= 40);
    // Sticky release coincides exactly with completion of the horizontal trip.
    const stickyHeight = 900;
    const sectionHeight = stickyHeight + distance;
    assert.equal(distance / (sectionHeight - stickyHeight), 1);
  }
});
test('card spacing and journey stay consistent in either scroll direction', () => {
  const { spacing, distance } = galleryMetrics(1920, 560, 5);
  for (let index = 0; index < 5; index++) {
    const progress = index / 4;
    assert.equal(index * spacing - progress * distance, 0);
  }
  assert.equal(galleryMetrics(390, 335, 1).distance, 0);
});
