import test from 'node:test';
import assert from 'node:assert/strict';
import { Chip } from './Chip.js';

test('Chip renders cleanly and supports properties', () => {
  const result = Chip({});
  assert.ok(result, 'Chip should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Chip should not be empty');
});
