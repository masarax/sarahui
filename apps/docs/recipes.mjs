import fs from 'node:fs';
import * as UI from '../../packages/ui/src/templates.js';
const props={};
for(const line of fs.readFileSync(new URL('../../docs/components.md',import.meta.url),'utf8').split(/\r?\n/)){
  const match=line.match(/^\| ([^|]+) \| (.+) \|$/);
  if(match)for(const name of match[1].split(' / '))props[name.trim()]=match[2];
}
export const expressions={
  Icon:'UI.Icon({ name: "spark", size: 24, label: "Featured" })',
  Button:'UI.Button({ label: "Continue", icon: "arrow", variant: "primary", size: "md" })',
  IconButton:'UI.IconButton({ icon: "heart", label: "Save to favorites", variant: "outline" })',
  ButtonGroup:'UI.ButtonGroup({ label: "Editor actions", children: [UI.Button({ label: "Preview", variant: "outline" }), UI.Button({ label: "Code", variant: "outline" })] })',
  Input:'UI.Input({ id: "email", label: "Email address", type: "email", helper: "We will use this to contact you.", attrs: { name: "email", required: true, placeholder: "you@example.com" } })',
  Textarea:'UI.Textarea({ id: "brief", label: "Project brief", helper: "A sentence is a good start.", attrs: { name: "brief", rows: 4, maxlength: 500 } })',
  Select:'UI.Select({ id: "workspace", label: "Workspace", options: [{ label: "Personal", value: "personal" }, { label: "Team", value: "team" }], value: "team", attrs: { name: "workspace" } })',
  Checkbox:'UI.Checkbox({ id: "updates", label: "Product updates", description: "Occasional news from the team.", checked: true, attrs: { name: "updates" } })',
  Radio:'UI.html`<fieldset><legend>Billing cycle</legend>${UI.Radio({ id: "monthly", label: "Monthly", checked: true, attrs: { name: "billing", value: "monthly" } })}${UI.Radio({ id: "yearly", label: "Yearly", attrs: { name: "billing", value: "yearly" } })}</fieldset>`',
  Switch:'UI.Switch({ id: "notifications", label: "Email notifications", checked: true, attrs: { name: "notifications" } })',
  Slider:'UI.Slider({ id: "volume", label: "Volume", min: 0, max: 100, value: 60, step: 5 })',
  Badge:'UI.Badge({ label: "In review", tone: "warning", dot: true })',
  Chip:'UI.Chip({ label: "Design system", selected: true, removable: true })',
  Avatar:'UI.Avatar({ name: "Sarah Khan", size: "lg", tone: "brand", status: true })',
  Card:'UI.Card({ title: "Your next idea", description: "Give it a place to grow.", children: UI.Progress({ label: "Setup", value: 72 }), footer: UI.Button({ label: "Continue", variant: "outline" }) })',
  Alert:'UI.Alert({ title: "Saved successfully", description: "Your changes are ready.", tone: "success", live: true })',
  Tabs:'UI.Tabs({ id: "workspace-tabs", label: "Workspace", items: [{ label: "Overview", content: "Your workspace overview." }, { label: "Activity", content: "Recent workspace activity." }, { label: "Settings", content: "Your preferences." }] })',
  Breadcrumb:'UI.Breadcrumb({ items: [{ label: "Workspace", href: "/workspace" }, { label: "Projects", href: "/projects" }, { label: "Brand refresh" }] })',
  Pagination:'UI.Pagination({ pages: 8, current: 1, label: "Project pages" })',
  NavItem:'UI.NavItem({ label: "Projects", href: "/projects", icon: "folder", active: true, badge: "8" })',
  DataTable:'UI.DataTable({ id: "projects", caption: "Project progress", columns: [{ key: "name", label: "Project", sortable: true }, { key: "progress", label: "Progress (%)", sortable: true }], rows: [{ id: "p1", name: "Brand refresh", progress: 72 }, { id: "p2", name: "Studio website", progress: 92 }], selectable: true })',
  Accordion:'UI.Accordion({ items: [{ title: "Does this support dark mode?", content: "Every semantic color has a light and dark value.", open: true }, { title: "Can I customize it?", content: "Override CSS variables in your application." }] })',
  Dialog:'UI.html`${UI.Button({ label: "Create project", attrs: { "data-s-dialog-open": "project-dialog" } })}${UI.Dialog({ id: "project-dialog", title: "Create a project", description: "Give your idea a name.", children: UI.Input({ id: "project-name", label: "Project name", attrs: { "data-s-autofocus": true } }), footer: UI.Button({ label: "Done", attrs: { "data-s-dialog-close": true } }) })}`',
  Tooltip:'UI.Tooltip({ id: "token-help", label: "About design tokens", text: "Shared values keep your interface consistent." })',
  Progress:'UI.Progress({ label: "Workspace setup", value: 72, showLabel: true })',
  Skeleton:'UI.Skeleton({ lines: 4, label: "Loading project details" })',
  EmptyState:'UI.EmptyState({ title: "No projects yet", description: "Your next idea starts here.", icon: "folder", action: UI.Button({ label: "Create project", icon: "plus" }) })',
  Separator:'UI.Separator({ label: "Or continue with" })',
  Spinner:'UI.Spinner({ label: "Syncing workspace" })',
  Toast:'UI.Button({ label: "Show notification", attrs: { id: "notify-button" } })',
  Menu:'UI.Menu({ id: "project-menu", label: "Project actions", items: [{ label: "View project", icon: "folder", value: "view" }, { label: "Archive project", icon: "trash", value: "archive", danger: true }] })',
  CommandPalette:'UI.html`${UI.Button({ label: "Search", icon: "search", attrs: { "data-s-dialog-open": "app-search" } })}${UI.CommandPalette({ id: "app-search", title: "Search your workspace", items: [{ label: "Projects", href: "#projects", icon: "folder" }, { label: "Settings", href: "#settings", icon: "settings" }] })}`',
  Toggle:'UI.Toggle({ label: "Bookmark", icon: "heart", pressed: true })',
  ToggleGroup:'UI.ToggleGroup({ label: "Alignment", items: [{ label: "Left", pressed: true }, { label: "Center" }, { label: "Right" }] })',
  Kbd:'UI.Kbd({ keys: ["⌘", "K"] })',
  AspectRatio:'UI.AspectRatio({ ratio: "16/9", children: UI.html`<div style="background:var(--s-bg-brand);width:100%;height:100%;"></div>` })',
  BentoGrid:'UI.BentoGrid({ columns: 2, children: UI.BentoCard({ title: "Tokens", description: "Design tokens system.", graphic: UI.Icon({ name: "palette" }) }) })',
  Drawer:'UI.html`${UI.Button({ label: "Open drawer", attrs: { "data-s-drawer-open": "app-drawer" } })}${UI.Drawer({ id: "app-drawer", title: "Drawer", children: "Drawer body content." })}`',
  Popover:'UI.Popover({ id: "app-popover", trigger: UI.Button({ label: "Open popover" }), content: "Popover content." })',
  Marquee:'UI.Marquee({ children: UI.Badge({ label: "SarahUI Infinite Marquee" }) })',
  BorderBeam:'UI.html`<div style="position:relative;padding:24px;border:1px solid var(--s-border-default);">${UI.BorderBeam({ size: 160 })}<span>Animated Border</span></div>`',
  AnimatedShinyText:'UI.AnimatedShinyText({ text: "Luminous metallic shimmer effect" })',
  NumberTicker:'UI.NumberTicker({ value: 319 })',
  Ripple:'UI.Ripple({ numCircles: 4 })',
  RetroGrid:'UI.RetroGrid({ angle: 65 })',
  ShineBorder:'UI.ShineBorder({ children: "Card with animated dynamic shining border" })',
  Meteors:'UI.Meteors({ number: 16 })',
  Particles:'UI.Particles({ quantity: 40, color: "var(--s-primary)" })',
  Confetti:'UI.Confetti({ label: "Trigger Confetti", icon: "spark" })',
  MagicCard:'UI.MagicCard({ children: "Hover over this card to see the dynamic radial gradient follow your cursor." })',
  TypingAnimation:'UI.TypingAnimation({ text: "sarahUI is crafted with precision, motion, and speed." })',
  WordRotate:'UI.WordRotate({ words: ["Adaptive", "Accessible", "Lightweight", "High-contrast"] })',
  BlurFade:'UI.BlurFade({ children: "Smooth blur fade-in entrance transition effect" })',
  ShimmerButton:'UI.ShimmerButton({ label: "Get Started Now", icon: "spark" })',
  RainbowButton:'UI.RainbowButton({ label: "Explore Pro Components", icon: "spark" })',
  Dock:'UI.Dock({ items: [{ icon: "folder", label: "Projects" }, { icon: "spark", label: "Effects" }, { icon: "settings", label: "Settings" }] })',
  AvatarCircles:'UI.AvatarCircles({ numPeople: 99, avatarUrls: ["https://avatars.githubusercontent.com/u/55315718", "https://avatars.githubusercontent.com/u/20110627", "https://avatars.githubusercontent.com/u/106103625", "https://avatars.githubusercontent.com/u/59228569"] })',
  AnimatedBeam:'UI.AnimatedBeam({ duration: 3 })',
  Terminal:'UI.Terminal({ command: "npm install sarahui", output: "Added 1 package in 0.12s." })',
  OrbitingCircles:'UI.OrbitingCircles({ radius: 80, icons: ["whatsapp", "notion", "openai", "drive", "github"] })',
  Globe:'UI.Globe({ size: 280 })',
  AnimatedList:'UI.AnimatedList({ items: [UI.Badge({ label: "Payment received" }), UI.Badge({ label: "Deployment complete" })] })',
  InteractiveHoverButton:'UI.InteractiveHoverButton({ label: "Get Started" })',
  PulsatingButton:'UI.PulsatingButton({ label: "Explore Components" })',
  SparklesText:'UI.SparklesText({ text: "Magical UI Library" })',
  TextReveal:'UI.TextReveal({ text: "Beautiful design system built with pure Web APIs." })',
  GridPattern:'UI.GridPattern({ width: 40, height: 40 })',
  DotPattern:'UI.DotPattern({ width: 20, height: 20 })',
  AnimatedGridPattern:'UI.AnimatedGridPattern({ numSquares: 24 })',
  FlickeringGrid:'UI.FlickeringGrid({ color: "#5B3DF5" })',
  WarpBackground:'UI.WarpBackground({ children: "Hyperspace Warp Tunnel" })',
  NeonGradientCard:'UI.NeonGradientCard({ children: "Neon Card with Glowing Borders" })',
  CoolMode:'UI.CoolMode({ children: UI.Button({ label: "Click for Particles" }) })',
  ScrollProgress:'UI.ScrollProgress({ color: "#5B3DF5" })',
  ProgressiveBlur:'UI.ProgressiveBlur({ direction: "bottom" })',
  HyperText:'UI.HyperText({ text: "SARAHUI DESIGN" })',
  MorphingText:'UI.MorphingText({ texts: ["DESIGN", "ENGINEER", "EXPERIENCE"] })',
  AnimatedGradientText:'UI.AnimatedGradientText({ text: "Radiant Multi-color Gradient Wave" })',
  LineShadowText:'UI.LineShadowText({ text: "3D SHADOW TEXT" })',
  AuroraText:'UI.AuroraText({ text: "Aurora Borealis Gradient" })',
  Sheet:'UI.html`${UI.Button({ label: "Open Sheet", attrs: { "data-s-dialog-open": "app-sheet" } })}${UI.Sheet({ id: "app-sheet", title: "Navigation Sheet", children: "Sheet drawer contents." })}`',
  ContextMenu:'UI.ContextMenu({ id: "custom-ctx", trigger: UI.html`<div style="padding:20px;border:1px dashed var(--s-border-default);">Right click here</div>`, items: [{ label: "Edit", icon: "settings" }, { label: "Delete", icon: "trash", danger: true }] })',
  HoverCard:'UI.HoverCard({ trigger: UI.Button({ label: "Hover over me" }), content: "Rich preview card information." })',
  Collapsible:'UI.Collapsible({ title: "Can I use this with any framework?", content: "Yes! sarahUI uses standard Web APIs and plain HTML." })',
  Android:'UI.Android({ children: UI.html`<div style="padding:20px;text-align:center;">Android Screen</div>` })',
  Iphone:'UI.Iphone({ children: UI.html`<div style="padding:20px;text-align:center;">iOS Screen</div>` })',
  Safari:'UI.Safari({ url: "sarahui.masarax.com", children: UI.html`<div style="padding:20px;text-align:center;">Web Content</div>` })',
  GlareHover:'UI.GlareHover({ children: UI.html`<div style="padding:20px;border:1px solid var(--s-border-default);">Interactive Glare Card</div>` })',
  Backlight:'UI.Backlight({ color: "rgba(91,61,245,0.4)", children: UI.html`<div style="padding:20px;">Card with Backlight</div>` })',
  Floating3DParticles:'UI.Floating3DParticles({ count: 40 })',
  LightRays:'UI.LightRays({ count: 6, intensity: 0.5 })',
  AnimatedThemeToggler:'UI.AnimatedThemeToggler()',
  ComicText:'UI.ComicText({ text: "POW! SARAHUI" })',
  KineticText:'UI.KineticText({ text: "KINETIC MOTION" })',
  DiaTextReveal:'UI.DiaTextReveal({ text: "DIAGONAL SWEEP" })',
  SpinningText:'UI.SpinningText({ text: "SARAHUI • MASARA X • DESIGN • " })',
  Text3DFlip:'UI.Text3DFlip({ frontText: "HOVER TO FLIP", backText: "3D FLIP EFFECT" })',
  TextAnimate:'UI.TextAnimate({ text: "Fluid Staggered Text" })',
  VideoText:'UI.VideoText({ text: "CREATIVE" })',
  Highlighter:'UI.Highlighter({ children: "highlighted text" })',
  ScrollBasedVelocity:'UI.ScrollBasedVelocity({ text: "SARAHUI VELOCITY MARQUEE" })',
  AnimatedSubscribeButton:'UI.AnimatedSubscribeButton({ initialText: "Subscribe", subscribedText: "Subscribed" })',
  ShinyButton:'UI.ShinyButton({ label: "Get Pro Access", icon: "spark" })',
  RippleButton:'UI.RippleButton({ label: "Click for Ripple", icon: "spark" })',
  CodeComparison:'UI.CodeComparison({ beforeCode: "const a = 1;", afterCode: "const b = 2;", beforeTitle: "Before", afterTitle: "After" })',
  FileTree:'UI.FileTree({ tree: [{ name: "src", type: "folder", children: [{ name: "index.js", type: "file" }] }] })',
  HeroVideoDialog:'UI.HeroVideoDialog({ videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailAlt: "Showcase" })',
  IconCloud:'UI.IconCloud({ iconSlugs: ["typescript", "javascript", "dart", "java", "react", "flutter", "android", "html5", "css3", "nodedotjs", "express", "nextdotjs", "prisma", "amazonaws", "postgresql", "firebase", "nginx", "vercel", "docker", "git", "github", "figma"], size: 280 })',
  Lens:'UI.Lens({ zoom: 1.8, children: UI.html`<div style="padding:20px;">Inspectable Surface</div>` })',
  PixelImage:'UI.PixelImage({ pixelSize: 8, width: 240, height: 160 })',
  GlyphMatrix:'UI.GlyphMatrix({ color: "#5B3DF5" })',
  DottedMap:'UI.DottedMap({ points: [{ x: 25, y: 35, label: "SF" }] })',
  Pointer:'UI.Pointer({ label: "Sarah Khan", color: "#5B3DF5" })',
  SmoothCursor:'UI.SmoothCursor({ color: "#5B3DF5" })',
  TweetCard:'UI.TweetCard({ name: "Sarah Khan", handle: "sarahkhan", content: "Building with sarahUI!", verified: true })',
  AnimatedCircularProgressBar:'UI.AnimatedCircularProgressBar({ value: 75 })',
  HexagonPattern:'UI.HexagonPattern({ size: 36 })',
  StripedPattern:'UI.StripedPattern({ angle: 45 })',
  InteractiveGridPattern:'UI.InteractiveGridPattern({ width: 32, height: 32 })',
  NoiseTexture:'UI.NoiseTexture({ opacity: 0.15 })'
};
const notes={
  Button:'Use attrs.type = "submit" inside a form. Loading buttons prevent repeated submission.',
  IconButton:'Always provide a label that describes the action.',
  Radio:'Keep one name for related choices and a distinct value for each option.',
  Dialog:'The example includes both the trigger and dialog. Escape closes it and returns focus.',
  CommandPalette:'The trigger and search dialog belong together. Handle sarah:command for your application router.',
  DataTable:'Rows keep stable IDs. Sorting operates on rendered rows; sort application data before paginating.',
  Pagination:'Listen for sarah:pagechange and load or render the requested records.',
  Menu:'Listen for sarah:menuaction and use event.detail.value to perform your action.',
  Tabs:'Arrow keys, Home and End move through tabs; disabled tabs are skipped.',
  Tooltip:'Use short, supplementary text. Put essential instructions directly on the page.',
  Toast:'Use toast() for a polite live announcement. It keeps focus where the person is working.',
  Chip:'Removing a chip emits sarah:chipremove on its parent. Update your application state too.'
};
import { getComponentProps, getComponentTsx } from './registry-data.mjs';
import { getComponentUsage } from './usage-data.mjs';

