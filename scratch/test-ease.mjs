import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';

function bezier(p1x, p1y, p2x, p2y) {
  function sampleCurveX(t) {
    return ((1 - 3 * p2x + 3 * p1x) * t + (3 * p2x - 6 * p1x)) * t * t + 3 * p1x * t;
  }
  function sampleCurveY(t) {
    return ((1 - 3 * p2y + 3 * p1y) * t + (3 * p2y - 6 * p1y)) * t * t + 3 * p1y * t;
  }
  function solveCurveX(x, epsilon = 1e-6) {
    let t0, t1, t2, x2, d2, i;
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      d2 = (3 * (1 - 3 * p2x + 3 * p1x) * t2 + 2 * (3 * p2x - 6 * p1x)) * t2 + 3 * p1x;
      if (Math.abs(d2) < 1e-6) break;
      t2 = t2 - x2 / d2;
    }
    t0 = 0; t1 = 1; t2 = x;
    if (t2 < t0) return t0;
    if (t2 > t1) return t1;
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }
    return t2;
  }
  return function(x) {
    return sampleCurveY(solveCurveX(x));
  };
}

console.log('EaseOutExpo test:', bezier(0.16, 1, 0.3, 1)(0.5));

