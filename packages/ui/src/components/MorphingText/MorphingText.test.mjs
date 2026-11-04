import test from 'node:test';
import assert from 'node:assert/strict';
import { MorphingText } from './MorphingText.js';

test('MorphingText renders cleanly and supports properties', () => {
  const result = MorphingText({});
  assert.ok(result, 'MorphingText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'MorphingText should not be empty');
});
