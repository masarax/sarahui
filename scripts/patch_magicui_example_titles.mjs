import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve('apps/docs/catalog.mjs');
let catalogContent = fs.readFileSync(catalogPath, 'utf8');

// Title mapping for all component variants to ensure 1:1 Magic UI concise naming
const titleMap = {
  // Long title -> Magic UI short title
  'Interactive Command Execution': 'Custom Delays',
  'Multi-Command Execution': 'Multi-Command',
  'Center Fade Modal': 'From Bottom',
  'Top-in-bottom-out': 'Top-in-bottom-out',
  'Bento Box Layout': 'Three Columns',
  'Vertical': 'Vertical',
  '3D': '3D',
  'Notification Item Stack': 'Security Feed',
  'Security & Deployment Feed': 'Security Feed',
  'Team Collaborative Activity': 'Team Activity',
  'Navigation Dock with Separator': 'Direction',
  'App Icons Dock': 'Direction',
  'Magnified Circle Icons': 'Variants',
  '3D Vector Spinning Globe': 'Minimal Rings',
  'Minimal Latitude Ring Globe': 'Minimal Rings',
  'Social Post Status Card': 'Image Carousel',
  'Tweet Card With Image Carousel': 'Image Carousel',
  'Tweet Card With Meta URL Preview': 'Meta URL Preview',
  'Nested Concentric Orbits': 'Concentric Orbits',
  'Single Fast Orbit': 'Single Orbit',
  'Stacked Avatar Overlap': 'Custom Limit',
  'Small Team Cluster': 'Small Cluster',
  '3D Fibonacci Interactive Sphere': 'Brand Ecosystem',
  'Brand Ecosystem Cloud': 'Brand Ecosystem',
  'Cursor Tracking Magnifier': 'Static Lens',
  'Static Lens': 'Static Lens',
  'Multiplayer Real-Time Cursor': 'Multiplayer',
  'Co-Editing Presence': 'Custom Cursor',
  'Spring-Smoothed Mouse Follower': 'Accent Ring',
  'Accent Ring Follower': 'Accent Ring',
  'Multi-Stop Gradient Blur': 'Multi-Stop',
  'Top Header Vignette': 'Top Header',
  'World Coordinates Vector Map': 'Pulse Markers',
  'Smaller Dots': 'Smaller Dots',
  'PulseMarker': 'Pulse Markers',
  'Animated Beam Uni-Directional': 'Uni-Directional',
  'Animated Beam Bi-Directional': 'Bi-Directional',
  'Animated Beam Multiple Inputs': 'Multiple Inputs',
  '2 Border Beams': 'Two Border Beams',
  'Reverse': 'Reverse',
  'Dynamic Gradient Perimeter': 'Custom Colors',
  'Monotone': 'Speed Control',
  'Spotlight Cursor Tracking': 'Spotlight',
  'Orb': 'Orb',
  'Holographic Glare Reflection': 'Holographic',
  'CTA': 'Call to Action',
  'Meteor Streaks': 'Custom Angle',
  'Subtle Background Trail': 'Subtle Trail',
  'Fireworks': 'Fireworks',
  'Side Cannons': 'Side Cannons',
  'Dynamic Particle Field': 'Brand Accent',
  'Brand Accent Particles': 'Brand Accent',
  'Square': 'Square',
  'Diamond': 'Diamond',
  'Staggered Blur Fade Entrance': 'Staggered',
  'Hero Header Entrance': 'Hero Header',
  'Blur In by Text': 'Blur In by Text',
  'Slide Up by Word': 'Slide Up by Word',
  'Multiple Words with Loop': 'Multiple Words with Loop',
  'Custom Speed': 'Custom Speed',
  '3D Isometric Cast Shadow': 'Shadow Color',
  'Compact Step Shadow': 'Compact Shadow',
  'Aurora Borealis Gradient Text': 'Sunset Horizon',
  'Warm Sunset Horizon': 'Sunset Horizon',
  'Video Masked Headline': 'Condensed Font',
  'Condensed Font Mask': 'Condensed Font',
  'Default Counter': 'Direction',
  'Custom Start Value': 'Custom Start Value',
  'Decimal Places': 'Decimal Places',
  'Metallic Shimmer Sweep': 'Brand Accent',
  'Brand Accent Shimmer': 'Brand Accent',
  'Radiant Wave Gradient Text': 'Color Shift',
  'Gradient Mask Text Reveal': 'Instant View',
  'Instant View Entrance': 'Instant View',
  'Diagonal Mask Sweep Reveal': 'Repeat Animation',
  'Custom Gradient': 'Custom Gradient',
  'Scrambling Character Decoding': 'Auto-Decoding',
  'Auto-Decoding Entrance': 'Auto-Decoding',
  'Cycling Text Carousel': 'Fast Rotation',
  'Snappy Cycling': 'Fast Rotation',
  'Scroll-Accelerated Velocity Marquee': 'Reverse Direction',
  'Reverse Direction Velocity': 'Reverse Direction',
  'Glittering Star Sparkles': 'Golden Sparkles',
  'Golden Sparkles': 'Golden Sparkles',
  'SVG Goo Filter Morphing': 'Fast Cadence',
  'Fast Cadence Morphing': 'Fast Cadence',
  'Circular Orbiting Typography': 'Reverse Direction',
  'Hand-Drawn Marker Highlighter': 'Underline Stroke',
  'Underline Stroke': 'Underline Stroke',
  '3D Perspective Word Flip': 'Stagger from Center',
  'Stagger from center': 'Stagger from Center',
  'With Image': 'With Image',
  'With Video': 'With Video',
  'Simple Mode': 'Simple Mode',
  'Chromatic Rainbow Gradient': 'Outline Variant',
  'Outline Variant': 'Outline Variant',
  'Shimmer Border Action': 'Trailing Icon',
  'Action with Trailing Icon': 'Trailing Icon',
  'Wave Ripple Click Button': 'Centered Pulse',
  'Centered Pulse Action': 'Centered Pulse',
  'Interactive Canvas Matrix': 'Dense Grid',
  'Rounded': 'Rounded',
  'Flickering Matrix Grid': 'Dense Matrix',
  'Dense Matrix Grid': 'Dense Matrix',
  '3D Perspective Grid Floor': 'Inverted Horizon',
  'Inverted Horizon Ceiling': 'Inverted Horizon',
  'Concentric Pulse Waves': 'Compact Waves',
  'Compact Wave Pulse': 'Compact Waves',
  'Linear Gradient': 'Linear Gradient',
  'With Glow Effect': 'Glow Effect',
  'Dashed Stroke': 'Dashed Stroke',
  'Striped Pattern with a dashed stroke': 'Dashed Stroke',
  'Striped Pattern To Right': 'To Right',
  'Cursor Proximity Illuminating Grid': 'Colorful',
  'Colorful': 'Colorful',
  'Volumetric God Rays Lighting': 'Subtle Ambient',
  'Subtle Ambient Beams': 'Subtle Ambient',
  'Newsletter digest': 'Newsletter Digest',
  'Button': 'Button Overlay',
  '3D Perspective Floating Particles': 'Plain Background',
  'Plain Background': 'Plain Background',
  'Continuous Sheen Action Button': 'Compact Sheen',
  'Compact Sheen Button': 'Compact Sheen',
  'Collapsible Project Directory': 'Multi-Level',
  'Multi-Level Architecture': 'Multi-Level',
  'Side-by-Side Code Diff': 'TypeScript vs JavaScript',
  'TypeScript vs JavaScript': 'TypeScript vs JavaScript',
  'Page Scroll Progress': 'Bottom Pinned',
  'Bottom Pinned Bar': 'Bottom Pinned',
  'High-Intensity Neon Glow': 'Subtle Neon',
  'Subtle Neon Glow': 'Subtle Neon',
  'Pop-Art Halftone Comic Text': 'Action Slogan',
  'Action Slogan': 'Action Slogan',
  'Kinetic Velocity Typography': 'Bold Headline',
  'Bold Headline Loop': 'Bold Headline',
  'Click Particle Celebration': 'Custom Particle',
  'Custom Particle': 'Custom Particle',
  'Retro Pixel Distortion Filter': 'Fine Grain',
  'Fine Grain Pixelation': 'Fine Grain',
  'Pulsing Harmonic Glow': 'Ripple Glow',
  'Ripple Variant': 'Ripple Glow',
  '3D Perspective Warp Tunnel': 'Deep Space',
  'Deep Space Warp': 'Deep Space',
  'Expanding Hover Circle': 'Inverted Fill',
  'Inverted Circle Fill': 'Inverted Fill',
  'Radial Gauge Meter': 'High Value',
  'High-Value Target': 'High Value',
  'Image': 'Image Backdrop',
  'SVG': 'SVG Filter',
  'Cypher Character Matrix Rain': 'Violet Stream',
  'Violet Cyber Stream': 'Violet Stream',
  'Morphing State Subscribe Action': 'Bookmark Toggle',
  'Bookmark Toggle Action': 'Bookmark Toggle',
  'Symbol Grid': 'Symbol Grid',
  'Scales Comparison': 'Scales Comparison',
  'Primary Action': 'Secondary',
  'Secondary Action': 'Secondary',
  'Outline Action': 'Outline',
  'Ghost Action': 'Ghost',
  'Danger / Destructive': 'Destructive',
  'Primary Icon Action': 'Favorite Toggle',
  'Interactive Favorite Toggle': 'Favorite Toggle',
  'Segmented Action Group': 'Icon Toolbar',
  'Icon Action Toolbar': 'Icon Toolbar',
  'Semantic Tone Showcase': 'Dot Indicator',
  'Dot Status Indicator': 'Dot Indicator',
  'Removable Filter Tags': 'Selection Pills',
  'Selection Pills': 'Selection Pills',
  'Online Presence Indicator': 'Presence Dot',
  'Standard Content Card': 'Interactive Clickable',
  'Interactive Clickable Card': 'Interactive Clickable',
  'Sortable Columns Table': 'Selectable Rows',
  'Selectable Row Table': 'Selectable Rows',
  'Single Open Disclosure': 'Multiple Expandable',
  'Multiple Concurrent Expansion': 'Multiple Expandable',
  'Determinate Progress': 'Indeterminate',
  'Indeterminate Progress': 'Indeterminate',
  'Paragraph Loading Lines': 'Card Placeholder',
  'Card Loading Placeholder': 'Card Placeholder',
  'First-Time User Experience': 'No Search Results',
  'No Search Results Found': 'No Search Results',
  'Subtle Content Divider': 'Labeled Center',
  'Labeled Center Divider': 'Labeled Center',
  'Size Variants (Small, Medium, Large)': 'Size Variants',
  'Accessible Indeterminate Indicator': 'Size Variants',
  'Bookmark Toggle': 'Mute Notifications',
  'Mute Notifications': 'Mute Notifications',
  'Single Select Alignment Group': 'Multi-Select',
  'Multi-Select Text Formatting': 'Multi-Select',
  'Shortcut Key Combination': 'Escape Key',
  'Escape Key': 'Escape Key',
  '16:9 Video Canvas': '1:1 Square',
  '1:1 Square Thumbnail': '1:1 Square',
  'Smooth Expandable Section': 'Nested Disclosure',
  'Nested Disclosure': 'Nested Disclosure',
  'Interactive Selection': 'Validation Error',
  'Validation Error State': 'Validation Error',
  'Radio Group': 'Disabled Option',
  'Disabled Option': 'Disabled Option',
  'Default with Leading Icon': 'With Icon',
  'Validation Error State': 'Error State',
  'Disabled State': 'Disabled',
  'Standard Multiline Input': 'Disabled',
  'Disabled Multiline Input': 'Disabled',
  'Workspace Selector': 'Disabled',
  'Disabled Select': 'Disabled',
  'Checked Toggle': 'Unchecked',
  'Unchecked Toggle': 'Unchecked',
  'Continuous Value Slider': 'Stepped Interval',
  'Stepped Interval Range': 'Stepped Interval',
  'Horizontal Tabs': 'Segmented Pill',
  'Segmented Pill Tabs': 'Segmented Pill',
  'Slash Separator': 'Chevron Arrow',
  'Chevron Arrow Separator': 'Chevron Arrow',
  'Standard Page Numbers': 'Compact Previous / Next',
  'Compact Previous / Next': 'Compact Previous / Next',
  'With Badge Counter': 'Active Pill',
  'Active Pill State': 'Active Pill',
  'Contextual Action Menu': 'Destructive Action',
  'Destructive Menu Item': 'Destructive Action',
  'Keyboard Shortcut Trigger': 'Pre-Filtered Group',
  'Pre-Filtered Command Group': 'Pre-Filtered Group',
  'Informational Notice': 'Warning',
  'Warning Alert': 'Warning',
  'Danger Alert': 'Danger',
  'Confirmation Modal': 'Form Modal',
  'Form Dialog Modal': 'Form Modal',
  'Supplementary Context': 'Shortcut Tooltip',
  'Keyboard Shortcut Tooltip': 'Shortcut Tooltip',
  'Success Notification': 'Warning Alert',
  'Warning Alert Toast': 'Warning Alert',
  'Slide-over Drawer Modal': 'Bottom Sheet',
  'Slide from Bottom': 'Bottom Sheet',
  'Anchored Floating Popover': 'Form Popover',
  'Form Popover': 'Form Popover',
  'Slide-Out Sheet Drawer': 'Left Navigation',
  'Left Navigation Sheet': 'Left Navigation',
  'Right-Click Context Menu': 'Destructive Action',
  'Menu with Danger Action': 'Destructive Action',
  'User Profile Preview': 'Link Preview',
  'Link OpenGraph Preview': 'Link Preview'
};

