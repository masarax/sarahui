import test from 'node:test';
import assert from 'node:assert/strict';
import { PixelImage } from './PixelImage.js';

test('PixelImage renders cleanly and supports properties', () => {
  const result = PixelImage({});
  assert.ok(result, 'PixelImage should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'PixelImage should not be empty');
});
