import assert from 'node:assert/strict';
import test from 'node:test';
import { connectServiceScroll } from '../src/lib/serviceScroll.js';

function fixture({
  height = 900,
  stageHeight = 600,
  matches = true,
  width = 1280,
  panelVisible = true,
} = {}) {
  let now = 0,
    id = 0,
    y = 884;
  const frames = new Map(),
    listeners = new Map(),
    selected = [];
  let resizeCallback;
  const properties = new Map();
  const media = {
    matches,
    addEventListener(_type, fn) {
      this.change = fn;
    },
    removeEventListener() {
      this.change = null;
    },
  };
  const doc = {
    body: { style: { position: '' } },
    querySelector: () => ({ getBoundingClientRect: () => ({ height: 104 }) }),
    fonts: { ready: Promise.resolve() },
  };
  const runway = {
    ownerDocument: doc,
    dataset: {},
    style: {
      setProperty(name, value) {
        properties.set(name, value);
      },
      removeProperty(name) {
        properties.delete(name);
      },
    },
    getBoundingClientRect: () => ({ top: 1000 - y }),
  };
  const stage = {
    querySelector: () => ({
      getBoundingClientRect: () =>
        panelVisible ? { top: 200, bottom: 800 } : { top: 1000, bottom: 1600 },
    }),
    getBoundingClientRect: () => ({
      height: typeof stageHeight === 'function' ? stageHeight(properties, win) : stageHeight,
    }),
  };
  const emit = (name, event = {}) => {
    for (const fn of [...(listeners.get(name) || [])]) fn(event);
  };
  const win = {
    innerHeight: height,
    innerWidth: width,
    get scrollY() {
      return y;
    },
    performance: { now: () => now },
    matchMedia: () => media,
    requestAnimationFrame(fn) {
      frames.set(++id, fn);
      return id;
    },
    cancelAnimationFrame(key) {
      frames.delete(key);
    },
    scrollTo({ top }) {
      y = top;
      emit('scroll');
    },
    addEventListener(name, fn) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(fn);
    },
    removeEventListener(name, fn) {
      listeners.get(name)?.delete(fn);
    },
    ResizeObserver: class {
      constructor(fn) {
        resizeCallback = fn;
      }
      observe() {}
      disconnect() {}
    },
  };
  const controller = connectServiceScroll(runway, stage, 6, (index) => selected.push(index), win);
  function advance(ms) {
    const end = now + ms;
    while (now < end) {
      now = Math.min(end, now + 16);
      const batch = [...frames.values()];
      frames.clear();
      for (const fn of batch) fn(now);
    }
  }
  function wheel(delta, options = {}) {
    let prevented = false;
    const event = {
      deltaY: delta,
      deltaX: 0,
      deltaMode: 0,
      cancelable: true,
      target: { closest: () => null },
      preventDefault() {
        prevented = true;
      },
      ...options,
    };
    emit('wheel', event);
    if (!prevented)
      win.scrollTo({
        top: y + delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? win.innerHeight : 1),
      });
    return prevented;
  }
  advance(16);
  return {
    win,
    runway,
    controller,
    selected,
    advance,
    wheel,
    emit,
    frames,
    listeners,
    media,
    resize(newHeight, newStage) {
      win.innerHeight = newHeight;
      stageHeight = newStage;
      resizeCallback();
      advance(16);
    },
    active: () => selected.at(-1) ?? 0,
  };
}
const sequential = (values) => {
  for (let i = 1; i < values.length; i++)
    assert.ok(Math.abs(values[i] - values[i - 1]) <= 1, `skipped: ${values}`);
};