// Also clean up Terminal variants specifically
// Terminal variant 0: 'Custom Delays'
// Terminal variant 1: 'Multi-Command'
const terminalPatch = `  // 2. Terminal - Parity with Magic UI (Custom Delays & Multi-Command)
  Terminal: [
    {
      title: 'Custom Delays',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Terminal({
            children: html\`
              \${U.TypingAnimation({ delay: 0, text: '$ ls' })}
              \${U.AnimatedSpan({ delay: 800, className: 's-terminal-span--info', children: 'Documents Downloads Pictures' })}
              \${U.TypingAnimation({ delay: 1600, text: '$ cd Documents' })}
              \${U.TypingAnimation({ delay: 2400, text: '$ pwd' })}
              \${U.AnimatedSpan({ delay: 3200, className: 's-terminal-span--success', children: '/home/user/Documents' })}
            \`
          })}
        </div>
      \`,
      code: \`import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/sarahui/terminal";

export function TerminalCustomDelays() {
  return (
    <Terminal>
      <TypingAnimation delay={0}>$ ls</TypingAnimation>
      <AnimatedSpan delay={800} className="text-blue-500">
        Documents Downloads Pictures
      </AnimatedSpan>
      <TypingAnimation delay={1600}>$ cd Documents</TypingAnimation>
      <TypingAnimation delay={2400}>$ pwd</TypingAnimation>
      <AnimatedSpan delay={3200} className="text-green-500">
        /home/user/Documents
      </AnimatedSpan>
    </Terminal>
  );
}\`
    },
    {
      title: 'Multi-Command',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Terminal({
            children: html\`
              \${U.TypingAnimation({ text: '$ git status' })}
              \${U.AnimatedSpan({ className: 's-terminal-span--info', children: 'On branch main. Changes not staged for commit:' })}
              \${U.AnimatedSpan({ className: 's-terminal-span--muted', children: '  modified: packages/ui/src/terminal.tsx' })}
              \${U.TypingAnimation({ text: '$ git commit -m "feat: magic terminal"' })}
              \${U.AnimatedSpan({ className: 's-terminal-span--success', children: '[main 9b8c12a] feat: magic terminal' })}
              \${U.AnimatedSpan({ className: 's-terminal-span--success', children: ' 1 file changed, 24 insertions(+)' })}
            \`
          })}
        </div>
      \`,
      code: \`import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/sarahui/terminal";

export function TerminalMultiCommand() {
  return (
    <Terminal>
      <TypingAnimation>$ git status</TypingAnimation>
      <AnimatedSpan className="text-blue-500">On branch main. Changes not staged for commit:</AnimatedSpan>
      <AnimatedSpan className="text-muted-foreground">  modified: packages/ui/src/terminal.tsx</AnimatedSpan>
      <TypingAnimation>$ git commit -m "feat: magic terminal"</TypingAnimation>
      <AnimatedSpan className="text-green-500">[main 9b8c12a] feat: magic terminal</AnimatedSpan>
      <AnimatedSpan className="text-green-500"> 1 file changed, 24 insertions(+)</AnimatedSpan>
    </Terminal>
  );
}\`
    }
  ],`;

