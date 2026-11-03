import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const testHtml = `
<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <style>
    :root {
      --s-bg-canvas: #09090b;
      --s-bg-surface: #121215;
      --s-border-default: rgba(255, 255, 255, 0.12);
      --s-border-brand: #6366f1;
      --s-text-primary: #f4f4f5;
      --s-text-muted: #71717a;
    }
    html[data-theme="light"] {
      --s-bg-canvas: #f8fafc;
      --s-bg-surface: #ffffff;
      --s-border-default: #e2e8f0;
      --s-border-brand: #6366f1;
      --s-text-primary: #0f172a;
      --s-text-muted: #64748b;
    }
    body {
      margin: 0;
      padding: 40px;
      background: var(--s-bg-canvas);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: var(--s-text-primary);
    }
    .card {
      background: var(--s-bg-surface);
      border: 1px solid var(--s-border-default);
      border-radius: 14px;
      position: relative;
      overflow: hidden;
      max-width: 600px;
      margin: 0 auto 30px;
      height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .beam-circle-node {
      z-index: 10;
      display: inline-flex;
      width: 48px;
      height: 48px;
      min-width: 48px;
      min-height: 48px;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 1px solid var(--s-border-default);
      background: var(--s-bg-surface);
      color: var(--s-text-primary);
      padding: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, border-color 0.2s ease;
      position: relative;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    .beam-circle-node:hover {
      transform: scale(1.08);
      border-color: var(--s-border-brand);
    }
    .beam-circle-hub {
      width: 62px;
      height: 62px;
      min-width: 62px;
      min-height: 62px;
      border: 1.5px solid var(--s-border-brand);
      background: var(--s-bg-surface);
      color: var(--s-text-primary);
    }

    .beam-circle-node svg {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      display: block;
    }

    .s-beam-path-bg {
      fill: none;
      stroke: var(--s-border-default);
      stroke-width: 2px;
      stroke-opacity: 0.6;
      stroke-linecap: round;
    }

    .s-beam-path {
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-dasharray: 60 220;
      animation: s-beam-flow var(--beam-duration, 3s) linear infinite;
      animation-delay: var(--beam-delay, 0s);
    }

    .s-beam-path--burst {
      stroke-dasharray: 80 300;
      animation: s-beam-pulse-burst var(--beam-duration, 2.5s) cubic-bezier(0.16, 1, 0.3, 1) infinite;
      animation-delay: var(--beam-delay, 0s);
    }

    .s-beam-path--reverse {
      animation: s-beam-flow-reverse var(--beam-duration, 3s) linear infinite;
      animation-delay: var(--beam-delay, 0s);
    }

    @keyframes s-beam-flow {
      0% { stroke-dashoffset: 280; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes s-beam-flow-reverse {
      0% { stroke-dashoffset: -280; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes s-beam-pulse-burst {
      0% {
        stroke-dashoffset: 380;
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      70% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
      85% {
        stroke-dashoffset: -40;
        opacity: 0;
      }
      100% {
        stroke-dashoffset: -40;
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <div class="card" data-s-beam-container>
    <div style="display: flex; width: 100%; max-width: 480px; height: 100%; max-height: 240px; justify-content: space-between; position: relative; z-index: 2;">
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div id="m-drive" class="beam-circle-node" title="Google Drive"><svg viewBox="0 0 87 80" width="24" height="24"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg></div>
        <div id="m-notion" class="beam-circle-node" title="Notion"><svg viewBox="0 0 100 100" width="24" height="24"><path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="currentColor" fill-opacity="0.1"/><path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/></svg></div>
        <div id="m-whatsapp" class="beam-circle-node" title="WhatsApp"><svg viewBox="0 0 175 175" width="24" height="24"><path d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z" fill="#25D366"/><path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z" fill="#25D366"/><path d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" fill="#ffffff" fill-rule="evenodd"/></svg></div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <div id="m-openai" class="beam-circle-node beam-circle-hub" title="OpenAI"><svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg></div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div id="m-docs" class="beam-circle-node" title="Google Docs"><svg viewBox="0 0 47 65" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M29.375 0H4.406C1.983 0 0 1.994 0 4.432v56.136C0 63.006 1.983 65 4.406 65h38.188C45.017 65 47 63.006 47 60.568V17.727L29.375 0z" fill="#4285F4"/><path d="M29.375 0v13.295c0 2.449 1.972 4.432 4.406 4.432H47L29.375 0z" fill="#A1C2FA"/><path d="M11.75 47.273h23.5v-2.955h-23.5v2.955zm0 5.909h17.625v-2.955H11.75v2.955zm0-20.682v2.955h23.5V32.5h-23.5zm0 8.864h23.5v-2.955h-23.5v2.955z" fill="#F1F1F1"/></g></svg></div>
        <div id="m-zapier" class="beam-circle-node" title="Zapier"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M13.5 2L3 14.5h7.5L9.5 22 21 9.5h-7.5L13.5 2z" fill="#FF4F00"/></svg></div>
        <div id="m-messenger" class="beam-circle-node" title="Messenger"><svg viewBox="0 0 48 48" width="24" height="24"><g><path d="M24 4C12.95 4 4 12.73 4 23.5c0 5.61 2.425 10.665 6.319 14.224v4.025c0 1.264 1.33 2.086 2.46 1.521l4.425-2.206c2.09.507 4.31.786 6.796.786 11.05 0 20-8.73 20-19.5S35.05 4 24 4z" fill="#0084FF"/><path d="M34.394 18.501l-5.7 4.22c-.61.46-1.44.46-2.04.01L22.68 19.74c-1.68-1.25-4.06-.82-5.19.94l-1.21 1.89-4.11 6.68c-.6.94.55 2.01 1.44 1.34l5.7-4.22c.61-.46 1.44-.46 2.04-.01l3.974 2.991c1.68 1.25 4.06.82 5.19-.94l1.21-1.89 4.11-6.68c.44-.68-.71-1.75-1.44-1.34z" fill="#ffffff"/></g></svg></div>
      </div>
    </div>

    <svg class="beam-svg-overlay" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
      <defs>
        <linearGradient id="g-in" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="50%" stop-color="#ffaa40"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="g-out" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#9c40ff" stop-opacity="0"></stop>
          <stop offset="50%" stop-color="#ec4899"></stop>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <!-- Background Tracks -->
      <path class="s-beam-path-bg" data-bg-for="p-drive" />
      <path class="s-beam-path-bg" data-bg-for="p-notion" />
      <path class="s-beam-path-bg" data-bg-for="p-whatsapp" />
      <path class="s-beam-path-bg" data-bg-for="p-docs" />
      <path class="s-beam-path-bg" data-bg-for="p-zapier" />
      <path class="s-beam-path-bg" data-bg-for="p-messenger" />

      <!-- Varied Motions: Steady pulses, fast bursts, staggered delays -->
      <path class="s-beam-path" id="p-drive" data-from="#m-drive" data-to="#m-openai" stroke="url(#g-in)" style="--beam-duration: 3s; --beam-delay: 0s;" />
      <path class="s-beam-path s-beam-path--burst" id="p-notion" data-from="#m-notion" data-to="#m-openai" stroke="url(#g-in)" style="--beam-duration: 2.2s; --beam-delay: 1.2s;" />
      <path class="s-beam-path" id="p-whatsapp" data-from="#m-whatsapp" data-to="#m-openai" stroke="url(#g-in)" style="--beam-duration: 3.5s; --beam-delay: 2.2s;" />
      <path class="s-beam-path" id="p-docs" data-from="#m-openai" data-to="#m-docs" stroke="url(#g-out)" style="--beam-duration: 3s; --beam-delay: 0.6s;" />
      <path class="s-beam-path s-beam-path--burst" id="p-zapier" data-from="#m-openai" data-to="#m-zapier" stroke="url(#g-out)" style="--beam-duration: 2.2s; --beam-delay: 1.8s;" />
      <path class="s-beam-path" id="p-messenger" data-from="#m-openai" data-to="#m-messenger" stroke="url(#g-out)" style="--beam-duration: 3.2s; --beam-delay: 1.4s;" />
    </svg>
  </div>

  <script>
    function updateBeams() {
      document.querySelectorAll('[data-s-beam-container]').forEach(container => {
        const svg = container.querySelector('.beam-svg-overlay');
        if (!svg) return;
        const cRect = container.getBoundingClientRect();
        if (!cRect.width || !cRect.height) return;
        svg.setAttribute('viewBox', '0 0 ' + cRect.width + ' ' + cRect.height);

        svg.querySelectorAll('.s-beam-path[data-from][data-to]').forEach(path => {
          const fromEl = container.querySelector(path.dataset.from);
          const toEl = container.querySelector(path.dataset.to);
          if (!fromEl || !toEl) return;
          const fRect = fromEl.getBoundingClientRect();
          const tRect = toEl.getBoundingClientRect();

          const startX = fRect.left - cRect.left + fRect.width / 2;
          const startY = fRect.top - cRect.top + fRect.height / 2;
          const endX = tRect.left - cRect.left + tRect.width / 2;
          const endY = tRect.top - cRect.top + tRect.height / 2;

          const curvature = parseFloat(path.dataset.curvature || 0);
          let d = '';
          if (curvature !== 0) {
            const midX = (startX + endX) / 2;
            const controlY = (startY + endY) / 2 - curvature;
            d = 'M ' + startX.toFixed(1) + ' ' + startY.toFixed(1) + ' Q ' + midX.toFixed(1) + ' ' + controlY.toFixed(1) + ' ' + endX.toFixed(1) + ' ' + endY.toFixed(1);
          } else if (Math.abs(startY - endY) > 4) {
            const ctrlX = startX + (endX - startX) * 0.5;
            d = 'M ' + startX.toFixed(1) + ' ' + startY.toFixed(1) + ' C ' + ctrlX.toFixed(1) + ' ' + startY.toFixed(1) + ', ' + ctrlX.toFixed(1) + ' ' + endY.toFixed(1) + ', ' + endX.toFixed(1) + ' ' + endY.toFixed(1);
          } else {
            d = 'M ' + startX.toFixed(1) + ' ' + startY.toFixed(1) + ' L ' + endX.toFixed(1) + ' ' + endY.toFixed(1);
          }

          path.setAttribute('d', d);
          const bg = svg.querySelector('[data-bg-for="' + path.id + '"]');
          if (bg) bg.setAttribute('d', d);
        });
      });
    }

    window.addEventListener('DOMContentLoaded', updateBeams);
    window.addEventListener('resize', updateBeams);
    setTimeout(updateBeams, 50);
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(testHtml);
});

server.listen(8092, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
  await page.goto('http://localhost:8092');
  await page.waitForTimeout(600);

  const brainDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
  await page.screenshot({ path: path.join(brainDir, 'test-motion-dark.png') });

  // Switch to Light
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(brainDir, 'test-motion-light.png') });

  await browser.close();
  server.close();
  console.log('Motion test done!');
});

