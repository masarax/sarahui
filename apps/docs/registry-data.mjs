import fs from 'node:fs';
import path from 'node:path';

const mdxDir = path.resolve('read_ui/magicui/apps/www/content/docs/components');
const exDir = path.resolve('read_ui/magicui/apps/www/registry/example');
const magicuiDir = path.resolve('read_ui/magicui/apps/www/registry/magicui');

const specialSlugs = {
  BentoGrid: 'bento-grid',
  Highlighter: 'highlighter',
  Iphone: 'iphone',
  AnimatedSubscribeButton: 'animated-subscribe-button',
  AnimatedThemeToggler: 'animated-theme-toggler',
  Floating3DParticles: 'floating-3d-particles',
  Text3DFlip: 'text-3d-flip'
};

export function toKebab(str) {
  if (specialSlugs[str]) return specialSlugs[str];
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Base UI props fallback
const baseUIProps = {
  SmoothCursor: [
    { prop: 'cursor', type: 'ReactNode', defaultVal: '<DefaultCursorSVG />', description: 'Custom cursor component or SVG glyph to replace default cursor' },
    { prop: 'springConfig', type: 'SpringConfig', defaultVal: 'defaultSpringConfig', description: 'Configuration object for spring animation behavior (damping, stiffness, mass)' },
    { prop: 'color', type: 'string', defaultVal: "'currentColor'", description: 'Fill color for default SVG cursor glyph' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling overrides' }
  ],
  ProgressiveBlur: [
    { prop: 'position', type: "'top' | 'bottom' | 'both' | 'left' | 'right'", defaultVal: "'bottom'", description: 'Position or edge where the progressive blur effect is anchored' },
    { prop: 'height', type: 'string | number', defaultVal: "'30%'", description: 'Height (or width for left/right) of the progressive blur overlay' },
    { prop: 'blurLevels', type: 'number[]', defaultVal: '[0.5, 1, 2, 4, 8, 16, 32, 64]', description: 'Array of blur values (in px) defining the multi-layer Gaussian blur curve' },
    { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Optional scrollable content to wrap inside the progressive blur container' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS classes for styling and layout overrides' }
  ],
  DottedMap: [
    { prop: 'markers', type: 'Marker[]', defaultVal: '[]', description: 'Array of geographic markers with lat/lng coordinates, size, pulse beacons, and country flag badges' },
    { prop: 'lines', type: 'ConnectionLine[]', defaultVal: '[]', description: 'Array of connection paths/routes between geographic coordinates with animated flight dash flow' },
    { prop: 'width', type: 'number', defaultVal: '800', description: 'Width of the SVG viewport coordinate grid' },
    { prop: 'height', type: 'number', defaultVal: '400', description: 'Height of the SVG viewport coordinate grid' },
    { prop: 'dotRadius', type: 'number', defaultVal: '1.6', description: 'Radius (in px) of individual continent landmass dots' },
    { prop: 'dotColor', type: 'string', defaultVal: "'currentColor'", description: 'Fill color of continent dots (adapts automatically to theme)' },
    { prop: 'markerColor', type: 'string', defaultVal: "'#FF6900'", description: 'Accent color for marker beacons and pulse wave rings' },
    { prop: 'pulse', type: 'boolean', defaultVal: 'true', description: 'Whether to animate pulsating radar rings on geographic markers' },
    { prop: 'glow', type: 'boolean', defaultVal: 'true', description: 'Whether to render subtle radial vignette glow backdrop' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS classes for container layout and styling' }
  ],
  AnimatedBeam: [
    { prop: 'containerRef', type: 'RefObject<HTMLElement>', defaultVal: 'required', description: 'The parent container ref element for coordinate projection' },
    { prop: 'fromRef', type: 'RefObject<HTMLElement>', defaultVal: 'required', description: 'The source node ref from which the beam starts' },
    { prop: 'toRef', type: 'RefObject<HTMLElement>', defaultVal: 'required', description: 'The destination node ref to which the beam ends' },
    { prop: 'curvature', type: 'number', defaultVal: '0', description: 'The curvature arch of the quadratic Bezier beam curve' },
    { prop: 'reverse', type: 'boolean', defaultVal: 'false', description: 'Whether the radiant beam travel direction is reversed' },
    { prop: 'duration', type: 'number', defaultVal: '5', description: 'The duration (in seconds) of one complete beam animation cycle' },
    { prop: 'delay', type: 'number', defaultVal: '0', description: 'Initial animation delay (in seconds)' },
    { prop: 'repeat', type: 'number', defaultVal: 'Infinity', description: 'Number of times the beam animation cycle repeats' },
    { prop: 'repeatDelay', type: 'number', defaultVal: '0', description: 'Delay between consecutive repeat cycles (in seconds)' },
    { prop: 'pathColor', type: 'string', defaultVal: "'gray'", description: 'Stroke color for the background track line' },
    { prop: 'pathWidth', type: 'number', defaultVal: '2', description: 'Stroke width thickness of the beam line' },
    { prop: 'pathOpacity', type: 'number', defaultVal: '0.2', description: 'Opacity level of the static background track path' },
    { prop: 'gradientStartColor', type: 'string', defaultVal: "'#ffaa40'", description: 'Leading start color of the glowing beam gradient' },
    { prop: 'gradientStopColor', type: 'string', defaultVal: "'#9c40ff'", description: 'Trailing stop color of the glowing beam gradient' },
    { prop: 'startXOffset', type: 'number', defaultVal: '0', description: 'Horizontal anchor offset for the start point (in px)' },
    { prop: 'startYOffset', type: 'number', defaultVal: '0', description: 'Vertical anchor offset for the start point (in px)' },
    { prop: 'endXOffset', type: 'number', defaultVal: '0', description: 'Horizontal anchor offset for the end point (in px)' },
    { prop: 'endYOffset', type: 'number', defaultVal: '0', description: 'Vertical anchor offset for the end point (in px)' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling overrides' }
  ],
  BentoGrid: [
    {
      title: 'BentoGrid Props',
      rows: [
        { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Grid content containing BentoCards' },
        { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for layout and styling overrides' },
        { prop: 'cols', type: 'number', defaultVal: '3', description: 'Number of columns for the grid layout (e.g. 2, 3)' }
      ]
    },
    {
      title: 'BentoCard Props',
      rows: [
        { prop: 'name', type: 'string', defaultVal: 'required', description: 'Title or name of the bento card' },
        { prop: 'className', type: 'string', defaultVal: "''", description: 'Custom class names (e.g. col-span-2)' },
        { prop: 'background', type: 'ReactNode', defaultVal: '-', description: 'Background illustration or visual element' },
        { prop: 'Icon', type: 'ComponentType | string', defaultVal: 'required', description: 'Icon component or icon identifier displayed in header' },
        { prop: 'description', type: 'string', defaultVal: 'required', description: 'Feature description text' },
        { prop: 'href', type: 'string', defaultVal: "'#'", description: 'Destination link URL for the card and CTA button' },
        { prop: 'cta', type: 'string', defaultVal: "'Learn more'", description: 'Call to action button label' },
        { prop: 'colSpan', type: 'number', defaultVal: '1', description: 'Grid column span (1, 2, or 3)' },
        { prop: 'rowSpan', type: 'number', defaultVal: '1', description: 'Grid row span (1, 2, or 3)' }
      ]
    }
  ],
  Button: [
    { prop: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", defaultVal: "'primary'", description: 'Visual hierarchy style of the button' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Size and hit-target scale' },
    { prop: 'label', type: 'string', defaultVal: "''", description: 'Button text label' },
    { prop: 'icon', type: 'string', defaultVal: "''", description: 'Optional leading icon identifier' },
    { prop: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables button interactions' },
    { prop: 'loading', type: 'boolean', defaultVal: 'false', description: 'Displays loading spinner and blocks repeat clicks' }
  ],
  IconButton: [
    { prop: 'icon', type: 'string', defaultVal: 'required', description: 'Icon identifier to render inside square button' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Accessible screen reader label' },
    { prop: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", defaultVal: "'outline'", description: 'Visual style variant' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Touch target scale' },
    { prop: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables user interactions' }
  ],
  ButtonGroup: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Accessible grouping role label' },
    { prop: 'children', type: 'ReactNode[]', defaultVal: '[]', description: 'Array of connected button items' }
  ],
  Input: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique identifier for label association' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Accessible form control label' },
    { prop: 'type', type: 'string', defaultVal: "'text'", description: 'HTML input type (text, email, password, etc.)' },
    { prop: 'placeholder', type: 'string', defaultVal: "''", description: 'Placeholder hint' },
    { prop: 'helper', type: 'string', defaultVal: "''", description: 'Supporting instructional text' },
    { prop: 'error', type: 'string', defaultVal: "''", description: 'Validation error message' },
    { prop: 'required', type: 'boolean', defaultVal: 'false', description: 'Marks field as required' }
  ],
  Textarea: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique element identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Form field label' },
    { prop: 'rows', type: 'number', defaultVal: '4', description: 'Visible line height rows' },
    { prop: 'maxlength', type: 'number', defaultVal: '500', description: 'Maximum character limit' },
    { prop: 'helper', type: 'string', defaultVal: "''", description: 'Supporting instructions' }
  ],
  Select: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique element identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Visible accessible label' },
    { prop: 'options', type: 'Array<{ label: string, value: string }>', defaultVal: '[]', description: 'Selectable items' },
    { prop: 'value', type: 'string', defaultVal: "''", description: 'Initial selected value' }
  ],
  Checkbox: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Visible checkbox label' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Secondary descriptive text' },
    { prop: 'checked', type: 'boolean', defaultVal: 'false', description: 'Checked state' },
    { prop: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables checkbox' }
  ],
  Radio: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique element identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Option label' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Option supporting description' },
    { prop: 'checked', type: 'boolean', defaultVal: 'false', description: 'Selected state' },
    { prop: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables option' }
  ],
  Switch: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique element identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Toggle label' },
    { prop: 'checked', type: 'boolean', defaultVal: 'false', description: 'On / off switch state' },
    { prop: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables switch toggle' }
  ],
  Slider: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique element identifier' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Slider control label' },
    { prop: 'min', type: 'number', defaultVal: '0', description: 'Minimum value boundary' },
    { prop: 'max', type: 'number', defaultVal: '100', description: 'Maximum value boundary' },
    { prop: 'value', type: 'number', defaultVal: '50', description: 'Current numeric value' }
  ],
  Dialog: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Unique dialog modal ID' },
    { prop: 'title', type: 'string', defaultVal: 'required', description: 'Dialog heading' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Dialog accessible description' },
    { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Modal body content' },
    { prop: 'footer', type: 'ReactNode', defaultVal: '-', description: 'Action button controls' }
  ],
  Tabs: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Tabs group identifier' },
    { prop: 'items', type: 'Array<{ label: string, content: ReactNode }>', defaultVal: '[]', description: 'Tab panels' },
    { prop: 'active', type: 'number', defaultVal: '0', description: 'Initial selected tab index' }
  ],
  Card: [
    { prop: 'title', type: 'string', defaultVal: "''", description: 'Card title' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Card subtitle / description' },
    { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Main card content' },
    { prop: 'footer', type: 'ReactNode', defaultVal: '-', description: 'Card footer actions' }
  ],
  Badge: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Badge display text' },
    { prop: 'tone', type: "'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'", defaultVal: "'neutral'", description: 'Color tone' },
    { prop: 'dot', type: 'boolean', defaultVal: 'false', description: 'Shows status indicator dot' }
  ],
  Chip: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Chip label' },
    { prop: 'removable', type: 'boolean', defaultVal: 'false', description: 'Shows dismissible close action' },
    { prop: 'selected', type: 'boolean', defaultVal: 'false', description: 'Active filter toggle state' }
  ],
  Avatar: [
    { prop: 'name', type: 'string', defaultVal: 'required', description: 'User display name for monogram fallback' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Avatar dimension scale' },
    { prop: 'tone', type: 'string', defaultVal: "'brand'", description: 'Color palette accent' },
    { prop: 'status', type: 'boolean', defaultVal: 'false', description: 'Online activity presence dot' }
  ],
  Alert: [
    { prop: 'title', type: 'string', defaultVal: 'required', description: 'Alert headline' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Supporting alert notice' },
    { prop: 'tone', type: "'brand' | 'success' | 'warning' | 'danger' | 'info'", defaultVal: "'brand'", description: 'Visual semantic status tone' }
  ],
  Breadcrumb: [
    { prop: 'items', type: 'Array<{ label: string, href?: string }>', defaultVal: '[]', description: 'Navigation hierarchy segments' }
  ],
  Pagination: [
    { prop: 'pages', type: 'number', defaultVal: 'required', description: 'Total number of pages' },
    { prop: 'current', type: 'number', defaultVal: '1', description: 'Active page index' }
  ],
  NavItem: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Navigation label' },
    { prop: 'href', type: 'string', defaultVal: "'#'", description: 'Destination link target' },
    { prop: 'icon', type: 'string', defaultVal: "''", description: 'Leading icon' },
    { prop: 'active', type: 'boolean', defaultVal: 'false', description: 'Current route status' },
    { prop: 'badge', type: 'string', defaultVal: "''", description: 'Counter badge' }
  ],
  DataTable: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Table container identifier' },
    { prop: 'caption', type: 'string', defaultVal: "''", description: 'Accessible screen reader title' },
    { prop: 'columns', type: 'Array<{ key: string, label: string, sortable?: boolean }>', defaultVal: '[]', description: 'Column headers' },
    { prop: 'rows', type: 'Array<Record<string, any>>', defaultVal: '[]', description: 'Data row records' },
    { prop: 'selectable', type: 'boolean', defaultVal: 'false', description: 'Row checkbox selection' }
  ],
  Accordion: [
    { prop: 'items', type: 'Array<{ title: string, content: string | ReactNode, open?: boolean }>', defaultVal: '[]', description: 'Collapsible accordion panels' }
  ],
  Tooltip: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Accessible element ID' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Trigger anchor text' },
    { prop: 'text', type: 'string', defaultVal: 'required', description: 'Floating popover explanation' }
  ],
  Progress: [
    { prop: 'value', type: 'number', defaultVal: '0', description: 'Current progress percentage (0 - 100)' },
    { prop: 'label', type: 'string', defaultVal: "''", description: 'Accessible progress bar label' },
    { prop: 'showLabel', type: 'boolean', defaultVal: 'true', description: 'Displays percentage text' }
  ],
  Skeleton: [
    { prop: 'lines', type: 'number', defaultVal: '3', description: 'Number of animated skeleton placeholders' },
    { prop: 'label', type: 'string', defaultVal: "'Loading content'", description: 'Screen reader accessibility announcement' }
  ],
  EmptyState: [
    { prop: 'title', type: 'string', defaultVal: 'required', description: 'Headline' },
    { prop: 'description', type: 'string', defaultVal: "''", description: 'Supporting guidance' },
    { prop: 'action', type: 'ReactNode', defaultVal: '-', description: 'Call to action button' }
  ],
  Separator: [
    { prop: 'label', type: 'string', defaultVal: "''", description: 'Optional centered divider label' }
  ],
  Spinner: [
    { prop: 'label', type: 'string', defaultVal: "'Loading'", description: 'Accessible screen reader label' },
    { prop: 'decorative', type: 'boolean', defaultVal: 'false', description: 'Hides from assistive technology if redundant' }
  ],
  Toast: [
    { prop: 'title', type: 'string', defaultVal: "''", description: 'Toast notification heading' },
    { prop: 'description', type: 'string', defaultVal: 'required', description: 'Announcement notification message' },
    { prop: 'tone', type: "'brand' | 'success' | 'warning' | 'danger' | 'info'", defaultVal: "'brand'", description: 'Visual semantic tone' }
  ],
  Menu: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Menu dropdown container ID' },
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Trigger button label' },
    { prop: 'items', type: 'Array<{ label: string, icon?: string, value: string, danger?: boolean, disabled?: boolean }>', defaultVal: '[]', description: 'Interactive menu options' }
  ],
  CommandPalette: [
    { prop: 'id', type: 'string', defaultVal: 'required', description: 'Modal dialog identifier' },
    { prop: 'title', type: 'string', defaultVal: "'Search'", description: 'Accessible modal heading' },
    { prop: 'items', type: 'Array<{ label: string, href: string, icon?: string, keywords?: string }>', defaultVal: '[]', description: 'Searchable directory links' }
  ],
  Toggle: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Accessible button label' },
    { prop: 'icon', type: 'string', defaultVal: "''", description: 'Icon glyph' },
    { prop: 'pressed', type: 'boolean', defaultVal: 'false', description: 'Aria pressed state' }
  ],
  ToggleGroup: [
    { prop: 'label', type: 'string', defaultVal: 'required', description: 'Accessible group label' },
    { prop: 'items', type: 'Array<{ label: string, icon?: string, pressed?: boolean }>', defaultVal: '[]', description: 'Array of connected toggle options' }
  ],
  Kbd: [
    { prop: 'keys', type: 'string[]', defaultVal: '[]', description: 'Array of keyboard glyphs (e.g. ["⌘", "K"])' }
  ],
  AspectRatio: [
    { prop: 'ratio', type: 'string', defaultVal: "'16/9'", description: 'Aspect ratio proportions (e.g. 16/9, 4/3, 1/1)' },
    { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Media or canvas content constrained by ratio' }
  ],
  Globe: [
    { prop: 'size', type: 'number', defaultVal: '360', description: 'Diameter size of the globe in pixels' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling and layout positioning' },
    { prop: 'config', type: 'COBEOptions', defaultVal: '{}', description: 'Configuration options for Cobe WebGL/canvas parameters (rotation, markers, scale)' }
  ],
  TweetCard: [
    { prop: 'id', type: 'string', defaultVal: "'2095541863956742174'", description: 'The unique ID of the tweet to display (resolves video, images, or link preview automatically)' },
    { prop: 'autoPlay', type: 'boolean', defaultVal: 'true', description: 'Whether embedded tweet video should start playing automatically' },
    { prop: 'muted', type: 'boolean', defaultVal: 'true', description: 'Whether embedded tweet video starts muted (recommended for browser autoplay)' },
    { prop: 'loop', type: 'boolean', defaultVal: 'true', description: 'Whether embedded tweet video should loop continuously' },
    { prop: 'controls', type: 'boolean', defaultVal: 'true', description: 'Whether native video controls (play/pause, volume, fullscreen) are accessible' },
    { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling and container sizing' },
    { prop: 'apiUrl', type: 'string', defaultVal: "''", description: 'Optional custom API proxy URL for fetching tweet data' }
  ]
};

// Base UI TSX templates (100% sarahui, zero 3rd party)
const baseUITSX = {
  AnimatedBeam: `import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/sarahui/animated-beam";
import { GoogleDriveIcon, NotionIcon, WhatsAppIcon, OpenAIIcon, GoogleDocsIcon, ZapierIcon, MessengerIcon } from "sarahui/icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={\`z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 p-3 shadow-md \${className || ""}\`}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10 shadow-sm"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[240px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <GoogleDriveIcon className="size-6" />
          </Circle>
          <Circle ref={div5Ref}>
            <GoogleDocsIcon className="size-6" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <NotionIcon className="size-6" />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <OpenAIIcon className="size-8" />
          </Circle>
          <Circle ref={div6Ref}>
            <ZapierIcon className="size-6" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <WhatsAppIcon className="size-6" />
          </Circle>
          <Circle ref={div7Ref}>
            <MessengerIcon className="size-6" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}`,
  TweetCard: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <TweetCard id="2095541863956742174" className="shadow-2xl" />
    </div>
  );
}`,
  Globe: `import { Globe } from "@/components/sarahui/globe";

export function GlobeDemo() {
  return (
    <div className="relative flex h-[440px] w-full max-w-xl items-center justify-center overflow-hidden rounded-lg border bg-background pt-8 pb-40">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  );
}`,
  Button: `import { Button } from "@/components/sarahui/button";
import { ArrowRightIcon, PlusIcon } from "sarahui/icons";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary" icon={<PlusIcon />}>
        Create project
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="primary" trailing={<ArrowRightIcon />}>
        Get Started
      </Button>
    </div>
  );
}`,
  IconButton: `import { IconButton } from "@/components/sarahui/icon-button";
