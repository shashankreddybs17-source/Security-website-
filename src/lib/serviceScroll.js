// Wheel steps and continuous trackpad input, with native touch/scrollbar navigation.
export function connectServiceScroll(runway, stage, count, onSelect, win = window) {
  const media = win.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  let current = 0,
    enabled = false,
    pinned = false,
    top = 120,
    step = 400,
    stageHeight = 0;
  let frame = 0,
    motionFrame = 0,
    motion = null,
    holdY = null,
    disposed = false,
    measured = false;
  const newBurst = (time = -Infinity, direction = 0) => ({
    time,
    direction,
    total: 0,
    handled: false,
    pass: false,
    handledAt: time,
    trackpad: false,
    peak: 0,
    tailLow: Infinity,
    recent: [],
    continued: 0,
  });
  let burst = newBurst();
  const clamp = (index) => Math.max(0, Math.min(count - 1, index));
  const start = () => runway.getBoundingClientRect().top + win.scrollY - top;
  const end = () =>
    start() + (pinned ? (count - 1) * step : Math.max(0, stageHeight + top + 24 - win.innerHeight));
  const activate = (index) => {
    const next = clamp(index);
    if (next === current) return;
    current = next;
    onSelect(next);
  };
  const stopMotion = () => {
    if (motionFrame) win.cancelAnimationFrame(motionFrame);
    motionFrame = 0;
    motion = null;
  };
  const moveTo = (target) => {
    stopMotion();
    if (Math.abs(target - win.scrollY) < 1) return;
    motion = { from: win.scrollY, target, started: win.performance.now() };
    const tick = () => {
      motionFrame = 0;
      if (disposed || !motion) return;
      const progress = Math.min(1, (win.performance.now() - motion.started) / 280);
      const eased = progress * progress * (3 - 2 * progress);
      win.scrollTo({
        top: motion.from + (motion.target - motion.from) * eased,
        behavior: 'instant',
      });
      if (progress < 1) motionFrame = win.requestAnimationFrame(tick);
      else motion = null;
    };
    motionFrame = win.requestAnimationFrame(tick);
  };
  const sync = () => {
    frame = 0;
    if (!enabled || motion) return;
    // Some browsers make momentum events non-cancelable. Do not let their
    // native movement skip the service already selected by this gesture.
    if (burst.handled && !burst.pass && win.performance.now() - burst.time < 180) {
      if (holdY !== null && Math.abs(win.scrollY - holdY) > 1)
        win.scrollTo({ top: holdY, behavior: 'instant' });
      return;
    }
    if (pinned) activate(Math.round((win.scrollY - start()) / step));
    else if (win.scrollY < start() - 1) activate(0);
    else if (win.scrollY > end() + 1) activate(count - 1);
  };
  const scroll = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(sync);
  };
  const reset = () => {
    stopMotion();
    holdY = null;
    burst = newBurst();
  };
  const measure = () => {
    if (disposed) return;
    const header = runway.ownerDocument.querySelector('header');
    const nextTop =
      Math.ceil(header?.getBoundingClientRect().height || (win.innerWidth < 992 ? 90 : 104)) + 12;
    const nextHeight = Math.ceil(stage.getBoundingClientRect().height);
    const nextStep = Math.round(Math.max(320, Math.min(480, win.innerHeight * 0.5)));
    const nextEnabled = media.matches && nextHeight > 0;
    const nextPinned = nextEnabled && nextHeight + nextTop + 24 <= win.innerHeight;
    if (
      measured &&
      nextTop === top &&
      nextHeight === stageHeight &&
      nextStep === step &&
      nextEnabled === enabled &&
      nextPinned === pinned
    )
      return;
    const wasInside = measured && enabled && win.scrollY >= start() - 1 && win.scrollY <= end() + 1;
    reset();
    top = nextTop;
    stageHeight = nextHeight;
    step = nextStep;
    enabled = nextEnabled;
    pinned = nextPinned;
    measured = true;
    runway.style.setProperty('--services-top', `${top}px`);
    runway.style.setProperty('--services-stage-height', `${stageHeight}px`);
    runway.style.setProperty('--services-travel', `${(count - 1) * step}px`);
    runway.dataset.pinned = String(pinned);
    runway.dataset.scrollMode = !enabled ? 'native' : pinned ? 'pinned' : 'flow';
    if (wasInside && enabled)
      win.scrollTo({ top: start() + (pinned ? current * step : 0), behavior: 'instant' });
    scroll();
  };
  const select = (index) => {
    activate(index);
    if (pinned) moveTo(start() + current * step);
  };
  const wheel = (event) => {
    if (
      !enabled ||
      event.ctrlKey ||
      event.metaKey ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5 ||
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
    const magnitude = Math.abs(delta);
    const pixelInput = event.deltaMode === 0;
    const fineInput =
      pixelInput && (magnitude < 50 || event.deltaX !== 0 || !Number.isInteger(delta));
    const fresh = now - burst.time > 180 || direction !== burst.direction;
    // A new finger stroke can arrive before the previous inertial tail ends.
    const impulse =
      !fresh &&
      burst.handled &&
      burst.trackpad &&
      now - burst.handledAt >= 160 &&
      Number.isFinite(burst.tailLow) &&
      magnitude >= Math.max(8, burst.tailLow * 2.5);
    if (fresh || impulse) {
      burst = newBurst(now, direction);
      burst.trackpad = fineInput || impulse;
    } else burst.trackpad ||= fineInput;
    burst.recent.push(magnitude);
    if (burst.recent.length > 10) burst.recent.shift();
    // Stable/renewed movement is continued intent; a decaying tail is not.
    // This permits a long two-finger drag without requiring a deliberate pause.
    if (
      burst.handled &&
      burst.trackpad &&
      now - burst.handledAt >= 320 &&
      burst.recent.length === 10
    ) {
      const earlier = burst.recent.slice(0, 5).reduce((sum, value) => sum + value, 0);
      const latest = burst.recent.slice(5).reduce((sum, value) => sum + value, 0);
      burst.continued = latest >= earlier * 0.95 && latest >= 5 ? burst.continued + magnitude : 0;
      if (burst.continued >= 120) {
        burst = newBurst(now, direction);
        burst.trackpad = true;
        burst.total = 60;
      }
    }
    if (burst.handled && magnitude <= burst.peak * 0.35)
      burst.tailLow = Math.min(burst.tailLow, magnitude);
    burst.peak = Math.max(burst.peak, magnitude);
    burst.time = now;
    if (burst.pass) return;
    const y = win.scrollY,
      first = start(),
      last = end();
    const enteringDown = direction > 0 && y < first && y + delta >= first;
    const enteringUp = direction < 0 && y > last && y + delta <= last;
    const prevent = () => {
      if (event.cancelable) event.preventDefault();
    };
    if (burst.handled && holdY !== null) {
      prevent();
      scroll();
      return;
    }
    if (enteringDown || enteringUp) {
      prevent();
      activate(enteringDown ? 0 : count - 1);
      holdY = enteringDown ? first : last;
      moveTo(holdY);
      burst.handled = true;
      burst.handledAt = now;
      return;
    }
    if (y < first - 1 || y > last + 1) return;
    if (pinned && !motion && !burst.handled) activate(Math.round((y - first) / step));
    // A fresh outward gesture releases either endpoint to normal page scrolling.
    if (
      !burst.handled &&
      ((current === 0 && direction < 0) || (current === count - 1 && direction > 0))
    ) {
      burst.pass = true;
      holdY = null;
      stopMotion();
      return;
    }
    prevent();
    burst.total += Math.abs(delta);
    // Discrete line/page wheel events are intentional steps, even when one
    // mouse notch normalizes to fewer than 60 pixels (common in Firefox).
    const threshold = event.deltaMode === 0 ? 60 : 1;
    if (burst.total >= threshold) {
      select(current + direction);
      // A tall section stays in normal flow. Hold its visible position while
      // switching services instead of silently disabling wheel navigation.
      holdY = pinned ? first + current * step : y;
      burst.handled = true;
      burst.handledAt = now;
      scroll();
    }
  };
  win.addEventListener('scroll', scroll, { passive: true });
  win.addEventListener('resize', measure);
  win.addEventListener('wheel', wheel, { passive: false });
  win.addEventListener('touchstart', reset, { passive: true });
  win.addEventListener('pointerdown', reset, { passive: true });
  win.addEventListener('keydown', reset);
  media.addEventListener('change', measure);
  const observer = win.ResizeObserver ? new win.ResizeObserver(measure) : null;
  observer?.observe(stage);
  const header = runway.ownerDocument.querySelector('header');
  if (header) observer?.observe(header);
  runway.ownerDocument.fonts?.ready.then(measure);
  measure();
  return {
    select(index) {
      reset();
      select(index);
    },
    destroy() {
      disposed = true;
      reset();
      if (frame) win.cancelAnimationFrame(frame);
      win.removeEventListener('scroll', scroll);
      win.removeEventListener('resize', measure);
      win.removeEventListener('wheel', wheel);
      win.removeEventListener('touchstart', reset);
      win.removeEventListener('pointerdown', reset);
      win.removeEventListener('keydown', reset);
      media.removeEventListener('change', measure);
      observer?.disconnect();
      delete runway.dataset.pinned;
      delete runway.dataset.scrollMode;
      for (const name of ['--services-top', '--services-stage-height', '--services-travel'])
        runway.style.removeProperty(name);
    },
  };
}
