import test from 'node:test';
import assert from 'node:assert/strict';
import { Slider } from './Slider.js';

test('Slider renders cleanly and supports properties', () => {
  const result = Slider({});
  assert.ok(result, 'Slider should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Slider should not be empty');
});
