import { Markup, raw } from './raw.js';

export const escapeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

export const render = value => value instanceof Markup
  ? value.value
  : Array.isArray(value)
    ? value.map(render).join('')
    : escapeText(value);

export function safeHref(value = '#') {
  const text = String(value).trim();
  try {
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(text, 'https://sarahui.invalid/').protocol) ? text : '#';
  } catch {
    return '#';
  }
}

let counter = 0;
export const uid = (name, id) => id || 's-' + name + '-' + (++counter);
export const choice = (v, options, fallback) => options.includes(v) ? v : fallback;

export const formatComponentName = (name) => {
  if (!name) return '';
  const customMap = {
    Floating3DParticles: 'Floating 3D Particles',
    Text3DFlip: 'Text 3D Flip',
    TweetCard: 'Tweet Card',
    IconCloud: 'Icon Cloud',
    DottedMap: 'Dotted Map',
    BentoGrid: 'Bento Grid',
    BentoCard: 'Bento Card',
    BorderBeam: 'Border Beam',
    ShineBorder: 'Shine Border',
    RetroGrid: 'Retro Grid',
    MagicCard: 'Magic Card',
    BlurFade: 'Blur Fade',
    WordRotate: 'Word Rotate',
    TypingAnimation: 'Typing Animation',
    NumberTicker: 'Number Ticker',
    AnimatedShinyText: 'Animated Shiny Text',
    ShimmerButton: 'Shimmer Button',
    RainbowButton: 'Rainbow Button',
    AvatarCircles: 'Avatar Circles',
    AnimatedBeam: 'Animated Beam',
    AnimatedSpan: 'Animated Span',
    OrbitingCircles: 'Orbiting Circles',
    AnimatedList: 'Animated List',
    InteractiveHoverButton: 'Interactive Hover Button',
    PulsatingButton: 'Pulsating Button',
    SparklesText: 'Sparkles Text',
    TextReveal: 'Text Reveal',
    GridPattern: 'Grid Pattern',
    DotPattern: 'Dot Pattern',
    AnimatedGridPattern: 'Animated Grid Pattern',
    FlickeringGrid: 'Flickering Grid',
    WarpBackground: 'Warp Background',
    NeonGradientCard: 'Neon Gradient Card',
    CoolMode: 'Cool Mode',
    ScrollProgress: 'Scroll Progress',
    ProgressiveBlur: 'Progressive Blur',
    HyperText: 'Hyper Text',
    MorphingText: 'Morphing Text',
    AnimatedGradientText: 'Animated Gradient Text',
    LineShadowText: 'Line Shadow Text',
    AuroraText: 'Aurora Text',
    ContextMenu: 'Context Menu',
    HoverCard: 'Hover Card',
    GlareHover: 'Glare Hover',
    LightRays: 'Light Rays',
    AnimatedThemeToggler: 'Animated Theme Toggler',
    ComicText: 'Comic Text',
    KineticText: 'Kinetic Text',
    DiaTextReveal: 'Dia Text Reveal',
    SpinningText: 'Spinning Text',
    TextAnimate: 'Text Animate',
    VideoText: 'Video Text',
    ScrollBasedVelocity: 'Scroll Based Velocity',
    AnimatedSubscribeButton: 'Animated Subscribe Button',
    ShinyButton: 'Shiny Button',
    RippleButton: 'Ripple Button',
    CodeComparison: 'Code Comparison',
    FileTree: 'File Tree',
    HeroVideoDialog: 'Hero Video Dialog',
    PixelImage: 'Pixel Image',
    GlyphMatrix: 'Glyph Matrix',
    SmoothCursor: 'Smooth Cursor',
    AnimatedCircularProgressBar: 'Animated Circular Progress Bar',
    HexagonPattern: 'Hexagon Pattern',
    StripedPattern: 'Striped Pattern',
    InteractiveGridPattern: 'Interactive Grid Pattern',
    NoiseTexture: 'Noise Texture',
    IconButton: 'Icon Button',
    ButtonGroup: 'Button Group',
    CommandPalette: 'Command Palette',
    EmptyState: 'Empty State',
    NavItem: 'Nav Item',
    DataTable: 'Data Table',
    ToggleGroup: 'Toggle Group',
    AspectRatio: 'Aspect Ratio'
  };
  if (customMap[name]) return customMap[name];
  return String(name)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim();
};
