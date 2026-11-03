import { readFileSync } from 'fs';
import * as U from '../packages/ui/src/templates.js';

const catContent = readFileSync('apps/docs/catalog.mjs', 'utf8');

const targets = [
  'AnimatedList', 'Dock', 'Globe', 'OrbitingCircles', 'Pointer', 'SmoothCursor',
  'DottedMap', 'AnimatedBeam', 'MagicCard', 'GlareHover', 'Meteors', 'Confetti',
  'Particles', 'AnimatedThemeToggler', 'BlurFade', 'VideoText', 'NumberTicker',
  'TextReveal', 'DiaTextReveal', 'HyperText', 'MorphingText', 'Highlighter',
  'Text3DFlip', 'Safari', 'Iphone', 'Android', 'RippleButton', 'FlickeringGrid',
  'AnimatedGridPattern', 'RetroGrid', 'Ripple', 'DotPattern', 'GridPattern',
  'HexagonPattern', 'StripedPattern', 'InteractiveGridPattern', 'NoiseTexture',
  'Floating3DParticles', 'ShinyButton', 'FileTree', 'CodeComparison', 'ScrollProgress',
  'KineticText', 'CoolMode', 'WarpBackground', 'AnimatedCircularProgressBar',
  'Backlight', 'GlyphMatrix'
];

for (const t of targets) {
  const match = catContent.match(new RegExp(`(?:^|\\n)\\s*${t}:\\s*\\(?\\)\\s*=>\\s*([\\s\\S]*?)(?:,\\r?\\n\\s*[A-Z]|,\\r?\\n\\s*\\};)`));
  if (match) {
    console.log(`=== ${t} ===`);
    console.log(match[0].slice(0, 300) + '...\n');
  } else {
    console.log(`=== ${t} NOT FOUND IN DEMOS ===`);
  }
}

