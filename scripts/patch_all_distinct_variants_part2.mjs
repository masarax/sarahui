import fs from 'fs';

let content = fs.readFileSync('apps/docs/catalog.mjs', 'utf8');

const variantPatchesPart2 = {
  // 31. VideoText
  VideoText: `  VideoText: [
    {
      title: 'Video Masked Headline',
      description: 'Bold headline typography masked with an interactive ambient looping video stream.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:260px;text-align:center;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          \${U.VideoText({text:'CREATIVE',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      \`,
      code: \`import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextDemo() {
  return <VideoText text="CREATIVE" videoSrc="/ambient.mp4" />;
}\`
    },
    {
      title: 'Condensed Font Mask',
      description: 'Ultra-bold condensed font masked over vibrant dynamic video motion.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:260px;text-align:center;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          \${U.VideoText({text:'FUTURE',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4',fontSize:'4.5rem'})}
        </div>
      \`,
      code: \`import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextFuture() {
  return <VideoText text="FUTURE" videoSrc="/future.mp4" fontSize="4.5rem" />;
}\`
    }
  ],`,

  // 35. TextReveal
  TextReveal: `  TextReveal: [
    {
      title: 'Gradient Mask Text Reveal',
      description: 'Scroll-linked progressive word opacity reveal highlighting narrative copy.',
      preview: () => html\`
        <div style="padding:32px 24px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.TextReveal({text:'sarahUI brings pure CSS tokens and native browser primitives together in perfect harmony.'})}
        </div>
      \`,
      code: \`import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealDemo() {
  return (
    <TextReveal text="sarahUI brings pure CSS tokens and native browser primitives together in perfect harmony." />
  );
}\`
    },
    {
      title: 'Instant View Entrance',
      description: 'Fast entrance reveal for hero section statements and keynotes.',
      preview: () => html\`
        <div style="padding:32px 24px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.TextReveal({text:'Design without compromise. 120 components crafted for modern web experiences.'})}
        </div>
      \`,
      code: \`import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealHero() {
  return (
    <TextReveal text="Design without compromise. 120 components crafted for modern web experiences." />
  );
}\`
    }
  ],`,

  // 36. DiaTextReveal
  DiaTextReveal: `  DiaTextReveal: [
    {
      title: 'Diagonal Mask Sweep Reveal',
      description: 'Dynamic 45-degree angle diagonal mask sweep revealing typography.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.DiaTextReveal({text:'Uncompromising Quality'})}
        </div>
      \`,
      code: \`import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealDemo() {
  return <DiaTextReveal text="Uncompromising Quality" />;
}\`
    },
    {
      title: 'Custom Gradient',
      description: 'Diagonal sweep reveal combined with electric cyan to rose gradient.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.DiaTextReveal({text:'Next Level Motion',gradient:'linear-gradient(135deg, #00E5FF, #FF0055)'})}
        </div>
      \`,
      code: \`import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealGradient() {
  return <DiaTextReveal text="Next Level Motion" gradient="linear-gradient(135deg, #00E5FF, #FF0055)" />;
}\`
    }
  ],`,

  // 37. HyperText
  HyperText: `  HyperText: [
    {
      title: 'Scrambling Character Decoding',
      description: 'Interactive character scrambling deciphering on hover and interaction.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.HyperText({text:'HACK THE MATRIX',duration:800})}
        </div>
      \`,
      code: \`import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextDemo() {
  return <HyperText text="HACK THE MATRIX" duration={800} />;
}\`
    },
    {
      title: 'Auto-Decoding Entrance',
      description: 'Decodes system readiness status string on viewport entrance.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.HyperText({text:'SARAH_UI_SYSTEM_READY',duration:1200})}
        </div>
      \`,
      code: \`import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextSystem() {
  return <HyperText text="SARAH_UI_SYSTEM_READY" duration={1200} />;
}\`
    }
  ],`,

  // 39. ScrollBasedVelocity
  ScrollBasedVelocity: `  ScrollBasedVelocity: [
    {
      title: 'Scroll-Accelerated Velocity Marquee',
      description: 'Multi-line typography ticker that accelerates with user page scroll speed.',
      preview: () => html\`
        <div style="position:relative;height:260px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          \${U.ScrollBasedVelocity({text:'SARAHUI • ACCESSIBLE • LIGHTWEIGHT • ZERO RUNTIME DEPS •',defaultVelocity:3})}
        </div>
      \`,
      code: \`import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollBasedVelocityDemo() {
  return <ScrollBasedVelocity text="SARAHUI • ACCESSIBLE • LIGHTWEIGHT • ZERO RUNTIME DEPS •" defaultVelocity={3} />;
}\`
    },
    {
      title: 'Reverse Direction Velocity',
      description: 'Opposite velocity scrolling marquee ticker accelerating dynamically.',
      preview: () => html\`
        <div style="position:relative;height:260px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          \${U.ScrollBasedVelocity({text:'• REVERSE VELOCITY • ACCELERATED SCROLL • SMOOTH PHYSICS •',defaultVelocity:-4})}
        </div>
      \`,
      code: \`import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollBasedVelocityReverse() {
  return <ScrollBasedVelocity text="• REVERSE VELOCITY • ACCELERATED SCROLL • SMOOTH PHYSICS •" defaultVelocity={-4} />;
}\`
    }
  ],`,

  // 40. SparklesText
  SparklesText: `  SparklesText: [
    {
      title: 'Glittering Star Sparkles',
      description: 'Twinkling golden star sparkles animating dynamically around headline text.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.SparklesText({text:'Magical Components',sparklesCount:12})}
        </div>
      \`,
      code: \`import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextDemo() {
  return <SparklesText text="Magical Components" />;
}\`
    },
    {
      title: 'Golden Sparkles',
      description: 'Warm golden sparkle stars framing premium design system features.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.SparklesText({text:'Premium Design System',sparklesCount:16,colors:{first:'#FFD700',second:'#FFA500'}})}
        </div>
      \`,
      code: \`import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextGold() {
  return <SparklesText text="Premium Design System" colors={{ first: "#FFD700", second: "#FFA500" }} />;
}\`
    }
  ],`,

  // 42. SpinningText
  SpinningText: `  SpinningText: [
    {
      title: 'Circular Orbiting Typography',
      description: 'Continuous circular orbiting text banner spinning around a central anchor icon.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:280px;">
          \${U.SpinningText({text:'• SARAHUI • MODERN DESIGN • ZERO DEPS ',radius:64,duration:10})}
        </div>
      \`,
      code: \`import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextDemo() {
  return <SpinningText radius={64} duration={10}>• SARAHUI • MODERN DESIGN • ZERO DEPS </SpinningText>;
}\`
    },
    {
      title: 'Reverse',
      description: 'Counter-clockwise rotating typography with wider orbital radius.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:280px;">
          \${U.SpinningText({text:'• REVERSE ROTATION • 60FPS MOTION ',radius:80,duration:8,reverse:true})}
        </div>
      \`,
      code: \`import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextReverse() {
  return <SpinningText radius={80} duration={8} reverse>• REVERSE ROTATION • 60FPS MOTION </SpinningText>;
}\`
    }
  ],`,

  // 43. Highlighter
  Highlighter: `  Highlighter: [
    {
      title: 'Hand-Drawn Marker Highlighter',
      description: 'Natural hand-drawn marker highlight stroke animating beneath text.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.Highlighter({text:'Thoughtful Design Systems',color:'rgba(91,61,245,0.35)'})}
        </div>
      \`,
      code: \`import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterDemo() {
  return <Highlighter color="rgba(91,61,245,0.35)">Thoughtful Design Systems</Highlighter>;
}\`
    },
    {
      title: 'Underline Stroke',
      description: 'Double underline marker stroke drawing under key takeaway terms.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.Highlighter({text:'Underline Stroke Accent',color:'rgba(255,46,147,0.4)',type:'underline'})}
        </div>
      \`,
      code: \`import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterUnderline() {
  return <Highlighter type="underline" color="rgba(255,46,147,0.4)">Underline Stroke Accent</Highlighter>;
}\`
    }
  ],`,

  // 44. Text3DFlip
  Text3DFlip: `  Text3DFlip: [
    {
      title: '3D Perspective Word Flip',
      description: 'Isometric 3D perspective flip between dynamic feature adjectives.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.Text3DFlip({words:['Modern', 'Accessible', 'Lightweight', 'Powerful']})}
        </div>
      \`,
      code: \`import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipDemo() {
  return <Text3DFlip words={["Modern", "Accessible", "Lightweight", "Powerful"]} />;
}\`
    },
    {
      title: 'Stagger from center',
      description: 'Word transitions flipping with accelerated interval timing.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.Text3DFlip({words:['Faster', 'Smoother', 'Cleaner', 'Better'],delay:1600})}
        </div>
      \`,
      code: \`import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipCenter() {
  return <Text3DFlip words={["Faster", "Smoother", "Cleaner", "Better"]} delay={1600} />;
}\`
    }
  ],`,

  // 51. FlickeringGrid
  FlickeringGrid: `  FlickeringGrid: [
    {
      title: 'Interactive Canvas Matrix',
      description: 'Randomized square opacity flicker across a high-density grid background.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.FlickeringGrid({squareSize:4,gridGap:6,flickerChance:0.3})}
        </div>
      \`,
      code: \`import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg border">
      <FlickeringGrid squareSize={4} gridGap={6} flickerChance={0.3} />
    </div>
  );
}\`
    },
    {
      title: 'Rounded',
      description: 'Cyan tinted high-density matrix with larger squares and rapid flicker rate.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.FlickeringGrid({squareSize:6,gridGap:8,flickerChance:0.45,color:'#00E5FF'})}
        </div>
      \`,
      code: \`import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridRounded() {
  return <FlickeringGrid squareSize={6} gridGap={8} flickerChance={0.45} color="#00E5FF" />;
}\`
    }
  ],`,

  // 53. RetroGrid
  RetroGrid: `  RetroGrid: [
    {
      title: '3D Perspective Grid Floor',
      description: 'Synthwave 3D perspective infinite floor grid with horizon fade.',
      preview: () => html\`
        <div style="position:relative;height:360px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(to bottom, #ffd319, #ff2975, #8c1eff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3rem, 7vw, 4.5rem);line-height:1;font-weight:800;letter-spacing:-0.05em;">
            Retro Grid
          </span>
          \${U.RetroGrid({angle:65})}
        </div>
      \`,
      code: \`import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridDemo() {
  return (
    <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-xl border">
      <RetroGrid angle={65} />
    </div>
  );
}\`
    },
    {
      title: 'Inverted Horizon Ceiling',
      description: 'Inverted perspective grid ceiling projecting neon cyan horizon lines.',
      preview: () => html\`
        <div style="position:relative;height:360px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(to bottom, #00E5FF, #5B3DF5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3rem, 7vw, 4.5rem);line-height:1;font-weight:800;letter-spacing:-0.05em;">
            Inverted Horizon
          </span>
          \${U.RetroGrid({angle:115,opacity:0.65})}
        </div>
      \`,
      code: \`import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridInverted() {
  return <RetroGrid angle={115} opacity={0.65} />;
}\`
    }
  ],`,

  // 59. InteractiveGridPattern
  InteractiveGridPattern: `  InteractiveGridPattern: [
    {
      title: 'Cursor Proximity Illuminating Grid',
      description: 'Interactive grid pattern whose cells dynamically illuminate on cursor proximity.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.InteractiveGridPattern({width:36,height:36,numSquares:24})}
        </div>
      \`,
      code: \`import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <InteractiveGridPattern width={36} height={36} numSquares={24} />
    </div>
  );
}\`
    },
    {
      title: 'Colorful',
      description: 'Denser interactive grid featuring dashed outline stroke styling.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.InteractiveGridPattern({width:24,height:24,numSquares:48,strokeDasharray:'4 4'})}
        </div>
      \`,
      code: \`import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternColorful() {
  return <InteractiveGridPattern width={24} height={24} numSquares={48} strokeDasharray="4 4" />;
}\`
    }
  ],`,

  // 60. LightRays
  LightRays: `  LightRays: [
    {
      title: 'Volumetric God Rays Lighting',
      description: 'Atmospheric volumetric lighting beams radiating down from source coordinate.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          \${U.LightRays({intensity:0.7,count:5})}
        </div>
      \`,
      code: \`import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border bg-black">
      <LightRays intensity={0.7} count={5} />
    </div>
  );
}\`
    },
    {
      title: 'Subtle Ambient Beams',
      description: 'Soft swinging ambient lighting rays creating cinematic backdrop depth.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          \${U.LightRays({intensity:0.4,count:8,speed:12})}
        </div>
      \`,
      code: \`import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysAmbient() {
  return <LightRays intensity={0.4} count={8} speed={12} />;
}\`
    }
  ],`,

  // 62. Floating3DParticles
  Floating3DParticles: `  Floating3DParticles: [
    {
      title: '3D Perspective Floating Particles',
      description: 'Parallax floating particle field with perspective 3D depth.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.Floating3DParticles({count:40,size:3})}
        </div>
      \`,
      code: \`import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function Floating3DParticlesDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <Floating3DParticles count={40} size={3} />
    </div>
  );
}\`
    },
    {
      title: 'Plain Background',
      description: 'High-density electric cyan particle constellation.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.Floating3DParticles({count:60,size:2,color:'#00E5FF'})}
        </div>
      \`,
      code: \`import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function Floating3DParticlesCyan() {
  return <Floating3DParticles count={60} size={2} color="#00E5FF" />;
}\`
    }
  ],`,

  // 63. ShinyButton
  ShinyButton: `  ShinyButton: [
    {
      title: 'Continuous Sheen Action Button',
      description: 'Interactive button with continuous specular light reflection sweep.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.ShinyButton({label:'Get Unlimited Access'})}
        </div>
      \`,
      code: \`import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonDemo() {
  return <ShinyButton label="Get Unlimited Access" />;
}\`
    },
    {
      title: 'Compact Sheen Button',
      description: 'Compact action button designed for toolbars and cards.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.ShinyButton({label:'Quick Action',size:'sm'})}
        </div>
      \`,
      code: \`import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonCompact() {
  return <ShinyButton size="sm" label="Quick Action" />;
}\`
    }
  ],`,

  // 65. CodeComparison
  CodeComparison: `  CodeComparison: [
    {
      title: 'Side-by-Side Code Diff',
      description: 'Structured comparison container displaying before and after code side by side.',
      preview: () => U.CodeComparison({
        beforeCode: "const legacy = true;\\nconst slow = true;",
        afterCode: "import { Button } from 'sarahui';\\n// Fast & zero-deps!",
        beforeTitle: "Legacy Code",
        afterTitle: "sarahUI"
      }),
      code: \`import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode="const legacy = true;"
      afterCode="import { Button } from 'sarahui';"
      beforeTitle="Legacy Code"
      afterTitle="sarahUI"
    />
  );
}\`
    },
    {
      title: 'TypeScript vs JavaScript',
      description: 'Direct comparison demonstrating type safety definitions.',
      preview: () => U.CodeComparison({
        beforeCode: "function greet(user) {\\n  return 'Hello, ' + user.name;\\n}",
        afterCode: "interface User { name: string; }\\nfunction greet(user: User): string {\\n  return \`Hello, \${user.name}\`;\\n}",
        beforeTitle: "JavaScript",
        afterTitle: "TypeScript"
      }),
      code: \`import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonTypes() {
  return (
    <CodeComparison
      beforeCode="function greet(user) {}"
      afterCode="function greet(user: User): string {}"
      beforeTitle="JavaScript"
      afterTitle="TypeScript"
    />
  );
}\`
    }
  ],`,

  // 66. ScrollProgress
  ScrollProgress: `  ScrollProgress: [
    {
      title: 'Page Scroll Progress',
      description: 'Top pinned responsive indicator bar visualizing page reading progress.',
      preview: () => html\`
        <div style="position:relative;height:180px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;padding:24px;">
          \${U.ScrollProgress({position:'top',height:3})}
          <p class="s-small s-muted" style="margin-top:20px;">Top-pinned reading progress indicator bar.</p>
        </div>
      \`,
      code: \`import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressDemo() {
  return <ScrollProgress position="top" height={3} />;
}\`
    },
    {
      title: 'Bottom Pinned Bar',
      description: 'Bottom pinned progress indicator designed for documentation articles.',
      preview: () => html\`
        <div style="position:relative;height:180px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;padding:24px;">
          <p class="s-small s-muted">Bottom-pinned reading progress indicator bar.</p>
          \${U.ScrollProgress({position:'bottom',height:4})}
        </div>
      \`,
      code: \`import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressBottom() {
  return <ScrollProgress position="bottom" height={4} />;
}\`
    }
  ],`,

  // 67. NeonGradientCard
  NeonGradientCard: `  NeonGradientCard: [
    {
      title: 'High-Intensity Neon Glow',
      description: 'Card enclosed by a high-intensity dual-tone chromatic neon aura.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;padding:32px;">
          \${U.NeonGradientCard({
            title:'Pro Workspace',
            description:'Access 120 components with zero dependencies.',
            neonColors:{firstColor:'#5B3DF5',secondColor:'#FF2E93'}
          })}
        </div>
      \`,
      code: \`import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonGradientCardDemo() {
  return (
    <NeonGradientCard
      neonColors={{ firstColor: "#5B3DF5", secondColor: "#FF2E93" }}
    >
      <h3>Pro Workspace</h3>
    </NeonGradientCard>
  );
}\`
    },
    {
      title: 'Subtle Neon Glow',
      description: 'Gentle ambient cyber emerald glow border.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;padding:32px;">
          \${U.NeonGradientCard({
            title:'Production Edge',
            description:'Optimized for ultra-low latency CDN deployments.',
            neonColors:{firstColor:'#10B981',secondColor:'#00E5FF'},
            borderSize:1.5
          })}
        </div>
      \`,
      code: \`import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonGradientCardEmerald() {
  return (
    <NeonGradientCard
      neonColors={{ firstColor: "#10B981", secondColor: "#00E5FF" }}
      borderSize={1.5}
    >
      <h3>Production Edge</h3>
    </NeonGradientCard>
  );
}\`
    }
  ],`,

  // 68. ComicText
  ComicText: `  ComicText: [
    {
      title: 'Pop-Art Halftone Comic Text',
      description: 'Dynamic pop-art comic title with halftone texture and offset drop shadow.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.ComicText({text:'BOOM!',color:'#FF3366'})}
        </div>
      \`,
      code: \`import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextDemo() {
  return <ComicText text="BOOM!" color="#FF3366" />;
}\`
    },
    {
      title: 'Action Slogan',
      description: 'Vibrant yellow and red action slogan typography.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          \${U.ComicText({text:'SUPERCHARGED!',color:'#FFB800'})}
        </div>
      \`,
      code: \`import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextAction() {
  return <ComicText text="SUPERCHARGED!" color="#FFB800" />;
}\`
    }
  ],`,

  // 69. KineticText
  KineticText: `  KineticText: [
    {
      title: 'Kinetic Velocity Typography',
      description: 'Kinetic typography loop with velocity physics that responds to cursor drag.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          \${U.KineticText({text:'VELOCITY TYPOGRAPHY • ACCELERATED DESIGN • '})}
        </div>
      \`,
      code: \`import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextDemo() {
  return <KineticText text="VELOCITY TYPOGRAPHY • ACCELERATED DESIGN • " />;
}\`
    },
    {
      title: 'Bold Headline Loop',
      description: 'High speed bold headline ticker for product launch presentations.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          \${U.KineticText({text:'HIGH SPEED DESIGN • MAXIMUM QUALITY • ',speed:1.8})}
        </div>
      \`,
      code: \`import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextFast() {
  return <KineticText text="HIGH SPEED DESIGN • MAXIMUM QUALITY • " speed={1.8} />;
}\`
    }
  ],`,

  // 73. WarpBackground
  WarpBackground: `  WarpBackground: [
    {
      title: '3D Perspective Warp Tunnel',
      description: 'Hyperdrive warp tunnel background simulation with perspective depth travel.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          \${U.WarpBackground({perspective:120,gridColor:'rgba(91,61,245,0.45)'})}
        </div>
      \`,
      code: \`import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
      <WarpBackground perspective={120} />
    </div>
  );
}\`
    },
    {
      title: 'Deep Space Warp',
      description: 'High velocity cyan warp tunnel for futuristic web landing heroes.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          \${U.WarpBackground({perspective:80,gridColor:'rgba(0,229,255,0.35)',speed:2})}
        </div>
      \`,
      code: \`import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDeep() {
  return <WarpBackground perspective={80} gridColor="rgba(0,229,255,0.35)" speed={2} />;
}\`
    }
  ],`,

  // 75. AnimatedCircularProgressBar
  AnimatedCircularProgressBar: `  AnimatedCircularProgressBar: [
    {
      title: 'Radial Gauge Meter',
      description: 'Animated SVG circular progress gauge with dynamic value percentage.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;">
          \${U.AnimatedCircularProgressBar({value:72,max:100,gaugePrimaryColor:'#5B3DF5',gaugeSecondaryColor:'rgba(91,61,245,0.15)'})}
        </div>
      \`,
      code: \`import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarDemo() {
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={72}
      gaugePrimaryColor="#5B3DF5"
      gaugeSecondaryColor="rgba(91,61,245,0.15)"
    />
  );
}\`
    },
    {
      title: 'High-Value Target',
      description: 'Emerald radial meter highlighting near-complete milestones.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;">
          \${U.AnimatedCircularProgressBar({value:98,max:100,gaugePrimaryColor:'#10B981',gaugeSecondaryColor:'rgba(16,185,129,0.15)'})}
        </div>
      \`,
      code: \`import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarTarget() {
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={98}
      gaugePrimaryColor="#10B981"
      gaugeSecondaryColor="rgba(16,185,129,0.15)"
    />
  );
}\`
    }
  ],`,

  // 77. GlyphMatrix
  GlyphMatrix: `  GlyphMatrix: [
    {
      title: 'Cypher Character Matrix Rain',
      description: 'Falling digital rain cypher code streams rendered on performant canvas.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          \${U.GlyphMatrix({color:'#00FF66',speed:1})}
        </div>
      \`,
      code: \`import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
      <GlyphMatrix color="#00FF66" />
    </div>
  );
}\`
    },
    {
      title: 'Violet Cyber Stream',
      description: 'Electric violet digital glyph streams for high-tech aesthetic hero sections.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          \${U.GlyphMatrix({color:'#A855F7',speed:1.5})}
        </div>
      \`,
      code: \`import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixViolet() {
  return <GlyphMatrix color="#A855F7" speed={1.5} />;
}\`
    }
  ],`,

  // 109. NavItem
  NavItem: `  NavItem: [
    {
      title: 'With Badge Counter',
      description: 'Navigation link displaying active record counter badge.',
      preview: () => html\`
        <nav aria-label="Example navigation" class="demo-nav">
          \${U.NavItem({label:'Components',href:'#components',icon:'layers',badge:'120'})}
        </nav>
      \`,
      code: \`import { NavItem } from "@/components/sarahui/nav-item";

export function NavItemDemo() {
  return (
    <NavItem href="#components" icon="layers" badge="120">
      Components
    </NavItem>
  );
}\`
    },
    {
      title: 'Active Pill State',
      description: 'Prominent highlighted surface for current route navigation.',
      preview: () => html\`
        <nav aria-label="Example navigation" class="demo-nav">
          \${U.NavItem({active:true,label:'Active Route',icon:'grid'})}
        </nav>
      \`,
      code: \`import { NavItem } from "@/components/sarahui/nav-item";

export function NavItemActive() {
  return <NavItem active href="#overview" icon="grid">Overview</NavItem>;
}\`
    }
  ],`,

  // 111. CommandPalette
  CommandPalette: `  CommandPalette: [
    {
      title: 'Keyboard Shortcut Trigger',
      description: 'Fast fuzzy search palette opened with Cmd+K or Ctrl+K.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({label:'Open Command Palette (⌘K)',icon:'spark',attrs:{'data-s-dialog-open':'demo-cmd-p1'}})}
          \${U.CommandPalette({id:'demo-cmd-p1',placeholder:'Type a command or search documentation...'})}
        </div>
      \`,
      code: \`import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteDemo() {
  return (
    <CommandPalette shortcut="⌘K" placeholder="Search documentation..." />
  );
}\`
    },
    {
      title: 'Pre-Filtered Command Group',
      description: 'Command palette grouping actions into Navigation, Actions, and Settings.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({label:'Quick File Search (⌘P)',icon:'folder',variant:'outline',attrs:{'data-s-dialog-open':'demo-cmd-p2'}})}
          \${U.CommandPalette({
            id:'demo-cmd-p2',
            placeholder:'Search project files...',
            items:[
              {label:'src/index.ts',href:'#patterns'},
              {label:'src/styles.css',href:'#foundations'},
              {label:'package.json',href:'#start'}
            ]
          })}
        </div>
      \`,
      code: \`import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteGrouped() {
  return <CommandPalette groups={commandGroups} />;
}\`
    }
  ],`,

  // 112. Accordion
  Accordion: `  Accordion: [
    {
      title: 'Single Open Disclosure',
      description: 'Only allows one accordion item open at a time, smoothly collapsing previous items.',
      preview: () => U.Accordion({
        items: [
          { title: 'Can I customize source tokens?', content: 'Yes! Customize all tokens in src/styles.css and rebuild instantly.', open: true },
          { title: 'Does it support TypeScript?', content: '100% typed components with zero external dependencies.' },
          { title: 'Is it framework agnostic?', content: 'Yes! Works with React, Vue, Next.js, Vite, and plain vanilla HTML.' }
        ]
      }),
      code: \`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/sarahui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I customize source tokens?</AccordionTrigger>
        <AccordionContent>Yes! Customize all tokens in src/styles.css.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}\`
    },
    {
      title: 'Multiple Concurrent Expansion',
      description: 'Allows multiple accordion sections to remain expanded simultaneously.',
      preview: () => U.Accordion({
        items: [
          { title: 'Section 1: Architecture', content: 'Modern token-driven architecture with zero npm dependencies.', open: true },
          { title: 'Section 2: Accessibility', content: 'WCAG 2.1 AAA contrast compliant with full ARIA semantics.', open: true }
        ]
      }),
      code: \`import { Accordion } from "@/components/sarahui/accordion";

export function AccordionMultiple() {
  return <Accordion type="multiple" items={items} />;
}\`
    }
  ],`,

  // 120. Collapsible
  Collapsible: `  Collapsible: [
    {
      title: 'Smooth Expandable Section',
      description: 'Collapsible container with smooth expand and collapse transition and rotating chevron.',
      preview: () => html\`
        <div class="s-stack">
          \${U.Collapsible({title:'What is SarahUI?',content:'SarahUI is a modern, zero-dependency design system combining the best of MagicUI and Shadcn.',open:true})}
        </div>
      \`,
      code: \`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/sarahui/collapsible";

export function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>What is SarahUI?</CollapsibleTrigger>
      <CollapsibleContent>SarahUI is a modern design system.</CollapsibleContent>
    </Collapsible>
  );
}\`
    },
    {
      title: 'Nested Disclosure',
      description: 'Multiple collapsible items organized into a clean FAQ structure.',
      preview: () => html\`
        <div class="s-stack">
          \${U.Collapsible({title:'Is it compatible with Next.js & Vite?',content:'Yes! Works out of the box with React, Next.js, Vite, Astro, and plain HTML.',open:false})}
          \${U.Collapsible({title:'Are there any external dependencies?',content:'Zero runtime dependencies. Pure CSS variables and native browser APIs.',open:false})}
        </div>
      \`,
      code: \`import { Collapsible } from "@/components/sarahui/collapsible";

export function CollapsibleNested() {
  return (
    <div className="space-y-2">
      <Collapsible title="Is it compatible with Next.js?" />
      <Collapsible title="Are there any dependencies?" />
    </div>
  );
}\`
    }
  ],`
};

for (const [key, replacement] of Object.entries(variantPatchesPart2)) {
  const idx = content.indexOf(`  ${key}: [`);
  if (idx !== -1) {
    let depth = 0;
    let endIdx = -1;
    for (let i = idx; i < content.length; i++) {
      if (content[i] === '[') depth++;
      else if (content[i] === ']') {
        depth--;
        if (depth === 0) {
          if (content[i + 1] === ',') endIdx = i + 2;
          else endIdx = i + 1;
          break;
        }
      }
    }
    if (endIdx !== -1) {
      content = content.slice(0, idx) + replacement.trim() + '\n\n' + content.slice(endIdx).trimStart();
      console.log(`Part 2: Successfully replaced variants for ${key}!`);
    } else {
      console.log(`Part 2: Could not find end bracket for ${key}`);
    }
  } else {
    console.log(`Part 2: Could not find key ${key} in catalog.mjs`);
  }
}

fs.writeFileSync('apps/docs/catalog.mjs', content, 'utf8');
console.log('Part 2 variant patches written to catalog.mjs successfully!');

