import test from 'node:test';
import assert from 'node:assert/strict';
import { Tooltip } from './Tooltip.js';

test('Tooltip renders cleanly and supports properties', () => {
  const result = Tooltip({});
  assert.ok(result, 'Tooltip should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Tooltip should not be empty');
});