test('closely spaced discrete wheel notches progress in both directions without locking', () => {
  const f = fixture();
  for (let i = 0; i < 25; i++) {
    f.wheel(120);
    f.advance(100);
  }
  assert.equal(f.active(), 5);
  for (let i = 0; i < 30; i++) {
    f.wheel(-120);
    f.advance(100);
  }
  assert.equal(f.active(), 0, JSON.stringify({ y: f.win.scrollY, indices: f.selected }));
  sequential(f.selected);
  f.controller.destroy();
});
test('continuous fine trackpad input reaches every service down and up', () => {
  const f = fixture();
  for (let i = 0; i < 600; i++) {
    f.wheel(10);
    f.advance(16);
  }
  assert.equal(f.active(), 5);
  for (let i = 0; i < 700; i++) {
    f.wheel(-10);
    f.advance(16);
  }
  assert.equal(f.active(), 0, JSON.stringify({ y: f.win.scrollY, indices: f.selected }));
  sequential(f.selected);
  f.controller.destroy();
});
test('slow fine input accumulates and line/page wheel modes remain usable', () => {
  const f = fixture();
  for (let i = 0; i < 60; i++) {
    f.wheel(2);
    f.advance(30);
  }
  assert.ok(f.active() >= 1);
  f.controller.destroy();
  for (const mode of [1, 2]) {
    const g = fixture();
    assert.equal(g.wheel(1, { deltaMode: mode }), true);
    g.advance(320);
    assert.equal(g.active(), 1);
    g.controller.destroy();
  }
});
test('direction reversal halfway through a transition returns to adjacent service', () => {
  const f = fixture();
  f.wheel(120);
  f.advance(100);
  f.wheel(-120);
  f.advance(320);
  assert.equal(f.active(), 0);
  f.wheel(120);
  f.advance(320);
  assert.equal(f.active(), 1);
  sequential(f.selected);
  f.controller.destroy();
});
test('noncancelable momentum is never pulled back to the old hold position', () => {
  const f = fixture();
  f.wheel(120);
  f.advance(320);
  const before = f.win.scrollY;
  assert.equal(f.wheel(50, { cancelable: false }), false);
  f.advance(32);
  assert.equal(f.win.scrollY, before + 50);
  f.controller.destroy();
});
test('native scrollbar/touch/keyboard input cancels animation and stays free', () => {
  for (const input of ['pointerdown', 'touchstart', 'keydown']) {
    const f = fixture();
    f.wheel(120);
    f.advance(100);
    f.emit(input);
    f.win.scrollTo({ top: 200 });
    f.advance(400);
    assert.equal(f.win.scrollY, 200);
    f.controller.destroy();
  }
});
test('endpoints release normal scroll and entry from either side lands at the boundary', () => {
  const f = fixture();
  assert.equal(f.wheel(-120), false);
  f.advance(200);
  assert.equal(f.wheel(120), true);
  f.advance(320);
  assert.equal(f.active(), 0);
  f.controller.select(5);
  f.advance(320);
  assert.equal(f.wheel(120), false);
  f.advance(200);
  assert.equal(f.wheel(-120), true);
  f.advance(320);
  assert.equal(f.active(), 5);
  f.controller.destroy();
});
test('flow layout and post-load measurements preserve selected service', () => {
  const f = fixture();
  f.controller.select(3);
  f.advance(320);
  f.resize(700, 1100);
  assert.equal(f.runway.dataset.scrollMode, 'flow');
  assert.equal(f.active(), 3);
  f.wheel(-120);
  f.advance(320);
  assert.equal(f.active(), 2);
  f.wheel(-120);
  f.advance(320);
  assert.equal(f.active(), 1);
  f.controller.destroy();
});
test('reduced-motion mode never intercepts native scrolling', () => {
  const f = fixture({ matches: false });
  assert.equal(f.runway.dataset.scrollMode, 'native');
  assert.equal(f.wheel(120), false);
  f.controller.select(4);
  assert.equal(f.active(), 4);
  f.controller.destroy();
});
test('destroy/remount removes listeners and pending animation frames', async () => {
  const f = fixture();
  f.wheel(120);
  f.controller.destroy();
  await Promise.resolve();
  f.advance(400);
  for (const handlers of f.listeners.values()) assert.equal(handlers.size, 0);
  assert.equal(f.frames.size, 0);
  assert.equal(f.media.change, null);
});

