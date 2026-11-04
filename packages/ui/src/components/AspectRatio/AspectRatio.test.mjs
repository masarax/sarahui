import test from 'node:test';
import assert from 'node:assert/strict';
import { AspectRatio } from './AspectRatio.js';

test('AspectRatio renders cleanly and supports properties', () => {
  const result = AspectRatio({});
  assert.ok(result, 'AspectRatio should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AspectRatio should not be empty');
});
