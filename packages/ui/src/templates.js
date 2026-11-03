/**
 * Native HTML templates. Interpolated strings are escaped; compose markup with
 * html tagged templates. Never put untrusted values in literal markup.
 */
export const escapeText = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class Markup { constructor(value){this.value=value;} toString(){return this.value;} }
export const raw = value => new Markup(value);
export const render = value => value instanceof Markup?value.value:Array.isArray(value)?value.map(render).join(''):escapeText(value);
export const html = (parts,...values) => raw(parts.reduce((s,p,i)=>s+p+(i<values.length?render(values[i]):''),''));
export function safeHref(value='#') {
  const text=String(value).trim();
  try{return ['http:','https:','mailto:','tel:'].includes(new URL(text,'https://sarahui.invalid/').protocol)?text:'#';}catch{return '#';}
}
const allowed = new Set('id class name title type value placeholder required disabled checked min max step autocomplete rows role tabindex href download target rel selected hidden open multiple pattern minlength maxlength form inputmode readonly for autofocus cols wrap dir lang accept list size'.split(' '));
export function attributes(props={}) {
  return Object.entries(props).map(([key,value])=>{
    if((!allowed.has(key)&&!/^(aria|data)-[a-z0-9-]+$/.test(key))||value==null||(value===false&&!key.startsWith('aria-')))return '';
    if(key==='href')value=safeHref(value);
    return value===true&&!key.startsWith('aria-')?' '+key:' '+key+'="'+escapeText(value)+'"';
  }).join('');
}
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
let counter=0;
const uid=(name,id)=>id||'s-'+name+'-'+(++counter);
const choice=(v,options,fallback)=>options.includes(v)?v:fallback;
export const ICONS={
  arrow:'M5 12h14m-6-6 6 6-6 6',chevron:'m8 4 8 8-8 8',down:'m5 9 7 7 7-7',check:'m4 12 5 5L20 6',plus:'M12 5v14M5 12h14',close:'m6 6 12 12M18 6 6 18',
  search:'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.7-1.8L21 21',
  moon:'M20.5 14A8.6 8.6 0 0 1 10 3.5 8.6 8.6 0 1 0 20.5 14Z',sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',layers:'m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5m-18 5 9 5 9-5',type:'M3 5h18M12 5v15M8 20h8',
  palette:'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3.1A9 9 0 0 0 12 3ZM7 10h.01M10 6.5h.01M15 6.5h.01M18 10h.01',
  code:'m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',copy:'M9 8h12v13H9Zm-6 8V3h12',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  globe:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  shield:'m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-5 9 3 3 7-7',spark:'m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z',
  settings:'M4 6h16M4 18h16M8 3v6m8 6v6M4 12h16M15 9v6',menu:'M4 6h16M4 12h16M4 18h16',mail:'M3 5h18v14H3Zm0 0 9 8 9-8',
  info:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v6M12 7h.01',alert:'m12 3 10 18H2Zm0 6v5m0 3h.01',
  bell:'M5 17h14l-2-3V9a5 5 0 0 0-10 0v5Zm5 3h4',folder:'M3 6h7l2 3h9v12H3Zm0 0V3h7l2 3h9v3',
  link:'m9 15 6-6M7 13l-2 2a3.5 3.5 0 0 0 5 5l3-3m-2-10 2-2a3.5 3.5 0 0 1 5 5l-3 3',heart:'M12 21 3.5 12.5a5.3 5.3 0 0 1 7.5-7.5l1 1 1-1a5.3 5.3 0 0 1 7.5 7.5Z',
  more:'M5 12h.01M12 12h.01M19 12h.01',user:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21v-3a8 8 0 0 1 16 0v3',calendar:'M4 5h16v16H4ZM8 2v6m8-6v6M4 11h16',trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v6l4 2',
  refresh:'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5',
  cpu:'M4 4h16v16H4V4zm5-4v4m6-4v4M9 20v4m6-4v4M0 9h4m-4 6h4M20 9h4m-4 6h4M9 9h6v6H9V9z',
  database:'M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 5c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 5c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3z',
  cloud:'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
  lock:'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  zap:'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  compass:'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.83 5.17 1.41 1.41-3.54 8.49-8.49 3.54 3.54-8.49 7.08-4.95z',
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  pencil:'<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m15 5 4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  github:'<path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"/>',
  linkedin:'<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  x:'<path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>',
  youtube:'<path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  drive:'<g><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></g>',
  notion:'<g><path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#ffffff"/><path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#000000" fill-rule="evenodd" clip-rule="evenodd"/></g>',
  whatsapp:'<g><path d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z" fill="#25D366"/><path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z" fill="#25D366"/><path d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" fill="#ffffff" fill-rule="evenodd"/></g>',
  openai:'<path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>',
  play:'M5 3l14 9-14 9V3z',
  pause:'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
  figma:'<path fill="currentColor" d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-6 6a3 3 0 0 1 3-3h3v3a3 3 0 0 1-6 0Zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Zm6-3h3a3 3 0 1 1 0 6h-3V3Z"/>',
  docs:'<g fill="none" fill-rule="evenodd"><path d="M29.375 0H4.406C1.983 0 0 1.994 0 4.432v56.136C0 63.006 1.983 65 4.406 65h38.188C45.017 65 47 63.006 47 60.568V17.727L29.375 0z" fill="#4285F4"/><path d="M29.375 0v13.295c0 2.449 1.972 4.432 4.406 4.432H47L29.375 0z" fill="#A1C2FA"/><path d="M11.75 47.273h23.5v-2.955h-23.5v2.955zm0 5.909h17.625v-2.955H11.75v2.955zm0-20.682v2.955h23.5V32.5h-23.5zm0 8.864h23.5v-2.955h-23.5v2.955z" fill="#F1F1F1"/></g>',
  zapier:'<path d="M13.5 2L3 14.5h7.5L9.5 22 21 9.5h-7.5L13.5 2z" fill="#FF4F00"/>',
  messenger:'<g><path d="M24 4C12.95 4 4 12.73 4 23.5c0 5.61 2.425 10.665 6.319 14.224v4.025c0 1.264 1.33 2.086 2.46 1.521l4.425-2.206c2.09.507 4.31.786 6.796.786 11.05 0 20-8.73 20-19.5S35.05 4 24 4z" fill="#0084FF"/><path d="M34.394 18.501l-5.7 4.22c-.61.46-1.44.46-2.04.01L22.68 19.74c-1.68-1.25-4.06-.82-5.19.94l-1.21 1.89-4.11 6.68c-.6.94.55 2.01 1.44 1.34l5.7-4.22c.61-.46 1.44-.46 2.04-.01l3.974 2.991c1.68 1.25 4.06.82 5.19-.94l1.21-1.89 4.11-6.68c.44-.68-.71-1.75-1.44-1.34z" fill="#ffffff"/></g>',
  slack:'<g fill="none"><path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A"/><path d="M9 6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-2a2 2 0 0 1-2-2zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0"/><path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" fill="#2EB67D"/><path d="M15 18a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2a2 2 0 0 1 2 2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E"/></g>',
  stripe:'<path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.652.71 15.027 0 12.062 0 6.136 0 2.115 3.09 2.115 8.08c0 5.496 4.707 7.028 8.016 8.28 2.378.898 3.197 1.637 3.197 2.66 0 .973-.83 1.488-2.228 1.488-2.316 0-5.18-1.12-7.078-2.274l-.92 5.564C5.074 24.814 8.232 25.6 11.449 25.6c6.19 0 10.436-3.037 10.436-8.236 0-5.263-4.492-7.01-7.909-8.214z" fill="#635BFF"/>',
  discord:'<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>'
};
export function Icon({name='spark',size=20,label=''}={}) {
  const n = Math.max(12, Math.min(64, Number(size) || 20));
  const rawName = String(name || 'spark').replace(/^Icons\./, '').trim();
  const normalized = rawName.toLowerCase().replace(/[-_]/g, '');
  
  let key = rawName;
  if (Object.hasOwn(ICONS, rawName)) {
    key = rawName;
  } else if (Object.hasOwn(ICONS, normalized)) {
    key = normalized;
  } else if (normalized === 'googledrive' || normalized === 'gdrive') {
    key = 'drive';
  } else if (normalized === 'googledocs' || normalized === 'gdocs') {
    key = 'docs';
  } else if (normalized === 'zapier') {
    key = 'zapier';
  } else if (normalized === 'messenger') {
    key = 'messenger';
  } else if (normalized === 'slack') {
    key = 'slack';
  } else if (normalized === 'stripe') {
    key = 'stripe';
  } else if (normalized === 'discord') {
    key = 'discord';
  } else if (normalized === 'github') {
    key = 'github';
  } else if (normalized === 'openai') {
    key = 'openai';
  } else if (normalized === 'whatsapp') {
    key = 'whatsapp';
  } else if (normalized === 'notion') {
    key = 'notion';
  } else if (normalized === 'linkedin') {
    key = 'linkedin';
  } else if (normalized === 'youtube') {
    key = 'youtube';
  } else if (normalized === 'figma') {
    key = 'figma';
  } else {
    key = Object.hasOwn(ICONS, rawName) ? rawName : 'spark';
  }

  const entry = Object.hasOwn(ICONS, key) ? ICONS[key] : ICONS.spark;
  const labelAttr = label ? ` role="img" aria-label="${escapeText(label)}"` : ' aria-hidden="true"';
  let viewBox = '0 0 24 24';
  if (key === 'drive') viewBox = '0 0 87.3 78';
  else if (key === 'whatsapp') viewBox = '0 0 175.216 175.552';
  else if (key === 'notion') viewBox = '0 0 100 100';
  else if (key === 'github') viewBox = '0 0 438.549 438.549';
  else if (key === 'docs' || key === 'googledocs') viewBox = '0 0 47 65';
  else if (key === 'messenger') viewBox = '0 0 48 48';
  if (typeof entry === 'string' && (entry.startsWith('<') || entry.includes('<path') || entry.includes('<rect') || entry.includes('<polyline') || entry.includes('<g'))) {
    return raw(`<svg class="s-icon" width="${n}" height="${n}" viewBox="${viewBox}" ${labelAttr}>${entry}</svg>`);
  }
  return raw(`<svg class="s-icon" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"${labelAttr}><path d="${entry}"/></svg>`);
}

