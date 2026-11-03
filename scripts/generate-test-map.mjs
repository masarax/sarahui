import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

function createWorldLandCheck() {
  return function isLand(lat, lng) {
    // 1. Greenland
    if (lat >= 59 && lat <= 83 && lng >= -73 && lng <= -12) {
      if (lat >= 78 && lng < -55) return false;
      if (lat < 65 && lng > -35 && lng < -25) return false;
      return true;
    }
    // 2. Alaska
    if (lat >= 52 && lat <= 71 && lng >= -168 && lng <= -130) {
      if (lat < 58 && lng > -140) return false;
      return true;
    }
    // 3. Canada
    if (lat >= 45 && lat <= 75 && lng >= -140 && lng <= -52) {
      if (lat >= 51 && lat <= 64 && lng >= -94 && lng <= -77) return false;
      if (lat >= 68 && lng > -105 && lng < -85) return false;
      return true;
    }
    // 4. USA Contiguous
    if (lat >= 24.5 && lat <= 49.5 && lng >= -125 && lng <= -66) {
      if (lng < -120 && lat < 34) return false;
      if (lat < 32 && lng < -110 && (lat * 1.8 + lng < -50)) return false;
      if (lat < 30.5 && lng > -95 && lng < -83) return false;
      if (lat < 35 && lng > -75) return false;
      if (lat < 28 && lng < -82) return false;
      return true;
    }
    // 5. Mexico & Central America
    if (lat >= 7 && lat <= 32.5 && lng >= -118 && lng <= -77) {
      if (lat >= 22 && lat <= 32.5 && lng >= -116 && lng <= -109) return true;
      if (lat >= 22 && lat <= 30 && lng >= -112 && lng <= -106) return false;
      if (lat >= 14 && lat <= 32 && lng >= -106 && lng <= -86) {
        if (lat > 26 && lng > -97) return false;
        return true;
      }
      if (lat >= 7 && lat <= 16 && lng >= -93 && lng <= -77) {
        if (lat < 9 && lng < -83) return false;
        return true;
      }
    }
    // 6. Caribbean Islands
    if (lat >= 17 && lat <= 24 && lng >= -85 && lng <= -64) {
      if (lat >= 21 && lat <= 23.5 && lng >= -85 && lng <= -74) return true;
      if (lat >= 17.5 && lat <= 20 && lng >= -74 && lng <= -68) return true;
      if (lat >= 17.5 && lat <= 18.5 && lng >= -67.5 && lng <= -65) return true;
      if (lat >= 17.5 && lat <= 18.5 && lng >= -78.5 && lng <= -76) return true;
    }
    // 7. South America
    if (lat >= -56 && lat <= 13 && lng >= -82 && lng <= -34) {
      if (lat > 5 && lng < -77) return false;
      if (lat <= 5 && lat > -5 && lng < -81) return false;
      if (lat <= -5 && lat > -18 && lng < -81.5 + (lat + 5) * 0.7) return false;
      if (lat <= -18 && lat > -45 && lng < -76) return false;
      if (lat <= -45 && lng < -76) return false;
      if (lat > 5 && lng > -50) return false;
      if (lat <= 5 && lat > -10 && lng > -34) return false;
      if (lat <= -10 && lat > -23 && lng > -34 + (lat + 10) * 0.6) return false;
      if (lat <= -23 && lat > -40 && lng > -43 + (lat + 23) * 0.8) return false;
      if (lat <= -40 && lng > -58 + (lat + 40) * 0.6) return false;
      return true;
    }
    // 8. UK & Ireland
    if (lat >= 50 && lat <= 59.5 && lng >= -10.5 && lng <= 2) {
      if (lng > -5 && lat < 50.5) return false;
      if (lng < -6 && lat > 55.5 && lat < 57.5 && lng > -8) return false;
      return true;
    }
    // 9. Iceland
    if (lat >= 63.3 && lat <= 66.6 && lng >= -24.5 && lng <= -13.5) return true;
    // 10. Scandinavia
    if (lat >= 55 && lat <= 71.5 && lng >= 4.5 && lng <= 33) {
      if (lat >= 56 && lat <= 65 && lng >= 16 && lng <= 24) return false;
      if (lat < 58 && lng < 11.5) return false;
      return true;
    }
    // 11. Western & Central Europe
    if (lat >= 35.5 && lat <= 56 && lng >= -10 && lng <= 32) {
      if (lat >= 36 && lat <= 44 && lng >= -9.5 && lng <= 3.5) {
        if (lat < 36) return false;
        return true;
      }
      if (lat >= 43 && lat <= 55 && lng >= -2 && lng <= 24) {
        if (lat < 43.5 && lng > 3 && lng < 8) return false;
        return true;
      }
      if (lat >= 37 && lat <= 46 && lng >= 7 && lng <= 19) {
        if (lat < 41 && lng < 12 && !(lat >= 37.5 && lat <= 38.5 && lng >= 13 && lng <= 15.5)) return false;
        if (lat < 45 && lat > 40 && lng > 15 && lng < 18) return false;
        return true;
      }
      if (lat >= 35 && lat <= 56 && lng >= 19 && lng <= 32) {
        if (lat < 39 && lng > 24 && lng < 27) return false;
        return true;
      }
    }
    // 12. Eastern Europe & Russia
    if (lat >= 44 && lat <= 70 && lng >= 30 && lng <= 60) {
      if (lat >= 41 && lat <= 46.5 && lng >= 28 && lng <= 41.5) return false;
      if (lat >= 37 && lat <= 47 && lng >= 47 && lng <= 54) return false;
      return true;
    }
    // 13. Africa
    if (lat >= -35 && lat <= 37.5 && lng >= -18 && lng <= 52) {
      if (lat >= 15 && lat <= 37.5 && lng >= -18 && lng <= 35) {
        if (lat > 32 && lng > 11 && lng < 20) return false;
        if (lat > 36 && lng < -6) return false;
        return true;
      }
      if (lat >= 12.5 && lat <= 28 && lng >= 33 && lng <= 43.5) {
        if (lng > 33 + (lat - 12.5) * 0.4 && lng < 43.5 - (lat - 12.5) * 0.3) return false;
      }
      if (lat >= 4 && lat <= 15 && lng >= -18 && lng <= 10) return true;
      if (lat >= -15 && lat <= 15 && lng >= 8 && lng <= 51.5) {
        if (lat < 4 && lng < 9.5) return false;
        if (lat > 10 && lng > 51.5) return false;
        return true;
      }
      if (lat >= -35 && lat < -15 && lng >= 11 && lng <= 36) {
        if (lat < -30 && (lng < 17 || lng > 33)) return false;
        if (lat < -34 && (lng < 18 || lng > 29)) return false;
        return true;
      }
    }
    // 14. Madagascar
    if (lat >= -26 && lat <= -11.5 && lng >= 43 && lng <= 50.8) return true;
    // 15. Middle East & Arabian Peninsula
    if (lat >= 12 && lat <= 38 && lng >= 34 && lng <= 63) {
      if (lat >= 24 && lat <= 30 && lng >= 48.5 && lng <= 56) return false;
      if (lat < 12.5) return false;
      return true;
    }
    // 16. Central Asia
    if (lat >= 36 && lat <= 55 && lng >= 50 && lng <= 88) {
      if (lat >= 37 && lat <= 47 && lng >= 47 && lng <= 54) return false;
      if (lat >= 44 && lat <= 46.5 && lng >= 58 && lng <= 61.5) return false;
      return true;
    }
    // 17. Northern Asia / Siberia
    if (lat >= 48 && lat <= 77 && lng >= 60 && lng <= 180) {
      if (lat > 73 && lng > 140 && lng < 160) return false;
      if (lat >= 50 && lat <= 60 && lng >= 143 && lng <= 156) return false;
      return true;
    }
    if (lat >= 51 && lat <= 62 && lng >= 156 && lng <= 164) return true;
    // 18. South Asia
    if (lat >= 6 && lat <= 36 && lng >= 62 && lng <= 92) {
      if (lat < 22 && lng < 69) return false;
      if (lat < 22 && lng > 89) return false;
      if (lat < 16 && (lng < 73 || lng > 83)) return false;
      if (lat < 11 && (lng < 76 || lng > 80)) return false;
      if (lat < 8 && (lng < 77 || lng > 78.5)) return false;
      return true;
    }
    if (lat >= 5.8 && lat <= 9.8 && lng >= 79.5 && lng <= 82) return true;
    // 19. East Asia
    if (lat >= 18 && lat <= 53 && lng >= 75 && lng <= 135) {
      if (lat < 22 && lng < 107) return false;
      if (lat < 30 && lng > 122) return false;
      if (lat >= 34 && lat <= 40 && lng >= 119 && lng <= 125) return false;
      return true;
    }
    if (lat >= 34 && lat <= 42.5 && lng >= 125 && lng <= 130) return true;
    if (lat >= 30.5 && lat <= 45.5 && lng >= 129 && lng <= 146) {
      if (lat < 33 && lng > 136) return false;
      if (lat > 37 && lng < 136) return false;
      return true;
    }
    if (lat >= 21.8 && lat <= 25.3 && lng >= 119.8 && lng <= 122.2) return true;
    // 20. Southeast Asia
    if (lat >= 8.5 && lat <= 24 && lng >= 92 && lng <= 109.5) {
      if (lat < 13 && lng > 100 && lng < 103) return false;
      return true;
    }
    if (lat >= 1.2 && lat <= 7 && lng >= 99.5 && lng <= 104.5) return true;
    if (lat >= -6 && lat <= 6 && lng >= 95 && lng <= 106) {
      if ((lat + 6) * 1.8 + (lng - 95) < 5 || (lat + 6) * 1.8 + (lng - 95) > 30) return false;
      return true;
    }
    if (lat >= -8.8 && lat <= -5.8 && lng >= 105 && lng <= 114.5) return true;
    if (lat >= -4.5 && lat <= 7.2 && lng >= 108.5 && lng <= 119.2) return true;
    if (lat >= -5.8 && lat <= 2 && lng >= 119 && lng <= 125.5) return true;
    if (lat >= 5.5 && lat <= 18.8 && lng >= 119.5 && lng <= 126.8) return true;
    if (lat >= -10.8 && lat <= -0.5 && lng >= 130.5 && lng <= 151) return true;
    // 22. Australia
    if (lat >= -39.2 && lat <= -10.5 && lng >= 113 && lng <= 153.8) {
      if (lat >= -17.5 && lat <= -11.5 && lng >= 135.5 && lng <= 141.5) return false;
      if (lat <= -32 && lat >= -37 && lng >= 124 && lng <= 136) return false;
      if (lat < -35 && lng < 136) return false;
      return true;
    }
    if (lat >= -43.8 && lat <= -40.5 && lng >= 144.5 && lng <= 148.5) return true;
    // 23. New Zealand
    if (lat >= -47.5 && lat <= -34.5 && lng >= 166 && lng <= 179) {
      if (lat < -41.5 && lng > 175) return false;
      if (lat > -40.5 && lng < 173) return false;
      return true;
    }
    return false;
  };
}

