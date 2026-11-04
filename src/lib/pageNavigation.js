// Full-page links own page transitions; the browser retains back/forward positions.
export function initializePageScroll(win = window) {
  const navigation = win.performance.getEntriesByType('navigation')[0];
  if (navigation?.type === 'navigate' && !win.location.hash)
    win.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// Fixed-body locking also works on mobile Safari. Restore inline styles and the
// exact page position before returning focus, without changing section timelines.
export function lockPageScroll(win = window, doc = document) {
  const body = doc.body;
  const keys = ['position', 'top', 'left', 'right', 'width', 'overflow', 'paddingRight'];
  const previous = Object.fromEntries(keys.map((key) => [key, body.style[key]]));
  const x = win.scrollX;
  const y = win.scrollY;
  const gutter = Math.max(0, win.innerWidth - doc.documentElement.clientWidth);
  if (gutter)
    body.style.paddingRight = `${parseFloat(win.getComputedStyle(body).paddingRight) + gutter}px`;
  Object.assign(body.style, {
    position: 'fixed',
    top: `${-y}px`,
    left: `${-x}px`,
    right: '0',
    width: '100%',
    overflow: 'hidden',
  });
  let locked = true;
  return () => {
    if (!locked) return;
    locked = false;
    Object.assign(body.style, previous);
    win.scrollTo({ top: y, left: x, behavior: 'instant' });
  };
}
