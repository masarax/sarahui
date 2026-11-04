import test from 'node:test';
import assert from 'node:assert/strict';
import { TweetCard } from './TweetCard.js';

test('TweetCard Pillar 1: renders semantic article with author, handle, and content', () => {
  const html = String(TweetCard());
  assert.ok(html.includes('<article'), 'must be semantic article');
  assert.ok(html.includes('class="s-tweet-card'), 'base class missing');
  assert.ok(html.includes('data-tweet-id'), 'data-tweet-id missing');
  assert.ok(html.includes('s-tweet-avatar'), 'avatar missing');
  assert.ok(html.includes('s-tweet-author'), 'author missing');
});

test('TweetCard Pillar 2: preserves custom classes and renders custom props', () => {
  const html = String(TweetCard({
    name: 'SarahUI Team',
    handle: 'sarahui',
    text: 'Excited to announce SarahUI v1.0!',
    className: 'border border-slate-700'
  }));
  assert.ok(html.includes('border border-slate-700'), 'custom classes missing');
  assert.ok(html.includes('SarahUI Team'), 'custom name missing');
  assert.ok(html.includes('@sarahui'), 'custom handle missing');
  assert.ok(html.includes('Excited to announce SarahUI v1.0!'), 'content text missing');
});

test('TweetCard Pillar 3: renders verified badge and prevents hostile URL injection', () => {
  const verified = String(TweetCard({ verified: true }));
  assert.ok(verified.includes('s-tweet-verified'), 'verified badge missing');

  const hostile = String(TweetCard({ avatar: 'javascript:alert(1)' }));
  assert.ok(!hostile.includes('src="javascript:'), 'unsafe javascript: protocol must be blocked');
});

test('TweetCard Pillar 4: handles media and video playback attributes', () => {
  const withVideo = String(TweetCard({ videoUrl: 'https://video.example.com/demo.mp4' }));
  assert.ok(withVideo.includes('<video'), 'video element missing');
  assert.ok(withVideo.includes('playsinline'), 'playsinline attribute missing');
});
