import test from 'node:test';
import assert from 'node:assert/strict';
import { ScrollProgress } from './ScrollProgress.js';

test('ScrollProgress renders cleanly and supports properties', () => {
  const result = ScrollProgress({});
  assert.ok(result, 'ScrollProgress should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ScrollProgress should not be empty');
});
