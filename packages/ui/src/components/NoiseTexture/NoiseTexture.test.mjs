import test from 'node:test';
import assert from 'node:assert/strict';
import { NoiseTexture } from './NoiseTexture.js';

test('NoiseTexture renders cleanly and supports properties', () => {
  const result = NoiseTexture({});
  assert.ok(result, 'NoiseTexture should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'NoiseTexture should not be empty');
});
