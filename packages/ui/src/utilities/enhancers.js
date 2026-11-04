import { Icon, Toast } from '../templates.js';
import { render, escapeText } from './render.js';

const installations = new WeakMap();
const dialogTriggers = new WeakMap();
const handled = new WeakSet();

const docOf = node => node.nodeType === 9 ? node : node.ownerDocument;
const emit = (node, name, detail) => node.dispatchEvent(new (docOf(node).defaultView.CustomEvent)('sarah:' + name, { detail, bubbles: true }));
const closest = (event, selector) => event.target?.closest?.(selector);

export function setTheme(preference = 'system', { root = globalThis.document?.documentElement, persist = true } = {}) {
  if (!root) return preference;
  const doc = docOf(root), win = doc.defaultView;
  preference = ['light', 'dark', 'system'].includes(preference) ? preference : 'system';
  const theme = preference === 'system' ? (win.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preference;
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  if (persist) try { win.localStorage.setItem('sarah-theme', preference); } catch {}
  doc.querySelectorAll('[data-s-theme-toggle]').forEach(button => {
    button.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    const glyph = button.querySelector('[data-theme-icon]');
    if (glyph) glyph.innerHTML = render(Icon({ name: theme === 'dark' ? 'sun' : 'moon', size: 18 }));
  });
  emit(root, 'themechange', { preference, theme });
  return theme;
}

export function openDialog(dialog, trigger) {
  if (!dialog || typeof dialog.showModal !== 'function' || dialog.open) return;
  if (dialog.classList.contains('s-video-modal') && !dialog._videoCloseBound) {
    dialog._videoCloseBound = true;
    dialog.addEventListener('close', () => {
      const iframe = dialog.querySelector('iframe');
      if (iframe) iframe.src = '';
    });
  }
  dialogTriggers.set(dialog, trigger || docOf(dialog).activeElement);
  dialog.showModal();
  (dialog.querySelector('[data-s-autofocus],[autofocus]') || dialog.querySelector('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),[tabindex="0"]'))?.focus({ preventScroll: true });
}

export const closeDialog = (dialog, value = '') => {
  if (dialog?.open) {
    if (dialog.classList.contains('s-video-modal')) {
      const iframe = dialog.querySelector('iframe');
      if (iframe) iframe.src = '';
    }
    dialog.close(value);
  }
};

function activateTab(group, tab) {
  const tabs = [...group.querySelectorAll('[role=tab]')].filter(t => t.closest('[data-s-tabs]') === group);
  if (!tabs.includes(tab) || tab.disabled) return;
  for (const t of tabs) {
    const active = t === tab;
    t.setAttribute('aria-selected', String(active));
    t.tabIndex = active ? 0 : -1;
    const panel = docOf(group).getElementById(t.getAttribute('aria-controls'));
    if (panel && group.contains(panel)) panel.hidden = !active;
  }
  tab.focus();
  emit(group, 'tabchange', { index: tabs.indexOf(tab), id: tab.id });
}

function setMenu(menu, open, { last = false, restore = false } = {}) {
  const panel = menu.querySelector('[role=menu]'), trigger = menu.querySelector('[data-s-menu-trigger]');
  panel.hidden = !open;
  trigger.setAttribute('aria-expanded', String(open));
  if (open) {
    const items = [...panel.querySelectorAll('[role=menuitem]:not(:disabled)')];
    (last ? items.at(-1) : items[0])?.focus();
  } else if (restore) trigger.focus();
}

function tableSelection(table) {
  const rows = [...table.querySelectorAll('[data-s-row-select]:not(:disabled)')], selected = rows.filter(box => box.checked), all = table.querySelector('[data-s-select-all]');
  if (all) {
    all.checked = rows.length > 0 && selected.length === rows.length;
    all.indeterminate = selected.length > 0 && selected.length < rows.length;
    all.disabled = !rows.length;
  }
  emit(table, 'selectionchange', { selected: selected.map(b => b.closest('tr').dataset.row), count: selected.length });
}

function sortTable(button) {
  const table = button.closest('table'), key = button.dataset.sSort, th = button.closest('th'), ascending = th.getAttribute('aria-sort') !== 'ascending';
  table.querySelectorAll('[aria-sort]').forEach(el => el.removeAttribute('aria-sort'));
  th.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
  const value = row => { const td = [...row.cells].find(td => td.dataset.column === key); return td?.dataset.sort ?? td?.textContent.trim() ?? ''; };
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  const rows = table.tBodies?.[0]?.rows;
  if (!rows || !rows.length) return;
  [...rows].sort((a, b) => {
    const x = value(a), y = value(b);
    const n = x !== '' && y !== '' && Number.isFinite(Number(x)) && Number.isFinite(Number(y)) ? Number(x) - Number(y) : collator.compare(x, y);
    return ascending ? n : -n;
  }).forEach(row => table.tBodies[0].append(row));
  emit(table, 'sortchange', { key, direction: ascending ? 'ascending' : 'descending' });
}

function paginate(nav, value) {
  const max = Number(nav.dataset.pages) || 1, current = Number(nav.dataset.current) || 1, next = Math.min(max, Math.max(1, value === 'prev' ? current - 1 : value === 'next' ? current + 1 : Number(value) || 1));
  nav.dataset.current = String(next);
  nav.querySelectorAll('[data-page]').forEach(b => {
    const p = b.dataset.page;
    if (p === 'prev' || p === 'next') b.disabled = p === 'prev' ? next === 1 : next === max;
    else if (Number(p) === next) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  emit(nav, 'pagechange', { page: next, pages: max });
}

const options = dialog => [...dialog.querySelectorAll('[role=option]')].filter(item => !item.hidden);

function selectCommand(dialog, index) {
  const choices = options(dialog), input = dialog.querySelector('[data-s-command-input]');
  dialog.querySelectorAll('[role=option]').forEach(o => o.setAttribute('aria-selected', 'false'));
  if (!choices.length) { input.removeAttribute('aria-activedescendant'); return; }
  const item = choices[(index + choices.length) % choices.length];
  item.setAttribute('aria-selected', 'true');
  input.setAttribute('aria-activedescendant', item.id);
  if (dialog.open) item.scrollIntoView({ block: 'nearest' });
}

function filterCommand(dialog) {
  const query = dialog.querySelector('[data-s-command-input]').value.toLocaleLowerCase().trim();
  dialog.querySelectorAll('[role=option]').forEach(o => { o.hidden = !(o.dataset.keywords || o.textContent).toLocaleLowerCase().includes(query); });
  dialog.querySelector('[data-s-command-empty]').hidden = options(dialog).length > 0;
  selectCommand(dialog, 0);
}

function chooseCommand(dialog, item) {
  if (!item || item.hidden) return;
  const href = item.dataset.href;
  closeDialog(dialog);
  if (href?.startsWith('#')) docOf(dialog).defaultView.location.hash = href.slice(1);
  emit(dialog, 'command', { href, label: item.textContent.trim() });
}

/* -------------------------------------------------------------------------- */
/* Specialized Animation & Interactive Controllers                            */
/* -------------------------------------------------------------------------- */

export function initTerminal(term, force = false) {
  if (!term) return;
  if (!force && term.dataset.initialized === 'true') return;

  const doc = docOf(term), win = doc.defaultView;

  const setOnlyActiveCursor = (activeCursorEl) => {
    term.querySelectorAll('.s-typing-cursor, .s-terminal-cursor').forEach(c => {
      c.style.display = (c === activeCursorEl) ? 'inline-block' : 'none';
    });
  };

  const startSequence = () => {
    term.dataset.initialized = 'true';
    if (term._termTimer) { win.clearInterval(term._termTimer); term._termTimer = null; }
    if (term._termTimeouts) { term._termTimeouts.forEach(t => win.clearTimeout(t)); term._termTimeouts = []; }
    term._termTimeouts = [];

    setOnlyActiveCursor(null);

    const childItems = Array.from(term.querySelectorAll('.s-terminal-span, .s-terminal-typing, .s-typing-animation, [data-s-terminal-item]'));
    if (childItems.length > 0) {
      const hasExplicitDelays = childItems.some(item => item.hasAttribute('data-delay') && Number(item.dataset.delay) > 0);

      // Pre-clear all items so nothing flashes
      childItems.forEach(item => {
        const isTyping = item.classList.contains('s-terminal-typing') || item.classList.contains('s-typing-animation') || item.dataset.sTerminalItem === 'typing';
        if (isTyping) {
          let text = item.dataset.origText || item.dataset.sTyping || item.dataset.text;
          if (!text) {
            const textEl = item.querySelector('.s-typing-text');
            text = textEl ? textEl.textContent : item.textContent;
          }
          text = String(text || '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').trim();
          item.dataset.origText = text;

          let textSpan = item.querySelector('.s-typing-text');
          let cursorSpan = item.querySelector('.s-typing-cursor');
          if (!textSpan) {
            item.innerHTML = '<span class="s-typing-text"></span><span class="s-typing-cursor" aria-hidden="true"></span>';
            textSpan = item.querySelector('.s-typing-text');
            cursorSpan = item.querySelector('.s-typing-cursor');
          } else {
            textSpan.textContent = '';
          }
          if (cursorSpan) cursorSpan.style.display = 'none';
          item.style.display = 'inline-block';
          item.style.opacity = '0';
        } else {
          item.classList.remove('is-visible');
          item.style.opacity = '0';
          item.style.transform = 'translateY(-5px)';
        }
      });

      if (hasExplicitDelays) {
        // Explicit delay mode (e.g. delay=0, delay=800, delay=1600...)
        childItems.forEach((item) => {
          const isTyping = item.classList.contains('s-terminal-typing') || item.classList.contains('s-typing-animation') || item.dataset.sTerminalItem === 'typing';
          const delay = Number(item.dataset.delay) || 0;
          const duration = Number(item.dataset.duration) || 50;

          if (isTyping) {
            const fullText = item.dataset.origText || '';
            const textSpan = item.querySelector('.s-typing-text') || item;
            const cursor = item.querySelector('.s-typing-cursor');

            const t = win.setTimeout(() => {
              if (!term.isConnected) return;
              item.style.opacity = '1';
              setOnlyActiveCursor(cursor);
              let i = 0;
              const timer = win.setInterval(() => {
                if (!term.isConnected) { win.clearInterval(timer); return; }
                if (i < fullText.length) {
                  textSpan.textContent = fullText.substring(0, i + 1);
                  i++;
                } else {
                  win.clearInterval(timer);
                }
              }, duration);
              term._termTimeouts.push(timer);
            }, delay);
            term._termTimeouts.push(t);
          } else {
            const t = win.setTimeout(() => {
              if (!term.isConnected) return;
              setOnlyActiveCursor(null);
              item.classList.add('is-visible');
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, delay);
            term._termTimeouts.push(t);
          }
        });
        return;
      }

      // Sequential execution mode (Magic UI default)
      const runChild = (idx) => {
        if (!term.isConnected || idx >= childItems.length) return;
        const item = childItems[idx];
        const isTyping = item.classList.contains('s-terminal-typing') || item.classList.contains('s-typing-animation') || item.dataset.sTerminalItem === 'typing';

        if (isTyping) {
          const fullText = item.dataset.origText || '';
          const duration = Number(item.dataset.duration) || 50;
          const textSpan = item.querySelector('.s-typing-text') || item;
          const cursor = item.querySelector('.s-typing-cursor');

          item.style.opacity = '1';
          setOnlyActiveCursor(cursor);

          let cIdx = 0;
          const tTimer = win.setInterval(() => {
            if (!term.isConnected) { win.clearInterval(tTimer); return; }
            if (cIdx < fullText.length) {
              textSpan.textContent = fullText.substring(0, cIdx + 1);
              cIdx++;
            } else {
              win.clearInterval(tTimer);
              const isLastItem = (idx === childItems.length - 1);
              if (!isLastItem) {
                const nextT = win.setTimeout(() => {
                  if (!term.isConnected) return;
                  runChild(idx + 1);
                }, 200);
                term._termTimeouts.push(nextT);
              } else {
                setOnlyActiveCursor(cursor);
              }
            }
          }, duration);
          term._termTimeouts.push(tTimer);
        } else {
          setOnlyActiveCursor(null);
          item.classList.add('is-visible');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          const nextT = win.setTimeout(() => {
            if (!term.isConnected) return;
            runChild(idx + 1);
          }, 250);
          term._termTimeouts.push(nextT);
        }
      };

      runChild(0);
      return;
    }

    // Fallback data-command / data-steps / data-output mode
    let cmd = term.dataset.command || '> pnpm dlx sarahui@latest init';
    cmd = String(cmd).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
    let steps = [];
    try { steps = JSON.parse(term.dataset.steps || '[]'); } catch {}
    if (!steps.length) {
      steps = [
        '✔ Preflight checks.',
        '✔ Verifying framework. Found Next.js.',
        '✔ Validating Tailwind CSS.',
        '✔ Validating import alias.',
        '✔ Writing components.json.',
        '✔ Checking registry.',
        '✔ Updating tailwind.config.ts',
        '✔ Updating app/globals.css',
        '✔ Installing dependencies.',
        'ℹ Updated 1 file: - lib/utils.ts'
      ];
    }
    let output = term.dataset.output || 'Success! Project initialization completed.';
    output = String(output).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');

    const cmdEl = term.querySelector('.s-terminal-cmd');
    const promptCursor = term.querySelector('.s-terminal-prompt .s-terminal-cursor');
    const stepsEl = term.querySelector('.s-terminal-steps');
    const outEl = term.querySelector('.s-terminal-output');

    if (cmdEl) cmdEl.textContent = '';
    if (promptCursor) promptCursor.style.display = 'inline-block';
    if (stepsEl) stepsEl.innerHTML = '';
    if (outEl) {
      outEl.style.display = 'none';
      outEl.className = 's-terminal-output s-terminal-line';
      outEl.textContent = '';
    }

    let charIdx = 0;
    term._termTimer = win.setInterval(() => {
      if (!term.isConnected) { win.clearInterval(term._termTimer); return; }
      if (charIdx < cmd.length) {
        if (cmdEl) cmdEl.textContent += cmd[charIdx];
        charIdx++;
      } else {
        win.clearInterval(term._termTimer);
        term._termTimer = null;
        if (promptCursor) promptCursor.style.display = 'none';

        if (steps && steps.length && stepsEl) {
          steps.forEach((step, i) => {
            const tId = win.setTimeout(() => {
              if (!term.isConnected) return;
              const line = doc.createElement('div');
              line.className = 's-terminal-line is-visible';
              const isInfo = step.startsWith('ℹ') || step.includes('lib/utils');
              const iconColor = isInfo ? '#3b82f6' : '#22c55e';
              const iconChar = isInfo ? 'ℹ' : '✔';
              const cleanText = step.replace(/^[✔ℹ\?]\s*/, '');
              line.innerHTML = `<span class="s-terminal-check" style="color:${iconColor};font-weight:bold;margin-right:6px;">${iconChar}</span> <span>${escapeText(cleanText)}</span>`;
              stepsEl.appendChild(line);

              if (i === steps.length - 1 && outEl && output) {
                const tFinal = win.setTimeout(() => {
                  if (!term.isConnected) return;
                  outEl.style.display = 'block';
                  outEl.className = 's-terminal-output s-terminal-line is-visible is-muted';
                  outEl.innerHTML = '<span class="s-terminal-out-text"></span><span class="s-terminal-cursor"></span>';
                  const outTextEl = outEl.querySelector('.s-terminal-out-text');
                  const outCursor = outEl.querySelector('.s-terminal-cursor');
                  if (outCursor) outCursor.style.display = 'inline-block';

                  let outCharIdx = 0;
                  const outTimer = win.setInterval(() => {
                    if (!term.isConnected || outCharIdx >= output.length) {
                      win.clearInterval(outTimer);
                      return;
                    }
                    if (outTextEl) outTextEl.textContent += output[outCharIdx];
                    outCharIdx++;
                  }, 24);
                  term._termTimeouts.push(outTimer);
                }, 260);
                term._termTimeouts.push(tFinal);
              }
            }, 200 + i * 180);
            term._termTimeouts.push(tId);
          });
        } else if (outEl && output) {
          const tFinal = win.setTimeout(() => {
            if (!term.isConnected) return;
            outEl.style.display = 'block';
            outEl.className = 's-terminal-output s-terminal-line is-visible is-muted';
            outEl.innerHTML = '<span class="s-terminal-out-text"></span><span class="s-terminal-cursor"></span>';
            const outTextEl = outEl.querySelector('.s-terminal-out-text');
            const outCursor = outEl.querySelector('.s-terminal-cursor');
            if (outCursor) outCursor.style.display = 'inline-block';

            let outCharIdx = 0;
            const outTimer = win.setInterval(() => {
              if (!term.isConnected || outCharIdx >= output.length) {
                win.clearInterval(outTimer);
                return;
              }
              if (outTextEl) outTextEl.textContent += output[outCharIdx];
              outCharIdx++;
            }, 24);
            term._termTimeouts.push(outTimer);
          }, 260);
          term._termTimeouts.push(tFinal);
        }
      }
    }, 45);
  };

  if (force || typeof win.IntersectionObserver === 'undefined') {
    startSequence();
  } else {
    const observer = new win.IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        observer.disconnect();
        startSequence();
      }
    }, { threshold: 0.2 });
    observer.observe(term);
  }
}

export function initAnimatedList(list, force = false) {
  if (!list) return;
  if (!force && list.dataset.initialized === 'true') return;
  list.dataset.initialized = 'true';

  const doc = docOf(list), win = doc.defaultView;
  if (list._animListTimer) { win.clearInterval(list._animListTimer); list._animListTimer = null; }

  let items = [];
  try { items = JSON.parse(list.dataset.items || '[]'); } catch {}
  if (!items.length) {
    const existing = list.querySelectorAll('.s-animated-list-item');
    if (existing.length) {
      items = Array.from(existing).map(el => el.innerHTML);
    }
  }
  if (!items.length) return;

  const delay = Number(list.dataset.delay) || 1200;
  let idx = 1;

  list._animListTimer = win.setInterval(() => {
    if (!list.isConnected) { win.clearInterval(list._animListTimer); return; }
    const nextItemMarkup = items[idx];
    idx = (idx + 1) % items.length;
    const wrapper = doc.createElement('div');
    wrapper.className = 's-animated-list-item';
    wrapper.innerHTML = nextItemMarkup;
    list.prepend(wrapper);

    const children = list.querySelectorAll('.s-animated-list-item');
    if (children.length > 4) {
      const last = children[children.length - 1];
      last.style.transition = 'all 0.35s ease';
      last.style.opacity = '0';
      last.style.transform = 'scale(0.85)';
      win.setTimeout(() => last.remove(), 360);
    }
  }, delay);
}

export function initNumberTicker(el, force = false) {
  if (!el) return;
  if (!force && el.dataset.tickerDone === 'true') return;
  el.dataset.tickerDone = 'true';

  const win = docOf(el).defaultView;
  const targetVal = Number(el.dataset.sNumberTicker) || 0;
  const decimals = Number(el.dataset.decimals) || 0;
  let startTime = null;

  const step = time => {
    if (!el.isConnected) return;
    if (!startTime) startTime = time;
    const progress = Math.min(1, (time - startTime) / 1600);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    el.textContent = (easeOut * targetVal).toFixed(decimals);
    if (progress < 1) win.requestAnimationFrame(step);
  };
  win.requestAnimationFrame(step);
}

export function initDock(dock) {
  if (!dock) return;
  const iconNodes = Array.from(dock.querySelectorAll('.s-dock-icon'));
  if (!iconNodes.length) return;

  const distance = Number(dock.dataset.distance) || 140;
  const baseSize = Number(dock.dataset.size) || 40;
  const maxSize = Number(dock.dataset.magnification) || 60;
  const isVertical = dock.classList.contains('s-dock--vertical');

  const icons = iconNodes.map(node => ({
    node,
    currentSize: baseSize,
    targetSize: baseSize,
    velocity: 0
  }));

  let mousePos = Infinity;
  let isHovered = false;
  let animFrameId = null;

  const springLoop = () => {
    let isMoving = false;
    icons.forEach(icon => {
      if (isHovered && mousePos !== Infinity) {
        const rect = icon.node.getBoundingClientRect();
        const center = isVertical ? (rect.top + rect.height / 2) : (rect.left + rect.width / 2);
        const d = Math.abs(mousePos - center);
        if (d < distance) {
          const progress = 1 - (d / distance);
          icon.targetSize = baseSize + (maxSize - baseSize) * progress;
        } else {
          icon.targetSize = baseSize;
        }
      } else {
        icon.targetSize = baseSize;
      }

      // Spring-damper physics matching MagicUI useSpring({ mass: 0.1, stiffness: 150, damping: 12 })
      const force = (icon.targetSize - icon.currentSize) * 0.28;
      icon.velocity = (icon.velocity + force) * 0.68;
      icon.currentSize += icon.velocity;

      if (Math.abs(icon.targetSize - icon.currentSize) > 0.05 || Math.abs(icon.velocity) > 0.05) {
        isMoving = true;
      } else {
        icon.currentSize = icon.targetSize;
        icon.velocity = 0;
      }

      icon.node.style.setProperty('--dock-size', `${icon.currentSize.toFixed(2)}px`);
      icon.node.style.width = `${icon.currentSize.toFixed(2)}px`;
      icon.node.style.height = `${icon.currentSize.toFixed(2)}px`;
    });

    if (isMoving || isHovered) {
      animFrameId = requestAnimationFrame(springLoop);
    } else {
      animFrameId = null;
    }
  };

  const startLoop = () => {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(springLoop);
    }
  };

  dock.addEventListener('mousemove', (e) => {
    mousePos = isVertical ? e.clientY : e.clientX;
    isHovered = true;
    startLoop();
  });

  dock.addEventListener('mouseleave', () => {
    mousePos = Infinity;
    isHovered = false;
    startLoop();
  });
}

