import fs from 'fs';

const indexPath = './packages/ui/src/index.js';
let indexCode = fs.readFileSync(indexPath, 'utf8');

const newFunctions = `
export function initPointer(el) {
  if (!el || el.dataset.pointerInitialized === 'true') return;
  el.dataset.pointerInitialized = 'true';
  const glyph = el.querySelector('.s-pointer-glyph');
  if (!glyph) return;

  el.addEventListener('mouseenter', () => {
    glyph.style.opacity = '1';
    glyph.style.transform = 'scale(1)';
  });
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glyph.style.left = \`\${x}px\`;
    glyph.style.top = \`\${y}px\`;
  });
  el.addEventListener('mouseleave', () => {
    glyph.style.opacity = '0';
    glyph.style.transform = 'scale(0.6)';
  });
}

export function initSmoothCursor(container) {
  if (!container || container.dataset.smoothCursorInitialized === 'true') return;
  container.dataset.smoothCursorInitialized = 'true';
  const follower = container.querySelector('.s-smooth-cursor-follower');
  if (!follower) return;

  const win = docOf(container).defaultView;
  let targetX = -100, targetY = -100, currentX = -100, currentY = -100;
  let lastX = 0, lastY = 0, lastTime = Date.now();
  let currentAngle = 0, targetAngle = 0;
  let timeoutId = null;

  const onPointerMove = e => {
    targetX = e.clientX;
    targetY = e.clientY;
    follower.style.opacity = '1';

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const vx = (targetX - lastX) / dt;
      const vy = (targetY - lastY) / dt;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.1) {
        targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
      }
    }
    lastX = targetX;
    lastY = targetY;
    lastTime = now;

    if (timeoutId) win.clearTimeout(timeoutId);
    timeoutId = win.setTimeout(() => {
      targetAngle = 0;
    }, 200);
  };

  win.addEventListener('pointermove', onPointerMove, { passive: true });

  const render = () => {
    if (!container.isConnected) {
      win.removeEventListener('pointermove', onPointerMove);
      return;
    }
    currentX += (targetX - currentX) * 0.25;
    currentY += (targetY - currentY) * 0.25;
    
    let angleDiff = targetAngle - currentAngle;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;
    currentAngle += angleDiff * 0.2;

    follower.style.transform = \`translate3d(\${currentX}px, \${currentY}px, 0) rotate(\${currentAngle}deg)\`;
    win.requestAnimationFrame(render);
  };
  win.requestAnimationFrame(render);
}

export function initHyperText(el) {
  if (!el || el.dataset.hyperInitialized === 'true') return;
  el.dataset.hyperInitialized = 'true';
  const win = docOf(el).defaultView;
  const original = el.dataset.text || el.textContent.trim();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let isAnimating = false;

  const scramble = () => {
    if (isAnimating) return;
    isAnimating = true;
    let iteration = 0;
    const maxIterations = original.length;
    const interval = win.setInterval(() => {
      if (!el.isConnected) { win.clearInterval(interval); return; }
      el.textContent = original.split('').map((letter, index) => {
        if (index < iteration) return original[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      if (iteration >= maxIterations) {
        win.clearInterval(interval);
        el.textContent = original;
        isAnimating = false;
      }
      iteration += 1 / 3;
    }, 30);
  };

  el.addEventListener('mouseenter', scramble);
}

export function initConfetti(container) {
  if (!container || container.dataset.confettiInitialized === 'true') return;
  container.dataset.confettiInitialized = 'true';
  const doc = docOf(container), win = doc.defaultView;
  const trigger = container.querySelector('[data-confetti-trigger]') || container;

  const shoot = (originX = 0.5, originY = 0.5) => {
    const canvas = doc.createElement('canvas');
    canvas.className = 's-confetti-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
    doc.body.appendChild(canvas);
    canvas.width = win.innerWidth * 2;
    canvas.height = win.innerHeight * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(2, 2);

    const colors = ['#5B3DF5', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const particles = [];
    const count = 60;
    const startX = originX * win.innerWidth;
    const startY = originY * win.innerHeight;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = 6 + Math.random() * 8;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        opacity: 1,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    let start = Date.now();
    const frame = () => {
      ctx.clearRect(0, 0, win.innerWidth, win.innerHeight);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (alive && Date.now() - start < 2200) {
        win.requestAnimationFrame(frame);
      } else {
        canvas.remove();
      }
    };
    win.requestAnimationFrame(frame);
  };

  trigger.addEventListener('click', e => {
    const x = e.clientX / win.innerWidth;
    const y = e.clientY / win.innerHeight;
    shoot(x, y);
  });
}

export function initParticles(canvas) {
  if (!canvas || canvas.dataset.particlesInitialized === 'true') return;
  canvas.dataset.particlesInitialized = 'true';
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;

  const count = Number(canvas.dataset.quantity) || 80;
  const particles = [];
  let mouseX = -1000, mouseY = -1000;

  const resize = () => {
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const w = rect.width || 600, h = rect.height || 400;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);
    if (particles.length === 0) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 1 + Math.random() * 2,
          alpha: 0.2 + Math.random() * 0.6
        });
      }
    }
  };
  resize();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  const render = () => {
    if (!canvas.isConnected) return;
    const w = canvas.width / 2, h = canvas.height / 2;
    ctx.clearRect(0, 0, w, h);

    const isDark = docOf(canvas).documentElement.dataset.theme === 'dark';
    const color = isDark ? '#ffffff' : '#0f172a';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = mouseX - p.x, dy = mouseY - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 80) {
        p.x -= (dx / dist) * 2;
        p.y -= (dy / dist) * 2;
      }

      ctx.fillStyle = color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 70) {
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - d / 70) * 0.15;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    win.requestAnimationFrame(render);
  };
  win.requestAnimationFrame(render);
}

export function initFloating3DParticles(canvas) {
  if (!canvas || canvas.dataset.floatingInitialized === 'true') return;
  canvas.dataset.floatingInitialized = 'true';
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;

  const count = Number(canvas.dataset.quantity) || 120;
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 400,
      size: 1.5 + Math.random() * 2.5
    });
  }

  let angleY = 0, angleX = 0.2;
  const render = () => {
    if (!canvas.isConnected) return;
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const w = rect.width || 600, h = rect.height || 400;
    if (canvas.width !== w * 2 || canvas.height !== h * 2) {
      canvas.width = w * 2; canvas.height = h * 2;
      ctx.scale(2, 2);
    }
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;

    angleY += 0.004;
    const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

    const isDark = docOf(canvas).documentElement.dataset.theme === 'dark';
    const color = isDark ? '#c4b5fd' : '#6d28d9';

    points.forEach(p => {
      const rx = p.x * cosY - p.z * sinY;
      const rz = p.x * sinY + p.z * cosY;
      const ry = p.y * cosX - rz * sinX;
      const finalZ = p.y * sinX + rz * cosX;

      const scale = 250 / (250 + finalZ + 200);
      const screenX = cx + rx * scale;
      const screenY = cy + ry * scale;
      const alpha = Math.max(0.1, Math.min(0.8, (finalZ + 200) / 400));

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(screenX, screenY, p.size * scale, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    win.requestAnimationFrame(render);
  };
  win.requestAnimationFrame(render);
}

export function initFlickeringGrid(canvas) {
  if (!canvas || canvas.dataset.flickerInitialized === 'true') return;
  canvas.dataset.flickerInitialized = 'true';
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;

  const sq = 4, gap = 6, total = sq + gap;
  let cols = 0, rows = 0;
  let opacities = [];

  const update = () => {
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const w = rect.width || 600, h = rect.height || 400;
    if (canvas.width !== w * 2 || canvas.height !== h * 2) {
      canvas.width = w * 2; canvas.height = h * 2;
      ctx.scale(2, 2);
      cols = Math.floor(w / total);
      rows = Math.floor(h / total);
      opacities = new Float32Array(cols * rows);
      for (let i = 0; i < opacities.length; i++) opacities[i] = Math.random() * 0.4;
    }
  };
  update();

  const isDark = docOf(canvas).documentElement.dataset.theme === 'dark';
  const color = canvas.dataset.color || (isDark ? '148, 163, 184' : '100, 116, 139');

  const render = () => {
    if (!canvas.isConnected) return;
    const w = canvas.width / 2, h = canvas.height / 2;
    ctx.clearRect(0, 0, w, h);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        if (Math.random() < 0.08) {
          opacities[idx] = Math.random() * 0.45;
        }
        ctx.fillStyle = \`rgba(\${color}, \${opacities[idx]})\`;
        ctx.fillRect(c * total, r * total, sq, sq);
      }
    }

    win.requestAnimationFrame(render);
  };
  win.requestAnimationFrame(render);
}

export function initGlyphMatrix(canvas) {
  if (!canvas || canvas.dataset.matrixInitialized === 'true') return;
  canvas.dataset.matrixInitialized = 'true';
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;

  const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
  const fontSize = 14;
  let cols = 0, drops = [];

  const resize = () => {
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const w = rect.width || 600, h = rect.height || 400;
    canvas.width = w * 2; canvas.height = h * 2;
    ctx.scale(2, 2);
    cols = Math.floor(w / fontSize);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
  };
  resize();

  let lastTime = 0;
  const render = time => {
    if (!canvas.isConnected) return;
    if (time - lastTime > 45) {
      lastTime = time;
      const w = canvas.width / 2, h = canvas.height / 2;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#10B981';
      ctx.font = \`\${fontSize}px monospace\`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);
          ctx.fillStyle = '#10B981';
          if (y - fontSize > 0) ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);
        }

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    win.requestAnimationFrame(render);
  };
  win.requestAnimationFrame(render);
}

export function initMagicCard(card) {
  if (!card || card.dataset.magicInitialized === 'true') return;
  card.dataset.magicInitialized = 'true';
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--s-mouse-x', \`\${x}px\`);
    card.style.setProperty('--s-mouse-y', \`\${y}px\`);
  });
}

export function initLens(container) {
  if (!container || container.dataset.lensInitialized === 'true') return;
  container.dataset.lensInitialized = 'true';
  const lens = container.querySelector('.s-lens-glass');
  const img = container.querySelector('img');
  if (!lens || !img) return;

  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lens.style.opacity = '1';
    lens.style.left = \`\${x}px\`;
    lens.style.top = \`\${y}px\`;
    lens.style.backgroundPosition = \`\${-x * 2 + 70}px \${-y * 2 + 70}px\`;
  });
  container.addEventListener('mouseleave', () => {
    lens.style.opacity = '0';
  });
}

export function initFileTree(tree) {
  if (!tree || tree.dataset.fileTreeInitialized === 'true') return;
  tree.dataset.fileTreeInitialized = 'true';
  tree.addEventListener('click', e => {
    const folder = e.target.closest('.s-tree-folder');
    if (folder) {
      const isOpen = folder.getAttribute('aria-expanded') === 'true';
      folder.setAttribute('aria-expanded', String(!isOpen));
      const sub = folder.nextElementSibling;
      if (sub && sub.classList.contains('s-tree-children')) {
        sub.hidden = isOpen;
      }
    }
  });
}

export function initRippleButton(btn) {
  if (!btn || btn.dataset.rippleBtnInitialized === 'true') return;
  btn.dataset.rippleBtnInitialized = 'true';
  const doc = docOf(btn);
  btn.addEventListener('click', e => {
    const rect = btn.getBoundingClientRect();
    const ripple = doc.createElement('span');
    ripple.className = 's-ripple-wave';
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = \`\${size}px\`;
    ripple.style.height = \`\${size}px\`;
    ripple.style.left = \`\${e.clientX - rect.left - size / 2}px\`;
    ripple.style.top = \`\${e.clientY - rect.top - size / 2}px\`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

export function initCoolMode(btn) {
  if (!btn || btn.dataset.coolInitialized === 'true') return;
  btn.dataset.coolInitialized = 'true';
  const doc = docOf(btn);
  const emojis = ['✨', '🔥', '🎉', '🚀', '⭐', '❤️', '💡'];
  btn.addEventListener('click', e => {
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const p = doc.createElement('span');
      p.className = 's-cool-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = \`\${rect.left + rect.width / 2}px\`;
      p.style.top = \`\${rect.top + rect.height / 2}px\`;
      p.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 160}px\`);
      p.style.setProperty('--dy', \`\${-50 - Math.random() * 120}px\`);
      doc.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });
}

export function initHighlighter(el) {
  if (!el || el.dataset.highlighterInitialized === 'true') return;
  el.dataset.highlighterInitialized = 'true';
  const path = el.querySelector('path');
  if (path) {
    const len = path.getTotalLength ? path.getTotalLength() : 200;
    path.style.strokeDasharray = \`\${len}\`;
    path.style.strokeDashoffset = \`\${len}\`;
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      path.style.strokeDashoffset = '0';
    }, 150);
  }
}
`;