import { PlusIcon, HeartIcon, CopyIcon, TrashIcon } from "sarahui/icons";

export function IconButtonDemo() {
  return (
    <div className="flex gap-3 items-center">
      <IconButton icon={<PlusIcon />} label="Create project" variant="primary" />
      <IconButton icon={<HeartIcon />} label="Save to favorites" variant="outline" />
      <IconButton icon={<CopyIcon />} label="Copy page link" variant="ghost" />
      <IconButton icon={<TrashIcon />} label="Delete item" variant="danger" />
    </div>
  );
}`,
  ButtonGroup: `import { ButtonGroup } from "@/components/sarahui/button-group";
import { Button } from "@/components/sarahui/button";
import { GridIcon, CodeIcon, ShareIcon } from "sarahui/icons";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup label="Editor controls">
      <Button variant="outline" icon={<GridIcon />}>Preview</Button>
      <Button variant="outline" icon={<CodeIcon />}>Code</Button>
      <Button variant="outline" icon={<ShareIcon />}>Share</Button>
    </ButtonGroup>
  );
}`,
  Input: `import { Input } from "@/components/sarahui/input";
import { MailIcon } from "sarahui/icons";

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input
        id="email"
        label="Email address"
        type="email"
        icon={<MailIcon />}
        placeholder="hello@yourstudio.com"
        helper="A good place to stay connected."
      />
    </div>
  );
}`,
  Textarea: `import { Textarea } from "@/components/sarahui/textarea";

