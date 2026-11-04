import { raw } from './raw.js';
import { render } from './render.js';

export const html = (parts, ...values) => raw(parts.reduce((s, p, i) => s + p + (i < values.length ? render(values[i]) : ''), ''));