// HeroVideoDialog variants specifically
const heroVideoDialogPatch = `  // 3. HeroVideoDialog - Parity with Magic UI (Top-in-bottom-out, From Bottom)
  HeroVideoDialog: [
    {
      title: 'Top-in-bottom-out',
      preview: () => html\`<div style="width:100%;max-width:680px;margin:0 auto;">\${U.HeroVideoDialog({animationStyle:'top-in-bottom-out',videoSrc:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',thumbnailAlt:'sarahUI Top In Lightbox'})}</div>\`,
      code: \`import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogTopIn() {
  return (
    <HeroVideoDialog
      animationStyle="top-in-bottom-out"
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
      thumbnailAlt="Platform Overview"
    />
  );
}\`
    },
    {
      title: 'From Bottom',
      preview: () => html\`<div style="width:100%;max-width:680px;margin:0 auto;">\${U.HeroVideoDialog({animationStyle:'from-bottom',videoSrc:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',thumbnailAlt:'sarahUI From Bottom Lightbox'})}</div>\`,
      code: \`import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogFromBottom() {
  return (
    <HeroVideoDialog
      animationStyle="from-bottom"
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
      thumbnailAlt="Platform Overview"
    />
  );
}\`
    }
  ],`;

// BentoGrid variants specifically
const bentoGridPatch = `  // 4. BentoGrid - Parity with Magic UI (Vertical, Three Columns)
  BentoGrid: [
    {
      title: 'Vertical',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:480px;">
          \${U.BentoCard({
            icon: 'folder',
            name: 'Save your files',
            description: 'We automatically save your files as you type.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'search',
            name: 'Full text search',
            description: 'Search through all your files and project dependencies in one place.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'globe',
            name: 'Multilingual',
            description: 'Supports 100+ languages and locale formats effortlessly.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'calendar',
            name: 'Calendar',
            description: 'Use the calendar to filter and track your files by date.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'bell',
            name: 'Notifications',
            description: 'Get notified when someone shares a file or mentions you in a comment.',
            cta: 'Learn more',
            href: '#components'
          })}
        </div>
      \`,
      code: \`import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoDemoVertical() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}\`
    },
    {
      title: 'Three Columns',
      preview: () => html\`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;width:100%;max-width:860px;">
          \${U.BentoCard({
            icon: 'folder',
            name: 'Save your files',
            description: 'We automatically save your files as you type.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'bell',
            name: 'Notifications',
            description: 'Get notified when someone shares a file or mentions you in a comment.',
            cta: 'Learn more',
            href: '#components'
          })}
          \${U.BentoCard({
            icon: 'spark',
            name: 'AI Automation',
            description: 'Instantly generate accessible UI primitives.',
            cta: 'Learn more',
            href: '#components'
          })}
        </div>
      \`,
      code: \`import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoGridThreeColumns() {
  return (
    <BentoGrid className="grid-cols-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}\`
    }
  ],`;