export function initGlobe(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;

  function isGlobeLand(lat, lon) {
    if (lat >= 14 && lat <= 72 && lon >= -168 && lon <= -52) {
      if (lat > 55 && lon > -140 && lon < -60 && lat < 68 && (lon < -120 || lon > -80)) return true;
      if (lat >= 25 && lat <= 50 && lon >= -125 && lon <= -67) return true;
      if (lat >= 50 && lat <= 72 && lon >= -168 && lon <= -130) return true;
      if (lat >= 14 && lat < 33 && lon >= -118 && lon <= -86) return true;
      if (lat >= 60 && lat <= 83 && lon >= -55 && lon <= -18) return true;
    }
    if (lat >= 7 && lat <= 26 && lon >= -88 && lon <= -59) {
      if (lat >= 7 && lat <= 18 && lon >= -90 && lon <= -77) return true;
      if ((lat >= 18 && lat <= 24 && lon >= -85 && lon <= -74) || (lat >= 17 && lat <= 19 && lon >= -72 && lon <= -65)) return true;
    }
    if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) {
      if (lat >= 0 && lat <= 13 && lon >= -79 && lon <= -50) return true;
      if (lat >= -22 && lat < 0 && lon >= -80 && lon <= -34) return true;
      if (lat >= -40 && lat < -22 && lon >= -72 && lon <= -45) return true;
      if (lat >= -56 && lat < -40 && lon >= -75 && lon <= -62) return true;
    }
    if (lat >= 35 && lat <= 71 && lon >= -11 && lon <= 42) {
      if (lat >= 50 && lat <= 59 && lon >= -11 && lon <= 2) return true;
      if (lat >= 55 && lat <= 71 && lon >= 4 && lon <= 32) return true;
      if (lat >= 36 && lat <= 44 && lon >= -10 && lon <= 4) return true;
      if (lat >= 42 && lat <= 55 && lon >= -5 && lon <= 30) return true;
      if (lat >= 36 && lat <= 47 && lon >= 6 && lon <= 19) return true;
      if (lat >= 35 && lat <= 43 && lon >= 19 && lon <= 29) return true;
    }
    if (lat >= -35 && lat <= 38 && lon >= -18 && lon <= 52) {
      if (lat >= 20 && lat <= 37 && lon >= -18 && lon <= 35) return true;
      if (lat >= 4 && lat < 20 && lon >= -18 && lon <= 52) return true;
      if (lat >= -15 && lat < 4 && lon >= 8 && lon <= 43) return true;
      if (lat >= -35 && lat < -15 && lon >= 12 && lon <= 36) return true;
      if (lat >= -26 && lat <= -12 && lon >= 43 && lon <= 51) return true;
    }
    if (lat >= 12 && lat <= 42 && lon >= 34 && lon <= 63) {
      if (lat >= 12 && lat <= 32 && lon >= 34 && lon <= 60) return true;
      if (lat >= 25 && lat <= 40 && lon >= 44 && lon <= 63) return true;
      if (lat >= 36 && lat <= 42 && lon >= 26 && lon <= 45) return true;
    }
    if (lat >= -11 && lat <= 78 && lon >= 60 && lon <= 180) {
      if (lat >= 50 && lat <= 75 && lon >= 40 && lon <= 180) return true;
      if (lat >= 35 && lat < 50 && lon >= 50 && lon <= 90) return true;
      if (lat >= 6 && lat <= 36 && lon >= 68 && lon <= 92) return true;
      if (lat >= 18 && lat <= 54 && lon >= 75 && lon <= 135) return true;
      if (lat >= 33 && lat <= 43 && lon >= 124 && lon <= 130) return true;
      if (lat >= 30 && lat <= 46 && lon >= 129 && lon <= 146) return true;
      if (lat >= 21 && lat <= 26 && lon >= 119 && lon <= 122) return true;
      if (lat >= 10 && lat <= 28 && lon >= 92 && lon <= 110) return true;
      if (lat >= 5 && lat <= 19 && lon >= 118 && lon <= 126) return true;
      if (lat >= -11 && lat <= 8 && lon >= 95 && lon <= 142) return true;
    }
    if (lat >= -45 && lat <= -10 && lon >= 112 && lon <= 155) return true;
    if (lat >= -48 && lat <= -34 && lon >= 165 && lon <= 179) return true;
    if (lat >= -11 && lat <= 0 && lon >= 130 && lon <= 152) return true;
    if (lat <= -65) return true;
    return false;
  }

  const dots = [];
  const rows = 110;
  for (let r = 0; r <= rows; r++) {
    const lat = -85 + (170 * r) / rows;
    const latRad = (lat * Math.PI) / 180;
    const cosLat = Math.cos(latRad);
    const cols = Math.max(8, Math.floor(220 * cosLat));
    for (let c = 0; c < cols; c++) {
      const lon = -180 + (360 * c) / cols;
      const lonRad = (lon * Math.PI) / 180;
      if (isGlobeLand(lat, lon)) {
        dots.push({
          x: Math.cos(latRad) * Math.sin(lonRad),
          y: -Math.sin(latRad),
          z: Math.cos(latRad) * Math.cos(lonRad),
          size: 1.25
        });
      }
    }
  }

  const markers = [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.0760, 72.8777], size: 0.08 },
    { location: [23.8103, 90.4125], size: 0.06 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [40.7128, -74.0060], size: 0.08 },
    { location: [37.7749, -122.4194], size: 0.08 },
    { location: [35.6762, 139.6503], size: 0.08 },
    { location: [51.5074, -0.1278], size: 0.07 },
    { location: [1.3521, 103.8198], size: 0.06 },
    { location: [-33.8688, 151.2093], size: 0.06 }
  ].map(m => {
    const latRad = (m.location[0] * Math.PI) / 180;
    const lonRad = (m.location[1] * Math.PI) / 180;
    return {
      x: Math.cos(latRad) * Math.sin(lonRad),
      y: -Math.sin(latRad),
      z: Math.cos(latRad) * Math.cos(lonRad),
      size: m.size
    };
  });

  let rotY = 0.5, rotX = 0.28, isDrag = false, lastX = 0, lastY = 0, vx = 0, vy = 0.003, pulse = 0;

  const renderGlobe = () => {
    if (!canvas.isConnected) return;
    const parent = canvas.parentElement;
    const w = parent?.clientWidth ? parent.clientWidth * 2 : 1200;
    const h = parent?.clientHeight ? parent.clientHeight * 2 : 1200;
    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w; canvas.height = h;
    }
    const cw = canvas.width || 1200, ch = canvas.height || 1200;
    ctx.clearRect(0, 0, cw, ch);
    const cx = cw / 2, cy = ch / 2, r = Math.min(cw, ch) * 0.49;

    if (!isDrag) {
      rotY += 0.0035 + vy * 0.6;
      rotX = Math.max(-0.6, Math.min(0.6, rotX + vx * 0.6));
      vy *= 0.94;
      vx *= 0.94;
    }
    pulse = (pulse + 0.04) % (Math.PI * 2);

    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark');

    // 1. Solid 3D Shaded Sphere Body
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    if (isDark) {
      const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.05, cx + r * 0.15, cy + r * 0.15, r * 1.05);
      sphereGrad.addColorStop(0, '#1c1f2e');
      sphereGrad.addColorStop(0.4, '#12141f');
      sphereGrad.addColorStop(0.75, '#090a10');
      sphereGrad.addColorStop(1, '#050608');
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    } else {
      const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.05, cx + r * 0.2, cy + r * 0.2, r * 1.05);
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.35, '#f8fafc');
      sphereGrad.addColorStop(0.7, '#e2e8f0');
      sphereGrad.addColorStop(0.92, '#cbd5e1');
      sphereGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

      const rimGrad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
      rimGrad.addColorStop(0, 'rgba(0,0,0,0)');
      rimGrad.addColorStop(0.85, 'rgba(148,163,184,0.12)');
      rimGrad.addColorStop(1, 'rgba(100,116,139,0.3)');
      ctx.fillStyle = rimGrad;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    // 2. Render 3D Dots on Landmasses
    for (let i = 0; i < dots.length; i++) {
      const p = dots[i];
      const x1 = p.x * cosY - p.z * sinY, z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX, z2 = p.y * sinX + z1 * cosX;
      if (z2 < 0.02) continue;

      const screenX = cx + x1 * r, screenY = cy + y2 * r;
      const depth = Math.max(0, Math.min(1, z2));
      const dotSize = p.size * (0.85 + depth * 0.45);

      if (isDark) {
        ctx.fillStyle = depth > 0.25 ? '#ffffff' : '#e2e8f0';
        ctx.globalAlpha = Math.max(0.2, depth * 0.95);
      } else {
        ctx.fillStyle = depth > 0.25 ? '#0f172a' : '#334155';
        ctx.globalAlpha = Math.max(0.15, depth * 0.9);
      }

      ctx.beginPath();
      ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Render Glowing City Markers (Orange Cobe Style)
    markers.forEach(m => {
      const x1 = m.x * cosY - m.z * sinY, z1 = m.x * sinY + m.z * cosY;
      const y2 = m.y * cosX - z1 * sinX, z2 = m.y * sinX + z1 * cosX;
      if (z2 > 0.05) {
        const sx = cx + x1 * r, sy = cy + y2 * r;
        const baseR = 3.2;
        const wave = (Math.sin(pulse) + 1) / 2;
        const rippleR = baseR + wave * 8.5;
        const rippleAlpha = Math.max(0, 1 - wave);

        ctx.strokeStyle = '#fb6415';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = rippleAlpha * z2;
        ctx.beginPath();
        ctx.arc(sx, sy, rippleR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(251, 100, 21, 0.35)';
        ctx.globalAlpha = z2 * 0.75;
        ctx.beginPath();
        ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fb6415';
        ctx.globalAlpha = Math.min(1, z2 * 1.4);
        ctx.beginPath();
        ctx.arc(sx, sy, baseR, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.restore();

    ctx.globalAlpha = 1;
    win.requestAnimationFrame(renderGlobe);
  };

  const onPointerDown = e => {
    isDrag = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastX = clientX;
    lastY = clientY;
    vx = 0;
    vy = 0;
  };
  const onPointerMove = e => {
    if (!isDrag) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastX;
    const dy = clientY - lastY;
    rotY += dx * 0.006;
    rotX = Math.max(-0.9, Math.min(0.9, rotX + dy * 0.006));
    vy = dx * 0.004;
    vx = dy * 0.004;
    lastX = clientX;
    lastY = clientY;
  };
  const onPointerUp = () => {
    isDrag = false;
  };

  canvas.addEventListener('mousedown', onPointerDown);
  win.addEventListener('mousemove', onPointerMove);
  win.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  win.addEventListener('touchmove', onPointerMove, { passive: true });
  win.addEventListener('touchend', onPointerUp);
  renderGlobe();
}

export function initIconCloud(canvas) {
  if (!canvas) return;
  if (canvas.dataset.iconCloudInitialized === 'true') {
    canvas._sIconCloudResume?.();
    return;
  }
  canvas.dataset.iconCloudInitialized = 'true';
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  const win = docOf(canvas).defaultView;
  const wrap = canvas.closest('.s-icon-cloud-wrap') || canvas.parentElement;
  const toggleBtn = wrap?.querySelector('[data-s-cloud-toggle]');

  let images = [];
  try { images = JSON.parse(canvas.dataset.images || '[]'); } catch {}

  const defaultSlugs = [
    'typescript', 'javascript', 'dart', 'java', 'react', 'flutter', 'android',
    'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs', 'prisma', 'amazonaws',
    'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest', 'cypress',
    'docker', 'git', 'jira', 'github', 'gitlab', 'visualstudiocode', 'androidstudio',
    'sonarqube', 'figma'
  ];

  const items = (images && images.length) ? images : defaultSlugs.map(s => `https://cdn.simpleicons.org/${s}/${s}`);
  const numIcons = items.length || 20;

  // Create icon canvases once when icons/images change
  const iconCanvases = [];
  const loaded = new Array(numIcons).fill(false);

  items.forEach((item, index) => {
    const offscreen = docOf(canvas).createElement('canvas');
    offscreen.width = 40;
    offscreen.height = 40;
    const offCtx = offscreen.getContext('2d');
    iconCanvases.push(offscreen);

    if (offCtx) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = typeof item === 'string' ? item : `https://cdn.simpleicons.org/${item}/${item}`;
      img.onload = () => {
        offCtx.clearRect(0, 0, 40, 40);

        // Create circular clipping path
        offCtx.beginPath();
        offCtx.arc(20, 20, 20, 0, Math.PI * 2);
        offCtx.closePath();
        offCtx.clip();

        // Draw the image
        offCtx.drawImage(img, 0, 0, 40, 40);

        loaded[index] = true;
      };
    }
  });

  // Generate initial icon positions on a sphere (Fibonacci sphere parameters)
  const iconPositions = [];
  const offset = 2 / numIcons;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numIcons; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    iconPositions.push({
      x: x * 100,
      y: y * 100,
      z: z * 100,
      scale: 1,
      opacity: 1,
      id: i
    });
  }

  let rotation = { x: 0, y: 0 };
  let isDragging = false;
  let isPaused = false;
  let lastMousePos = { x: 0, y: 0 };
  let currentVx = 0.002;
  let currentVy = 0.005;
  let targetVx = 0.002;
  let targetVy = 0.005;
  let targetRotation = null;
  let animId = null;

  // Check reduced motion
  try {
    const mediaQuery = win.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) isPaused = true;
  } catch {}

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const startLoop = () => {
    if (!animId) {
      animId = win.requestAnimationFrame(animate);
    }
  };

  // Play / Pause toggle
  const updateToggleUI = () => {
    if (!toggleBtn) return;
    toggleBtn.setAttribute('aria-label', isPaused ? 'Play animation' : 'Pause animation');
    toggleBtn.title = isPaused ? 'Play animation' : 'Pause animation';
    const iconSpan = toggleBtn.querySelector('.s-icon-cloud-ctrl-icon') || toggleBtn;
    iconSpan.innerHTML = render(Icon({ name: isPaused ? 'play' : 'pause', size: 14 }));
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isPaused = !isPaused;
      if (isPaused) {
        currentVx = 0;
        currentVy = 0;
        targetVx = 0;
        targetVy = 0;
      } else {
        targetVx = 0.002;
        targetVy = 0.005;
      }
      updateToggleUI();
      if (!isPaused) {
        startLoop();
      }
    });
    updateToggleUI();
  }

  // Handle mouse events
  const handleMouseDown = (e) => {
    if (!canvas.isConnected || canvas.offsetWidth === 0 || canvas.offsetHeight === 0) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    let clickedIcon = false;
    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvas.width / 2 + rotatedX;
      const screenY = canvas.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        clickedIcon = true;
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotation.x;
        const currentY = rotation.y;
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));
        const duration = Math.min(2000, Math.max(800, distance * 1000));

        targetRotation = {
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration
        };
      }
    });

    if (!clickedIcon) {
      isDragging = true;
      lastMousePos = { x: clientX, y: clientY };
    }
    startLoop();
  };

  const handleMouseMove = (e) => {
    if (!canvas.isConnected || canvas.offsetWidth === 0 || canvas.offsetHeight === 0) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const isInside = clientX >= rect.left && clientX <= rect.right &&
                     clientY >= rect.top && clientY <= rect.bottom;

    if (isInside) {
      const nx = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((clientY - rect.top) / rect.height - 0.5) * 2;
      targetVx = ny * 0.012;
      targetVy = -nx * 0.012;
      startLoop();
    } else if (!isDragging) {
      targetVx = 0.002;
      targetVy = 0.005;
    }

    if (isDragging) {
      const deltaX = clientX - lastMousePos.x;
      const deltaY = clientY - lastMousePos.y;

      rotation.x += deltaY * 0.004;
      rotation.y += deltaX * 0.004;

      lastMousePos = { x: clientX, y: clientY };
      startLoop();
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      targetVx = 0.002;
      targetVy = 0.005;
    }
  };

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  win.addEventListener('mousemove', handleMouseMove);
  win.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('touchstart', handleMouseDown, { passive: true });
  win.addEventListener('touchmove', handleMouseMove, { passive: true });
  win.addEventListener('touchend', handleMouseUp);

  // Watch visibility to reset state when hidden in tabs and cleanly resume without acceleration
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          targetVx = 0.002;
          targetVy = 0.005;
        } else {
          targetVx = 0.002;
          targetVy = 0.005;
          if (!isPaused) startLoop();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  canvas._sIconCloudResume = () => {
    if (!isPaused) startLoop();
  };

  // Animation and rendering
  const animate = () => {
    animId = null;
    if (!canvas.isConnected) return;

    // If canvas is hidden (e.g. in non-active tab/card), keep gentle velocities and request frame
    if (canvas.offsetWidth === 0 && canvas.offsetHeight === 0) {
      currentVx = 0.002;
      currentVy = 0.005;
      targetVx = 0.002;
      targetVy = 0.005;
      animId = win.requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (targetRotation) {
      const elapsed = performance.now() - targetRotation.startTime;
      const progress = Math.min(1, elapsed / targetRotation.duration);
      const easedProgress = easeOutCubic(progress);

      rotation = {
        x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
        y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress
      };

      if (progress >= 1) {
        targetRotation = null;
      }
    } else if (!isDragging && !isPaused) {
      currentVx += (targetVx - currentVx) * 0.06;
      currentVy += (targetVy - currentVy) * 0.06;
      rotation.x += currentVx;
      rotation.y += currentVy;
    }

    iconPositions.forEach((icon, index) => {
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const scale = (rotatedZ + 200) / 300;
      const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

      ctx.save();
      ctx.translate(
        canvas.width / 2 + rotatedX,
        canvas.height / 2 + rotatedY
      );
      ctx.scale(scale, scale);
      ctx.globalAlpha = opacity;

      if (iconCanvases[index] && loaded[index]) {
        ctx.drawImage(iconCanvases[index], -20, -20, 40, 40);
      } else {
        // Show numbered circles if no icons/images are loaded yet
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#5B3DF5';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 12px monospace, sans-serif';
        ctx.fillText(`${icon.id + 1}`, 0, 0);
      }

      ctx.restore();
    });

    const hasPendingAssets = !loaded.every(Boolean);
    const shouldContinue = !isPaused || isDragging || targetRotation !== null || hasPendingAssets;

    if (shouldContinue) {
      animId = win.requestAnimationFrame(animate);
    }
  };

  startLoop();
}


export function initPointer(el) {
  if (!el || el.dataset.pointerInitialized === 'true') return;
  el.dataset.pointerInitialized = 'true';
  const glyph = el.querySelector('.s-pointer-glyph') || el.querySelector('[data-pointer-glyph]');
  if (!glyph) return;

  el.style.cursor = 'none';
  el.addEventListener('mouseenter', () => {
    glyph.style.opacity = '1';
    glyph.style.transform = 'scale(1)';
  });
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glyph.style.left = `${x}px`;
    glyph.style.top = `${y}px`;
  });
  el.addEventListener('mouseleave', () => {
    glyph.style.opacity = '0';
    glyph.style.transform = 'scale(0.6)';
  });
}

