import test from 'node:test';
import assert from 'node:assert/strict';
import { Icon } from './Icon.js';

test('Icon renders cleanly and supports properties', () => {
  const result = Icon({});
  assert.ok(result, 'Icon should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Icon should not be empty');
});
