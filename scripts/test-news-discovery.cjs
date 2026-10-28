const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();

function loadTypeScript(relativePath) {
  const file = path.join(root, relativePath);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const requireLocal = (name) => name.startsWith('@/') ? loadTypeScript(`${name.slice(2)}.ts`) : require(name);
  vm.runInThisContext(`(function(require, module, exports) { ${js}\n})`, { filename: file })(requireLocal, module, module.exports);
  return module.exports;
}

const { createNewsSitemap } = loadTypeScript('lib/news-discovery.ts');
const story = (slug, published, title = slug) => ({ slug, published, title });
const now = new Date('2026-10-28T12:00:00Z');

test('news sitemap includes recent stories and excludes old, future, and invalid dates', () => {
  const xml = createNewsSitemap([
    story('recent', '2026-10-28'), story('yesterday', '2026-10-27'),
    story('old', '2026-10-25'), story('future', '2026-10-29'), story('invalid', 'not-a-date'),
  ], now);
  assert.match(xml, /\/news\/recent\//);
  assert.match(xml, /\/news\/yesterday\//);
  for (const slug of ['old', 'future', 'invalid']) assert.ok(!xml.includes(`/news/${slug}/`));
});

test('the 48-hour boundary is inclusive and entries age out', () => {
  const entry = story('boundary', '2026-10-26T12:00:00Z');
  assert.match(createNewsSitemap([entry], now), /\/news\/boundary\//);
  assert.ok(!createNewsSitemap([entry], new Date(now.getTime() + 1)).includes('/news/boundary/'));
});

test('publication date remains the original article date and titles are XML-escaped', () => {
  const xml = createNewsSitemap([story('escape', '2026-10-27', 'AI & <Worlds> "explained"')], now);
  assert.match(xml, /AI &amp; &lt;Worlds&gt; &quot;explained&quot;/);
  assert.match(xml, /<news:publication_date>2026-10-27<\/news:publication_date>/);
  assert.match(xml, /<news:language>en<\/news:language>/);
});

test('an empty recent window produces a valid empty sitemap and entries are capped at 1000', () => {
  const empty = createNewsSitemap([story('old', '2020-01-01')], now);
  assert.ok(empty.endsWith('</urlset>'));
  assert.ok(!empty.includes('<url>'));
  const many = Array.from({ length: 1005 }, (_, index) => story(`story-${index}`, '2026-10-28'));
  assert.equal((createNewsSitemap(many, now).match(/<news:news>/g) || []).length, 1000);
});
