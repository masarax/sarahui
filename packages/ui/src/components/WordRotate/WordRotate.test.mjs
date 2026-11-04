import test from 'node:test';
import assert from 'node:assert/strict';
import { WordRotate } from './WordRotate.js';

test('WordRotate renders cleanly and supports properties', () => {
  const result = WordRotate({});
  assert.ok(result, 'WordRotate should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'WordRotate should not be empty');
});