export function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Textarea
        id="project-brief"
        label="Project brief"
        placeholder="What are you creating?"
        helper="A sentence or two is a great place to start."
        rows={4}
      />
    </div>
  );
}`,
  Select: `import { Select } from "@/components/sarahui/select";

export function SelectDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Select
        id="workspace"
        label="Workspace"
        options={["Sarah’s studio", "Personal", "Design team"]}
        helper="Choose where your project belongs."
      />
    </div>
  );
}`,
  Checkbox: `import { Checkbox } from "@/components/sarahui/checkbox";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox id="c1" label="Product updates" description="Inspiration delivered occasionally." defaultChecked />
      <Checkbox id="c2" label="Community announcements" description="News from our community." />
    </div>
  );
}`,
  Radio: `import { RadioGroup, Radio } from "@/components/sarahui/radio";

export function RadioDemo() {
  return (
    <RadioGroup label="Billing cycle" defaultValue="monthly">
      <Radio id="r1" value="monthly" label="Monthly billing" description="Flexible month to month." />
      <Radio id="r2" value="yearly" label="Yearly billing" description="Save 20% with annual payments." />
    </RadioGroup>
  );
}`,
  Switch: `import { Switch } from "@/components/sarahui/switch";

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Switch id="s1" label="Email notifications" description="Get notified about team activity." defaultChecked />
      <Switch id="s2" label="Weekly digest" description="Summary sent every Monday." />
    </div>
  );
}`,
  Slider: `import { Slider } from "@/components/sarahui/slider";