export function initSmoothCursor(container) {
  if (!container || container.dataset.smoothCursorInitialized === 'true') return;
  const follower = container.querySelector('.s-smooth-cursor-follower');
  if (!follower) return;

  const doc = docOf(container);
  const win = doc.defaultView;
  if (!win) return;

  const isTargetActive = (el) => {
    if (!el || !el.isConnected) return false;
    if (el.closest('[hidden]')) return false;
    const card = el.closest('[data-component-name]');
    if (card) {
      if (card.hidden || card.style.display === 'none') return false;
      const docEl = doc.documentElement;
      if (docEl.dataset.componentMode === 'catalog') return false;
      if (card.dataset.componentName?.toLowerCase() !== 'smoothcursor') return false;
    }
    const view = el.closest('[data-view]');
    if (view && (view.hidden || view.style.display === 'none')) return false;
    return true;
  };

  if (!isTargetActive(container)) return;
  container.dataset.smoothCursorInitialized = 'true';

  // Globally hide native OS cursor via dedicated style block
  let styleEl = doc.getElementById('s-smooth-cursor-hide-native');
  if (!styleEl && doc.head) {
    styleEl = doc.createElement('style');
    styleEl.id = 's-smooth-cursor-hide-native';
    styleEl.textContent = `
      *, *::before, *::after, html, body, a, button, input, textarea, select, label, svg, div, span, kbd, code, pre {
        cursor: none !important;
      }
    `;
    doc.head.appendChild(styleEl);
  }

  let marker = container._marker;
  if (!marker && container.parentElement && container.parentElement !== doc.body) {
    marker = doc.createElement('span');
    marker.style.display = 'none';
    marker.className = 's-smooth-cursor-marker';
    container.replaceWith(marker);
    doc.body.appendChild(container);
    container._marker = marker;
  }

  let mouseX = -100, mouseY = -100;
  let currX = -100, currY = -100;
  let lastX = -100, lastY = -100, lastTime = win.performance ? win.performance.now() : Date.now();
  let previousAngle = 0, accumulatedRotation = 0, currentAngle = 0;
  let targetScale = 1, currentScale = 1;
  let scaleTimeout = null;
  let isVisible = false;
  let rafId = null;

  follower.style.position = 'fixed';
  follower.style.top = '0px';
  follower.style.left = '0px';
  follower.style.pointerEvents = 'none';
  follower.style.zIndex = '999999';
  follower.style.opacity = '0';
  follower.style.transformOrigin = 'center center';
  follower.style.willChange = 'transform, opacity';

  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '999999';

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return;

    const now = win.performance ? win.performance.now() : Date.now();
    const dt = now - lastTime;
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      currX = mouseX;
      currY = mouseY;
      lastX = mouseX;
      lastY = mouseY;
    }
    follower.style.opacity = '1';

    if (dt > 0 && lastX >= 0) {
      const vx = (mouseX - lastX) / dt;
      const vy = (mouseY - lastY) / dt;
      const speed = Math.hypot(vx, vy);

      if (speed > 0.08) {
        const currentAngleRad = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        let angleDiff = currentAngleRad - previousAngle;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation += angleDiff;
        previousAngle = currentAngleRad;

        targetScale = 0.95;
        if (scaleTimeout) win.clearTimeout(scaleTimeout);
        scaleTimeout = win.setTimeout(() => {
          targetScale = 1;
        }, 150);
      }
    }

    lastX = mouseX;
    lastY = mouseY;
    lastTime = now;
  };

  const onMouseLeave = () => {
    isVisible = false;
    follower.style.opacity = '0';
  };

  win.addEventListener('pointermove', onPointerMove, { passive: true });
  doc.addEventListener('mouseleave', onMouseLeave);

  const cleanup = () => {
    if (rafId) {
      win.cancelAnimationFrame(rafId);
      rafId = null;
    }
    win.removeEventListener('pointermove', onPointerMove);
    doc.removeEventListener('mouseleave', onMouseLeave);
    const existingStyle = doc.getElementById('s-smooth-cursor-hide-native');
    if (existingStyle) existingStyle.remove();
    container.dataset.smoothCursorInitialized = 'false';
    if (marker && marker.isConnected) {
      marker.replaceWith(container);
      delete container._marker;
    } else {
      container.remove();
    }
  };

  const update = () => {
    const target = marker || container;
    if (!isTargetActive(target)) {
      cleanup();
      return;
    }

    if (isVisible) {
      currX += (mouseX - currX) * 0.25;
      currY += (mouseY - currY) * 0.25;
      currentAngle += (accumulatedRotation - currentAngle) * 0.2;
      currentScale += (targetScale - currentScale) * 0.22;

      follower.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%) rotate(${currentAngle.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
    }

    rafId = win.requestAnimationFrame(update);
  };

  rafId = win.requestAnimationFrame(update);
}

