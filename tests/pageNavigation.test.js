import assert from 'node:assert/strict';
import test from 'node:test';
import { initializePageScroll, lockPageScroll } from '../src/lib/pageNavigation.js';

test('new page visits start at top; history, reloads and hash targets retain browser behavior', () => {
  for (const type of ['navigate', 'back_forward', 'reload']) {
    for (const hash of ['', '#gallery']) {
      const calls = [];
      initializePageScroll({
        performance: { getEntriesByType: () => [{ type }] },
        location: { hash },
        scrollTo: (options) => calls.push(options),
      });
      assert.equal(calls.length, type === 'navigate' && !hash ? 1 : 0);
      if (calls.length) assert.deepEqual(calls[0], { top: 0, left: 0, behavior: 'instant' });
    }
  }
});

test('mobile menu locks the page and restores styles and exact position once', () => {
  const style = {
    position: '',
    top: '',
    left: '',
    right: '',
    width: '',
    overflow: 'auto',
    paddingRight: '8px',
  };
  const previous = { ...style };
  const calls = [];
  const win = {
    scrollX: 0,
    scrollY: 1420,
    innerWidth: 390,
    getComputedStyle: () => ({ paddingRight: '8px' }),
    scrollTo: (value) => calls.push(value),
  };
  const unlock = lockPageScroll(win, { body: { style }, documentElement: { clientWidth: 375 } });
  assert.equal(style.position, 'fixed');
  assert.equal(style.top, '-1420px');
  assert.equal(style.paddingRight, '23px');
  assert.equal(style.overflow, 'hidden');
  unlock();
  unlock();
  assert.deepEqual(style, previous);
  assert.deepEqual(calls, [{ top: 1420, left: 0, behavior: 'instant' }]);
});
