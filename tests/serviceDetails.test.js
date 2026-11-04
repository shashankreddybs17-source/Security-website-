import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import { build } from 'esbuild';
import { allServices } from '../src/data/services.js';
import { serviceDetails } from '../src/data/serviceDetails.js';

const require = createRequire(import.meta.url);
const output = await build({
  entryPoints: ['src/pages/Services.jsx'],
  bundle: true,
  write: false,
  outdir: 'tmp/service-detail-tests',
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  packages: 'external',
  loader: { '.module.css': 'empty' },
});
const compiled = new Module(`${process.cwd()}/service-detail-tests.cjs`);
compiled.paths = Module._nodeModulePaths(process.cwd());
compiled._compile(output.outputFiles[0].text, 'service-detail-tests.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const render = (search) => {
  globalThis.window = { location: { pathname: '/services', search } };
  return renderToStaticMarkup(React.createElement(compiled.exports.default));
};
const headings = [
  'What This Service Covers',
  'Our Approach',
  'Where This Service Is Suitable',
  'Discuss Your Requirements',
];

test('all eleven services have complete, distinct editorial content', () => {
  assert.deepEqual(Object.keys(serviceDetails).sort(), allServices.map((s) => s.id).sort());
  for (const field of ['coverage', 'approach', 'discussion', 'confirmation']) {
    assert.equal(new Set(Object.values(serviceDetails).map((d) => d[field])).size, 11, field);
  }
});
for (const service of allServices) {
  test(`${service.title}: correct hero, image, four information groups and enquiry link`, () => {
    const html = render(`?service=${service.id}`);
    const detail = serviceDetails[service.id];
    assert.ok(html.includes(`aria-label="${service.title} in detail"`));
    for (const heading of headings) assert.ok(html.includes(heading), heading);
    assert.ok(html.includes(detail.coverage));
    assert.ok(html.includes(detail.approach));
    assert.ok(html.includes(detail.confirmation));
    assert.ok(html.includes(`aria-label="Enquire about ${service.title}"`));
    assert.ok(html.includes('href="/contact-us"'));
    if (service.image) assert.ok(html.includes(service.image));
    else assert.ok(html.includes('Service image coming soon'));
    const hero = html.split('</section>')[0];
    assert.equal((hero.match(/<li>/g) || []).length, 4);
    assert.ok(hero.includes('Enquire About This Service'));
    assert.ok(!hero.includes('What This Service Covers'));
    assert.ok(html.indexOf('What This Service Covers') > html.indexOf('</section>'));
    const body = html
      .slice(html.indexOf(`aria-label="${service.title} in detail"`))
      .split('</section>')[0];
    assert.equal((body.match(/<h2>/g) || []).length, 4);
    assert.ok(!body.includes('<img'));
    assert.equal(
      (body.match(/<li>/g) || []).length,
      detail.responsibilities.length + detail.practices.length + detail.suitable.length,
    );
  });
}
test('landing and invalid selection remain a grid without detail information', () => {
  for (const search of ['', '?service=unknown']) {
    const html = render(search);
    assert.equal((html.match(/Explore Service/g) || []).length, 11);
    assert.ok(!html.includes('What This Service Covers'));
  }
});
test('new information styles provide tablet and mobile stacking without global selectors', () => {
  const css = readFileSync('src/components/ServiceDetailInformation.module.css', 'utf8');
  assert.match(css, /max-width: 991px/);
  assert.match(css, /max-width: 767px/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.ok(!/100vw|position: fixed|filter:|opacity:/.test(css));
});
