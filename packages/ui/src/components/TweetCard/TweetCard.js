import * as UI from '../../templates.js';

export function TweetCard(props = {}) {
  if (typeof UI.TweetCard === 'function') {
    return UI.TweetCard(props);
  }
  return `<article class="s-tweet-card">${props.children || ''}</article>`;
}
