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
  NumberTicker:'UI.NumberTicker({ value: 277 })',
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
  AvatarCircles:'UI.AvatarCircles({ numPeople: 99, avatars: ["SK", "AM", "JD", "RB"] })',
  AnimatedBeam:'UI.AnimatedBeam({ duration: 3 })',
  Terminal:'UI.Terminal({ command: "npm install sarahui", output: "Added 1 package in 0.12s." })',
  OrbitingCircles:'UI.OrbitingCircles({ radius: 80, children: UI.Icon({ name: "spark", size: 24 }) })',
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
  IconCloud:'UI.IconCloud({ icons: ["spark", "layers", "palette", "globe"], size: 240 })',
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

export { getComponentProps, getComponentTsx };

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
export const usageNote=name=>notes[name]||'Zero runtime dependencies. Use as a standalone Web component or with any framework.';

