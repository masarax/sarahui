import fs from 'node:fs';
import * as UI from '../../packages/ui/src/templates.js';
const props={};
for(const line of fs.readFileSync(new URL('../../docs/components.md',import.meta.url),'utf8').split('\n')){
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
  CommandPalette:'UI.html`${UI.Button({ label: "Search", icon: "search", attrs: { "data-s-dialog-open": "app-search" } })}${UI.CommandPalette({ id: "app-search", title: "Search your workspace", items: [{ label: "Projects", href: "#projects", icon: "folder" }, { label: "Settings", href: "#settings", icon: "settings" }] })}`'
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
export function properties(name){
  const parts=(props[name]||'').split(/(`[^`]+`)/g);
  return UI.html`<p class="api-properties">${parts.map(part=>part.startsWith('`')?UI.html`<code>${part.slice(1,-1)}</code>`:part)}</p>`;
}
export function recipe(name){
  const extra=name==='Toast'?"\ndocument.querySelector('#notify-button').addEventListener('click', () => {\n  UI.toast('Your changes are ready.', { title: 'Saved', tone: 'success' });\n});":name==='Pagination'?"\ndocument.addEventListener('sarah:pagechange', event => {\n  console.log('Render page', event.detail.page);\n});":name==='Menu'?"\ndocument.addEventListener('sarah:menuaction', event => {\n  console.log('Selected action', event.detail.value);\n});":'';
  return "import 'sarahui/css';\nimport * as UI from 'sarahui';\n\nconst component = "+expressions[name]+";\n\ndocument.querySelector('#app').innerHTML = UI.render(\n  UI.html`<main class=\"s-ui\">${component}</main>`\n);\nconst cleanup = UI.enhanceUI(document);"+extra+"\n// Call cleanup() when your application unmounts.";
}
export const usageNote=name=>notes[name]||'Use stable IDs for independently rendered fragments. Compose with native HTML and your application state.';