const updatedReinit = `
export function reinitComponent(root) {
  if (!root) return;
  root.querySelectorAll('[data-s-terminal]').forEach(t => initTerminal(t, true));
  root.querySelectorAll('[data-s-animated-list]').forEach(l => initAnimatedList(l, true));
  root.querySelectorAll('[data-s-number-ticker]').forEach(n => initNumberTicker(n, true));
  root.querySelectorAll('[data-s-dock]').forEach(d => initDock(d));
  root.querySelectorAll('canvas[data-s-globe]').forEach(g => initGlobe(g));
  root.querySelectorAll('canvas[data-s-icon-cloud]').forEach(c => initIconCloud(c));
  root.querySelectorAll('[data-s-pointer]').forEach(p => initPointer(p));
  root.querySelectorAll('[data-s-smooth-cursor]').forEach(c => initSmoothCursor(c));
  root.querySelectorAll('[data-s-hyper-text]').forEach(h => initHyperText(h));
  root.querySelectorAll('[data-s-confetti]').forEach(c => initConfetti(c));
  root.querySelectorAll('canvas[data-s-particles]').forEach(p => initParticles(p));
  root.querySelectorAll('canvas[data-s-floating-particles]').forEach(f => initFloating3DParticles(f));
  root.querySelectorAll('canvas[data-s-flickering-grid]').forEach(g => initFlickeringGrid(g));
  root.querySelectorAll('canvas[data-s-glyph-matrix]').forEach(m => initGlyphMatrix(m));
  root.querySelectorAll('[data-s-magic-card]').forEach(m => initMagicCard(m));
  root.querySelectorAll('[data-s-lens]').forEach(l => initLens(l));
  root.querySelectorAll('[data-s-file-tree]').forEach(t => initFileTree(t));
  root.querySelectorAll('[data-s-ripple-button]').forEach(r => initRippleButton(r));
  root.querySelectorAll('[data-s-cool-mode]').forEach(c => initCoolMode(c));
  root.querySelectorAll('[data-s-highlighter]').forEach(h => initHighlighter(h));
}
`;

// Replace old reinitComponent
const oldReinitRegex = /export function reinitComponent\([\s\S]*?\}\n\n\/\* ---/g;
if (oldReinitRegex.test(indexCode)) {
  indexCode = indexCode.replace(oldReinitRegex, newFunctions + updatedReinit + '\n/* ---');
  fs.writeFileSync(indexPath, indexCode, 'utf8');
  console.log('Successfully updated packages/ui/src/index.js with all initializers!');
} else {
  console.log('Could not match reinitComponent block.');
}

