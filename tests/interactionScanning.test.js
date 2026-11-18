import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeInteractions } from '../src/lib/interactions.js';

test('counter text mutations skip scanning while newly mounted subtrees initialize', () => {
  const previous = Object.fromEntries(
    ['window', 'MutationObserver', 'IntersectionObserver'].map((key) => [key, globalThis[key]]),
  );
  let onMutation;
  let rootScans = 0;
  let subtreeScans = 0;
  let disconnected = false;
  globalThis.window = {
    matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
  };
  globalThis.IntersectionObserver = undefined;
  globalThis.MutationObserver = class {
    constructor(callback) {
      onMutation = callback;
    }
    observe() {}
    disconnect() {
      disconnected = true;
    }
  };
  try {
    const cleanup = initializeInteractions({
      querySelectorAll() {
        rootScans++;
        return [];
      },
    });
    assert.equal(rootScans, 3);
    onMutation([{ addedNodes: [{ nodeType: 3 }] }]);
    assert.equal(rootScans, 3, 'text count-up updates must not rescan the page');
    onMutation([
      {
        addedNodes: [
          {
            nodeType: 1,
            matches() {
              return false;
            },
            querySelectorAll() {
              subtreeScans++;
              return [];
            },
          },
        ],
      },
    ]);
    assert.equal(subtreeScans, 3, 'lazy-mounted content must still initialize');
    assert.equal(rootScans, 3);
    cleanup();
    assert.ok(disconnected);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});
