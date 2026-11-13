/** Native reveal animations and accessible FAQ disclosures. */
export function initializeInteractions(root = document) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet();
  const revealTargets = new Map();
  const animations = new Set();
  const cleanups = [];
  let disposed = false;
  let sequence = 0;
  const animate = (element, frames, options) => {
    if (reduced.matches || !element.animate) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => {});
  };
  const reveal = (element) => {
    for (const item of [element, ...element.querySelectorAll('[style]')]) {
      if (
        item.closest('button, .site-button, .primary-button, .secondary-button, .tertiary-button')
      )
        continue;
      if (item.matches('.about-overlay')) {
        item.style.transform = 'translateY(-100%)';
        animate(
          item,
          [
            { transform: 'translateY(100%)' },
            { transform: 'translateY(0)', offset: 0.5 },
            { transform: 'translateY(-100%)' },
          ],
          { duration: 1600, easing: 'ease-in-out' },
        );
        continue;
      }
      if (item.matches('.story-number, .story-number-reverse')) {
        const reverse = item.matches('.story-number-reverse');
        const end = reverse ? 'translateY(-1000%)' : 'translateY(0)';
        item.style.transform = end;
        animate(
          item,
          [{ transform: reverse ? 'translateY(0)' : 'translateY(-1000%)' }, { transform: end }],
          { duration: 2000, easing: 'ease-out' },
        );
        continue;
      }
      const transform = item.style.transform;
      const opacity = item.style.opacity;
      if (!transform && opacity !== '0') continue;
      item.style.transform = 'none';
      item.style.opacity = '1';
      animate(
        item,
        [
          {
            transform: transform && !transform.includes('null') ? transform : 'translateY(24px)',
            opacity: opacity === '0' ? 0 : 1,
          },
          { transform: 'none', opacity: 1 },
        ],
        { duration: item.matches('img') ? 900 : 800, easing: 'cubic-bezier(.25,.46,.45,.94)' },
      );
    }
  };
  const observer =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries)
              if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                for (const element of revealTargets.get(entry.target) || []) reveal(element);
                revealTargets.delete(entry.target);
              }
          },
          { threshold: 0.05 },
        );
  const scan = () => {
    if (disposed) return;
    for (const element of root.querySelectorAll('[data-reveal], .home-about-image-block')) {
      if (seen.has(element)) continue;
      seen.add(element);
      if (observer && !reduced.matches) {
        // Observe the stable frame: translated children can be fully clipped before revealing.
        const frame = element.parentElement || element;
        const targets = revealTargets.get(frame) || [];
        targets.push(element);
        revealTargets.set(frame, targets);
        observer.observe(frame);
      } else reveal(element);
    }
    for (const dropdown of root.querySelectorAll('.faqs-dropdown')) {
      // Disclosures may also carry reveal markers, so track their toggles separately.
      const toggle = dropdown.querySelector('.faqs-question');
      const panel = dropdown.querySelector('.faqs-answer');
      if (!toggle || !panel || seen.has(toggle)) continue;
      seen.add(toggle);
      const id = `faq-answer-${++sequence}`;
      panel.id = id;
      panel.setAttribute('role', 'region');
      toggle.id = `${id}-question`;
      panel.setAttribute('aria-labelledby', toggle.id);
      toggle.setAttribute('role', 'button');
      toggle.tabIndex = 0;
      toggle.setAttribute('aria-controls', id);
      const setOpen = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
        panel.style.display = open ? 'block' : 'none';
        const arrow = toggle.querySelector('.faqs-arrow-icon');
        if (arrow) {
          arrow.style.transition = reduced.matches ? 'none' : 'transform 300ms ease';
          arrow.style.transform = open ? 'rotate(180deg)' : 'none';
        }
        if (open)
          animate(
            panel,
            [
              { opacity: 0, maxHeight: '0px' },
              { opacity: 1, maxHeight: `${panel.scrollHeight}px` },
            ],
            { duration: 300, easing: 'ease-out' },
          );
      };
      setOpen(false);
      const click = () => setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      const keydown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          click();
        }
        if (event.key === 'Escape') setOpen(false);
      };
      toggle.addEventListener('click', click);
      toggle.addEventListener('keydown', keydown);
      cleanups.push(() => {
        toggle.removeEventListener('click', click);
        toggle.removeEventListener('keydown', keydown);
      });
    }
    for (const marquee of root.querySelectorAll('.marquee-block')) {
      if (marquee.dataset.motionReady) continue;
      marquee.dataset.motionReady = 'true';
      if (!reduced.matches)
        animate(marquee, [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], {
          duration: 60000,
          iterations: Infinity,
          easing: 'linear',
        });
    }
  };
  const mutation = new MutationObserver(scan);
  mutation.observe(root.documentElement || root, { childList: true, subtree: true });
  const motionChange = () => {
    if (reduced.matches) {
      animations.forEach((animation) => animation.cancel());
      root.querySelectorAll('[data-reveal]').forEach(reveal);
    }
  };
  reduced.addEventListener('change', motionChange);
  scan();
  return () => {
    disposed = true;
    mutation.disconnect();
    observer?.disconnect();
    revealTargets.clear();
    animations.forEach((animation) => animation.cancel());
    cleanups.forEach((cleanup) => cleanup());
    reduced.removeEventListener('change', motionChange);
  };
}