const check = createWorldLandCheck();
const width = 800;
const height = 400;
const cols = 100;
const rows = 50;
const dx = width / cols;
const dy = height / rows;

const dots = [];
for (let r = 0; r < rows; r++) {
  const lat = 82 - (r / rows) * 155;
  for (let c = 0; c < cols; c++) {
    const lng = (c / cols) * 360 - 180;
    if (check(lat, lng)) {
      const cx = (c * dx + dx / 2).toFixed(1);
      const cy = (r * dy + dy / 2).toFixed(1);
      dots.push(`<circle cx="${cx}" cy="${cy}" r="1.6" fill="currentColor" opacity="0.38"/>`);
    }
  }
}

const markers = [
  { lat: 37.7749, lng: -122.4194, label: 'San Francisco', country: 'us', pulse: true },
  { lat: 40.7128, lng: -74.0060, label: 'New York', country: 'us', pulse: true },
  { lat: 51.5074, lng: -0.1278, label: 'London', country: 'gb', pulse: true },
  { lat: 25.2048, lng: 55.2708, label: 'Dubai', country: 'ae', pulse: true },
  { lat: 23.8103, lng: 90.4125, label: 'Dhaka', country: 'bd', pulse: true },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo', country: 'jp', pulse: true },
  { lat: 37.5665, lng: 126.9780, label: 'Seoul', country: 'kr', pulse: true },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore', country: 'sg', pulse: true },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney', country: 'au', pulse: true },
  { lat: -23.5505, lng: -46.6333, label: 'São Paulo', country: 'br', pulse: true }
];

