import { useEffect, useRef } from 'react';

// Keep the existing Webflow slider and animations; measure only its active cards.
export function useVisibleSliderHeight() {
  const section = useRef(null);
  useEffect(() => {
    const root = section.current;
    const mask = root?.querySelector('.team-mask');
    if (!root || !mask) return;
    const slides = [...mask.querySelectorAll('.team-slide')];
    const cards = slides.map((slide) => slide.querySelector('.team-card')).filter(Boolean);
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      if (disposed || !mask.isConnected) return;
      const initialized = slides.some((slide) => slide.hasAttribute('aria-hidden'));
      const maskBounds = mask.getBoundingClientRect();
      const active = slides.filter((slide) => {
        if (initialized) return slide.getAttribute('aria-hidden') !== 'true';
        const bounds = slide.getBoundingClientRect();
        return bounds.right > maskBounds.left + 1 && bounds.left < maskBounds.right - 1;
      });
      const bottoms = active.map((slide) => {
        const card = slide.querySelector('.team-card');
        if (!card) return 0;
        // Preserve the existing 5vw stagger rather than clipping translated cards.
        const offset = Math.max(0, card.getBoundingClientRect().top - maskBounds.top);
        return card.offsetHeight + offset;
      });
      const height = Math.ceil(Math.max(0, ...bottoms));
      if (!height) return;
      const value = `${height}px`;
      if (root.style.getPropertyValue('--team-visible-height') !== value)
        root.style.setProperty('--team-visible-height', value);
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(measure);
    };
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    cards.forEach((card) => resize?.observe(card));
    const mutations = new MutationObserver((records) => {
      if (records.some((record) => record.target.matches('.team-slide, .team-card'))) schedule();
    });
    mutations.observe(mask, {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'style'],
    });
    window.addEventListener('resize', schedule);
    root.addEventListener('load', schedule, true);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      mutations.disconnect();
      window.removeEventListener('resize', schedule);
      root.removeEventListener('load', schedule, true);
      root.style.removeProperty('--team-visible-height');
    };
  }, []);
  return section;
}
