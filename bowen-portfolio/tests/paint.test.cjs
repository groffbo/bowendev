const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function compile(path, dependencies, env = {}) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require: name => dependencies[name] || require(name), process: { env }, Buffer, Response, Request, URL, TextDecoder });
  return exports;
}
const paint = compile('app/_lib/paint.ts', {});
const stroke = { color: '#000000', size: 5, points: [[0, 0], [480, 320]] };
test('drawing validation accepts edges and rejects malformed or excessive strokes', () => {
  assert.equal(paint.validStrokes([stroke]), true);
  assert.equal(paint.validStrokes([{ ...stroke, color: '#3ca9D2' }]), true);
  assert.equal(paint.validStrokes([{ ...stroke, color: '#FFF' }]), false);
  assert.equal(paint.validStrokes([{ ...stroke, color: '#FFFFFF' }]), false);
  for (const value of [[], null, [{ ...stroke, color: 'url(evil)' }], [{ ...stroke, color: '#ffffff' }], [{ ...stroke, size: 900 }], [{ ...stroke, points: [[481, 0]] }], [{ ...stroke, points: [[NaN, 1]] }], Array(251).fill(stroke), [{ ...stroke, points: Array(12001).fill([1, 1]) }]]) {
    assert.equal(paint.validStrokes(value), false);
  }
});
test('API fails closed, gates moderation, bounds requests, and only queries approved public drawings', async () => {
  const queries = [];
  const sql = async (strings, ...values) => { queries.push(values); return [{ status: 'pending' }]; };
  const dependencies = { '@neondatabase/serverless': { neon: () => sql }, '../../_lib/paint': paint };
  const off = compile('app/api/drawings/route.ts', dependencies);
  assert.equal((await off.GET(new Request('https://example.com/api/drawings'))).status, 503);
  const api = compile('app/api/drawings/route.ts', dependencies, { DATABASE_URL: 'test', PAINT_ADMIN_SECRET: 'a'.repeat(64) });
  assert.equal((await api.GET(new Request('https://example.com/api/drawings?review=1'))).status, 401);
  assert.equal((await api.PATCH(new Request('https://example.com/api/drawings', { method: 'PATCH', body: '{}' }))).status, 401);
  assert.equal(queries.length, 0);
  await api.GET(new Request('https://example.com/api/drawings'));
  assert.equal(queries[0][0], 'approved');
  const submit = (body, origin = 'https://example.com') => api.POST(new Request('https://example.com/api/drawings', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body }));
  assert.equal((await submit('{}', 'https://elsewhere.com')).status, 403);
  assert.equal((await submit('a'.repeat(250001))).status, 413);
  assert.equal((await submit('invalid json')).status, 400);
  assert.equal((await submit(JSON.stringify({ id: 'bad', strokes: [stroke] }))).status, 400);
  assert.equal((await submit(JSON.stringify({ id: '550e8400-e29b-41d4-a716-446655440000', strokes: [stroke] }))).status, 201);
});