// AnimatedList variants specifically
const animatedListPatch = `  // 5. AnimatedList
  AnimatedList: [
    {
      title: 'Security Feed',
      preview: () => html\`
        <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;overflow:hidden;padding:16px;align-items:center;justify-content:flex-start;">
          \${U.AnimatedList({
            delay: 1400,
            items: [
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#10B981;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">SSL Certificate Renewed</strong><span class="s-small s-muted">Automatic Let's Encrypt renewal · 2m ago</span></div></div>\`,
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#3B82F6;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">API Token Generated</strong><span class="s-small s-muted">Key prod-sec-01 created by Admin · 8m ago</span></div></div>\`,
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#A855F7;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">Database Backup Completed</strong><span class="s-small s-muted">Daily snapshot verified · 15m ago</span></div></div>\`,
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#F59E0B;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">Firewall Rule Updated</strong><span class="s-small s-muted">Blocked 142 suspicious requests · 22m ago</span></div></div>\`
            ]
          })}
          <div style="pointer-events:none;position:absolute;inset:auto 0 0 0;height:25%;background:linear-gradient(to top,var(--s-bg-canvas),transparent);"></div>
        </div>
      \`,
      code: \`import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListAuditFeed() {
  return (
    <AnimatedList delay={1400}>
      {auditLogs.map((log) => (
        <AuditRow key={log.id} log={log} />
      ))}
    </AnimatedList>
  );
}\`
    },
    {
      title: 'Team Activity',
      preview: () => html\`
        <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;overflow:hidden;padding:16px;align-items:center;justify-content:flex-start;">
          \${U.AnimatedList({
            delay: 1300,
            items: [
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#5B3DF5;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">AK</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Alex Khan pushed 3 commits</strong><span class="s-small s-muted">feat: optimize canvas particle pipeline</span></div></div>\`,
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#EC4899;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">MR</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Maya Rahman opened PR #142</strong><span class="s-small s-muted">docs: add interactive preview guidelines</span></div></div>\`,
              html\`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#10B981;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">SN</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Sara Naz approved release</strong><span class="s-small s-muted">v2.4 ready for edge deployment</span></div></div>\`
            ]
          })}
          <div style="pointer-events:none;position:absolute;inset:auto 0 0 0;height:25%;background:linear-gradient(to top,var(--s-bg-canvas),transparent);"></div>
        </div>
      \`,
      code: \`import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListTeamFeed() {
  return (
    <AnimatedList delay={1300}>
      {teamActivity.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </AnimatedList>
  );
}\`
    }
  ],`;