export function SliderDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider id="density" label="Interface density" min={0} max={100} defaultValue={64} />
    </div>
  );
}`,
  Badge: `import { Badge } from "@/components/sarahui/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone="brand">New release</Badge>
      <Badge tone="info">In progress</Badge>
      <Badge tone="success">Operational</Badge>
      <Badge tone="warning">In review</Badge>
      <Badge tone="danger">Needs attention</Badge>
    </div>
  );
}`,
  Card: `import { Card } from "@/components/sarahui/card";
import { Button } from "@/components/sarahui/button";
import { Progress } from "@/components/sarahui/progress";

export function CardDemo() {
  return (
    <Card
      title="A place for your ideas"
      description="Bring your team and your next big thing together."
      footer={<Button variant="outline" size="sm">Explore workspace</Button>}
    >
      <Progress value={72} label="Workspace setup" />
    </Card>
  );
}`,
  Dialog: `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/sarahui/dialog";
import { Button } from "@/components/sarahui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Create project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>A new beginning</DialogTitle>
        <DialogDescription>Give your next idea a place to grow.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}`,
  Tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sarahui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Everything in its place.</TabsContent>
      <TabsContent value="activity">You're all caught up.</TabsContent>
      <TabsContent value="settings">Manage your preferences.</TabsContent>
    </Tabs>
  );
}`,
  Avatar: `import { Avatar } from "@/components/sarahui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar name="Sarah Khan" size="lg" status />
      <Avatar name="Alex Morgan" tone="info" status />
      <Avatar name="Jamie Kim" tone="success" />
      <Avatar name="Maya Rahman" tone="warning" size="sm" />
    </div>
  );
}`,
  Progress: `import { Progress } from "@/components/sarahui/progress";

export function ProgressDemo() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <Progress value={72} label="Design system progress" />
      <Progress value={100} label="Foundations complete" />
    </div>
  );
}`,
  Alert: `import { Alert } from "@/components/sarahui/alert";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Alert title="All systems operational" description="Your workspace is synced and ready." />
      <Alert title="Scheduled maintenance" description="Update queued for midnight." tone="warning" />
    </div>
  );
}`,
  Breadcrumb: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/sarahui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem isCurrent>Design system</BreadcrumbItem>
    </Breadcrumb>
  );
}`,
  Pagination: `import { Pagination } from "@/components/sarahui/pagination";

