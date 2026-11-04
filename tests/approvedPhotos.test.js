import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { approvedTeamPhoto, approvedTeamPhotos } from '../src/data/approvedPhotos.js';
import { allServices, existingServices } from '../src/data/services.js';

test('all service photos come from the approved upload set, consistently across pages', () => {
  for (const service of allServices) {
    if (service.id === 'gunman-services')
      assert.equal(service.image, '/assets/hitech/new-uniform/gunman.webp');
    assert.ok(service.image.startsWith('/assets/hitech/new-uniform/'), service.id);
    assert.ok(existsSync('public' + service.image), service.image);
  }
  for (const service of existingServices)
    assert.equal(service.image, allServices.find((item) => item.id === service.id).image);
  for (const image of Object.values(approvedTeamPhotos)) {
    assert.ok(existsSync('public' + image));
    assert.ok(image.endsWith('.webp'), image);
    const bytes = readFileSync('public' + image);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
  assert.throws(() => approvedTeamPhoto('unknown'), /No approved replacement/);
});

test('source components no longer reference legacy uniform or generated personnel images', () => {
  function scan(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (/\.(jsx?|css)$/.test(path)) {
        const source = readFileSync(path, 'utf8');
        assert.ok(!/\/assets\/hitech\/team-/.test(source), path);
        assert.ok(
          !/\/assets\/hitech\/(?:services\/[^'"` ]+\.png|home-hero-enhanced\.png|contact-guard-cream\.png)/.test(
            source,
          ),
          path,
        );
      }
    }
  }
  scan('src');
});