function project(lat, lng) {
  const x = ((lng + 180) / 360) * width;
  const y = ((82 - lat) / 155) * height;
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

const markerSvgs = markers.map((m, i) => {
  const { x, y } = project(m.lat, m.lng);
  const lbl = m.label || '';
  const pillW = lbl ? lbl.length * 6.5 + 24 : 0;
  return `
    <g class="s-map-marker" transform="translate(${x}, ${y})">
      <circle cx="0" cy="0" r="3.5" fill="#FF6900"/>
      <circle cx="0" cy="0" r="4" fill="none" stroke="#FF6900" stroke-width="1.5" opacity="0.8">
        <animate attributeName="r" values="3.5;15" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="0" cy="0" r="4" fill="none" stroke="#FF6900" stroke-width="1.2" opacity="0.6">
        <animate attributeName="r" values="3.5;15" dur="1.8s" begin="0.9s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0" dur="1.8s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
      ${lbl ? `
        <g transform="translate(8, -10)">
          <rect x="0" y="0" width="${pillW}" height="20" rx="10" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.18)" stroke-width="0.8"/>
          ${m.country ? `<clipPath id="flag-${i}"><circle cx="10" cy="10" r="5.5"/></clipPath><image href="https://flagcdn.com/w80/${m.country.toLowerCase()}.webp" x="4.5" y="4.5" width="11" height="11" preserveAspectRatio="xMidYMid slice" clip-path="url(#flag-${i})"/>` : ''}
          <text x="${m.country ? 20 : 8}" y="13.5" font-size="9.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" fill="#ffffff">${lbl}</text>
        </g>
      ` : ''}
    </g>
  `;
}).join('');

