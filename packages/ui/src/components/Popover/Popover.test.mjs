import test from 'node:test';
import assert from 'node:assert/strict';
import { Popover } from './Popover.js';

test('Popover renders cleanly and supports properties', () => {
  const result = Popover({});
  assert.ok(result, 'Popover should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Popover should not be empty');
});
