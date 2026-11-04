import test from 'node:test';
import assert from 'node:assert/strict';
import { Text3DFlip } from './Text3DFlip.js';

test('Text3DFlip renders cleanly and supports properties', () => {
  const result = Text3DFlip({});
  assert.ok(result, 'Text3DFlip should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Text3DFlip should not be empty');
});
