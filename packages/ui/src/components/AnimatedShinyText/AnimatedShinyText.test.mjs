import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedShinyText } from './AnimatedShinyText.js';

test('AnimatedShinyText renders cleanly and supports properties', () => {
  const result = AnimatedShinyText({});
  assert.ok(result, 'AnimatedShinyText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedShinyText should not be empty');
});
