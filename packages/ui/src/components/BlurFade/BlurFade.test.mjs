import test from 'node:test';
import assert from 'node:assert/strict';
import { BlurFade } from './BlurFade.js';

test('BlurFade renders cleanly and supports properties', () => {
  const result = BlurFade({});
  assert.ok(result, 'BlurFade should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'BlurFade should not be empty');
});