export function PaginationDemo() {
  return <Pagination pages={5} current={2} label="Pagination demo" />;
}`,
  Accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/sarahui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I make this my own?</AccordionTrigger>
        <AccordionContent>Adjust the tokens and every component adapts automatically.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>Every semantic color has an explicit light and dark value.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  Tooltip: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/sarahui/tooltip";
import { Button } from "@/components/sarahui/button";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover over me</Button>
      </TooltipTrigger>
      <TooltipContent>Shared tokens keep your interface consistent.</TooltipContent>
    </Tooltip>
  );
}`
};

// Cache parsed tables
const propsCache = new Map();
const tsxCache = new Map();

export function sanitizeTsx(rawCode) {
  if (!rawCode) return rawCode;

  let code = rawCode;

  // 1. Icon libraries -> sarahui/icons (replaces @radix-ui/react-icons, lucide-react, etc.)
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

  // 4. Text replacements: replace any leftover third-party mentions
  code = code.replace(/magicui\.design/g, 'sarahui.dev');
  code = code.replace(/Magic UI/g, 'sarahUI');
  code = code.replace(/MagicUI/g, 'sarahUI');
  code = code.replace(/magicui/g, 'sarahui');

  return code;
}

export function getComponentProps(name) {
  if (propsCache.has(name)) return propsCache.get(name);

  const slug = toKebab(name);
  const mdxFile = path.join(mdxDir, slug + '.mdx');

  if (fs.existsSync(mdxFile)) {
    const content = fs.readFileSync(mdxFile, 'utf8');
    const match = content.match(/## Props\s*\n+([\s\S]*?)(?=\n## |\n---|$)/i);
    if (match) {
      const lines = match[1].trim().split('\n');
      const tables = [];
      let currentTable = null;

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('### ')) {
          currentTable = { title: trimmed.replace('### ', '').trim(), rows: [] };
          tables.push(currentTable);
        } else if (trimmed.startsWith('|') && !trimmed.includes('---')) {
          const safeLine = trimmed.replace(/\\\|/g, '__ESCAPED_PIPE__');
          const cols = safeLine.split('|').slice(1, -1).map(c => c.trim().replace(/__ESCAPED_PIPE__/g, '|').replace(/^`|`$/g, ''));
          if (cols.length >= 4) {
            if (cols[0].toLowerCase().startsWith('prop')) continue;
            if (!currentTable) {
              currentTable = { title: name + ' Props', rows: [] };
              tables.push(currentTable);
            }
            currentTable.rows.push({
              prop: cols[0],
              type: cols[1],
              defaultVal: cols[2] || '-',
              description: cols.slice(3).join(' | ').replace(/Magic UI/g, 'sarahUI').replace(/magicui/g, 'sarahui')
            });
          }
        }
      }
      const validTables = tables.filter(t => t.rows && t.rows.length > 0);
      if (validTables.length > 0) {
        propsCache.set(name, validTables);
        return validTables;
      }
    }
  }

  // Fallback to base UI props or default props
  if (baseUIProps[name]) {
    const rawVal = baseUIProps[name];
    const t = Array.isArray(rawVal) && rawVal.length > 0 && rawVal[0].title
      ? rawVal
      : [{ title: name + ' Props', rows: rawVal }];
    propsCache.set(name, t);
    return t;
  }

  // Generic fallback
  const generic = [{
    title: name + ' Props',
    rows: [
      { prop: 'className', type: 'string', defaultVal: "''", description: 'Optional CSS class for styling overrides' },
      { prop: 'children', type: 'ReactNode', defaultVal: '-', description: 'Children elements or content' }
    ]
  }];
  propsCache.set(name, generic);
  return generic;
}