// Replace Terminal, HeroVideoDialog, BentoGrid, AnimatedList in catalogContent
catalogContent = catalogContent.replace(
  /\/\/\s*2\.\s*Terminal[\s\S]*?(?=\/\/\s*3\.\s*HeroVideoDialog)/,
  terminalPatch + '\n\n'
);

catalogContent = catalogContent.replace(
  /\/\/\s*3\.\s*HeroVideoDialog[\s\S]*?(?=\/\/\s*4\.\s*BentoGrid)/,
  heroVideoDialogPatch + '\n\n'
);

catalogContent = catalogContent.replace(
  /\/\/\s*4\.\s*BentoGrid[\s\S]*?(?=\/\/\s*5\.\s*AnimatedList)/,
  bentoGridPatch + '\n\n'
);

catalogContent = catalogContent.replace(
  /\/\/\s*5\.\s*AnimatedList[\s\S]*?(?=\/\/\s*6\.\s*Dock)/,
  animatedListPatch + '\n\n'
);

// Now clean up all title lines and remove description lines across catalogContent
for (const [oldTitle, newTitle] of Object.entries(titleMap)) {
  const regex = new RegExp(`title:\\s*['"\`]${oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`, 'g');
  catalogContent = catalogContent.replace(regex, `title: '${newTitle}'`);
}

// Strip out any `description: '...',` lines inside `componentVariants`
// (leave descriptions elsewhere if any, but inside variants clean them up)
catalogContent = catalogContent.replace(/description:\s*['"`][^'"`]*?['"`],?\n\s*/g, '');

fs.writeFileSync(catalogPath, catalogContent, 'utf8');
console.log('Successfully patched all component variant titles and removed descriptions!');

