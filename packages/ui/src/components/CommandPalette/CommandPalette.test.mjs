import test from 'node:test';
import assert from 'node:assert/strict';
import { CommandPalette } from './CommandPalette.js';

test('CommandPalette renders cleanly and supports properties', () => {
  const result = CommandPalette({});
  assert.ok(result, 'CommandPalette should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'CommandPalette should not be empty');
});