export function getComponentTsx(name) {
  if (tsxCache.has(name)) return tsxCache.get(name);

  // Check built-in base UI TSX first
  if (baseUITSX[name]) {
    tsxCache.set(name, baseUITSX[name]);
    return baseUITSX[name];
  }

  const slug = toKebab(name);

  // Search example directory
  const possibleNames = [
    `${slug}-demo.tsx`,
    `${slug}.tsx`,
    `bento-demo.tsx`,
    `${slug}-basic.tsx`
  ];

  if (name === 'BentoGrid') {
    possibleNames.unshift('bento-demo.tsx');
  }

  let code = '';
  for (const p of possibleNames) {
    const fullPath = path.join(exDir, p);
    if (fs.existsSync(fullPath)) {
      code = fs.readFileSync(fullPath, 'utf8');
      break;
    }
  }

  if (!code) {
    // Check registry
    const compPath = path.join(magicuiDir, `${slug}.tsx`);
    if (fs.existsSync(compPath)) {
      code = fs.readFileSync(compPath, 'utf8');
    }
  }

  if (!code) {
    // Generate standard TSX demo
    code = `import { ${name} } from "@/components/sarahui/${slug}";

export function ${name}Demo() {
  return (
    <div className="flex items-center justify-center p-6">
      <${name} />
    </div>
  );
}`;
  }

  // Strictly sanitize code: 100% sarahui, ZERO 3rd-party library names
  code = sanitizeTsx(code);

  tsxCache.set(name, code);
  return code;
}
