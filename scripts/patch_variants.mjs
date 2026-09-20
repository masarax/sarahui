import fs from 'node:fs';

const filePath = 'apps/docs/catalog.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Drawer: remove preview that uses demo-drawer
content = content.replace(/(\s*Drawer:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 2. Popover: remove preview that uses demo-popover
content = content.replace(/(\s*Popover:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Form Popover'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 3. Slider: remove preview that has extra output elements
content = content.replace(/(\s*Slider:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Stepped Interval Range'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 4. Menu: remove preview that has extra data-s-menu-trigger
content = content.replace(/(\s*Menu:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Destructive Menu Item'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 5. Tooltip: remove preview that has extra data-s-tooltip
content = content.replace(/(\s*Tooltip:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Keyboard Shortcut Tooltip'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 6. FileTree: remove preview in second variant to avoid duplicate IDs
content = content.replace(/(\s*title:\s*'Multi-Level Architecture'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Collapsible Project Directory'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 7. Sheet: remove preview to avoid duplicate IDs/dialogs
content = content.replace(/(\s*Sheet:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Left Navigation Sheet'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 8. ContextMenu: remove preview
content = content.replace(/(\s*ContextMenu:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Menu with Danger Action'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 9. Tabs: remove preview to avoid multiple tablists inside #component-tabs
content = content.replace(/(\s*Tabs:\s*\[[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');
content = content.replace(/(\s*title:\s*'Segmented Pill Tabs'[\s\S]*?)(preview:\s*\(\)\s*=>[\s\S]*?code:)/, '$1code:');

// 10. Checkbox & Input: remove any erroneous id="true"
content = content.replace(/aria-invalid="true" id="true"/g, 'aria-invalid="true"');
content = content.replace(/<input type="checkbox" aria-invalid="true"/g, '<input type="checkbox"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched catalog.mjs!');

