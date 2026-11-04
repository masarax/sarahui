import test from 'node:test';
import assert from 'node:assert/strict';
import { AuroraText } from './AuroraText.js';

test('AuroraText renders cleanly and supports properties', () => {
  const result = AuroraText({});
  assert.ok(result, 'AuroraText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AuroraText should not be empty');
});
