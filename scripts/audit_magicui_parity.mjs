import fs from 'node:fs';
import path from 'node:path';

const magicDir = 'read_ui/magicui/apps/www';
const magicComponentsDir = path.join(magicDir, 'registry/magicui');
const magicExamplesDir = path.join(magicDir, 'registry/example');
const magicDocsDir = path.join(magicDir, 'content/docs/components');

const mdxFiles = fs.readdirSync(magicDocsDir).filter(f => f.endsWith('.mdx'));
const components = fs.readdirSync(magicComponentsDir).filter(f => f.endsWith('.tsx'));
const examples = fs.readdirSync(magicExamplesDir).filter(f => f.endsWith('.tsx'));

console.log(`Found ${components.length} components, ${examples.length} examples, ${mdxFiles.length} docs.`);

const results = [];

for (const mdx of mdxFiles) {
  const content = fs.readFileSync(path.join(magicDocsDir, mdx), 'utf8');
  const slug = mdx.replace('.mdx', '');
  
  const title = (content.match(/title:\s*(.+)/) || [])[1] || '';
  const desc = (content.match(/description:\s*(.+)/) || [])[1] || '';
  const mainDemo = (content.match(/<ComponentPreview\s+name=["']([^"']+)["']/) || [])[1] || '';
  
  // Find all examples
  const exampleMatches = [];
  const lines = content.split('\n');
  let inExamples = false;
  let currentH3 = '';
  let currentDesc = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## Examples')) {
      inExamples = true;
      continue;
    }
    if (inExamples && line.startsWith('## ') && !line.startsWith('### ')) {
      inExamples = false;
      continue;
    }
    if (inExamples) {
      if (line.startsWith('### ')) {
        currentH3 = line.replace('### ', '').trim();
        currentDesc = '';
      } else if (line.startsWith('<ComponentPreview')) {
        const demoName = (line.match(/name=["']([^"']+)["']/) || [])[1];
        if (demoName) {
          exampleMatches.push({
            title: currentH3 || 'Example',
            description: currentDesc,
            demoName
          });
        }
      } else if (line && !line.startsWith('<') && !line.startsWith('#')) {
        currentDesc = line;
      }
    }
  }

  results.push({
    slug,
    title,
    desc,
    mainDemo,
    examples: exampleMatches
  });
}

console.log(`Parsed ${results.length} docs with ${results.reduce((s, r) => s + r.examples.length, 0)} examples.`);
fs.writeFileSync('scripts/magicui_audit.json', JSON.stringify(results, null, 2));
console.log('Saved audit to scripts/magicui_audit.json');

