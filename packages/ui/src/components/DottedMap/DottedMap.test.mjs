import test from 'node:test';
import assert from 'node:assert/strict';
import { DottedMap } from './DottedMap.js';

test('DottedMap Pillar 1: renders container and SVG with land dots and city beacons', () => {
  const html = String(DottedMap());
  assert.ok(html.includes('class="s-dotted-map-container"'), 'container class missing');
  assert.ok(html.includes('data-s-dotted-map'), 'data-s-dotted-map hook missing');
  assert.ok(html.includes('<svg'), 'SVG map element missing');
  assert.ok(html.includes('<animate attributeName="r"'), 'beacon animation missing');
});

test('DottedMap Pillar 2: scales SVG viewBox to match configured dimensions', () => {
  const html = String(DottedMap({ width: 1000, height: 500, className: 'w-full shadow-lg' }));
  assert.ok(html.includes('viewBox="0 0 1000 500"'), 'viewBox scaling missing');
  assert.ok(html.includes('w-full shadow-lg'), 'dynamic classes missing');
});

test('DottedMap Pillar 3: renders readable marker badges for assistive tech and visual users', () => {
  const custom = [{ lat: 37.77, lng: -122.41, label: 'San Francisco' }];
  const html = String(DottedMap({ markers: custom }));
  assert.ok(html.includes('San Francisco'), 'marker label missing');
});

test('DottedMap Pillar 4: handles empty markers array and points prop alias', () => {
  const empty = String(DottedMap({ markers: [] }));
  assert.ok(empty.includes('<svg'), 'must render SVG cleanly even without markers');

  const points = [{ lat: 40.71, lng: -74.00, label: 'New York' }];
  const html = String(DottedMap({ points }));
  assert.ok(html.includes('New York'), 'points alias prop missing');
});
