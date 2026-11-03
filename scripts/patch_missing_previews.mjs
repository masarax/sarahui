import fs from 'fs';

let content = fs.readFileSync('apps/docs/catalog.mjs', 'utf8');

// 1. FileTree
content = content.replace(
  /\/\/ 64\. FileTree\r?\n\s+FileTree:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 65\. CodeComparison/,
  `// 64. FileTree
  FileTree: [
    {
      title: 'Collapsible Project Directory',
      description: 'Hierarchical folder and file tree with expand, collapse, and keyboard navigation.',
      preview: () => U.FileTree({
        elements: [
          { id: 'src', name: 'src', type: 'folder', children: [
            { id: 'index', name: 'index.ts', type: 'file' },
            { id: 'styles', name: 'styles.css', type: 'file' }
          ]},
          { id: 'pkg', name: 'package.json', type: 'file' }
        ]
      }),
      code: \`import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeDemo() {
  return (
    <FileTree>
      <Folder name="src">
        <File name="index.ts" />
        <File name="styles.css" />
      </Folder>
    </FileTree>
  );
}\`
    },
    {
      title: 'Multi-Level Architecture',
      description: 'Deep file structure showing components, hooks, and configuration files.',
      preview: () => U.FileTree({
        elements: [
          { id: 'components', name: 'components', type: 'folder', children: [
            { id: 'ui', name: 'ui', type: 'folder', children: [
              { id: 'button', name: 'button.tsx', type: 'file' },
              { id: 'dialog', name: 'dialog.tsx', type: 'file' }
            ]}
          ]},
          { id: 'readme', name: 'README.md', type: 'file' }
        ]
      }),
      code: \`import { FileTree } from "@/components/sarahui/file-tree";

export function FileTreeDeep() {
  return <FileTree defaultExpanded={["components", "ui"]} />;
}\`
    }
  ],

  // 65. CodeComparison`
);

// 2. Slider
content = content.replace(
  /\/\/ 105\. Slider\r?\n\s+Slider:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 106\. Tabs/,
  `// 105. Slider
  Slider: [
    {
      title: 'Continuous Value Slider',
      description: 'Interactive slider with live output value synchronization.',
      preview: () => U.Slider({ id: 'slider-continuous', label: 'Interface density', value: 64 }),
      code: \`import { Slider } from "@/components/sarahui/slider";

export function SliderDemo() {
  return <Slider label="Interface density" defaultValue={64} />;
}\`
    },
    {
      title: 'Stepped Interval Range',
      description: 'Discrete stepping intervals for calibrated tuning.',
      preview: () => U.Slider({ id: 'slider-stepped', label: 'Step interval', value: 50, step: 10, min: 0, max: 100 }),
      code: \`import { Slider } from "@/components/sarahui/slider";

export function SliderStepped() {
  return <Slider label="Step interval" defaultValue={50} step={10} />;
}\`
    }
  ],

  // 106. Tabs`
);

// 3. Tabs
content = content.replace(
  /\/\/ 106\. Tabs\r?\n\s+Tabs:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 107\. Breadcrumb/,
  `// 106. Tabs
  Tabs: [
    {
      title: 'Horizontal Tabs',
      description: 'Accessible tab switcher with keyboard arrow navigation.',
      preview: () => U.Tabs({
        id: 'tabs-horizontal',
        label: 'Workspace tabs',
        items: [
          { label: 'Overview', content: html\`<div class="tab-example"><div><strong>Overview Tab</strong><p>Workspace summary and metrics.</p></div></div>\` },
          { label: 'Activity', content: html\`<div class="tab-example"><div><strong>Activity Tab</strong><p>Recent changes and team logs.</p></div></div>\` }
        ]
      }),
      code: \`import { Tabs, TabList, TabTrigger, TabContent } from "@/components/sarahui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <TabTrigger value="overview">Overview</TabTrigger>
        <TabTrigger value="activity">Activity</TabTrigger>
      </TabList>
      <TabContent value="overview">Overview Content</TabContent>
      <TabContent value="activity">Activity Content</TabContent>
    </Tabs>
  );
}\`
    },
    {
      title: 'Segmented Pill Tabs',
      description: 'Pill styled tab bar for high-contrast view switching.',
      preview: () => U.Tabs({
        id: 'tabs-pill',
        label: 'Navigation pills',
        variant: 'pill',
        items: [
          { label: 'All Projects', content: html\`<p class="s-small s-muted">Listing 120 total projects.</p>\` },
          { label: 'Archived', content: html\`<p class="s-small s-muted">No archived projects found.</p>\` }
        ]
      }),
      code: \`import { Tabs } from "@/components/sarahui/tabs";

export function TabsPill() {
  return <Tabs variant="pill" defaultValue="preview" />;
}\`
    }
  ],

  // 107. Breadcrumb`
);

