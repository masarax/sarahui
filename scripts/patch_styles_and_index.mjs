import fs from 'fs';

// 1. Patch packages/ui/src/styles.css
const css = fs.readFileSync('./packages/ui/src/styles.css', 'utf8');

const additions = `
/* ========================================================================== */
/* Hero Background Typography & MagicUI Parity Styles                        */
/* ========================================================================== */

.s-hero-bg-text {
  pointer-events: none;
  background: linear-gradient(180deg, var(--s-text-primary, #0f172a) 0%, rgba(15, 23, 42, 0.25) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.04em;
  white-space: pre-wrap;
  user-select: none;
  display: block;
  width: 100%;
}
:root[data-theme="dark"] .s-hero-bg-text {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.15) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Dock Parity */
.s-dock-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 220px;
  overflow: hidden;
}
.s-dock {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 58px;
  padding: 0 12px;
  border-radius: 20px;
  background: var(--s-bg-surface);
  border: 1px solid var(--s-border-default);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: none !important;
  position: relative;
  z-index: 10;
}
.s-dock-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--dock-size, 40px);
  height: var(--dock-size, 40px);
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  background: transparent;
  border: none;
  color: var(--s-text-primary);
  cursor: pointer;
  transition: width 0.15s cubic-bezier(0.2, 0, 0, 1), height 0.15s cubic-bezier(0.2, 0, 0, 1), transform 0.15s cubic-bezier(0.2, 0, 0, 1), background-color 0.15s ease;
  padding: 0;
  text-decoration: none;
}
.s-dock-icon:hover {
  background: var(--s-bg-subtle);
}
.s-dock-separator {
  width: 1px;
  height: 28px;
  background: var(--s-border-default);
  margin: 0 4px;
}

/* Animated List Entrance Animation */
.s-animated-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
}
.s-animated-list-item {
  width: 100%;
  animation: s-anim-list-enter 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  transform-origin: top center;
  will-change: transform, opacity, max-height;
}
@keyframes s-anim-list-enter {
  0% {
    opacity: 0;
    transform: scale(0);
    max-height: 0;
    margin-bottom: -12px;
  }
  100% {
    opacity: 1;
    transform: scale(1);
    max-height: 120px;
    margin-bottom: 0;
  }
}
.s-anim-list-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--s-bg-surface);
  border: 1px solid var(--s-border-default);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: transform 0.2s ease, border-color 0.2s ease;
  box-shadow: none !important;
}
.s-anim-list-card:hover {
  transform: scale(1.02);
  border-color: var(--s-border-strong);
}

/* Interactive Hover Button */
.s-interactive-hover-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid var(--s-border-default);
  background: var(--s-bg-surface);
  color: var(--s-text-primary);
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease, border-color 0.3s ease;
  box-shadow: none !important;
  text-decoration: none;
}
.s-interactive-hover-button .s-ihb-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--s-brand-blue, #5B3DF5);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.s-interactive-hover-button .s-ihb-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.s-interactive-hover-button .s-ihb-arrow {
  position: absolute;
  right: 18px;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.s-interactive-hover-button:hover {
  background: var(--s-brand-blue, #5B3DF5);
  color: #ffffff;
  border-color: var(--s-brand-blue, #5B3DF5);
}
.s-interactive-hover-button:hover .s-ihb-dot {
  transform: scale(35);
  background: var(--s-brand-blue, #5B3DF5);
}
.s-interactive-hover-button:hover .s-ihb-text {
  transform: translateX(-10px);
}
.s-interactive-hover-button:hover .s-ihb-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Warp Background */
.s-warp-background {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 420px;
  overflow: hidden;
  perspective: 400px;
  border-radius: 16px;
  background: var(--s-bg-canvas);
  border: 1px solid var(--s-border-default);
}
.s-warp-grid-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform-style: preserve-3d;
}
.s-warp-grid-top {
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background-image: linear-gradient(to right, var(--s-border-default) 1px, transparent 1px), linear-gradient(to bottom, var(--s-border-default) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: rotateX(75deg);
  transform-origin: top center;
  animation: s-warp-scroll-top 2s linear infinite;
  mask-image: linear-gradient(to bottom, black 20%, transparent 90%);
  -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 90%);
}
.s-warp-grid-bottom {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background-image: linear-gradient(to right, var(--s-border-default) 1px, transparent 1px), linear-gradient(to bottom, var(--s-border-default) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: rotateX(-75deg);
  transform-origin: bottom center;
  animation: s-warp-scroll-bottom 2s linear infinite;
  mask-image: linear-gradient(to top, black 20%, transparent 90%);
  -webkit-mask-image: linear-gradient(to top, black 20%, transparent 90%);
}
@keyframes s-warp-scroll-top {
  0% { transform: rotateX(75deg) translateY(0); }
  100% { transform: rotateX(75deg) translateY(40px); }
}
@keyframes s-warp-scroll-bottom {
  0% { transform: rotateX(-75deg) translateY(0); }
  100% { transform: rotateX(-75deg) translateY(-40px); }
}

/* Cool Mode Particle */
.s-cool-particle {
  position: fixed;
  font-size: 20px;
  pointer-events: none;
  z-index: 99999;
  animation: s-cool-float 0.8s ease-out forwards;
}
@keyframes s-cool-float {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx, 0px), var(--dy, -80px)) scale(0.3);
    opacity: 0;
  }
}

/* Ripple Button Wave */
.s-ripple-wave {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: s-ripple-expand 0.6s ease-out forwards;
  pointer-events: none;
}
@keyframes s-ripple-expand {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
`;

if (!css.includes('.s-hero-bg-text')) {
  fs.writeFileSync('./packages/ui/src/styles.css', css + '\n' + additions, 'utf8');
  console.log('Appended styles to packages/ui/src/styles.css');
} else {
  console.log('Styles already present in packages/ui/src/styles.css');
}

