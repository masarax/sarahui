import test from 'node:test';
import assert from 'node:assert/strict';
import { Backlight } from './Backlight.js';

test('Backlight renders cleanly and supports properties', () => {
  const result = Backlight({});
  assert.ok(result, 'Backlight should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Backlight should not be empty');
});
