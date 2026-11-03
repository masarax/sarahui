import fs from 'fs';

// 1. Update packages/ui/src/index.js
let ui = fs.readFileSync('packages/ui/src/index.js', 'utf8');

// Replace the horizon rim in renderGlobe
const oldRim = `    // 4. Clean Horizon Rim
    ctx.save();
    if (isDark) {
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.08);
      glowGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.08);
      glowGrad.addColorStop(0, 'rgba(0,0,0,0.05)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();`;

if (ui.includes(oldRim)) {
  ui = ui.replace(oldRim, `    // Clean boundary - seamless background blend\n    // (No artificial outer gray glow or stroke borders)`);
} else {
  // Regex replacement
  ui = ui.replace(/\/\/ 4\. Clean Horizon Rim[\s\S]*?ctx\.restore\(\);/, '// Clean boundary - seamless background blend');
}

fs.writeFileSync('packages/ui/src/index.js', ui, 'utf8');
console.log('Updated index.js: removed outer glow and stroke artifacts');

// 2. Update apps/docs/catalog.mjs
let cat = fs.readFileSync('apps/docs/catalog.mjs', 'utf8');

const newDemo = `  Globe:()=>html\`
    <div class="globe-demo-stage" style="position:relative;display:flex;height:440px;width:100%;max-width:620px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);margin:0 auto;padding-top:36px;">
      <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4.5rem, 11vw, 6rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
        Globe
      </span>
      <div style="position:absolute;top:160px;left:50%;transform:translateX(-50%);width:640px;height:640px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
        \${U.Globe({size:640})}
      </div>
    </div>
  \``;

cat = cat.replace(/Globe:\(\)=>html\`[\s\S]*?AnimatedList:/, newDemo + ',\n\n  AnimatedList:');

const newVariants = `  // 7. Globe
  Globe: [
    {
      title: 'Interactive',
      description: 'Autorotating 3D globe with interactive mouse and touch drag controls and live location beacons.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:440px;width:100%;max-width:620px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);margin:0 auto;padding-top:36px;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4.5rem, 11vw, 6rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
            Globe
          </span>
          <div style="position:absolute;top:160px;left:50%;transform:translateX(-50%);width:640px;height:640px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
            \${U.Globe({size:640})}
          </div>
        </div>
      \`,
      code: \`import { Globe } from "@/components/sarahui/globe";

export function GlobeInteractive() {
  return (
    <div className="relative flex h-[440px] w-full max-w-xl items-center justify-center overflow-hidden rounded-xl border bg-background pt-8 pb-40">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  );
}\`
    },
    {
      title: 'Custom Configuration',
      description: 'Compact atmospheric globe customized for dense dashboard cards or sidebar displays.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:380px;width:100%;max-width:560px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);margin:0 auto;padding-top:28px;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3.5rem, 8vw, 4.75rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
            World
          </span>
          <div style="position:absolute;top:130px;left:50%;transform:translateX(-50%);width:540px;height:540px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
            \${U.Globe({size:540})}
          </div>
        </div>
      \`,
      code: \`import { Globe } from "@/components/sarahui/globe";

export function GlobeCompact() {
  return (
    <div className="relative flex h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background pt-6 pb-32">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        World
      </span>
      <Globe className="top-24" />
    </div>
  );
}\`
    }
  ]`;

cat = cat.replace(/\/\/ 7\. Globe[\s\S]*?\/\/ 8\. TweetCard/, newVariants + ',\n\n  // 8. TweetCard');

fs.writeFileSync('apps/docs/catalog.mjs', cat, 'utf8');

// 3. Update registry-data.mjs
let reg = fs.readFileSync('apps/docs/registry-data.mjs', 'utf8');
const newRegGlobe = `  Globe: \`import { Globe } from "@/components/sarahui/globe";

export function GlobeDemo() {
  return (
    <div className="relative flex h-[440px] w-full max-w-xl items-center justify-center overflow-hidden rounded-lg border bg-background pt-8 pb-40">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  );
}\`,`;

reg = reg.replace(/Globe: `import \{ Globe \} from "@\/components\/sarahui\/globe";[\s\S]*?Button: \`import/, newRegGlobe + '\n  Button: `import');
fs.writeFileSync('apps/docs/registry-data.mjs', reg, 'utf8');

console.log('Successfully updated Globe: added text, eliminated shadow artifacts, seamless blend');