export { getComponentProps, getComponentTsx, getComponentUsage };

export function properties(name){
  const tables = getComponentProps(name);
  if (!tables || tables.length === 0) {
    return UI.html`<p class="api-properties">No additional configuration required.</p>`;
  }
  return UI.html`${tables.map(table => UI.html`
    ${table.title && tables.length > 1 ? UI.html`<h4 class="props-table-subtitle">${table.title}</h4>` : ''}
    <div class="props-table-wrapper">
      <div class="props-table-responsive">
        <table class="props-table api-properties">
          <thead>
            <tr>
              <th scope="col" style="width:24%;">Prop</th>
              <th scope="col" style="width:26%;">Type</th>
              <th scope="col" style="width:16%;">Default</th>
              <th scope="col" style="width:34%;">Description</th>
            </tr>
          </thead>
          <tbody>
            ${table.rows.map(row => UI.html`
              <tr>
                <td class="prop-col"><code>${row.prop}</code></td>
                <td class="type-col"><span class="type-badge" title="${row.type}">${row.type}</span></td>
                <td class="default-col"><code>${row.defaultVal}</code></td>
                <td class="desc-col">${row.description}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    </div>
  `)}`;
}
export function recipe(name){
  const extra=name==='Toast'?"\ndocument.querySelector('#notify-button').addEventListener('click', () => {\n  UI.toast('Your changes are ready.', { title: 'Saved', tone: 'success' });\n});":name==='Pagination'?"\ndocument.addEventListener('sarah:pagechange', event => {\n  console.log('Render page', event.detail.page);\n});":name==='Menu'?"\ndocument.addEventListener('sarah:menuaction', event => {\n  console.log('Selected action', event.detail.value);\n});":'';
  return "import 'sarahui/css';\nimport * as UI from 'sarahui';\n\nconst component = "+(expressions[name]||`UI.${name}({})`)+";\n\ndocument.querySelector('#app').innerHTML = UI.render(\n  UI.html`<main class=\"s-ui\">${component}</main>`\n);\nconst cleanup = UI.enhanceUI(document);"+extra+"\n// Call cleanup() when your application unmounts.";
}
export const usageNote=name=>notes[name]||'';

