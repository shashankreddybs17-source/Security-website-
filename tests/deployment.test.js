import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('the deployment command builds and validates production instead of serving development', () => {
  const pkg = JSON.parse(readFileSync('package.json'));
  const config = JSON.parse(readFileSync('vercel.json'));
  assert.equal(config.buildCommand, 'npm run check:deploy');
  assert.equal(
    pkg.scripts['check:deploy'],
    'npm test && npm run build && node scripts/audit-production.mjs',
  );
  assert.equal(config.installCommand, 'npm ci');
  assert.equal(config.outputDirectory, 'dist');
});