test('decaying upward touchpad momentum consumes one step without skipping', () => {
  const f = fixture();
  f.controller.select(5);
  f.advance(320);
  const previous = f.selected.length;
  for (const delta of [-40, -35, -28, -21, -16, -12, -8, -5, -3, -1]) {
    f.wheel(delta);
    f.advance(40);
  }
  f.advance(320);
  assert.equal(f.active(), 4);
  assert.deepEqual(f.selected.slice(previous), [4]);
  f.controller.destroy();
});
test('fractional boundary coordinates do not cause repeated upward re-entry', () => {
  const f = fixture();
  f.controller.select(5);
  f.advance(320);
  f.win.scrollTo({ top: f.win.scrollY + 0.4 });
  for (let i = 0; i < 100; i++) {
    f.wheel(-10);
    f.advance(16);
  }
  assert.ok(f.active() < 5);
  f.controller.destroy();
});
test('zoom, horizontal gestures and navbar controls retain normal input', () => {
  for (const options of [
    { ctrlKey: true },
    { metaKey: true },
    { deltaX: 400 },
    { target: { closest: () => ({}) } },
  ]) {
    const f = fixture();
    assert.equal(f.wheel(120, options), false);
    f.controller.destroy();
  }
});
test('tall non-sticky section does not jump first-to-last after native scroll', () => {
  const f = fixture({ height: 900, stageHeight: 1050 });
  assert.equal(f.runway.dataset.scrollMode, 'flow');
  // The screenshot's section is taller than the usable viewport. Its flow
  // capture interval is short: crossing it must not mean selecting the last tab.
  f.win.scrollTo({ top: 1200 });
  f.advance(32);
  assert.equal(f.active(), 0);
  assert.deepEqual(f.selected, []);
  f.controller.destroy();
});