export function extraAfterUsage(name, highlightCode) {
  if (name === 'SmoothCursor') {
    const globalCss = `* {\n  cursor: none !important;\n}`;
    const inputCss = `input,\ntextarea,\nselect {\n  cursor: text !important;\n}`;
    const tailwindSnippet = `<div className="cursor-none">\n  <SmoothCursor />\n  {/* your app */}\n</div>`;

    return UI.html`
      <section class="detail-section" id="sec-smoothcursor-hiding-cursor">
        <div class="detail-section-title">
          <div>
            <h3>Hiding Default Browser Cursor</h3>
            <p>To prevent the default browser cursor from overlapping with the custom cursor, add the following CSS globally:</p>
          </div>
        </div>
        <div class="usage-code-box">
          <div class="code-preview-bar">
            <span>globals.css</span>
            <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(globalCss)}" aria-label="Copy CSS snippet">
              ${UI.Icon({name:'copy',size:13})} <span>Copy</span>
            </button>
          </div>
          <pre tabindex="0"><code class="token-code">${UI.raw(highlightCode(globalCss, 'css', {showLineNumbers:true}))}</code></pre>
        </div>

        <div style="margin-top:24px;">
          <h4 style="font-size:15px;font-weight:600;margin:0 0 8px;color:var(--s-text-primary);">Optional: Keep text cursor for inputs</h4>
          <p class="s-small s-muted" style="margin:0 0 12px;line-height:1.5;">To preserve the standard text selection I-beam cursor when hovering over input fields, text areas, and select menus:</p>
          <div class="usage-code-box">
            <div class="code-preview-bar">
              <span>globals.css</span>
              <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(inputCss)}" aria-label="Copy CSS snippet">
                ${UI.Icon({name:'copy',size:13})} <span>Copy</span>
              </button>
            </div>
            <pre tabindex="0"><code class="token-code">${UI.raw(highlightCode(inputCss, 'css', {showLineNumbers:true}))}</code></pre>
          </div>
        </div>

        <div class="docs-pro-tip-card">
          <div class="docs-pro-tip-header">
            <div class="docs-pro-tip-badge">
              <span class="docs-pro-tip-icon">💡</span>
              <span>Tailwind CSS Tip</span>
            </div>
          </div>
          <p class="docs-pro-tip-desc">
            If you're using Tailwind CSS, you can apply <code>cursor-none</code> to your layout wrapper or body element to cleanly hide the default browser pointer:
          </p>
          <div class="docs-pro-tip-code-box">
            <div class="code-preview-bar">
              <span>layout.tsx</span>
              <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(tailwindSnippet)}" aria-label="Copy snippet">
                ${UI.Icon({name:'copy',size:13})} <span>Copy</span>
              </button>
            </div>
            <pre tabindex="0"><code class="token-code">${UI.raw(highlightCode(tailwindSnippet, 'typescript'))}</code></pre>
          </div>
        </div>
      </section>
    `;
  }

  return '';
}

