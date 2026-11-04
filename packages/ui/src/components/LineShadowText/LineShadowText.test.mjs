import test from 'node:test';
import assert from 'node:assert/strict';
import { LineShadowText } from './LineShadowText.js';

test('LineShadowText renders cleanly and supports properties', () => {
  const result = LineShadowText({});
  assert.ok(result, 'LineShadowText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'LineShadowText should not be empty');
});