// 4. Menu
content = content.replace(
  /\/\/ 110\. Menu\r?\n\s+Menu:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 111\. CommandPalette/,
  `// 110. Menu
  Menu: [
    {
      title: 'Contextual Action Menu',
      description: 'Floating dropdown menu with action items and keyboard navigation.',
      preview: () => U.Menu({
        id: 'menu-demo-preview',
        label: 'Project actions',
        items: [
          { label: 'View workspace', icon: 'folder', value: 'view' },
          { label: 'Copy page link', icon: 'link', value: 'copy' }
        ]
      }),
      code: \`import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuDemo() {
  return (
    <Menu trigger="Project actions">
      <MenuItem icon="folder">View workspace</MenuItem>
      <MenuItem icon="link">Copy page link</MenuItem>
    </Menu>
  );
}\`
    },
    {
      title: 'Destructive Menu Item',
      description: 'Menu highlighting danger actions in semantic red.',
      preview: () => U.Menu({
        id: 'menu-danger-preview',
        label: 'Options',
        items: [
          { label: 'Edit details', icon: 'settings', value: 'edit' },
          { label: 'Delete record', icon: 'trash', value: 'del', danger: true }
        ]
      }),
      code: \`import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuDanger() {
  return (
    <Menu trigger="Options">
      <MenuItem icon="trash" danger>Delete record</MenuItem>
    </Menu>
  );
}\`
    }
  ],

  // 111. CommandPalette`
);

// 5. Tooltip
content = content.replace(
  /\/\/ 114\. Tooltip\r?\n\s+Tooltip:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 115\. Toast/,
  `// 114. Tooltip
  Tooltip: [
    {
      title: 'Supplementary Context',
      description: 'Appears on hover or keyboard focus; dismisses on Escape.',
      preview: () => html\`<div class="s-row"><span class="s-small">Hover over the badge:</span>\${U.Tooltip({ id: 'tip-ctx', label: 'About tokens', text: 'One change. A consistent system.' })}</div>\`,
      code: \`import { Tooltip } from "@/components/sarahui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip text="One change. A consistent system.">
      <button>About tokens</button>
    </Tooltip>
  );
}\`
    },
    {
      title: 'Keyboard Shortcut Tooltip',
      description: 'Displays contextual hotkey shortcuts in the tooltip popover.',
      preview: () => html\`<div class="s-row"><span class="s-small">Search hotkey:</span>\${U.Tooltip({ id: 'tip-shortcut', label: 'Search palette', text: 'Press ⌘K to open fast finder.' })}</div>\`,
      code: \`import { Tooltip } from "@/components/sarahui/tooltip";

export function TooltipShortcut() {
  return (
    <Tooltip text="Search library" shortcut="⌘K">
      <button>Search</button>
    </Tooltip>
  );
}\`
    }
  ],

  // 115. Toast`
);

// 6. Drawer
content = content.replace(
  /\/\/ 116\. Drawer\r?\n\s+Drawer:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 117\. Popover/,
  `// 116. Drawer
  Drawer: [
    {
      title: 'Slide-over Drawer Modal',
      description: 'Sliding modal drawer extending from viewport edge with backdrop blur.',
      preview: () => html\`<div class="demo-wrap">\${Button({ label: 'Open Right Drawer', icon: 'menu', attrs: { 'data-s-dialog-open': 'demo-right-drawer' } })}\${U.Drawer({ id: 'demo-right-drawer', title: 'Project Drawer', description: 'Sliding right sheet with native focus trapping.', children: html\`<p class="s-small s-muted">Drawer body panel.</p>\` })}</div>\`,
      code: \`import { Drawer } from "@/components/sarahui/drawer";

export function DrawerDemo() {
  return (
    <Drawer title="Project Drawer" trigger="Open Drawer">
      <p>Drawer content panel with native focus containment.</p>
    </Drawer>
  );
}\`
    },
    {
      title: 'Slide from Bottom',
      description: 'Mobile sheet style drawer sliding upward from screen bottom.',
      preview: () => html\`<div class="demo-wrap">\${Button({ label: 'Open Bottom Sheet', variant: 'outline', attrs: { 'data-s-dialog-open': 'demo-bottom-drawer' } })}\${U.Drawer({ id: 'demo-bottom-drawer', title: 'Mobile Actions', position: 'bottom', children: html\`<p class="s-small s-muted">Bottom sheet action list.</p>\` })}</div>\`,
      code: \`import { Drawer } from "@/components/sarahui/drawer";

export function DrawerBottom() {
  return <Drawer position="bottom" title="Mobile Actions" />;
}\`
    }
  ],

  // 117. Popover`
);

