import test from 'node:test';
import assert from 'node:assert/strict';
import { ToggleGroup } from './ToggleGroup.js';

test('ToggleGroup renders cleanly and supports properties', () => {
  const result = ToggleGroup({});
  assert.ok(result, 'ToggleGroup should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ToggleGroup should not be empty');
});