export function extraAfterProps(name, highlightCode) {
  if (name === 'SmoothCursor') {
    const typeCode = `interface SpringConfig {\n  damping: number;    // Controls how quickly the animation settles\n  stiffness: number;  // Controls the spring stiffness\n  mass: number;       // Controls the virtual mass of the cursor\n  restDelta: number;  // Threshold to consider animation complete\n}`;
    const defaultConfig = `const defaultSpringConfig = {\n  damping: 45,\n  stiffness: 400,\n  mass: 1,\n  restDelta: 0.001,\n};`;

    return UI.html`
      <section class="detail-section" id="sec-smoothcursor-spring-config">
        <div class="detail-section-title">
          <div>
            <h3>SpringConfig Type & Default Spring Configuration</h3>
            <p>Customize the smooth cursor inertia, tension, and friction dynamics with spring physics.</p>
          </div>
        </div>
        <div class="side-by-side-code-grid">
          <div class="side-by-side-code-card">
            <div class="side-by-side-code-header">
              <span class="side-by-side-badge">TypeScript</span>
              <h4>SpringConfig Interface</h4>
            </div>
            <div class="usage-code-box">
              <div class="code-preview-bar">
                <span>types.ts</span>
                <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(typeCode)}" aria-label="Copy code">
                  ${UI.Icon({name:'copy',size:13})} <span>Copy</span>
                </button>
              </div>
              <pre tabindex="0"><code class="token-code">${UI.raw(highlightCode(typeCode, 'typescript', {showLineNumbers:true}))}</code></pre>
            </div>
          </div>
          <div class="side-by-side-code-card">
            <div class="side-by-side-code-header">
              <span class="side-by-side-badge">Constants</span>
              <h4>Default Spring Configuration</h4>
            </div>
            <div class="usage-code-box">
              <div class="code-preview-bar">
                <span>config.ts</span>
                <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(defaultConfig)}" aria-label="Copy code">
                  ${UI.Icon({name:'copy',size:13})} <span>Copy</span>
                </button>
              </div>
              <pre tabindex="0"><code class="token-code">${UI.raw(highlightCode(defaultConfig, 'typescript', {showLineNumbers:true}))}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="detail-section" id="sec-smoothcursor-browser-support">
        <div class="detail-section-title">
          <div>
            <h3>Browser Support</h3>
            <p>Compatible with all modern desktop and laptop browsers supporting:</p>
          </div>
        </div>
        <ul style="margin:0 0 16px 20px;padding:0;line-height:1.75;color:var(--s-text-secondary);font-size:14px;">
          <li><code>requestAnimationFrame</code> for 60fps/120fps hardware-accelerated movement</li>
          <li>CSS 3D transforms (<code>translate3d</code>, <code>rotate</code>, <code>scale</code>)</li>
          <li>W3C Pointer Events (<code>pointermove</code>, <code>pointerleave</code>)</li>
          <li>Hover-capable fine pointers (mouse or trackpad)</li>
        </ul>
        <div class="docs-device-callout-card">
          <div class="docs-device-callout-header">
            <div class="docs-device-callout-badge">
              <span class="docs-device-callout-icon">📱</span>
              <span>Touch-First & Mobile Devices</span>
            </div>
            <span class="docs-device-callout-tag">Auto-detected</span>
          </div>
          <p class="docs-device-callout-desc">
            Touch screens, tablets, and mobile devices with coarse pointers are automatically bypassed. This prevents the custom animated cursor from getting stuck or popping up after touch taps, keeping native mobile gestures smooth and fluid.
          </p>
        </div>
      </section>

      <section class="detail-section" id="sec-smoothcursor-accessibility">
        <div class="detail-section-title">
          <div>
            <h3>Accessibility</h3>
            <p>Inclusive motion design and assistive technology considerations:</p>
          </div>
        </div>
        <ul style="margin:0 0 16px 20px;padding:0;line-height:1.75;color:var(--s-text-secondary);font-size:14px;">
          <li><strong>Keyboard Navigation:</strong> Users navigating via keyboard will not see or be obstructed by the custom cursor (follower container is explicitly marked with <code>aria-hidden="true"</code>).</li>
          <li><strong>Focus Indicators:</strong> Ensure visible focus rings and alternative visual cues remain prominent for interactive elements.</li>
          <li><strong>Motion Sensitivity:</strong> Automatically respects <code>prefers-reduced-motion: reduce</code> to ensure users with vestibular sensitivities have a comfortable browsing experience.</li>
        </ul>
      </section>

      <section class="detail-section" id="sec-smoothcursor-credits" style="padding-bottom:12px;">
        <div class="detail-section-title">
          <div>
            <h3>Design & Engineering</h3>
            <p>Engineered as a native SarahUI progressive enhancement with spring physics and zero global pointer lock.</p>
          </div>
        </div>
      </section>
    `;
  }

  return '';
}