export function initHyperText(el) {
  if (!el || el.dataset.hyperInitialized === 'true') return;
  el.dataset.hyperInitialized = 'true';
  const win = docOf(el).defaultView;
  const original = el.dataset.sHyperText || el.dataset.text || el.textContent.trim();
  el.dataset.text = original;
  const duration = Number(el.dataset.duration) || 800;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let isAnimating = false;

  const scramble = () => {
    if (isAnimating) return;
    isAnimating = true;
    const startTime = win.performance.now();
    const maxIterations = original.length;

    const frame = (now) => {
      if (!el.isConnected) { isAnimating = false; return; }
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentIter = progress * maxIterations;

      el.textContent = original.split('').map((letter, index) => {
        if (letter === ' ') return ' ';
        if (index <= currentIter) return original[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      if (progress < 1) {
        win.requestAnimationFrame(frame);
      } else {
        el.textContent = original;
        isAnimating = false;
      }
    };
    win.requestAnimationFrame(frame);
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

  const useHover = container.hasAttribute('data-confetti-hover');
  const eventName = useHover ? 'mouseenter' : 'click';
  trigger.addEventListener(eventName, e => {
    const x = (e.clientX ?? win.innerWidth / 2) / win.innerWidth;
    const y = (e.clientY ?? win.innerHeight / 2) / win.innerHeight;
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

  const count = Number(canvas.dataset.quantity || canvas.dataset.count) || 80;
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 260,
      z: (Math.random() - 0.5) * 300,
      size: 2.5 + Math.random() * 3.5
    });
  }

  let angleY = 0, angleX = 0.2;
  const render = () => {
    if (!canvas.isConnected) return;
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const w = rect.width || 600, h = rect.height || 380;
    if (canvas.width !== w * 2 || canvas.height !== h * 2) {
      canvas.width = w * 2; canvas.height = h * 2;
      ctx.scale(2, 2);
    }
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;

    angleY += 0.005;
    const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

    const isDark = docOf(canvas).documentElement.dataset.theme === 'dark';
    const color = canvas.dataset.color || (isDark ? '#a78bfa' : '#6366f1');

    points.forEach(p => {
      const rx = p.x * cosY - p.z * sinY;
      const rz = p.x * sinY + p.z * cosY;
      const ry = p.y * cosX - rz * sinX;
      const finalZ = p.y * sinX + rz * cosX;

      const scale = 280 / (280 + finalZ + 160);
      const screenX = cx + rx * scale;
      const screenY = cy + ry * scale;
      const alpha = Math.max(0.18, Math.min(0.95, (finalZ + 200) / 360));

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

  const parent = canvas.parentElement || canvas;
  const sq = Number(canvas.dataset.squareSize) || 4;
  const gap = Number(canvas.dataset.gridGap) || 6;
  const flickerChance = Number(canvas.dataset.flickerChance) || 0.1;
  const maxOpacity = Number(canvas.dataset.maxOpacity) || 0.35;
  const total = sq + gap;

  let cols = 0, rows = 0;
  let squares = null;
  let dpr = win.devicePixelRatio || 1;

  const isDark = docOf(canvas).documentElement.dataset.theme === 'dark';
  const colorStr = canvas.dataset.color || (isDark ? '148, 163, 184' : '100, 116, 139');
  const rgbaPrefix = colorStr.includes(',') ? `rgba(${colorStr}, ` : `rgba(148, 163, 184, `;

  const resize = () => {
    const w = parent.clientWidth || 600;
    const h = parent.clientHeight || 380;
    dpr = win.devicePixelRatio || 1;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cols = Math.ceil(w / total);
      rows = Math.ceil(h / total);
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
    }
  };
  resize();

  let lastTime = 0;
  const render = (time = 0) => {
    if (!canvas.isConnected) return;
    if (!lastTime) lastTime = time;
    const deltaTime = Math.min(0.1, (time - lastTime) / 1000);
    lastTime = time;

    if (squares && cols > 0 && rows > 0) {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${rgbaPrefix}${opacity})`;
          ctx.fillRect(i * total * dpr, j * total * dpr, sq * dpr, sq * dpr);
        }
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
      ctx.font = `${fontSize}px monospace`;

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
  const mode = card.dataset.mode || 'gradient';

  let orbX = -999, orbY = -999;
  let targetX = -999, targetY = -999;
  let isHovered = false;
  let rafId = null;

  function updateSpring() {
    if (mode === 'orb') {
      const stiffness = 0.15;
      orbX += (targetX - orbX) * stiffness;
      orbY += (targetY - orbY) * stiffness;
      card.style.setProperty('--orb-x', `${orbX.toFixed(2)}px`);
      card.style.setProperty('--orb-y', `${orbY.toFixed(2)}px`);
    }
    if (isHovered || (mode === 'orb' && (Math.abs(orbX - targetX) > 0.5 || Math.abs(orbY - targetY) > 0.5))) {
      rafId = requestAnimationFrame(updateSpring);
    } else {
      rafId = null;
    }
  }

  card.addEventListener('pointermove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetX = x;
    targetY = y;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--s-mouse-x', `${x}px`);
    card.style.setProperty('--s-mouse-y', `${y}px`);
    if (mode === 'orb' && !rafId) {
      if (orbX === -999) { orbX = x; orbY = y; }
      rafId = requestAnimationFrame(updateSpring);
    }
  });

  card.addEventListener('pointerenter', e => {
    isHovered = true;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetX = x;
    targetY = y;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--s-mouse-x', `${x}px`);
    card.style.setProperty('--s-mouse-y', `${y}px`);
    if (mode === 'orb') {
      orbX = x;
      orbY = y;
      card.style.setProperty('--orb-x', `${x}px`);
      card.style.setProperty('--orb-y', `${y}px`);
      if (!rafId) rafId = requestAnimationFrame(updateSpring);
    }
  });

  card.addEventListener('pointerleave', () => {
    isHovered = false;
    card.style.setProperty('--mouse-x', '-999px');
    card.style.setProperty('--mouse-y', '-999px');
    card.style.setProperty('--s-mouse-x', '-999px');
    card.style.setProperty('--s-mouse-y', '-999px');
  });
}

export function initLens(container) {
  if (!container || container.dataset.lensInitialized === 'true') return;
  container.dataset.lensInitialized = 'true';

  const isStatic = container.dataset.static === 'true';
  const defaultX = container.dataset.defaultX !== undefined ? parseFloat(container.dataset.defaultX) : null;
  const defaultY = container.dataset.defaultY !== undefined ? parseFloat(container.dataset.defaultY) : null;
  const initialX = container.dataset.initialX !== undefined ? parseFloat(container.dataset.initialX) : null;
  const initialY = container.dataset.initialY !== undefined ? parseFloat(container.dataset.initialY) : null;

  if (isStatic) {
    if (initialX !== null && initialY !== null && !isNaN(initialX) && !isNaN(initialY)) {
      container.style.setProperty('--lens-x', `${initialX}px`);
      container.style.setProperty('--lens-y', `${initialY}px`);
    }
    return;
  }

  if (defaultX !== null && defaultY !== null && !isNaN(defaultX) && !isNaN(defaultY)) {
    container.style.setProperty('--lens-x', `${defaultX}px`);
    container.style.setProperty('--lens-y', `${defaultY}px`);
  }

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    container.style.setProperty('--lens-x', `${x}px`);
    container.style.setProperty('--lens-y', `${y}px`);
    container.dataset.hover = 'true';
  };

  const onPointerEnter = (e) => {
    container.dataset.hover = 'true';
    onPointerMove(e);
  };

  const onPointerLeave = () => {
    container.dataset.hover = 'false';
    if (defaultX !== null && defaultY !== null && !isNaN(defaultX) && !isNaN(defaultY)) {
      container.style.setProperty('--lens-x', `${defaultX}px`);
      container.style.setProperty('--lens-y', `${defaultY}px`);
    } else {
      container.style.removeProperty('--lens-x');
      container.style.removeProperty('--lens-y');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      container.dataset.hover = 'false';
      container.blur();
    }
  };

  container.addEventListener('pointerenter', onPointerEnter);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerleave', onPointerLeave);
  container.addEventListener('keydown', onKeyDown);
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
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
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
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top + rect.height / 2}px`;
      p.style.setProperty('--dx', `${(Math.random() - 0.5) * 160}px`);
      p.style.setProperty('--dy', `${-50 - Math.random() * 120}px`);
      doc.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });
}

export function initHighlighter(el) {
  if (!el || el.dataset.highlighterInitialized === 'true') return;
  el.dataset.highlighterInitialized = 'true';
  const svg = el.querySelector('.s-highlighter-svg');
  const path = el.querySelector('.s-highlighter-path') || el.querySelector('path');
  if (!path) return;

  const rect = el.getBoundingClientRect();
  const w = Math.max(20, rect.width || 120);
  const h = Math.max(16, rect.height || 28);
  const action = el.dataset.action || el.dataset.sHighlighter || 'highlight';

  if (svg) {
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.style.width = `${w}px`;
    svg.style.height = `${h}px`;
  }

  let d = '';
  if (action === 'underline') {
    d = `M 2 ${h - 2} Q ${w * 0.35} ${h + 1} ${w * 0.7} ${h - 3} T ${w - 2} ${h - 1}`;
  } else if (action === 'circle') {
    d = `M 5 ${h / 2} C 5 2, ${w - 5} 2, ${w - 5} ${h / 2} C ${w - 5} ${h - 2}, 5 ${h - 2}, 5 ${h / 2}`;
  } else if (action === 'box') {
    d = `M 2 2 L ${w - 2} 2 L ${w - 2} ${h - 2} L 2 ${h - 2} Z`;
  } else {
    d = `M 0 ${h * 0.65} Q ${w * 0.4} ${h * 0.55} ${w} ${h * 0.65}`;
    path.style.strokeWidth = `${Math.max(12, h * 0.65)}px`;
    path.style.opacity = '0.35';
  }
  path.setAttribute('d', d);

  const len = path.getTotalLength ? path.getTotalLength() : 200;
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;
  setTimeout(() => {
    path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    path.style.strokeDashoffset = '0';
  }, 100);
}

export function initScrollProgress(sp) {
  if (!sp || sp.dataset.scrollInitialized === 'true') return;
  sp.dataset.scrollInitialized = 'true';
  const doc = docOf(sp), win = doc.defaultView;
  const container = sp.closest('[data-scroll-container]');

  const update = () => {
    let progress = 0;
    if (container) {
      const max = container.scrollHeight - container.clientHeight;
      progress = max > 0 ? container.scrollTop / max : 0;
    } else {
      const max = doc.documentElement.scrollHeight - win.innerHeight;
      progress = max > 0 ? win.scrollY / max : 0;
    }
    progress = Math.min(1, Math.max(0, progress));
    sp.style.transform = `scaleX(${progress})`;
    sp.style.transformOrigin = 'left';
    sp.style.width = '100%';
  };

  if (container) {
    container.addEventListener('scroll', update, { passive: true });
  }
  win.addEventListener('scroll', update, { passive: true });
  update();
}

export function initAnimatedBeam(container) {
  if (!container) return;
  const svg = container.querySelector('.beam-svg-overlay, .s-animated-beam');
  if (!svg) return;

  if (container._beamRaf) {
    cancelAnimationFrame(container._beamRaf);
    container._beamRaf = null;
  }

  function bezier(p1x, p1y, p2x, p2y) {
    function sampleCurveX(t) { return ((1 - 3 * p2x + 3 * p1x) * t + (3 * p2x - 6 * p1x)) * t * t + 3 * p1x * t; }
    function sampleCurveY(t) { return ((1 - 3 * p2y + 3 * p1y) * t + (3 * p2y - 6 * p1y)) * t * t + 3 * p1y * t; }
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
    return function(x) { return sampleCurveY(solveCurveX(x)); };
  }
  const easeOutExpo = bezier(0.16, 1, 0.3, 1);

  let activeBeams = [];

  const update = () => {
    const cRect = container.getBoundingClientRect();
    if (!cRect.width || !cRect.height) return;
    svg.setAttribute('viewBox', `0 0 ${cRect.width} ${cRect.height}`);

    const doc = container.ownerDocument || globalThis.document;
    activeBeams = [];

    svg.querySelectorAll('.s-beam-path[data-from][data-to]').forEach(path => {
      const fromSel = path.dataset.from;
      const toSel = path.dataset.to;
      const fromEl = container.querySelector(fromSel) || doc?.querySelector(fromSel);
      const toEl = container.querySelector(toSel) || doc?.querySelector(toSel);
      if (!fromEl || !toEl) return;

      const fRect = fromEl.getBoundingClientRect();
      const tRect = toEl.getBoundingClientRect();

      const startXOffset = parseFloat(path.dataset.startXOffset || 0);
      const startYOffset = parseFloat(path.dataset.startYOffset || 0);
      const endXOffset = parseFloat(path.dataset.endXOffset || 0);
      const endYOffset = parseFloat(path.dataset.endYOffset || 0);

      const startX = fRect.left - cRect.left + fRect.width / 2 + startXOffset;
      const startY = fRect.top - cRect.top + fRect.height / 2 + startYOffset;
      const endX = tRect.left - cRect.left + tRect.width / 2 + endXOffset;
      const endY = tRect.top - cRect.top + tRect.height / 2 + endYOffset;

      const curvature = parseFloat(path.dataset.curvature || 0);
      const controlY = startY - curvature;
      const d = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${controlY} ${endX} ${endY}`;

      path.setAttribute('d', d);
      const bg = svg.querySelector(`[data-bg-for="${path.id}"]`);
      if (bg) {
        bg.setAttribute('d', d);
      }

      const strokeUrl = path.getAttribute('stroke') || '';
      const gradMatch = strokeUrl.match(/url\(#([^)]+)\)/);
      const grad = gradMatch ? svg.querySelector(`#${gradMatch[1]}`) : null;

      const durAttr = path.style.getPropertyValue('--beam-duration') || path.dataset.duration || '5s';
      const delAttr = path.style.getPropertyValue('--beam-delay') || path.dataset.delay || '0s';
      const duration = (parseFloat(durAttr) || 5) * 1000;
      const delay = (parseFloat(delAttr) || 0) * 1000;
      const reverse = path.classList.contains('s-beam-path--reverse') || path.dataset.reverse === 'true';

      if (grad) {
        grad.setAttribute('gradientUnits', 'userSpaceOnUse');
        activeBeams.push({
          grad,
          duration, delay, reverse
        });
      }
    });
  };

  update();

  const startTime = performance.now();
  function loop(now) {
    activeBeams.forEach(b => {
      const tNow = now - startTime;
      if (tNow < b.delay) return;
      const elapsed = (tNow - b.delay) % b.duration;
      const progress = elapsed / b.duration;
      const eased = easeOutExpo(progress);

      let x1, x2;
      if (!b.reverse) {
        x1 = 10 + 100 * eased;
        x2 = 0 + 100 * eased;
      } else {
        x1 = 90 - 100 * eased;
        x2 = 100 - 100 * eased;
      }

      b.grad.setAttribute('x1', `${x1.toFixed(3)}%`);
      b.grad.setAttribute('x2', `${x2.toFixed(3)}%`);
      b.grad.setAttribute('y1', '0%');
      b.grad.setAttribute('y2', '0%');
    });

    container._beamRaf = requestAnimationFrame(loop);
  }
  container._beamRaf = requestAnimationFrame(loop);

  const win = container.ownerDocument?.defaultView || globalThis;
  if (win?.ResizeObserver) {
    const ro = new win.ResizeObserver(() => update());
    ro.observe(container);
  }
}

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
  root.querySelectorAll('canvas[data-s-flickering], canvas[data-s-flickering-grid]').forEach(g => initFlickeringGrid(g));
  root.querySelectorAll('canvas[data-s-glyph-matrix]').forEach(m => initGlyphMatrix(m));
  root.querySelectorAll('[data-s-magic-card]').forEach(m => initMagicCard(m));
  root.querySelectorAll('[data-s-lens]').forEach(l => initLens(l));
  root.querySelectorAll('[data-s-file-tree]').forEach(t => initFileTree(t));
  root.querySelectorAll('[data-s-ripple-button]').forEach(r => initRippleButton(r));
  root.querySelectorAll('[data-s-cool-mode]').forEach(c => initCoolMode(c));
  root.querySelectorAll('[data-s-highlighter]').forEach(h => initHighlighter(h));
  root.querySelectorAll('[data-s-scroll-progress]').forEach(s => initScrollProgress(s));
  root.querySelectorAll('[data-s-beam-container], .animated-beam-demo-container').forEach(b => initAnimatedBeam(b));
}

/* -------------------------------------------------------------------------- */
/* Main DOM Enhancement                                                       */
/* -------------------------------------------------------------------------- */

export function enhanceUI(root = globalThis.document) {
  if (!root?.addEventListener) return () => {};
  if (installations.has(root)) {
    reinitComponent(root);
    return installations.get(root);
  }

  const doc = docOf(root), win = doc.defaultView, controller = new win.AbortController(), signal = controller.signal;
  const on = (node, name, callback, capture = false) => node.addEventListener(name, callback, { signal, capture });

  root.querySelectorAll('[data-s-select-all]').forEach(b => tableSelection(b.closest('table')));
  root.querySelectorAll('[data-s-command]').forEach(filterCommand);
  root.querySelectorAll('.s-tweet-carousel-track').forEach(track => {
    const carousel = track.closest('.s-tweet-carousel');
    const dots = carousel?.querySelectorAll('.s-tweet-dot');
    if (dots && dots.length) {
      track.addEventListener('scroll', () => {
        const slides = track.querySelectorAll('.s-tweet-carousel-slide');
        if (!slides.length) return;
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;
        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
          const diff = Math.abs(trackCenter - slideCenter);
          if (diff < minDiff) { minDiff = diff; closestIdx = i; }
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === closestIdx));
      }, { signal, passive: true });
    }

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
      track.style.cursor = 'grabbing';
      track.style.scrollBehavior = 'auto';
    }, { signal });

    const stopDrag = () => {
      if (isDown) {
        isDown = false;
        track.style.cursor = '';
        track.style.scrollBehavior = 'smooth';
      }
    };
    track.addEventListener('mouseleave', stopDrag, { signal });
    track.addEventListener('mouseup', stopDrag, { signal });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      track.scrollLeft = scrollStart - walk;
    }, { signal });
  });

  root.querySelectorAll('.s-tweet-video').forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  });

  if (win?.IntersectionObserver) {
    const tweetVideoObs = new win.IntersectionObserver(entries => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.muted = true;
          v.play().catch(() => {});
        }
      });
    }, { threshold: 0.1 });
    root.querySelectorAll('.s-tweet-video').forEach(v => tweetVideoObs.observe(v));
  }

  on(root, 'click', event => {
    if (handled.has(event)) return;
    let b;
    if ((b = closest(event, '[data-s-carousel-next]'))) {
      handled.add(event);
      const carousel = b.closest('.s-tweet-carousel');
      const track = carousel?.querySelector('.s-tweet-carousel-track');
      if (track) track.scrollBy({ left: track.clientWidth * 0.85, behavior: 'smooth' });
      return;
    }
    if ((b = closest(event, '[data-s-carousel-prev]'))) {
      handled.add(event);
      const carousel = b.closest('.s-tweet-carousel');
      const track = carousel?.querySelector('.s-tweet-carousel-track');
      if (track) track.scrollBy({ left: -track.clientWidth * 0.85, behavior: 'smooth' });
      return;
    }
    if ((b = closest(event, '.s-tweet-dot'))) {
      handled.add(event);
      const idx = parseInt(b.dataset.index, 10);
      const carousel = b.closest('.s-tweet-carousel');
      const track = carousel?.querySelector('.s-tweet-carousel-track');
      const slides = track?.querySelectorAll('.s-tweet-carousel-slide');
      if (track && slides && slides[idx]) {
        slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      return;
    }
    if ((b = closest(event, '[data-s-theme-toggle]'))) { handled.add(event); setTheme(doc.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', { root: doc.documentElement }); return; }
    if ((b = closest(event, '[data-s-toggle]'))) { handled.add(event); const pressed = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', String(!pressed)); emit(b, 'toggle', { pressed: !pressed }); return; }
    if ((b = closest(event, '[data-s-drawer-open]'))) { handled.add(event); event.preventDefault(); const d = doc.getElementById(b.dataset.sDrawerOpen); openDialog(d, b); return; }
    if ((b = closest(event, '[data-s-popover] button'))) { handled.add(event); const p = b.closest('[data-s-popover]'), content = p?.querySelector('.s-popover-content'); if (content) content.hidden = !content.hidden; return; }
    if ((b = closest(event, '[data-s-dialog-open]'))) { handled.add(event); event.preventDefault(); const d = doc.getElementById(b.dataset.sDialogOpen); openDialog(d, b); if (d?.matches('[data-s-command]')) filterCommand(d); return; }
    if ((b = closest(event, '[data-s-dialog-close]'))) { handled.add(event); closeDialog(b.closest('dialog')); return; }
    if (event.target.matches?.('dialog')) { const d = event.target; if (d.hasAttribute('data-s-static')) return; const r = d.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(d); }
    if ((b = closest(event, '[data-s-alert-close]'))) { handled.add(event); const a = b.closest('.s-alert'); if (a) a.remove(); return; }
    if ((b = closest(event, '[data-s-tabs] [role=tab]'))) { handled.add(event); activateTab(b.closest('[data-s-tabs]'), b); return; }
    if ((b = closest(event, '[data-s-pagination] [data-page]'))) { handled.add(event); if (!b.disabled) paginate(b.closest('[data-s-pagination]'), b.dataset.page); return; }
    if ((b = closest(event, '[data-s-sort]'))) { handled.add(event); sortTable(b); return; }
    if ((b = closest(event, '[data-s-chip-remove]'))) { handled.add(event); const chip = b.closest('.s-chip'), parent = chip.parentElement, label = chip.textContent.trim(), neighbor = chip.nextElementSibling || chip.previousElementSibling; chip.remove(); const focus = neighbor?.querySelector('button') || parent; if (!focus.hasAttribute('tabindex') && focus === parent) focus.tabIndex = -1; focus.focus(); emit(parent, 'chipremove', { label }); return; }
    if ((b = closest(event, '[data-s-menu-trigger]'))) { handled.add(event); setMenu(b.closest('[data-s-menu]'), b.getAttribute('aria-expanded') !== 'true'); return; }
    if ((b = closest(event, '[data-s-menu] [role=menuitem]')) && !b.disabled) { handled.add(event); const menu = b.closest('[data-s-menu]'); setMenu(menu, false, { restore: true }); emit(menu, 'menuaction', { value: b.dataset.value }); return; }
    if ((b = closest(event, '[data-s-command] [role=option]'))) { handled.add(event); chooseCommand(b.closest('[data-s-command]'), b); }
    if ((b = closest(event, '[data-s-confetti]')) && !b.hasAttribute('data-confetti-hover')) {
      handled.add(event);
      const mode = b.dataset.sConfetti || 'basic';
      const colors = ['#ff0055', '#ffcc00', '#33ccff', '#33ff66', '#cc33ff', '#ff6600', '#5B3DF5', '#00E5FF'];
      const emojis = ['🦄', '✨', '🎉', '🚀', '⚡', '💖', '⭐', '🔥'];
      const fireBurst = (originX, originY, count = 35, spreadAngle = null, customType = mode) => {
        const container = doc.createElement('div');
        container.className = 's-confetti-canvas';
        for (let i = 0; i < count; i++) {
          const p = doc.createElement('div');
          const color = colors[i % colors.length];
          const angle = spreadAngle !== null ? (spreadAngle + (Math.random() - 0.5) * 0.9) : (Math.random() * Math.PI * 2);
          const dist = 70 + Math.random() * 160;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist - (spreadAngle !== null ? 60 : 35);
          
          if (customType === 'emoji') {
            p.textContent = emojis[i % emojis.length];
            p.style.cssText = `position:fixed;left:${originX}px;top:${originY}px;font-size:${16 + Math.random() * 10}px;pointer-events:none;transition:all 1s cubic-bezier(0.15,0.85,0.25,1);opacity:1;transform:translate(0,0) scale(1) rotate(0deg);z-index:99999;user-select:none;`;
          } else if (customType === 'stars') {
            p.innerHTML = '★';
            p.style.cssText = `position:fixed;left:${originX}px;top:${originY}px;color:${color};font-size:${14 + Math.random() * 8}px;pointer-events:none;transition:all 0.9s cubic-bezier(0.15,0.85,0.25,1);opacity:1;transform:translate(0,0) scale(1) rotate(0deg);z-index:99999;user-select:none;`;
          } else {
            const isCircle = Math.random() > 0.5;
            p.style.cssText = `position:fixed;left:${originX}px;top:${originY}px;width:${6 + Math.random() * 5}px;height:${6 + Math.random() * 5}px;background:${color};border-radius:${isCircle ? '50%' : '2px'};pointer-events:none;transition:all 0.9s cubic-bezier(0.15,0.85,0.25,1);opacity:1;transform:translate(0,0) scale(1) rotate(0deg);z-index:99999;`;
          }
          container.append(p);
          win.setTimeout(() => {
            p.style.transform = `translate(${dx}px,${dy}px) scale(0.3) rotate(${Math.random() * 720}deg)`;
            p.style.opacity = '0';
          }, 16);
        }
        doc.body.append(container);
        win.setTimeout(() => container.remove(), 1100);
      };
      const rect = b.getBoundingClientRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      if (mode === 'fireworks') {
        fireBurst(bx, by, 35, null, 'basic');
        win.setTimeout(() => fireBurst(bx - 140, by - 70, 30, null, 'basic'), 160);
        win.setTimeout(() => fireBurst(bx + 140, by - 90, 30, null, 'basic'), 320);
      } else if (mode === 'side-cannons') {
        fireBurst(win.innerWidth * 0.08, win.innerHeight * 0.85, 42, -Math.PI / 3, 'basic');
        fireBurst(win.innerWidth * 0.92, win.innerHeight * 0.85, 42, -Math.PI * 2 / 3, 'basic');
      } else if (mode === 'stars') {
        fireBurst(bx, by, 36, null, 'stars');
      } else if (mode === 'emoji') {
        fireBurst(bx, by, 28, null, 'emoji');
      } else {
        fireBurst(bx, by, 45, null, 'basic');
      }
    }
    if ((b = closest(event, '[data-s-cool-mode]'))) {
      handled.add(event);
      const rect = b.getBoundingClientRect();
      const container = doc.createElement('div');
      container.className = 's-cool-mode-canvas';
      for (let i = 0; i < 18; i++) {
        const p = doc.createElement('div');
        const color = ['#5B3DF5', '#178BFF', '#00E5FF', '#A020FF', '#FF3366', '#FFCC00'][i % 6];
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 70;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        p.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top + rect.height / 2}px;width:6px;height:6px;background:${color};border-radius:50%;pointer-events:none;transition:all 0.6s cubic-bezier(0.2,0.8,0.2,1);opacity:1;transform:translate(0,0) scale(1);`;
        container.append(p);
        win.setTimeout(() => {
          p.style.transform = `translate(${dx}px,${dy}px) scale(0)`;
          p.style.opacity = '0';
        }, 16);
      }
      doc.body.append(container);
      win.setTimeout(() => container.remove(), 800);
    }
    if ((b = closest(event, '[data-s-ripple]'))) {
      const rect = b.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      const surf = b.querySelector('.s-ripple-surface') || b;
      const r = doc.createElement('span');
      r.className = 's-ripple-wave';
      r.style.cssText = `left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;`;
      surf.append(r);
      win.setTimeout(() => r.remove(), 700);
    }
    if ((b = closest(event, '[data-s-subscribe-btn]'))) {
      handled.add(event);
      const isSub = b.classList.toggle('s-subscribed');
      b.setAttribute('aria-pressed', String(isSub));
      emit(b, 'subscribechange', { subscribed: isSub });
      return;
    }
    if ((b = closest(event, '[data-s-theme-toggler]'))) {
      handled.add(event);
      const variant = b.dataset.sThemeToggler || 'circle';
      const duration = Number(b.dataset.duration) || 400;
      const rootEl = doc.documentElement;
      const isDark = rootEl.classList.contains('dark') || rootEl.dataset.theme === 'dark';
      const toggleFn = () => {
        const newDark = !isDark;
        rootEl.classList.toggle('dark', newDark);
        setTheme(newDark ? 'dark' : 'light', { root: rootEl });
      };
      if (doc.startViewTransition) {
        const rect = b.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const vw = win.innerWidth, vh = win.innerHeight;
        const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
        
        let startClip = `circle(0% at ${cx}px ${cy}px)`;
        let endClip = `circle(${maxRadius}px at ${cx}px ${cy}px)`;

        if (variant === 'square' || variant === 'rectangle') {
          const s = maxRadius * 1.1;
          startClip = `polygon(${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px)`;
          endClip = `polygon(${cx - s}px ${cy - s}px, ${cx + s}px ${cy - s}px, ${cx + s}px ${cy + s}px, ${cx - s}px ${cy + s}px)`;
        } else if (variant === 'diamond') {
          const s = maxRadius * 1.45;
          startClip = `polygon(${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px)`;
          endClip = `polygon(${cx}px ${cy - s}px, ${cx + s}px ${cy}px, ${cx}px ${cy + s}px, ${cx - s}px ${cy}px)`;
        } else if (variant === 'hexagon') {
          const s = maxRadius * 1.3;
          const verts = [];
          for (let i = 0; i < 6; i++) {
            const a = -Math.PI / 2 + (i * Math.PI) / 3;
            verts.push(`${cx + s * Math.cos(a)}px ${cy + s * Math.sin(a)}px`);
          }
          startClip = `polygon(${Array(6).fill(`${cx}px ${cy}px`).join(', ')})`;
          endClip = `polygon(${verts.join(', ')})`;
        } else if (variant === 'triangle') {
          const s = maxRadius * 2.2;
          const dx = (Math.sqrt(3) / 2) * s;
          startClip = `polygon(${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px)`;
          endClip = `polygon(${cx}px ${cy - s}px, ${cx + dx}px ${cy + 0.5 * s}px, ${cx - dx}px ${cy + 0.5 * s}px)`;
        } else if (variant === 'star') {
          const outer = maxRadius * 1.5, inner = outer * 0.45;
          const verts = [];
          for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? outer : inner;
            const a = -Math.PI / 2 + (i * Math.PI) / 5;
            verts.push(`${cx + r * Math.cos(a)}px ${cy + r * Math.sin(a)}px`);
          }
          startClip = `polygon(${Array(10).fill(`${cx}px ${cy}px`).join(', ')})`;
          endClip = `polygon(${verts.join(', ')})`;
        }

        const transition = doc.startViewTransition(toggleFn);
        transition.ready?.then?.(() => {
          rootEl.animate(
            { clipPath: [startClip, endClip] },
            { duration, easing: variant === 'star' ? 'linear' : 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
          );
        });
      } else {
        toggleFn();
      }
      return;
    }
    if ((b = closest(event, '[data-copy-value]'))) {
      handled.add(event);
      const val = b.dataset.copyValue;
      if (val && win.navigator?.clipboard?.writeText) {
        win.navigator.clipboard.writeText(val).then(() => {
          const orig = b.innerHTML;
          b.innerHTML = '<span style="color:var(--s-status-success-text,#10b981);font-size:10px;font-weight:600;">Copied!</span>';
          win.setTimeout(() => { if (b.isConnected) b.innerHTML = orig; }, 1500);
        }).catch(() => {});
      }
      return;
    }
    if ((b = closest(event, '[data-s-video-open]'))) {
      handled.add(event);
      const dialogId = b.dataset.sVideoOpen;
      const dialog = doc.getElementById(dialogId);
      if (dialog) {
        const iframe = dialog.querySelector('iframe');
        if (iframe && dialog.dataset.videoSrc) iframe.src = dialog.dataset.videoSrc;
        openDialog(dialog, b);
      }
      return;
    }
    if ((b = closest(event, '[data-s-tree-folder]'))) {
      handled.add(event);
      const folder = b.closest('.s-tree-folder');
      if (folder) folder.classList.toggle('s-tree-folder--open');
      return;
    }
    if ((b = closest(event, '[data-s-tree-toggle-all]'))) {
      handled.add(event);
      const tree = b.closest('[data-s-file-tree]');
      if (tree) {
        const folders = tree.querySelectorAll('.s-tree-folder');
        const anyClosed = [...folders].some(f => !f.classList.contains('s-tree-folder--open'));
        folders.forEach(f => f.classList.toggle('s-tree-folder--open', anyClosed));
      }
      return;
    }
  });

  on(root, 'contextmenu', event => {
    const wrap = closest(event, '[data-s-context-menu]');
    if (wrap) {
      event.preventDefault();
      const menuId = wrap.dataset.sContextMenu;
      const menu = doc.getElementById(menuId);
      if (menu) {
        menu.hidden = false;
        menu.style.position = 'fixed';
        menu.style.left = Math.min(event.clientX, win.innerWidth - 180) + 'px';
        menu.style.top = Math.min(event.clientY, win.innerHeight - 200) + 'px';
        menu.style.zIndex = '99999';
      }
    }
  });

  on(root, 'pointerover', event => {
    const hc = closest(event, '[data-s-hover-card]');
    if (hc) {
      const content = hc.querySelector('.s-hover-card-content');
      if (content) content.hidden = false;
    }
    const gridPattern = closest(event, '[data-s-interactive-grid]');
    if (gridPattern) {
      const rect = closest(event, '.s-interactive-grid-rect');
      if (rect) {
        rect.classList.add('s-grid-hovered');
        win.setTimeout(() => rect.classList.remove('s-grid-hovered'), 600);
      }
    }
  });

  on(root, 'pointerout', event => {
    const hc = closest(event, '[data-s-hover-card]');
    if (hc && !hc.contains(event.relatedTarget)) {
      const content = hc.querySelector('.s-hover-card-content');
      if (content) content.hidden = true;
    }
    const card = closest(event, '[data-s-magic-card]');
    if (card && !card.contains(event.relatedTarget)) {
      card.style.setProperty('--mouse-x', '-999px');
      card.style.setProperty('--mouse-y', '-999px');
    }
    const lens = closest(event, '[data-s-lens]');
    if (lens && !lens.contains(event.relatedTarget)) {
      if (lens.dataset.static !== 'true') {
        if (lens.dataset.defaultX !== undefined && lens.dataset.defaultY !== undefined) {
          lens.style.setProperty('--lens-x', `${lens.dataset.defaultX}px`);
          lens.style.setProperty('--lens-y', `${lens.dataset.defaultY}px`);
        } else {
          lens.style.removeProperty('--lens-x');
          lens.style.removeProperty('--lens-y');
        }
        lens.dataset.hover = 'false';
      }
    }
    const ptr = closest(event, '[data-s-pointer]') || closest(event, '.s-custom-pointer-wrap');
    if (ptr && !ptr.contains(event.relatedTarget)) {
      ptr.style.cursor = '';
      const glyph = ptr.querySelector('.s-pointer-glyph');
      if (glyph) { glyph.style.opacity = '0'; }
    }
  });

  on(root, 'pointermove', event => {
    const card = closest(event, '[data-s-magic-card]');
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    }
    const lens = closest(event, '[data-s-lens]');
    if (lens) {
      if (lens.dataset.static !== 'true') {
        const rect = lens.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        lens.style.setProperty('--lens-x', `${x}px`);
        lens.style.setProperty('--lens-y', `${y}px`);
        lens.dataset.hover = 'true';
      }
    }
    const pointer = closest(event, '[data-s-pointer]') || closest(event, '.s-custom-pointer-wrap');
    if (pointer) {
      pointer.style.cursor = 'none';
      const glyph = pointer.querySelector('.s-pointer-glyph');
      if (glyph) {
        const rect = pointer.getBoundingClientRect();
        glyph.style.left = `${event.clientX - rect.left}px`;
        glyph.style.top = `${event.clientY - rect.top}px`;
        glyph.style.opacity = '1';
      }
    }
  });

  on(doc, 'click', event => {
    root.querySelectorAll('[data-s-menu]').forEach(menu => { if (!menu.contains(event.target)) setMenu(menu, false); });
    root.querySelectorAll('.s-context-menu-panel').forEach(menu => { if (!menu.contains(event.target)) menu.hidden = true; });
    root.querySelectorAll('[data-s-popover]').forEach(pop => { if (!pop.contains(event.target)) { const c = pop.querySelector('.s-popover-content'); if (c) c.hidden = true; } });
  });

  let lastScrollY = win.scrollY, scrollVelocity = 1, velocityDecayId;
  const decayVelocity = () => {
    scrollVelocity += (1 - scrollVelocity) * 0.16;
    if (Math.abs(scrollVelocity - 1) > 0.015) {
      root.querySelectorAll('[data-s-scroll-velocity]').forEach(v => {
        v.style.setProperty('--velocity-speed', scrollVelocity.toFixed(2));
      });
      velocityDecayId = win.requestAnimationFrame(decayVelocity);
    } else {
      scrollVelocity = 1;
      root.querySelectorAll('[data-s-scroll-velocity]').forEach(v => { v.style.setProperty('--velocity-speed', '1'); });
    }
  };

  on(win, 'scroll', () => {
    const sp = root.querySelector('[data-s-scroll-progress]');
    if (sp) {
      const total = doc.documentElement.scrollHeight - win.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, win.scrollY / total)) : 0;
      sp.style.width = `${(progress * 100).toFixed(1)}%`;
    }
    const vel = root.querySelectorAll('[data-s-scroll-velocity]');
    if (vel.length) {
      const delta = Math.abs(win.scrollY - lastScrollY);
      lastScrollY = win.scrollY;
      const boost = Math.min(2.5, 1 + delta * 0.015);
      scrollVelocity = Math.max(scrollVelocity, boost);
      vel.forEach(v => { v.style.setProperty('--velocity-speed', scrollVelocity.toFixed(2)); });
      win.cancelAnimationFrame(velocityDecayId);
      velocityDecayId = win.requestAnimationFrame(decayVelocity);
    }
  }, { passive: true });

  // Initialize specialized interactive components
  root.querySelectorAll('canvas[data-s-globe]').forEach(g => initGlobe(g));
  root.querySelectorAll('canvas[data-s-icon-cloud]').forEach(c => initIconCloud(c));
  root.querySelectorAll('[data-s-dock]').forEach(d => initDock(d));
  root.querySelectorAll('[data-s-terminal]').forEach(t => initTerminal(t));
  root.querySelectorAll('[data-s-animated-list]').forEach(l => initAnimatedList(l));
  root.querySelectorAll('[data-s-beam-container], .animated-beam-demo-container').forEach(b => initAnimatedBeam(b));

  root.querySelectorAll('canvas[data-s-flickering], canvas[data-s-flickering-grid]').forEach(g => initFlickeringGrid(g));

  root.querySelectorAll('[data-s-particles]').forEach(container => {
    const canvas = container.querySelector('canvas'); if (!canvas) return;
    const ctx = canvas.getContext?.('2d'); if (!ctx) return;
    const count = Number(container.dataset.sParticles) || 60;
    const color = container.dataset.color || '#5B3DF5';
    let w = canvas.width = container.clientWidth || 300, h = canvas.height = container.clientHeight || 180;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      size: 1.2 + Math.random() * 2.2, alpha: 0.25 + Math.random() * 0.65
    }));
    let mouseX = -1000, mouseY = -1000;
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });
    const render = () => {
      if (!canvas.isConnected) return;
      if (container.clientWidth && (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight)) {
        w = canvas.width = container.clientWidth; h = canvas.height = container.clientHeight;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const dx = p.x - mouseX, dy = p.y - mouseY, dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          const force = (1 - dist / 90) * 2.5;
          p.x += (dx / dist) * force; p.y += (dy / dist) * force;
        }
        ctx.globalAlpha = p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      win.requestAnimationFrame(render);
    };
    render();
  });

  root.querySelectorAll('[data-s-typing]').forEach(el => {
    if (el.closest('.s-terminal, [data-s-terminal]')) return;
    if (el.dataset.typingActive) return;
    el.dataset.typingActive = 'true';
    let fullText = el.dataset.sTyping || el.dataset.text || '';
    if (!fullText) {
      const textSpan = el.querySelector('.s-typing-text');
      fullText = textSpan ? textSpan.textContent : el.textContent;
    }
    fullText = String(fullText || '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').trim();
    const duration = Number(el.dataset.duration) || 80;
    const delay = Number(el.dataset.delay) || 300;

    let textSpan = el.querySelector('.s-typing-text');
    let cursor = el.querySelector('.s-typing-cursor');
    if (!textSpan) {
      el.innerHTML = '<span class="s-typing-text"></span><span class="s-typing-cursor" aria-hidden="true"></span>';
      textSpan = el.querySelector('.s-typing-text');
      cursor = el.querySelector('.s-typing-cursor');
    } else {
      textSpan.textContent = '';
    }

    let charIdx = 0, isDeleting = false;
    const tick = () => {
      if (!el.isConnected) return;
      if (!isDeleting) {
        charIdx++;
        textSpan.textContent = fullText.slice(0, charIdx);
        if (charIdx >= fullText.length) {
          isDeleting = true;
          win.setTimeout(tick, 2200);
          return;
        }
        win.setTimeout(tick, duration);
      } else {
        charIdx--;
        textSpan.textContent = fullText.slice(0, charIdx);
        if (charIdx <= 0) {
          isDeleting = false;
          win.setTimeout(tick, 600);
          return;
        }
        win.setTimeout(tick, Math.max(30, duration / 2));
      }
    };
    win.setTimeout(tick, delay);
  });

  root.querySelectorAll('[data-s-word-rotate]').forEach(el => {
    if (el.dataset.rotateActive) return;
    el.dataset.rotateActive = 'true';
    let words = [];
    try { words = JSON.parse(el.dataset.sWordRotate || '[]'); } catch {}
    if (!words.length) return;
    const duration = Number(el.dataset.duration) || 2500;
    let idx = 0;
    const interval = win.setInterval(() => {
      if (!el.isConnected) { win.clearInterval(interval); return; }
      idx = (idx + 1) % words.length;
      const item = doc.createElement('span');
      item.className = 's-word-rotate-item';
      item.textContent = words[idx];
      el.replaceChildren(item);
    }, duration);
  });

  root.querySelectorAll('[data-s-morphing-text]').forEach(el => {
    if (el.dataset.morphActive === 'true') return;
    el.dataset.morphActive = 'true';
    let texts = [];
    try { texts = JSON.parse(el.dataset.sMorphingText || '[]'); } catch {}
    if (!texts.length) texts = ['Hello', 'Morphing', 'Text', 'Animation', 'Smooth', 'Transition'];

    let text1 = el.querySelector('.s-morph-text-1');
    let text2 = el.querySelector('.s-morph-text-2');
    if (!text1) {
      text1 = doc.createElement('span');
      text1.className = 's-morph-text-1';
      el.appendChild(text1);
    }
    if (!text2) {
      text2 = doc.createElement('span');
      text2.className = 's-morph-text-2';
      el.appendChild(text2);
    }

    const morphTime = 1.5;
    const cooldownTime = 0.5;
    let textIndex = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let lastTime = new Date();

    function setStyles(fraction) {
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      text1.textContent = texts[textIndex % texts.length];
      text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setStyles(fraction);
      if (fraction === 1) {
        textIndex++;
      }
    }

    function doCooldown() {
      morph = 0;
      text2.style.filter = 'none';
      text2.style.opacity = '100%';
      text1.style.filter = 'none';
      text1.style.opacity = '0%';
    }

    let animId = null;
    function animate() {
      if (!el.isConnected) { cancelAnimationFrame(animId); return; }
      animId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - lastTime.getTime()) / 1000;
      lastTime = newTime;
      cooldown -= dt;
      if (cooldown <= 0) doMorph();
      else doCooldown();
    }
    animate();
  });

  // DiaTextReveal dynamic gradient sweep
  root.querySelectorAll('[data-s-dia-reveal]').forEach(el => {
    if (el.dataset.diaInitialized === 'true') return;
    el.dataset.diaInitialized = 'true';
    let texts = [];
    try { texts = JSON.parse(el.dataset.sDiaReveal || '[]'); } catch {}
    if (!texts.length) texts = [el.textContent || 'Magic UI'];
    const colors = (el.dataset.colors || '#c679c4,#fa3d1d,#ffb005,#e1e1fe,#0358f7').split(',');
    const duration = Number(el.dataset.duration) || 1.8;
    const repeat = el.dataset.repeat !== 'false';
    let activeIdx = 0;
    const BAND_HALF = 17;
    const SWEEP_START = -BAND_HALF;
    const SWEEP_END = 100 + BAND_HALF;

    function buildGradient(pos, textColor) {
      const bandStart = pos - BAND_HALF;
      const bandEnd = pos + BAND_HALF;
      if (bandStart >= 100) return `linear-gradient(90deg, ${textColor}, ${textColor})`;
      const n = colors.length;
      const parts = [];
      if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
      colors.forEach((c, i) => {
        const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
        parts.push(`${c} ${pct.toFixed(2)}%`);
      });
      if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);
      return `linear-gradient(90deg, ${parts.join(', ')})`;
    }

    const textColor = 'var(--s-text-primary, #ffffff)';
    let startTime = null;
    function frame(timestamp) {
      if (!el.isConnected) return;
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const t = Math.min(1, elapsed / duration);
      const easedT = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      const pos = SWEEP_START + (SWEEP_END - SWEEP_START) * easedT;
      el.style.backgroundImage = buildGradient(pos, textColor);

      if (t < 1) {
        win.requestAnimationFrame(frame);
      } else if (repeat) {
        win.setTimeout(() => {
          activeIdx = (activeIdx + 1) % texts.length;
          el.textContent = texts[activeIdx];
          startTime = null;
          win.requestAnimationFrame(frame);
        }, 800);
      }
    }
    win.requestAnimationFrame(frame);
  });

  on(root, 'keydown', event => {
    const dialog = closest(event, 'dialog[open]');
    if (dialog && event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button,input,select,textarea,a[href],[tabindex],[contenteditable="true"]')].filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length && win.getComputedStyle(el).visibility !== 'hidden' && !el.closest('[inert]'));
      const first = focusable[0], last = focusable.at(-1);
      if (first && ((event.shiftKey && doc.activeElement === first) || (!event.shiftKey && doc.activeElement === last))) { event.preventDefault(); (event.shiftKey ? last : first).focus(); return; }
    }
    const tab = closest(event, '[data-s-tabs] [role=tab]');
    if (tab && ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault(); const group = tab.closest('[data-s-tabs]'), tabs = [...group.querySelectorAll('[role=tab]:not(:disabled)')].filter(t => t.closest('[data-s-tabs]') === group), rtl = win.getComputedStyle(group).direction === 'rtl'; let i = tabs.indexOf(tab);
      i = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? (rtl ? -1 : 1) : (rtl ? 1 : -1)) + tabs.length) % tabs.length; activateTab(group, tabs[i]); return;
    }
    const menu = closest(event, '[data-s-menu]');
    if (menu) {
      if (closest(event, '[data-s-menu-trigger]') && ['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); setMenu(menu, true, { last: event.key === 'ArrowUp' }); return; }
      if (closest(event, '[role=menu]')) {
        const items = [...menu.querySelectorAll('[role=menuitem]:not(:disabled)')], i = items.indexOf(closest(event, '[role=menuitem]'));
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) { event.preventDefault(); items[event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (i + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus(); return; }
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setMenu(menu, false, { restore: true }); return; }
        if (event.key === 'Tab') win.setTimeout(() => setMenu(menu, false), 0);
      }
    }
    const input = closest(event, '[data-s-command-input]');
    if (input) { const d = input.closest('dialog'), list = options(d), i = list.findIndex(o => o.getAttribute('aria-selected') === 'true'); if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeDialog(d); return; } if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); selectCommand(d, i + (event.key === 'ArrowDown' ? 1 : -1)); return; } if (event.key === 'Enter') { event.preventDefault(); chooseCommand(d, list[Math.max(0, i)]); return; } }
    if (event.key === 'Escape') {
      const tip = closest(event, '[data-s-tooltip]'); if (tip) tip.dataset.dismissed = 'true';
      root.querySelectorAll('.s-context-menu-panel').forEach(menu => { menu.hidden = true; });
    }
  });

  on(root, 'input', event => { const e = event.target; if (e.matches('[data-s-slider]')) { const out = e.closest('.s-slider-field')?.querySelector('output'); if (out) out.value = e.value; } if (e.matches('[data-s-command-input]')) filterCommand(e.closest('dialog')); });
  on(root, 'change', event => { const e = event.target; if (e.matches('[data-s-select-all]')) { const table = e.closest('table'); table.querySelectorAll('[data-s-row-select]:not(:disabled)').forEach(b => { b.checked = e.checked; }); tableSelection(table); } else if (e.matches('[data-s-row-select]')) tableSelection(e.closest('table')); });

  const positionTooltip = tip => {
    const bubble = tip.querySelector('[role=tooltip]'); if (!bubble) return;
    bubble.style.setProperty('--s-tooltip-shift', '0px'); const rect = bubble.getBoundingClientRect();
    const shift = rect.left < 12 ? 12 - rect.left : rect.right > win.innerWidth - 12 ? win.innerWidth - 12 - rect.right : 0;
    bubble.style.setProperty('--s-tooltip-shift', shift + 'px');
  };

  for (const type of ['focusin', 'pointerover']) on(root, type, event => { const tip = closest(event, '[data-s-tooltip]'); if (tip && !tip.contains(event.relatedTarget)) { delete tip.dataset.dismissed; positionTooltip(tip); } });
  on(win, 'resize', () => root.querySelectorAll('[data-s-tooltip]:hover,[data-s-tooltip]:focus-within').forEach(positionTooltip));
  on(root, 'close', event => { const d = event.target; if (!d.matches?.('dialog')) return; const trigger = dialogTriggers.get(d); if (trigger?.isConnected && trigger.getClientRects().length) trigger.focus({ preventScroll: true }); dialogTriggers.delete(d); }, true);
  on(win.matchMedia('(prefers-color-scheme: dark)'), 'change', () => { if (doc.documentElement.dataset.themePreference === 'system') setTheme('system', { root: doc.documentElement, persist: false }); });

  if (win?.IntersectionObserver) {
    const tickerObserver = new win.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initNumberTicker(entry.target);
          tickerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    root.querySelectorAll('[data-s-number-ticker]').forEach(el => tickerObserver.observe(el));
  }

  reinitComponent(root);

  const dispose = () => { controller.abort(); root.querySelectorAll('[data-s-menu]').forEach(m => setMenu(m, false)); installations.delete(root); };
  installations.set(root, dispose);
  return dispose;
}

export function toast(description, { title = 'Saved successfully', tone = 'success', duration = 6000, document: doc = globalThis.document } = {}) {
  if (!doc) return () => {};
  let region = doc.querySelector('[data-s-toast-region]');
  if (!region) { region = doc.createElement('div'); region.className = 's-toast-region'; region.dataset.sToastRegion = ''; region.setAttribute('role', 'status'); region.setAttribute('aria-live', 'polite'); region.setAttribute('aria-relevant', 'additions'); doc.body.append(region); }
  const template = doc.createElement('template'); template.innerHTML = render(Toast({ title, description, tone })); const node = template.content.firstElementChild, previous = doc.activeElement; region.append(node);
  const controller = new doc.defaultView.AbortController(); let timer;
  const dismiss = () => { clearTimeout(timer); controller.abort(); if (node.contains(doc.activeElement) && previous?.isConnected) previous.focus(); node.remove(); };
  const pause = () => clearTimeout(timer), start = () => { pause(); if (node.isConnected && duration > 0 && !node.matches(':hover,:focus-within')) timer = setTimeout(dismiss, duration); };
  for (const name of ['pointerenter', 'focusin']) node.addEventListener(name, pause, { signal: controller.signal });
  for (const name of ['pointerleave', 'focusout']) node.addEventListener(name, () => setTimeout(start, 0), { signal: controller.signal });
  node.querySelector('[data-s-toast-close]').addEventListener('click', dismiss, { signal: controller.signal }); start(); return dismiss;
}

export async function copyText(value, doc = globalThis.document) {
  if (!doc) throw new Error('A document is required.');
  try { if (doc.defaultView.navigator.clipboard?.writeText) { await doc.defaultView.navigator.clipboard.writeText(String(value)); return true; } } catch {}
  const before = doc.activeElement, area = doc.createElement('textarea'); area.value = String(value); area.className = 's-sr-only'; area.setAttribute('aria-hidden', 'true'); doc.body.append(area); area.select(); let ok;
  try { ok = doc.execCommand('copy'); } finally { area.remove(); before?.focus(); }
  if (!ok) throw new Error('Select the code and copy it manually.'); return true;
}
