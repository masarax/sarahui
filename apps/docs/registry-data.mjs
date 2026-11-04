/**
 * SarahUI Native Component Registry Metadata
 * 100% self-contained metadata dictionary for all 120 components.
 * Zero external filesystem dependencies on read_ui/magicui.
 */

// Null-prototype lookup table: keys such as "__proto__", "constructor" or
// "toString" can never resolve to inherited Object.prototype members.
const specialSlugs = Object.freeze(Object.assign(Object.create(null), {
  BentoGrid: 'bento-grid',
  Highlighter: 'highlighter',
  Iphone: 'iphone',
  AnimatedSubscribeButton: 'animated-subscribe-button',
  AnimatedThemeToggler: 'animated-theme-toggler',
  Floating3DParticles: 'floating-3d-particles',
  Text3DFlip: 'text-3d-flip'
}));

export function toKebab(str) {
  if (typeof str !== 'string') return '';
  if (Object.hasOwn(specialSlugs, str)) {
    return specialSlugs[str];
  }
  // Split acronym runs first ("HTMLElement" -> "HTML-Element"), then
  // lower/digit-to-upper boundaries ("BentoGrid" -> "Bento-Grid").
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export function sanitizeTsx(rawCode) {
  if (typeof rawCode !== 'string' || !rawCode) return rawCode;

  let code = rawCode;

  // 1. Icon libraries -> sarahui/icons
  code = code.replace(/from\s+['"]@radix-ui\/react-icons['"]/g, 'from "sarahui/icons"');
  code = code.replace(/from\s+['"]lucide-react['"]/g, 'from "sarahui/icons"');
  code = code.replace(/from\s+['"]@heroicons\/[^'"]+['"]/g, 'from "sarahui/icons"');
  code = code.replace(/from\s+['"]react-icons\/[^'"]+['"]/g, 'from "sarahui/icons"');

  // 2. Component registry and component directories -> @/components/sarahui/
  code = code.replace(/@\/registry\/magicui\//g, '@/components/sarahui/');
  code = code.replace(/@\/components\/magicui\//g, '@/components/sarahui/');
  code = code.replace(/@\/components\/ui\//g, '@/components/sarahui/');
  code = code.replace(/from\s+['"]magicui['"]/g, 'from "sarahui"');

  // 3. Examples and utils -> sarahui
  code = code.replace(/from\s+['"]@\/registry\/example\/[^'"]+['"]/g, 'from "sarahui"');
  code = code.replace(/from\s+['"]@\/lib\/utils['"]/g, 'from "sarahui/utils"');

  // 4. Specific asset URLs, foreign handles & CLI (MUST execute before generic text/domain replacements)
  code = code.replace(/https:\/\/cdn\.(?:magicui\.design|sarahui\.dev)\/ocean-small\.webm/g, 'assets/ocean.webm');
  code = code.replace(/https:\/\/github\.com\/dillionverma/g, 'https://github.com/sarahui');
  code = code.replace(/pnpm dlx shadcn@latest init/g, 'npx sarahui init');

  // 5. Generic domain & branding text replacements
  code = code.replace(/magicui\.design/g, 'sarahui.dev');
  code = code.replace(/Magic UI/g, 'sarahUI');
  code = code.replace(/MagicUI/g, 'sarahUI');
  code = code.replace(/magicui/g, 'sarahui');

  return code;
}

export const registry = {
  "Marquee": {
    "name": "Marquee",
    "slug": "marquee",
    "category": "Components",
    "description": "Infinite smooth auto-scrolling marquee ticker with hover pause.",
    "tokens": [
      "--s-marquee-duration",
      "--s-marquee-gap"
    ],
    "props": [
      {
        "title": "Marquee Props",
        "rows": [
          {
            "prop": "direction",
            "type": "'left' | 'right' | 'up' | 'down'",
            "defaultVal": "'left'",
            "description": "Scroll direction of the marquee ticker track"
          },
          {
            "prop": "reverse",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to reverse the animation scroll direction"
          },
          {
            "prop": "pauseOnHover",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to pause ticker animation on mouse hover"
          },
          {
            "prop": "speed",
            "type": "number | string",
            "defaultVal": "30",
            "description": "Scroll animation speed in seconds or speed scale"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "30",
            "description": "Explicit duration override in seconds"
          },
          {
            "prop": "vertical",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether ticker scrolls vertically instead of horizontally"
          },
          {
            "prop": "repeat",
            "type": "number",
            "defaultVal": "4",
            "description": "Number of track copies to duplicate for seamless looping"
          },
          {
            "prop": "gap",
            "type": "number | string",
            "defaultVal": "'1rem'",
            "description": "Spacing between adjacent items in the track"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling and layout overrides"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes to attach to root element"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Content elements to replicate inside the scrolling ticker"
          }
        ]
      }
    ],
    "demoTsx": "import { Marquee } from \"@/components/sarahui/marquee\";\n\nexport function MarqueeDemo() {\n  return (\n    <div className=\"relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl\">\n      <Marquee pauseOnHover className=\"[--duration:20s]\">\n        <div className=\"flex gap-4\">\n          <span className=\"rounded-lg border px-4 py-2 font-medium\">Design Systems</span>\n          <span className=\"rounded-lg border px-4 py-2 font-medium\">Zero Dependencies</span>\n          <span className=\"rounded-lg border px-4 py-2 font-medium\">Adobe Spectrum Tokens</span>\n          <span className=\"rounded-lg border px-4 py-2 font-medium\">Progressive Enhancement</span>\n        </div>\n      </Marquee>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Terminal": {
    "name": "Terminal",
    "slug": "terminal",
    "category": "Components",
    "description": "Interactive macOS styled code terminal with typing command execution.",
    "tokens": [
      "--s-terminal-radius",
      "--s-terminal-padding",
      "--s-terminal-bg",
      "--s-terminal-border"
    ],
    "props": [
      {
        "title": "Terminal Props",
        "rows": [
          {
            "prop": "command",
            "type": "string",
            "defaultVal": "''",
            "description": "Primary terminal command line string to type or display"
          },
          {
            "prop": "steps",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Sequence of interactive terminal steps and output lines"
          },
          {
            "prop": "output",
            "type": "string",
            "defaultVal": "''",
            "description": "Static preformatted command execution output"
          },
          {
            "prop": "sequence",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to animate terminal command steps sequentially"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for terminal window container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for terminal container"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Terminal content or child elements (e.g. AnimatedSpan)"
          }
        ]
      },
      {
        "title": "AnimatedSpan Props",
        "rows": [
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Animation entrance delay in milliseconds"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Custom CSS class for output row styling"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Span output text or markup"
          }
        ]
      }
    ],
    "demoTsx": "import {\n  AnimatedSpan,\n  Terminal,\n  TypingAnimation,\n} from \"@/components/sarahui/terminal\";\n\nexport function TerminalDemo() {\n  return (\n    <Terminal>\n      <TypingAnimation>&gt; npx sarahui init</TypingAnimation>\n      <AnimatedSpan className=\"text-green-500\">\n        ✔ Preflight checks.\n      </AnimatedSpan>\n      <AnimatedSpan className=\"text-green-500\">\n        ✔ Verifying framework configuration.\n      </AnimatedSpan>\n      <AnimatedSpan className=\"text-green-500\">\n        ✔ Validating Tailwind CSS preset.\n      </AnimatedSpan>\n      <AnimatedSpan className=\"text-green-500\">\n        ✔ 319 design tokens compiled.\n      </AnimatedSpan>\n      <AnimatedSpan className=\"text-green-500\">\n        ✔ Writing sarahui.config.json.\n      </AnimatedSpan>\n      <TypingAnimation className=\"text-muted-foreground\">\n        Success! Project initialization completed.\n      </TypingAnimation>\n      <TypingAnimation className=\"text-muted-foreground\">\n        You may now add components using npx sarahui add &lt;component&gt;.\n      </TypingAnimation>\n    </Terminal>\n  );\n}",
    "accessibility": {
      "role": "region / log",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "HeroVideoDialog": {
    "name": "HeroVideoDialog",
    "slug": "hero-video-dialog",
    "category": "Components",
    "description": "Hero video thumbnail trigger with pulsing play button and accessible modal lightbox.",
    "tokens": [
      "--s-hero-video-radius",
      "--s-hero-video-halo-size",
      "--s-action-primary"
    ],
    "props": [
      {
        "title": "HeroVideoDialog Props",
        "rows": [
          {
            "prop": "videoSrc",
            "type": "string",
            "defaultVal": "required",
            "description": "URL of the video stream or embed player to show in modal dialog"
          },
          {
            "prop": "thumbnailSrc",
            "type": "string",
            "defaultVal": "required",
            "description": "URL of the video thumbnail poster preview image"
          },
          {
            "prop": "thumbnailAlt",
            "type": "string",
            "defaultVal": "'Video thumbnail'",
            "description": "Accessible description for the thumbnail image"
          },
          {
            "prop": "animationStyle",
            "type": "'from-center' | 'from-bottom' | 'from-top' | 'from-left' | 'from-right' | 'fade' | 'top-in-bottom-out' | 'left-in-right-out'",
            "defaultVal": "'from-center'",
            "description": "Modal dialog entrance and exit animation transition"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for dialog trigger container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for trigger element"
          }
        ]
      }
    ],
    "demoTsx": "import { HeroVideoDialog } from \"@/components/sarahui/hero-video-dialog\";\n\nexport function HeroVideoDialogDemo() {\n  return (\n    <div className=\"relative flex items-center justify-center p-6\">\n      <HeroVideoDialog\n        className=\"block\"\n        animationStyle=\"from-center\"\n        videoSrc=\"https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb\"\n        thumbnailSrc=\"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80\"\n        thumbnailAlt=\"SarahUI Component Architecture Overview\"\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "BentoGrid": {
    "name": "BentoGrid",
    "slug": "bento-grid",
    "category": "Components",
    "description": "Responsive Bento-box grid layout with hover elevation and contextual cards.",
    "tokens": [
      "--s-bento-radius",
      "--s-bento-gap",
      "--s-bento-padding",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "BentoGrid Props",
        "rows": [
          {
            "prop": "columns",
            "type": "number",
            "defaultVal": "3",
            "description": "Number of columns for grid layout (e.g. 2, 3, 4)"
          },
          {
            "prop": "cols",
            "type": "number | null",
            "defaultVal": "null",
            "description": "Alternative column count configuration"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for grid container styling"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for grid element"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "BentoCard components or card items to arrange in the grid"
          }
        ]
      },
      {
        "title": "BentoCard Props",
        "rows": [
          {
            "prop": "name",
            "type": "string",
            "defaultVal": "required",
            "description": "Card title or headline"
          },
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative title property"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "required",
            "description": "Feature description body text"
          },
          {
            "prop": "graphic",
            "type": "any",
            "defaultVal": "-",
            "description": "Visual header graphic or illustration"
          },
          {
            "prop": "background",
            "type": "any",
            "defaultVal": "-",
            "description": "Background illustration or graphic layer"
          },
          {
            "prop": "icon",
            "type": "string",
            "defaultVal": "''",
            "description": "Icon name identifier"
          },
          {
            "prop": "Icon",
            "type": "any",
            "defaultVal": "-",
            "description": "Custom icon element or SVG"
          },
          {
            "prop": "cta",
            "type": "string",
            "defaultVal": "'Learn more'",
            "description": "Call-to-action link button label"
          },
          {
            "prop": "href",
            "type": "string",
            "defaultVal": "'#'",
            "description": "Destination URL for card link and CTA"
          },
          {
            "prop": "colSpan",
            "type": "number",
            "defaultVal": "1",
            "description": "Number of grid columns spanned by card"
          },
          {
            "prop": "rowSpan",
            "type": "number",
            "defaultVal": "1",
            "description": "Number of grid rows spanned by card"
          },
          {
            "prop": "colStart",
            "type": "number",
            "defaultVal": "-",
            "description": "Grid column starting line index"
          },
          {
            "prop": "colEnd",
            "type": "number",
            "defaultVal": "-",
            "description": "Grid column ending line index"
          },
          {
            "prop": "rowStart",
            "type": "number",
            "defaultVal": "-",
            "description": "Grid row starting line index"
          },
          {
            "prop": "rowEnd",
            "type": "number",
            "defaultVal": "-",
            "description": "Grid row ending line index"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Custom CSS class for card article container"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Additional card body content"
          }
        ]
      }
    ],
    "demoTsx": "import { BentoGrid, BentoCard } from \"@/components/sarahui/bento-grid\";\nimport { FileTextIcon, BellIcon, Share2Icon, CalendarIcon } from \"sarahui/icons\";\n\nconst features = [\n  {\n    Icon: FileTextIcon,\n    name: \"Save your files\",\n    description: \"We automatically save your files as you type.\",\n    href: \"#\",\n    cta: \"Learn more\",\n    className: \"col-span-3 lg:col-span-1\",\n    background: <div className=\"absolute right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105\" />,\n  },\n  {\n    Icon: BellIcon,\n    name: \"Notifications\",\n    description: \"Get notified when something happens.\",\n    href: \"#\",\n    cta: \"Learn more\",\n    className: \"col-span-3 lg:col-span-2\",\n    background: <div className=\"absolute right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105\" />,\n  },\n  {\n    Icon: Share2Icon,\n    name: \"Integrations\",\n    description: \"Supports 100+ integrations and count.\",\n    href: \"#\",\n    cta: \"Learn more\",\n    className: \"col-span-3 lg:col-span-2\",\n    background: <div className=\"absolute right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105\" />,\n  },\n  {\n    Icon: CalendarIcon,\n    name: \"Calendar\",\n    description: \"Use the calendar to filter your files by date.\",\n    href: \"#\",\n    cta: \"Learn more\",\n    className: \"col-span-3 lg:col-span-1\",\n    background: <div className=\"absolute right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105\" />,\n  },\n];\n\nexport function BentoDemo() {\n  return (\n    <BentoGrid>\n      {features.map((feature, idx) => (\n        <BentoCard key={idx} {...feature} />\n      ))}\n    </BentoGrid>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedList": {
    "name": "AnimatedList",
    "slug": "animated-list",
    "category": "Components",
    "description": "Staggered animated notification stack with smooth entrance physics.",
    "tokens": [
      "--s-animated-list-radius",
      "--s-animated-list-gap",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "AnimatedList Props",
        "rows": [
          {
            "prop": "items",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Array of item data or strings to render in the animated list"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Child notification items to animate in sequence"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "1000",
            "description": "Stagger delay (in ms) between consecutive item appearances"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for feed list container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for list container"
          }
        ]
      }
    ],
    "demoTsx": "import { AnimatedList } from \"@/components/sarahui/animated-list\";\n\ninterface NotificationItem {\n  name: string;\n  description: string;\n  icon: string;\n  color: string;\n  time: string;\n}\n\nconst notifications: NotificationItem[] = [\n  { name: \"Payment received\", description: \"sarahUI Enterprise\", time: \"15m ago\", icon: \"💸\", color: \"#00C9A7\" },\n  { name: \"User signed up\", description: \"sarahUI Studio\", time: \"10m ago\", icon: \"👤\", color: \"#FFB800\" },\n  { name: \"New message\", description: \"sarahUI Community\", time: \"5m ago\", icon: \"💬\", color: \"#FF3D71\" },\n  { name: \"New event\", description: \"sarahUI Release v0.1.0\", time: \"2m ago\", icon: \"🗞️\", color: \"#1E86FF\" },\n];\n\nexport function AnimatedListDemo() {\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl\">\n      <AnimatedList delay={1500}>\n        {notifications.map((item, idx) => (\n          <div key={idx} className=\"flex items-center gap-3 rounded-lg border p-4 shadow-sm bg-surface\">\n            <span className=\"flex size-10 items-center justify-center rounded-full text-lg\" style={{ backgroundColor: item.color }}>\n              {item.icon}\n            </span>\n            <div className=\"flex flex-col overflow-hidden\">\n              <span className=\"text-sm font-medium\">{item.name}</span>\n              <span className=\"text-xs text-muted\">{item.description}</span>\n            </div>\n            <span className=\"ml-auto text-xs text-muted\">{item.time}</span>\n          </div>\n        ))}\n      </AnimatedList>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "log",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Dock": {
    "name": "Dock",
    "slug": "dock",
    "category": "Components",
    "description": "macOS styled magnifying dock container with smooth spring cursor physics.",
    "tokens": [
      "--s-dock-radius",
      "--s-dock-size",
      "--s-dock-gap",
      "--s-dock-padding"
    ],
    "props": [
      {
        "title": "Dock Props",
        "rows": [
          {
            "prop": "direction",
            "type": "'bottom' | 'top' | 'vertical'",
            "defaultVal": "'bottom'",
            "description": "Dock orientation and edge placement"
          },
          {
            "prop": "iconSize",
            "type": "number",
            "defaultVal": "40",
            "description": "Base icon size in pixels when idle"
          },
          {
            "prop": "iconMagnification",
            "type": "number",
            "defaultVal": "60",
            "description": "Maximum magnified icon size in pixels on cursor hover"
          },
          {
            "prop": "iconDistance",
            "type": "number",
            "defaultVal": "140",
            "description": "Proximity distance in pixels across which magnification applies"
          },
          {
            "prop": "items",
            "type": "DockItem[]",
            "defaultVal": "[]",
            "description": "Array of dock action items with icons and labels"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Custom dock icons or child elements"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for dock toolbar container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for toolbar"
          }
        ]
      }
    ],
    "demoTsx": "import React from \"react\";\nimport { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from \"sarahui/icons\";\nimport { Dock, DockIcon } from \"@/components/sarahui/dock\";\n\nexport function DockDemo() {\n  return (\n    <div className=\"relative flex h-[240px] w-full items-center justify-center\">\n      <Dock direction=\"bottom\">\n        <DockIcon>\n          <a href=\"#\" aria-label=\"Home\" className=\"flex size-10 items-center justify-center\">\n            <HomeIcon className=\"size-5\" />\n          </a>\n        </DockIcon>\n        <DockIcon>\n          <a href=\"#\" aria-label=\"Blog\" className=\"flex size-10 items-center justify-center\">\n            <PencilIcon className=\"size-5\" />\n          </a>\n        </DockIcon>\n        <DockIcon>\n          <a href=\"#\" aria-label=\"Events\" className=\"flex size-10 items-center justify-center\">\n            <CalendarIcon className=\"size-5\" />\n          </a>\n        </DockIcon>\n        <DockIcon>\n          <a href=\"#\" aria-label=\"Contact\" className=\"flex size-10 items-center justify-center\">\n            <MailIcon className=\"size-5\" />\n          </a>\n        </DockIcon>\n      </Dock>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "toolbar",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Globe": {
    "name": "Globe",
    "slug": "globe",
    "category": "Components",
    "description": "Interactive canvas-rendered 3D wireframe vector spinning globe.",
    "tokens": [
      "--s-globe-radius",
      "--s-brand-indigo",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "Globe Props",
        "rows": [
          {
            "prop": "size",
            "type": "number | string",
            "defaultVal": "360",
            "description": "Diameter size of the interactive globe in pixels"
          },
          {
            "prop": "config",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Configuration parameters for globe rendering (rotation, markers)"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for canvas wrapper container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for canvas element"
          }
        ]
      }
    ],
    "demoTsx": "import { Globe } from \"@/components/sarahui/globe\";\n\nexport function GlobeDemo() {\n  return (\n    <div className=\"relative flex h-[440px] w-full max-w-xl items-center justify-center overflow-hidden rounded-lg border bg-background pt-8 pb-40\">\n      <span className=\"pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10\">\n        Globe\n      </span>\n      <Globe className=\"top-28\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "TweetCard": {
    "name": "TweetCard",
    "slug": "tweet-card",
    "category": "Components",
    "description": "High-fidelity social post card with engagement stats and verified badge.",
    "tokens": [
      "--s-tweet-card-radius",
      "--s-tweet-card-padding",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "TweetCard Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "'2095541863956742174'",
            "description": "The unique ID of the tweet to render"
          },
          {
            "prop": "name",
            "type": "string",
            "defaultVal": "''",
            "description": "Author display name"
          },
          {
            "prop": "authorName",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative author name property"
          },
          {
            "prop": "handle",
            "type": "string",
            "defaultVal": "''",
            "description": "Author handle or username"
          },
          {
            "prop": "avatar",
            "type": "string",
            "defaultVal": "''",
            "description": "Author avatar image URL"
          },
          {
            "prop": "verified",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether author displays verified badge"
          },
          {
            "prop": "text",
            "type": "string",
            "defaultVal": "''",
            "description": "Tweet body text content"
          },
          {
            "prop": "content",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative content text property"
          },
          {
            "prop": "timestamp",
            "type": "string",
            "defaultVal": "''",
            "description": "Publication timestamp string"
          },
          {
            "prop": "date",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative date string property"
          },
          {
            "prop": "likes",
            "type": "number | string",
            "defaultVal": "0",
            "description": "Like count displayed in tweet metrics"
          },
          {
            "prop": "retweets",
            "type": "number | string",
            "defaultVal": "0",
            "description": "Retweet / repost count displayed in tweet metrics"
          },
          {
            "prop": "video",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether the tweet includes embedded video"
          },
          {
            "prop": "videoUrl",
            "type": "string",
            "defaultVal": "''",
            "description": "Direct URL to video stream or file"
          },
          {
            "prop": "mediaUrl",
            "type": "string",
            "defaultVal": "''",
            "description": "URL of primary embedded media image"
          },
          {
            "prop": "media",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Array of embedded media items"
          },
          {
            "prop": "images",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of image URLs for multi-photo grid"
          },
          {
            "prop": "urlPreview",
            "type": "any",
            "defaultVal": "null",
            "description": "Open Graph link preview card metadata"
          },
          {
            "prop": "autoPlay",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether embedded video starts playing automatically"
          },
          {
            "prop": "muted",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether embedded video starts muted"
          },
          {
            "prop": "loop",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether embedded video loops continuously"
          },
          {
            "prop": "controls",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether video playback controls are accessible"
          },
          {
            "prop": "showFooter",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to render tweet engagement metrics footer"
          },
          {
            "prop": "apiUrl",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional custom API proxy URL for fetching tweet JSON"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for card article container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for article element"
          }
        ]
      }
    ],
    "demoTsx": "import { TweetCard } from \"@/components/sarahui/tweet-card\";\n\nexport function TweetCardDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-4\">\n      <TweetCard id=\"2095541863956742174\" className=\"shadow-2xl\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "OrbitingCircles": {
    "name": "OrbitingCircles",
    "slug": "orbiting-circles",
    "category": "Components",
    "description": "Concentric orbital tracks rotating nested elements in 3D perspective.",
    "tokens": [
      "--s-orbit-icon-size",
      "--s-orbit-path-border",
      "--s-border-default"
    ],
    "props": [
      {
        "title": "OrbitingCircles Props",
        "rows": [
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Icon elements to place along orbital track"
          },
          {
            "prop": "items",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Array of icon data or objects to orbit along path"
          },
          {
            "prop": "icons",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Alternative icon objects property"
          },
          {
            "prop": "radius",
            "type": "number",
            "defaultVal": "50",
            "description": "Radius of the orbital circle path in pixels"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "20",
            "description": "Time in seconds for one complete 360-degree orbit"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "10",
            "description": "Initial animation delay in seconds"
          },
          {
            "prop": "reverse",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether orbital motion moves counter-clockwise"
          },
          {
            "prop": "path",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to render the subtle circular background orbit track"
          },
          {
            "prop": "iconSize",
            "type": "number",
            "defaultVal": "30",
            "description": "Size of orbiting icon nodes in pixels"
          },
          {
            "prop": "speed",
            "type": "number",
            "defaultVal": "1",
            "description": "Animation speed multiplier"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for orbit container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for container"
          }
        ]
      }
    ],
    "demoTsx": "import { OrbitingCircles } from \"@/components/sarahui/orbiting-circles\";\nimport { FileIcon, SettingsIcon, SearchIcon } from \"sarahui/icons\";\n\nexport function OrbitingCirclesDemo() {\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl\">\n      <span className=\"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10\">\n        Circles\n      </span>\n      <OrbitingCircles className=\"size-[30px] border-none bg-transparent\" duration={20} delay={20} radius={80}>\n        <FileIcon className=\"size-6 text-brand\" />\n      </OrbitingCircles>\n      <OrbitingCircles className=\"size-[30px] border-none bg-transparent\" duration={20} delay={10} radius={80}>\n        <SettingsIcon className=\"size-6 text-brand\" />\n      </OrbitingCircles>\n      <OrbitingCircles className=\"size-[50px] border-none bg-transparent\" radius={190} duration={20} reverse>\n        <SearchIcon className=\"size-8 text-indigo-500\" />\n      </OrbitingCircles>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AvatarCircles": {
    "name": "AvatarCircles",
    "slug": "avatar-circles",
    "category": "Components",
    "description": "Overlapping avatar cluster displaying active members and excess counts.",
    "tokens": [
      "--s-avatar-circles-size",
      "--s-avatar-circles-overlap",
      "--s-border-default"
    ],
    "props": [
      {
        "title": "AvatarCircles Props",
        "rows": [
          {
            "prop": "numPeople",
            "type": "number",
            "defaultVal": "99",
            "description": "Count of additional people to display in overflow counter badge"
          },
          {
            "prop": "avatarUrls",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of avatar image URLs"
          },
          {
            "prop": "avatars",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Array of avatar objects with imageUrl and optional profileUrl"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for avatar group container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for container"
          }
        ]
      }
    ],
    "demoTsx": "import { AvatarCircles } from \"@/components/sarahui/avatar-circles\";\n\nconst avatarUrls = [\n  \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80\",\n  \"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80\",\n  \"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80\",\n  \"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80\",\n];\n\nexport function AvatarCirclesDemo() {\n  return <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />;\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "IconCloud": {
    "name": "IconCloud",
    "slug": "icon-cloud",
    "category": "Components",
    "description": "Interactive 3D Fibonacci sphere of rotating icons with mouse drag control.",
    "tokens": [
      "--s-icon-cloud-size",
      "--s-bg-surface",
      "--s-text-primary"
    ],
    "props": [
      {
        "title": "IconCloud Props",
        "rows": [
          {
            "prop": "images",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of direct image URLs to project on the spherical cloud"
          },
          {
            "prop": "iconSlugs",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of SimpleIcons brand slugs to render"
          },
          {
            "prop": "slugs",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Alternative slugs array property"
          },
          {
            "prop": "icons",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Alternative icon names array property"
          },
          {
            "prop": "showControl",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to render interactive pause and resume controls"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for icon cloud canvas wrapper"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for wrapper element"
          }
        ]
      }
    ],
    "demoTsx": "import { IconCloud } from \"@/components/sarahui/icon-cloud\";\n\nconst slugs = [\n  \"typescript\", \"javascript\", \"react\", \"html5\", \"css3\", \"nodedotjs\",\n  \"express\", \"nextdotjs\", \"prisma\", \"amazonaws\", \"postgresql\", \"firebase\",\n  \"nginx\", \"vercel\", \"testinglibrary\", \"jest\", \"cypress\", \"docker\", \"git\",\n  \"github\", \"gitlab\", \"visualstudiocode\", \"android\", \"figma\"\n];\n\nexport function IconCloudDemo() {\n  return (\n    <div className=\"relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8\">\n      <IconCloud iconSlugs={slugs} />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Lens": {
    "name": "Lens",
    "slug": "lens",
    "category": "Components",
    "description": "Interactive magnifying loupe that zooms in on high-detail card areas.",
    "tokens": [
      "--s-lens-radius",
      "--s-lens-loupe-border",
      "--s-border-focus"
    ],
    "props": [
      {
        "title": "Lens Props",
        "rows": [
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Image or media content to inspect with the magnifying lens"
          },
          {
            "prop": "zoomFactor",
            "type": "number | string",
            "defaultVal": "1.5",
            "description": "Magnification zoom multiplier factor"
          },
          {
            "prop": "zoom",
            "type": "number | string",
            "defaultVal": "1.5",
            "description": "Alternative zoom multiplier property"
          },
          {
            "prop": "lensSize",
            "type": "number",
            "defaultVal": "170",
            "description": "Diameter of the circular magnifier loupe in pixels"
          },
          {
            "prop": "isStatic",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether the lens loupe stays at a fixed stationary position"
          },
          {
            "prop": "position",
            "type": "{ x: number; y: number }",
            "defaultVal": "{ x: 0, y: 0 }",
            "description": "Fixed coordinates for static lens positioning"
          },
          {
            "prop": "defaultPosition",
            "type": "{ x: number; y: number }",
            "defaultVal": "{ x: 0, y: 0 }",
            "description": "Initial default position of magnifier"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "0.1",
            "description": "Animation transition duration for lens movement"
          },
          {
            "prop": "lensColor",
            "type": "string",
            "defaultVal": "'black'",
            "description": "Background fill color of the lens element"
          },
          {
            "prop": "ariaLabel",
            "type": "string",
            "defaultVal": "'Image magnifier'",
            "description": "Accessible screen reader label for loupe region"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for lens container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for container"
          }
        ]
      }
    ],
    "demoTsx": "import { Lens } from \"@/components/sarahui/lens\";\n\nexport function LensDemo() {\n  return (\n    <div className=\"relative flex items-center justify-center p-6\">\n      <Lens zoomFactor={2} lensSize={150}>\n        <img\n          src=\"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80\"\n          alt=\"Lens Demo Image\"\n          className=\"rounded-lg object-cover\"\n        />\n      </Lens>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Pointer": {
    "name": "Pointer",
    "slug": "pointer",
    "category": "Components",
    "description": "Multiplayer real-time live cursor badge with customizable name and color.",
    "tokens": [
      "--s-pointer-badge-radius",
      "--s-brand-indigo",
      "--s-text-inverse"
    ],
    "props": [
      {
        "title": "Pointer Props",
        "rows": [
          {
            "prop": "name",
            "type": "string",
            "defaultVal": "''",
            "description": "Name label displayed next to cursor pointer badge"
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "''",
            "description": "Custom accent color for cursor glyph and badge"
          },
          {
            "prop": "cursor",
            "type": "any",
            "defaultVal": "-",
            "description": "Custom SVG cursor glyph or icon component"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Content wrapped inside interactive pointer area"
          },
          {
            "prop": "content",
            "type": "any",
            "defaultVal": "-",
            "description": "Alternative pointer badge content"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for pointer container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for pointer element"
          }
        ]
      }
    ],
    "demoTsx": "import { Pointer } from \"@/components/sarahui/pointer\";\n\nexport function PointerDemo() {\n  return (\n    <div className=\"relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background\">\n      <Pointer name=\"Sarah\" color=\"#5B3DF5\">\n        <div className=\"rounded-xl border border-dashed p-8 text-center\">\n          <p className=\"text-lg font-medium text-foreground\">Move your cursor over this card</p>\n          <p className=\"text-sm text-muted-foreground\">Custom collaborative pointer follows motion</p>\n        </div>\n      </Pointer>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "SmoothCursor": {
    "name": "SmoothCursor",
    "slug": "smooth-cursor",
    "category": "Components",
    "description": "Fluid spring-physics cursor follower creating a responsive pointer trail.",
    "tokens": [
      "--s-smooth-cursor-size",
      "--s-brand-indigo",
      "--s-shadow-subtle"
    ],
    "props": [
      {
        "title": "SmoothCursor Props",
        "rows": [
          {
            "prop": "cursor",
            "type": "any",
            "defaultVal": "<DefaultCursorSVG />",
            "description": "Custom cursor component or SVG glyph"
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "'currentColor'",
            "description": "Fill color for default cursor glyph"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for cursor container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for cursor element"
          }
        ]
      }
    ],
    "demoTsx": "import { SmoothCursor } from \"@/components/sarahui/smooth-cursor\";\n\nexport function SmoothCursorDemo() {\n  return (\n    <div className=\"relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background\">\n      <SmoothCursor color=\"#5B3DF5\" />\n      <div className=\"text-center\">\n        <h3 className=\"text-xl font-semibold\">Smooth Cursor Active</h3>\n        <p className=\"text-sm text-muted-foreground\">Spring physics with zero global pointer lock</p>\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ProgressiveBlur": {
    "name": "ProgressiveBlur",
    "slug": "progressive-blur",
    "category": "Components",
    "description": "Multi-stop progressive gradient backdrop blur filter.",
    "tokens": [
      "--s-progressive-blur-height",
      "--s-bg-canvas"
    ],
    "props": [
      {
        "title": "ProgressiveBlur Props",
        "rows": [
          {
            "prop": "position",
            "type": "'top' | 'bottom' | 'left' | 'right' | 'both'",
            "defaultVal": "'bottom'",
            "description": "Edge where the progressive blur gradient is anchored"
          },
          {
            "prop": "direction",
            "type": "'top' | 'bottom' | 'left' | 'right' | 'both'",
            "defaultVal": "'bottom'",
            "description": "Alternative direction property"
          },
          {
            "prop": "height",
            "type": "number | string",
            "defaultVal": "'30%'",
            "description": "Height (or width) coverage of the progressive blur overlay"
          },
          {
            "prop": "blurLevels",
            "type": "number[]",
            "defaultVal": "[0.5, 1, 2, 4, 8, 16, 32, 64]",
            "description": "Array of blur radii (in px) defining the multi-layer Gaussian blur curve"
          },
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Optional scrollable content wrapped within blur overlay"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for blur overlay container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for container"
          }
        ]
      }
    ],
    "demoTsx": "import { ProgressiveBlur } from \"@/components/sarahui/progressive-blur\";\n\nexport function ProgressiveBlurDemo() {\n  return (\n    <div className=\"relative h-[350px] w-full overflow-hidden rounded-xl border bg-background\">\n      <div className=\"space-y-4 p-6\">\n        <h3 className=\"text-xl font-bold\">Progressive Blur Gradient</h3>\n        <p className=\"text-muted-foreground\">\n          Multi-layer Gaussian blur creates smooth visual depth and content fade.\n        </p>\n      </div>\n      <ProgressiveBlur position=\"bottom\" height=\"40%\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "DottedMap": {
    "name": "DottedMap",
    "slug": "dotted-map",
    "category": "Components",
    "description": "Minimalist dotted world vector map with pulsating geographic location markers.",
    "tokens": [
      "--s-dotted-map-dot-size",
      "--s-brand-indigo",
      "--s-border-default"
    ],
    "props": [
      {
        "title": "DottedMap Props",
        "rows": [
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "800",
            "description": "Width of the SVG viewport coordinate grid"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "400",
            "description": "Height of the SVG viewport coordinate grid"
          },
          {
            "prop": "dotRadius",
            "type": "number",
            "defaultVal": "1.6",
            "description": "Radius (in px) of individual geographic map dots"
          },
          {
            "prop": "dotSize",
            "type": "number",
            "defaultVal": "1.6",
            "description": "Alternative dot size property"
          },
          {
            "prop": "dotColor",
            "type": "string",
            "defaultVal": "'currentColor'",
            "description": "Fill color for continent dots (adapts to theme)"
          },
          {
            "prop": "markerColor",
            "type": "string",
            "defaultVal": "'#FF6900'",
            "description": "Accent color for marker beacons and radar rings"
          },
          {
            "prop": "markers",
            "type": "MapMarker[]",
            "defaultVal": "[]",
            "description": "Array of geographic markers with lat/lng coordinates and size"
          },
          {
            "prop": "points",
            "type": "MapMarker[]",
            "defaultVal": "[]",
            "description": "Alternative geographic points array"
          },
          {
            "prop": "lines",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Array of connection paths/routes between geographic coordinates"
          },
          {
            "prop": "routes",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Alternative routes array"
          },
          {
            "prop": "connections",
            "type": "any[]",
            "defaultVal": "[]",
            "description": "Alternative connection lines array"
          },
          {
            "prop": "glow",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to render subtle radial vignette glow backdrop"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for map container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for map container"
          }
        ]
      }
    ],
    "demoTsx": "import { DottedMap } from \"@/components/sarahui/dotted-map\";\n\nconst markers = [\n  { lat: 40.7128, lng: -74.006, label: \"New York\", size: 4 },\n  { lat: 51.5074, lng: -0.1278, label: \"London\", size: 4 },\n  { lat: 35.6762, lng: 139.6503, label: \"Tokyo\", size: 4 },\n  { lat: -33.8688, lng: 151.2093, label: \"Sydney\", size: 4 },\n];\n\nexport function DottedMapDemo() {\n  return (\n    <div className=\"relative h-[400px] w-full overflow-hidden rounded-xl border bg-background\">\n      <DottedMap markers={markers} dotColor=\"var(--s-brand-indigo, #5B3DF5)\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedBeam": {
    "name": "AnimatedBeam",
    "slug": "animated-beam",
    "category": "Special Effects",
    "description": "Animated curved SVG beam connecting nodes with radiant gradient flow.",
    "tokens": [
      "--s-animated-beam-stroke-width",
      "--s-animated-beam-color-from",
      "--s-animated-beam-color-to"
    ],
    "props": [
      {
        "title": "AnimatedBeam Props",
        "rows": [
          {
            "prop": "curvature",
            "type": "number",
            "defaultVal": "0",
            "description": "The curvature arch of the quadratic Bezier beam curve"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "5",
            "description": "Duration in seconds of one complete beam animation cycle"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Initial animation delay in seconds"
          },
          {
            "prop": "reverse",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether radiant beam travel direction is reversed"
          },
          {
            "prop": "pathColor",
            "type": "string",
            "defaultVal": "'gray'",
            "description": "Stroke color for the background track line"
          },
          {
            "prop": "pathWidth",
            "type": "number",
            "defaultVal": "2",
            "description": "Stroke width thickness of the beam line"
          },
          {
            "prop": "pathOpacity",
            "type": "number",
            "defaultVal": "0.2",
            "description": "Opacity level of the static background track path"
          },
          {
            "prop": "gradientStartColor",
            "type": "string",
            "defaultVal": "'#ffaa40'",
            "description": "Leading start color of glowing beam gradient"
          },
          {
            "prop": "gradientStopColor",
            "type": "string",
            "defaultVal": "'#9c40ff'",
            "description": "Trailing stop color of glowing beam gradient"
          },
          {
            "prop": "startX",
            "type": "number",
            "defaultVal": "0",
            "description": "Horizontal start coordinate for custom path"
          },
          {
            "prop": "startY",
            "type": "number",
            "defaultVal": "0",
            "description": "Vertical start coordinate for custom path"
          },
          {
            "prop": "endX",
            "type": "number",
            "defaultVal": "0",
            "description": "Horizontal end coordinate for custom path"
          },
          {
            "prop": "endY",
            "type": "number",
            "defaultVal": "0",
            "description": "Vertical end coordinate for custom path"
          },
          {
            "prop": "d",
            "type": "string",
            "defaultVal": "''",
            "description": "Explicit SVG path definition string"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for SVG beam element"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for SVG element"
          }
        ]
      }
    ],
    "demoTsx": "import React, { forwardRef, useRef } from \"react\";\nimport { AnimatedBeam } from \"@/components/sarahui/animated-beam\";\nimport { GoogleDriveIcon, NotionIcon, WhatsAppIcon, OpenAIIcon, GoogleDocsIcon, ZapierIcon, MessengerIcon } from \"sarahui/icons\";\n\nconst Circle = forwardRef<\n  HTMLDivElement,\n  { className?: string; children?: React.ReactNode }\n>(({ className, children }, ref) => {\n  return (\n    <div\n      ref={ref}\n      className={`z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 p-3 shadow-md ${className || \"\"}`}\n    >\n      {children}\n    </div>\n  );\n});\n\nCircle.displayName = \"Circle\";\n\nexport function AnimatedBeamDemo() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const div1Ref = useRef<HTMLDivElement>(null);\n  const div2Ref = useRef<HTMLDivElement>(null);\n  const div3Ref = useRef<HTMLDivElement>(null);\n  const div4Ref = useRef<HTMLDivElement>(null);\n  const div5Ref = useRef<HTMLDivElement>(null);\n  const div6Ref = useRef<HTMLDivElement>(null);\n  const div7Ref = useRef<HTMLDivElement>(null);\n\n  return (\n    <div\n      className=\"relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10 shadow-sm\"\n      ref={containerRef}\n    >\n      <div className=\"flex size-full max-h-[240px] max-w-lg flex-col items-stretch justify-between gap-10\">\n        <div className=\"flex flex-row items-center justify-between\">\n          <Circle ref={div1Ref}>\n            <GoogleDriveIcon className=\"size-6\" />\n          </Circle>\n          <Circle ref={div5Ref}>\n            <GoogleDocsIcon className=\"size-6\" />\n          </Circle>\n        </div>\n        <div className=\"flex flex-row items-center justify-between\">\n          <Circle ref={div2Ref}>\n            <NotionIcon className=\"size-6\" />\n          </Circle>\n          <Circle ref={div4Ref} className=\"size-16\">\n            <OpenAIIcon className=\"size-8\" />\n          </Circle>\n          <Circle ref={div6Ref}>\n            <ZapierIcon className=\"size-6\" />\n          </Circle>\n        </div>\n        <div className=\"flex flex-row items-center justify-between\">\n          <Circle ref={div3Ref}>\n            <WhatsAppIcon className=\"size-6\" />\n          </Circle>\n          <Circle ref={div7Ref}>\n            <MessengerIcon className=\"size-6\" />\n          </Circle>\n        </div>\n      </div>\n\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div1Ref}\n        toRef={div4Ref}\n        curvature={-75}\n        endYOffset={-10}\n      />\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div2Ref}\n        toRef={div4Ref}\n      />\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div3Ref}\n        toRef={div4Ref}\n        curvature={75}\n        endYOffset={10}\n      />\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div5Ref}\n        toRef={div4Ref}\n        curvature={-75}\n        endYOffset={-10}\n        reverse\n      />\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div6Ref}\n        toRef={div4Ref}\n        reverse\n      />\n      <AnimatedBeam\n        containerRef={containerRef}\n        fromRef={div7Ref}\n        toRef={div4Ref}\n        curvature={75}\n        endYOffset={10}\n        reverse\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "BorderBeam": {
    "name": "BorderBeam",
    "slug": "border-beam",
    "category": "Special Effects",
    "description": "Luminous glowing gradient beam smoothly tracing around container borders.",
    "tokens": [
      "--s-border-beam-width",
      "--s-border-beam-color-from",
      "--s-border-beam-color-to"
    ],
    "props": [
      {
        "title": "BorderBeam Props",
        "rows": [
          {
            "prop": "size",
            "type": "number | string",
            "defaultVal": "200",
            "description": "Size (in px) of perimeter glowing laser beam"
          },
          {
            "prop": "duration",
            "type": "number | string",
            "defaultVal": "15",
            "description": "Duration (in seconds) of one complete border cycle"
          },
          {
            "prop": "delay",
            "type": "number | string",
            "defaultVal": "0",
            "description": "Initial animation start delay in seconds"
          },
          {
            "prop": "colorFrom",
            "type": "string",
            "defaultVal": "'#ffaa40'",
            "description": "Leading gradient color of the border beam"
          },
          {
            "prop": "colorTo",
            "type": "string",
            "defaultVal": "'#9c40ff'",
            "description": "Trailing gradient color of the border beam"
          },
          {
            "prop": "reverse",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether border beam animates counter-clockwise"
          },
          {
            "prop": "initialOffset",
            "type": "number | string",
            "defaultVal": "0",
            "description": "Initial perimeter offset percentage along border path"
          },
          {
            "prop": "borderWidth",
            "type": "number | string",
            "defaultVal": "1.5",
            "description": "Thickness of the glowing border stroke in pixels"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for border beam container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "style",
            "type": "string",
            "defaultVal": "''",
            "description": "Inline style string for custom CSS properties"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for beam container"
          }
        ]
      }
    ],
    "demoTsx": "import { BorderBeam } from \"@/components/sarahui/border-beam\";\n\nexport function BorderBeamDemo() {\n  return (\n    <div className=\"relative flex h-[200px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-xl\">\n      <span className=\"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10\">\n        Border Beam\n      </span>\n      <BorderBeam size={250} duration={12} delay={9} />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ShineBorder": {
    "name": "ShineBorder",
    "slug": "shine-border",
    "category": "Special Effects",
    "description": "Animated multi-color gradient rim highlighting card borders.",
    "tokens": [
      "--s-shine-border-width",
      "--s-shine-border-radius",
      "--s-brand-indigo"
    ],
    "props": [
      {
        "title": "ShineBorder Props",
        "rows": [
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Card content or elements wrapped inside shining border"
          },
          {
            "prop": "borderWidth",
            "type": "number",
            "defaultVal": "1",
            "description": "Border stroke width in pixels"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "14",
            "description": "Duration in seconds for one full shine rotation"
          },
          {
            "prop": "color",
            "type": "string | string[]",
            "defaultVal": "'#000000'",
            "description": "Primary shine highlight color or array of colors"
          },
          {
            "prop": "shineColor",
            "type": "string | string[]",
            "defaultVal": "''",
            "description": "Alternative shine color property"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for shine container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for container"
          }
        ]
      }
    ],
    "demoTsx": "import { ShineBorder } from \"@/components/sarahui/shine-border\";\n\nexport function ShineBorderDemo() {\n  return (\n    <ShineBorder\n      className=\"relative flex h-[200px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl\"\n      color={[\"#A07CFE\", \"#FE8FB5\", \"#FFBE7B\"]}\n    >\n      <span className=\"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10\">\n        Shine Border\n      </span>\n    </ShineBorder>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "MagicCard": {
    "name": "MagicCard",
    "slug": "magic-card",
    "category": "Special Effects",
    "description": "Spotlight radial gradient following cursor movements across the surface.",
    "tokens": [
      "--s-magic-card-radius",
      "--s-magic-card-gradient-size",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "MagicCard Props",
        "rows": [
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Card content and body elements"
          },
          {
            "prop": "mode",
            "type": "'gradient' | 'orb'",
            "defaultVal": "'gradient'",
            "description": "Card illumination mode (subtle spotlight gradient or glowing orb)"
          },
          {
            "prop": "gradientSize",
            "type": "number",
            "defaultVal": "200",
            "description": "Radial spotlight radius size in pixels"
          },
          {
            "prop": "gradientColor",
            "type": "string",
            "defaultVal": "'#262626'",
            "description": "Color of the interactive hover gradient spotlight"
          },
          {
            "prop": "gradientOpacity",
            "type": "number",
            "defaultVal": "0.8",
            "description": "Maximum opacity of spotlight on cursor hover"
          },
          {
            "prop": "gradientFrom",
            "type": "string",
            "defaultVal": "''",
            "description": "Leading color stop for gradient glow"
          },
          {
            "prop": "gradientTo",
            "type": "string",
            "defaultVal": "''",
            "description": "Trailing color stop for gradient glow"
          },
          {
            "prop": "glowFrom",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative leading glow color"
          },
          {
            "prop": "glowTo",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative trailing glow color"
          },
          {
            "prop": "glowAngle",
            "type": "number",
            "defaultVal": "0",
            "description": "Rotation angle for directional glow"
          },
          {
            "prop": "glowSize",
            "type": "number",
            "defaultVal": "200",
            "description": "Radius size for glowing backdrop"
          },
          {
            "prop": "glowBlur",
            "type": "number",
            "defaultVal": "40",
            "description": "Filter blur radius for glow effect"
          },
          {
            "prop": "glowOpacity",
            "type": "number",
            "defaultVal": "0.8",
            "description": "Backdrop glow layer opacity"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for card article container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "style",
            "type": "string",
            "defaultVal": "''",
            "description": "Inline style string"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for card element"
          }
        ]
      }
    ],
    "demoTsx": "import { MagicCard } from \"@/components/sarahui/magic-card\";\n\nexport function MagicCardDemo() {\n  return (\n    <div className=\"flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row\">\n      <MagicCard\n        className=\"cursor-pointer flex-col items-center justify-center text-4xl shadow-2xl\"\n        gradientColor=\"#262626\"\n      >\n        Magic Card\n      </MagicCard>\n      <MagicCard\n        className=\"cursor-pointer flex-col items-center justify-center text-4xl shadow-2xl\"\n        gradientColor=\"#262626\"\n      >\n        Spotlight Effect\n      </MagicCard>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "GlareHover": {
    "name": "GlareHover",
    "slug": "glare-hover",
    "category": "Special Effects",
    "description": "A diagonal light glare on hover using a pseudo-element gradient, CSS variables, and smooth transition.",
    "tokens": [
      "--s-glare-hover-radius",
      "--s-border-default",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "GlareHover Props",
        "rows": [
          {
            "prop": "children",
            "type": "any",
            "defaultVal": "-",
            "description": "Card or UI element wrapped by the interactive glare layer"
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "'rgba(255, 255, 255, 0.4)'",
            "description": "Color and opacity of the 3D specular glare highlight sweep"
          },
          {
            "prop": "opacity",
            "type": "number",
            "defaultVal": "0.4",
            "description": "Maximum opacity level of specular glare highlight"
          },
          {
            "prop": "background",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional custom background styling"
          },
          {
            "prop": "angle",
            "type": "number",
            "defaultVal": "-45",
            "description": "Linear angle in degrees across which glare light sweeps"
          },
          {
            "prop": "size",
            "type": "number",
            "defaultVal": "100",
            "description": "Width of glare reflection band as percentage"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "650",
            "description": "Transition duration in milliseconds for glare sweep"
          },
          {
            "prop": "playOnce",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether glare sweep plays only on initial hover"
          },
          {
            "prop": "width",
            "type": "number | string",
            "defaultVal": "''",
            "description": "Container width override"
          },
          {
            "prop": "height",
            "type": "number | string",
            "defaultVal": "''",
            "description": "Container height override"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for glare hover container"
          },
          {
            "prop": "class",
            "type": "string",
            "defaultVal": "''",
            "description": "Alternative class name property"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Additional HTML attributes for glare container"
          }
        ]
      }
    ],
    "demoTsx": "import { GlareHover } from \"@/components/sarahui/glare-hover\";\nimport { Card } from \"@/components/sarahui/card\";\n\nexport function GlareHoverDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-6\">\n      <GlareHover className=\"rounded-xl\">\n        <Card\n          title=\"Specular Glare Card\"\n          description=\"Hover over this card to watch the 3D glare sheen sweep across the surface.\"\n        />\n      </GlareHover>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Meteors": {
    "name": "Meteors",
    "slug": "meteors",
    "category": "Special Effects",
    "description": "Atmospheric meteor streaks showering through background surfaces.",
    "tokens": [],
    "props": [
      {
        "title": "Meteors",
        "rows": [
          {
            "prop": "number",
            "type": "number",
            "defaultVal": "20",
            "description": "Number of meteors"
          },
          {
            "prop": "minDelay",
            "type": "number",
            "defaultVal": "0.2",
            "description": "Minimum delay in seconds before meteor animation starts"
          },
          {
            "prop": "maxDelay",
            "type": "number",
            "defaultVal": "1.2",
            "description": "Maximum delay in seconds before meteor animation starts"
          },
          {
            "prop": "minDuration",
            "type": "number",
            "defaultVal": "2",
            "description": "Minimum duration in seconds for meteor animation"
          },
          {
            "prop": "maxDuration",
            "type": "number",
            "defaultVal": "10",
            "description": "Maximum duration in seconds for meteor animation"
          },
          {
            "prop": "angle",
            "type": "number",
            "defaultVal": "215",
            "description": "Angle in degrees for meteor trajectory"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Optional additional CSS classes"
          }
        ]
      }
    ],
    "demoTsx": "import { Meteors } from \"@/components/sarahui/meteors\"\n\nexport default function MeteorDemo() {\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <Meteors number={30} />\n      <span className=\"pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10\">\n        Meteors\n      </span>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Confetti": {
    "name": "Confetti",
    "slug": "confetti",
    "category": "Special Effects",
    "description": "Interactive celebratory confetti particle burst on user click.",
    "tokens": [],
    "props": [
      {
        "title": "Confetti",
        "rows": [
          {
            "prop": "ref",
            "type": "React.Ref<ConfettiRef>",
            "defaultVal": "null",
            "description": "Ref exposing imperative `fire(options?: ConfettiOptions)` method"
          },
          {
            "prop": "options",
            "type": "ConfettiOptions",
            "defaultVal": "{}",
            "description": "Default options for automatic or imperative confetti triggers"
          },
          {
            "prop": "globalOptions",
            "type": "ConfettiGlobalOptions",
            "defaultVal": "{ resize: true, useWorker: true }",
            "description": "Global options passed to `canvas-confetti.create()"
          },
          {
            "prop": "manualstart",
            "type": "Boolean",
            "defaultVal": "false",
            "description": "Prevents automatic confetti firing on component mount"
          },
          {
            "prop": "className",
            "type": "String",
            "defaultVal": "undefined",
            "description": "Custom CSS classes applied to the canvas element"
          }
        ]
      },
      {
        "title": "ConfettiRef",
        "rows": [
          {
            "prop": "Method",
            "type": "Parameters",
            "defaultVal": "Return Type",
            "description": "Description"
          },
          {
            "prop": "fire",
            "type": "options?: ConfettiOptions",
            "defaultVal": "Promise<void> | void",
            "description": "Imperatively triggers a confetti burst on the canvas instance"
          }
        ]
      },
      {
        "title": "ConfettiOptions",
        "rows": [
          {
            "prop": "Field",
            "type": "Type",
            "defaultVal": "Default",
            "description": "Description"
          },
          {
            "prop": "particleCount",
            "type": "Integer",
            "defaultVal": "50",
            "description": "Number of confetti particles to launch"
          },
          {
            "prop": "angle",
            "type": "Number",
            "defaultVal": "90",
            "description": "Launch angle in degrees"
          },
          {
            "prop": "spread",
            "type": "Number",
            "defaultVal": "45",
            "description": "Spread angle in degrees"
          },
          {
            "prop": "startVelocity",
            "type": "Number",
            "defaultVal": "45",
            "description": "Initial particle velocity"
          },
          {
            "prop": "decay",
            "type": "Number",
            "defaultVal": "0.9",
            "description": "Velocity decay rate"
          },
          {
            "prop": "gravity",
            "type": "Number",
            "defaultVal": "1",
            "description": "Gravity applied to particles"
          },
          {
            "prop": "drift",
            "type": "Number",
            "defaultVal": "0",
            "description": "Horizontal drift factor"
          },
          {
            "prop": "flat",
            "type": "Boolean",
            "defaultVal": "false",
            "description": "Renders flat 2D shapes"
          },
          {
            "prop": "ticks",
            "type": "Number",
            "defaultVal": "200",
            "description": "Number of animation frames confetti lasts"
          },
          {
            "prop": "origin",
            "type": "{ x: number, y: number }",
            "defaultVal": "{ x: 0.5, y: 0.5 }",
            "description": "Normalized viewport origin coordinates (`0.0` to `1.0`)"
          },
          {
            "prop": "colors",
            "type": "Array of Strings",
            "defaultVal": "HEX array",
            "description": "Custom HEX color palette"
          },
          {
            "prop": "shapes",
            "type": "Array of Strings",
            "defaultVal": "['square', 'circle', 'star']",
            "description": "Particle shapes or custom text shapes"
          },
          {
            "prop": "zIndex",
            "type": "Integer",
            "defaultVal": "9999",
            "description": "Z-index of the confetti burst"
          },
          {
            "prop": "scalar",
            "type": "Number",
            "defaultVal": "1",
            "description": "Scaling factor for particle dimensions"
          }
        ]
      },
      {
        "title": "ConfettiButton",
        "rows": [
          {
            "prop": "options",
            "type": "ConfettiOptions & ConfettiGlobalOptions",
            "defaultVal": "{}",
            "description": "Options for the confetti launched on button click"
          },
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "null",
            "description": "Button label and child elements"
          },
          {
            "prop": "ref",
            "type": "React.Ref<HTMLButtonElement>",
            "defaultVal": "null",
            "description": "Forwarded DOM reference to the underlying button"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { useRef } from \"react\"\n\nimport { Confetti, type ConfettiRef } from \"@/components/sarahui/confetti\"\n\nexport default function ConfettiDemo() {\n  const confettiRef = useRef<ConfettiRef>(null)\n\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <span className=\"pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10\">\n        Confetti\n      </span>\n\n      <Confetti\n        ref={confettiRef}\n        className=\"absolute top-0 left-0 z-0 size-full\"\n        onMouseEnter={() => {\n          confettiRef.current?.fire({})\n        }}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Particles": {
    "name": "Particles",
    "slug": "particles",
    "category": "Special Effects",
    "description": "Interactive background particle field rendered on canvas.",
    "tokens": [],
    "props": [
      {
        "title": "Particles Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name for the component"
          },
          {
            "prop": "quantity",
            "type": "number",
            "defaultVal": "100",
            "description": "The number of particles"
          },
          {
            "prop": "staticity",
            "type": "number",
            "defaultVal": "50",
            "description": "The staticity of the particles"
          },
          {
            "prop": "ease",
            "type": "number",
            "defaultVal": "50",
            "description": "The ease of the particles"
          },
          {
            "prop": "size",
            "type": "number",
            "defaultVal": "0.4",
            "description": "The size of the particles"
          },
          {
            "prop": "refresh",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to refresh the particles"
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "#ffffff",
            "description": "The color of the particles"
          },
          {
            "prop": "vx",
            "type": "number",
            "defaultVal": "0",
            "description": "The x velocity of the particles"
          },
          {
            "prop": "vy",
            "type": "number",
            "defaultVal": "0",
            "description": "The y velocity of the particles"
          }
        ]
      }
    ],
    "demoTsx": "import { Particles } from \"@/components/sarahui/particles\";\n\nexport function ParticlesDemo() {\n  const color = \"var(--s-brand-indigo, #5B3DF5)\";\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl\">\n      <span className=\"pointer-events-none z-10 text-center text-8xl leading-none font-semibold whitespace-pre-wrap\">\n        Particles\n      </span>\n      <Particles\n        className=\"absolute inset-0 z-0\"\n        quantity={100}\n        ease={80}\n        color={color}\n        refresh\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedThemeToggler": {
    "name": "AnimatedThemeToggler",
    "slug": "animated-theme-toggler",
    "category": "Special Effects",
    "description": "Smooth circular mask view-transition theme switcher with sun and moon icons.",
    "tokens": [],
    "props": [
      {
        "title": "AnimatedThemeToggler Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "—",
            "description": "Additional classes for the button"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "400",
            "description": "Duration of the theme transition animation in milliseconds"
          },
          {
            "prop": "variant",
            "type": "TransitionVariant",
            "defaultVal": "\"circle\"",
            "description": "Shape used for the view-transition clip-path reveal"
          },
          {
            "prop": "fromCenter",
            "type": "boolean",
            "defaultVal": "false",
            "description": "If true, the clip expands from the viewport center instead of the button"
          },
          {
            "prop": "theme",
            "type": "\"light\" | \"dark\"",
            "defaultVal": "—",
            "description": "Controlled theme value. When set, the parent owns persistence (e.g. `next-themes`)."
          },
          {
            "prop": "onThemeChange",
            "type": "(theme: \"light\" | \"dark\") => void",
            "defaultVal": "—",
            "description": "Called on toggle. Pair with `theme` for controlled usage."
          }
        ]
      }
    ],
    "demoTsx": "import { AnimatedThemeToggler } from \"@/components/sarahui/animated-theme-toggler\"\n\nexport default function AnimatedThemeTogglerDemo() {\n  return (\n    <div className=\"flex justify-center p-6\">\n      <AnimatedThemeToggler />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "BlurFade": {
    "name": "BlurFade",
    "slug": "blur-fade",
    "category": "Animations",
    "description": "Smooth blur-to-focus entrance transition with gentle translation.",
    "tokens": [],
    "props": [
      {
        "title": "BlurFade Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content to be animated"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "variant",
            "type": "object",
            "defaultVal": "-",
            "description": "Custom animation variants for motion component"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "0.4",
            "description": "Duration (seconds) for the animation"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Delay (seconds) before the animation starts"
          },
          {
            "prop": "offset",
            "type": "number",
            "defaultVal": "6",
            "description": "Offset for the animation"
          },
          {
            "prop": "direction",
            "type": "string",
            "defaultVal": "\"down\"",
            "description": "Direction for the animation (`up`, `down`, `left`, `right`)"
          },
          {
            "prop": "inView",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to trigger animation when component is in view"
          },
          {
            "prop": "inViewMargin",
            "type": "MarginType",
            "defaultVal": "\"-50px\"",
            "description": "Margin for triggering the in-view animation"
          },
          {
            "prop": "blur",
            "type": "string",
            "defaultVal": "\"6px\"",
            "description": "Amount of blur to apply during the animation"
          }
        ]
      }
    ],
    "demoTsx": "import { BlurFade } from \"@/components/sarahui/blur-fade\"\n\nconst images = Array.from({ length: 9 }, (_, i) => {\n  const isLandscape = i % 2 === 0\n  const width = isLandscape ? 800 : 600\n  const height = isLandscape ? 600 : 800\n  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`\n})\n\nexport default function BlurFadeDemo() {\n  return (\n    <section id=\"photos\">\n      <div className=\"columns-2 gap-4 sm:columns-3\">\n        {images.map((imageUrl, idx) => (\n          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>\n            <img\n              className=\"mb-4 size-full rounded-lg object-contain\"\n              src={imageUrl}\n              alt={`Random stock image ${idx + 1}`}\n            />\n          </BlurFade>\n        ))}\n      </div>\n    </section>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "TextAnimate": {
    "name": "TextAnimate",
    "slug": "text-animate",
    "category": "Text Animations",
    "description": "Staggered fluid character entrance with configurable fade, slide, and blur effects.",
    "tokens": [],
    "props": [
      {
        "title": "TextAnimate Props",
        "rows": [
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "The text content to animate"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "segmentClassName",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to each segment"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Delay before animation starts"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "0.3",
            "description": "Duration of the animation"
          },
          {
            "prop": "variants",
            "type": "Variants",
            "defaultVal": "-",
            "description": "Custom motion variants for the animation"
          },
          {
            "prop": "as",
            "type": "\"article\" | \"div\" | \"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"li\" | \"p\" | \"section\" | \"span\"",
            "defaultVal": "\"p\"",
            "description": "The element type to render"
          },
          {
            "prop": "by",
            "type": "\"text\" | \"word\" | \"character\" | \"line\"",
            "defaultVal": "\"word\"",
            "description": "How to split the text (\"text\", \"word\", \"character\")"
          },
          {
            "prop": "startOnView",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to start animation when component enters viewport"
          },
          {
            "prop": "once",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to animate only once"
          },
          {
            "prop": "animation",
            "type": "AnimationVariant",
            "defaultVal": "\"fadeIn\"",
            "description": "The animation preset to use"
          },
          {
            "prop": "accessible",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to render an accessible screen-reader label"
          }
        ]
      }
    ],
    "demoTsx": "import { TextAnimate } from \"@/components/sarahui/text-animate\"\n\nexport default function TextAnimateDemo() {\n  return (\n    <TextAnimate animation=\"blurInUp\" by=\"character\" once>\n      Blur in by character\n    </TextAnimate>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "TypingAnimation": {
    "name": "TypingAnimation",
    "slug": "typing-animation",
    "category": "Text Animations",
    "description": "Realistic typewriter animation with blinking cursor for engaging slogans.",
    "tokens": [],
    "props": [
      {
        "title": "TypingAnimation Props",
        "rows": [
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "Single string to animate"
          },
          {
            "prop": "words",
            "type": "string[]",
            "defaultVal": "-",
            "description": "Array of strings to type and delete in sequence"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "100",
            "description": "Duration for each character"
          },
          {
            "prop": "typeSpeed",
            "type": "number",
            "defaultVal": "100",
            "description": "Speed of typing animation (ms per character)"
          },
          {
            "prop": "deleteSpeed",
            "type": "number",
            "defaultVal": "50",
            "description": "Speed of deleting animation (ms per character)"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Delay before animation starts (in ms)"
          },
          {
            "prop": "pauseDelay",
            "type": "number",
            "defaultVal": "1000",
            "description": "Pause duration between words (in ms)"
          },
          {
            "prop": "loop",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to loop the animation"
          },
          {
            "prop": "as",
            "type": "\"article\" | \"div\" | \"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"li\" | \"p\" | \"section\" | \"span\"",
            "defaultVal": "\"span\"",
            "description": "Component to render as"
          },
          {
            "prop": "startOnView",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Start animation when component is in view"
          },
          {
            "prop": "showCursor",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to show the typing cursor"
          },
          {
            "prop": "blinkCursor",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether the cursor should blink"
          },
          {
            "prop": "cursorStyle",
            "type": "\"line\" | \"block\" | \"underscore\"",
            "defaultVal": "\"line\"",
            "description": "Style of the cursor (like VSCode)"
          }
        ]
      }
    ],
    "demoTsx": "import { TypingAnimation } from \"@/components/sarahui/typing-animation\"\n\nexport default function Component() {\n  return <TypingAnimation>Hello World! 👋</TypingAnimation>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "LineShadowText": {
    "name": "LineShadowText",
    "slug": "line-shadow-text",
    "category": "Text Animations",
    "description": "Layered 3D isometric sharp cast shadow typography.",
    "tokens": [],
    "props": [
      {
        "title": "LineShadowText Props",
        "rows": [
          {
            "prop": "shadowColor",
            "type": "string",
            "defaultVal": "\"black\"",
            "description": "The color of the shadow effect"
          },
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "The text to display with shadow effect"
          },
          {
            "prop": "as",
            "type": "\"article\" | \"div\" | \"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"li\" | \"p\" | \"section\" | \"span\"",
            "defaultVal": "\"span\"",
            "description": "The HTML element to render the text as"
          }
        ]
      }
    ],
    "demoTsx": "import { LineShadowText } from \"@/components/sarahui/line-shadow-text\";\n\nexport function LineShadowTextDemo() {\n  const shadowColor = \"var(--s-brand-indigo, #5B3DF5)\";\n  return (\n    <h1 className=\"text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl\">\n      Ship\n      <LineShadowText className=\"italic\" shadowColor={shadowColor}>\n        Fast\n      </LineShadowText>\n    </h1>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AuroraText": {
    "name": "AuroraText",
    "slug": "aurora-text",
    "category": "Text Animations",
    "description": "Northern lights aurora borealis ambient color wave typography.",
    "tokens": [],
    "props": [
      {
        "title": "AuroraText Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "\"\"",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements"
          },
          {
            "prop": "colors",
            "type": "string[]",
            "defaultVal": " [\"#FF0080\", \"#7928CA\", \"#0070F3\", \"#38bdf8\"]",
            "description": "Array of colors used for the aurora effect"
          },
          {
            "prop": "speed",
            "type": "number",
            "defaultVal": "1",
            "description": "Animation speed multiplier (1 is default, 2 is twice as fast)"
          }
        ]
      }
    ],
    "demoTsx": "import { AuroraText } from \"@/components/sarahui/aurora-text\"\n\nexport default function AuroraTextDemo() {\n  return (\n    <h1 className=\"text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl\">\n      Ship <AuroraText>beautiful</AuroraText>\n    </h1>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "VideoText": {
    "name": "VideoText",
    "slug": "video-text",
    "category": "Text Animations",
    "description": "High-impact headline typography filled dynamically with an underlying video texture.",
    "tokens": [],
    "props": [
      {
        "title": "VideoText Props",
        "rows": [
          {
            "prop": "src",
            "type": "string",
            "defaultVal": "Required",
            "description": "The video source URL"
          },
          {
            "prop": "as",
            "type": "ElementType",
            "defaultVal": "\"div\"",
            "description": "The element type to render for the text"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "Required",
            "description": "The content to display (will have the video \"inside\" it)"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "\"\"",
            "description": "Additional className for the container"
          },
          {
            "prop": "autoPlay",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to autoplay the video"
          },
          {
            "prop": "muted",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to mute the video"
          },
          {
            "prop": "loop",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to loop the video"
          },
          {
            "prop": "preload",
            "type": "\"auto\" | \"metadata\" | \"none\"",
            "defaultVal": "\"auto\"",
            "description": "Whether to preload the video"
          },
          {
            "prop": "fontSize",
            "type": "string | number",
            "defaultVal": "\"120\"",
            "description": "Font size for the text mask"
          },
          {
            "prop": "fontWeight",
            "type": "string | number",
            "defaultVal": "\"bold\"",
            "description": "Font weight for the text mask"
          },
          {
            "prop": "textAnchor",
            "type": "string",
            "defaultVal": "\"middle\"",
            "description": "Text anchor for the text mask"
          },
          {
            "prop": "dominantBaseline",
            "type": "string",
            "defaultVal": "\"middle\"",
            "description": "Dominant baseline for the text mask"
          },
          {
            "prop": "fontFamily",
            "type": "string",
            "defaultVal": "\"sans-serif\"",
            "description": "Font family for the text mask"
          }
        ]
      }
    ],
    "demoTsx": "import { VideoText } from \"@/components/sarahui/video-text\"\n\nexport default function VideoTextDemo() {\n  return (\n    <div className=\"relative h-[200px] w-full overflow-hidden\">\n      <VideoText src=\"assets/ocean.webm\">\n        OCEAN\n      </VideoText>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "NumberTicker": {
    "name": "NumberTicker",
    "slug": "number-ticker",
    "category": "Text Animations",
    "description": "Fluid numeric counter animation that smoothly counts up to any target.",
    "tokens": [],
    "props": [
      {
        "title": "NumberTicker Props",
        "rows": [
          {
            "prop": "value",
            "type": "int",
            "defaultVal": "0",
            "description": "The value to count to"
          },
          {
            "prop": "direction",
            "type": "up | down",
            "defaultVal": "\"up\"",
            "description": "The direction to count in"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "The delay before counting"
          },
          {
            "prop": "decimalPlaces",
            "type": "number",
            "defaultVal": "0",
            "description": "The number of decimal places to show"
          },
          {
            "prop": "startValue",
            "type": "number",
            "defaultVal": "0",
            "description": "The value to start counting from"
          }
        ]
      }
    ],
    "demoTsx": "import { NumberTicker } from \"@/components/sarahui/number-ticker\"\n\nexport default function NumberTickerDemo() {\n  return (\n    <NumberTicker\n      value={100}\n      className=\"text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white\"\n    />\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedShinyText": {
    "name": "AnimatedShinyText",
    "slug": "animated-shiny-text",
    "category": "Text Animations",
    "description": "High-end shimmering metallic light beam sweeping across text.",
    "tokens": [],
    "props": [
      {
        "title": "AnimatedShinyText Props",
        "rows": [
          {
            "prop": "children",
            "type": "node",
            "defaultVal": "-",
            "description": "The text to be shimmered."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the shimmer."
          },
          {
            "prop": "shimmerWidth",
            "type": "number",
            "defaultVal": "100",
            "description": "The width of the shimmer in pixels."
          }
        ]
      }
    ],
    "demoTsx": "import { ArrowRightIcon } from \"sarahui/icons\"\n\nimport { cn } from \"sarahui/utils\"\nimport { AnimatedShinyText } from \"@/components/sarahui/animated-shiny-text\"\n\nexport default function AnimatedShinyTextDemo() {\n  return (\n    <div className=\"z-10 flex min-h-64 items-center justify-center\">\n      <div\n        className={cn(\n          \"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800\"\n        )}\n      >\n        <AnimatedShinyText className=\"inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400\">\n          <span>✨ Introducing sarahUI</span>\n          <ArrowRightIcon className=\"ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5\" />\n        </AnimatedShinyText>\n      </div>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedGradientText": {
    "name": "AnimatedGradientText",
    "slug": "animated-gradient-text",
    "category": "Text Animations",
    "description": "Continuous multi-stop radiant chromatic wave across typography.",
    "tokens": [],
    "props": [
      {
        "title": "AnimatedGradientText Props",
        "rows": [
          {
            "prop": "children",
            "type": "node",
            "defaultVal": "-",
            "description": "The children passed into the component"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied"
          },
          {
            "prop": "speed",
            "type": "number",
            "defaultVal": "1",
            "description": "The speed of the gradient animation"
          },
          {
            "prop": "colorFrom",
            "type": "string",
            "defaultVal": "\"#ffaa40\"",
            "description": "The starting color of the gradient"
          },
          {
            "prop": "colorTo",
            "type": "string",
            "defaultVal": "\"#9c40ff\"",
            "description": "The ending color of the gradient"
          }
        ]
      }
    ],
    "demoTsx": "import { ChevronRight } from \"sarahui/icons\"\n\nimport { cn } from \"sarahui/utils\"\nimport { AnimatedGradientText } from \"@/components/sarahui/animated-gradient-text\"\n\nexport default function AnimatedGradientTextDemo() {\n  return (\n    <div className=\"group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]\">\n      <span\n        className={cn(\n          \"animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]\"\n        )}\n        style={{\n          WebkitMask:\n            \"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)\",\n          WebkitMaskComposite: \"destination-out\",\n          mask: \"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)\",\n          maskComposite: \"subtract\",\n          WebkitClipPath: \"padding-box\",\n        }}\n      />\n      🎉 <hr className=\"mx-2 h-4 w-px shrink-0 bg-neutral-500\" />\n      <AnimatedGradientText className=\"text-sm font-medium\">\n        Introducing sarahUI\n      </AnimatedGradientText>\n      <ChevronRight className=\"ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5\" />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "TextReveal": {
    "name": "TextReveal",
    "slug": "text-reveal",
    "category": "Text Animations",
    "description": "Progressive scroll and view-triggered gradient mask text reveal.",
    "tokens": [],
    "props": [
      {
        "title": "TextReveal Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { TextReveal } from \"@/components/sarahui/text-reveal\"\n\nexport default function TextRevealDemo() {\n  return <TextReveal>sarahUI will change the way you design.</TextReveal>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "DiaTextReveal": {
    "name": "DiaTextReveal",
    "slug": "dia-text-reveal",
    "category": "Text Animations",
    "description": "High-impact diagonal gradient wipe transition revealing headline typography.",
    "tokens": [],
    "props": [
      {
        "title": "DiaTextReveal Props",
        "rows": [
          {
            "prop": "text",
            "type": "string | string[]",
            "defaultVal": "—",
            "description": "Text to display. Use an array to rotate between strings when `repeat` is on."
          },
          {
            "prop": "colors",
            "type": "string[]",
            "defaultVal": "[\"#c679c4\", \"#fa3d1d\", \"#ffb005\", \"#e1e1fe\", \"#0358f7\"]",
            "description": "Colors in the sweeping gradient band."
          },
          {
            "prop": "textColor",
            "type": "string",
            "defaultVal": "var(--foreground)",
            "description": "Solid text color after the animation (matches your theme by default)."
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "1.5",
            "description": "Sweep duration in seconds."
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Delay before the sweep starts, in seconds."
          },
          {
            "prop": "repeat",
            "type": "boolean",
            "defaultVal": "false",
            "description": "When `text` is an array, advance to the next string after each cycle."
          },
          {
            "prop": "repeatDelay",
            "type": "number",
            "defaultVal": "0.5",
            "description": "Pause in seconds before replaying or advancing (when `repeat` is true)."
          },
          {
            "prop": "startOnView",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Start the animation when the element enters the viewport."
          },
          {
            "prop": "once",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Play only the first time (when `startOnView` is used)."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "—",
            "description": "Additional CSS classes on the root `span`."
          },
          {
            "prop": "fixedWidth",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Lock width to the widest string when `text` is an array to reduce layout shift."
          }
        ]
      }
    ],
    "demoTsx": "import { DiaTextReveal } from \"@/components/sarahui/dia-text-reveal\"\n\nexport default function DiaTextRevealDemo() {\n  return (\n    <div className=\"flex min-h-64 items-center justify-center p-8\">\n      <DiaTextReveal\n        className=\"text-4xl font-bold tracking-tight\"\n        text=\"sarahUI\"\n        colors={[\"#A97CF8\", \"#F38CB8\", \"#FDCC92\"]}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "HyperText": {
    "name": "HyperText",
    "slug": "hyper-text",
    "category": "Text Animations",
    "description": "Random character scrambling decoding animation on hover.",
    "tokens": [],
    "props": [
      {
        "title": "HyperText Props",
        "rows": [
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "Text content to animate"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "800",
            "description": "Duration of the animation in milliseconds"
          },
          {
            "prop": "delay",
            "type": "number",
            "defaultVal": "0",
            "description": "Delay before animation starts (in ms)"
          },
          {
            "prop": "as",
            "type": "\"article\" | \"div\" | \"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"li\" | \"p\" | \"section\" | \"span\"",
            "defaultVal": "\"div\"",
            "description": "Component to render as"
          },
          {
            "prop": "startOnView",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Start animation when component is in view"
          },
          {
            "prop": "animateOnHover",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Enable hover animation"
          },
          {
            "prop": "characterSet",
            "type": "string[]",
            "defaultVal": "A-Z",
            "description": "Custom character set for scramble effect"
          }
        ]
      }
    ],
    "demoTsx": "import { HyperText } from \"@/components/sarahui/hyper-text\"\n\nexport default function HyperTextDemo() {\n  return <HyperText>Hover Me!</HyperText>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "WordRotate": {
    "name": "WordRotate",
    "slug": "word-rotate",
    "category": "Text Animations",
    "description": "Smooth vertical text switcher cycling through key terms.",
    "tokens": [],
    "props": [
      {
        "title": "WordRotate Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "2500",
            "description": "Duration of the animation"
          },
          {
            "prop": "words",
            "type": "string[]",
            "defaultVal": "\"\"",
            "description": "An array of words to rotate through"
          },
          {
            "prop": "motionProps",
            "type": "HTMLMotionProps",
            "defaultVal": "{}",
            "description": "An object containing motion animation props"
          }
        ]
      }
    ],
    "demoTsx": "import { WordRotate } from \"@/components/sarahui/word-rotate\"\n\nexport default function WordRotateDemo() {\n  return (\n    <WordRotate\n      className=\"text-4xl font-bold text-black dark:text-white\"\n      words={[\"Word\", \"Rotate\"]}\n    />\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ScrollBasedVelocity": {
    "name": "ScrollBasedVelocity",
    "slug": "scroll-based-velocity",
    "category": "Text Animations",
    "description": "Scroll-accelerated marquee ticker whose speed scales with scroll velocity.",
    "tokens": [],
    "props": [
      {
        "title": "ScrollVelocityContainer",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Content to be animated"
          }
        ]
      },
      {
        "title": "ScrollVelocityRow",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the row container"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Content to be duplicated and scrolled"
          },
          {
            "prop": "baseVelocity",
            "type": "number",
            "defaultVal": "5",
            "description": "Base scroll velocity percentage of content width"
          },
          {
            "prop": "direction",
            "type": "1 | -1",
            "defaultVal": "1",
            "description": "Scroll direction (1 = left-to-right, -1 = reverse)"
          },
          {
            "prop": "scrollReactivity",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Toggles scroll interactivity"
          }
        ]
      }
    ],
    "demoTsx": "import {\n  ScrollVelocityContainer,\n  ScrollVelocityRow,\n} from \"@/components/sarahui/scroll-based-velocity\"\n\nexport default function ScrollBasedVelocityDemo() {\n  return (\n    <div className=\"relative flex w-full flex-col items-center justify-center overflow-hidden\">\n      <ScrollVelocityContainer className=\"text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-20\">\n        <ScrollVelocityRow baseVelocity={20} direction={1}>\n          Velocity Scroll\n        </ScrollVelocityRow>\n        <ScrollVelocityRow baseVelocity={20} direction={-1}>\n          Velocity Scroll\n        </ScrollVelocityRow>\n      </ScrollVelocityContainer>\n      <div className=\"from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r\"></div>\n      <div className=\"from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l\"></div>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "SparklesText": {
    "name": "SparklesText",
    "slug": "sparkles-text",
    "category": "Text Animations",
    "description": "Heading typography decorated with glittering dynamic star sparkles.",
    "tokens": [],
    "props": [
      {
        "title": "SparklesText Props",
        "rows": [
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "The content to display"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the sparkles text."
          },
          {
            "prop": "sparklesCount",
            "type": "number",
            "defaultVal": "10",
            "description": "sparkles count that appears on the text"
          },
          {
            "prop": "colors",
            "type": "object",
            "defaultVal": "{first: '#A07CFE', second: '#FE8FB5'}",
            "description": "the sparkles colors"
          }
        ]
      }
    ],
    "demoTsx": "import { SparklesText } from \"@/components/sarahui/sparkles-text\"\n\nexport default function SparklesTextDemo() {\n  return <SparklesText>sarahUI</SparklesText>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "MorphingText": {
    "name": "MorphingText",
    "slug": "morphing-text",
    "category": "Text Animations",
    "description": "Smooth SVG goo filter liquid text morphing transitions.",
    "tokens": [],
    "props": [
      {
        "title": "MorphingText Props",
        "rows": [
          {
            "prop": "texts",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of texts to morph between"
          },
          {
            "prop": "className",
            "type": "string?",
            "defaultVal": "\"\"",
            "description": "Additional classes for the container"
          }
        ]
      }
    ],
    "demoTsx": "import { MorphingText } from \"@/components/sarahui/morphing-text\"\n\nconst texts = [\n  \"Hello\",\n  \"Morphing\",\n  \"Text\",\n  \"Animation\",\n  \"React\",\n  \"Component\",\n  \"Smooth\",\n  \"Transition\",\n  \"Engaging\",\n]\n\nexport default function MorphingTextDemo() {\n  return <MorphingText texts={texts} />\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "SpinningText": {
    "name": "SpinningText",
    "slug": "spinning-text",
    "category": "Text Animations",
    "description": "Circular rotating typography spinning continuously along an SVG orbital path.",
    "tokens": [],
    "props": [
      {
        "title": "SpinningText Props",
        "rows": [
          {
            "prop": "children",
            "type": "ReactElement",
            "defaultVal": "-",
            "description": "The text content to be animated in a circular motion."
          },
          {
            "prop": "style",
            "type": "CSSProperties",
            "defaultVal": "{}",
            "description": "Custom styles for the text container."
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "10",
            "description": "The duration of the full circular rotation animation."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "A custom class name for the text container."
          },
          {
            "prop": "reverse",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Determines if the animation should rotate in reverse."
          },
          {
            "prop": "radius",
            "type": "number",
            "defaultVal": "5",
            "description": "The radius of the circular path for the text animation."
          },
          {
            "prop": "transition",
            "type": "Transition",
            "defaultVal": "-",
            "description": "Custom transition effects for the animation."
          },
          {
            "prop": "variants",
            "type": "{ container?: Variants; item?: Variants; }",
            "defaultVal": "-",
            "description": "Variants for container and item animations."
          }
        ]
      }
    ],
    "demoTsx": "import { SpinningText } from \"@/components/sarahui/spinning-text\"\n\nexport default function SpinningTextBasic() {\n  return <SpinningText>learn more • earn more • grow more •</SpinningText>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Highlighter": {
    "name": "Highlighter",
    "slug": "highlighter",
    "category": "Text Animations",
    "description": "Animated hand-drawn highlighter marker stroke emphasizing key phrases.",
    "tokens": [],
    "props": [
      {
        "title": "Highlighter Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "Required",
            "description": "The content to be highlighted/annotated."
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "\"#ffd1dc\"",
            "description": "The color of the highlight."
          },
          {
            "prop": "action",
            "type": "\"highlight\" | \"circle\" | \"box\" | \"bracket\" | \"crossed-off\" | \"strike-through\" | \"underline\"",
            "defaultVal": "\"highlight\"",
            "description": "The type of annotation effect to apply."
          },
          {
            "prop": "strokeWidth",
            "type": "number",
            "defaultVal": "1.5px",
            "description": "The width of the annotation stroke."
          },
          {
            "prop": "animationDuration",
            "type": "number",
            "defaultVal": "500ms",
            "description": "Duration of the animation in milliseconds."
          },
          {
            "prop": "iterations",
            "type": "number",
            "defaultVal": "2",
            "description": "Number of times to draw the annotation (adds a sketchy effect when > 1)."
          },
          {
            "prop": "padding",
            "type": "number",
            "defaultVal": "2px",
            "description": "Padding between the element and the annotation."
          },
          {
            "prop": "multiline",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to annotate across multiple lines or treat content as a single line."
          },
          {
            "prop": "isView",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Controls whether the animation starts only when the element enters viewport."
          }
        ]
      }
    ],
    "demoTsx": "import { Highlighter } from \"@/components/sarahui/highlighter\"\n\nexport default function HighlighterDemo() {\n  return (\n    <div className=\"text-center\">\n      <p className=\"leading-relaxed\">\n        The{\" \"}\n        <Highlighter action=\"underline\" color=\"#FF9800\">\n          sarahUI Highlighter\n        </Highlighter>{\" \"}\n        makes important{\" \"}\n        <Highlighter action=\"highlight\" color=\"#87CEFA\">\n          text stand out\n        </Highlighter>{\" \"}\n        effortlessly.\n      </p>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Text3DFlip": {
    "name": "Text3DFlip",
    "slug": "text-3d-flip",
    "category": "Text Animations",
    "description": "3D perspective card-flip animation alternating between front and back labels.",
    "tokens": [],
    "props": [
      {
        "title": "Text3DFlip Props",
        "rows": [
          {
            "prop": "children`\\*",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "The content to be displayed and animated"
          },
          {
            "prop": "as",
            "type": "ElementType",
            "defaultVal": "\"p\"",
            "description": "HTML element to render the component as"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name for the main container element"
          },
          {
            "prop": "textClassName",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name for each letter (visible before flip)"
          },
          {
            "prop": "flipTextClassName",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name for each letter (revealed after flip)"
          },
          {
            "prop": "staggerDuration",
            "type": "number",
            "defaultVal": "0.05",
            "description": "Duration of stagger delay between each letter in seconds"
          },
          {
            "prop": "staggerFrom",
            "type": "\"first\" | \"last\" | \"center\" | number | \"random\"",
            "defaultVal": "\"first\"",
            "description": "Direction to stagger animations from. Use a number to stagger from a specific character index"
          },
          {
            "prop": "transition",
            "type": "ValueAnimationTransition | AnimationOptions",
            "defaultVal": "{ type: \"spring\", damping: 30, stiffness: 300 }",
            "description": "Animation transition configuration from Motion"
          },
          {
            "prop": "rotateDirection",
            "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
            "defaultVal": "\"right\"",
            "description": "Direction of 3D rotation on hover"
          }
        ]
      }
    ],
    "demoTsx": "import Text3DFlip from \"@/components/sarahui/text-3d-flip\"\n\nexport default function Text3DFlipDemo() {\n  return (\n    <Text3DFlip\n      className=\"bg-background font-serif text-2xl sm:text-5xl md:text-[56px]\"\n      textClassName=\"bg-background text-foreground\"\n      flipTextClassName=\"bg-background text-foreground\"\n      rotateDirection=\"top\"\n      staggerDuration={0.03}\n      staggerFrom=\"first\"\n      transition={{ type: \"spring\", damping: 25, stiffness: 160 }}\n    >\n      Stay hungry, stay foolish\n    </Text3DFlip>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Safari": {
    "name": "Safari",
    "slug": "safari",
    "category": "Device Mocks",
    "description": "macOS Safari browser mockup window with realistic address bar and traffic lights.",
    "tokens": [],
    "props": [
      {
        "title": "Safari Props",
        "rows": [
          {
            "prop": "url",
            "type": "string",
            "defaultVal": "-",
            "description": "The URL to display in the Safari address bar"
          },
          {
            "prop": "imageSrc",
            "type": "string",
            "defaultVal": "-",
            "description": "The source URL of the image to display in the Safari window"
          },
          {
            "prop": "videoSrc",
            "type": "string",
            "defaultVal": "-",
            "description": "The source URL of the video to display in the Safari window"
          },
          {
            "prop": "mode",
            "type": "SafariMode",
            "defaultVal": "\"default\"",
            "description": "The display mode of the Safari window."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional classes applied to the wrapper `<div>"
          },
          {
            "prop": "style",
            "type": "React.CSSProperties",
            "defaultVal": "-",
            "description": "Inline styles applied to the wrapper `<div>"
          }
        ]
      }
    ],
    "demoTsx": "import { Safari } from \"@/components/sarahui/safari\"\n\nexport default function SafariDemo() {\n  return (\n    <div className=\"w-[1203px]\">\n      <Safari url=\"sarahui.dev\" />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Iphone": {
    "name": "Iphone",
    "slug": "iphone",
    "category": "Device Mocks",
    "description": "High-fidelity iPhone device frame with dynamic island and sleek hardware bezel.",
    "tokens": [],
    "props": [
      {
        "title": "Iphone Props",
        "rows": [
          {
            "prop": "src",
            "type": "string",
            "defaultVal": "-",
            "description": "The source of the image to display"
          },
          {
            "prop": "videoSrc",
            "type": "string",
            "defaultVal": "-",
            "description": "The source of the video to display"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional classes applied to the wrapper `<div>"
          },
          {
            "prop": "style",
            "type": "React.CSSProperties",
            "defaultVal": "-",
            "description": "Inline styles applied to the wrapper `<div>"
          }
        ]
      }
    ],
    "demoTsx": "import { Iphone } from \"@/components/sarahui/iphone\"\n\nexport default function Demo() {\n  return (\n    <div className=\"w-[434px]\">\n      <Iphone />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Android": {
    "name": "Android",
    "slug": "android",
    "category": "Device Mocks",
    "description": "Pixel-accurate Android smartphone mockup frame with punch-hole camera.",
    "tokens": [],
    "props": [
      {
        "title": "Android Props",
        "rows": [
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "433",
            "description": "The width of the Android window"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "882",
            "description": "The height of the Android window"
          },
          {
            "prop": "src",
            "type": "string",
            "defaultVal": "-",
            "description": "The source of the image to display"
          },
          {
            "prop": "videoSrc",
            "type": "string",
            "defaultVal": "-",
            "description": "The source of the video to display"
          }
        ]
      }
    ],
    "demoTsx": "import { Android } from \"@/components/sarahui/android\"\n\nexport default function AndroidDemo() {\n  return (\n    <div className=\"relative\">\n      <Android className=\"size-full\" />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "RainbowButton": {
    "name": "RainbowButton",
    "slug": "rainbow-button",
    "category": "Buttons",
    "description": "Continuous multi-color chromatic gradient button with smooth animation.",
    "tokens": [],
    "props": [
      {
        "title": "RainbowButton Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content to be displayed inside the button."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional CSS classes to be applied to the button."
          },
          {
            "prop": "variant",
            "type": "\"default\" | \"outline\"",
            "defaultVal": "\"default\"",
            "description": "The variant of the button."
          },
          {
            "prop": "size",
            "type": "\"default\" | \"sm\" | \"lg\" | \"icon\"",
            "defaultVal": "\"default\"",
            "description": "The size of the button."
          }
        ]
      }
    ],
    "demoTsx": "import { RainbowButton } from \"@/components/sarahui/rainbow-button\"\n\nexport default function RainbowButtonDemo() {\n  return <RainbowButton>Get Unlimited Access</RainbowButton>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ShimmerButton": {
    "name": "ShimmerButton",
    "slug": "shimmer-button",
    "category": "Buttons",
    "description": "Luminous shimmer beam gliding continuously around the button perimeter.",
    "tokens": [],
    "props": [
      {
        "title": "ShimmerButton Props",
        "rows": [
          {
            "prop": "shimmerColor",
            "type": "string",
            "defaultVal": "#ffffff",
            "description": "The color of the shimmer"
          },
          {
            "prop": "shimmerSize",
            "type": "string",
            "defaultVal": "0.05em",
            "description": "The size of the shimmer"
          },
          {
            "prop": "borderRadius",
            "type": "string",
            "defaultVal": "100px",
            "description": "The border radius of the button"
          },
          {
            "prop": "shimmerDuration",
            "type": "string",
            "defaultVal": "3s",
            "description": "The duration of the spark animation"
          },
          {
            "prop": "background",
            "type": "string",
            "defaultVal": "rgba(0, 0, 0, 1)",
            "description": "The background of the button"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "undefined",
            "description": "The class name of the button"
          },
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "undefined",
            "description": "The children of the button"
          }
        ]
      }
    ],
    "demoTsx": "import { ShimmerButton } from \"@/components/sarahui/shimmer-button\"\n\nexport default function ShimmerButtonDemo() {\n  return (\n    <ShimmerButton className=\"shadow-2xl\">\n      <span className=\"text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10\">\n        Shimmer Button\n      </span>\n    </ShimmerButton>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "RippleButton": {
    "name": "RippleButton",
    "slug": "ripple-button",
    "category": "Buttons",
    "description": "Interactive button generating expanding wave ripples from user click coordinates.",
    "tokens": [],
    "props": [
      {
        "title": "RippleButton Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content of the button."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional class names for the button."
          },
          {
            "prop": "rippleColor",
            "type": "string",
            "defaultVal": "-",
            "description": "The rbg numbers only for the color of the rippling waves."
          },
          {
            "prop": "duration",
            "type": "string",
            "defaultVal": "-",
            "description": "The time span of one ripple."
          }
        ]
      }
    ],
    "demoTsx": "import { RippleButton } from \"@/components/sarahui/ripple-button\"\n\nexport default function RippleButtonDemo() {\n  return <RippleButton rippleColor=\"#ADD8E6\">Click me</RippleButton>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "FlickeringGrid": {
    "name": "FlickeringGrid",
    "slug": "flickering-grid",
    "category": "Backgrounds",
    "description": "High-performance interactive flickering matrix grid rendered on canvas.",
    "tokens": [],
    "props": [
      {
        "title": "FlickeringGrid Props",
        "rows": [
          {
            "prop": "squareSize",
            "type": "number",
            "defaultVal": "4",
            "description": "Size of each square in the grid"
          },
          {
            "prop": "gridGap",
            "type": "number",
            "defaultVal": "6",
            "description": "Gap between squares in the grid"
          },
          {
            "prop": "flickerChance",
            "type": "number",
            "defaultVal": "0.3",
            "description": "Probability of a square flickering"
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "\"rgb(0, 0, 0)\"",
            "description": "Color of the squares"
          },
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "-",
            "description": "Width of the canvas"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "-",
            "description": "Height of the canvas"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional CSS classes for the canvas"
          },
          {
            "prop": "maxOpacity",
            "type": "number",
            "defaultVal": "0.2",
            "description": "Maximum opacity of the squares"
          }
        ]
      }
    ],
    "demoTsx": "import { FlickeringGrid } from \"@/components/sarahui/flickering-grid\"\n\nexport default function FlickeringGridDemo() {\n  return (\n    <div className=\"bg-background relative h-[500px] w-full overflow-hidden rounded-lg border\">\n      <FlickeringGrid\n        className=\"absolute inset-0 z-0 size-full\"\n        squareSize={4}\n        gridGap={6}\n        color=\"#6B7280\"\n        maxOpacity={0.5}\n        flickerChance={0.1}\n        height={800}\n        width={800}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedGridPattern": {
    "name": "AnimatedGridPattern",
    "slug": "animated-grid-pattern",
    "category": "Backgrounds",
    "description": "Animated matrix grid with randomly shimmering dynamic squares.",
    "tokens": [],
    "props": [
      {
        "title": "GridPattern",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional classes to be added to the pattern"
          },
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "40",
            "description": "Width of the pattern"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "40",
            "description": "Height of the pattern"
          },
          {
            "prop": "x",
            "type": "number",
            "defaultVal": "-1",
            "description": "X offset of the pattern"
          },
          {
            "prop": "y",
            "type": "number",
            "defaultVal": "-1",
            "description": "Y offset of the pattern"
          },
          {
            "prop": "strokeDasharray",
            "type": "number",
            "defaultVal": "0",
            "description": "Stroke dash array of the pattern"
          },
          {
            "prop": "numSquares",
            "type": "number",
            "defaultVal": "200",
            "description": "Number of squares in the pattern"
          },
          {
            "prop": "maxOpacity",
            "type": "number",
            "defaultVal": "0.5",
            "description": "Maximum opacity of the pattern"
          },
          {
            "prop": "duration",
            "type": "number",
            "defaultVal": "1",
            "description": "Duration of the animation"
          },
          {
            "prop": "repeatDelay",
            "type": "number",
            "defaultVal": "0.5",
            "description": "Repeat delay of the animation"
          }
        ]
      }
    ],
    "demoTsx": "import { cn } from \"sarahui/utils\"\nimport { AnimatedGridPattern } from \"@/components/sarahui/animated-grid-pattern\"\n\nexport default function AnimatedGridPatternDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-20\">\n      <AnimatedGridPattern\n        numSquares={30}\n        maxOpacity={0.1}\n        duration={3}\n        repeatDelay={1}\n        className={cn(\n          \"mask-[radial-gradient(500px_circle_at_center,white,transparent)]\",\n          \"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "RetroGrid": {
    "name": "RetroGrid",
    "slug": "retro-grid",
    "category": "Backgrounds",
    "description": "Perspective 3D retro grid floor with infinite scrolling lines.",
    "tokens": [],
    "props": [
      {
        "title": "RetroGrid Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional CSS classes for the grid container"
          },
          {
            "prop": "angle",
            "type": "number",
            "defaultVal": "65",
            "description": "Rotation angle of the grid in degrees"
          },
          {
            "prop": "cellSize",
            "type": "number",
            "defaultVal": "60",
            "description": "Grid cell size in pixels"
          },
          {
            "prop": "opacity",
            "type": "number",
            "defaultVal": "0.5",
            "description": "Grid opacity value between 0 and 1"
          },
          {
            "prop": "lightLineColor",
            "type": "string",
            "defaultVal": "\"gray\"",
            "description": "Grid line color in light mode"
          },
          {
            "prop": "darkLineColor",
            "type": "string",
            "defaultVal": "\"gray\"",
            "description": "Grid line color in dark mode"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { RetroGrid } from \"@/components/sarahui/retro-grid\"\n\nexport default function RetroGridDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <span className=\"pointer-events-none z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent\">\n        Retro Grid\n      </span>\n\n      <RetroGrid />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Ripple": {
    "name": "Ripple",
    "slug": "ripple",
    "category": "Backgrounds",
    "description": "Concentric ambient pulsing circle waves radiating outward.",
    "tokens": [],
    "props": [
      {
        "title": "Ripple Props",
        "rows": [
          {
            "prop": "mainCircleSize",
            "type": "number",
            "defaultVal": "210",
            "description": "The size of the main circle in pixels"
          },
          {
            "prop": "mainCircleOpacity",
            "type": "number",
            "defaultVal": "0.24",
            "description": "The opacity of the main circle"
          },
          {
            "prop": "numCircles",
            "type": "number",
            "defaultVal": "8",
            "description": "The number of ripple circles to render"
          }
        ]
      }
    ],
    "demoTsx": "import { Ripple } from \"@/components/sarahui/ripple\"\n\nexport default function RippleDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <p className=\"z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white\">\n        Ripple\n      </p>\n      <Ripple />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "DotPattern": {
    "name": "DotPattern",
    "slug": "dot-pattern",
    "category": "Backgrounds",
    "description": "Dotted matrix background pattern with smooth radial falloff.",
    "tokens": [],
    "props": [
      {
        "title": "Dot Pattern",
        "rows": [
          {
            "prop": "width",
            "type": "any",
            "defaultVal": "16",
            "description": "Width of the dot pattern"
          },
          {
            "prop": "height",
            "type": "any",
            "defaultVal": "16",
            "description": "Height of the dot pattern"
          },
          {
            "prop": "x",
            "type": "any",
            "defaultVal": "0",
            "description": "X position of the dot"
          },
          {
            "prop": "y",
            "type": "any",
            "defaultVal": "0",
            "description": "Y position of the dot"
          },
          {
            "prop": "cx",
            "type": "any",
            "defaultVal": "1",
            "description": "X position of the circle"
          },
          {
            "prop": "cy",
            "type": "any",
            "defaultVal": "1",
            "description": "Y position of the circle"
          },
          {
            "prop": "cr",
            "type": "any",
            "defaultVal": "1",
            "description": "Radius of the circle"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name of the dot pattern"
          },
          {
            "prop": "glow",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Activates the glow effect in the dot pattern"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { cn } from \"sarahui/utils\"\nimport { DotPattern } from \"@/components/sarahui/dot-pattern\"\n\nexport default function DotPatternDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <DotPattern\n        className={cn(\n          \"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "GridPattern": {
    "name": "GridPattern",
    "slug": "grid-pattern",
    "category": "Backgrounds",
    "description": "Geometric SVG grid background pattern with customizable accent squares.",
    "tokens": [],
    "props": [
      {
        "title": "GridPattern",
        "rows": [
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "40",
            "description": "Width of the pattern"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "40",
            "description": "Height of the pattern"
          },
          {
            "prop": "x",
            "type": "number",
            "defaultVal": "-1",
            "description": "X offset of the pattern"
          },
          {
            "prop": "y",
            "type": "number",
            "defaultVal": "-1",
            "description": "Y offset of the pattern"
          },
          {
            "prop": "squares",
            "type": "number",
            "defaultVal": "[]",
            "description": "X Y coordinates of filled squares as 2D array"
          },
          {
            "prop": "strokeDasharray",
            "type": "string",
            "defaultVal": "0",
            "description": "Stroke dash array for the pattern"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { cn } from \"sarahui/utils\"\nimport { GridPattern } from \"@/components/sarahui/grid-pattern\"\n\nexport default function GridPatternDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <GridPattern\n        squares={[\n          [4, 4],\n          [5, 1],\n          [8, 2],\n          [5, 3],\n          [5, 5],\n          [10, 10],\n          [12, 15],\n          [15, 10],\n          [10, 15],\n          [15, 10],\n          [10, 15],\n          [15, 10],\n        ]}\n        className={cn(\n          \"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]\",\n          \"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "HexagonPattern": {
    "name": "HexagonPattern",
    "slug": "hexagon-pattern",
    "category": "Backgrounds",
    "description": "Geometric honeycomb hexagonal tessellation vector background pattern.",
    "tokens": [],
    "props": [
      {
        "title": "HexagonPattern",
        "rows": [
          {
            "prop": "radius",
            "type": "number",
            "defaultVal": "40",
            "description": "Radius from center to vertex for each hexagon"
          },
          {
            "prop": "gap",
            "type": "number",
            "defaultVal": "0",
            "description": "Extra spacing between adjacent hexagons (pixels)"
          },
          {
            "prop": "x",
            "type": "number",
            "defaultVal": "-1",
            "description": "X offset of the pattern origin"
          },
          {
            "prop": "y",
            "type": "number",
            "defaultVal": "-1",
            "description": "Y offset of the pattern origin"
          },
          {
            "prop": "direction",
            "type": "\"horizontal\" | \"vertical\"",
            "defaultVal": "\"horizontal\"",
            "description": "horizontal` — flat-top honeycomb; `vertical` — pointy-top honeycomb"
          },
          {
            "prop": "hexagons",
            "type": "Array<[col, row]>",
            "defaultVal": "—",
            "description": "Grid coordinates of highlighted (filled) hexagons"
          },
          {
            "prop": "strokeDasharray",
            "type": "string",
            "defaultVal": "\"0\"",
            "description": "SVG `stroke-dasharray` for outline hexagons in the repeating pattern"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "—",
            "description": "Additional classes on the root SVG (for example Tailwind color utilities)"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { cn } from \"sarahui/utils\"\nimport { HexagonPattern } from \"@/components/sarahui/hexagon-pattern\"\n\nexport default function HexagonPatternDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <HexagonPattern\n        hexagons={[\n          [1, 1],\n          [4, 4],\n          [2, 2],\n          [3, 4],\n          [5, 4],\n          [8, 2],\n          [6, 3],\n          [8, 5],\n          [10, 10],\n        ]}\n        className={cn(\n          \"mask-[radial-gradient(420px_circle_at_center,white,transparent)]\",\n          \"inset-0 skew-y-6\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "StripedPattern": {
    "name": "StripedPattern",
    "slug": "striped-pattern",
    "category": "Backgrounds",
    "description": "Customizable angled linear striped pattern background.",
    "tokens": [],
    "props": [
      {
        "title": "StripedPattern",
        "rows": [
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "40",
            "description": "Width of the pattern"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "40",
            "description": "Height of the pattern"
          },
          {
            "prop": "x",
            "type": "number",
            "defaultVal": "-1",
            "description": "X offset of the pattern"
          },
          {
            "prop": "y",
            "type": "number",
            "defaultVal": "-1",
            "description": "Y offset of the pattern"
          },
          {
            "prop": "direction",
            "type": "\"left\"` | `\"right\"",
            "defaultVal": "\"left\"",
            "description": "Line direction"
          }
        ]
      }
    ],
    "demoTsx": "import { StripedPattern } from \"@/components/sarahui/striped-pattern\"\n\nexport default function StripedPatternDemo() {\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <StripedPattern className=\"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]\" />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "InteractiveGridPattern": {
    "name": "InteractiveGridPattern",
    "slug": "interactive-grid-pattern",
    "category": "Backgrounds",
    "description": "Interactive vector grid pattern where individual cells illuminate on hover.",
    "tokens": [],
    "props": [
      {
        "title": "InteractiveGridPattern Props",
        "rows": [
          {
            "prop": "width",
            "type": "number",
            "defaultVal": "40",
            "description": "Width of each square in the grid"
          },
          {
            "prop": "height",
            "type": "number",
            "defaultVal": "40",
            "description": "Height of each square in the grid"
          },
          {
            "prop": "squares",
            "type": "[number, number]",
            "defaultVal": "[24,24]",
            "description": "Number of squares in the grid. First number is horizontal squares, second is vertical squares"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name applied to the grid container"
          },
          {
            "prop": "squaresClassName",
            "type": "string",
            "defaultVal": "-",
            "description": "Class name applied to individual squares in the grid"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { cn } from \"sarahui/utils\"\nimport { InteractiveGridPattern } from \"@/components/sarahui/interactive-grid-pattern\"\n\nexport default function InteractiveGridPatternDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <InteractiveGridPattern\n        className={cn(\n          \"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]\",\n          \"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "LightRays": {
    "name": "LightRays",
    "slug": "light-rays",
    "category": "Backgrounds",
    "description": "Volumetric atmospheric god rays oscillating smoothly across backgrounds.",
    "tokens": [],
    "props": [
      {
        "title": "LightRays Props",
        "rows": [
          {
            "prop": "count",
            "type": "number",
            "defaultVal": "7",
            "description": "Total number of animated rays."
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "\"rgba(160, 210, 255, 0.2)\"",
            "description": "Base colour used for the gradients."
          },
          {
            "prop": "blur",
            "type": "number",
            "defaultVal": "36",
            "description": "Pixel radius applied to the blur filter."
          },
          {
            "prop": "opacity",
            "type": "number",
            "defaultVal": "0.65",
            "description": "Maximum opacity that rays reach (0 – 1)."
          },
          {
            "prop": "speed",
            "type": "number",
            "defaultVal": "14",
            "description": "Average seconds each ray takes to complete a cycle."
          },
          {
            "prop": "length",
            "type": "string | number",
            "defaultVal": "\"70vh\"",
            "description": "CSS length for the ray height."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "undefined",
            "description": "Additional class names applied to the wrapper."
          },
          {
            "prop": "style",
            "type": "React.CSSProperties",
            "defaultVal": "undefined",
            "description": "Inline styles merged into the wrapper."
          }
        ]
      }
    ],
    "demoTsx": "import { LightRays } from \"@/components/sarahui/light-rays\"\n\nexport default function Component() {\n  return (\n    <div className=\"relative h-[500px] w-full overflow-hidden rounded-lg border\">\n      <div className=\"relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center\">\n        <span className=\"text-xs font-semibold tracking-[0.35em] text-slate-800/60 uppercase dark:text-slate-200/60\">\n          Ambient glow\n        </span>\n        <h1 className=\"text-foreground text-4xl font-bold md:text-5xl\">\n          Light Rays\n        </h1>\n        <p className=\"max-w-md text-sm text-slate-800/80 md:text-base dark:text-slate-200/80\">\n          Drop this component into any container and it will fill the space with\n          softly animated light rays shining from above.\n        </p>\n      </div>\n      <LightRays />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "NoiseTexture": {
    "name": "NoiseTexture",
    "slug": "noise-texture",
    "category": "Backgrounds",
    "description": "Tactile SVG fractal noise texture overlay adding physical depth to surfaces.",
    "tokens": [],
    "props": [
      {
        "title": "NoiseTexture",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "—",
            "description": "Merged onto the root `svg` (via `cn`)"
          },
          {
            "prop": "frequency",
            "type": "number",
            "defaultVal": "0.4",
            "description": "baseFrequency` for `feTurbulence"
          },
          {
            "prop": "octaves",
            "type": "number",
            "defaultVal": "6",
            "description": "numOctaves` for `feTurbulence"
          },
          {
            "prop": "slope",
            "type": "number",
            "defaultVal": "0.15",
            "description": "Linear slope per channel after desaturation"
          },
          {
            "prop": "noiseOpacity",
            "type": "number",
            "defaultVal": "0.6",
            "description": "Opacity of the noise `rect"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { cn } from \"sarahui/utils\"\nimport { NoiseTexture } from \"@/components/sarahui/noise-texture\"\n\nexport default function NoiseTextureDemo() {\n  return (\n    <div className=\"relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-neutral-100/80 dark:bg-neutral-950\">\n      <NoiseTexture\n        className={cn(\n          \"absolute inset-0\",\n          \"mask-[radial-gradient(420px_circle_at_center,white,transparent)]\"\n        )}\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Floating3DParticles": {
    "name": "Floating3DParticles",
    "slug": "floating-3d-particles",
    "category": "Backgrounds",
    "description": "Depth-projected 3D perspective particle canvas with smooth orbital drift.",
    "tokens": [],
    "props": [
      {
        "title": "Floating3DParticles Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional CSS classes for the canvas element."
          },
          {
            "prop": "quantity",
            "type": "number",
            "defaultVal": "400",
            "description": "Number of particles on desktop viewports. Automatically scales down to 20% on mobile screens (< 768px)."
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "\"#8B5CF6\"",
            "description": "Particle color (supports 3-digit or 6-digit hex)."
          },
          {
            "prop": "size",
            "type": "number",
            "defaultVal": "5",
            "description": "Mean particle radius in px. Each particle varies within ±40% of this value."
          },
          {
            "prop": "opacity",
            "type": "number",
            "defaultVal": "0.3",
            "description": "Mean particle opacity (0–1). Each particle varies within ±0.2, clamped to [0, 1]."
          },
          {
            "prop": "drift",
            "type": "number",
            "defaultVal": "0.8",
            "description": "Vertical floating speed in px per frame. Positive drifts upward, negative downward."
          },
          {
            "prop": "depth",
            "type": "number",
            "defaultVal": "0.5",
            "description": "3D depth intensity (0–1). `0` = flat 2D plane; `1` = strong perspective with pronounced near/far scaling."
          }
        ]
      }
    ],
    "demoTsx": "import { ArrowRightIcon } from \"sarahui/icons\";\nimport { Floating3DParticles } from \"@/components/sarahui/floating-3d-particles\";\n\nexport function Floating3DParticlesDemo() {\n  const color = \"var(--s-brand-indigo, #5B3DF5)\";\n  return (\n    <div className=\"bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border\">\n      <Floating3DParticles color={color} />\n      <div className=\"relative z-10 flex flex-col items-center gap-6 px-6 text-center\">\n        <h2 className=\"text-3xl font-bold tracking-tight md:text-5xl\">\n          Build something magical\n        </h2>\n        <p className=\"text-muted-foreground max-w-xl text-base md:text-lg\">\n          A pseudo-3D particle background that stays behind your content with continuous rotation.\n        </p>\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ShinyButton": {
    "name": "ShinyButton",
    "slug": "shiny-button",
    "category": "Community",
    "description": "Action button with continuous luminous sheen pass sweeping across its surface.",
    "tokens": [],
    "props": [
      {
        "title": "ShinyButton Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content to be displayed inside the button"
          }
        ]
      }
    ],
    "demoTsx": "import { ShinyButton } from \"@/components/sarahui/shiny-button\"\n\nexport default function ShinyButtonDemo() {\n  return <ShinyButton>Shiny Button</ShinyButton>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "FileTree": {
    "name": "FileTree",
    "slug": "file-tree",
    "category": "Community",
    "description": "Hierarchical file tree with folder disclosure and file icon mapping.",
    "tokens": [],
    "props": [
      {
        "title": "Tree",
        "rows": [
          {
            "prop": "initialSelectedId",
            "type": "string",
            "defaultVal": "-",
            "description": "The ID of the initially selected item."
          },
          {
            "prop": "indicator",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to show the tree indicator line."
          },
          {
            "prop": "elements",
            "type": "TreeViewElement[]",
            "defaultVal": "-",
            "description": "An array of tree view elements to render when `children` are omitted."
          },
          {
            "prop": "initialExpandedItems",
            "type": "string[]",
            "defaultVal": "-",
            "description": "An array of IDs for items that should be initially expanded."
          },
          {
            "prop": "openIcon",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "Custom icon for open folders."
          },
          {
            "prop": "closeIcon",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "Custom icon for closed folders."
          },
          {
            "prop": "sort",
            "type": "\"default\" | \"none\" | ((a, b) => number)",
            "defaultVal": "\"default\"",
            "description": "Sorting mode used for data-driven trees rendered from `elements`."
          },
          {
            "prop": "dir",
            "type": "\"rtl\" | \"ltr\"",
            "defaultVal": "\"ltr\"",
            "description": "The text direction of the tree."
          }
        ]
      },
      {
        "title": "TreeViewElement",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "-",
            "description": "A unique identifier for the node."
          },
          {
            "prop": "name",
            "type": "string",
            "defaultVal": "-",
            "description": "The label rendered for the node in data-driven mode."
          },
          {
            "prop": "type",
            "type": "\"file\" | \"folder\"",
            "defaultVal": "-",
            "description": "Explicit node type. Use `\"folder\"` for empty folders."
          },
          {
            "prop": "isSelectable",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether the node can be selected."
          },
          {
            "prop": "children",
            "type": "TreeViewElement[]",
            "defaultVal": "-",
            "description": "Child nodes for folders."
          }
        ]
      },
      {
        "title": "Folder",
        "rows": [
          {
            "prop": "element",
            "type": "string",
            "defaultVal": "-",
            "description": "The name of the folder."
          },
          {
            "prop": "value",
            "type": "string",
            "defaultVal": "-",
            "description": "The unique identifier for the folder."
          },
          {
            "prop": "isSelectable",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether the folder can be selected."
          },
          {
            "prop": "isSelect",
            "type": "boolean",
            "defaultVal": "-",
            "description": "Whether the folder is currently selected."
          }
        ]
      },
      {
        "title": "File",
        "rows": [
          {
            "prop": "value",
            "type": "string",
            "defaultVal": "-",
            "description": "The unique identifier for the file."
          },
          {
            "prop": "isSelectable",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether the file can be selected."
          },
          {
            "prop": "isSelect",
            "type": "boolean",
            "defaultVal": "-",
            "description": "Whether the file is currently selected."
          },
          {
            "prop": "fileIcon",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "Custom icon for the file."
          }
        ]
      },
      {
        "title": "CollapseButton",
        "rows": [
          {
            "prop": "elements",
            "type": "TreeViewElement[]",
            "defaultVal": "-",
            "description": "An array of tree view elements to control."
          },
          {
            "prop": "expandAll",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Whether to expand all elements initially."
          }
        ]
      }
    ],
    "demoTsx": "import { Tree } from \"@/components/sarahui/file-tree\"\nimport type { TreeViewElement } from \"@/components/sarahui/file-tree\"\n\nexport default function FileTreeDemo() {\n  return (\n    <div className=\"bg-background relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border\">\n      <Tree\n        className=\"bg-background overflow-hidden rounded-md p-2\"\n        initialSelectedId=\"button\"\n        initialExpandedItems={[\"src\", \"app\", \"components\", \"ui\", \"lib\"]}\n        elements={ELEMENTS}\n      />\n    </div>\n  )\n}\n\nconst ELEMENTS: TreeViewElement[] = [\n  {\n    id: \"src\",\n    type: \"folder\",\n    isSelectable: true,\n    name: \"src\",\n    children: [\n      {\n        id: \"lib\",\n        type: \"folder\",\n        isSelectable: true,\n        name: \"lib\",\n        children: [\n          {\n            id: \"utils\",\n            isSelectable: true,\n            name: \"utils.ts\",\n          },\n        ],\n      },\n      {\n        id: \"app\",\n        type: \"folder\",\n        isSelectable: true,\n        name: \"app\",\n        children: [\n          {\n            id: \"page\",\n            isSelectable: true,\n            name: \"page.tsx\",\n          },\n          {\n            id: \"layout\",\n            isSelectable: true,\n            name: \"layout.tsx\",\n          },\n        ],\n      },\n      {\n        id: \"components\",\n        type: \"folder\",\n        isSelectable: true,\n        name: \"components\",\n        children: [\n          {\n            id: \"header\",\n            isSelectable: true,\n            name: \"header.tsx\",\n          },\n          {\n            id: \"ui\",\n            type: \"folder\",\n            isSelectable: true,\n            name: \"ui\",\n            children: [\n              {\n                id: \"button\",\n                isSelectable: true,\n                name: \"button.tsx\",\n              },\n            ],\n          },\n          {\n            id: \"footer\",\n            isSelectable: true,\n            name: \"footer.tsx\",\n          },\n        ],\n      },\n    ],\n  },\n]\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "CodeComparison": {
    "name": "CodeComparison",
    "slug": "code-comparison",
    "category": "Community",
    "description": "Side-by-side or stacked code comparison container with syntax layout.",
    "tokens": [],
    "props": [
      {
        "title": "CodeComparison Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "beforeCode",
            "type": "string",
            "defaultVal": "-",
            "description": "The code snippet to display in the \"before\" section"
          },
          {
            "prop": "afterCode",
            "type": "string",
            "defaultVal": "-",
            "description": "The code snippet to display in the \"after\" section"
          },
          {
            "prop": "language",
            "type": "string",
            "defaultVal": "-",
            "description": "The language of the code snippets (e.g., \"typescript\")"
          },
          {
            "prop": "filename",
            "type": "string",
            "defaultVal": "-",
            "description": "The filename to display for the code snippets"
          },
          {
            "prop": "lightTheme",
            "type": "string",
            "defaultVal": "github-light",
            "description": "The theme to use for light mode"
          },
          {
            "prop": "darkTheme",
            "type": "string",
            "defaultVal": "github-dark",
            "description": "The theme to use for dark mode"
          },
          {
            "prop": "highlightColor",
            "type": "string",
            "defaultVal": "rgba(101, 117, 133, 0.16)",
            "description": "The color to use for highlighting the code snippets"
          }
        ]
      }
    ],
    "demoTsx": "import { CodeComparison } from \"@/components/sarahui/code-comparison\";\n\nconst beforeCode = `// Standard Request Router\nexport async function handleRequest(req: Request) {\n  const token = req.headers.get('authorization');\n  const user = await verifyAuth(token);\n\n  if (!user) {\n    return new Response('Unauthorized', { status: 401 });\n  }\n\n  const data = await fetchUserData(user.id);\n  return Response.json(data);\n}`;\n\nconst afterCode = `// SarahUI Enhanced Pipeline\nimport { createPipeline } from 'sarahui/pipeline';\n\nexport const handleRequest = createPipeline({\n  auth: verifyAuth,\n  handler: async ({ user }) => {\n    const data = await fetchUserData(user.id);\n    return Response.json(data);\n  }\n});`;\n\nexport function CodeComparisonDemo() {\n  return (\n    <CodeComparison\n      beforeCode={beforeCode}\n      afterCode={afterCode}\n      language=\"typescript\"\n      filename=\"router.ts\"\n      lightTheme=\"github-light\"\n      darkTheme=\"github-dark\"\n    />\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ScrollProgress": {
    "name": "ScrollProgress",
    "slug": "scroll-progress",
    "category": "Community",
    "description": "Progress indicator pinned at top of viewport tracking scroll depth.",
    "tokens": [],
    "props": [
      {
        "title": "ScrollProgress Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          }
        ]
      }
    ],
    "demoTsx": "import { ScrollProgress } from \"@/components/sarahui/scroll-progress\"\n\nexport default function ScrollProgressDemo() {\n  return (\n    <div className=\"z-10 rounded-lg p-4\">\n      <ScrollProgress className=\"top-[65px]\" />\n      <h2 className=\"pb-4 font-bold\">\n        Note: The scroll progress is shown below the navbar of the page.\n      </h2>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "NeonGradientCard": {
    "name": "NeonGradientCard",
    "slug": "neon-gradient-card",
    "category": "Community",
    "description": "High-intensity chromatic neon glowing border card.",
    "tokens": [],
    "props": [
      {
        "title": "NeonGradientCard Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements"
          },
          {
            "prop": "borderSize",
            "type": "number",
            "defaultVal": "5",
            "description": "The size of the border"
          },
          {
            "prop": "borderRadius",
            "type": "number",
            "defaultVal": "20",
            "description": "The size of the radius"
          },
          {
            "prop": "neonColors",
            "type": "object",
            "defaultVal": "{ firstColor: \"#ff00aa\", secondColor: \"#00FFF1\" }",
            "description": "The colors of the neon gradient"
          }
        ]
      }
    ],
    "demoTsx": "import { NeonGradientCard } from \"@/components/sarahui/neon-gradient-card\"\n\nexport default function NeonGradientCardDemo() {\n  return (\n    <NeonGradientCard className=\"max-w-sm items-center justify-center text-center\">\n      <span className=\"pointer-events-none z-10 h-full bg-linear-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]\">\n        Neon Gradient Card\n      </span>\n    </NeonGradientCard>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ComicText": {
    "name": "ComicText",
    "slug": "comic-text",
    "category": "Community",
    "description": "Retro pop-art comic book typography with halftone dot shading and bold outlines.",
    "tokens": [],
    "props": [
      {
        "title": "ComicText Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "fontSize",
            "type": "number",
            "defaultVal": "4",
            "description": "The font size of the text"
          },
          {
            "prop": "style",
            "type": "CSSProperties",
            "defaultVal": "#ffffff",
            "description": "The style of the text"
          },
          {
            "prop": "children",
            "type": "string",
            "defaultVal": "-",
            "description": "The text to be displayed"
          }
        ]
      }
    ],
    "demoTsx": "import { ComicText } from \"@/components/sarahui/comic-text\"\n\nexport default function ComicTextDemo() {\n  return (\n    <div className=\"space-y-8 text-center\">\n      <ComicText fontSize={5}>BOOM!</ComicText>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "KineticText": {
    "name": "KineticText",
    "slug": "kinetic-text",
    "category": "Community",
    "description": "Dynamic kinetic typography flowing smoothly with momentum-reactive velocity.",
    "tokens": [],
    "props": [
      {
        "title": "KineticText Props",
        "rows": [
          {
            "prop": "text",
            "type": "string",
            "defaultVal": "-",
            "description": "The text content to render with the kinetic effect."
          },
          {
            "prop": "as",
            "type": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"p\" | \"span\"",
            "defaultVal": "\"h1\"",
            "description": "The HTML element to render as."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional class names for the wrapper element."
          }
        ]
      }
    ],
    "demoTsx": "import { KineticText } from \"@/components/sarahui/kinetic-text\"\n\nexport default function KineticTextDemo() {\n  return (\n    <div className=\"relative justify-center\">\n      <KineticText\n        text=\"Nostalgia\"\n        className=\"text-[6rem] tracking-[-5%] [font-optical-sizing:auto]\"\n      />\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "CoolMode": {
    "name": "CoolMode",
    "slug": "cool-mode",
    "category": "Community",
    "description": "Celebratory multi-particle burst explosion on click.",
    "tokens": [],
    "props": [
      {
        "title": "CoolMode Props",
        "rows": [
          {
            "prop": "particle",
            "type": "String",
            "defaultVal": "\"circle\"",
            "description": "The particle URL for a custom particle"
          },
          {
            "prop": "size",
            "type": "Number",
            "defaultVal": "Varies",
            "description": "Size of the particle"
          },
          {
            "prop": "particleCount",
            "type": "Number",
            "defaultVal": "Varies",
            "description": "The number of particles to generate"
          },
          {
            "prop": "speedHorz",
            "type": "Number",
            "defaultVal": "Varies",
            "description": "Horizontal speed of the particles"
          },
          {
            "prop": "speedUp",
            "type": "Number",
            "defaultVal": "Varies",
            "description": "Upward speed of the particles"
          }
        ]
      }
    ],
    "demoTsx": "import { Button } from \"@/components/sarahui/button\"\nimport { CoolMode } from \"@/components/sarahui/cool-mode\"\n\nexport default function CoolModeDemo() {\n  return (\n    <div className=\"relative justify-center\">\n      <CoolMode>\n        <Button>Click Me!</Button>\n      </CoolMode>\n    </div>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "PixelImage": {
    "name": "PixelImage",
    "slug": "pixel-image",
    "category": "Community",
    "description": "Retro pixel distortion canvas filter with interactive resolution calibration.",
    "tokens": [],
    "props": [
      {
        "title": "PixelImage Props",
        "rows": [
          {
            "prop": "src",
            "type": "string",
            "defaultVal": "—",
            "description": "The image source URL"
          },
          {
            "prop": "grid",
            "type": "\"6x4\" | \"8x8\" | \"8x3\" | \"4x6\" | \"3x8\"",
            "defaultVal": "\"8x8\"",
            "description": "Predefined grid layout"
          },
          {
            "prop": "customGrid",
            "type": "{ rows: number; cols: number; }",
            "defaultVal": "—",
            "description": "Custom grid layout (overrides `grid`)"
          },
          {
            "prop": "grayscaleAnimation",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Whether to animate from grayscale to color"
          },
          {
            "prop": "pixelFadeInDuration",
            "type": "number",
            "defaultVal": "1000",
            "description": "Duration (ms) for each pixel fade-in animation"
          },
          {
            "prop": "maxAnimationDelay",
            "type": "number",
            "defaultVal": "1200",
            "description": "Maximum random delay (ms) for pixel animation"
          },
          {
            "prop": "colorRevealDelay",
            "type": "number",
            "defaultVal": "1500",
            "description": "Delay (ms) before revealing color"
          }
        ]
      }
    ],
    "demoTsx": "import { PixelImage } from \"@/components/sarahui/pixel-image\"\n\nexport default function Home() {\n  return (\n    <PixelImage\n      src=\"/pixel-image-demo.jpg\"\n      customGrid={{ rows: 4, cols: 6 }}\n      grayscaleAnimation\n    />\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "PulsatingButton": {
    "name": "PulsatingButton",
    "slug": "pulsating-button",
    "category": "Community",
    "description": "Button with smooth continuous harmonic pulsating glow rings.",
    "tokens": [],
    "props": [
      {
        "title": "PulsatingButton Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content of the button."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional class names for the button."
          },
          {
            "prop": "pulseColor",
            "type": "string",
            "defaultVal": "Derived from button background",
            "description": "Any valid CSS color for the pulsing waves."
          },
          {
            "prop": "duration",
            "type": "string",
            "defaultVal": "1.5s",
            "description": "The duration of one pulse."
          },
          {
            "prop": "distance",
            "type": "string",
            "defaultVal": "8px",
            "description": "How far the pulse expands from the button."
          },
          {
            "prop": "variant",
            "type": "\"pulse\" | \"ripple\"",
            "defaultVal": "pulse",
            "description": "The pulse animation style."
          }
        ]
      }
    ],
    "demoTsx": "import { PulsatingButton } from \"@/components/sarahui/pulsating-button\"\n\nexport default function PulsatingButtonDemo() {\n  return <PulsatingButton>Join Affiliate Program</PulsatingButton>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "WarpBackground": {
    "name": "WarpBackground",
    "slug": "warp-background",
    "category": "Community",
    "description": "Hyperspace 3D perspective warp tunnel background.",
    "tokens": [],
    "props": [
      {
        "title": "WarpBackground Props",
        "rows": [
          {
            "prop": "children",
            "type": "React.ReactNode",
            "defaultVal": "-",
            "description": "The content to be put inside the warp animation"
          },
          {
            "prop": "perspective",
            "type": "number",
            "defaultVal": "100",
            "description": "The perspective of the warp animation"
          },
          {
            "prop": "beamsPerSide",
            "type": "number",
            "defaultVal": "3",
            "description": "The number of beams per side"
          },
          {
            "prop": "beamSize",
            "type": "number",
            "defaultVal": "5",
            "description": "The size of the beams"
          },
          {
            "prop": "beamDelayMax",
            "type": "number",
            "defaultVal": "3",
            "description": "The maximum delay of the beams"
          },
          {
            "prop": "beamDelayMin",
            "type": "number",
            "defaultVal": "0",
            "description": "The minimum delay of the beams"
          },
          {
            "prop": "beamDuration",
            "type": "number",
            "defaultVal": "3",
            "description": "The duration of the beams"
          },
          {
            "prop": "gridColor",
            "type": "string",
            "defaultVal": "\"var(--border)\"",
            "description": "The color of the grid lines"
          }
        ]
      }
    ],
    "demoTsx": "import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardTitle,\n} from \"@/components/sarahui/card\"\nimport { WarpBackground } from \"@/components/sarahui/warp-background\"\n\nexport default function ExampleComponentDemo() {\n  return (\n    <WarpBackground>\n      <Card className=\"w-80\">\n        <CardContent className=\"flex flex-col gap-2 p-4\">\n          <CardTitle>Congratulations on Your Promotion!</CardTitle>\n          <CardDescription>\n            Your hard work and dedication have paid off. We&apos;re thrilled to\n            see you take this next step in your career. Keep up the fantastic\n            work!\n          </CardDescription>\n        </CardContent>\n      </Card>\n    </WarpBackground>\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "InteractiveHoverButton": {
    "name": "InteractiveHoverButton",
    "slug": "interactive-hover-button",
    "category": "Community",
    "description": "Interactive button with expanding circle fill and sliding directional arrow.",
    "tokens": [],
    "props": [
      {
        "title": "InteractiveHoverButton Props",
        "rows": [
          {
            "prop": "text",
            "type": "string",
            "defaultVal": "Button",
            "description": "The text to be displayed inside the button"
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional class names to style the component"
          }
        ]
      }
    ],
    "demoTsx": "import { InteractiveHoverButton } from \"@/components/sarahui/interactive-hover-button\"\n\nexport default function InteractiveHoverButtonDemo() {\n  return <InteractiveHoverButton>Hover Me</InteractiveHoverButton>\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedCircularProgressBar": {
    "name": "AnimatedCircularProgressBar",
    "slug": "animated-circular-progress-bar",
    "category": "Community",
    "description": "Animated radial gauge progress indicator with gradient stroke and centered value.",
    "tokens": [],
    "props": [
      {
        "title": "AnimatedCircularProgressBar Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "The class name to be applied to the component"
          },
          {
            "prop": "max",
            "type": "number",
            "defaultVal": "100",
            "description": "The maximum value of the gauge"
          },
          {
            "prop": "min",
            "type": "number",
            "defaultVal": "0",
            "description": "The minimum value of the gauge"
          },
          {
            "prop": "value",
            "type": "number",
            "defaultVal": "0",
            "description": "The current value of the gauge"
          },
          {
            "prop": "gaugePrimaryColor",
            "type": "string",
            "defaultVal": "-",
            "description": "The primary color of the gauge"
          },
          {
            "prop": "gaugeSecondaryColor",
            "type": "string",
            "defaultVal": "-",
            "description": "The secondary color of the gauge"
          }
        ]
      }
    ],
    "demoTsx": "\"use client\"\n\nimport { useEffect, useState } from \"react\"\n\nimport { AnimatedCircularProgressBar } from \"@/components/sarahui/animated-circular-progress-bar\"\n\nexport default function AnimatedCircularProgressBarDemo() {\n  const [value, setValue] = useState(0)\n\n  useEffect(() => {\n    const handleIncrement = (prev: number) => {\n      if (prev === 100) {\n        return 0\n      }\n      return prev + 10\n    }\n    setValue(handleIncrement)\n    const interval = setInterval(() => setValue(handleIncrement), 2000)\n    return () => clearInterval(interval)\n  }, [])\n\n  return (\n    <AnimatedCircularProgressBar\n      value={value}\n      gaugePrimaryColor=\"rgb(79 70 229)\"\n      gaugeSecondaryColor=\"rgba(0, 0, 0, 0.1)\"\n    />\n  )\n}\n",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Backlight": {
    "name": "Backlight",
    "slug": "backlight",
    "category": "Community",
    "description": "Ambient colored light aura radiating softly behind foreground containers.",
    "tokens": [],
    "props": [
      {
        "title": "Backlight Props",
        "rows": [
          {
            "prop": "blur",
            "type": "number",
            "defaultVal": "20",
            "description": "The blur intensity of the backlight glow effect."
          },
          {
            "prop": "children",
            "type": "React.ReactElement",
            "defaultVal": "-",
            "description": "The video, image, or SVG element to apply the backlight effect to."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Additional class names for the wrapper div."
          }
        ]
      }
    ],
    "demoTsx": "import { Backlight } from \"@/components/sarahui/backlight\";\n\nexport default function BacklightDemo() {\n  return (\n    <div className=\"relative flex items-center justify-center p-8\">\n      <Backlight blur={24}>\n        <div className=\"relative flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-xl backdrop-blur-md\">\n          <span className=\"text-xs font-semibold tracking-wider uppercase text-primary\">Ambient Aura</span>\n          <h3 className=\"mt-2 text-2xl font-bold tracking-tight text-foreground\">Backlight Glow</h3>\n          <p className=\"mt-1 text-sm text-muted-foreground\">Soft radiant aura projected behind container elements.</p>\n        </div>\n      </Backlight>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "GlyphMatrix": {
    "name": "GlyphMatrix",
    "slug": "glyph-matrix",
    "category": "Community",
    "description": "Hacker-style random character cypher stream with glowing lead glyphs.",
    "tokens": [],
    "props": [
      {
        "title": "GlyphMatrix Props",
        "rows": [
          {
            "prop": "glyphs",
            "type": "string",
            "defaultVal": "\"01·•+*/\\\\<>=\"",
            "description": "Characters to randomly pick from."
          },
          {
            "prop": "cellSize",
            "type": "number",
            "defaultVal": "14",
            "description": "Cell size in pixels and font size."
          },
          {
            "prop": "mutationRate",
            "type": "number",
            "defaultVal": "0.04",
            "description": "Probability a cell mutates each tick."
          },
          {
            "prop": "interval",
            "type": "number",
            "defaultVal": "90",
            "description": "Tick interval in milliseconds."
          },
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "-",
            "description": "Classes applied to the canvas element."
          },
          {
            "prop": "fadeBottom",
            "type": "number",
            "defaultVal": "0.6",
            "description": "Fade strength toward the bottom of the grid."
          },
          {
            "prop": "color",
            "type": "string",
            "defaultVal": "\"#6B7280\"",
            "description": "Glyph color (any CSS color)."
          }
        ]
      }
    ],
    "demoTsx": "import { GlyphMatrix } from \"@/components/sarahui/glyph-matrix\";\n\nexport function GlyphMatrixDemo() {\n  const color = \"var(--s-brand-indigo, #5B3DF5)\";\n  return (\n    <div className=\"border-border bg-background relative h-[400px] w-full overflow-hidden rounded-lg border\">\n      <GlyphMatrix\n        glyphs=\"01·•+*/\\<>=\"\n        cellSize={14}\n        mutationRate={0.04}\n        interval={90}\n        fadeBottom={0.6}\n        color={color}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AnimatedSubscribeButton": {
    "name": "AnimatedSubscribeButton",
    "slug": "animated-subscribe-button",
    "category": "Community",
    "description": "Morphing subscription button that smoothly transitions state with checkmark.",
    "tokens": [],
    "props": [
      {
        "title": "AnimatedSubscribeButton Props",
        "rows": [
          {
            "prop": "initialText",
            "type": "string",
            "defaultVal": "'Subscribe'",
            "description": "Label shown before the user subscribes"
          },
          {
            "prop": "subscribedText",
            "type": "string",
            "defaultVal": "'Subscribed'",
            "description": "Label shown after the subscribed state is reached"
          },
          {
            "prop": "isSubscribed",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Initial pressed/subscribed state (reflected via aria-pressed)"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Extra HTML attributes forwarded to the button"
          }
        ]
      }
    ],
    "demoTsx": "import { AnimatedSubscribeButton } from \"@/components/sarahui/animated-subscribe-button\";\n\nexport default function AnimatedSubscribeButtonDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center justify-center gap-4 p-6\">\n      <AnimatedSubscribeButton initialText=\"Subscribe\" subscribedText=\"Subscribed\" />\n      <AnimatedSubscribeButton\n        initialText=\"Follow updates\"\n        subscribedText=\"Following\"\n        isSubscribed={true}\n        attrs={{ \"aria-describedby\": \"subscribe-hint\" }}\n      />\n      <span id=\"subscribe-hint\" className=\"text-xs text-muted-foreground\">Toggle to receive release notes.</span>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Input": {
    "name": "Input",
    "slug": "input",
    "category": "Forms & Inputs",
    "description": "Visible labels, helpful context, and explicit error messages.",
    "tokens": [
      "--s-input-radius",
      "--s-input-height",
      "--s-border-default",
      "--s-border-focus"
    ],
    "props": [
      {
        "title": "Input Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique identifier for label association"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible form control label"
          },
          {
            "prop": "type",
            "type": "string",
            "defaultVal": "'text'",
            "description": "HTML input type (text, email, password, etc.)"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "defaultVal": "''",
            "description": "Placeholder hint"
          },
          {
            "prop": "helper",
            "type": "string",
            "defaultVal": "''",
            "description": "Supporting instructional text"
          },
          {
            "prop": "error",
            "type": "string",
            "defaultVal": "''",
            "description": "Validation error message"
          },
          {
            "prop": "required",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Marks field as required"
          }
        ]
      }
    ],
    "demoTsx": "import { Input } from \"@/components/sarahui/input\";\nimport { MailIcon } from \"sarahui/icons\";\n\nexport function InputDemo() {\n  return (\n    <div className=\"grid w-full max-w-sm gap-4\">\n      <Input\n        id=\"email\"\n        label=\"Email address\"\n        type=\"email\"\n        icon={<MailIcon />}\n        placeholder=\"hello@yourstudio.com\"\n        helper=\"A good place to stay connected.\"\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Textarea": {
    "name": "Textarea",
    "slug": "textarea",
    "category": "Forms & Inputs",
    "description": "A little more room for detail. Resizable and ready for native forms.",
    "tokens": [],
    "props": [
      {
        "title": "Textarea Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique element identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Form field label"
          },
          {
            "prop": "rows",
            "type": "number",
            "defaultVal": "4",
            "description": "Visible line height rows"
          },
          {
            "prop": "maxlength",
            "type": "number",
            "defaultVal": "500",
            "description": "Maximum character limit"
          },
          {
            "prop": "helper",
            "type": "string",
            "defaultVal": "''",
            "description": "Supporting instructions"
          }
        ]
      }
    ],
    "demoTsx": "import { Textarea } from \"@/components/sarahui/textarea\";\n\nexport function TextareaDemo() {\n  return (\n    <div className=\"grid w-full max-w-sm gap-2\">\n      <Textarea\n        id=\"project-brief\"\n        label=\"Project brief\"\n        placeholder=\"What are you creating?\"\n        helper=\"A sentence or two is a great place to start.\"\n        rows={4}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Select": {
    "name": "Select",
    "slug": "select",
    "category": "Forms & Inputs",
    "description": "Native keyboard, touch, and platform accessibility behavior.",
    "tokens": [],
    "props": [
      {
        "title": "Select Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique element identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Visible accessible label"
          },
          {
            "prop": "options",
            "type": "Array<{ label: string, value: string }>",
            "defaultVal": "[]",
            "description": "Selectable items"
          },
          {
            "prop": "value",
            "type": "string",
            "defaultVal": "''",
            "description": "Initial selected value"
          }
        ]
      }
    ],
    "demoTsx": "import { Select } from \"@/components/sarahui/select\";\n\nexport function SelectDemo() {\n  return (\n    <div className=\"grid w-full max-w-sm gap-2\">\n      <Select\n        id=\"workspace\"\n        label=\"Workspace\"\n        options={[\"Sarah’s studio\", \"Personal\", \"Design team\"]}\n        helper=\"Choose where your project belongs.\"\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Checkbox": {
    "name": "Checkbox",
    "slug": "checkbox",
    "category": "Forms & Inputs",
    "description": "Independent choices with full labels and mixed selection support.",
    "tokens": [],
    "props": [
      {
        "title": "Checkbox Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Visible checkbox label"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Secondary descriptive text"
          },
          {
            "prop": "checked",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Checked state"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Disables checkbox"
          }
        ]
      }
    ],
    "demoTsx": "import { Checkbox } from \"@/components/sarahui/checkbox\";\n\nexport function CheckboxDemo() {\n  return (\n    <div className=\"flex flex-col gap-3\">\n      <Checkbox id=\"c1\" label=\"Product updates\" description=\"Inspiration delivered occasionally.\" defaultChecked />\n      <Checkbox id=\"c2\" label=\"Community announcements\" description=\"News from our community.\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Radio": {
    "name": "Radio",
    "slug": "radio",
    "category": "Forms & Inputs",
    "description": "One choice from a related group, with native arrow key navigation.",
    "tokens": [],
    "props": [
      {
        "title": "Radio Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique element identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Option label"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Option supporting description"
          },
          {
            "prop": "checked",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Selected state"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Disables option"
          }
        ]
      }
    ],
    "demoTsx": "import { RadioGroup, Radio } from \"@/components/sarahui/radio\";\n\nexport function RadioDemo() {\n  return (\n    <RadioGroup label=\"Billing cycle\" defaultValue=\"monthly\">\n      <Radio id=\"r1\" value=\"monthly\" label=\"Monthly billing\" description=\"Flexible month to month.\" />\n      <Radio id=\"r2\" value=\"yearly\" label=\"Yearly billing\" description=\"Save 20% with annual payments.\" />\n    </RadioGroup>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Switch": {
    "name": "Switch",
    "slug": "switch",
    "category": "Forms & Inputs",
    "description": "An immediate on or off control, with native checkbox behavior.",
    "tokens": [],
    "props": [
      {
        "title": "Switch Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique element identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Toggle label"
          },
          {
            "prop": "checked",
            "type": "boolean",
            "defaultVal": "false",
            "description": "On / off switch state"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Disables switch toggle"
          }
        ]
      }
    ],
    "demoTsx": "import { Switch } from \"@/components/sarahui/switch\";\n\nexport function SwitchDemo() {\n  return (\n    <div className=\"flex flex-col gap-3\">\n      <Switch id=\"s1\" label=\"Email notifications\" description=\"Get notified about team activity.\" defaultChecked />\n      <Switch id=\"s2\" label=\"Weekly digest\" description=\"Summary sent every Monday.\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Slider": {
    "name": "Slider",
    "slug": "slider",
    "category": "Forms & Inputs",
    "description": "A continuous or discrete range control for numeric values.",
    "tokens": [],
    "props": [
      {
        "title": "Slider Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique element identifier"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Slider control label"
          },
          {
            "prop": "min",
            "type": "number",
            "defaultVal": "0",
            "description": "Minimum value boundary"
          },
          {
            "prop": "max",
            "type": "number",
            "defaultVal": "100",
            "description": "Maximum value boundary"
          },
          {
            "prop": "value",
            "type": "number",
            "defaultVal": "50",
            "description": "Current numeric value"
          }
        ]
      }
    ],
    "demoTsx": "import { Slider } from \"@/components/sarahui/slider\";\n\nexport function SliderDemo() {\n  return (\n    <div className=\"w-full max-w-sm\">\n      <Slider id=\"density\" label=\"Interface density\" min={0} max={100} defaultValue={64} />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Tabs": {
    "name": "Tabs",
    "slug": "tabs",
    "category": "Navigation",
    "description": "Connected views, keyboard navigation, and consistent focus.",
    "tokens": [],
    "props": [
      {
        "title": "Tabs Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Tabs group identifier"
          },
          {
            "prop": "items",
            "type": "Array<{ label: string, content: ReactNode }>",
            "defaultVal": "[]",
            "description": "Tab panels"
          },
          {
            "prop": "active",
            "type": "number",
            "defaultVal": "0",
            "description": "Initial selected tab index"
          }
        ]
      }
    ],
    "demoTsx": "import { Tabs, TabsList, TabsTrigger, TabsContent } from \"@/components/sarahui/tabs\";\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <TabsList>\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"activity\">Activity</TabsTrigger>\n        <TabsTrigger value=\"settings\">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">Everything in its place.</TabsContent>\n      <TabsContent value=\"activity\">You're all caught up.</TabsContent>\n      <TabsContent value=\"settings\">Manage your preferences.</TabsContent>\n    </Tabs>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Breadcrumb": {
    "name": "Breadcrumb",
    "slug": "breadcrumb",
    "category": "Navigation",
    "description": "A clear path back, with an explicitly announced current page.",
    "tokens": [],
    "props": [
      {
        "title": "Breadcrumb Props",
        "rows": [
          {
            "prop": "items",
            "type": "Array<{ label: string, href?: string }>",
            "defaultVal": "[]",
            "description": "Navigation hierarchy segments"
          }
        ]
      }
    ],
    "demoTsx": "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from \"@/components/sarahui/breadcrumb\";\n\nexport function BreadcrumbDemo() {\n  return (\n    <Breadcrumb>\n      <BreadcrumbItem><BreadcrumbLink href=\"#\">Workspace</BreadcrumbLink></BreadcrumbItem>\n      <BreadcrumbItem><BreadcrumbLink href=\"#\">Projects</BreadcrumbLink></BreadcrumbItem>\n      <BreadcrumbItem isCurrent>Design system</BreadcrumbItem>\n    </Breadcrumb>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Pagination": {
    "name": "Pagination",
    "slug": "pagination",
    "category": "Navigation",
    "description": "Previous, next, and current page. Connect events to your data.",
    "tokens": [],
    "props": [
      {
        "title": "Pagination Props",
        "rows": [
          {
            "prop": "pages",
            "type": "number",
            "defaultVal": "required",
            "description": "Total number of pages"
          },
          {
            "prop": "current",
            "type": "number",
            "defaultVal": "1",
            "description": "Active page index"
          }
        ]
      }
    ],
    "demoTsx": "import { Pagination } from \"@/components/sarahui/pagination\";\n\nexport function PaginationDemo() {\n  return <Pagination pages={5} current={2} label=\"Pagination demo\" />;\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "NavItem": {
    "name": "NavItem",
    "slug": "nav-item",
    "category": "Navigation",
    "description": "Consistent navigation, optional counts, and active states.",
    "tokens": [],
    "props": [
      {
        "title": "NavItem Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Navigation label"
          },
          {
            "prop": "href",
            "type": "string",
            "defaultVal": "'#'",
            "description": "Destination link target"
          },
          {
            "prop": "icon",
            "type": "string",
            "defaultVal": "''",
            "description": "Leading icon"
          },
          {
            "prop": "active",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Current route status"
          },
          {
            "prop": "badge",
            "type": "string",
            "defaultVal": "''",
            "description": "Counter badge"
          }
        ]
      }
    ],
    "demoTsx": "import { NavItem } from \"@/components/sarahui/nav-item\";\n\nexport default function NavItemDemo() {\n  return (\n    <nav aria-label=\"Project navigation\" className=\"flex flex-col gap-1 w-full max-w-xs rounded-xl border border-border bg-card p-3 shadow-sm\">\n      <NavItem label=\"Overview\" href=\"#overview\" icon=\"grid\" active={true} />\n      <NavItem label=\"Components\" href=\"#components\" icon=\"layers\" badge=\"120\" />\n      <NavItem label=\"Foundations\" href=\"#foundations\" icon=\"palette\" />\n      <NavItem label=\"Settings\" href=\"#settings\" icon=\"settings\" />\n    </nav>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Menu": {
    "name": "Menu",
    "slug": "menu",
    "category": "Navigation",
    "description": "A list of actions, keyboard navigation, and menu items.",
    "tokens": [],
    "props": [
      {
        "title": "Menu Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Menu dropdown container ID"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Trigger button label"
          },
          {
            "prop": "items",
            "type": "Array<{ label: string, icon?: string, value: string, danger?: boolean, disabled?: boolean }>",
            "defaultVal": "[]",
            "description": "Interactive menu options"
          }
        ]
      }
    ],
    "demoTsx": "import { Menu } from \"@/components/sarahui/menu\";\n\nexport default function MenuDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <Menu\n        id=\"project-actions\"\n        label=\"Project actions\"\n        items={[\n          { label: \"View workspace\", icon: \"folder\", value: \"view\" },\n          { label: \"Copy link\", icon: \"link\", value: \"copy\" },\n          { label: \"Export bundle\", icon: \"download\", value: \"export\", disabled: true },\n          { label: \"Delete project\", icon: \"trash\", value: \"delete\", danger: true }\n        ]}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "CommandPalette": {
    "name": "CommandPalette",
    "slug": "command-palette",
    "category": "Navigation",
    "description": "Search, filter, and navigate without leaving the keyboard.",
    "tokens": [],
    "props": [
      {
        "title": "CommandPalette Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Modal dialog identifier"
          },
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "'Search'",
            "description": "Accessible modal heading"
          },
          {
            "prop": "items",
            "type": "Array<{ label: string, href: string, icon?: string, keywords?: string }>",
            "defaultVal": "[]",
            "description": "Searchable directory links"
          }
        ]
      }
    ],
    "demoTsx": "import { CommandPalette } from \"@/components/sarahui/command-palette\";\nimport { Button } from \"@/components/sarahui/button\";\nimport { SearchIcon } from \"sarahui/icons\";\n\nexport default function CommandPaletteDemo() {\n  return (\n    <div className=\"flex flex-col items-center justify-center gap-4 p-8\">\n      <Button variant=\"outline\" className=\"flex items-center gap-2\">\n        <SearchIcon className=\"size-4 text-muted-foreground\" />\n        <span>Search documentation...</span>\n        <kbd className=\"ml-4 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground\">⌘K</kbd>\n      </Button>\n      <CommandPalette\n        id=\"app-search\"\n        title=\"Search library and tokens\"\n        items={[\n          { label: \"Introduction\", href: \"#overview\", icon: \"grid\", keywords: \"start guide docs\" },\n          { label: \"Components\", href: \"#components\", icon: \"layers\", keywords: \"ui elements widgets\" },\n          { label: \"Design Tokens\", href: \"#foundations\", icon: \"palette\", keywords: \"colors spacing typography\" },\n          { label: \"Settings\", href: \"#settings\", icon: \"settings\", keywords: \"preferences configuration\" }\n        ]}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Alert": {
    "name": "Alert",
    "slug": "alert",
    "category": "Feedback & Overlays",
    "description": "Contextual feedback with a title, detail, and supporting icon.",
    "tokens": [],
    "props": [
      {
        "title": "Alert Props",
        "rows": [
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "required",
            "description": "Alert headline"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Supporting alert notice"
          },
          {
            "prop": "tone",
            "type": "'brand' | 'success' | 'warning' | 'danger' | 'info'",
            "defaultVal": "'brand'",
            "description": "Visual semantic status tone"
          }
        ]
      }
    ],
    "demoTsx": "import { Alert } from \"@/components/sarahui/alert\";\n\nexport function AlertDemo() {\n  return (\n    <div className=\"flex flex-col gap-3\">\n      <Alert title=\"All systems operational\" description=\"Your workspace is synced and ready.\" />\n      <Alert title=\"Scheduled maintenance\" description=\"Update queued for midnight.\" tone=\"warning\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Dialog": {
    "name": "Dialog",
    "slug": "dialog",
    "category": "Feedback & Overlays",
    "description": "Native modal focus containment, Escape, and focus restoration.",
    "tokens": [
      "--s-dialog-radius",
      "--s-dialog-padding",
      "--s-bg-surface"
    ],
    "props": [
      {
        "title": "Dialog Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Unique dialog modal ID"
          },
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "required",
            "description": "Dialog heading"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Dialog accessible description"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Modal body content"
          },
          {
            "prop": "footer",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Action button controls"
          }
        ]
      }
    ],
    "demoTsx": "import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from \"@/components/sarahui/dialog\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport function DialogDemo() {\n  return (\n    <Dialog>\n      <DialogTrigger asChild>\n        <Button variant=\"primary\">Create project</Button>\n      </DialogTrigger>\n      <DialogContent>\n        <DialogTitle>A new beginning</DialogTitle>\n        <DialogDescription>Give your next idea a place to grow.</DialogDescription>\n      </DialogContent>\n    </Dialog>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Tooltip": {
    "name": "Tooltip",
    "slug": "tooltip",
    "category": "Feedback & Overlays",
    "description": "Short helper text on hover or focus, without obscuring content.",
    "tokens": [],
    "props": [
      {
        "title": "Tooltip Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible element ID"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Trigger anchor text"
          },
          {
            "prop": "text",
            "type": "string",
            "defaultVal": "required",
            "description": "Floating popover explanation"
          }
        ]
      }
    ],
    "demoTsx": "import { Tooltip, TooltipTrigger, TooltipContent } from \"@/components/sarahui/tooltip\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport function TooltipDemo() {\n  return (\n    <Tooltip>\n      <TooltipTrigger asChild>\n        <Button variant=\"outline\">Hover over me</Button>\n      </TooltipTrigger>\n      <TooltipContent>Shared tokens keep your interface consistent.</TooltipContent>\n    </Tooltip>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Toast": {
    "name": "Toast",
    "slug": "toast",
    "category": "Feedback & Overlays",
    "description": "Polite announcements; the timer pauses on hover or focus.",
    "tokens": [],
    "props": [
      {
        "title": "Toast Props",
        "rows": [
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "''",
            "description": "Toast notification heading"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "required",
            "description": "Announcement notification message"
          },
          {
            "prop": "tone",
            "type": "'brand' | 'success' | 'warning' | 'danger' | 'info'",
            "defaultVal": "'brand'",
            "description": "Visual semantic tone"
          }
        ]
      }
    ],
    "demoTsx": "import { Toast } from \"@/components/sarahui/toast\";\n\nexport default function ToastDemo() {\n  return (\n    <div className=\"flex flex-col gap-3 w-full max-w-md p-6\">\n      <Toast\n        title=\"Changes saved\"\n        description=\"Your project configuration has been updated.\"\n        tone=\"success\"\n      />\n      <Toast\n        title=\"New update available\"\n        description=\"SarahUI v2.4 includes 319 Spectrum-aligned design tokens.\"\n        tone=\"info\"\n      />\n      <Toast\n        title=\"Deployment warning\"\n        description=\"Build cache was invalidated due to updated preset tokens.\"\n        tone=\"warning\"\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Drawer": {
    "name": "Drawer",
    "slug": "drawer",
    "category": "Feedback & Overlays",
    "description": "A sliding panel from the viewport edge for secondary content.",
    "tokens": [],
    "props": [
      {
        "title": "Drawer Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { Drawer } from \"@/components/sarahui/drawer\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport default function DrawerDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <Button variant=\"outline\">Open Drawer</Button>\n      <Drawer\n        id=\"demo-drawer\"\n        title=\"Project Settings\"\n        description=\"Manage workspace preferences and deployment targets.\"\n        position=\"right\"\n      >\n        <div className=\"flex flex-col gap-4 py-4\">\n          <p className=\"text-sm text-muted-foreground\">\n            Configure project attributes, team access permissions, and automated build notifications.\n          </p>\n          <div className=\"flex justify-end gap-2 pt-4 border-t\">\n            <Button variant=\"outline\" size=\"sm\">Cancel</Button>\n            <Button variant=\"primary\" size=\"sm\">Save changes</Button>\n          </div>\n        </div>\n      </Drawer>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Popover": {
    "name": "Popover",
    "slug": "popover",
    "category": "Feedback & Overlays",
    "description": "Rich interactive content anchored directly to a trigger element.",
    "tokens": [],
    "props": [
      {
        "title": "Popover Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { Popover } from \"@/components/sarahui/popover\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport default function PopoverDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <Popover\n        id=\"settings-popover\"\n        trigger={<Button variant=\"outline\">Quick settings</Button>}\n        content={\n          <div className=\"flex flex-col gap-2 p-2\">\n            <h4 className=\"text-sm font-semibold text-foreground\">Display Density</h4>\n            <p className=\"text-xs text-muted-foreground\">Choose compact or comfortable workspace layout.</p>\n            <div className=\"mt-2 flex gap-2\">\n              <Button size=\"sm\" variant=\"outline\">Compact</Button>\n              <Button size=\"sm\" variant=\"primary\">Comfortable</Button>\n            </div>\n          </div>\n        }\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Sheet": {
    "name": "Sheet",
    "slug": "sheet",
    "category": "Feedback & Overlays",
    "description": "Extended side panel overlay for complex filtering and configuration.",
    "tokens": [],
    "props": [
      {
        "title": "Sheet Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { Sheet } from \"@/components/sarahui/sheet\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport default function SheetDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <Button variant=\"outline\">Open Sheet</Button>\n      <Sheet\n        id=\"demo-sheet\"\n        title=\"Navigation Sheet\"\n        description=\"Quickly navigate across workspaces and recent designs.\"\n      >\n        <div className=\"flex flex-col gap-2 py-4\">\n          <a href=\"#overview\" className=\"rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted\">Overview</a>\n          <a href=\"#components\" className=\"rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted\">Components (120)</a>\n          <a href=\"#foundations\" className=\"rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted\">Design Tokens</a>\n          <a href=\"#settings\" className=\"rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted\">Settings</a>\n        </div>\n      </Sheet>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ContextMenu": {
    "name": "ContextMenu",
    "slug": "context-menu",
    "category": "Feedback & Overlays",
    "description": "Context-sensitive action menu triggered on secondary click.",
    "tokens": [],
    "props": [
      {
        "title": "ContextMenu Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { ContextMenu } from \"@/components/sarahui/context-menu\";\n\nexport default function ContextMenuDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <ContextMenu\n        id=\"file-context-menu\"\n        trigger={\n          <div className=\"flex h-36 w-72 cursor-context-menu items-center justify-center rounded-xl border border-dashed border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground shadow-sm\">\n            Right-click inside this container\n          </div>\n        }\n        items={[\n          { label: \"Copy link\", icon: \"link\", value: \"copy\" },\n          { label: \"Duplicate file\", icon: \"folder\", value: \"duplicate\" },\n          { label: \"Rename\", icon: \"settings\", value: \"rename\" },\n          { label: \"Move to trash\", icon: \"trash\", value: \"delete\", danger: true }\n        ]}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "HoverCard": {
    "name": "HoverCard",
    "slug": "hover-card",
    "category": "Feedback & Overlays",
    "description": "Rich contextual preview popover appearing on element hover.",
    "tokens": [],
    "props": [
      {
        "title": "HoverCard Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { HoverCard } from \"@/components/sarahui/hover-card\";\nimport { Button } from \"@/components/sarahui/button\";\nimport { Avatar } from \"@/components/sarahui/avatar\";\n\nexport default function HoverCardDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <HoverCard\n        trigger={<Button variant=\"outline\" size=\"sm\">@sarahui</Button>}\n        content={\n          <div className=\"flex gap-4 p-2\">\n            <Avatar name=\"SarahUI\" size=\"md\" tone=\"brand\" />\n            <div className=\"flex flex-col\">\n              <h4 className=\"text-sm font-semibold text-foreground\">SarahUI</h4>\n              <p className=\"text-xs text-muted-foreground\">Framework-neutral design system by MASARA X.</p>\n              <div className=\"mt-2 flex items-center gap-2 text-xs text-muted-foreground\">\n                <span>120 components</span>\n                <span>•</span>\n                <span>319 design tokens</span>\n              </div>\n            </div>\n          </div>\n        }\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Icon": {
    "name": "Icon",
    "slug": "icon",
    "category": "Layout & Display",
    "description": "A consistent stroke system. Decorative by default; name meaningful icons.",
    "tokens": [],
    "props": [
      {
        "title": "Icon Props",
        "rows": [
          {
            "prop": "className",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional CSS class for styling overrides"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Children elements or content"
          }
        ]
      }
    ],
    "demoTsx": "import { Icon } from \"@/components/sarahui/icon\";\n\nexport default function IconDemo() {\n  return (\n    <div className=\"grid grid-cols-4 gap-6 p-6\">\n      <div className=\"flex flex-col items-center gap-2 rounded-lg border p-3\">\n        <Icon name=\"spark\" size={24} label=\"Spark\" />\n        <span className=\"text-xs text-muted-foreground\">spark</span>\n      </div>\n      <div className=\"flex flex-col items-center gap-2 rounded-lg border p-3\">\n        <Icon name=\"layers\" size={24} label=\"Layers\" />\n        <span className=\"text-xs text-muted-foreground\">layers</span>\n      </div>\n      <div className=\"flex flex-col items-center gap-2 rounded-lg border p-3\">\n        <Icon name=\"palette\" size={24} label=\"Palette\" />\n        <span className=\"text-xs text-muted-foreground\">palette</span>\n      </div>\n      <div className=\"flex flex-col items-center gap-2 rounded-lg border p-3\">\n        <Icon name=\"shield\" size={24} label=\"Shield\" />\n        <span className=\"text-xs text-muted-foreground\">shield</span>\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Button": {
    "name": "Button",
    "slug": "button",
    "category": "Layout & Display",
    "description": "Five visual priorities, three sizes, and thoughtful loading states.",
    "tokens": [
      "--s-button-radius",
      "--s-button-gap",
      "--s-button-height",
      "--s-action-primary"
    ],
    "props": [
      {
        "title": "Button Props",
        "rows": [
          {
            "prop": "variant",
            "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
            "defaultVal": "'primary'",
            "description": "Visual hierarchy style of the button"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "defaultVal": "'md'",
            "description": "Size and hit-target scale"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "''",
            "description": "Button text label"
          },
          {
            "prop": "icon",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional leading icon identifier"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Disables button interactions"
          },
          {
            "prop": "loading",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Displays loading spinner and blocks repeat clicks"
          }
        ]
      }
    ],
    "demoTsx": "import { Button } from \"@/components/sarahui/button\";\nimport { ArrowRightIcon, PlusIcon } from \"sarahui/icons\";\n\nexport function ButtonDemo() {\n  return (\n    <div className=\"flex flex-wrap gap-4 items-center\">\n      <Button variant=\"primary\" icon={<PlusIcon />}>\n        Create project\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"danger\">Delete</Button>\n      <Button variant=\"primary\" trailing={<ArrowRightIcon />}>\n        Get Started\n      </Button>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "IconButton": {
    "name": "IconButton",
    "slug": "icon-button",
    "category": "Layout & Display",
    "description": "Compact actions, accessible names, and generous targets.",
    "tokens": [],
    "props": [
      {
        "title": "IconButton Props",
        "rows": [
          {
            "prop": "icon",
            "type": "string",
            "defaultVal": "required",
            "description": "Icon identifier to render inside square button"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible screen reader label"
          },
          {
            "prop": "variant",
            "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
            "defaultVal": "'outline'",
            "description": "Visual style variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "defaultVal": "'md'",
            "description": "Touch target scale"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Disables user interactions"
          }
        ]
      }
    ],
    "demoTsx": "import { IconButton } from \"@/components/sarahui/icon-button\";\nimport { PlusIcon, HeartIcon, CopyIcon, TrashIcon } from \"sarahui/icons\";\n\nexport function IconButtonDemo() {\n  return (\n    <div className=\"flex gap-3 items-center\">\n      <IconButton icon={<PlusIcon />} label=\"Create project\" variant=\"primary\" />\n      <IconButton icon={<HeartIcon />} label=\"Save to favorites\" variant=\"outline\" />\n      <IconButton icon={<CopyIcon />} label=\"Copy page link\" variant=\"ghost\" />\n      <IconButton icon={<TrashIcon />} label=\"Delete item\" variant=\"danger\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ButtonGroup": {
    "name": "ButtonGroup",
    "slug": "button-group",
    "category": "Layout & Display",
    "description": "Related actions grouped with individual focus and labels.",
    "tokens": [],
    "props": [
      {
        "title": "ButtonGroup Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible grouping role label"
          },
          {
            "prop": "children",
            "type": "ReactNode[]",
            "defaultVal": "[]",
            "description": "Array of connected button items"
          }
        ]
      }
    ],
    "demoTsx": "import { ButtonGroup } from \"@/components/sarahui/button-group\";\nimport { Button } from \"@/components/sarahui/button\";\nimport { GridIcon, CodeIcon, ShareIcon } from \"sarahui/icons\";\n\nexport function ButtonGroupDemo() {\n  return (\n    <ButtonGroup label=\"Editor controls\">\n      <Button variant=\"outline\" icon={<GridIcon />}>Preview</Button>\n      <Button variant=\"outline\" icon={<CodeIcon />}>Code</Button>\n      <Button variant=\"outline\" icon={<ShareIcon />}>Share</Button>\n    </ButtonGroup>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Badge": {
    "name": "Badge",
    "slug": "badge",
    "category": "Layout & Display",
    "description": "Status communicated through text and color together.",
    "tokens": [
      "--s-badge-radius",
      "--s-text-primary"
    ],
    "props": [
      {
        "title": "Badge Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Badge display text"
          },
          {
            "prop": "tone",
            "type": "'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'",
            "defaultVal": "'neutral'",
            "description": "Color tone"
          },
          {
            "prop": "dot",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Shows status indicator dot"
          }
        ]
      }
    ],
    "demoTsx": "import { Badge } from \"@/components/sarahui/badge\";\n\nexport function BadgeDemo() {\n  return (\n    <div className=\"flex flex-wrap gap-2\">\n      <Badge tone=\"brand\">New release</Badge>\n      <Badge tone=\"info\">In progress</Badge>\n      <Badge tone=\"success\">Operational</Badge>\n      <Badge tone=\"warning\">In review</Badge>\n      <Badge tone=\"danger\">Needs attention</Badge>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Chip": {
    "name": "Chip",
    "slug": "chip",
    "category": "Layout & Display",
    "description": "Selected filters, categories, and removable choices.",
    "tokens": [],
    "props": [
      {
        "title": "Chip Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Chip label"
          },
          {
            "prop": "removable",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Shows dismissible close action"
          },
          {
            "prop": "selected",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Active filter toggle state"
          }
        ]
      }
    ],
    "demoTsx": "import { Chip } from \"@/components/sarahui/chip\";\n\nexport default function ChipDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-2 p-6\">\n      <Chip label=\"Design Systems\" selected={true} removable={true} />\n      <Chip label=\"Accessibility\" selected={false} removable={true} />\n      <Chip label=\"Design Tokens\" selected={true} removable={false} />\n      <Chip label=\"Zero Dependencies\" selected={false} removable={false} />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Avatar": {
    "name": "Avatar",
    "slug": "avatar",
    "category": "Layout & Display",
    "description": "Privacy-friendly initials, sizes, and optional presence.",
    "tokens": [],
    "props": [
      {
        "title": "Avatar Props",
        "rows": [
          {
            "prop": "name",
            "type": "string",
            "defaultVal": "required",
            "description": "User display name for monogram fallback"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "defaultVal": "'md'",
            "description": "Avatar dimension scale"
          },
          {
            "prop": "tone",
            "type": "string",
            "defaultVal": "'brand'",
            "description": "Color palette accent"
          },
          {
            "prop": "status",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Online activity presence dot"
          }
        ]
      }
    ],
    "demoTsx": "import { Avatar } from \"@/components/sarahui/avatar\";\n\nexport function AvatarDemo() {\n  return (\n    <div className=\"flex gap-3 items-center\">\n      <Avatar name=\"Sarah Khan\" size=\"lg\" status />\n      <Avatar name=\"Alex Morgan\" tone=\"info\" status />\n      <Avatar name=\"Jamie Kim\" tone=\"success\" />\n      <Avatar name=\"Maya Rahman\" tone=\"warning\" size=\"sm\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Card": {
    "name": "Card",
    "slug": "card",
    "category": "Layout & Display",
    "description": "A quiet container with intentional spacing and hierarchy.",
    "tokens": [
      "--s-card-radius",
      "--s-card-padding",
      "--s-bg-surface",
      "--s-border-default"
    ],
    "props": [
      {
        "title": "Card Props",
        "rows": [
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "''",
            "description": "Card title"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Card subtitle / description"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Main card content"
          },
          {
            "prop": "footer",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Card footer actions"
          }
        ]
      }
    ],
    "demoTsx": "import { Card } from \"@/components/sarahui/card\";\nimport { Button } from \"@/components/sarahui/button\";\nimport { Progress } from \"@/components/sarahui/progress\";\n\nexport function CardDemo() {\n  return (\n    <Card\n      title=\"A place for your ideas\"\n      description=\"Bring your team and your next big thing together.\"\n      footer={<Button variant=\"outline\" size=\"sm\">Explore workspace</Button>}\n    >\n      <Progress value={72} label=\"Workspace setup\" />\n    </Card>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "DataTable": {
    "name": "DataTable",
    "slug": "data-table",
    "category": "Layout & Display",
    "description": "Semantic tables with numeric sorting and mixed row selection.",
    "tokens": [],
    "props": [
      {
        "title": "DataTable Props",
        "rows": [
          {
            "prop": "id",
            "type": "string",
            "defaultVal": "required",
            "description": "Table container identifier"
          },
          {
            "prop": "caption",
            "type": "string",
            "defaultVal": "''",
            "description": "Accessible screen reader title"
          },
          {
            "prop": "columns",
            "type": "Array<{ key: string, label: string, sortable?: boolean }>",
            "defaultVal": "[]",
            "description": "Column headers"
          },
          {
            "prop": "rows",
            "type": "Array<Record<string, any>>",
            "defaultVal": "[]",
            "description": "Data row records"
          },
          {
            "prop": "selectable",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Row checkbox selection"
          }
        ]
      }
    ],
    "demoTsx": "import { DataTable } from \"@/components/sarahui/data-table\";\n\nexport default function DataTableDemo() {\n  return (\n    <div className=\"w-full max-w-2xl p-6\">\n      <DataTable\n        id=\"projects-table\"\n        caption=\"Team workspace projects\"\n        selectable={true}\n        columns={[\n          { key: \"name\", label: \"Project\", sortable: true },\n          { key: \"status\", label: \"Status\", sortable: true },\n          { key: \"progress\", label: \"Progress\", sortable: true }\n        ]}\n        rows={[\n          { name: \"Design System Audit\", status: \"Active\", progress: \"100%\" },\n          { name: \"Registry Migration\", status: \"Completed\", progress: \"94%\" },\n          { name: \"Token Compiler v2\", status: \"In Review\", progress: \"88%\" },\n          { name: \"E2E Test Hardening\", status: \"Testing\", progress: \"72%\" }\n        ]}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Accordion": {
    "name": "Accordion",
    "slug": "accordion",
    "category": "Layout & Display",
    "description": "Progressive disclosure using native details and summary.",
    "tokens": [],
    "props": [
      {
        "title": "Accordion Props",
        "rows": [
          {
            "prop": "items",
            "type": "Array<{ title: string, content: string | ReactNode, open?: boolean }>",
            "defaultVal": "[]",
            "description": "Collapsible accordion panels"
          }
        ]
      }
    ],
    "demoTsx": "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from \"@/components/sarahui/accordion\";\n\nexport function AccordionDemo() {\n  return (\n    <Accordion type=\"single\" collapsible defaultValue=\"item-1\">\n      <AccordionItem value=\"item-1\">\n        <AccordionTrigger>Can I make this my own?</AccordionTrigger>\n        <AccordionContent>Adjust the tokens and every component adapts automatically.</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value=\"item-2\">\n        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>\n        <AccordionContent>Every semantic color has an explicit light and dark value.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Progress": {
    "name": "Progress",
    "slug": "progress",
    "category": "Layout & Display",
    "description": "Native determinate progress with a visible label and value.",
    "tokens": [],
    "props": [
      {
        "title": "Progress Props",
        "rows": [
          {
            "prop": "value",
            "type": "number",
            "defaultVal": "0",
            "description": "Current progress percentage (0 - 100)"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "''",
            "description": "Accessible progress bar label"
          },
          {
            "prop": "showLabel",
            "type": "boolean",
            "defaultVal": "true",
            "description": "Displays percentage text"
          }
        ]
      }
    ],
    "demoTsx": "import { Progress } from \"@/components/sarahui/progress\";\n\nexport function ProgressDemo() {\n  return (\n    <div className=\"w-full max-w-sm flex flex-col gap-4\">\n      <Progress value={72} label=\"Design system progress\" />\n      <Progress value={100} label=\"Foundations complete\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Skeleton": {
    "name": "Skeleton",
    "slug": "skeleton",
    "category": "Layout & Display",
    "description": "Calm loading placeholders that respect reduced motion.",
    "tokens": [],
    "props": [
      {
        "title": "Skeleton Props",
        "rows": [
          {
            "prop": "lines",
            "type": "number",
            "defaultVal": "3",
            "description": "Number of animated skeleton placeholders"
          },
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "'Loading content'",
            "description": "Screen reader accessibility announcement"
          }
        ]
      }
    ],
    "demoTsx": "import { Skeleton } from \"@/components/sarahui/skeleton\";\n\nexport default function SkeletonDemo() {\n  return (\n    <div className=\"flex flex-col gap-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm\">\n      <div className=\"flex items-center gap-4\">\n        <Skeleton className=\"size-12 rounded-full\" />\n        <div className=\"flex flex-col gap-2 flex-1\">\n          <Skeleton className=\"h-4 w-3/4 rounded\" />\n          <Skeleton className=\"h-3 w-1/2 rounded\" />\n        </div>\n      </div>\n      <Skeleton lines={3} label=\"Loading project feed\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "EmptyState": {
    "name": "EmptyState",
    "slug": "empty-state",
    "category": "Layout & Display",
    "description": "A helpful explanation and a useful next step.",
    "tokens": [],
    "props": [
      {
        "title": "EmptyState Props",
        "rows": [
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "required",
            "description": "Headline"
          },
          {
            "prop": "description",
            "type": "string",
            "defaultVal": "''",
            "description": "Supporting guidance"
          },
          {
            "prop": "action",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Call to action button"
          }
        ]
      }
    ],
    "demoTsx": "import { EmptyState } from \"@/components/sarahui/empty-state\";\nimport { Button } from \"@/components/sarahui/button\";\n\nexport default function EmptyStateDemo() {\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <EmptyState\n        icon=\"folder\"\n        title=\"No projects yet\"\n        description=\"Your next idea starts here. Create a project to begin building.\"\n        action={<Button variant=\"primary\" size=\"sm\">Create project</Button>}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Separator": {
    "name": "Separator",
    "slug": "separator",
    "category": "Layout & Display",
    "description": "A subtle pause between groups, optionally labeled.",
    "tokens": [],
    "props": [
      {
        "title": "Separator Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "''",
            "description": "Optional centered divider label"
          }
        ]
      }
    ],
    "demoTsx": "import { Separator } from \"@/components/sarahui/separator\";\n\nexport default function SeparatorDemo() {\n  return (\n    <div className=\"flex flex-col gap-4 w-full max-w-sm p-6 text-sm\">\n      <div>\n        <h4 className=\"font-semibold text-foreground\">SarahUI Components</h4>\n        <p className=\"text-muted-foreground\">120 modular zero-dependency UI elements.</p>\n      </div>\n      <Separator />\n      <div>\n        <h4 className=\"font-semibold text-foreground\">Adobe Spectrum Tokens</h4>\n        <p className=\"text-muted-foreground\">319 3-tier semantic tokens.</p>\n      </div>\n      <Separator label=\"Or continue with\" />\n      <div className=\"flex justify-center\">\n        <span className=\"text-xs text-muted-foreground\">Native web components</span>\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Spinner": {
    "name": "Spinner",
    "slug": "spinner",
    "category": "Layout & Display",
    "description": "Named loading indicators and a decorative button option.",
    "tokens": [],
    "props": [
      {
        "title": "Spinner Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "'Loading'",
            "description": "Accessible screen reader label"
          },
          {
            "prop": "decorative",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Hides from assistive technology if redundant"
          }
        ]
      }
    ],
    "demoTsx": "import { Spinner } from \"@/components/sarahui/spinner\";\n\nexport default function SpinnerDemo() {\n  return (\n    <div className=\"flex items-center justify-center gap-6 p-8\">\n      <div className=\"flex items-center gap-3\">\n        <Spinner label=\"Loading workspace data\" />\n        <span className=\"text-sm text-muted-foreground\">Loading workspace...</span>\n      </div>\n      <div className=\"flex items-center gap-3\">\n        <Spinner decorative={true} />\n        <span className=\"text-sm font-medium\">Syncing tokens...</span>\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Toggle": {
    "name": "Toggle",
    "slug": "toggle",
    "category": "Layout & Display",
    "description": "A two-state button communicating pressed states.",
    "tokens": [],
    "props": [
      {
        "title": "Toggle Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible button label"
          },
          {
            "prop": "icon",
            "type": "string",
            "defaultVal": "''",
            "description": "Icon glyph"
          },
          {
            "prop": "pressed",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Aria pressed state"
          }
        ]
      }
    ],
    "demoTsx": "import { Toggle } from \"@/components/sarahui/toggle\";\n\nexport default function ToggleDemo() {\n  return (\n    <div className=\"flex items-center gap-3 p-6\">\n      <Toggle label=\"Bookmark\" icon=\"heart\" pressed={true} />\n      <Toggle label=\"Mute notifications\" icon=\"settings\" pressed={false} />\n      <Toggle label=\"Favorite\" icon=\"spark\" pressed={true} size=\"sm\" />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "ToggleGroup": {
    "name": "ToggleGroup",
    "slug": "toggle-group",
    "category": "Layout & Display",
    "description": "Segmented group of two-state buttons for single or multiple choice.",
    "tokens": [],
    "props": [
      {
        "title": "ToggleGroup Props",
        "rows": [
          {
            "prop": "label",
            "type": "string",
            "defaultVal": "required",
            "description": "Accessible group label"
          },
          {
            "prop": "items",
            "type": "Array<{ label: string, icon?: string, pressed?: boolean }>",
            "defaultVal": "[]",
            "description": "Array of connected toggle options"
          }
        ]
      }
    ],
    "demoTsx": "import { ToggleGroup } from \"@/components/sarahui/toggle-group\";\n\nexport default function ToggleGroupDemo() {\n  return (\n    <div className=\"flex flex-col items-center gap-4 p-6\">\n      <ToggleGroup\n        label=\"Text alignment\"\n        type=\"single\"\n        items={[\n          { label: \"Left\", icon: \"arrow\", pressed: true },\n          { label: \"Center\", icon: \"grid\", pressed: false },\n          { label: \"Right\", icon: \"arrow\", pressed: false }\n        ]}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Kbd": {
    "name": "Kbd",
    "slug": "kbd",
    "category": "Layout & Display",
    "description": "Displays keyboard keys and shortcuts with physical keycap depth.",
    "tokens": [],
    "props": [
      {
        "title": "Kbd Props",
        "rows": [
          {
            "prop": "keys",
            "type": "string[]",
            "defaultVal": "[]",
            "description": "Array of keyboard glyphs (e.g. [\"⌘\", \"K\"])"
          }
        ]
      }
    ],
    "demoTsx": "import { Kbd } from \"@/components/sarahui/kbd\";\n\nexport default function KbdDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center justify-center gap-4 p-8\">\n      <div className=\"flex items-center gap-2\">\n        <span className=\"text-sm text-muted-foreground\">Search:</span>\n        <Kbd keys={[\"⌘\", \"K\"]} />\n      </div>\n      <div className=\"flex items-center gap-2\">\n        <span className=\"text-sm text-muted-foreground\">Command palette:</span>\n        <Kbd keys={[\"Ctrl\", \"Shift\", \"P\"]} />\n      </div>\n      <div className=\"flex items-center gap-2\">\n        <span className=\"text-sm text-muted-foreground\">Close:</span>\n        <Kbd keys={[\"Esc\"]} />\n      </div>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "AspectRatio": {
    "name": "AspectRatio",
    "slug": "aspect-ratio",
    "category": "Layout & Display",
    "description": "Guarantees responsive aspect ratios for media and interactive embeds.",
    "tokens": [],
    "props": [
      {
        "title": "AspectRatio Props",
        "rows": [
          {
            "prop": "ratio",
            "type": "string",
            "defaultVal": "'16/9'",
            "description": "Aspect ratio proportions (e.g. 16/9, 4/3, 1/1)"
          },
          {
            "prop": "children",
            "type": "ReactNode",
            "defaultVal": "-",
            "description": "Media or canvas content constrained by ratio"
          }
        ]
      }
    ],
    "demoTsx": "import { AspectRatio } from \"@/components/sarahui/aspect-ratio\";\n\nexport default function AspectRatioDemo() {\n  return (\n    <div className=\"w-full max-w-md p-6\">\n      <AspectRatio ratio=\"16/9\" className=\"overflow-hidden rounded-xl border border-border bg-muted\">\n        <div className=\"flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-center\">\n          <span className=\"text-base font-semibold text-foreground\">16:9 Aspect Ratio</span>\n          <p className=\"mt-1 text-xs text-muted-foreground\">Maintains responsive proportions across all viewport widths.</p>\n        </div>\n      </AspectRatio>\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  },
  "Collapsible": {
    "name": "Collapsible",
    "slug": "collapsible",
    "category": "Layout & Display",
    "description": "Smooth animated disclosure container with accessible state.",
    "tokens": [],
    "props": [
      {
        "title": "Collapsible Props",
        "rows": [
          {
            "prop": "title",
            "type": "string",
            "defaultVal": "'Can I use this with any framework?'",
            "description": "Summary label rendered in the disclosure trigger"
          },
          {
            "prop": "content",
            "type": "string",
            "defaultVal": "''",
            "description": "Body text revealed when the disclosure is open"
          },
          {
            "prop": "open",
            "type": "boolean",
            "defaultVal": "false",
            "description": "Renders the disclosure expanded by default"
          },
          {
            "prop": "attrs",
            "type": "Record<string, any>",
            "defaultVal": "{}",
            "description": "Extra HTML attributes forwarded to the root element"
          }
        ]
      }
    ],
    "demoTsx": "import { Collapsible } from \"@/components/sarahui/collapsible\";\n\nexport default function CollapsibleDemo() {\n  return (\n    <div className=\"flex flex-col gap-3 w-full max-w-md p-6\">\n      <Collapsible\n        title=\"Can I use SarahUI with any framework?\"\n        content=\"Yes! SarahUI is framework-neutral and built on web standard templates with zero runtime dependencies.\"\n        open={true}\n      />\n      <Collapsible\n        title=\"How are design tokens structured?\"\n        content=\"Tokens follow Adobe Spectrum 3-tier taxonomy: Global tokens, Semantic tokens, and Component-scoped tokens.\"\n        open={false}\n      />\n    </div>\n  );\n}",
    "accessibility": {
      "role": "generic",
      "reducedMotion": "0ms transition or static projection"
    }
  }
};

function ownEntry(name) {
  return typeof name === 'string' && Object.hasOwn(registry, name) ? registry[name] : null;
}

export function getRegistryItem(name) {
  return ownEntry(name);
}

export function getAllRegistryItems() {
  return Object.values(registry);
}

export function getComponentProps(name) {
  const item = ownEntry(name);
  if (item && item.props && item.props.length > 0) {
    return item.props;
  }
  return [{
    title: name + ' Props',
    rows: [
      { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling overrides' },
      { prop: 'children', type: 'any', defaultVal: '-', description: 'Children elements or content' }
    ]
  }];
}

export function getComponentTsx(name) {
  const item = ownEntry(name);
  if (item && item.demoTsx) {
    return item.demoTsx;
  }
  const slug = toKebab(name);
  return `import { ${name} } from "@/components/sarahui/${slug}";

export function ${name}Demo() {
  return (
    <div className="flex items-center justify-center p-6">
      <${name} />
    </div>
  );
}`;
}

