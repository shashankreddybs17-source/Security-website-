/**
 * Isolated compatibility adapter for the reference's animation timeline.
 * The vendored runtime owns animated styles, sliders, menus and lightboxes.
 * React owns the section structure and content. Full page route navigation
 * deliberately gives each route a fresh interaction lifecycle.
 */
export async function loadInteractions(scripts) {
  // Let the hero image and critical styles finish before parsing the legacy runtime.
  if (document.readyState !== 'complete') {
    await new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
  }
  await new Promise((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(resolve, { timeout: 1500 });
    else window.setTimeout(resolve, 0);
  });
  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Unable to load ${src}`));
      document.body.appendChild(script);
    });
  }
  window.Webflow?.ready();
  document.dispatchEvent(new Event('readystatechange'));
  document.dispatchEvent(new CustomEvent('IX2_PAGE_UPDATE'));
  window.dispatchEvent(new Event('resize'));
  window.dispatchEvent(new Event('scroll'));
}