const connections = [
  { from: markers[0], to: markers[2] },
  { from: markers[2], to: markers[3] },
  { from: markers[3], to: markers[4] },
  { from: markers[4], to: markers[7] },
  { from: markers[7], to: markers[8] },
  { from: markers[2], to: markers[5] },
  { from: markers[5], to: markers[0] }
];

const connectionSvgs = connections.map((c, i) => {
  const p1 = project(c.from.lat, c.from.lng);
  const p2 = project(c.to.lat, c.to.lng);
  const midX = (p1.x + p2.x) / 2;
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const midY = Math.min(p1.y, p2.y) - dist * 0.22;
  const pathD = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
  return `
    <path d="${pathD}" fill="none" stroke="url(#flightGradient)" stroke-width="1.4" stroke-dasharray="4,4" opacity="0.5">
      <animate attributeName="stroke-dashoffset" values="32;0" dur="2s" repeatCount="indefinite"/>
    </path>
  `;
}).join('');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    padding: 40px;
    background: #090A0F;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: system-ui, sans-serif;
  }
  .card {
    position: relative;
    width: 860px;
    height: 460px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: radial-gradient(circle at 50% 50%, rgba(91, 61, 245, 0.12) 0%, rgba(15, 23, 42, 0.95) 75%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(9, 10, 15, 0.6) 100%);
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="card">
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="display:block;">
      <defs>
        <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF6900" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#5B3DF5" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <g style="color: #94A3B8;">${dots.join('')}</g>
      <g>${connectionSvgs}</g>
      <g>${markerSvgs}</g>
    </svg>
    <div class="vignette"></div>
  </div>
</body>
</html>`;

const outHtml = path.join('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86', 'test-map.html');
const outPng = path.join('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86', 'test-map-dark.png');
fs.writeFileSync(outHtml, html);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
  await page.goto(`file:///${outHtml.replace(/\\/g, '/')}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: outPng });
  await browser.close();
  console.log('Map screenshot captured successfully!');
})();

