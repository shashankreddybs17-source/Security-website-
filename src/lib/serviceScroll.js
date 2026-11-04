// Sequential wheel and touch navigation, with native scrolling at the endpoints.
export function connectServiceScroll(runway, stage, count, onSelect, win = window) {
  const media = win.matchMedia('(prefers-reduced-motion: no-preference)');
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
    capturing: false,
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
  let touch = null;
  const excluded = (event) =>
    event.target?.closest?.(
      'header, dialog, [role="dialog"], input, textarea, select, [contenteditable="true"]',
    );
  const mobilePanelVisible = () => {
    const panel = stage.querySelector?.('[role="tabpanel"][aria-hidden="false"]');
    if (!panel) return false;
    const rect = panel.getBoundingClientRect();
    // Never capture a swipe while the service description or CTA is below the fold.
    return rect.top >= top - 1 && rect.bottom <= win.innerHeight - 12;
  };
  const clamp = (index) => Math.max(0, Math.min(count - 1, index));
  const start = () => runway.getBoundingClientRect().top + win.scrollY - top;
  const end = () => {
    if (pinned) return start() + (count - 1) * step;
    // A tall stage cannot stick. Keep stepping while a substantial portion is
    // visible, including when its bottom already fits in the viewport. The old
    // bottom-at-viewport boundary disabled wheel selection in this position.
    const visibleHeight = Math.min(stageHeight, Math.max(160, (win.innerHeight - top) / 2));
    return start() + Math.max(0, stageHeight - visibleHeight);
  };
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
  const moveTo = (target, direction = 0) => {
    stopMotion();
    motion = { from: win.scrollY, target, direction, started: win.performance.now() };
    const tick = () => {
      motionFrame = 0;
      if (disposed || !motion) return;
      const progress = Math.min(1, (win.performance.now() - motion.started) / 280);
      const eased = progress * progress * (3 - 2 * progress);
      const position = motion.from + (motion.target - motion.from) * eased;
      if (progress === 1 || Math.abs(position - win.scrollY) > 0.5)
        win.scrollTo({ top: position, behavior: 'instant' });
      if (progress < 1) motionFrame = win.requestAnimationFrame(tick);
      else motion = null;
    };
    motionFrame = win.requestAnimationFrame(tick);
  };
  const sync = () => {
    frame = 0;
    if (!enabled || motion || runway.ownerDocument.body?.style.position === 'fixed') return;
    // A wheel gesture owns its selected index, not the browser's scroll position.
    // Never pull native scroll, scrollbar dragging or restoration back to holdY.
    if (
      (burst.capturing || burst.handled) &&
      !burst.pass &&
      win.performance.now() - burst.time < 180 &&
      win.scrollY >= start() - 1 &&
      win.scrollY <= end() + 1
    )
      return;
    // Only a pinned runway encodes service progress in the page position.
    // In flow mode this interval is just the visible part of a tall section;
    // crossing it must not force the first/last service or undo a tab click.
    if (pinned) activate(Math.round((win.scrollY - start()) / step));
  };
  const scroll = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(sync);
  };
  const reset = () => {
    stopMotion();
    touch = null;
    holdY = null;
    burst = newBurst();
  };
  const measure = () => {
    if (disposed || runway.ownerDocument.body?.style.position === 'fixed') return;
    const header = runway.ownerDocument.querySelector('header');
    const nextTop =
      Math.ceil(header?.getBoundingClientRect().height || (win.innerWidth < 992 ? 90 : 104)) + 12;
    // The image height depends on this inset. Apply it before reading the stage
    // so the pinning decision uses the fitted layout, including after a resize.
    runway.style.setProperty('--services-top', `${nextTop}px`);
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
    if (wasInside && enabled && win.innerWidth >= 768)
      win.scrollTo({ top: start() + (pinned ? current * step : 0), behavior: 'instant' });
    scroll();
  };
  const select = (index) => {
    const previous = current;
    activate(index);
    // Flow mode still needs a transition lifecycle even without vertical travel.
    moveTo(pinned ? start() + current * step : win.scrollY, Math.sign(current - previous));
  };
  const wheel = (event) => {
    if (
      !enabled ||
      event.ctrlKey ||
      event.metaKey ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5 ||
      excluded(event) ||
      (win.innerWidth < 768 && !mobilePanelVisible())
    )
      return;
    // Non-cancelable momentum belongs to native scrolling. Do not fight it
    // with corrective scrollTo calls or leave an old gesture locked.
    if (!event.cancelable) {
      reset();
      return;
    }
    const delta =
      event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? win.innerHeight : 1);
    const direction = Math.sign(delta);
    if (!direction) return;
    const now = win.performance.now();
    const magnitude = Math.abs(delta);
    const pixelInput = event.deltaMode === 0;
    const fineInput =
      pixelInput && (magnitude < 50 || event.deltaX !== 0 || !Number.isInteger(delta));
    const discreteInput =
      event.deltaMode !== 0 || (magnitude >= 50 && Number.isInteger(delta) && !event.deltaX);
    const fresh =
      now - burst.time > 180 ||
      direction !== burst.direction ||
      (burst.handled && !motion && !burst.trackpad && discreteInput);
    // A new finger stroke can arrive before the previous inertial tail ends.
    const impulse =
      !fresh &&
      !motion &&
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
      !motion &&
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
    const enteringDown = direction > 0 && y < first - 1 && y + delta >= first;
    const enteringUp = direction < 0 && y > last + 1 && y + delta <= last;
    const prevent = () => {
      if (event.cancelable) event.preventDefault();
    };
    // Complete the current step before accepting more input in that direction.
    // Reversals may cancel it and return to the adjacent service immediately.
    if (motion && motion.direction === direction) {
      prevent();
      return;
    }
    if (y < first - 1 || y > last + 1) {
      if (!enteringDown && !enteringUp) {
        reset();
        return;
      }
    }
    if (burst.handled && holdY !== null) {
      prevent();
      scroll();
      return;
    }
    if (enteringDown || enteringUp) {
      prevent();
      if (pinned) activate(enteringDown ? 0 : count - 1);
      holdY = enteringDown ? first : last;
      moveTo(holdY, direction);
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
    if (!burst.capturing) {
      holdY = motion?.target ?? (pinned ? first + current * step : y);
      burst.capturing = true;
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
  const touchStart = (event) => {
    reset();
    if (
      !enabled ||
      win.innerWidth >= 768 ||
      excluded(event) ||
      event.touches?.length !== 1 ||
      !mobilePanelVisible()
    )
      return;
    const finger = event.touches[0];
    touch = { id: finger.identifier, x: finger.clientX, y: finger.clientY, handled: false };
  };
  const touchMove = (event) => {
    if (!touch) return;
    if (event.touches.length !== 1 || !event.cancelable) {
      touch = null;
      return;
    }
    const finger = event.touches[0];
    if (finger.identifier !== touch.id) return;
    const dx = finger.clientX - touch.x;
    const dy = touch.y - finger.clientY;
    if (Math.abs(dx) > Math.abs(dy)) {
      touch = null;
      return;
    }
    if (Math.abs(dy) < 8) return;
    const direction = Math.sign(dy);
    if (
      !touch.handled &&
      ((current === 0 && direction < 0) || (current === count - 1 && direction > 0))
    ) {
      touch = null;
      return;
    }
    // Capture before native panning starts; consume the remainder of this
    // finger stroke so a long swipe cannot skip several services.
    event.preventDefault();
    if (!touch.handled && Math.abs(dy) >= 48) {
      select(current + direction);
      touch.handled = true;
    }
  };
  const touchEnd = () => {
    touch = null;
  };
  win.addEventListener('scroll', scroll, { passive: true });
  win.addEventListener('resize', measure);
  win.addEventListener('wheel', wheel, { passive: false });
  win.addEventListener('touchstart', touchStart, { passive: true });
  win.addEventListener('touchmove', touchMove, { passive: false });
  win.addEventListener('touchend', touchEnd, { passive: true });
  win.addEventListener('touchcancel', touchEnd, { passive: true });
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
      win.removeEventListener('touchstart', touchStart);
      win.removeEventListener('touchmove', touchMove);
      win.removeEventListener('touchend', touchEnd);
      win.removeEventListener('touchcancel', touchEnd);
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