test('tall layout preserves selection through noncancelable momentum and re-entry', () => {
  const f = fixture({ height: 900, stageHeight: 1050 });
  f.controller.select(1);
  f.advance(320);
  f.wheel(720, { cancelable: false });
  f.advance(32);
  assert.equal(f.active(), 1);
  f.advance(200);
  f.wheel(-120);
  f.advance(320);
  assert.equal(f.active(), 1);
  f.advance(200);
  f.wheel(-120);
  f.advance(320);
  assert.equal(f.active(), 0);
  f.controller.destroy();
});
test('one wheel step changes one service while tall layout is visibly on screen', () => {
  const f = fixture({ height: 900, stageHeight: 850 });
  // Like the screenshot: heading partly above the header, cards still visible.
  f.win.scrollTo({ top: 1024 });
  f.advance(32);
  const position = f.win.scrollY;
  for (let index = 1; index <= 5; index++) {
    assert.equal(f.wheel(120), true);
    f.advance(340);
    assert.equal(f.active(), index);
    assert.equal(f.win.scrollY, position);
  }
  for (let index = 4; index >= 0; index--) {
    assert.equal(f.wheel(-120), true);
    f.advance(340);
    assert.equal(f.active(), index);
    assert.equal(f.win.scrollY, position);
  }
  assert.deepEqual(f.selected, [1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
  assert.equal(f.wheel(-120), false);
  f.controller.destroy();
});

test('viewport-fitted stage measures its navbar inset before enabling sticky stepping', () => {
  const f = fixture({
    stageHeight: (properties, win) => {
      assert.equal(properties.get('--services-top'), '116px');
      return Math.min(620, win.innerHeight - 116 - 24);
    },
  });
  assert.equal(f.runway.dataset.pinned, 'true');
  for (let index = 1; index <= 5; index++) {
    f.wheel(120);
    f.advance(340);
    assert.equal(f.active(), index);
    assert.equal(f.runway.dataset.pinned, 'true');
  }
  for (let index = 4; index >= 0; index--) {
    f.wheel(-120);
    f.advance(340);
    assert.equal(f.active(), index);
  }
  f.controller.destroy();
});

test('mobile wheel selection progresses sequentially without pinning the tall layout', () => {
  const f = fixture({ width: 320, height: 861, stageHeight: 1150 });
  assert.equal(f.runway.dataset.pinned, 'false');
  for (let index = 1; index <= 5; index++) {
    assert.equal(f.wheel(120), true);
    f.advance(340);
    assert.equal(f.active(), index);
  }
  assert.equal(f.wheel(120), false);
  f.controller.destroy();
});

test('mobile swipes change exactly one service per stroke in both directions and release endpoints', () => {
  const f = fixture({ width: 320, height: 861, stageHeight: 1150 });
  const swipe = (direction) => {
    let prevented = false;
    f.emit('touchstart', { touches: [{ identifier: 1, clientX: 100, clientY: 400 }] });
    for (const distance of [12, 60, 180, 300]) {
      f.emit('touchmove', {
        cancelable: true,
        touches: [{ identifier: 1, clientX: 100, clientY: 400 - direction * distance }],
        preventDefault() {
          prevented = true;
        },
      });
    }
    f.emit('touchend');
    return prevented;
  };
  const initialY = f.win.scrollY;
  assert.equal(swipe(-1), false);
  for (let index = 1; index <= 5; index++) {
    assert.equal(swipe(1), true);
    assert.equal(f.active(), index);
  }
  assert.equal(swipe(1), false);
  for (let index = 4; index >= 0; index--) {
    assert.equal(swipe(-1), true);
    assert.equal(f.active(), index);
  }
  assert.equal(f.win.scrollY, initialY);
  assert.deepEqual(f.selected, [1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
  f.controller.destroy();
});

test('mobile preserves native scrolling before the image, pinch zoom, horizontal swipes and reduced motion', () => {
  for (const options of [{ panelVisible: false }, { matches: false }, {}]) {
    const f = fixture({ width: 320, ...options });
    const finger = { identifier: 1, clientX: 100, clientY: 400 };
    f.emit('touchstart', { touches: [finger] });
    let prevented = false;
    f.emit('touchmove', {
      cancelable: true,
      touches: [{ ...finger, clientX: 250, clientY: 350 }],
      preventDefault() {
        prevented = true;
      },
    });
    assert.equal(prevented, false);
    f.emit('touchstart', { touches: [finger, { ...finger, identifier: 2 }] });
    f.emit('touchmove', {
      cancelable: true,
      touches: [finger],
      preventDefault() {
        prevented = true;
      },
    });
    assert.equal(prevented, false);
    assert.equal(f.active(), 0);
    f.controller.destroy();
  }
});

test('opening a fixed-body mobile menu preserves the pinned service selection', () => {
  const f = fixture({ width: 768 });
  f.controller.select(3);
  f.advance(340);
  f.runway.ownerDocument.body.style.position = 'fixed';
  f.win.scrollTo({ top: 0 });
  f.resize(900, 600);
  f.advance(340);
  assert.equal(f.active(), 3);
  f.runway.ownerDocument.body.style.position = '';
  f.win.scrollTo({ top: 884 + 3 * 450 });
  f.advance(32);
  assert.equal(f.active(), 3);
  f.controller.destroy();
});

test('mobile gestures leave an off-screen description and CTA reachable by native scroll', () => {
  // The image is visible but the bottom of the service card is not.
  const clipped = fixture({ width: 320, height: 720, stageHeight: 1100 });
  assert.equal(clipped.wheel(120), false);
  let prevented = false;
  clipped.emit('touchstart', { touches: [{ identifier: 1, clientX: 100, clientY: 400 }] });
  clipped.emit('touchmove', {
    cancelable: true,
    touches: [{ identifier: 1, clientX: 100, clientY: 300 }],
    preventDefault() {
      prevented = true;
    },
  });
  assert.equal(prevented, false);
  assert.equal(clipped.active(), 0);
  clipped.controller.destroy();
});

test('a fitted mobile stage keeps each swipe and image selection synchronized', () => {
  const f = fixture({ width: 320, height: 861, stageHeight: 650 });
  assert.equal(f.runway.dataset.pinned, 'true');
  for (const direction of [1, 1, 1, -1, -1, -1]) {
    const previous = f.active();
    f.emit('touchstart', { touches: [{ identifier: 1, clientX: 100, clientY: 400 }] });
    f.emit('touchmove', {
      cancelable: true,
      touches: [{ identifier: 1, clientX: 100, clientY: 400 - direction * 80 }],
      preventDefault() {},
    });
    f.emit('touchend');
    f.advance(340);
    assert.equal(f.active(), previous + direction);
  }
  f.controller.destroy();
});
