import fs from 'node:fs';

const file = 'apps/docs/registry-data.mjs';
let content = fs.readFileSync(file, 'utf8');

const patches = {
  AnimatedSubscribeButton: {
    props: [{
      title: 'AnimatedSubscribeButton Props',
      rows: [
        { prop: 'initialText', type: 'string', defaultVal: "'Subscribe'", description: 'Label shown before the user subscribes' },
        { prop: 'subscribedText', type: 'string', defaultVal: "'Subscribed'", description: 'Label shown after the subscribed state is reached' },
        { prop: 'isSubscribed', type: 'boolean', defaultVal: 'false', description: 'Initial pressed/subscribed state (reflected via aria-pressed)' },
        { prop: 'attrs', type: 'Record<string, any>', defaultVal: '{}', description: 'Extra HTML attributes forwarded to the button' }
      ]
    }],
    demoTsx: `import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export default function AnimatedSubscribeButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <AnimatedSubscribeButton initialText="Subscribe" subscribedText="Subscribed" />
      <AnimatedSubscribeButton
        initialText="Follow updates"
        subscribedText="Following"
        isSubscribed={true}
        attrs={{ "aria-describedby": "subscribe-hint" }}
      />
      <span id="subscribe-hint" className="text-xs text-muted-foreground">Toggle to receive release notes.</span>
    </div>
  );
}`
  },
  Collapsible: {
    props: [{
      title: 'Collapsible Props',
      rows: [
        { prop: 'title', type: 'string', defaultVal: "'Can I use this with any framework?'", description: 'Summary label rendered in the disclosure trigger' },
        { prop: 'content', type: 'string', defaultVal: "''", description: 'Body text revealed when the disclosure is open' },
        { prop: 'open', type: 'boolean', defaultVal: 'false', description: 'Renders the disclosure expanded by default' },
        { prop: 'attrs', type: 'Record<string, any>', defaultVal: '{}', description: 'Extra HTML attributes forwarded to the root element' }
      ]
    }]
  }
};

function indentJson(value, indent) {
  return JSON.stringify(value, null, 2).split('\n').map((l, i) => (i === 0 ? l : indent + l)).join('\n');
}

for (const [name, patch] of Object.entries(patches)) {
  const header = `\n  "${name}": {`;
  const start = content.indexOf(header);
  if (start === -1) throw new Error(`${name} not found`);
  const next = content.indexOf('\n  "', start + header.length);
  const end = next === -1 ? content.indexOf('\n};', start) : next;
  let block = content.slice(start, end);
  if (patch.props) {
    const p0 = block.indexOf('    "props": [');
    const p1 = block.indexOf('    "demoTsx":');
    if (p0 === -1 || p1 === -1) throw new Error(`${name} props/demo markers missing`);
    block = block.slice(0, p0) + `    "props": ${indentJson(patch.props, '    ')},\n` + block.slice(p1);
  }
  if (patch.demoTsx) {
    const d0 = block.indexOf('    "demoTsx":');
    const d1 = block.indexOf('\n', d0);
    block = block.slice(0, d0) + `    "demoTsx": ${JSON.stringify(patch.demoTsx)},` + block.slice(d1);
  }
  content = content.slice(0, start) + block + content.slice(end);
  console.log('patched', name);
}
fs.writeFileSync(file, content, 'utf8');
