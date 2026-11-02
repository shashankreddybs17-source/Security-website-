// Scoped to a service runway. Touch/scrollbar navigation stays native.
export function connectServiceScroll(runway, stage, count, onSelect, win = window) {
  const media = win.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  let current = 0;
  let enabled = false;
  let top = 120;
  let step = 400;
  let frame = 0;
  let burst = { time: -Infinity, direction: 0, total: 0, handled: false, pass: false };
  const clamp = (index) => Math.max(0, Math.min(count - 1, index));
  const start = () => runway.getBoundingClientRect().top + win.scrollY - top;
  const activate = (index) => {
    const next = clamp(index);
    if (next === current) return;
    current = next;
    onSelect(next);
  };
  const sync = () => {
    frame = 0;
    if (enabled) activate(Math.round((win.scrollY - start()) / step));
  };
  const scroll = () => {
    if (!frame) frame = win.requestAnimationFrame(sync);
  };
  const measure = () => {
    const header = runway.ownerDocument.querySelector('header');
    top =
      Math.ceil(header?.getBoundingClientRect().height || (win.innerWidth < 992 ? 94 : 108)) + 12;
    const height = Math.ceil(stage.getBoundingClientRect().height);
    enabled = media.matches && height + top + 24 <= win.innerHeight;
    step = Math.round(Math.max(320, Math.min(480, win.innerHeight * 0.5)));
    runway.style.setProperty('--services-top', `${top}px`);
    runway.style.setProperty('--services-stage-height', `${height}px`);
    runway.style.setProperty('--services-travel', `${(count - 1) * step}px`);
    runway.dataset.pinned = String(enabled);
    burst.time = -Infinity;
    scroll();
  };
  const select = (index) => {
    activate(index);
    if (enabled) {
      // The viewport stays pinned; only its position in the runway changes.
      win.scrollTo({ top: start() + current * step, behavior: 'instant' });
    }
  };
  const wheel = (event) => {
    if (
      !enabled ||
      !event.cancelable ||
      event.ctrlKey ||
      event.metaKey ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
      event.target?.closest?.(
        'header, dialog, [role="dialog"], input, textarea, select, [contenteditable="true"]',
      )
    )
      return;
    const delta =
      event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? win.innerHeight : 1);
    const direction = Math.sign(delta);
    if (!direction) return;
    const now = win.performance.now();
    if (now - burst.time > 180 || direction !== burst.direction) {
      burst = { time: now, direction, total: 0, handled: false, pass: false };
    }
    burst.time = now;
    if (burst.pass) return;
    const y = win.scrollY;
    const first = start();
    const last = first + (count - 1) * step;
    const enteringDown = direction > 0 && y < first && y + delta >= first;
    const enteringUp = direction < 0 && y > last && y + delta <= last;
    if (enteringDown || enteringUp) {
      event.preventDefault();
      select(enteringDown ? 0 : count - 1);
      burst.handled = true;
      return;
    }
    if (y < first - 1 || y > last + 1) return;
    activate(Math.round((y - first) / step));
    // Release a NEW outward gesture at either end. Consume only the remainder
    // of the gesture which just selected the endpoint, including its momentum.
    if (
      !burst.handled &&
      ((current === 0 && direction < 0) || (current === count - 1 && direction > 0))
    ) {
      burst.pass = true;
      return;
    }
    event.preventDefault();
    if (burst.handled) return;
    burst.total += Math.abs(delta);
    if (burst.total >= 60) {
      select(current + direction);
      burst.handled = true;
    }
  };
  // Keyboard page scrolling remains native. Discard wheel momentum when the
  // visitor deliberately switches to touch, keyboard, or direct selection.
  const reset = () => {
    burst.time = -Infinity;
  };
  win.addEventListener('scroll', scroll, { passive: true });
  win.addEventListener('resize', measure);
  win.addEventListener('wheel', wheel, { passive: false });
  win.addEventListener('touchstart', reset, { passive: true });
  win.addEventListener('keydown', reset);
  media.addEventListener('change', measure);
  const observer = win.ResizeObserver ? new win.ResizeObserver(measure) : null;
  observer?.observe(stage);
  measure();
  return {
    select(index) {
      reset();
      select(index);
    },
    destroy() {
      if (frame) win.cancelAnimationFrame(frame);
      win.removeEventListener('scroll', scroll);
      win.removeEventListener('resize', measure);
      win.removeEventListener('wheel', wheel);
      win.removeEventListener('touchstart', reset);
      win.removeEventListener('keydown', reset);
      media.removeEventListener('change', measure);
      observer?.disconnect();
      delete runway.dataset.pinned;
      for (const name of ['--services-top', '--services-stage-height', '--services-travel'])
        runway.style.removeProperty(name);
    },
  };
}
