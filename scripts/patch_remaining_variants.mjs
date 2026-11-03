import fs from 'fs';

let catalogCode = fs.readFileSync('./apps/docs/catalog.mjs', 'utf8');

const variantReplacements = {
  Dock: `    {
      title: 'Centered Bottom Dock',
      description: 'Default horizontal orientation centered at the bottom of the viewport with cosine distance magnifying zoom.',
      preview: () => html\`
        <nav class="s-dock" data-s-dock aria-label="Dock Preview">
          <button type="button" class="s-dock-icon" title="Home" aria-label="Home">\${Icon({name:'grid',size:18})}</button>
          <button type="button" class="s-dock-icon" title="Layers" aria-label="Layers">\${Icon({name:'layers',size:18})}</button>
          <button type="button" class="s-dock-icon" title="Palette" aria-label="Palette">\${Icon({name:'palette',size:18})}</button>
          <div class="s-dock-separator" aria-hidden="true"></div>
          <button type="button" class="s-dock-icon" title="Settings" aria-label="Settings">\${Icon({name:'settings',size:18})}</button>
        </nav>
      \`,
      code: \`import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemo() {
  return (
    <Dock direction="middle">
      <DockIcon><HomeIcon /></DockIcon>
      <DockIcon><LayersIcon /></DockIcon>
      <DockIcon><PaletteIcon /></DockIcon>
      <DockIcon><SettingsIcon /></DockIcon>
    </Dock>
  );
}\`
    },
    {
      title: 'Vertical Side Dock',
      description: 'Vertical orientation docked to the left or right edge of the screen for compact IDE and sidebar layouts.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);gap:8px;width:fit-content;box-shadow:none;">
          <button type="button" class="s-dock-icon" title="Code" aria-label="Code">\${Icon({name:'code',size:18})}</button>
          <button type="button" class="s-dock-icon" title="Terminal" aria-label="Terminal">\${Icon({name:'spark',size:18})}</button>
          <button type="button" class="s-dock-icon" title="Folder" aria-label="Folder">\${Icon({name:'folder',size:18})}</button>
        </div>
      \`,
      code: \`import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockVertical() {
  return (
    <Dock direction="left" className="h-[280px]">
      <DockIcon><CodeIcon /></DockIcon>
      <DockIcon><TerminalIcon /></DockIcon>
      <DockIcon><FolderIcon /></DockIcon>
    </Dock>
  );
}\`
    },
    {
      title: 'Media Player Dock',
      description: 'Audio & media controls with responsive magnification physics.',
      preview: () => html\`
        <nav class="s-dock" data-s-dock aria-label="Media Dock" style="background:var(--s-bg-canvas);">
          <button type="button" class="s-dock-icon" title="Rewind" aria-label="Rewind">\${Icon({name:'chevron',size:16,style:'transform:rotate(180deg);'})}</button>
          <button type="button" class="s-dock-icon" title="Play" aria-label="Play">\${Icon({name:'spark',size:18})}</button>
          <button type="button" class="s-dock-icon" title="Fast Forward" aria-label="Fast Forward">\${Icon({name:'chevron',size:16})}</button>
        </nav>
      \`,
      code: \`import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockMedia() {
  return (
    <Dock iconSize={48} iconMagnification={68}>
      <DockIcon><RewindIcon /></DockIcon>
      <DockIcon><PlayIcon /></DockIcon>
      <DockIcon><FastForwardIcon /></DockIcon>
    </Dock>
  );
}\`
    }`,

  FileTree: `    {
      title: 'Collapsible Project Directory',
      description: 'Hierarchical file tree with folder toggle disclosure and file icon mapping.',
      preview: () => html\`
        <div class="s-file-tree" data-s-file-tree style="width:100%;max-width:320px;padding:16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:13px;font-family:var(--s-font-mono);">
          <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 src</div>
          <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
            <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 components</div>
            <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
              <div style="display:flex;align-items:center;gap:6px;">📄 button.tsx</div>
              <div style="display:flex;align-items:center;gap:6px;">📄 dialog.tsx</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">📄 index.ts</div>
            <div style="display:flex;align-items:center;gap:6px;">📄 styles.css</div>
          </div>
        </div>
      \`,
      code: \`import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeDemo() {
  return (
    <FileTree>
      <Folder name="src">
        <Folder name="components">
          <File name="button.tsx" />
          <File name="dialog.tsx" />
        </Folder>
        <File name="index.ts" />
        <File name="styles.css" />
      </Folder>
    </FileTree>
  );
}\`
    },
    {
      title: 'Multi-Level Architecture',
      description: 'Complex nested multi-package workspace folder structure.',
      preview: () => html\`
        <div class="s-file-tree" data-s-file-tree style="width:100%;max-width:320px;padding:16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:13px;font-family:var(--s-font-mono);">
          <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 apps/web</div>
          <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
            <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 app/(dashboard)</div>
            <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
              <div style="display:flex;align-items:center;gap:6px;">📄 page.tsx</div>
              <div style="display:flex;align-items:center;gap:6px;">📄 layout.tsx</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">📄 next.config.mjs</div>
            <div style="display:flex;align-items:center;gap:6px;">📄 package.json</div>
          </div>
        </div>
      \`,
      code: \`import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeNested() {
  return (
    <FileTree>
      <Folder name="apps/web">
        <Folder name="app/(dashboard)">
          <File name="page.tsx" />
          <File name="layout.tsx" />
        </Folder>
        <File name="next.config.mjs" />
        <File name="package.json" />
      </Folder>
    </FileTree>
  );
}\`
    }`,

  Slider: `    {
      title: 'Continuous Value Slider',
      description: 'Standard smooth range track slider for audio volume or brightness.',
      preview: () => html\`
        <div style="width:100%;max-width:320px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;">
            <span>Master Volume</span>
            <span style="color:var(--s-text-muted);">75%</span>
          </div>
          <input type="range" class="s-slider" min="0" max="100" value="75" style="width:100%;accent-color:var(--s-action-primary);" />
        </div>
      \`,
      code: \`import { Slider } from "@/components/sarahui/slider";

export function SliderDemo() {
  return <Slider defaultValue={[75]} max={100} step={1} />;
}\`
    },
    {
      title: 'Stepped Interval Range',
      description: 'Discrete interval ticks for stepped quantization levels.',
      preview: () => html\`
        <div style="width:100%;max-width:320px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;">
            <span>Compression Level</span>
            <span style="color:var(--s-text-muted);">Level 3 of 5</span>
          </div>
          <input type="range" class="s-slider" min="1" max="5" step="1" value="3" style="width:100%;accent-color:var(--s-brand-blue,#5B3DF5);" />
        </div>
      \`,
      code: \`import { Slider } from "@/components/sarahui/slider";

export function SliderStepped() {
  return <Slider defaultValue={[3]} min={1} max={5} step={1} />;
}\`
    }`,

  Tabs: `    {
      title: 'Horizontal Tabs',
      description: 'Underline navigation tabs with smooth active border indicator.',
      preview: () => html\`
        <div class="s-tabs" data-s-tabs style="width:100%;max-width:400px;">
          <div role="tablist" style="display:flex;border-bottom:1px solid var(--s-border-default);gap:16px;">
            <button role="tab" aria-selected="true" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:600;border:none;background:none;color:var(--s-action-primary);border-bottom:2px solid var(--s-action-primary);">Account</button>
            <button role="tab" aria-selected="false" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:500;border:none;background:none;color:var(--s-text-muted);">Password</button>
            <button role="tab" aria-selected="false" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:500;border:none;background:none;color:var(--s-text-muted);">Notifications</button>
          </div>
          <div style="padding:16px 0;font-size:13.5px;color:var(--s-text-secondary);">Manage your profile details, contact preferences, and public bio.</div>
        </div>
      \`,
      code: \`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sarahui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
    </Tabs>
  );
}\`
    },
    {
      title: 'Segmented Pill Tabs',
      description: 'Enclosed pill background tab switcher for compact state toggling.',
      preview: () => html\`
        <div class="s-tabs s-tabs--pill" data-s-tabs style="width:100%;max-width:400px;">
          <div role="tablist" style="display:inline-flex;padding:4px;border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);gap:4px;">
            <button role="tab" aria-selected="true" style="padding:6px 14px;font-size:13px;font-weight:600;border-radius:7px;border:none;background:var(--s-bg-surface);color:var(--s-text-primary);box-shadow:none;">Monthly</button>
            <button role="tab" aria-selected="false" style="padding:6px 14px;font-size:13px;font-weight:500;border-radius:7px;border:none;background:none;color:var(--s-text-muted);">Quarterly</button>
            <button role="tab" aria-selected="false" style="padding:6px 14px;font-size:13px;font-weight:500;border-radius:7px;border:none;background:none;color:var(--s-text-muted);">Annual (Save 20%)</button>
          </div>
          <div style="padding:16px 0;font-size:13.5px;color:var(--s-text-secondary);">$29/month billed annually. Cancel anytime with no penalties.</div>
        </div>
      \`,
      code: \`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sarahui/tabs";

export function TabsPill() {
  return (
    <Tabs defaultValue="monthly" variant="pill">
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="annual">Annual</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}\`
    }`,

  Menu: `    {
      title: 'Contextual Action Menu',
      description: 'Standard popover action list with dividers and destructive actions.',
      preview: () => html\`
        <div class="s-menu-panel" style="width:200px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">✏️ Edit Profile</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📋 Duplicate View</button>
          <div style="height:1px;background:var(--s-border-default);margin:4px 0;"></div>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-status-danger-text,#EF4444);cursor:pointer;width:100%;text-align:left;">🗑️ Delete Item</button>
        </div>
      \`,
      code: \`import { Menu, MenuItem, MenuSeparator } from "@/components/sarahui/menu";

export function MenuDemo() {
  return (
    <Menu>
      <MenuItem>Edit Profile</MenuItem>
      <MenuItem>Duplicate View</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete Item</MenuItem>
    </Menu>
  );
}\`
    },
    {
      title: 'Destructive Menu Item',
      description: 'Export and sharing operations menu.',
      preview: () => html\`
        <div class="s-menu-panel" style="width:200px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">🔗 Copy Link</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📤 Export CSV</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📄 Export PDF</button>
        </div>
      \`,
      code: \`import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuExport() {
  return (
    <Menu>
      <MenuItem>Copy Link</MenuItem>
      <MenuItem>Export CSV</MenuItem>
      <MenuItem>Export PDF</MenuItem>
    </Menu>
  );
}\`
    }`,

  Tooltip: `    {
      title: 'Supplementary Context',
      description: 'Informational floating hint explaining interactive control behavior.',
      preview: () => html\`
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="padding:6px 12px;border-radius:8px;background:var(--s-text-primary);color:var(--s-bg-canvas);font-size:12px;font-weight:500;">Add to personal workspace</div>
          <button type="button" class="s-button s-button--secondary" style="font-size:13px;">Hover Trigger</button>
        </div>
      \`,
      code: \`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/sarahui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="secondary">Hover Trigger</Button></TooltipTrigger>
      <TooltipContent>Add to personal workspace</TooltipContent>
    </Tooltip>
  );
}\`
    },
    {
      title: 'Keyboard Shortcut Tooltip',
      description: 'Paired action tooltip displaying shortcut modifier key sequence.',
      preview: () => html\`
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;background:var(--s-text-primary);color:var(--s-bg-canvas);font-size:12px;font-weight:500;">
            <span>Command Palette</span>
            <kbd style="padding:1px 5px;border-radius:4px;background:rgba(255,255,255,0.2);font-size:11px;font-family:var(--s-font-mono);">⌘K</kbd>
          </div>
          <button type="button" class="s-button s-button--outline" style="font-size:13px;">Search Shortcut</button>
        </div>
      \`,
      code: \`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/sarahui/tooltip";

export function TooltipShortcut() {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="outline">Search Shortcut</Button></TooltipTrigger>
      <TooltipContent>Command Palette <kbd>⌘K</kbd></TooltipContent>
    </Tooltip>
  );
}\`
    }`,

  Drawer: `    {
      title: 'Slide-over Drawer Modal',
      description: 'Side overlay drawer panel for extended settings forms and inspector panels.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;max-width:400px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;right:0;width:65%;height:100%;border-left:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <h4 style="font-size:14px;font-weight:700;margin:0 0 4px;">Edit Profile</h4>
              <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Make changes to your account settings.</p>
            </div>
            <button type="button" class="s-button s-button--primary" style="width:100%;font-size:12.5px;">Save changes</button>
          </div>
        </div>
      \`,
      code: \`import { Drawer, DrawerTrigger, DrawerContent } from "@/components/sarahui/drawer";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild><Button>Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <h3>Edit Profile</h3>
      </DrawerContent>
    </Drawer>
  );
}\`
    },
    {
      title: 'Slide from Bottom',
      description: 'Bottom sheet modal for mobile actions.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;max-width:400px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;bottom:0;inset-x:0;height:65%;border-top:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="width:36px;height:4px;border-radius:2px;background:var(--s-border-strong);margin:0 auto 12px;"></div>
              <h4 style="font-size:14px;font-weight:700;margin:0 0 4px;">Payment Method</h4>
              <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Select default card for checkout.</p>
            </div>
            <button type="button" class="s-button s-button--primary" style="width:100%;font-size:12.5px;">Confirm Payment</button>
          </div>
        </div>
      \`,
      code: \`import { Drawer, DrawerContent } from "@/components/sarahui/drawer";

export function DrawerBottom() {
  return <Drawer side="bottom"><DrawerContent>Payment Method</DrawerContent></Drawer>;
}\`
    }`,

  Popover: `    {
      title: 'Anchored Floating Popover',
      description: 'Form panel floating popover anchored to a trigger.',
      preview: () => html\`
        <div class="s-popover-content" style="width:240px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:16px;display:flex;flex-direction:column;gap:10px;box-shadow:none;">
          <h4 style="font-size:14px;font-weight:600;margin:0;">Dimensions</h4>
          <div>
            <label style="font-size:12px;color:var(--s-text-muted);">Width</label>
            <input type="text" class="s-input" value="100%" style="width:100%;margin-top:2px;padding:4px 8px;font-size:12px;" />
          </div>
          <div>
            <label style="font-size:12px;color:var(--s-text-muted);">Height</label>
            <input type="text" class="s-input" value="240px" style="width:100%;margin-top:2px;padding:4px 8px;font-size:12px;" />
          </div>
        </div>
      \`,
      code: \`import { Popover, PopoverTrigger, PopoverContent } from "@/components/sarahui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Dimensions</Button></PopoverTrigger>
      <PopoverContent>Width & Height controls</PopoverContent>
    </Popover>
  );
}\`
    },
    {
      title: 'Form Popover',
      description: 'Status badge and quick profile summary popover.',
      preview: () => html\`
        <div class="s-popover-content" style="width:240px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:16px;display:flex;flex-direction:column;gap:8px;box-shadow:none;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#10B981;"></span>
            <strong style="font-size:13px;">Online & Available</strong>
          </div>
          <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Focus mode is disabled. Accepting pairing invites.</p>
        </div>
      \`,
      code: \`import { Popover, PopoverContent } from "@/components/sarahui/popover";

export function PopoverStatus() {
  return <Popover><PopoverContent>Online & Available</PopoverContent></Popover>;
}\`
    }`,

  Sheet: `    {
      title: 'Slide-Out Sheet Drawer',
      description: 'Right-side sheet panel for filters and multi-step data entry.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;max-width:380px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;right:0;width:70%;height:100%;border-left:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;">
            <h4 style="font-size:14px;font-weight:700;margin:0 0 6px;">Filters</h4>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;">
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" checked /> Design Tokens</label>
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" checked /> Components</label>
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" /> Layouts</label>
            </div>
          </div>
        </div>
      \`,
      code: \`import { Sheet, SheetTrigger, SheetContent } from "@/components/sarahui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild><Button>Open Filters</Button></SheetTrigger>
      <SheetContent side="right">Filters checklist</SheetContent>
    </Sheet>
  );
}\`
    },
    {
      title: 'Left Navigation Sheet',
      description: 'Left drawer sheet for mobile sidebar navigation.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;max-width:380px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;left:0;width:70%;height:100%;border-right:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;">
            <h4 style="font-size:14px;font-weight:700;margin:0 0 8px;">Navigation</h4>
            <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
              <a href="#overview" style="color:var(--s-text-primary);text-decoration:none;">Overview</a>
              <a href="#foundations" style="color:var(--s-text-primary);text-decoration:none;">Foundations</a>
              <a href="#components" style="color:var(--s-text-primary);text-decoration:none;">Components</a>
            </div>
          </div>
        </div>
      \`,
      code: \`import { Sheet, SheetContent } from "@/components/sarahui/sheet";

export function SheetLeft() {
  return <Sheet><SheetContent side="left">Navigation menu</SheetContent></Sheet>;
}\`
    }`,

  ContextMenu: `    {
      title: 'Right-Click Context Menu',
      description: 'Browser-style navigation and action context menu.',
      preview: () => html\`
        <div class="s-context-menu-panel" style="width:190px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Back</span><span style="color:var(--s-text-muted);">⌘[</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Forward</span><span style="color:var(--s-text-muted);">⌘]</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Reload</span><span style="color:var(--s-text-muted);">⌘R</span></button>
        </div>
      \`,
      code: \`import { ContextMenu, ContextMenuItem } from "@/components/sarahui/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenu>
  );
}\`
    },
    {
      title: 'Menu with Danger Action',
      description: 'File operations context menu with cut, copy, and delete.',
      preview: () => html\`
        <div class="s-context-menu-panel" style="width:190px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Cut</span><span style="color:var(--s-text-muted);">⌘X</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Copy</span><span style="color:var(--s-text-muted);">⌘C</span></button>
          <div style="height:1px;background:var(--s-border-default);margin:3px 0;"></div>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-status-danger-text,#EF4444);cursor:pointer;width:100%;"><span>Delete</span><span style="color:var(--s-status-danger-text,#EF4444);">⌫</span></button>
        </div>
      \`,
      code: \`import { ContextMenu, ContextMenuItem } from "@/components/sarahui/context-menu";

export function ContextMenuFile() {
  return (
    <ContextMenu>
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem destructive>Delete</ContextMenuItem>
    </ContextMenu>
  );
}\`
    }`
};

for (const [key, replacement] of Object.entries(variantReplacements)) {
  const searchPattern = new RegExp(`('${key}':\\s*\\[)[\\s\\S]*?(\\](?:,|\\n))`, 'g');
  if (searchPattern.test(catalogCode)) {
    catalogCode = catalogCode.replace(searchPattern, `$1\n${replacement}\n  $2`);
    console.log(`Successfully replaced variants for ${key}!`);
  } else {
    // try matching without quotes
    const searchPattern2 = new RegExp(`(${key}:\\s*\\[)[\\s\\S]*?(\\](?:,|\\n))`, 'g');
    if (searchPattern2.test(catalogCode)) {
      catalogCode = catalogCode.replace(searchPattern2, `$1\n${replacement}\n  $2`);
      console.log(`Successfully replaced variants for ${key}!`);
    } else {
      console.log(`Could not find variant entry for ${key}`);
    }
  }
}

fs.writeFileSync('./apps/docs/catalog.mjs', catalogCode, 'utf8');
console.log('All remaining variant patches applied!');