// 7. Popover
content = content.replace(
  /\/\/ 117\. Popover\r?\n\s+Popover:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 118\. Sheet/,
  `// 117. Popover
  Popover: [
    {
      title: 'Anchored Floating Popover',
      description: 'Contextual popover anchored to a trigger button with dismissal.',
      preview: () => U.Popover({
        id: 'popover-var-0',
        trigger: Button({ label: 'View options', variant: 'outline', size: 'sm' }),
        content: html\`<div style="padding:8px;"><h4 style="margin:0 0 4px;font-size:14px;">Options</h4><p class="s-small s-muted" style="margin:0;">Adjust contextual preferences.</p></div>\`
      }),
      code: \`import { Popover } from "@/components/sarahui/popover";

export function PopoverDemo() {
  return (
    <Popover trigger="View options">
      <div className="p-4">
        <h4>Options</h4>
        <p>Adjust contextual preferences.</p>
      </div>
    </Popover>
  );
}\`
    },
    {
      title: 'Form Popover',
      description: 'Popover housing quick inline inputs and action buttons.',
      preview: () => U.Popover({
        id: 'popover-var-1',
        trigger: Button({ label: 'Edit Name', size: 'sm' }),
        content: html\`<div style="padding:8px;display:flex;flex-direction:column;gap:8px;"><span class="s-small" style="font-weight:600;">Rename item</span>\${Input({ id: 'popover-rename', label: 'New title', attrs: { placeholder: 'Enter title...' } })}\${Button({ label: 'Save changes', size: 'sm', variant: 'primary' })}</div>\`
      }),
      code: \`import { Popover } from "@/components/sarahui/popover";

export function PopoverForm() {
  return (
    <Popover trigger="Edit Name">
      <input placeholder="Enter new name" />
    </Popover>
  );
}\`
    }
  ],

  // 118. Sheet`
);

// 8. Sheet
content = content.replace(
  /\/\/ 118\. Sheet\r?\n\s+Sheet:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 119\. ContextMenu/,
  `// 118. Sheet
  Sheet: [
    {
      title: 'Slide-Out Sheet Drawer',
      description: 'Sliding modal sheet panel from right, left, top, or bottom edge.',
      preview: () => html\`<div class="demo-wrap">\${Button({ label: 'Open Navigation Sheet', icon: 'menu', attrs: { 'data-s-dialog-open': 'demo-sheet-var-0' } })}\${U.Sheet({ id: 'demo-sheet-var-0', title: 'Quick Navigation', description: 'Slide-over panel for workspace navigation.', children: html\`<div class="s-stack"><a href="#overview" class="s-button s-button--ghost s-button--md">Overview</a><a href="#components" class="s-button s-button--ghost s-button--md">Components</a></div>\` })}</div>\`,
      code: \`import { Sheet } from "@/components/sarahui/sheet";

export function SheetDemo() {
  return (
    <Sheet id="app-sheet" title="Quick Navigation" position="right">
      <p>Sheet body content.</p>
    </Sheet>
  );
}\`
    },
    {
      title: 'Left Navigation Sheet',
      description: 'Mobile navigation drawer sliding in from the left edge.',
      preview: () => html\`<div class="demo-wrap">\${Button({ label: 'Open Left Sheet', variant: 'outline', attrs: { 'data-s-dialog-open': 'demo-sheet-var-left' } })}\${U.Sheet({ id: 'demo-sheet-var-left', position: 'left', title: 'Main Navigation', children: html\`<div class="s-stack"><span class="s-small s-muted">Left navigation drawer</span></div>\` })}</div>\`,
      code: \`import { Sheet } from "@/components/sarahui/sheet";

export function SheetLeft() {
  return <Sheet position="left" title="Main Navigation" />;
}\`
    }
  ],

  // 119. ContextMenu`
);

// 9. ContextMenu
content = content.replace(
  /\/\/ 119\. ContextMenu\r?\n\s+ContextMenu:\s+\[[\s\S]*?\],\r?\n\s+\/\/ 120\. HoverCard/,
  `// 119. ContextMenu
  ContextMenu: [
    {
      title: 'Right-Click Context Menu',
      description: 'Contextual floating action menu positioned at cursor coordinates.',
      preview: () => U.ContextMenu({
        id: 'demo-ctx-0',
        trigger: html\`<div style="padding:24px;text-align:center;border:1px dashed var(--s-border-default);border-radius:10px;background:var(--s-bg-surface);"><p style="margin:0;font-weight:500;">Right-click in this box</p><span class="s-small s-muted">Opens contextual menu</span></div>\`,
        items: [{ label: 'Copy link', icon: 'link' }, { label: 'Inspect', icon: 'spark' }]
      }),
      code: \`import { ContextMenu } from "@/components/sarahui/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu trigger={<div>Right click me</div>}>
      <item>Copy</item>
      <item>Inspect</item>
    </ContextMenu>
  );
}\`
    },
    {
      title: 'Menu with Danger Action',
      description: 'Context menu including a highlighted delete action.',
      preview: () => U.ContextMenu({
        id: 'demo-ctx-1',
        trigger: html\`<div style="padding:24px;text-align:center;border:1px dashed var(--s-border-default);border-radius:10px;background:var(--s-bg-surface);"><p style="margin:0;font-weight:500;">Right-click for danger options</p></div>\`,
        items: [{ label: 'Duplicate item', icon: 'copy' }, { label: 'Delete item', icon: 'trash', danger: true }]
      }),
      code: \`import { ContextMenu } from "@/components/sarahui/context-menu";

export function ContextMenuDanger() {
  return (
    <ContextMenu trigger={<div>Right click item</div>}>
      <item danger>Delete Item</item>
    </ContextMenu>
  );
}\`
    }
  ],

  // 120. HoverCard`
);

fs.writeFileSync('apps/docs/catalog.mjs', content, 'utf8');
console.log('Successfully patched all 9 component variants in catalog.mjs!');

