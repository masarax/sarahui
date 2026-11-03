import fs from 'fs';

let content = fs.readFileSync('apps/docs/catalog.mjs', 'utf8');

// We will write a comprehensive patch for componentVariants in apps/docs/catalog.mjs
// Let's create an external variants dictionary or modular updater to replace all duplicate/stale variant functions.

const variantPatches = {
  // 11. IconCloud
  IconCloud: `  IconCloud: [
    {
      title: '3D Fibonacci Interactive Sphere',
      description: 'Dynamic 3D sphere revolving tech stack brand logos on an interactive canvas.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:400px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.IconCloud({
            icons: ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'docker', 'git', 'figma', 'github', 'html5', 'css3', 'javascript', 'tailwind', 'graphql', 'vite', 'vercel']
          })}
        </div>
      \`,
      code: \`import { IconCloud } from "@/components/sarahui/icon-cloud";

const slugs = [
  "typescript", "react", "nextdotjs", "nodedotjs", "docker", "git",
  "figma", "github", "html5", "css3", "javascript", "tailwind", "graphql", "vite", "vercel"
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}\`
    },
    {
      title: 'Brand Ecosystem Cloud',
      description: 'Design and product ecosystem cloud featuring creative software tools.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:400px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          \${U.IconCloud({
            icons: ['figma', 'notion', 'framer', 'sketch', 'linear', 'raycast', 'slack', 'dribbble', 'behance']
          })}
        </div>
      \`,
      code: \`import { IconCloud } from "@/components/sarahui/icon-cloud";

const designSlugs = ["figma", "notion", "framer", "sketch", "linear", "raycast", "slack", "dribbble", "behance"];

export function IconCloudDesign() {
  return <IconCloud iconSlugs={designSlugs} />;
}\`
    }
  ],`,

  // 15. ProgressiveBlur
  ProgressiveBlur: `  ProgressiveBlur: [
    {
      title: 'Multi-Stop Gradient Blur',
      description: 'Gradual multi-stop blur transition softening underlying imagery and surfaces.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:flex-end;padding:24px;">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 30%, rgba(91,61,245,0.25), transparent 70%);"></div>
          <div style="position:relative;z-index:2;width:100%;">
            <div style="padding:16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);backdrop-filter:blur(16px);">
              <h4 style="margin:0 0 4px;">Progressive Blur Surface</h4>
              <p class="s-small s-muted" style="margin:0;">Smooth optical gradient blur overlay.</p>
            </div>
          </div>
          \${U.ProgressiveBlur({direction:'bottom',blurRadius:16})}
        </div>
      \`,
      code: \`import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl border">
      <ProgressiveBlur direction="bottom" blurRadius={16} />
    </div>
  );
}\`
    },
    {
      title: 'Top Header Vignette',
      description: 'Top positioned progressive blur vignette for sticky header blending.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;">
          \${U.ProgressiveBlur({direction:'top',blurRadius:24})}
          <div style="padding-top:40px;">
            <h3 style="margin:0 0 8px;">Sticky Header Blend</h3>
            <p class="s-small s-muted">Seamlessly fades out content as it scrolls beneath navigation bars.</p>
          </div>
        </div>
      \`,
      code: \`import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurHeader() {
  return <ProgressiveBlur direction="top" blurRadius={24} />;
}\`
    }
  ],`,

  // 16. DottedMap
  DottedMap: `  DottedMap: [
    {
      title: 'World Coordinates Vector Map',
      description: 'Interactive SVG dotted world map displaying global presence pins and hubs.',
      preview: () => demos.DottedMap(),
      code: \`import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDemo() {
  return (
    <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-xl border">
      <DottedMap />
    </div>
  );
}\`
    },
    {
      title: 'Smaller Dots',
      description: 'High-density dot matrix offering refined geographical fidelity.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:380px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:24px;">
          \${U.DottedMap({dotRadius:1.1,dotGap:7,attrs:{'data-map-small':'true'}})}
        </div>
      \`,
      code: \`import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapSmall() {
  return <DottedMap dotRadius={1.1} dotGap={7} />;
}\`
    },
    {
      title: 'PulseMarker',
      description: 'Animated pulse beacons highlighting live edge data center regions.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:380px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:24px;">
          \${U.DottedMap()}
          <div style="position:absolute;left:32%;top:38%;z-index:4;" class="s-map-marker-pulse">
            <span class="s-map-beacon"></span>
            <span class="s-map-beacon-ring"></span>
          </div>
          <div style="position:absolute;left:52%;top:32%;z-index:4;" class="s-map-marker-pulse">
            <span class="s-map-beacon"></span>
            <span class="s-map-beacon-ring"></span>
          </div>
        </div>
      \`,
      code: \`import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapPulse() {
  return <DottedMap markers={[{ lat: 37.77, lon: -122.41, pulse: true }]} />;
}\`
    }
  ],`,

  // 17. AnimatedBeam
  AnimatedBeam: `  AnimatedBeam: [
    {
      title: 'Animated Beam Uni-Directional',
      description: 'Smooth SVG beam connecting user to destination node with radiant gradient flow.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:360px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:32px;">
          <div style="display:flex;width:100%;max-width:380px;align-items:center;justify-content:space-between;position:relative;z-index:2;">
            <div class="beam-circle-node" title="User">\${Icon({name:'heart',size:22})}</div>
            <div class="beam-circle-node" title="Server" style="background:var(--s-brand-indigo);color:#fff;">\${Icon({name:'spark',size:22})}</div>
          </div>
          <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 600 360">
            <defs>
              <linearGradient id="beam-uni-grad" gradientUnits="userSpaceOnUse" x1="180" y1="180" x2="420" y2="180">
                <stop stop-color="#18CCFC" stop-opacity="0"></stop>
                <stop offset="50%" stop-color="#6344F5"></stop>
                <stop offset="100%" stop-color="#AE48FF" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M 180 180 C 260 100, 340 100, 420 180" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none"></path>
            <path class="s-beam-path" d="M 180 180 C 260 100, 340 100, 420 180" stroke="url(#beam-uni-grad)" stroke-width="3" fill="none"></path>
          </svg>
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamDemo() {
  return (
    <AnimatedBeam
      fromRef={userRef}
      toRef={serverRef}
      duration={3}
    />
  );
}\`
    },
    {
      title: 'Animated Beam Bi-Directional',
      description: 'Simultaneous two-way continuous packet transfer between services.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:360px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:32px;">
          <div style="display:flex;width:100%;max-width:380px;align-items:center;justify-content:space-between;position:relative;z-index:2;">
            <div class="beam-circle-node" title="Client">\${Icon({name:'globe',size:22})}</div>
            <div class="beam-circle-node" title="API Gateway" style="background:var(--s-brand-indigo);color:#fff;">\${Icon({name:'layers',size:22})}</div>
          </div>
          <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 600 360">
            <defs>
              <linearGradient id="beam-bi-1" gradientUnits="userSpaceOnUse" x1="180" y1="180" x2="420" y2="180">
                <stop stop-color="#00E5FF" stop-opacity="0"></stop>
                <stop offset="50%" stop-color="#00E5FF"></stop>
                <stop offset="100%" stop-color="#00E5FF" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient id="beam-bi-2" gradientUnits="userSpaceOnUse" x1="420" y1="180" x2="180" y2="180">
                <stop stop-color="#FF0055" stop-opacity="0"></stop>
                <stop offset="50%" stop-color="#FF0055"></stop>
                <stop offset="100%" stop-color="#FF0055" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M 180 180 C 260 110, 340 110, 420 180" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"></path>
            <path class="s-beam-path" d="M 180 180 C 260 110, 340 110, 420 180" stroke="url(#beam-bi-1)" stroke-width="3" fill="none"></path>
            <path d="M 180 180 C 260 250, 340 250, 420 180" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"></path>
            <path class="s-beam-path" style="--beam-reverse:1;" d="M 420 180 C 340 250, 260 250, 180 180" stroke="url(#beam-bi-2)" stroke-width="3" fill="none"></path>
          </svg>
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamBiDirectional() {
  return (
    <>
      <AnimatedBeam fromRef={clientRef} toRef={apiRef} duration={3} />
      <AnimatedBeam fromRef={apiRef} toRef={clientRef} duration={3} reverse />
    </>
  );
}\`
    },
    {
      title: 'Animated Beam Multiple Inputs',
      description: 'Multiple input sources converging onto a central database architecture.',
      preview: () => demos.AnimatedBeam('beam-specimen-multi'),
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamMultipleInputs() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {inputs.map((ref, idx) => (
        <AnimatedBeam key={idx} fromRef={ref} toRef={hubRef} />
      ))}
      <AnimatedBeam fromRef={hubRef} toRef={outRef} />
    </div>
  );
}\`
    }
  ],`,

  // 25. AnimatedThemeToggler
  AnimatedThemeToggler: `  AnimatedThemeToggler: [
    {
      title: 'Square',
      description: 'Square polygon clip-path expanding outward across the screen.',
      preview: () => html\`
        <div class="demo-wrap" style="padding:40px;justify-content:center;">
          \${U.AnimatedThemeToggler({variant:'square',attrs:{'data-s-theme-toggler':'square'}})}
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerSquare() {
  return <AnimatedThemeToggler variant="square" />;
}\`
    },
    {
      title: 'Diamond',
      description: 'Rotated 45-degree diamond polygon expanding across viewport.',
      preview: () => html\`
        <div class="demo-wrap" style="padding:40px;justify-content:center;">
          \${U.AnimatedThemeToggler({variant:'diamond',attrs:{'data-s-theme-toggler':'diamond'}})}
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerDiamond() {
  return <AnimatedThemeToggler variant="diamond" />;
}\`
    }
  ],`,

  // 27. TextAnimate
  TextAnimate: `  TextAnimate: [
    {
      title: 'Blur In by Text',
      description: 'Entire text block fading in with progressive optical blur reduction.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.TextAnimate({text:'Thoughtful Motion Design',animation:'blurIn'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateBlurIn() {
  return <TextAnimate animation="blurIn" by="text">Thoughtful Motion Design</TextAnimate>;
}\`
    },
    {
      title: 'Slide Up by Word',
      description: 'Individual words sliding upward with staggered spring physics.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.TextAnimate({text:'Next Generation Web Primitives',animation:'slideUp',by:'word'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateSlideUp() {
  return <TextAnimate animation="slideUp" by="word">Next Generation Web Primitives</TextAnimate>;
}\`
    }
  ],`,

  // 29. LineShadowText
  LineShadowText: `  LineShadowText: [
    {
      title: '3D Isometric Cast Shadow',
      description: 'Crisp isometric extruded shadow lines projected behind bold typography.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.LineShadowText({text:'Isometric',shadowColor:'rgba(91,61,245,0.85)'})}
        </div>
      \`,
      code: \`import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextDemo() {
  return <LineShadowText shadowColor="#5B3DF5">Isometric</LineShadowText>;
}\`
    },
    {
      title: 'Compact Step Shadow',
      description: 'High-contrast step shadow with rose magenta projection.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.LineShadowText({text:'Velocity',shadowColor:'#FF2E93'})}
        </div>
      \`,
      code: \`import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextRose() {
  return <LineShadowText shadowColor="#FF2E93">Velocity</LineShadowText>;
}\`
    }
  ],`,

  // 30. AuroraText
  AuroraText: `  AuroraText: [
    {
      title: 'Aurora Borealis Gradient Text',
      description: 'Fluid flowing iridescent aurora borealis gradient sweeping across headline.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.AuroraText({text:'Ship Beautiful Apps',colors:['#FF0080', '#7928CA', '#0070F3', '#38bdf8']})}
        </div>
      \`,
      code: \`import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextDemo() {
  return (
    <h1 className="text-4xl font-bold">
      Ship <AuroraText>Beautiful Apps</AuroraText>
    </h1>
  );
}\`
    },
    {
      title: 'Warm Sunset Horizon',
      description: 'Warm solar sunset gradient flowing continuously across typography.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          \${U.AuroraText({text:'Golden Horizon',colors:['#FF4E50', '#F9D423', '#FF6B6B', '#FFA07A']})}
        </div>
      \`,
      code: \`import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextSunset() {
  return <AuroraText colors={["#FF4E50", "#F9D423", "#FF6B6B"]}>Golden Horizon</AuroraText>;
}\`
    }
  ],`,

  // 33. AnimatedShinyText
  AnimatedShinyText: `  AnimatedShinyText: [
    {
      title: 'Metallic Shimmer Sweep',
      description: 'Continuous specular sheen pass sweeping smoothly across metallic badge text.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            \${U.AnimatedShinyText({text:'✨ Introducing SarahUI Pro',shimmerWidth:120})}
          </div>
        </div>
      \`,
      code: \`import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function AnimatedShinyTextDemo() {
  return (
    <div className="rounded-full border bg-neutral-100 px-4 py-1.5 dark:bg-neutral-900">
      <AnimatedShinyText>✨ Introducing SarahUI Pro</AnimatedShinyText>
    </div>
  );
}\`
    },
    {
      title: 'Brand Accent Shimmer',
      description: 'Electric brand accent shimmer highlighting milestone accomplishments.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            \${U.AnimatedShinyText({text:'🚀 120 Interactive Components',shimmerWidth:160})}
          </div>
        </div>
      \`,
      code: \`import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function AnimatedShinyTextMilestone() {
  return <AnimatedShinyText>🚀 120 Interactive Components</AnimatedShinyText>;
}\`
    }
  ],`,

  // 34. AnimatedGradientText
  AnimatedGradientText: `  AnimatedGradientText: [
    {
      title: 'Radiant Wave Gradient Text',
      description: 'Harmonic multi-stop gradient wave animating seamlessly across text elements.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.AnimatedGradientText({text:'🎉 50k+ Developers',colorFrom:'#ffaa40',colorTo:'#9c40ff'})}
        </div>
      \`,
      code: \`import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function AnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText colorFrom="#ffaa40" colorTo="#9c40ff">
      🎉 50k+ Developers
    </AnimatedGradientText>
  );
}\`
    },
    {
      title: 'Custom Speed',
      description: 'Fast energetic emerald to cyan gradient wave for real-time telemetry.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.AnimatedGradientText({text:'⚡ Realtime Sync Active',colorFrom:'#00E5FF',colorTo:'#10B981',speed:2})}
        </div>
      \`,
      code: \`import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function AnimatedGradientTextFast() {
  return <AnimatedGradientText colorFrom="#00E5FF" colorTo="#10B981" speed={2}>⚡ Realtime Sync Active</AnimatedGradientText>;
}\`
    }
  ],`,

  // 45. Safari
  Safari: `  Safari: [
    {
      title: 'With Image',
      description: 'Realistic Safari browser mockup framing an application screenshot.',
      preview: () => html\`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          \${U.Safari({url:'sarahui.dev',imageSrc:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariDemoImage() {
  return <Safari url="sarahui.dev" imageSrc="https://example.com/screenshot.png" />;
}\`
    },
    {
      title: 'With Video',
      description: 'Safari browser window mockup framing an interactive looping video stream.',
      preview: () => html\`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          \${U.Safari({url:'sarahui.dev',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariDemoVideo() {
  return <Safari url="sarahui.dev" videoSrc="https://example.com/stream.mp4" />;
}\`
    },
    {
      title: 'Simple Mode',
      description: 'Streamlined browser mockup without address bar for clean hero mockups.',
      preview: () => html\`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          \${U.Safari({mode:'simple',children:html\`<div style="padding:48px 24px;text-align:center;background:var(--s-bg-surface);"><h3 style="margin:0 0 8px;">Simple Safari Mockup</h3><p class="s-small s-muted">Clean macOS frame with traffic light controls.</p></div>\`})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariSimple() {
  return <Safari mode="simple" />;
}\`
    }
  ],`,

  // 46. Iphone
  Iphone: `  Iphone: [
    {
      title: 'With Image',
      description: 'iPhone hardware mockup framing a mobile application design screenshot.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Iphone({src:'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80'})}
        </div>
      \`,
      code: \`import { Iphone } from "@/components/sarahui/iphone";

export function IphoneImage() {
  return <Iphone src="https://example.com/mobile-app.png" />;
}\`
    },
    {
      title: 'With Video',
      description: 'iPhone hardware mockup rendering an interactive looping mobile video.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Iphone({videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      \`,
      code: \`import { Iphone } from "@/components/sarahui/iphone";

export function IphoneVideo() {
  return <Iphone videoSrc="https://example.com/mobile-video.mp4" />;
}\`
    }
  ],`,

  // 47. Android
  Android: `  Android: [
    {
      title: 'With Image',
      description: 'Android hardware mockup framing an Android app screenshot.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Android({src:'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80'})}
        </div>
      \`,
      code: \`import { Android } from "@/components/sarahui/android";

export function AndroidImage() {
  return <Android src="https://example.com/android-app.png" />;
}\`
    },
    {
      title: 'With Video',
      description: 'Android hardware frame displaying a live mobile interaction video.',
      preview: () => html\`
        <div style="display:flex;justify-content:center;width:100%;">
          \${U.Android({videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      \`,
      code: \`import { Android } from "@/components/sarahui/android";

export function AndroidVideo() {
  return <Android videoSrc="https://example.com/android-video.mp4" />;
}\`
    }
  ],`,

  // 50. RippleButton
  RippleButton: `  RippleButton: [
    {
      title: 'Wave Ripple Click Button',
      description: 'Generates expanding dynamic concentric ripples from the exact click coordinate.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.RippleButton({label:'Click for Waves',variant:'primary'})}
        </div>
      \`,
      code: \`import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonDemo() {
  return <RippleButton>Click for Waves</RippleButton>;
}\`
    },
    {
      title: 'Centered Pulse Action',
      description: 'Outline styled action button with subtle lavender ripple waves.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.RippleButton({label:'Outline Ripple Action',variant:'outline',rippleColor:'rgba(91,61,245,0.3)'})}
        </div>
      \`,
      code: \`import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonOutline() {
  return <RippleButton variant="outline" rippleColor="rgba(91,61,245,0.3)">Outline Action</RippleButton>;
}\`
    }
  ],`,

  // 70. CoolMode
  CoolMode: `  CoolMode: [
    {
      title: 'Click Particle Celebration',
      description: 'Spawns a festive burst of colorful particles radiating outward on click.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.CoolMode({label:'Celebrate Release 🎉',variant:'primary'})}
        </div>
      \`,
      code: \`import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeDemo() {
  return (
    <CoolMode>
      <Button>Celebrate Release 🎉</Button>
    </CoolMode>
  );
}\`
    },
    {
      title: 'Custom Particle',
      description: 'Shoots custom star and spark shapes celebrating milestone achievements.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.CoolMode({label:'Super Star ⭐',variant:'outline',particle:'stars'})}
        </div>
      \`,
      code: \`import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeCustom() {
  return (
    <CoolMode particle="stars">
      <Button variant="outline">Super Star ⭐</Button>
    </CoolMode>
  );
}\`
    }
  ],`,

  // 72. PulsatingButton
  PulsatingButton: `  PulsatingButton: [
    {
      title: 'Pulsing Harmonic Glow',
      description: 'Solid call-to-action button encircled by a breathing harmonic glow aura.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.PulsatingButton({label:'Join Live Stream',pulseColor:'#5B3DF5'})}
        </div>
      \`,
      code: \`import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonDemo() {
  return <PulsatingButton pulseColor="#5B3DF5">Join Live Stream</PulsatingButton>;
}\`
    },
    {
      title: 'Ripple Variant',
      description: 'Outward expanding radar ping pulses emphasizing critical action buttons.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.PulsatingButton({label:'Emergency Alert',pulseColor:'#FF3366',variant:'ripple'})}
        </div>
      \`,
      code: \`import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonRipple() {
  return <PulsatingButton variant="ripple" pulseColor="#FF3366">Emergency Alert</PulsatingButton>;
}\`
    }
  ],`,

  // 74. InteractiveHoverButton
  InteractiveHoverButton: `  InteractiveHoverButton: [
    {
      title: 'Expanding Hover Circle',
      description: 'Pill button featuring a circle dot that smoothly expands to fill the background while translating the arrow.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.InteractiveHoverButton({text:'Get Started'})}
        </div>
      \`,
      code: \`import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
  return <InteractiveHoverButton text="Get Started" />;
}\`
    },
    {
      title: 'Inverted Circle Fill',
      description: 'Dark contrast action button with white circle expand and text reveal.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.InteractiveHoverButton({text:'Explore Library'})}
        </div>
      \`,
      code: \`import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonExplore() {
  return <InteractiveHoverButton text="Explore Library" />;
}\`
    }
  ],`,

  // 78. AnimatedSubscribeButton
  AnimatedSubscribeButton: `  AnimatedSubscribeButton: [
    {
      title: 'Morphing State Subscribe Action',
      description: 'Smooth morphing button transitioning from Subscribe to Subscribed state with icon checkmark.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.AnimatedSubscribeButton({initialText:'Subscribe',subscribedText:'Subscribed'})}
        </div>
      \`,
      code: \`import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function AnimatedSubscribeButtonDemo() {
  return (
    <AnimatedSubscribeButton
      initialText="Subscribe"
      subscribedText="Subscribed"
    />
  );
}\`
    },
    {
      title: 'Bookmark Toggle Action',
      description: 'Two-stage bookmark action saving and unsaving items from workspaces.',
      preview: () => html\`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          \${U.AnimatedSubscribeButton({initialText:'Save to Library',subscribedText:'Saved in Library'})}
        </div>
      \`,
      code: \`import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function AnimatedBookmark() {
  return (
    <AnimatedSubscribeButton
      initialText="Save to Library"
      subscribedText="Saved in Library"
    />
  );
}\`
    }
  ],`,

  // 107. Breadcrumb
  Breadcrumb: `  Breadcrumb: [
    {
      title: 'Slash Separator',
      description: 'Hierarchical navigation path with clean slash dividers.',
      preview: () => U.Breadcrumb({
        items: [
          { label: 'Workspace', href: '#patterns' },
          { label: 'Projects', href: '#patterns' },
          { label: 'Design System' }
        ]
      }),
      code: \`import { Breadcrumb, BreadcrumbItem } from "@/components/sarahui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb separator="/">
      <BreadcrumbItem href="/workspace">Workspace</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem active>Design System</BreadcrumbItem>
    </Breadcrumb>
  );
}\`
    },
    {
      title: 'Chevron Arrow Separator',
      description: 'Directional chevron indicators linking ancestors.',
      preview: () => html\`
        <nav aria-label="Breadcrumb" class="s-breadcrumb s-breadcrumb--chevron">
          <ol style="display:flex;align-items:center;gap:8px;list-style:none;padding:0;margin:0;font-size:13px;">
            <li><a href="#overview" style="color:var(--s-text-muted);text-decoration:none;">Docs</a></li>
            <li style="color:var(--s-text-muted);opacity:0.5;">›</li>
            <li><a href="#components" style="color:var(--s-text-muted);text-decoration:none;">Components</a></li>
            <li style="color:var(--s-text-muted);opacity:0.5;">›</li>
            <li style="font-weight:600;color:var(--s-text-primary);" aria-current="page">Breadcrumb</li>
          </ol>
        </nav>
      \`,
      code: \`import { Breadcrumb } from "@/components/sarahui/breadcrumb";

export function BreadcrumbChevron() {
  return <Breadcrumb separator="chevron" items={items} />;
}\`
    }
  ],`,

  // 113. Dialog
  Dialog: `  Dialog: [
    {
      title: 'Confirmation Modal',
      description: 'Native modal dialog with focus trap and backdrop dismissal.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({ label: 'Create a project', icon: 'plus', attrs: { 'data-s-dialog-open': 'create-project' } })}
        </div>
      \`,
      code: \`import { Dialog, DialogContent } from "@/components/sarahui/dialog";

export function DialogDemo() {
  return (
    <Dialog trigger="Create project">
      <DialogContent title="New project">
        <p>Enter project details.</p>
      </DialogContent>
    </Dialog>
  );
}\`
    },
    {
      title: 'Form Dialog Modal',
      description: 'Modal housing a structured form with submission buttons.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({ label: 'Quick Settings', icon: 'settings', variant: 'outline', attrs: { 'data-s-dialog-open': 'demo-settings-modal' } })}
          <dialog id="demo-settings-modal" class="s-dialog" style="max-width:440px;padding:24px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            <h3 style="margin:0 0 6px;">Workspace Preferences</h3>
            <p class="s-small s-muted" style="margin:0 0 16px;">Configure your development environment defaults.</p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
              \${Input({ id: 'pref-name', label: 'Display Name', attrs: { value: 'Sarah Khan' } })}
              \${Switch({ id: 'pref-notif', label: 'Push Notifications', checked: true })}
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;">
              \${Button({ label: 'Cancel', variant: 'ghost', size: 'sm', attrs: { 'data-s-dialog-close': true } })}
              \${Button({ label: 'Save Changes', variant: 'primary', size: 'sm', attrs: { 'data-s-dialog-close': true } })}
            </div>
          </dialog>
        </div>
      \`,
      code: \`import { Dialog } from "@/components/sarahui/dialog";

export function DialogForm() {
  return <Dialog title="Workspace Preferences" formAction="/api/settings" />;
}\`
    }
  ],`,

  // 115. Toast
  Toast: `  Toast: [
    {
      title: 'Success Notification',
      description: 'Polite announcement toast with automatic pause on hover or focus.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({ label: 'Publish Changes', icon: 'spark', variant: 'primary', attrs: { 'data-feedback': 'Changes published live on edge!' } })}
        </div>
      \`,
      code: \`import { toast } from "sarahui";

export function ToastSuccess() {
  return (
    <button onClick={() => toast("Changes published live on edge!", { title: "Success" })}>
      Publish Changes
    </button>
  );
}\`
    },
    {
      title: 'Warning Alert Toast',
      description: 'Notice toast alerting users to non-critical updates or latency.',
      preview: () => html\`
        <div class="demo-wrap">
          \${Button({ label: 'Simulate Warning', variant: 'outline', attrs: { 'data-feedback': 'Network latency detected. Reconnecting...' } })}
        </div>
      \`,
      code: \`import { toast } from "sarahui";

export function ToastWarning() {
  return (
    <button onClick={() => toast("Network latency detected.", { title: "Warning", tone: "warning" })}>
      Simulate Warning
    </button>
  );
}\`
    }
  ],`,

  // 120. HoverCard
  HoverCard: `  HoverCard: [
    {
      title: 'User Profile Preview',
      description: 'Rich popover card appearing smoothly when hovering over user mention links.',
      preview: () => demos.HoverCard(),
      code: \`import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardUser() {
  return (
    <HoverCard trigger="@sarahui">
      <UserProfile name="Sarah Khan" role="Lead Designer" />
    </HoverCard>
  );
}\`
    },
    {
      title: 'Link OpenGraph Preview',
      description: 'Hover card displaying summary preview of external links and repositories.',
      preview: () => html\`
        <div class="demo-wrap">
          \${U.HoverCard({
            trigger: Button({ label: 'github.com/sarahui', variant: 'ghost', size: 'sm', icon: 'link' }),
            content: html\`
              <div style="padding:4px;max-width:260px;">
                <strong style="font-size:13px;display:block;margin-bottom:4px;">masarax/sarahui</strong>
                <p class="s-small s-muted" style="margin:0 0 8px;">120 components, 277 design tokens, 0 runtime dependencies.</p>
                <span class="s-small" style="color:var(--s-brand-indigo);">★ 4.9k stars on GitHub</span>
              </div>
            \`
          })}
        </div>
      \`,
      code: \`import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardLink() {
  return (
    <HoverCard trigger="github.com/sarahui">
      <RepoSummary name="masarax/sarahui" stars={4900} />
    </HoverCard>
  );
}\`
    }
  ],`
};

for (const [key, replacement] of Object.entries(variantPatches)) {
  const regex = new RegExp(`\\s+${key}:\\s+\\[[\\s\\S]*?\\],\\r?\\n\\s+\\/\\/\\s+\\d+\\.`);
  // Find where it is
  const idx = content.indexOf(`  ${key}: [`);
  if (idx !== -1) {
    // find matching end of array
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
      console.log(`Successfully replaced variants for ${key}!`);
    } else {
      console.log(`Could not find end bracket for ${key}`);
    }
  } else {
    console.log(`Could not find key ${key} in catalog.mjs`);
  }
}

fs.writeFileSync('apps/docs/catalog.mjs', content, 'utf8');
console.log('All variant patches written to catalog.mjs successfully!');