export const Icons = new Proxy({}, {
  get: (_, prop) => (props = {}) => Icon({ name: String(prop), ...props })
});
export function Logo({compact=false}={}) {return raw('<span class="s-logo"><svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#5B3DF5"/><path d="M28 11H18a6 6 0 0 0 0 12h4a3 3 0 0 1 0 6H12M12 29h10a6 6 0 0 0 0-12h-4a3 3 0 0 1 0-6h10" stroke="white" stroke-width="3.6" stroke-linecap="round"/></svg>'+(compact?'':'<span>sarah<span class="s-text-brand">UI</span></span>')+'</span>');}
export function Spinner({label='Loading',decorative=false}={}) {return raw('<span class="s-spinner"'+(decorative?' aria-hidden="true"':' role="status" aria-label="'+escapeText(label)+'"')+'></span>');}
export function Button({label='Continue',variant='primary',size='md',icon='',trailing='',disabled=false,loading=false,attrs={},className=''}={}) {
  return raw('<button'+attributes({type:'button',...attrs,class:'s-button s-button--'+choice(variant,['primary','secondary','outline','ghost','danger'],'primary')+' s-button--'+choice(size,['sm','md','lg'],'md')+' '+className,disabled:disabled||loading,'aria-busy':loading?'true':null})+'>'+(loading?render(Spinner({decorative:true})):icon?render(Icon({name:icon})): '')+'<span>'+escapeText(label)+'</span>'+(trailing?render(Icon({name:trailing})): '')+'</button>');
}
export function IconButton({icon='plus',label='Add item',variant='outline',size='md',attrs={},disabled=false,className=''}={}) {
  const customClass = [attrs.class, className].filter(Boolean).join(' ');
  const {class: _c, ...restAttrs} = attrs;
  return raw('<button'+attributes({type:'button',...restAttrs,class:('s-button s-icon-button s-button--'+choice(variant,['primary','secondary','outline','ghost','danger'],'outline')+' s-button--'+choice(size,['sm','md','lg'],'md')+(customClass?' '+customClass:'')).trim(),'aria-label':label,disabled})+'>'+render(Icon({name:icon}))+'</button>');
}
export const ButtonGroup=({label='Actions',children=[]}={})=>html`<div class="s-button-group" role="group" aria-label="${label}">${children}</div>`;
const fieldLabel=(id,label,required)=>'<label class="s-label" for="'+escapeText(id)+'">'+escapeText(label)+(required?' <span class="s-required" aria-hidden="true">*</span>':'')+'</label>';
const fieldHelp=(id,helper,error)=>helper||error?'<p id="'+escapeText(id)+'-help" class="s-field-help'+(error?' s-field-error':'')+'">'+escapeText(error||helper)+'</p>':'';
export function Input({id,label='Email address',helper='',error='',icon='',type='text',required,attrs={}}={}) {
  id=uid('input',id);type=choice(type,['text','email','password','number','search','tel','url','date','time'],'text');
  const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<div class="s-input-wrap">'+(icon?render(Icon({name:icon})): '')+'<input'+attributes({...attrs,id,type,required:isReq||null,class:'s-input'+(icon?' s-input--icon':''),'aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'></div>'+fieldHelp(id,helper,error)+'</div>');
}
export function Textarea({id,label='Description',helper='',error='',value='',required,attrs={}}={}) {
  id=uid('textarea',id);const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<textarea'+attributes({rows:3,...attrs,id,required:isReq||null,class:'s-input s-textarea','aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'>'+escapeText(value)+'</textarea>'+fieldHelp(id,helper,error)+'</div>');
}
export function Select({id,label='Workspace',options=['Personal','Team'],value,helper='',error='',required,attrs={}}={}) {
  id=uid('select',id);const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<div class="s-select-wrap"><select'+attributes({...attrs,id,required:isReq||null,class:'s-input s-select','aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'>'+options.map(o=>{o=typeof o==='string'?{label:o,value:o}:o;return '<option'+attributes({value:o.value,selected:String(o.value)===String(value),disabled:o.disabled})+'>'+escapeText(o.label)+'</option>';}).join('')+'</select>'+render(Icon({name:'down',size:16}))+'</div>'+fieldHelp(id,helper,error)+'</div>');
}
function toggle(kind,{id,label='Keep me updated',description='',checked=false,disabled=false,attrs={}}={}) {
  id=uid(kind,id);return raw('<label class="s-choice s-choice--'+kind+'" for="'+escapeText(id)+'"><input'+attributes({...attrs,id,type:kind==='radio'?'radio':'checkbox',class:'s-choice-input s-'+kind,role:kind==='switch'?'switch':null,checked,disabled,'aria-describedby':description?id+'-description':null})+'><span class="s-choice-copy"><span>'+escapeText(label)+'</span>'+(description?'<small id="'+escapeText(id)+'-description">'+escapeText(description)+'</small>':'')+'</span></label>');
}
export const Checkbox=p=>toggle('checkbox',p);
export const Radio=p=>toggle('radio',p);
export const Switch=p=>toggle('switch',p);
export function Slider({id,label='Volume',value=64,min=0,max=100,step=1,attrs={}}={}) {
  id=uid('slider',id);const n=Math.max(min,Math.min(max,Number(value)||0));
  return raw('<div class="s-field s-slider-field"><div class="s-between">'+fieldLabel(id,label,false)+'<output for="'+escapeText(id)+'">'+n+'</output></div><input'+attributes({...attrs,id,type:'range',class:'s-slider',value:n,min,max,step,'data-s-slider':true})+'></div>');
}
export function Badge({label='Active',tone='success',dot=true}={}) {return html`<span class="s-badge s-tone-${choice(tone,['success','warning','danger','info','brand','neutral'],'neutral')}">${dot?html`<i class="s-status-dot" aria-hidden="true"></i>`:''}${label}</span>`;}
export function Chip({label='Design',removable=false,selected=false}={}) {return html`<span class="s-chip ${selected?'s-chip--selected':''}">${label}${removable?IconButton({icon:'close',label:'Remove '+label,size:'sm',variant:'ghost',attrs:{'data-s-chip-remove':true}}):''}</span>`;}
export function Avatar({name='Sarah Khan',initials='',size='md',tone='brand',status=false,src=''}={}) {const letters=initials||name.trim().split(/\s+/).map(s=>Array.from(s)[0]||'').slice(0,2).join('').toUpperCase();const img=src?raw('<img class="s-avatar-img" src="'+safeHref(src)+'" alt="'+escapeText(name)+'" onerror="this.remove()">'):'';return html`<span class="s-avatar s-avatar--${choice(size,['sm','md','lg'],'md')} s-tone-${choice(tone,['brand','info','success','warning'],'brand')}" role="img" aria-label="${name+(status?' · Online':'')}">${img}${letters}${status?html`<i class="s-avatar-status" aria-hidden="true"></i>`:''}</span>`;}
export const Card=({title='',description='',children='',footer='',className=''}={})=>html`<article class="s-card ${className}">${title?html`<header class="s-card-header"><h3>${title}</h3><p>${description}</p></header>`:''}<div class="s-card-body">${children}</div>${footer?html`<footer class="s-card-footer">${footer}</footer>`:''}</article>`;
export function Alert({title='All changes saved',description='Your workspace is up to date.',tone='success',live=false,dismissible=false,icon=''}={}) {tone=choice(tone,['success','warning','danger','info'],'info');const roleAttr=live?(tone==='danger'?' role="alert"':' role="status"'):'';const iconName=icon||(tone==='success'?'check':tone==='info'?'info':'alert');const closeBtn=dismissible?'<button type="button" class="s-alert-close" data-s-alert-close aria-label="Dismiss alert">'+render(Icon({name:'close',size:16}))+'</button>':'';return raw('<div class="s-alert s-tone-'+tone+'"'+roleAttr+'>'+render(Icon({name:iconName}))+'<div><strong>'+escapeText(title)+'</strong><p>'+escapeText(description)+'</p></div>'+closeBtn+'</div>');}
export function Tabs({id,label='Project details',items=[{label:'Overview',content:'Overview content'},{label:'Activity',content:'Activity content'}],active=0,variant='line'}={}) {
  id=uid('tabs',id);active=Math.max(0,Math.min(items.length-1,active));if(items[active]?.disabled)active=items.findIndex(i=>!i.disabled);
  return raw('<div class="s-tabs s-tabs--'+choice(variant,['line','pill'],'line')+'" data-s-tabs><div class="s-tab-list" role="tablist" aria-label="'+escapeText(label)+'">'+items.map((item,i)=>'<button'+attributes({type:'button',class:'s-tab',id:id+'-tab-'+i,role:'tab','aria-selected':String(i===active),'aria-controls':id+'-panel-'+i,tabindex:i===active?0:-1,disabled:item.disabled})+'>'+escapeText(item.label)+'</button>').join('')+'</div>'+items.map((item,i)=>'<div'+attributes({class:'s-tab-panel',id:id+'-panel-'+i,role:'tabpanel','aria-labelledby':id+'-tab-'+i,tabindex:0,hidden:i!==active})+'>'+render(item.content)+'</div>').join('')+'</div>');
}
export const Breadcrumb=({items=[{label:'Workspace',href:'#patterns'},{label:'Design system'}],label='Breadcrumb'}={})=>html`<nav class="s-breadcrumb" aria-label="${label}"><ol>${items.map((item,i)=>html`<li>${i?Icon({name:'chevron',size:13}):''}${i===items.length-1?html`<span aria-current="page">${item.label}</span>`:html`<a href="${safeHref(item.href)}">${item.label}</a>`}</li>`)}</ol></nav>`;
export function Pagination({pages=5,current=1,label='Pagination'}={}) {
  pages=Math.max(1,Math.min(20,Math.floor(Number(pages)||1)));current=Math.max(1,Math.min(pages,Math.floor(Number(current)||1)));
  return raw('<nav class="s-pagination" data-s-pagination data-pages="'+pages+'" data-current="'+current+'" aria-label="'+escapeText(label)+'">'+render(IconButton({icon:'chevron',label:'Previous page',size:'sm',disabled:current===1,attrs:{'data-page':'prev','data-direction':'back'}}))+Array.from({length:pages},(_,i)=>'<button'+attributes({type:'button',class:'s-page','data-page':i+1,'aria-label':'Page '+(i+1),'aria-current':i+1===current?'page':null})+'>'+(i+1)+'</button>').join('')+render(IconButton({icon:'chevron',label:'Next page',size:'sm',disabled:current===pages,attrs:{'data-page':'next'}}))+'</nav>');
}
export const NavItem=({label='Overview',href='#overview',icon='grid',active=false,badge=''}={})=>raw('<a'+attributes({class:'s-nav-item',href,'aria-current':active?'page':null})+'>'+(icon?render(Icon({name:icon,size:19})): '')+'<span>'+escapeText(label)+'</span>'+(badge?'<small>'+escapeText(badge)+'</small>':'')+'</a>');
export function DataTable({id,caption='Projects',columns=[{key:'name',label:'Project'},{key:'status',label:'Status'}],rows=[],selectable=false}={}) {
  id=uid('table',id);
  return raw('<div class="s-table-scroll" tabindex="0" role="region" aria-label="'+escapeText(caption)+' table"><table class="s-table" id="'+escapeText(id)+'" data-s-table><caption class="s-sr-only">'+escapeText(caption)+'</caption><thead><tr>'+(selectable?'<th scope="col">'+render(Checkbox({id:id+'-all',label:'Select all rows',attrs:{'data-s-select-all':true}}))+'</th>':'')+columns.map(c=>'<th scope="col">'+(c.sortable?'<button type="button" data-s-sort="'+escapeText(c.key)+'">'+escapeText(c.label)+render(Icon({name:'down',size:14}))+'</button>':escapeText(c.label))+'</th>').join('')+'</tr></thead><tbody>'+rows.map((row,i)=>'<tr data-row="'+escapeText(row.id??i)+'">'+(selectable?'<td>'+render(Checkbox({id:id+'-row-'+i,label:'Select '+String(row.name??'row '+(i+1)),attrs:{'data-s-row-select':true}}))+'</td>':'')+columns.map(c=>'<td'+attributes({'data-column':c.key,'data-sort':typeof row[c.key]==='string'||typeof row[c.key]==='number'?row[c.key]:null})+'>'+render(row[c.key])+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');
}
export const Accordion=({items=[{title:'Can I customize the tokens?',content:'Yes. Change the source tokens and rebuild.'}]}={})=>raw('<div class="s-accordion">'+items.map(item=>'<details'+attributes({open:item.open})+'><summary>'+escapeText(item.title)+render(Icon({name:'plus',size:18}))+'</summary><div>'+render(item.content)+'</div></details>').join('')+'</div>');
export function Dialog({id,title='Create a project',description='Give your next idea a place to grow.',children='',footer=''}={}) {
  id=uid('dialog',id);return raw('<dialog'+attributes({id,class:'s-dialog','aria-labelledby':id+'-title','aria-describedby':description?id+'-description':null})+'><header class="s-dialog-header"><div><h2 id="'+escapeText(id)+'-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+escapeText(id)+'-description">'+escapeText(description)+'</p>':'')+'</div>'+render(IconButton({icon:'close',label:'Close dialog',variant:'ghost',attrs:{'data-s-dialog-close':true}}))+'</header><div class="s-dialog-body">'+render(children)+'</div>'+(footer?'<footer class="s-dialog-footer">'+render(footer)+'</footer>':'')+'</dialog>');
}
export function Tooltip({id,label='More information',text='A little context, right where you need it.',icon='info'}={}) {id=uid('tooltip',id);return html`<span class="s-tooltip" data-s-tooltip>${IconButton({icon,label,variant:'ghost',attrs:{'aria-describedby':id}})}<span class="s-tooltip-bubble" id="${id}" role="tooltip">${text}</span></span>`;}
export function Progress({value=68,label='Project progress',showLabel=true}={}) {value=Math.max(0,Math.min(100,Number(value)||0));return html`<div class="s-progress-wrap">${showLabel?html`<div class="s-between s-small"><span>${label}</span><strong>${value}%</strong></div>`:''}<progress class="s-progress" value="${value}" max="100" aria-label="${label}">${value}%</progress></div>`;}
export function Skeleton({lines=3,label='Loading content'}={}) {return html`<div class="s-skeleton-group" role="status" aria-label="${label}">${Array.from({length:Math.max(1,Math.min(10,Math.floor(Number(lines)||3)))},()=>html`<span class="s-skeleton" aria-hidden="true"></span>`)}</div>`;}
export const EmptyState=({title='Make room for your next idea',description='Create your first project to bring everything together.',action='',icon='folder'}={})=>html`<div class="s-empty-state"><span>${Icon({name:icon,size:27})}</span><h3>${title}</h3><p>${description}</p>${action}</div>`;
export const Separator=({label=''}={})=>label?html`<div class="s-separator-label"><span>${label}</span></div>`:html`<hr class="s-separator">`;
export const Toast=({title='Saved successfully',description='Your changes are ready.',tone='success'}={})=>html`<div class="s-toast s-tone-${choice(tone,['success','info','warning','danger'],'success')}">${Icon({name:tone==='success'?'check':'info'})}<div><strong>${title}</strong><p>${description}</p></div>${IconButton({icon:'close',label:'Dismiss notification',size:'sm',variant:'ghost',attrs:{'data-s-toast-close':true}})}</div>`;
export function Menu({id,label='Project actions',items=[{label:'View project',icon:'folder',value:'view'},{label:'Copy link',icon:'link',value:'copy'}]}={}) {
  id=uid('menu',id);return raw('<div class="s-menu" data-s-menu>'+render(Button({label,variant:'outline',trailing:'down',attrs:{'data-s-menu-trigger':true,'aria-haspopup':'menu','aria-expanded':'false','aria-controls':id}}))+'<div class="s-menu-panel" role="menu" id="'+escapeText(id)+'" aria-label="'+escapeText(label)+'" hidden>'+items.map(item=>'<button'+attributes({type:'button',role:'menuitem',class:'s-menu-item'+(item.danger?' s-menu-danger':''),tabindex:-1,'data-value':item.value,disabled:item.disabled})+'>'+render(Icon({name:item.icon||'arrow',size:17}))+escapeText(item.label)+'</button>').join('')+'</div></div>');
}
export function CommandPalette({id='s-command',title='Search the library',items=[]}={}) {
  return html`<dialog id="${id}" class="s-dialog s-command" data-s-command aria-label="${title}"><div class="s-command-search">${Icon({name:'search',size:22})}<input type="search" role="combobox" aria-label="${title}" aria-expanded="true" aria-autocomplete="list" aria-controls="${id}-results" data-s-command-input data-s-autofocus placeholder="What are you looking for?" autocomplete="off">${IconButton({icon:'close',label:'Close search',variant:'ghost',attrs:{'data-s-dialog-close':true}})}</div><div class="s-command-list" id="${id}-results" role="listbox" aria-label="Results">${items.map((item,i)=>html`<div role="option" aria-selected="false" id="${id}-option-${i}" data-href="${safeHref(item.href)}" data-keywords="${item.keywords||item.label}">${Icon({name:item.icon||'layers',size:19})}<span>${item.label}</span>${Icon({name:'arrow',size:15})}</div>`)}</div><p data-s-command-empty hidden>No results. Try a different search.</p><footer><span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span><kbd>esc</kbd> to close</span></footer></dialog>`;
}
export function Toggle({label='Toggle',icon='',pressed=false,size='md',attrs={}}={}) {
  const isPressed=Boolean(pressed);
  return raw('<button'+attributes({type:'button',class:'s-toggle s-toggle--'+choice(size,['sm','md','lg'],'md'),'aria-pressed':String(isPressed),'data-s-toggle':true,...attrs})+'>'+(icon?render(Icon({name:icon,size:size==='sm'?14:16})): '')+'<span>'+escapeText(label)+'</span></button>');
}
export function ToggleGroup({label='Toggle group',items=[],type='single',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-toggle-group',role:'group','aria-label':label,'data-s-toggle-group':type,...attrs})+'>'+items.map(item=>render(Toggle(item))).join('')+'</div>');
}
export function Kbd({keys=[],label='',size='md',attrs={}}={}) {
  const kList=Array.isArray(keys)&&keys.length?keys:(label?[label]:['⌘','K']);
  return raw('<span'+attributes({class:'s-kbd s-kbd--'+choice(size,['sm','md','lg'],'md'),...attrs})+'>'+kList.map(k=>'<kbd>'+escapeText(k)+'</kbd>').join('')+'</span>');
}
export function AspectRatio({ratio='16/9',children='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-aspect-ratio',style:'aspect-ratio:'+escapeText(ratio),...attrs})+'>'+render(children)+'</div>');
}
export function BentoGrid({children='',columns=3,cols=null,className='',attrs={}}={}) {
  const colCount = cols != null ? cols : columns;
  const colStyle = colCount !== 3 ? `--bento-cols:${Number(colCount||3)};` : '';
  const extraClass = className ? ` ${className}` : '';
  return raw('<div'+attributes({class:'s-bento-grid'+extraClass,style:colStyle||null,...attrs})+'>'+render(children)+'</div>');
}
export function BentoCard({name='',title='',description='Feature description detail.',graphic='',background='',icon='spark',Icon:CustomIcon=null,cta='Learn more',href='#',colSpan=0,rowSpan=0,colStart=0,rowStart=0,colEnd=0,rowEnd=0,className='',children='',attrs={}}={}) {
  const displayTitle = name || title || 'Feature Title';
  const bgContent = background || graphic;
  const colClass = colSpan ? ` s-bento-card--col-${colSpan}` : '';
  const rowClass = rowSpan ? ` s-bento-card--row-${rowSpan}` : '';
  const colStartClass = colStart ? ` s-bento-card--col-start-${colStart}` : '';
  const rowStartClass = rowStart ? ` s-bento-card--row-start-${rowStart}` : '';
  const colEndClass = colEnd ? ` s-bento-card--col-end-${colEnd}` : '';
  const rowEndClass = rowEnd ? ` s-bento-card--row-end-${rowEnd}` : '';
  const extraClass = className ? ` ${className}` : '';
  const resolvedIcon = CustomIcon || icon;
  const iconNode = resolvedIcon ? (typeof resolvedIcon === 'string' ? Icon({name:resolvedIcon,size:22}) : resolvedIcon) : null;
  const bodyContent = children ? render(children) : '';
  return raw('<article'+attributes({class:'s-bento-card group'+colClass+rowClass+colStartClass+rowStartClass+colEndClass+rowEndClass+extraClass,...attrs})+'>'+
    (bgContent ? `<div class="s-bento-card-bg">${render(bgContent)}</div>` : '')+
    '<div class="s-bento-card-body s-bento-card-content">'+
      (iconNode ? `<div class="s-bento-card-icon">${render(iconNode)}</div>` : '')+
      '<h3>'+escapeText(displayTitle)+'</h3>'+
      '<p>'+escapeText(description)+'</p>'+
      bodyContent+
      (cta ? `<div class="s-bento-card-cta-mobile"><a class="s-bento-btn" href="${safeHref(href)}"><span>${escapeText(cta)}</span> ${render(Icon({name:'arrow',size:13}))}</a></div>` : '')+
    '</div>'+
    (cta ? `<div class="s-bento-card-cta-desktop"><a class="s-bento-btn" href="${safeHref(href)}"><span>${escapeText(cta)}</span> ${render(Icon({name:'arrow',size:13}))}</a></div>` : '')+
  '</article>');
}
export function Drawer({id,title='Side Panel',description='Slide-over drawer content.',children='',position='right',attrs={}}={}) {
  id=uid('drawer',id);
  return raw('<dialog'+attributes({id,class:'s-drawer s-drawer--'+choice(position,['right','left','bottom'],'right'),'aria-labelledby':id+'-title','aria-describedby':description?id+'-description':null,...attrs})+'><header class="s-dialog-header"><div><h2 id="'+escapeText(id)+'-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+escapeText(id)+'-description">'+escapeText(description)+'</p>':'')+'</div>'+render(IconButton({icon:'close',label:'Close drawer',variant:'ghost',attrs:{'data-s-dialog-close':true}}))+'</header><div class="s-dialog-body">'+render(children)+'</div></dialog>');
}
export function Popover({id,trigger=Button({label:'Open popover'}),content='Popover content',attrs={}}={}) {
  id=uid('popover',id);
  return raw('<div'+attributes({class:'s-popover',id,'data-s-popover':true,...attrs})+'>'+render(trigger)+'<div class="s-popover-content" role="region" aria-label="Popover panel" hidden>'+render(content)+'</div></div>');
}
export function Marquee({children='',direction='horizontal',reverse=false,pauseOnHover=false,speed=40,duration=null,vertical=false,repeat=4,gap='',className='',attrs={}}={}) {
  const isVert = vertical || direction === 'vertical';
  const vertClass = isVert ? ' s-marquee--vertical' : '';
  const revClass = reverse ? ' s-marquee--reverse' : '';
  const pauseClass = pauseOnHover ? ' s-marquee--pause' : '';
  const extraClass = className ? ` ${className}` : '';
  const numRepeats = Math.max(2, Math.min(8, Number(repeat) || 4));
  const content = render(children);
  const resolvedSpeed = duration != null ? duration : speed;
  const durVal = typeof resolvedSpeed === 'number' ? `${resolvedSpeed}s` : (resolvedSpeed || '40s');
  const gapVal = gap ? (typeof gap === 'number' ? `${gap}px` : gap) : '1rem';
  const style = `--duration:${durVal};--gap:${gapVal};--s-gap:${gapVal};`;
  const tracks = Array.from({length: numRepeats}, (_, i) =>
    `<div class="s-marquee-track"${i > 0 ? ' aria-hidden="true"' : ''}>${content}</div>`
  ).join('');
  return raw('<div' + attributes({
    class: 's-marquee group' + vertClass + revClass + pauseClass + extraClass,
    style: style,
    'data-s-marquee': true,
    ...attrs
  }) + '>' + tracks + '</div>');
}
export function BorderBeam({size=50,duration=6,delay=0,colorFrom='#ffaa40',colorTo='#9c40ff',reverse=false,initialOffset=0,borderWidth=1,className='',style='',attrs={}}={}) {
  const customClass = attrs.class || className || '';
  const revClass = reverse ? ' s-border-beam--reverse' : '';
  const extraClass = customClass ? ' ' + customClass : '';
  const numSize = typeof size === 'number' ? size : parseInt(size) || 50;
  const numDuration = typeof duration === 'number' ? duration : parseFloat(duration) || 6;
  const numDelay = typeof delay === 'number' ? delay : parseFloat(delay) || 0;
  const numOffset = typeof initialOffset === 'number' ? initialOffset : parseFloat(initialOffset) || 0;
  const numBorderWidth = typeof borderWidth === 'number' ? borderWidth : parseFloat(borderWidth) || 1;

  let bgGradient = `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`;
  if (customClass.includes('red')) {
    bgGradient = 'linear-gradient(to left, transparent, #ef4444, transparent)';
  } else if (customClass.includes('blue')) {
    bgGradient = 'linear-gradient(to left, transparent, #3b82f6, transparent)';
  } else if (customClass.includes('green')) {
    bgGradient = 'linear-gradient(to left, transparent, #22c55e, transparent)';
  } else if (customClass.includes('yellow')) {
    bgGradient = 'linear-gradient(to left, transparent, #eab308, transparent)';
  }

  const containerStyle = [
    `--border-beam-width:${numBorderWidth}px`,
    typeof style === 'string' ? style : ''
  ].filter(Boolean).join(';');

  const glowStyle = [
    `width:${numSize}px`,
    `height:${numSize}px`,
    `offset-path:rect(0 auto auto 0 round ${numSize}px)`,
    `--initial-offset:${numOffset}%`,
    `--duration:${numDuration}s`,
    `--delay:${numDelay}s`,
    `--color-from:${colorFrom}`,
    `--color-to:${colorTo}`,
    `background:${bgGradient}`,
    `animation-duration:${numDuration}s`,
    numDelay ? `animation-delay:-${numDelay}s` : ''
  ].filter(Boolean).join(';');

  const { class: _c, style: _s, ...restAttrs } = attrs;
  return raw('<div' + attributes({
    class: 's-border-beam' + revClass + extraClass,
    style: containerStyle || null,
    'aria-hidden': 'true',
    ...restAttrs
  }) + '><div class="s-border-beam-glow" style="' + glowStyle + '"></div></div>');
}
export function AnimatedShinyText({text='Shimmering text animation',shimmerWidth=100,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-shiny-text',style:shimmerWidth?`--shimmer-width:${shimmerWidth}px`:null,...attrs})+'>'+escapeText(text)+'</span>');
}
export function NumberTicker({value=100,direction='up',delay=0,decimalPlaces=0,decimals,startValue=0,attrs={}}={}) {
  const dp = decimals != null ? Number(decimals) : Number(decimalPlaces);
  const sv = Number(startValue) || 0;
  return raw('<span'+attributes({class:'s-number-ticker','data-s-number-ticker':String(value),'data-direction':direction,'data-delay':String(delay),'data-decimals':String(dp),'data-start-value':String(sv),...attrs})+'>'+Number(sv || value).toFixed(dp)+'</span>');
}
export function Ripple({mainCircleSize=180,numCircles=8,attrs={}}={}) {
  const circles=Array.from({length:Math.max(1,Math.min(10,Number(numCircles)||8))},(_,i)=>{
    const size=mainCircleSize+i*55;
    const delay=(i*0.35).toFixed(2);
    return `<div class="s-ripple-circle" style="width:${size}px;height:${size}px;animation-delay:${delay}s;"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-ripple','aria-hidden':'true',...attrs})+'>'+circles+'</div>');
}
export function RetroGrid({angle=65,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-retro-grid','aria-hidden':'true',...attrs})+'><div class="s-retro-grid-plane" style="transform:rotateX('+Number(angle||65)+'deg)"></div></div>');
}
export function ShineBorder({children='',borderWidth=1,duration=14,color='',shineColor='',attrs={}}={}) {
  const col = shineColor || color || '#5B3DF5';
  const colStr = Array.isArray(col) ? col.join(',') : col;
  const style=(borderWidth?`border-width:${borderWidth}px;`:'')+(duration?`--shine-duration:${duration}s;`:'')+(colStr?`--shine-color:${colStr};`:'');
  return raw('<div'+attributes({class:'s-shine-border',style:style||null,...attrs})+'><div class="s-shine-border-inner">'+render(children)+'</div></div>');
}
export function Meteors({number=12,attrs={}}={}) {
  const meteors=Array.from({length:Math.max(1,Math.min(30,Number(number)||12))},(_,i)=>{
    const left=Math.floor((i/12)*100);
    const delay=((i%5)*0.4).toFixed(1);
    const duration=(4+(i%4)*0.8).toFixed(1);
    return `<span class="s-meteor" style="top:0;left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;"></span>`;
  }).join('');
  return raw('<div'+attributes({class:'s-meteors','aria-hidden':'true',...attrs})+'>'+meteors+'</div>');
}
export function Particles({quantity=30,staticity=50,ease=50,color='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-particles','data-s-particles':String(quantity),'data-color':color||'',...attrs})+'><canvas class="s-particles-canvas"></canvas></div>');
}
export function Confetti({label='Celebrate',icon='spark',mode='basic',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-button s-button--primary s-confetti-btn','data-s-confetti':mode||'basic',...attrs})+'>'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span></button>');
}
export function MagicCard({
  children = '',
  className = '',
  mode = 'gradient',
  gradientSize = 200,
  gradientColor = '',
  gradientOpacity = 0.8,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
  glowFrom = '#ee4f27',
  glowTo = '#6b21ef',
  glowAngle = 90,
  glowSize = 340,
  glowBlur = 65,
  glowOpacity = 0.38,
  style = '',
  attrs = {}
} = {}) {
  const extraClass = className ? ` ${className}` : '';
  const styles = [];
  if (style) styles.push(style);
  if (gradientSize !== undefined) styles.push(`--gradient-size:${gradientSize}px`);
  if (gradientColor) styles.push(`--magic-color:${escapeText(gradientColor)}`);
  if (gradientOpacity !== undefined) styles.push(`--gradient-opacity:${gradientOpacity}`);
  if (gradientFrom) styles.push(`--gradient-from:${escapeText(gradientFrom)}`);
  if (gradientTo) styles.push(`--gradient-to:${escapeText(gradientTo)}`);
  if (glowFrom) styles.push(`--glow-from:${escapeText(glowFrom)}`);
  if (glowTo) styles.push(`--glow-to:${escapeText(glowTo)}`);
  if (glowAngle !== undefined) styles.push(`--glow-angle:${glowAngle}deg`);
  if (glowSize !== undefined) styles.push(`--glow-size:${glowSize}px`);
  if (glowBlur !== undefined) styles.push(`--glow-blur:${glowBlur}px`);
  if (glowOpacity !== undefined) styles.push(`--glow-opacity:${glowOpacity}`);
  const styleAttr = styles.length ? styles.join(';') : null;

  return raw('<div' + attributes({
    class: 's-magic-card' + extraClass,
    'data-s-magic-card': true,
    'data-mode': mode,
    'data-gradient-size': String(gradientSize),
    'data-glow-size': String(glowSize),
    style: styleAttr,
    ...attrs
  }) + '>' +
  '<div class="s-magic-card-bg" aria-hidden="true"></div>' +
  (mode === 'orb' ? '<div class="s-magic-card-orb" aria-hidden="true"></div>' : '<div class="s-magic-card-spotlight" aria-hidden="true"></div>') +
  '<div class="s-magic-card-content">' + render(children) + '</div>' +
  '</div>');
}
export function TypingAnimation({text='',children='',duration=60,delay=0,className='',attrs={}}={}) {
  let rawText = text || (typeof children === 'string' ? children : '') || 'Thoughtful design system';
  rawText = String(rawText).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  const extraClass = className ? ` ${className}` : '';
  const durAttr = duration ? ` data-duration="${duration}"` : '';
  const delayAttr = delay ? ` data-delay="${delay}"` : '';
  return raw('<span' + attributes({
    class: 's-typing-animation s-terminal-typing' + extraClass,
    'data-s-typing': rawText,
    'data-text': rawText,
    'data-s-terminal-item': 'typing',
    ...attrs
  }) + durAttr + delayAttr + '><span class="s-typing-text"></span><span class="s-typing-cursor" aria-hidden="true"></span></span>');
}
export function WordRotate({words=['Components','Motion','Design','Craft'],duration=2500,attrs={}}={}) {
  const arr=Array.isArray(words)&&words.length?words:['Components','Motion','Design'];
  return raw('<span'+attributes({class:'s-word-rotate','data-s-word-rotate':JSON.stringify(arr),'data-duration':String(duration),...attrs})+'><span class="s-word-rotate-item">'+escapeText(arr[0])+'</span></span>');
}
export function BlurFade({children='',delay=0,duration=0.6,yOffset=12,blur=8,attrs={}}={}) {
  const style=`animation-delay:${Number(delay||0)}s;animation-duration:${Number(duration||0.6)}s;`;
  return raw('<div'+attributes({class:'s-blur-fade',style,...attrs})+'>'+render(children)+'</div>');
}
export function ShimmerButton({label='Shimmer Action',icon='',trailing='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-shimmer-button',...attrs})+'>'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</button>');
}
export function RainbowButton({label='Rainbow Action',variant='default',icon='',trailing='',attrs={}}={}) {
  const isOutline = variant === 'outline';
  return raw('<button type="button"'+attributes({class:'s-rainbow-button'+(isOutline?' s-rainbow-button--outline':''),...attrs})+'><span class="s-rainbow-button-inner">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</span></button>');
}
export function Dock({
  direction = 'middle',
  iconSize = 40,
  iconMagnification = 60,
  iconDistance = 140,
  items = null,
  children = '',
  className = '',
  attrs = {}
} = {}) {
  const isVert = direction === 'vertical';
  const dirClass = isVert ? ' s-dock--vertical' : (direction === 'top' ? ' s-dock--top' : (direction === 'bottom' ? ' s-dock--bottom' : ''));
  const extraClass = className ? ` ${className}` : '';
  let content = '';
  if (children) {
    content = render(children);
  } else {
    const itemList = Array.isArray(items) ? items : [
      { icon: 'home', label: 'Home' },
      { icon: 'pencil', label: 'Blog' },
      { separator: true },
      { icon: 'github', label: 'GitHub' },
      { icon: 'linkedin', label: 'LinkedIn' },
      { icon: 'x', label: 'X' },
      { icon: 'mail', label: 'Send Email' }
    ];
    content = itemList.map(item => {
      if (item.separator) return '<div class="s-dock-separator" aria-hidden="true"></div>';
      const label = escapeText(item.label || '');
      const iconName = item.icon || 'spark';
      const bgStyle = item.bg ? ` style="background:${escapeText(item.bg)};"` : '';
      const customClass = item.className ? ` ${escapeText(item.className)}` : '';
      return `<button type="button" class="s-dock-icon${customClass}" title="${label}" aria-label="${label}"${bgStyle}>${render(Icon({ name: iconName, size: 20 }))}</button>`;
    }).join('');
  }

  return raw('<nav' + attributes({
    class: 's-dock' + dirClass + extraClass,
    'data-s-dock': true,
    'data-size': iconSize,
    'data-magnification': iconMagnification,
    'data-distance': iconDistance,
    'aria-label': 'Quick tools',
    ...attrs
  }) + '>' + content + '</nav>');
}
export function AvatarCircles({
  numPeople = 99,
  avatarUrls = null,
  avatars = null,
  className = '',
  attrs = {}
} = {}) {
  const rawList = Array.isArray(avatarUrls) && avatarUrls.length ? avatarUrls : (Array.isArray(avatars) && avatars.length ? avatars : [
    'https://avatars.githubusercontent.com/u/55315718',
    'https://avatars.githubusercontent.com/u/20110627',
    'https://avatars.githubusercontent.com/u/106103625',
    'https://avatars.githubusercontent.com/u/59228569'
  ]);

  const list = rawList.map(item => {
    let imgUrl = '';
    let linkUrl = '';
    let initials = '';

    if (typeof item === 'string') {
      if (item.startsWith('http://') || item.startsWith('https://') || item.startsWith('/') || item.startsWith('data:') || item.includes('.')) {
        imgUrl = item;
      } else {
        initials = item;
      }
    } else if (item && typeof item === 'object') {
      imgUrl = item.imageUrl || item.src || item.url || '';
      linkUrl = item.profileUrl || item.href || '';
      initials = item.name || item.initials || '';
    }

    let innerContent = '';
    if (imgUrl) {
      innerContent = `<img class="s-avatar-img" src="${escapeText(imgUrl)}" alt="Avatar" width="40" height="40" loading="lazy" />`;
    } else {
      innerContent = `<span class="s-avatar-initials">${escapeText(initials || 'U')}</span>`;
    }

    if (linkUrl) {
      return `<a class="s-avatar s-avatar--sm" href="${escapeText(linkUrl)}" target="_blank" rel="noopener noreferrer">${innerContent}</a>`;
    }
    return `<div class="s-avatar s-avatar--sm">${innerContent}</div>`;
  }).join('');

  const countNum = Number(numPeople) || 0;
  const extra = countNum > 0 ? `<span class="s-avatar-circles-count">+${countNum}</span>` : '';
  const extraClass = className ? ` ${className}` : '';

  return raw('<div' + attributes({
    class: 's-avatar-circles' + extraClass,
    ...attrs
  }) + '>' + list + extra + '</div>');
}
export function AnimatedBeam({
  duration = 3,
  delay = 0,
  curvature = 0,
  reverse = false,
  pathColor = 'currentColor',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#ffaa40',
  gradientStopColor = '#9c40ff',
  startX = 20,
  startY = 60,
  endX = 300,
  endY = 60,
  d = '',
  className = '',
  attrs = {}
} = {}) {
  const id = uid('beam');
  let pathD = d;
  if (!pathD) {
    if (curvature === 0) {
      pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
    } else {
      const midX = (startX + endX) / 2;
      const controlY = startY - curvature;
      pathD = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
    }
  }
  const extraClass = className ? ` ${className}` : '';
  const revClass = reverse ? ' s-beam-path--reverse' : '';

  return raw('<svg' + attributes({
    class: 's-animated-beam' + extraClass,
    style: `--beam-duration:${duration}s;--beam-delay:${delay}s;`,
    fill: 'none',
    'aria-hidden': 'true',
    ...attrs
  }) + '>' +
    '<defs>' +
      `<linearGradient id="${id}" class="s-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">` +
        `<stop offset="0%" stop-color="${gradientStartColor}" stop-opacity="0"></stop>` +
        `<stop offset="20%" stop-color="${gradientStartColor}"></stop>` +
        `<stop offset="80%" stop-color="${gradientStopColor}"></stop>` +
        `<stop offset="100%" stop-color="${gradientStopColor}" stop-opacity="0"></stop>` +
      '</linearGradient>' +
    '</defs>' +
    `<path class="s-beam-path-bg" d="${pathD}" pathLength="100" stroke="${pathColor}" stroke-width="${pathWidth}" stroke-opacity="${pathOpacity}" stroke-linecap="round" fill="none"></path>` +
    `<path class="s-beam-path${revClass}" d="${pathD}" pathLength="100" stroke="url(#${id})" stroke-width="${pathWidth + 0.5}" stroke-linecap="round" fill="none"></path>` +
  '</svg>');
}
export function AnimatedSpan({children='',className='',delay=0,attrs={}}={}) {
  const extraClass = className ? ` ${className}` : '';
  const delayAttr = delay ? ` data-delay="${delay}"` : '';
  return raw('<div' + attributes({class: 's-terminal-span' + extraClass, 'data-s-terminal-item': 'span', ...attrs}) + delayAttr + '>' + render(children) + '</div>');
}
export function Terminal({children='',command='> pnpm dlx sarahui@latest init',steps=[
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
],output='Success! Project initialization completed.',sequence=true,className='',attrs={}}={}) {
  const extraClass = className ? ` ${className}` : '';
  const header = '<div class="s-terminal-header"><div class="s-terminal-dots"><span class="s-dot-red"></span><span class="s-dot-yellow"></span><span class="s-dot-green"></span></div></div>';
  if (children) {
    return raw('<div' + attributes({
      class: 's-terminal' + extraClass,
      'data-s-terminal': true,
      'data-sequence': String(sequence),
      ...attrs
    }) + '>' + header + '<pre><code>' + render(children) + '</code></pre></div>');
  }
  const cleanCommand = String(command).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  const cleanOutput = output ? String(output).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&') : '';
  const stepsData = Array.isArray(steps) && steps.length ? JSON.stringify(steps) : '';
  return raw('<div' + attributes({
    class: 's-terminal' + extraClass,
    'data-s-terminal': true,
    'data-command': cleanCommand,
    'data-steps': stepsData || null,
    'data-output': cleanOutput || null,
    ...attrs
  }) + '>' + header + '<pre><code><div class="s-terminal-prompt"><span class="s-terminal-cmd"></span><span class="s-terminal-cursor"></span></div><div class="s-terminal-steps"></div>' + (cleanOutput ? `<div class="s-terminal-output s-terminal-line" style="display:none;"></div>` : '') + '</code></pre></div>');
}
export function OrbitingCircles({
  children = '',
  items = null,
  icons = null,
  radius = 160,
  duration = 20,
  delay = 10,
  reverse = false,
  path = true,
  iconSize = 30,
  speed = 1,
  className = '',
  attrs = {}
} = {}) {
  const r = Math.max(10, Number(radius) || 160);
  const baseDuration = Number(duration) || 20;
  const sp = Number(speed) || 1;
  const d = Math.max(0.1, baseDuration / sp);
  const size = Math.max(12, Number(iconSize) || 30);
  const extraClass = className ? ` ${className}` : '';

  let childArray = [];
  if (Array.isArray(icons) && icons.length) {
    childArray = icons;
  } else if (Array.isArray(items) && items.length) {
    childArray = items;
  } else if (Array.isArray(children) && children.length) {
    childArray = children;
  } else if (children) {
    childArray = [children];
  } else {
    childArray = ['whatsapp', 'notion', 'openai', 'drive', 'github'];
  }

  const count = Math.max(1, childArray.length);
  const pathSvg = path
    ? `<svg class="s-orbit-circle-path" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><circle cx="50%" cy="50%" r="${r}" fill="none"/></svg>`
    : '';

  const renderedItems = childArray.map((child, idx) => {
    const angle = (360 / count) * idx;
    const style = `--radius:${r};--duration:${d};--angle:${angle};--icon-size:${size}px;`;

    let content = child;
    if (typeof child === 'string') {
      const trimmed = child.trim();
      if (trimmed.startsWith('<')) {
        content = raw(trimmed);
      } else {
        content = Icon({ name: trimmed, size: size });
      }
    } else if (child && typeof child === 'object' && !(child instanceof Markup) && (child.icon || child.name)) {
      content = Icon({ name: child.icon || child.name, size: child.size || size });
    }

    return `<div class="s-orbit-item${reverse ? ' s-orbit-reverse' : ''}" style="${style}">${render(content)}</div>`;
  }).join('');

  return raw('<div' + attributes({
    class: 's-orbiting-circles' + (reverse ? ' s-orbit-reverse' : '') + extraClass,
    ...attrs
  }) + '>' + pathSvg + renderedItems + '</div>');
}
export function Globe({size=360,className='',config=null,attrs={}}={}) {
  const n=Math.max(160,Math.min(600,Number(size)||360));
  const extraClass = className ? ` ${className}` : '';
  const configAttr = config ? {'data-globe-config': JSON.stringify(config)} : {};
  return raw('<div'+attributes({class:'s-globe-container'+extraClass,style:`width:${n}px;height:${n}px;`,...attrs})+'><canvas class="s-globe-canvas" data-s-globe width="'+(n*2)+'" height="'+(n*2)+'"'+attributes(configAttr)+'></canvas><div class="s-globe-glow"></div></div>');
}
export function AnimatedList({items=null,children='',delay=1200,className='',attrs={}}={}) {
  const extraClass = className ? ` ${className}` : '';
  const defaultItems = [
    html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:12px 14px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#00C9A7;font-size:16px;">💸</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>Payment received</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">15m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">sarahUI Studio · $450.00</p></div></div></figure>`,
    html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:12px 14px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FFB800;font-size:16px;">👤</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>User signed up</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">10m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah Khan joined workspace</p></div></div></figure>`,
    html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:12px 14px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FF3D71;font-size:16px;">💬</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>New message</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">5m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Can we update the theme token?</p></div></div></figure>`,
    html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:12px 14px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#1E86FF;font-size:16px;">🗞️</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>New event</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">2m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Community meetup scheduled</p></div></div></figure>`
  ];
  let rawArr = defaultItems;
  if (Array.isArray(items) && items.length) {
    rawArr = items;
  } else if (children) {
    rawArr = Array.isArray(children) ? children : [children];
  }
  const stringArr = rawArr.map(it => typeof it === 'string' ? it : render(it));
  const initial = stringArr.slice(0, 1).map(item => `<div class="s-animated-list-item">${item}</div>`).join('');
  return raw('<div'+attributes({class:'s-animated-list'+extraClass,'data-s-animated-list':true,'data-delay':String(delay),'data-items':JSON.stringify(stringArr),...attrs})+'>'+initial+'</div>');
}
export function InteractiveHoverButton({label='Get Started',text='',icon='arrow',attrs={}}={}) {
  const lbl = text || label || 'Get Started';
  return raw('<button type="button"'+attributes({class:'s-interactive-hover-btn',...attrs})+'><span class="s-interactive-hover-text">'+escapeText(lbl)+'</span><div class="s-interactive-hover-dot"></div><div class="s-interactive-hover-arrow">'+render(Icon({name:icon,size:15}))+'</div></button>');
}
export function PulsatingButton({label='Explore Components',pulseColor='#5B3DF5',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-pulsating-button',style:pulseColor?`--pulse-color:${pulseColor};`:null,...attrs})+'><div class="s-pulse-ring"></div><span>'+escapeText(label)+'</span></button>');
}
export function SparklesText({text='Sparkles Magic',sparklesCount=6,attrs={}}={}) {
  const stars=Array.from({length:sparklesCount},(_,i)=>`<span class="s-sparkle-star s-sparkle-${i%3}" style="top:${(15+i*14)%80}%;left:${(10+i*22)%90}%;animation-delay:${(i*0.25).toFixed(2)}s;"></span>`).join('');
  return raw('<span'+attributes({class:'s-sparkles-text',...attrs})+'>'+stars+'<span class="s-sparkles-content">'+escapeText(text)+'</span></span>');
}
export function TextReveal({text='Magic UI will change the way you design.',attrs={}}={}) {
  const words=String(text).split(' ').map((word,i)=>`<span class="s-reveal-word" style="--word-index:${i}"><span class="s-reveal-word-ghost">${escapeText(word)}&nbsp;</span><span class="s-reveal-word-fill">${escapeText(word)}&nbsp;</span></span>`).join('');
  return raw('<div'+attributes({class:'s-text-reveal',...attrs})+'>'+words+'</div>');
}
export function GridPattern({width=40,height=40,x=0,y=0,squares=[[1,1],[3,2],[5,1]],attrs={}}={}) {
  const id=uid('grid');
  const sq=(Array.isArray(squares)?squares:[]).map(([sx,sy])=>`<rect x="${sx*width+1}" y="${sy*height+1}" width="${width-1}" height="${height-1}" class="s-grid-fill"/>`).join('');
  return raw('<svg'+attributes({class:'s-grid-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse" x="'+x+'" y="'+y+'"><path d="M.5 '+height+'V.5H'+width+'" fill="none" stroke="currentColor" stroke-dasharray="0"></path></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#'+id+')"></rect><svg x="'+x+'" y="'+y+'" class="s-grid-squares">'+sq+'</svg></svg>');
}
export function DotPattern({width=20,height=20,cr=1,attrs={}}={}) {
  const id=uid('dots');
  return raw('<svg'+attributes({class:'s-dot-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse"><circle cx="'+cr+'" cy="'+cr+'" r="'+cr+'" fill="currentColor"></circle></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#'+id+')"></rect></svg>');
}
export function AnimatedGridPattern({width=30,height=30,numSquares=20,maxOpacity=0.5,attrs={}}={}) {
  const id=uid('animgrid');
  const squares=Array.from({length:numSquares},(_,i)=>`<rect width="${width-1}" height="${height-1}" x="${(i*37)%18*width+1}" y="${(i*19)%12*height+1}" class="s-anim-grid-sq" style="animation-delay:${(i*0.3).toFixed(1)}s;--max-opacity:${maxOpacity};"></rect>`).join('');
  return raw('<svg'+attributes({class:'s-animated-grid-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse"><path d="M '+width+' 0 L 0 0 0 '+height+'" fill="none" stroke="currentColor" stroke-width="0.5"></path></pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"></rect><svg class="s-anim-grid-squares">'+squares+'</svg></svg>');
}
export function FlickeringGrid({squareSize=4,gridGap=6,flickerChance=0.3,color='#5B3DF5',maxOpacity=0.5,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-flickering-grid','aria-hidden':'true',...attrs})+' style="--fg-color:'+escapeText(color)+';--fg-opacity:'+maxOpacity+';"><canvas class="s-flickering-canvas" data-s-flickering data-square-size="'+squareSize+'" data-grid-gap="'+gridGap+'" data-flicker-chance="'+flickerChance+'"></canvas></div>');
}
export function WarpBackground({children='',beams=6,title='',description='',gridColor='',speed=1,attrs={}}={}) {
  const beamElements=Array.from({length:beams},(_,i)=>`<div class="s-warp-beam" style="--warp-i:${i};"></div>`).join('');
  const content = children || (title || description ? `<div class="s-card" style="width:320px;padding:24px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);border-radius:14px;box-shadow:none;text-align:left;position:relative;z-index:2;"><h4 style="margin:0 0 8px;font-size:16px;font-weight:600;color:var(--s-text-primary);">${escapeText(title)}</h4><p class="s-small s-muted" style="margin:0;line-height:1.5;">${escapeText(description)}</p></div>` : '');
  const styleAttr = gridColor ? ` style="--warp-grid-color:${escapeText(gridColor)};"` : '';
  return raw('<div'+attributes({class:'s-warp-container',...attrs})+styleAttr+'><div class="s-warp-perspective">'+beamElements+'</div><div class="s-warp-content">'+render(content)+'</div></div>');
}
export function NeonGradientCard({children='',title='',description='',neonColors={firstColor:'#178BFF',secondColor:'#A020FF'},borderRadius=16,borderSize=2,attrs={}}={}) {
  const content = children || (title || description ? raw(`<div class="s-neon-card-text"><h4 class="s-neon-card-title">${escapeText(title)}</h4><p class="s-small s-muted">${escapeText(description)}</p></div>`) : '');
  const first = neonColors?.firstColor || '#178BFF';
  const second = neonColors?.secondColor || '#A020FF';
  const styleStr = `--neon-first:${escapeText(first)};--neon-second:${escapeText(second)};--neon-radius:${borderRadius}px;--neon-border:${borderSize}px;`;
  return raw('<div'+attributes({class:'s-neon-card',...attrs})+' style="'+styleStr+'">'+
    '<div class="s-neon-card-glow" aria-hidden="true"></div>'+
    '<div class="s-neon-card-border" aria-hidden="true"></div>'+
    '<div class="s-neon-card-inner">'+render(content)+'</div>'+
  '</div>');
}
export function CoolMode({children='',particle='spark',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-cool-mode','data-s-cool-mode':particle||'spark',...attrs})+'>'+render(children)+'</div>');
}
export function ScrollProgress({height=3,color='#5B3DF5',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-scroll-progress',style:`height:${height}px;--scroll-color:${color};`,'aria-hidden':'true',...attrs})+'><div class="s-scroll-progress-bar" data-s-scroll-progress></div></div>');
}
export function ProgressiveBlur({position='bottom',direction=undefined,height='30%',blurLevels=[0.5,1,2,4,8,16,32,64],children='',attrs={}}={}) {
  const pos = position || direction || 'bottom';
  const levels = Array.isArray(blurLevels) && blurLevels.length ? blurLevels : [0.5, 1, 2, 4, 8, 16, 32, 64];

  function renderLayers(dir) {
    const n = levels.length;
    if (n <= 1) {
      const lvl = levels[0] || 16;
      return `<div class="s-progressive-blur-layer" style="backdrop-filter:blur(${lvl}px);-webkit-backdrop-filter:blur(${lvl}px);z-index:1;"></div>`;
    }
    const step = 100 / n;
    let html = '';

    const firstMask = `linear-gradient(to ${dir}, rgba(0,0,0,0) 0%, rgba(0,0,0,1) ${step.toFixed(1)}%, rgba(0,0,0,1) ${(step * 2).toFixed(1)}%, rgba(0,0,0,0) ${(step * 3).toFixed(1)}%)`;
    html += `<div class="s-progressive-blur-layer" style="z-index:1;backdrop-filter:blur(${levels[0]}px);-webkit-backdrop-filter:blur(${levels[0]}px);mask-image:${firstMask};-webkit-mask-image:${firstMask};"></div>`;

    for (let i = 1; i < n - 1; i++) {
      const start = (i * step).toFixed(1);
      const mid = ((i + 1) * step).toFixed(1);
      const end = ((i + 2) * step).toFixed(1);
      const fadeOut = Math.min(100, (i + 3) * step).toFixed(1);
      const mask = `linear-gradient(to ${dir}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${fadeOut}%)`;
      html += `<div class="s-progressive-blur-layer" style="z-index:${i + 1};backdrop-filter:blur(${levels[i]}px);-webkit-backdrop-filter:blur(${levels[i]}px);mask-image:${mask};-webkit-mask-image:${mask};"></div>`;
    }

    const lastStart = (100 - step).toFixed(1);
    const lastMask = `linear-gradient(to ${dir}, rgba(0,0,0,0) ${lastStart}%, rgba(0,0,0,1) 100%)`;
    html += `<div class="s-progressive-blur-layer" style="z-index:${n};backdrop-filter:blur(${levels[n - 1]}px);-webkit-backdrop-filter:blur(${levels[n - 1]}px);mask-image:${lastMask};-webkit-mask-image:${lastMask};"></div>`;

    return html;
  }

  const heightVal = typeof height === 'number' ? `${height}px` : (height || '30%');

  let blurMarkup = '';
  if (pos === 'both') {
    blurMarkup = `<div class="s-progressive-blur s-progressive-blur--top" style="--blur-height:${heightVal};" aria-hidden="true">${renderLayers('top')}</div>` +
                 `<div class="s-progressive-blur s-progressive-blur--bottom" style="--blur-height:${heightVal};" aria-hidden="true">${renderLayers('bottom')}</div>`;
  } else {
    const isHorizontal = pos === 'left' || pos === 'right';
    const styleProp = isHorizontal ? `--blur-width:${heightVal};` : `--blur-height:${heightVal};`;
    blurMarkup = `<div class="s-progressive-blur s-progressive-blur--${pos}" style="${styleProp}" aria-hidden="true">${renderLayers(pos)}</div>`;
  }

  if (children) {
    return raw('<div'+attributes({class:'s-progressive-blur-wrap',...attrs})+'>'+render(children)+blurMarkup+'</div>');
  }

  return raw('<div'+attributes({class:'s-progressive-blur-container'+(pos==='both'?' s-progressive-blur-both':''),...attrs})+'>'+blurMarkup+'</div>');
}
export function HyperText({text='SARAHUI DESIGN',duration=800,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-hyper-text','data-s-hyper-text':escapeText(text),'data-duration':String(duration),...attrs})+'>'+escapeText(text)+'</span>');
}
export function MorphingText({texts=['Hello','Morphing','Text','Animation','Smooth','Transition'],attrs={}}={}) {
  const arr=Array.isArray(texts)&&texts.length?texts:['Hello','Morphing','Text','Animation','Smooth','Transition'];
  return raw('<div'+attributes({class:'s-morphing-text-wrap',...attrs})+'><svg class="s-morphing-svg" aria-hidden="true" style="position:fixed;height:0;width:0;"><defs><filter id="threshold"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"/></filter></defs></svg><div class="s-morphing-text" data-s-morphing-text="'+escapeText(JSON.stringify(arr))+'"><span class="s-morph-text-1">'+escapeText(arr[0])+'</span><span class="s-morph-text-2">'+escapeText(arr[1]||arr[0])+'</span></div></div>');
}
export function AnimatedGradientText({text='Introducing Magic Gradient Text',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-anim-gradient-text',...attrs})+'>'+escapeText(text)+'</span>');
}
export function LineShadowText({text='SHADOW TEXT',shadowColor='#5B3DF5',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-line-shadow-text','data-text':text,style:shadowColor?`--shadow-color:${shadowColor};`:null,...attrs})+'>'+escapeText(text)+'</span>');
}
export function AuroraText({text='Aurora Borealis',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-aurora-text',...attrs})+'>'+escapeText(text)+'</span>');
}
export function Sheet({id,title='Navigation Sheet',description='',position='right',children='',footer='',attrs={}}={}) {
  id=uid('sheet',id);position=choice(position,['right','left','top','bottom'],'right');
  return raw('<dialog'+attributes({id,class:'s-dialog s-sheet s-sheet--'+position,'aria-labelledby':id+'-title','aria-describedby':description?id+'-desc':null,...attrs})+'><div class="s-dialog-backdrop" aria-hidden="true"></div><div class="s-sheet-card"><header class="s-dialog-header"><div><h2 id="'+id+'-title" class="s-dialog-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+id+'-desc" class="s-dialog-description">'+escapeText(description)+'</p>':'')+'</div><button type="button" class="s-button s-icon-button s-button--ghost s-button--sm" data-s-dialog-close aria-label="Close sheet">'+render(Icon({name:'close',size:16}))+'</button></header><div class="s-sheet-body">'+render(children)+'</div>'+(footer?'<footer class="s-dialog-footer">'+render(footer)+'</footer>':'')+'</div></dialog>');
}
export function ContextMenu({id,items=[],trigger='',attrs={}}={}) {
  id=uid('ctxmenu',id);
  const list=(Array.isArray(items)?items:[]).map(item=>`<button type="button" class="s-menu-item${item.danger?' s-menu-item--danger':''}" role="menuitem" data-value="${escapeText(item.value||item.label)}">${item.icon?render(Icon({name:item.icon,size:15}))+' ':''}<span>${escapeText(item.label)}</span></button>`).join('');
  return raw('<div'+attributes({class:'s-context-menu-wrap','data-s-context-menu':id,...attrs})+'>'+render(trigger)+'<div id="'+id+'" class="s-menu s-context-menu-panel" role="menu" hidden>'+list+'</div></div>');
}
export function HoverCard({trigger='',content='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-hover-card-wrap','data-s-hover-card':true,...attrs})+'><div class="s-hover-card-trigger">'+render(trigger)+'</div><div class="s-hover-card-content" hidden>'+render(content)+'</div></div>');
}
export function Collapsible({title='Can I use this with any framework?',content='',open=false,attrs={}}={}) {
  return raw('<details'+attributes({class:'s-collapsible',open:open||null,...attrs})+'><summary class="s-collapsible-trigger"><span>'+escapeText(title)+'</span>'+render(Icon({name:'chevron',size:16}))+'</summary><div class="s-collapsible-content"><div class="s-collapsible-inner">'+render(content)+'</div></div></details>');
}

export function Android({width=300,height=600,src='',videoSrc='',attrs={}}={}) {
  const media = videoSrc
    ? `<div class="s-device-screen"><video src="${safeHref(videoSrc)}" class="s-device-video" autoplay loop muted playsinline></video></div>`
    : (src ? `<div class="s-device-screen"><img src="${safeHref(src)}" alt="Android screen" class="s-device-img"></div>` : `<div class="s-device-screen s-device-screen--placeholder"><div class="s-device-placeholder-content"><div class="s-device-app-bar"><span>9:41</span><div class="s-device-icons"><span>●●●</span></div></div><div class="s-device-body-demo"><div class="s-device-card-demo"></div><div class="s-device-card-demo"></div></div></div></div>`);
  return raw('<div'+attributes({class:'s-android-mockup',style:`--device-w:${width}px;--device-h:${height}px;`,...attrs})+'><div class="s-android-frame"><div class="s-android-notch"><span class="s-android-camera"></span></div>'+media+'</div></div>');
}

export function Iphone({width=300,height=600,src='',videoSrc='',attrs={}}={}) {
  const media = videoSrc
    ? `<div class="s-device-screen"><video src="${safeHref(videoSrc)}" class="s-device-video" autoplay loop muted playsinline></video></div>`
    : (src ? `<div class="s-device-screen"><img src="${safeHref(src)}" alt="iPhone screen" class="s-device-img"></div>` : `<div class="s-device-screen s-device-screen--placeholder"><div class="s-device-island"></div><div class="s-device-placeholder-content"><div class="s-device-app-bar"><span>9:41</span><div class="s-device-icons"><span>⚡️ 5G</span></div></div><div class="s-device-body-demo"><div class="s-device-card-demo"></div><div class="s-device-card-demo"></div></div></div></div>`);
  return raw('<div'+attributes({class:'s-iphone-mockup',style:`--device-w:${width}px;--device-h:${height}px;`,...attrs})+'><div class="s-iphone-frame"><div class="s-iphone-speaker"></div><div class="s-iphone-dynamic-island"></div>'+media+'<div class="s-iphone-home-bar"></div></div></div>');
}

export function Safari({url='https://sarahui.dev',imageSrc='',videoSrc='',mode='default',children='',attrs={}}={}) {
  const media = videoSrc
    ? `<video src="${safeHref(videoSrc)}" class="s-safari-video" autoplay loop muted playsinline></video>`
    : (imageSrc ? `<img src="${safeHref(imageSrc)}" alt="Safari viewport" class="s-safari-img">` : (children ? render(children) : `<div class="s-safari-placeholder"><div class="s-safari-content-hero"><div class="s-safari-badge">sarahUI v1.0</div><h2>Modern Design System</h2><p>Zero dependencies, pure CSS tokens & accessible primitives.</p></div></div>`));
  return raw('<div'+attributes({class:'s-safari-mockup s-safari--'+choice(mode,['default','simple'],'default'),...attrs})+'><div class="s-safari-header"><div class="s-safari-traffic-lights"><span class="s-safari-dot s-dot-red"></span><span class="s-safari-dot s-dot-yellow"></span><span class="s-safari-dot s-dot-green"></span></div><div class="s-safari-address-bar"><svg class="s-safari-lock" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span class="s-safari-url">'+escapeText(url)+'</span><button type="button" class="s-safari-reload" aria-label="Reload page">'+render(Icon({name:'refresh',size:12}))+'</button></div><div class="s-safari-actions"><button type="button" aria-label="Share">'+render(Icon({name:'link',size:13}))+'</button></div></div><div class="s-safari-viewport">'+media+'</div></div>');
}

export function GlareHover({children='',color='#ffffff',opacity=0.35,angle=-45,size=250,duration=650,playOnce=false,className='',attrs={}}={}) {
  const style=`--gh-angle:${angle}deg;--gh-duration:${duration}ms;--gh-size:${size}%;--gh-color:${color};--gh-opacity:${opacity};`;
  return raw('<div'+attributes({class:'s-glare-hover'+(playOnce?' s-glare-hover--once':'')+' '+(className||''),style,...attrs})+'><div class="s-glare-hover-surface">'+render(children)+'</div><div class="s-glare-hover-glare" aria-hidden="true"></div></div>');
}

export function Backlight({children='',blur=20,attrs={}}={}) {
  const id=uid('backlight');
  return raw('<div'+attributes({class:'s-backlight-wrap',...attrs})+'><svg class="s-backlight-filter" width="0" height="0" aria-hidden="true"><defs><filter id="'+id+'" y="-50%" x="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="'+blur+'" result="blurred"></feGaussianBlur><feColorMatrix type="saturate" in="blurred" values="4"></feColorMatrix><feComposite in="SourceGraphic" operator="over"></feComposite></filter></defs></svg><div class="s-backlight-content" style="filter:url(#'+id+');">'+render(children)+'</div></div>');
}

export function Floating3DParticles({quantity=120,color='#8B5CF6',size=4,opacity=0.35,drift=0.8,depth=0.5,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-floating-3d-particles','aria-hidden':'true',...attrs})+'><canvas class="s-floating-particles-canvas" data-s-floating-particles data-quantity="'+quantity+'" data-color="'+escapeText(color)+'" data-size="'+size+'" data-opacity="'+opacity+'" data-drift="'+drift+'" data-depth="'+depth+'"></canvas></div>');
}

export function LightRays({count=7,color='rgba(160, 210, 255, 0.2)',blur=36,speed=14,length='70vh',attrs={}}={}) {
  const rays=Array.from({length:count},(_,i)=>{
    const left=10+((i*83)%80);
    const rotate=-25+((i*17)%50);
    const width=140+((i*29)%140);
    const duration=speed*(0.8+((i*0.1)%0.5));
    const delay=(i*0.7)%speed;
    return `<div class="s-light-ray" style="--ray-left:${left}%;--ray-rot:${rotate}deg;--ray-width:${width}px;--ray-dur:${duration.toFixed(1)}s;--ray-delay:${delay.toFixed(1)}s;"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-light-rays',style:`--light-rays-color:${color};--light-rays-blur:${blur}px;--light-rays-length:${length};`,'aria-hidden':'true',...attrs})+'><div class="s-light-rays-glow"></div>'+rays+'</div>');
}

export function AnimatedThemeToggler({variant='circle',duration=400,fromCenter=false,attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-animated-theme-toggler s-button s-icon-button s-button--outline s-button--md','data-s-theme-toggler':variant,'data-duration':String(duration),'data-from-center':fromCenter?'true':'false','aria-label':'Toggle theme',...attrs})+'><span class="s-theme-icon-sun">'+render(Icon({name:'sun',size:18}))+'</span><span class="s-theme-icon-moon">'+render(Icon({name:'moon',size:18}))+'</span></button>');
}

export function ComicText({text='BOOM!',fontSize=3.5,dotColor='#EF4444',backgroundColor='#FACC15',attrs={}}={}) {
  const style=`--comic-font-size:${fontSize}rem;--comic-dot-color:${dotColor};--comic-bg-color:${backgroundColor};`;
  return raw('<div'+attributes({class:'s-comic-text',style,...attrs})+'>'+escapeText(text)+'</div>');
}

export function KineticText({text='KINETIC',as='h2',attrs={}}={}) {
  const letters=String(text).split('').map(char=>`<span class="s-kinetic-char" aria-hidden="true">${char===' '?'&nbsp;':escapeText(char)}</span>`).join('');
  return raw('<'+as+attributes({class:'s-kinetic-text',...attrs})+'>'+letters+'<span class="s-sr-only">'+escapeText(text)+'</span></'+as+'>');
}

export function DiaTextReveal({text='DYNAMIC REVEAL',colors=['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7'],duration=1.5,repeat=false,attrs={}}={}) {
  const texts=Array.isArray(text)?text:[text];
  const colorStr=(Array.isArray(colors)?colors:['#c679c4','#fa3d1d','#ffb005','#e1e1fe','#0358f7']).join(',');
  return raw('<span'+attributes({class:'s-dia-text-reveal','data-s-dia-reveal':escapeText(JSON.stringify(texts)),'data-colors':escapeText(colorStr),'data-duration':String(duration),'data-repeat':repeat?'true':'false',...attrs})+'>'+escapeText(texts[0])+'</span>');
}

export function SpinningText({text='SARAHUI • CREATIVE • ANIMATIONS • ',duration=10,reverse=false,radius=5,attrs={}}={}) {
  const letters=String(text).split('');
  const total=letters.length;
  const spans=letters.map((char,i)=>`<span class="s-spinning-char" aria-hidden="true" style="--index:${i};--total:${total};--radius:${radius};">${char===' '?'&nbsp;':escapeText(char)}</span>`).join('');
  return raw('<div'+attributes({class:'s-spinning-text'+(reverse?' s-spinning-reverse':''),style:`--spin-dur:${duration}s;`,...attrs})+'>'+spans+'<span class="s-sr-only">'+escapeText(text)+'</span></div>');
}

export function Text3DFlip({text='',words=null,frontText='',backText='',rotateDirection='right',attrs={}}={}) {
  const resolvedText = text || (Array.isArray(words) ? words.join(' ') : (frontText ? frontText + (backText ? ' ' + backText : '') : 'FLIP 3D EFFECT'));
  const wordList=String(resolvedText).split(' ');
  let charIdx=0;
  const wordSpans=wordList.map((word,wIdx)=>{
    const charElements=word.split('').map(c=>{
      const elem=`<span class="s-flip-char-box" style="--char-i:${charIdx};"><span class="s-flip-front">${escapeText(c)}</span><span class="s-flip-back">${escapeText(c)}</span></span>`;
      charIdx++;
      return elem;
    }).join('');
    return `<span class="s-flip-word">${charElements}</span>`+(wIdx<wordList.length-1?'<span class="s-flip-space">&nbsp;</span>':'');
  }).join('');
  return raw('<div'+attributes({class:'s-text-3d-flip s-flip--'+choice(rotateDirection,['right','left','top','bottom'],'right'),'data-s-text-flip':true,...attrs})+'>'+wordSpans+'<span class="s-sr-only">'+escapeText(resolvedText)+'</span></div>');
}

export function TextAnimate({text='Modern Animated Typography',animation='blurInUp',by='word',duration=0.6,delay=0,attrs={}}={}) {
  const anim=choice(animation,['fadeIn','blurIn','blurInUp','blurInDown','slideUp','slideDown','slideLeft','slideRight','scaleUp','scaleDown'],'blurInUp');
  const splitBy=choice(by,['word','character','line','text'],'word');
  let segments=[];
  if(splitBy==='word') segments=String(text).split(/(\s+)/);
  else if(splitBy==='character') segments=String(text).split('');
  else if(splitBy==='line') segments=String(text).split('\n');
  else segments=[text];

  const count=segments.length;
  const spans=segments.map((seg,i)=>{
    const d=delay+(i*(duration/Math.max(1,count)));
    return `<span class="s-anim-segment s-anim-${anim}" style="animation-delay:${d.toFixed(2)}s;animation-duration:${(duration*0.8).toFixed(2)}s;" aria-hidden="true">${seg===' '?'&nbsp;':escapeText(seg)}</span>`;
  }).join('');

  return raw('<div'+attributes({class:'s-text-animate s-text-animate--'+splitBy,...attrs})+'>'+spans+'<span class="s-sr-only">'+escapeText(text)+'</span></div>');
}

export function VideoText({text='OCEAN',src='https://cdn.magicui.design/ocean-small.webm',videoSrc='',fontSize=12,attrs={}}={}) {
  const safeSrc = safeHref(videoSrc || src || 'https://cdn.magicui.design/ocean-small.webm');
  const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='160' font-weight='900' font-family='system-ui, -apple-system, sans-serif' text-anchor='middle' dominant-baseline='middle' fill='%23000'>${escapeText(text)}</text></svg>`;
  const maskUri = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  const style = `mask-image:${maskUri};-webkit-mask-image:${maskUri};mask-size:contain;mask-repeat:no-repeat;mask-position:center;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;`;
  return raw('<div'+attributes({class:'s-video-text',...attrs})+'><video class="s-video-text-bg" src="'+safeSrc+'" style="'+style+'" autoplay loop muted playsinline aria-label="'+escapeText(text)+'"></video><span class="s-video-text-fallback" style="position:absolute;font-size:clamp(3.5rem,8vw,6rem);font-weight:900;letter-spacing:0.02em;background:linear-gradient(135deg,#0284c7,#0d9488,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;pointer-events:none;z-index:0;">'+escapeText(text)+'</span></div>');
}

export function Highlighter({text='innovative design systems',action='highlight',color='#ffd1dc',strokeWidth=2,attrs={}}={}) {
  const act=choice(action,['highlight','underline','box','circle','strike-through','bracket'],'highlight');
  return raw('<span'+attributes({class:'s-highlighter s-highlighter--'+act,style:`--highlight-color:${color};--highlight-stroke:${strokeWidth}px;`,'data-s-highlighter':act,...attrs})+'><span class="s-highlighter-content">'+escapeText(text)+'</span><svg class="s-highlighter-svg" aria-hidden="true"><path class="s-highlighter-path" fill="none"></path></svg></span>');
}

export function ScrollBasedVelocity({text='SARAHUI ZERO DEPENDENCIES HIGH PERFORMANCE',images=[],baseVelocity=5,direction=1,attrs={}}={}) {
  let row1, row2;
  if(Array.isArray(images) && images.length){
    const imgs1 = images.slice(0, Math.ceil(images.length/2));
    const imgs2 = images.slice(Math.ceil(images.length/2));
    const renderImgs = arr => arr.map(src=>`<img src="${safeHref(src)}" alt="Velocity item" class="s-velocity-img-item" loading="lazy">`).join('');
    row1 = renderImgs(imgs1.concat(imgs1));
    row2 = renderImgs(imgs2.concat(imgs2));
  } else {
    row1=Array.from({length:4},()=>`<span class="s-velocity-item">${escapeText(text)}&nbsp;·&nbsp;</span>`).join('');
    row2=Array.from({length:4},()=>`<span class="s-velocity-item">${escapeText(text)}&nbsp;·&nbsp;</span>`).join('');
  }
  return raw('<div'+attributes({class:'s-scroll-velocity','data-s-scroll-velocity':true,'data-base-velocity':String(baseVelocity),'data-direction':String(direction),...attrs})+'><div class="s-velocity-track s-velocity-track-1"><div class="s-velocity-slide">'+row1+'</div><div class="s-velocity-slide" aria-hidden="true">'+row1+'</div></div><div class="s-velocity-track s-velocity-track-2"><div class="s-velocity-slide">'+row2+'</div><div class="s-velocity-slide" aria-hidden="true">'+row2+'</div></div></div>');
}

export function AnimatedSubscribeButton({initialText='Subscribe',subscribedText='Subscribed',isSubscribed=false,attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-animated-subscribe-btn'+(isSubscribed?' s-subscribed':''),'data-s-subscribe-btn':true,'aria-pressed':isSubscribed?'true':'false',...attrs})+'><span class="s-subscribe-initial"><span class="s-sub-icon">'+render(Icon({name:'bell',size:15}))+'</span><span>'+escapeText(initialText)+'</span></span><span class="s-subscribe-active"><span class="s-sub-icon">'+render(Icon({name:'check',size:15}))+'</span><span>'+escapeText(subscribedText)+'</span></span></button>');
}

export function ShinyButton({label='Shiny Action',icon='',trailing='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-shiny-button',...attrs})+'><span class="s-shiny-button-content">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</span><span class="s-shiny-button-sweep" aria-hidden="true"></span></button>');
}

export function RippleButton({label='Click For Ripple',rippleColor='rgba(255,255,255,0.4)',duration='600ms',icon='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-ripple-button','data-s-ripple':true,style:`--ripple-color:${rippleColor};--ripple-duration:${duration};`,...attrs})+'><span class="s-ripple-button-label">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+escapeText(label)+'</span><span class="s-ripple-surface" aria-hidden="true"></span></button>');
}

export function CodeComparison({filename='Component.js',beforeCode='// Before\nconst btn = document.querySelector("button");\nbtn.onclick = () => doWork();',afterCode='// After with sarahUI\nimport { Button } from "sarahui";\nrender(Button({ label: "Action" }));',language='javascript',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-code-comparison',...attrs})+'><div class="s-comparison-grid"><div class="s-comparison-side s-comparison-left"><div class="s-comparison-header">'+render(Icon({name:'code',size:14}))+'<span class="s-comparison-filename">'+escapeText(filename)+'</span><span class="s-comparison-tag">before</span></div><div class="s-comparison-body"><pre class="s-comparison-pre"><code>'+escapeText(beforeCode)+'</code></pre></div></div><div class="s-comparison-side s-comparison-right"><div class="s-comparison-header">'+render(Icon({name:'code',size:14}))+'<span class="s-comparison-filename">'+escapeText(filename)+'</span><span class="s-comparison-tag s-tag-after">after</span></div><div class="s-comparison-body"><pre class="s-comparison-pre"><code>'+escapeText(afterCode)+'</code></pre></div></div></div><div class="s-comparison-badge" aria-hidden="true">VS</div></div>');
}

export function FileTree({elements=[{id:'src',name:'src',type:'folder',children:[{id:'index',name:'index.js',type:'file'},{id:'styles',name:'styles.css',type:'file'},{id:'components',name:'components',type:'folder',children:[{id:'Button',name:'Button.js',type:'file'},{id:'Card',name:'Card.js',type:'file'}]}]}],initialExpanded=['src','components'],attrs={}}={}) {
  function renderTree(nodes,level=0) {
    return (Array.isArray(nodes)?nodes:[]).map(node=>{
      if(node.type==='folder') {
        const isExp=initialExpanded.includes(node.id);
        const childrenMarkup=node.children?renderTree(node.children,level+1):'';
        return `<div class="s-tree-folder${isExp?' s-tree-folder--open':''}" data-tree-id="${escapeText(node.id)}"><button type="button" class="s-tree-trigger" data-s-tree-folder><span class="s-tree-icon s-folder-icon">${render(Icon({name:'folder',size:15}))}</span><span class="s-tree-name">${escapeText(node.name)}</span></button><div class="s-tree-children" role="group">${childrenMarkup}</div></div>`;
      }
      return `<div class="s-tree-file" data-tree-id="${escapeText(node.id)}"><button type="button" class="s-tree-trigger" data-s-tree-file><span class="s-tree-icon s-file-icon">${render(Icon({name:'code',size:14}))}</span><span class="s-tree-name">${escapeText(node.name)}</span></button></div>`;
    }).join('');
  }
  return raw('<div'+attributes({class:'s-file-tree','data-s-file-tree':true,...attrs})+'><div class="s-file-tree-actions"><button type="button" class="s-tree-toggle-all" data-s-tree-toggle-all><span>Expand / Collapse All</span></button></div><div class="s-file-tree-content" role="tree">'+renderTree(elements)+'</div></div>');
}

export function HeroVideoDialog({
  videoSrc = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailSrc = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  thumbnailAlt = 'Video thumbnail',
  animationStyle = 'from-center',
  className = '',
  attrs = {}
} = {}) {
  const id = uid('videodialog');
  const extraClass = className ? ` ${className}` : '';
  const animStyle = choice(animationStyle, [
    'from-center',
    'from-bottom',
    'from-top',
    'from-left',
    'from-right',
    'fade',
    'top-in-bottom-out',
    'left-in-right-out'
  ], 'from-center');

  return raw('<div' + attributes({ class: 's-hero-video-wrap' + extraClass, ...attrs }) + '>' +
    '<button type="button" class="s-hero-video-thumbnail" data-s-video-open="' + id + '" aria-label="Play video">' +
      '<img src="' + safeHref(thumbnailSrc) + '" alt="' + escapeText(thumbnailAlt) + '" class="s-hero-video-img">' +
      '<div class="s-hero-video-play-backdrop">' +
        '<div class="s-hero-video-play-halo">' +
          '<div class="s-hero-video-play-btn">' +
            '<svg class="s-hero-video-play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</button>' +
    '<dialog id="' + id + '" class="s-dialog s-video-modal s-video-anim--' + animStyle + '" data-video-src="' + safeHref(videoSrc) + '">' +
      '<div class="s-dialog-backdrop" data-s-dialog-close aria-hidden="true"></div>' +
      '<div class="s-video-modal-content">' +
        '<button type="button" class="s-video-modal-close" data-s-dialog-close aria-label="Close video">' +
          render(Icon({ name: 'close', size: 18 })) +
        '</button>' +
        '<div class="s-video-modal-frame">' +
          '<iframe src="" title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +
      '</div>' +
    '</dialog>' +
  '</div>');
}

export function IconCloud({
  images = null,
  iconSlugs = null,
  slugs = null,
  icons = null,
  showControl = true,
  className = '',
  attrs = {}
} = {}) {
  const defaultSlugs = [
    'typescript', 'javascript', 'dart', 'java', 'react', 'flutter', 'android',
    'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs', 'prisma', 'amazonaws',
    'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest', 'cypress',
    'docker', 'git', 'jira', 'github', 'gitlab', 'visualstudiocode', 'androidstudio',
    'sonarqube', 'figma'
  ];

  let resolvedImages = images;
  if (!resolvedImages) {
    const sourceSlugs = iconSlugs || slugs || (Array.isArray(icons) && typeof icons[0] === 'string' ? icons : defaultSlugs);
    if (Array.isArray(sourceSlugs)) {
      resolvedImages = sourceSlugs.map(slug => {
        const s = String(slug).toLowerCase().trim();
        return `https://cdn.simpleicons.org/${s}/${s}`;
      });
    }
  }

  const extraClass = className ? ` ${className}` : '';

  return raw('<div' + attributes({
    class: 's-icon-cloud-wrap' + extraClass,
    ...attrs
  }) + '>' +
    `<canvas class="s-icon-cloud-canvas" data-s-icon-cloud ` +
    `data-images="${escapeText(JSON.stringify(resolvedImages || []))}" ` +
    `width="340" height="340" role="img" aria-label="Interactive 3D Icon Cloud"></canvas>` +
    (showControl ? `<button type="button" class="s-icon-cloud-ctrl" data-s-cloud-toggle aria-label="Pause animation" title="Pause animation"><span class="s-icon-cloud-ctrl-icon">${render(Icon({ name: 'pause', size: 14 }))}</span></button>` : '') +
  '</div>');
}

export function Lens({
  children = '',
  zoomFactor = 1.5,
  zoom = undefined,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition = undefined,
  duration = 0.15,
  lensColor = 'black',
  ariaLabel = 'Zoom Area',
  className = '',
  attrs = {}
} = {}) {
  const finalZoom = zoom !== undefined ? Number(zoom) : (zoomFactor !== undefined ? Number(zoomFactor) : 1.5);
  const size = Number(lensSize) || 170;
  const radius = Math.round(size / 2);
  const dur = typeof duration === 'number' ? `${duration}s` : (duration || '0.15s');

  const staticPos = position && typeof position === 'object' ? position : { x: 0, y: 0 };
  const defPos = defaultPosition && typeof defaultPosition === 'object' ? defaultPosition : null;

  let initialX = null;
  let initialY = null;
  if (isStatic) {
    initialX = typeof staticPos.x === 'number' ? staticPos.x : radius;
    initialY = typeof staticPos.y === 'number' ? staticPos.y : radius;
  } else if (defPos) {
    initialX = typeof defPos.x === 'number' ? defPos.x : radius;
    initialY = typeof defPos.y === 'number' ? defPos.y : radius;
  }

  const customStyle = [
    `--lens-size: ${size}px;`,
    `--lens-radius: ${radius}px;`,
    `--lens-zoom: ${finalZoom};`,
    `--lens-duration: ${dur};`,
    `--lens-color: ${lensColor};`,
    initialX !== null ? `--lens-x: ${initialX}px;` : '',
    initialY !== null ? `--lens-y: ${initialY}px;` : '',
    attrs.style || ''
  ].filter(Boolean).join(' ');

  const mergedAttrs = {
    class: ['s-lens-container', className].filter(Boolean).join(' '),
    'data-s-lens': true,
    'data-zoom': String(finalZoom),
    'data-size': String(size),
    'data-static': isStatic ? 'true' : 'false',
    ...(defPos ? { 'data-default-x': String(defPos.x), 'data-default-y': String(defPos.y) } : {}),
    ...(isStatic ? { 'data-initial-x': String(initialX), 'data-initial-y': String(initialY) } : {}),
    role: 'region',
    'aria-label': ariaLabel,
    tabindex: '0',
    ...attrs,
    style: customStyle
  };

  const renderedChildren = render(children);

  return raw(
    '<div' + attributes(mergedAttrs) + '>' +
      '<div class="s-lens-target">' + renderedChildren + '</div>' +
      '<div class="s-lens-overlay" aria-hidden="true">' +
        '<div class="s-lens-zoomed">' + renderedChildren + '</div>' +
      '</div>' +
      '<div class="s-lens-loupe" aria-hidden="true"></div>' +
    '</div>'
  );
}

export function PixelImage({src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',grid='6x4',grayscaleAnimation=true,attrs={}}={}) {
  const [cols,rows]=grid==='8x8'?[8,8]:grid==='4x6'?[4,6]:grid==='8x3'?[8,3]:[6,4];
  const total=cols*rows;
  const pieces=Array.from({length:total},(_,i)=>{
    const r=Math.floor(i/cols);
    const c=i%cols;
    const clip=`polygon(${c*(100/cols)}% ${r*(100/rows)}%, ${(c+1)*(100/cols)}% ${r*(100/rows)}%, ${(c+1)*(100/cols)}% ${(r+1)*(100/rows)}%, ${c*(100/cols)}% ${(r+1)*(100/rows)}%)`;
    const delay=Math.random()*800;
    return `<div class="s-pixel-piece" style="clip-path:${clip};animation-delay:${delay.toFixed(0)}ms;"><img src="${safeHref(src)}" alt="Pixel piece" class="s-pixel-img${grayscaleAnimation?' s-pixel-gray':''}"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-pixel-image-wrap',...attrs})+'>'+pieces+'</div>');
}

export function GlyphMatrix({glyphs='01·•+*/\\<>=',cellSize=14,mutationRate=0.04,interval=90,color='#6B7280',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-glyph-matrix-wrap','aria-hidden':'true',...attrs})+'><canvas class="s-glyph-matrix-canvas" data-s-glyph-matrix data-glyphs="'+escapeText(glyphs)+'" data-cell-size="'+cellSize+'" data-mutation-rate="'+mutationRate+'" data-interval="'+interval+'" data-color="'+escapeText(color)+'"></canvas></div>');
}

export function DottedMap({
  width = 800,
  height = 400,
  dotRadius = 1.6,
  dotSize = undefined,
  dotColor = 'currentColor',
  markerColor = '#FF6900',
  markers = [],
  points = [],
  lines = [],
  routes = [],
  connections = [],
  glow = true,
  className = '',
  attrs = {}
} = {}) {
  const rDot = dotSize !== undefined ? Number(dotSize) : (Number(dotRadius) || 1.6);
  const w = Number(width) || 800;
  const h = Number(height) || 400;
  const extraClass = className ? ` ${className}` : '';

  const markerList = (Array.isArray(markers) && markers.length) ? markers : ((Array.isArray(points) && points.length) ? points : [
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
  ]);

  const lineList = (Array.isArray(lines) && lines.length) ? lines : ((Array.isArray(routes) && routes.length) ? routes : ((Array.isArray(connections) && connections.length) ? connections : []));

  function isLand(lat, lng) {
    if (lat >= 59 && lat <= 83 && lng >= -73 && lng <= -12) {
      if (lat >= 78 && lng < -55) return false;
      if (lat < 65 && lng > -35 && lng < -25) return false;
      return true;
    }
    if (lat >= 52 && lat <= 71 && lng >= -168 && lng <= -130) {
      if (lat < 58 && lng > -140) return false;
      return true;
    }
    if (lat >= 45 && lat <= 75 && lng >= -140 && lng <= -52) {
      if (lat >= 51 && lat <= 64 && lng >= -94 && lng <= -77) return false;
      if (lat >= 68 && lng > -105 && lng < -85) return false;
      return true;
    }
    if (lat >= 24.5 && lat <= 49.5 && lng >= -125 && lng <= -66) {
      if (lng < -120 && lat < 34) return false;
      if (lat < 32 && lng < -110 && (lat * 1.8 + lng < -50)) return false;
      if (lat < 30.5 && lng > -95 && lng < -83) return false;
      if (lat < 35 && lng > -75) return false;
      if (lat < 28 && lng < -82) return false;
      return true;
    }
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
    if (lat >= 17 && lat <= 24 && lng >= -85 && lng <= -64) {
      if (lat >= 21 && lat <= 23.5 && lng >= -85 && lng <= -74) return true;
      if (lat >= 17.5 && lat <= 20 && lng >= -74 && lng <= -68) return true;
      if (lat >= 17.5 && lat <= 18.5 && lng >= -67.5 && lng <= -65) return true;
      if (lat >= 17.5 && lat <= 18.5 && lng >= -78.5 && lng <= -76) return true;
    }
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
    if (lat >= 50 && lat <= 59.5 && lng >= -10.5 && lng <= 2) {
      if (lng > -5 && lat < 50.5) return false;
      if (lng < -6 && lat > 55.5 && lat < 57.5 && lng > -8) return false;
      return true;
    }
    if (lat >= 63.3 && lat <= 66.6 && lng >= -24.5 && lng <= -13.5) return true;
    if (lat >= 55 && lat <= 71.5 && lng >= 4.5 && lng <= 33) {
      if (lat >= 56 && lat <= 65 && lng >= 16 && lng <= 24) return false;
      if (lat < 58 && lng < 11.5) return false;
      return true;
    }
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
    if (lat >= 44 && lat <= 70 && lng >= 30 && lng <= 60) {
      if (lat >= 41 && lat <= 46.5 && lng >= 28 && lng <= 41.5) return false;
      if (lat >= 37 && lat <= 47 && lng >= 47 && lng <= 54) return false;
      return true;
    }
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
    if (lat >= -26 && lat <= -11.5 && lng >= 43 && lng <= 50.8) return true;
    if (lat >= 12 && lat <= 38 && lng >= 34 && lng <= 63) {
      if (lat >= 24 && lat <= 30 && lng >= 48.5 && lng <= 56) return false;
      if (lat < 12.5) return false;
      return true;
    }
    if (lat >= 36 && lat <= 55 && lng >= 50 && lng <= 88) {
      if (lat >= 37 && lat <= 47 && lng >= 47 && lng <= 54) return false;
      if (lat >= 44 && lat <= 46.5 && lng >= 58 && lng <= 61.5) return false;
      return true;
    }
    if (lat >= 48 && lat <= 77 && lng >= 60 && lng <= 180) {
      if (lat > 73 && lng > 140 && lng < 160) return false;
      if (lat >= 50 && lat <= 60 && lng >= 143 && lng <= 156) return false;
      return true;
    }
    if (lat >= 51 && lat <= 62 && lng >= 156 && lng <= 164) return true;
    if (lat >= 6 && lat <= 36 && lng >= 62 && lng <= 92) {
      if (lat < 22 && lng < 69) return false;
      if (lat < 22 && lng > 89) return false;
      if (lat < 16 && (lng < 73 || lng > 83)) return false;
      if (lat < 11 && (lng < 76 || lng > 80)) return false;
      if (lat < 8 && (lng < 77 || lng > 78.5)) return false;
      return true;
    }
    if (lat >= 5.8 && lat <= 9.8 && lng >= 79.5 && lng <= 82) return true;
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
    if (lat >= -39.2 && lat <= -10.5 && lng >= 113 && lng <= 153.8) {
      if (lat >= -17.5 && lat <= -11.5 && lng >= 135.5 && lng <= 141.5) return false;
      if (lat <= -32 && lat >= -37 && lng >= 124 && lng <= 136) return false;
      if (lat < -35 && lng < 136) return false;
      return true;
    }
    if (lat >= -43.8 && lat <= -40.5 && lng >= 144.5 && lng <= 148.5) return true;
    if (lat >= -47.5 && lat <= -34.5 && lng >= 166 && lng <= 179) {
      if (lat < -41.5 && lng > 175) return false;
      if (lat > -40.5 && lng < 173) return false;
      return true;
    }
    return false;
  }

  const cols = 100;
  const rows = 50;
  const dx = w / cols;
  const dy = h / rows;

  const dots = [];
  for (let r = 0; r < rows; r++) {
    const lat = 82 - (r / rows) * 155;
    for (let c = 0; c < cols; c++) {
      const lng = (c / cols) * 360 - 180;
      if (isLand(lat, lng)) {
        const cx = (c * dx + dx / 2).toFixed(1);
        const cy = (r * dy + dy / 2).toFixed(1);
        dots.push(`<circle cx="${cx}" cy="${cy}" r="${rDot}" fill="${escapeText(dotColor)}"/>`);
      }
    }
  }

  function project(pt) {
    if (!pt) return { x: 0, y: 0 };
    if (pt.lat !== undefined && pt.lng !== undefined) {
      const px = ((Number(pt.lng) + 180) / 360) * w;
      const py = ((82 - Number(pt.lat)) / 155) * h;
      return { x: Number(px.toFixed(1)), y: Number(py.toFixed(1)) };
    }
    return { x: Number(pt.x) || 0, y: Number(pt.y) || 0 };
  }

  const markerSvgs = markerList.map((m, i) => {
    const { x, y } = project(m);
    const mColor = m.color || markerColor || '#FF6900';
    const mSize = Number(m.size) || 3.5;
    const isPulse = m.pulse !== false;
    const lbl = m.label || (typeof m.overlay === 'object' ? m.overlay.label : (typeof m.overlay === 'string' ? m.overlay : ''));
    const country = m.country || m.countryCode || (typeof m.overlay === 'object' ? m.overlay.countryCode : '');
    const pillW = lbl ? lbl.length * 6.5 + (country ? 26 : 16) : 0;

    let pulseMarkup = '';
    if (isPulse) {
      pulseMarkup = `
        <circle cx="0" cy="0" r="${mSize}" fill="none" stroke="${escapeText(mColor)}" stroke-width="1.5" opacity="0.8">
          <animate attributeName="r" values="${mSize};${mSize * 4.2}" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="0" r="${mSize}" fill="none" stroke="${escapeText(mColor)}" stroke-width="1.2" opacity="0.6">
          <animate attributeName="r" values="${mSize};${mSize * 4.2}" dur="1.8s" begin="0.9s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0" dur="1.8s" begin="0.9s" repeatCount="indefinite"/>
        </circle>
      `;
    }

    return `
      <g class="s-map-marker" transform="translate(${x}, ${y})" data-marker-index="${i}">
        <circle cx="0" cy="0" r="${mSize}" fill="${escapeText(mColor)}"/>
        ${pulseMarkup}
        ${lbl ? `
          <g class="s-map-badge" transform="translate(8, -10)">
            <rect x="0" y="0" width="${pillW}" height="20" rx="10" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.18)" stroke-width="0.8"/>
            ${country ? `<clipPath id="s-flag-${i}"><circle cx="10" cy="10" r="5.5"/></clipPath><image href="https://flagcdn.com/w80/${escapeText(String(country).toLowerCase())}.webp" x="4.5" y="4.5" width="11" height="11" preserveAspectRatio="xMidYMid slice" clip-path="url(#s-flag-${i})"/>` : ''}
            <text x="${country ? 20 : 8}" y="13.5" font-size="9.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" fill="#ffffff">${escapeText(lbl)}</text>
          </g>
        ` : ''}
      </g>
    `;
  }).join('');

  const lineSvgs = lineList.map((line, idx) => {
    const fromPt = project(line.from || line.start);
    const toPt = project(line.to || line.end);
    const midX = (fromPt.x + toPt.x) / 2;
    const dist = Math.hypot(toPt.x - fromPt.x, toPt.y - fromPt.y);
    const midY = Math.min(fromPt.y, toPt.y) - dist * 0.22;
    const lColor = line.color || 'url(#s-map-flight-gradient)';
    return `
      <path d="M ${fromPt.x} ${fromPt.y} Q ${midX} ${midY} ${toPt.x} ${toPt.y}" fill="none" stroke="${escapeText(lColor)}" stroke-width="1.4" stroke-dasharray="4,4" opacity="0.6">
        <animate attributeName="stroke-dashoffset" values="32;0" dur="2s" repeatCount="indefinite"/>
      </path>
    `;
  }).join('');

  const svgContent = `
    <defs>
      <linearGradient id="s-map-flight-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${escapeText(markerColor)}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="var(--s-color-brand-500, #5B3DF5)" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <g class="s-map-dots" opacity="0.45">${dots.join('')}</g>
    ${lineSvgs ? `<g class="s-map-lines">${lineSvgs}</g>` : ''}
    <g class="s-map-markers">${markerSvgs}</g>
  `;

  return raw(
    '<div' + attributes({ class: 's-dotted-map-container' + extraClass, 'data-s-dotted-map': true, ...attrs }) + '>' +
      `<svg class="s-dotted-map" viewBox="0 0 ${w} ${h}" width="100%" height="100%" aria-hidden="true">${svgContent}</svg>` +
      (glow ? '<div class="s-dotted-map-vignette" aria-hidden="true"></div>' : '') +
    '</div>'
  );
}

export function Pointer({name='',color='#5B3DF5',cursor='',children='',content='',attrs={}}={}) {
  const pointerSvg = `<svg class="s-pointer-cursor" width="22" height="22" viewBox="0 0 16 16" fill="${color}" style="transform:rotate(-70deg);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.25));"><path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/></svg>`;
  const badge = name ? `<div class="s-pointer-badge" style="background:${color};"><span>${escapeText(name)}</span></div>` : '';
  const cursorGlyph = cursor ? render(cursor) : (children && !content ? render(children) : `${pointerSvg}${badge}`);
  const bodyContent = content ? render(content) : (children && cursor ? render(children) : '');
  return raw('<div'+attributes({class:'s-custom-pointer-wrap','data-s-pointer':true,...attrs})+'>'+bodyContent+'<div class="s-pointer-glyph" aria-hidden="true">'+cursorGlyph+'</div></div>');
}

export function SmoothCursor({
  cursor = '',
  color = 'currentColor',
  className = '',
  attrs = {}
} = {}) {
  const fillColor = color && color !== 'currentColor' ? color : 'currentColor';
  const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="54" viewBox="0 0 50 54" fill="none" style="transform: scale(0.5); transform-origin: center center; display: block;"><g filter="url(#s-filter-cursor)"><path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill="${escapeText(fillColor)}"/><path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke="var(--s-bg-canvas, #0B0D13)" stroke-width="2.25825"/></g><defs><filter id="s-filter-cursor" x="0.602397" y="0.952444" width="49.0584" height="52.428" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2.25825"/><feGaussianBlur stdDeviation="2.25825"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;

  const glyph = cursor ? render(cursor) : defaultSvg;
  const cls = ['s-smooth-cursor-container', className].filter(Boolean).join(' ');

  return raw(
    '<div' + attributes({ class: cls, 'data-s-smooth-cursor': true, 'aria-hidden': 'true', ...attrs }) + '>' +
      '<div class="s-smooth-cursor-follower">' + glyph + '</div>' +
    '</div>'
  );
}

const KNOWN_TWEETS = {
  '2095541863956742174': {
    name: 'Figma',
    handle: 'figma',
    avatar: 'https://pbs.twimg.com/profile_images/2068849889753333760/YE3KJq___normal.jpg',
    verified: true,
    text: 'Controlling opacity, now at scale (see?)\n\nEasily apply and adjust opacity to a linked color in the variables modal without needing to detach.',
    video: {
      src: 'https://video.twimg.com/amplify_video/2095531100940754944/vid/avc1/1280x720/aqEfN-LourstcF9k.mp4',
      poster: 'https://pbs.twimg.com/amplify_video_thumb/2095531100940754944/img/HbCLHG4-7DKexpMs.jpg'
    },
    postUrl: 'https://x.com/figma/status/2095541863956742174'
  },
  '2103111024257954291': {
    name: 'HONOR',
    handle: 'Honorglobal',
    avatar: 'https://pbs.twimg.com/profile_images/2080208705375932416/SJad_e7L_normal.jpg',
    verified: true,
    text: 'Happy 20th Birthday, Gerrard! 🎂\nGet well soon and come back stronger! May you always keep your courage, love the drive, and keep chasing your dreams on the track. See you back in action soon!',
    images: [
      'https://pbs.twimg.com/media/HS_AK-vbAAAsDsB.jpg',
      'https://pbs.twimg.com/media/HS_AM7laMAAMMPp.jpg',
      'https://pbs.twimg.com/media/HS_ANeGaEAAU5Kj.jpg'
    ],
    postUrl: 'https://x.com/Honorglobal/status/2103111024257954291'
  },
  '2075272590822625405': {
    name: 'Figma',
    handle: 'figma',
    avatar: 'https://pbs.twimg.com/profile_images/2068849889753333760/YE3KJq___normal.jpg',
    verified: true,
    text: 'GPT-5.6 from @OpenAI is available in Figma Make starting today\n\nEarly test results show\n→ Stronger outputs building from existing designs\n→ Greater token efficiency',
    video: {
      src: 'https://video.twimg.com/tweet_video/HMzZGqZW8AAdmFx.mp4',
      poster: 'https://pbs.twimg.com/tweet_video_thumb/HMzZGqZW8AAdmFx.jpg'
    },
    postUrl: 'https://x.com/figma/status/2075272590822625405'
  },
  '2103155873623540169': {
    name: 'Figma',
    handle: 'figma',
    avatar: 'https://pbs.twimg.com/profile_images/2068849889753333760/YE3KJq___normal.jpg',
    verified: true,
    text: 'Catch up on everything we shared in the notes: https://figma.bot/ReleaseNotes008',
    urlPreview: {
      domain: 'fig-events.figma.com',
      title: 'Release Notes',
      description: 'Join us for the latest updates, a Q&A with Yuhki Yamashita (Figma\'s Chief Product Officer), and plus, a few other surprises along the way',
      image: 'https://pbs.twimg.com/card_img/2103151818905980929/NPk0SiD_?format=jpg&name=420x420_2',
      url: 'https://fig-events.figma.com'
    },
    postUrl: 'https://x.com/figma/status/2103155873623540169'
  },
  '1668408059125702661': {
    name: 'Dillion',
    handle: 'dillionverma',
    avatar: 'https://pbs.twimg.com/profile_images/1902402394475880448/w8lUXnEe_normal.jpg',
    verified: true,
    text: 'Companies spend $30,000+ and several weeks to build beautiful landing pages like @linear, @wopehq and @reflectnotes 🤷‍♂️\n\nI built @reactjs + @tailwindcss components for you to do the same in hours, starting at just $29\n\nPre-order link + demo below 👇\n\n#buildinpublic @buildspace',
    video: {
      src: 'https://video.twimg.com/ext_tw_video/1668388166598787079/pu/vid/640x360/nYFKhWYN3GwKzWL1.mp4',
      poster: 'https://pbs.twimg.com/ext_tw_video_thumb/1668388166598787079/pu/img/mA7mfmJyXKLcGmo_.jpg'
    },
    postUrl: 'https://x.com/dillionverma/status/1668408059125702661'
  },
  '1678577280489234432': {
    name: 'Dillion',
    handle: 'dillionverma',
    avatar: 'https://pbs.twimg.com/profile_images/1902402394475880448/w8lUXnEe_normal.jpg',
    verified: true,
    text: 'first day at @_buildspace sf campus irl',
    images: [
      'https://pbs.twimg.com/media/F0uA8CkaUAAK8Ka.jpg',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
    ],
    postUrl: 'https://x.com/dillionverma/status/1678577280489234432'
  },
  '1675849118445436929': {
    name: 'Dillion',
    handle: 'dillionverma',
    avatar: 'https://pbs.twimg.com/profile_images/1902402394475880448/w8lUXnEe_normal.jpg',
    verified: true,
    text: 'it took an insane amount of effort to go from nothing to this in 2 weeks lmao\n\ni hope yall like it 🤝\n\nWhat components do you want to see next?\n\nhttps://magicuikit.com/components/magic-card',
    urlPreview: {
      domain: 'magicuikit.com',
      title: 'Magic Card - Magic UI',
      description: 'A spotlight effect that highlights the borders and content on mouse hover.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      url: 'https://magicuikit.com/components/magic-card'
    },
    postUrl: 'https://x.com/dillionverma/status/1675849118445436929'
  },
  '1441032681968212480': {
    name: 'Guillermo Rauch',
    handle: 'rauchg',
    avatar: 'https://pbs.twimg.com/profile_images/1783856060249595904/8NnJe4kF_normal.jpg',
    verified: true,
    text: 'Next.js 12 is coming soon.',
    postUrl: 'https://x.com/rauchg/status/1441032681968212480'
  }
};

function formatTweetText(text) {
  if (!text) return '';
  const escaped = escapeText(text);
  const withUrls = escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="s-tweet-link">$1</a>');
  const withMentions = withUrls.replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://x.com/$1" target="_blank" rel="noopener noreferrer" class="s-tweet-mention">@$1</a>');
  const withHashtags = withMentions.replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://x.com/hashtag/$1" target="_blank" rel="noopener noreferrer" class="s-tweet-hashtag">#$1</a>');
  return withHashtags.replace(/\r?\n/g, '<br />');
}

export function TweetCard({
  id='2095541863956742174',
  name='',
  authorName='',
  handle='',
  avatar='',
  verified=undefined,
  text='',
  content='',
  timestamp='',
  date='',
  likes='',
  retweets='',
  video=undefined,
  videoUrl='',
  mediaUrl='',
  media='',
  images=undefined,
  urlPreview=undefined,
  autoPlay=true,
  autoplay=true,
  muted=true,
  loop=true,
  controls=false,
  showFooter=false,
  className='',
  apiUrl='',
  attrs={}
}={}) {
  const tweetData = (id && KNOWN_TWEETS[id]) || (id ? null : KNOWN_TWEETS['2095541863956742174']);
  const finalId = id || '2095541863956742174';
  const finalName = name || authorName || (tweetData ? tweetData.name : 'Figma');
  const finalHandle = handle || (tweetData ? tweetData.handle : 'figma');
  const finalAvatar = avatar || (tweetData ? tweetData.avatar : 'https://pbs.twimg.com/profile_images/2068849889753333760/YE3KJq___normal.jpg');
  const isVerified = verified !== undefined ? verified : (tweetData ? tweetData.verified : true);
  const rawText = content || text || (tweetData ? tweetData.text : '');
  const finalVideo = video !== undefined ? video : (videoUrl || (tweetData ? tweetData.video : null));
  const finalMedia = mediaUrl || media || (tweetData ? (tweetData.mediaUrl || '') : '');
  const finalImages = images !== undefined ? images : (tweetData ? (tweetData.images || []) : []);
  const finalUrlPreview = urlPreview !== undefined ? urlPreview : (tweetData ? (tweetData.urlPreview || null) : null);
  const postUrl = (tweetData && tweetData.postUrl) || (finalHandle ? `https://x.com/${finalHandle}/status/${finalId}` : `https://x.com/i/status/${finalId}`);
  const profileUrl = finalHandle ? `https://x.com/${finalHandle}` : 'https://x.com';

  const formattedContent = formatTweetText(rawText);

  const shouldAutoplay = autoPlay !== false && autoplay !== false;
  const isMuted = muted !== false;
  const isLoop = loop !== false;
  const showControls = controls === true;

  const videoAttrList = [];
  if (shouldAutoplay) videoAttrList.push('autoplay');
  if (isLoop) videoAttrList.push('loop');
  if (isMuted) videoAttrList.push('muted');
  videoAttrList.push('playsinline');
  if (showControls) videoAttrList.push('controls');
  videoAttrList.push('preload="auto"');
  const videoAttrs = videoAttrList.join(' ');

  let mediaHtml = '';
  if (finalVideo && (finalVideo.src || typeof finalVideo === 'string')) {
    const vSrc = typeof finalVideo === 'string' ? finalVideo : finalVideo.src;
    const vPoster = typeof finalVideo === 'object' ? (finalVideo.poster || '') : (finalMedia || '');
    mediaHtml = `<div class="s-tweet-media s-tweet-media-video"><video src="${safeHref(vSrc)}" poster="${safeHref(vPoster)}" ${videoAttrs} class="s-tweet-video"><source src="${safeHref(vSrc)}" type="video/mp4" />Your browser does not support the video tag.</video></div>`;
  } else if (Array.isArray(finalImages) && finalImages.length > 1) {
    mediaHtml = `<div class="s-tweet-carousel" data-s-carousel><div class="s-tweet-carousel-track">${finalImages.map((img, idx) => `<div class="s-tweet-carousel-slide"><img src="${safeHref(img)}" alt="Tweet photo ${idx + 1}" class="s-tweet-carousel-img" loading="lazy" /></div>`).join('')}</div><div class="s-tweet-carousel-nav"><button type="button" class="s-tweet-carousel-btn prev" aria-label="Previous photo" data-s-carousel-prev>‹</button><div class="s-tweet-carousel-dots">${finalImages.map((_, i) => `<span class="s-tweet-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}</div><button type="button" class="s-tweet-carousel-btn next" aria-label="Next photo" data-s-carousel-next>›</button></div></div>`;
  } else if (Array.isArray(finalImages) && finalImages.length === 1) {
    mediaHtml = `<div class="s-tweet-media"><img src="${safeHref(finalImages[0])}" alt="Tweet media" class="s-tweet-media-img" loading="lazy" /></div>`;
  } else if (finalMedia) {
    mediaHtml = `<div class="s-tweet-media"><img src="${safeHref(finalMedia)}" alt="Tweet media" class="s-tweet-media-img" loading="lazy" /></div>`;
  } else if (finalUrlPreview && typeof finalUrlPreview === 'object') {
    const previewHref = finalUrlPreview.url || '#';
    mediaHtml = `<a href="${safeHref(previewHref)}" target="_blank" rel="noopener noreferrer" class="s-tweet-url-preview">${finalUrlPreview.image ? `<div class="s-tweet-url-img-wrap"><img src="${safeHref(finalUrlPreview.image)}" alt="Preview thumbnail" class="s-tweet-url-img" loading="lazy" /></div>` : ''}<div class="s-tweet-url-body"><span class="s-tweet-url-domain">${escapeText(finalUrlPreview.domain || '')}</span><strong class="s-tweet-url-title">${escapeText(finalUrlPreview.title || '')}</strong>${finalUrlPreview.description ? `<p class="s-tweet-url-desc">${escapeText(finalUrlPreview.description)}</p>` : ''}</div></a>`;
  }

  const finalTime = timestamp || date || '';
  const isFooterVisible = showFooter === true || (showFooter !== false && (finalTime || likes || retweets));
  let footerHtml = '';
  if (isFooterVisible) {
    footerHtml = `<footer class="s-tweet-footer">${finalTime ? `<time class="s-tweet-time">${escapeText(finalTime)}</time>` : ''}${(likes || retweets) ? `<div class="s-tweet-metrics">${retweets ? `<span><strong>${escapeText(retweets)}</strong> Retweets</span>` : ''}${likes ? `<span><strong>${escapeText(likes)}</strong> Likes</span>` : ''}</div>` : ''}</footer>`;
  }

  const cls = ['s-tweet-card', className].filter(Boolean).join(' ');

  return raw('<article' + attributes({ class: cls, 'data-tweet-id': finalId, ...(apiUrl ? { 'data-api-url': apiUrl } : {}), ...attrs }) + '>' +
    '<header class="s-tweet-header">' +
      '<div class="s-tweet-author">' +
        '<a href="' + safeHref(profileUrl) + '" target="_blank" rel="noopener noreferrer" class="s-tweet-avatar-link">' +
          '<img src="' + safeHref(finalAvatar) + '" alt="' + escapeText(finalName) + '" class="s-tweet-avatar" loading="lazy" />' +
        '</a>' +
        '<div class="s-tweet-author-info">' +
          '<div class="s-tweet-name-row">' +
            '<a href="' + safeHref(profileUrl) + '" target="_blank" rel="noopener noreferrer" class="s-tweet-name-link">' +
              '<strong class="s-tweet-name">' + escapeText(finalName) + '</strong>' +
            '</a>' +
            (isVerified ? '<svg class="s-tweet-verified" width="16" height="16" viewBox="0 0 24 24" fill="#1D9BF0" aria-label="Verified"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>' : '') +
          '</div>' +
          '<a href="' + safeHref(profileUrl) + '" target="_blank" rel="noopener noreferrer" class="s-tweet-handle-link">' +
            '<span class="s-tweet-handle">@' + escapeText(finalHandle) + '</span>' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<a href="' + safeHref(postUrl) + '" target="_blank" rel="noopener noreferrer" class="s-tweet-logo-link" aria-label="View on X">' +
        '<svg class="s-tweet-logo" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
      '</a>' +
    '</header>' +
    '<div class="s-tweet-body">' +
      '<div class="s-tweet-content">' + formattedContent + '</div>' +
      mediaHtml +
    '</div>' +
    footerHtml +
  '</article>');
}

export function AnimatedCircularProgressBar({value=72,min=0,max=100,gaugePrimaryColor='#5B3DF5',gaugeSecondaryColor='rgba(255,255,255,0.1)',attrs={}}={}) {
  const circumference=2*Math.PI*45;
  const currentPercent=Math.round(((value-min)/(max-min))*100);
  const strokeDashoffset=circumference-((currentPercent/100)*circumference);
  return raw('<div'+attributes({class:'s-circular-progress-wrap',style:`--circle-val:${currentPercent};`,...attrs})+'><svg class="s-circular-progress-svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" class="s-circular-progress-bg" stroke="'+escapeText(gaugeSecondaryColor)+'" stroke-width="8" fill="none"/><circle cx="50" cy="50" r="45" class="s-circular-progress-bar" stroke="'+escapeText(gaugePrimaryColor)+'" stroke-width="8" stroke-dasharray="'+circumference.toFixed(2)+'" stroke-dashoffset="'+strokeDashoffset.toFixed(2)+'" stroke-linecap="round" fill="none"/></svg><span class="s-circular-progress-text">'+currentPercent+'%</span></div>');
}

export function HexagonPattern({radius=30,gap=4,strokeDasharray='0',direction='horizontal',hexagons=[[1,1],[3,2]],attrs={}}={}) {
  const id=uid('hex');
  const sqrt3=Math.sqrt(3);
  const colStep=direction==='horizontal'?(3*radius)/2+(sqrt3*gap)/2:sqrt3*radius+gap;
  const rowStep=direction==='horizontal'?sqrt3*radius+gap:(3*radius)/2+(sqrt3*gap)/2;
  const tileW=direction==='horizontal'?colStep*2:colStep;
  const tileH=direction==='horizontal'?rowStep:rowStep*2;

  function hexPts(cx,cy,r) {
    return Array.from({length:6},(_,i)=>{
      const a=((i*60)*(Math.PI))/180;
      return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  }

  const hexList=[[colStep/2,rowStep/2],[colStep*1.5,rowStep]].map(([cx,cy])=>`<polygon class="s-hex-poly" points="${hexPts(cx,cy,radius)}" stroke-dasharray="${strokeDasharray}"/>`).join('');
  const filledHex=(Array.isArray(hexagons)?hexagons:[]).map(([c,r])=>`<polygon class="s-hex-fill" points="${hexPts(c*colStep+colStep/2,r*rowStep+rowStep/2,radius-1)}"/>`).join('');

  return raw('<svg'+attributes({class:'s-hexagon-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+tileW.toFixed(1)+'" height="'+tileH.toFixed(1)+'" patternUnits="userSpaceOnUse">'+hexList+'</pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"/><svg class="s-hex-highlighted">'+filledHex+'</svg></svg>');
}

export function StripedPattern({direction='left',width=12,height=12,attrs={}}={}) {
  const id=uid('stripe');
  const w=Number(width)||12;
  const h=Number(height)||12;
  const lines=direction==='left'
    ? `<line x1="0" y1="${h}" x2="${w}" y2="0" stroke="currentColor"/><line x1="${-w}" y1="${h}" x2="0" y2="0" stroke="currentColor"/><line x1="${w}" y1="${h}" x2="${w*2}" y2="0" stroke="currentColor"/>`
    : `<line x1="0" y1="0" x2="${w}" y2="${h}" stroke="currentColor"/><line x1="${-w}" y1="0" x2="0" y2="${h}" stroke="currentColor"/><line x1="${w}" y1="0" x2="${w*2}" y2="${h}" stroke="currentColor"/>`;
  return raw('<svg'+attributes({class:'s-striped-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+w+'" height="'+h+'" patternUnits="userSpaceOnUse">'+lines+'</pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"/></svg>');
}

export function InteractiveGridPattern({width=32,height=32,squares=[12,8],attrs={}}={}) {
  const [cols,rows]=Array.isArray(squares)?squares:[12,8];
  const rects=Array.from({length:cols*rows},(_,i)=>{
    const x=(i%cols)*width;
    const y=Math.floor(i/cols)*height;
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" class="s-interactive-grid-rect" data-grid-i="${i}"/>`;
  }).join('');
  return raw('<svg'+attributes({class:'s-interactive-grid-pattern','data-s-interactive-grid':true,viewBox:`0 0 ${cols*width} ${rows*height}`,...attrs})+'>'+rects+'</svg>');
}

export function NoiseTexture({frequency=0.4,octaves=5,slope=0.15,noiseOpacity=0.6,attrs={}}={}) {
  const id=uid('noise');
  return raw('<svg'+attributes({class:'s-noise-texture','aria-hidden':'true',...attrs})+'><defs><filter id="'+id+'"><feTurbulence type="fractalNoise" baseFrequency="'+frequency+'" numOctaves="'+octaves+'" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="'+slope+'"/><feFuncG type="linear" slope="'+slope+'"/><feFuncB type="linear" slope="'+slope+'"/></feComponentTransfer></filter></defs><rect width="100%" height="100%" filter="url(#'+id+')" opacity="'+noiseOpacity+'"/></svg>');
}



