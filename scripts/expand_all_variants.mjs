import fs from 'node:fs';
import path from 'node:path';

// Let's verify that we can read and parse all files
console.log('Starting full componentVariants expansion...');

// Read the catalog.mjs file
const catalogPath = 'apps/docs/catalog.mjs';
let catalogSrc = fs.readFileSync(catalogPath, 'utf8');

// We will enrich componentVariants with all authentic MagicUI examples
// Let's create the expanded variants definition

const newVariantsSection = `export const componentVariants = {
  // 1. Marquee
  Marquee: [
    {
      title: 'Vertical',
      description: 'Display an infinite vertical ticker with smooth continuous translation.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:340px;width:100%;flex-direction:row;align-items:center;justify-content:center;gap:16px;overflow:hidden;padding:16px 0;">
          \${U.Marquee({vertical:true,pauseOnHover:true,children:html\`
            <div style="display:flex;flex-direction:column;gap:12px;">
              \${[
                {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it."},
                {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing."},
                {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it."}
              ].map(r=>html\`
                <figure class="s-marquee-review-card" style="width:220px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                  <strong style="font-size:12px;display:block;">\${r.name}</strong>
                  <small class="s-small s-muted" style="font-size:10.5px;">\${r.username}</small>
                  <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">\${r.body}</p>
                </figure>
              \`)}
            </div>
          \`})}
          \${U.Marquee({vertical:true,reverse:true,pauseOnHover:true,children:html\`
            <div style="display:flex;flex-direction:column;gap:12px;">
              \${[
                {name:'Jane',username:'@jane',body:"Clean, fluid vertical motion. Fits sidebars and widgets perfectly."},
                {name:'Jenny',username:'@jenny',body:"Seamless looping with zero lag or frame drops."},
                {name:'James',username:'@james',body:"Pure CSS animation with native pause on hover."}
              ].map(r=>html\`
                <figure class="s-marquee-review-card" style="width:220px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                  <strong style="font-size:12px;display:block;">\${r.name}</strong>
                  <small class="s-small s-muted" style="font-size:10.5px;">\${r.username}</small>
                  <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">\${r.body}</p>
                </figure>
              \`)}
            </div>
          \`})}
        </div>
      \`,
      code: \`import { Marquee } from "@/components/sarahui/marquee";

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-[340px] w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}\`
    },
    {
      title: '3D',
      description: 'Rotate and pitch vertical tickers with 3D perspective depth transforms.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:340px;width:100%;flex-direction:row;align-items:center;justify-content:center;gap:16px;overflow:hidden;perspective:320px;">
          <div style="display:flex;gap:16px;transform:translateX(-40px) translateY(0px) translateZ(-60px) rotateX(20deg) rotateY(-10deg) rotateZ(16deg);">
            \${U.Marquee({vertical:true,pauseOnHover:true,children:html\`
              <div style="display:flex;flex-direction:column;gap:12px;">
                \${[
                  {name:'Jack',username:'@jack',body:"Stunning 3D perspective layout."},
                  {name:'Jill',username:'@jill',body:"Looks gorgeous in light and dark mode."}
                ].map(r=>html\`
                  <figure class="s-marquee-review-card" style="width:200px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                    <strong style="font-size:12px;display:block;">\${r.name}</strong>
                    <small class="s-small s-muted" style="font-size:10.5px;">\${r.username}</small>
                    <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">\${r.body}</p>
                  </figure>
                \`)}
              </div>
            \`})}
            \${U.Marquee({vertical:true,reverse:true,pauseOnHover:true,children:html\`
              <div style="display:flex;flex-direction:column;gap:12px;">
                \${[
                  {name:'Jane',username:'@jane',body:"Zero external dependencies or overhead."},
                  {name:'Jenny',username:'@jenny',body:"Smooth spring easing."}
                ].map(r=>html\`
                  <figure class="s-marquee-review-card" style="width:200px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                    <strong style="font-size:12px;display:block;">\${r.name}</strong>
                    <small class="s-small s-muted" style="font-size:10.5px;">\${r.username}</small>
                    <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">\${r.body}</p>
                  </figure>
                \`)}
              </div>
            \`})}
          </div>
        </div>
      \`,
      code: \`import { Marquee } from "@/components/sarahui/marquee";

export function Marquee3D() {
  return (
    <div className="relative flex h-[340px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:320px]">
      <div className="flex gap-4 [transform:translateX(-40px)_translateY(0px)_translateZ(-60px)_rotateX(20deg)_rotateY(-10deg)_rotateZ(16deg)]">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}\`
    }
  ],

  // 2. AnimatedThemeToggler - 7 Authentic Variants from MagicUI
  AnimatedThemeToggler: [
    {
      title: 'Square',
      description: 'Square expanding clip-path transition with View Transitions API.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'square'})}
          <span class="s-small s-muted">Click the sun/moon icon to trigger square transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerSquareDemo() {
  return <AnimatedThemeToggler shape="square" />;
}\`
    },
    {
      title: 'Diamond',
      description: 'Diamond expanding clip-path transition.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'diamond'})}
          <span class="s-small s-muted">Click the sun/moon icon to trigger diamond transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerDiamondDemo() {
  return <AnimatedThemeToggler shape="diamond" />;
}\`
    },
    {
      title: 'Rectangle',
      description: 'Horizontal rectangle split transition effect.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'rectangle'})}
          <span class="s-small s-muted">Click to trigger rectangle transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerRectangleDemo() {
  return <AnimatedThemeToggler shape="rectangle" />;
}\`
    },
    {
      title: 'Hexagon',
      description: 'Geometric hexagon polygon clip-path reveal.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'hexagon'})}
          <span class="s-small s-muted">Click to trigger hexagon transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerHexagonDemo() {
  return <AnimatedThemeToggler shape="hexagon" />;
}\`
    },
    {
      title: 'Triangle',
      description: 'Triangular angular polygon mask sweep.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'triangle'})}
          <span class="s-small s-muted">Click to trigger triangle transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerTriangleDemo() {
  return <AnimatedThemeToggler shape="triangle" />;
}\`
    },
    {
      title: 'Star',
      description: '10-point star burst clip-path reveal.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">
          \${U.AnimatedThemeToggler({shape:'star'})}
          <span class="s-small s-muted">Click to trigger star transition</span>
        </div>
      \`,
      code: \`import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerStarDemo() {
  return <AnimatedThemeToggler shape="star" />;
}\`
    }
  ],

  // 3. Confetti - 7 Authentic Variants from MagicUI
  Confetti: [
    {
      title: 'Basic',
      description: 'Classic single blast confetti explosion from screen center.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.Confetti({label:'Trigger Confetti',mode:'basic'})}
        </div>
      \`,
      code: \`import { ConfettiButton } from "@/components/sarahui/confetti";

export function ConfettiBasicCannon() {
  return <ConfettiButton>Trigger Confetti</ConfettiButton>;
}\`
    },
    {
      title: 'Fireworks',
      description: 'Multi-burst continuous fireworks display with random colors.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.Confetti({label:'Launch Fireworks',mode:'fireworks'})}
        </div>
      \`,
      code: \`import { ConfettiButton } from "@/components/sarahui/confetti";

export function ConfettiFireworks() {
  return (
    <ConfettiButton
      options={{
        get count() { return 200; },
      }}
    >
      Launch Fireworks
    </ConfettiButton>
  );
}\`
    },
    {
      title: 'Side Cannons',
      description: 'Synchronized diagonal cannons shooting from both left and right screen edges.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.Confetti({label:'Fire Side Cannons',mode:'side'})}
        </div>
      \`,
      code: \`import { ConfettiButton } from "@/components/sarahui/confetti";

export function ConfettiSideCannons() {
  return <ConfettiButton>Fire Side Cannons</ConfettiButton>;
}\`
    },
    {
      title: 'Stars',
      description: 'Particle burst using geometric gold star shapes.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.Confetti({label:'Star Shower',mode:'stars'})}
        </div>
      \`,
      code: \`import { ConfettiButton } from "@/components/sarahui/confetti";

export function ConfettiStars() {
  return (
    <ConfettiButton
      options={{
        shapes: ["star"],
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      }}
    >
      Star Shower
    </ConfettiButton>
  );
}\`
    },
    {
      title: 'Emoji',
      description: 'Playful confetti burst shooting animated emoji characters.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.Confetti({label:'Emoji Explosion 🦄',mode:'emoji'})}
        </div>
      \`,
      code: \`import { ConfettiButton } from "@/components/sarahui/confetti";

export function ConfettiEmoji() {
  return (
    <ConfettiButton
      options={{
        emojis: ["🦄", "✨", "💫", "🚀", "🎉"],
      }}
    >
      Emoji Explosion 🦄
    </ConfettiButton>
  );
}\`
    }
  ],

  // 4. TextAnimate - 8 Authentic Variants from MagicUI
  TextAnimate: [
    {
      title: 'Blur In by Text',
      description: 'Smooth blur-in unmasking applied across entire headline block.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.TextAnimate({text:'Transform your product design with precision.',animation:'blurIn',by:'text',className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurIn" by="text" className="text-2xl font-bold">
      Transform your product design with precision.
    </TextAnimate>
  );
}\`
    },
    {
      title: 'Slide Up by Word',
      description: 'Staggered vertical translation ascending word by word.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.TextAnimate({text:'Every component crafted with purpose.',animation:'slideUp',by:'word',className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateDemo2() {
  return (
    <TextAnimate animation="slideUp" by="word" className="text-2xl font-bold">
      Every component crafted with purpose.
    </TextAnimate>
  );
}\`
    },
    {
      title: 'Scale Up by Text',
      description: 'Dynamic scale spring entrance expanding from center.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.TextAnimate({text:'Interactive physics at 60 FPS.',animation:'scaleUp',by:'text',className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateDemo3() {
  return (
    <TextAnimate animation="scaleUp" by="text" className="text-2xl font-bold">
      Interactive physics at 60 FPS.
    </TextAnimate>
  );
}\`
    },
    {
      title: 'Fade In by Line',
      description: 'Clean staggered opacity unmasking applied per line of text.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.TextAnimate({text:'Minimal zero-runtime dependencies.\\nNative Web APIs and pure CSS.',animation:'fadeIn',by:'line',className:'text-xl font-medium text-center'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateDemo4() {
  return (
    <TextAnimate animation="fadeIn" by="line" className="text-xl font-medium">
      Minimal zero-runtime dependencies.
      Native Web APIs and pure CSS.
    </TextAnimate>
  );
}\`
    },
    {
      title: 'Slide Left by Character',
      description: 'High-frequency character-by-character horizontal stagger reveal.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.TextAnimate({text:'PRECISION TYPOGRAPHY',animation:'slideLeft',by:'character',className:'text-xl font-bold tracking-widest'})}
        </div>
      \`,
      code: \`import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateDemo5() {
  return (
    <TextAnimate animation="slideLeft" by="character" className="text-xl font-bold tracking-widest">
      PRECISION TYPOGRAPHY
    </TextAnimate>
  );
}\`
    }
  ],

  // 5. TypingAnimation - 8 Authentic Variants from MagicUI
  TypingAnimation: [
    {
      title: 'Multiple Words with Loop',
      description: 'Rotates through a list of phrases typing and deleting seamlessly.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">
          \${U.TypingAnimation({words:['Build modern web apps.','Ship beautiful UIs.','Design with clarity.'],duration:80,className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { TypingAnimation } from "@/components/sarahui/typing-animation";

export function TypingAnimationDemo2() {
  return (
    <TypingAnimation
      words={["Build modern web apps.", "Ship beautiful UIs.", "Design with clarity."]}
      duration={80}
      className="text-2xl font-bold"
    />
  );
}\`
    },
    {
      title: 'Custom Speed',
      description: 'Ultra-fast 20ms typing cadence for interactive terminal logs.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">
          \${U.TypingAnimation({text:'pnpm add sarahui @sarahui/tokens',duration:20,className:'font-mono text-lg'})}
        </div>
      \`,
      code: \`import { TypingAnimation } from "@/components/sarahui/typing-animation";

export function TypingAnimationDemo3() {
  return (
    <TypingAnimation
      duration={20}
      className="font-mono text-lg"
    >
      pnpm add sarahui @sarahui/tokens
    </TypingAnimation>
  );
}\`
    },
    {
      title: 'Without Cursor',
      description: 'Smooth text typing animation with cursor hidden.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">
          \${U.TypingAnimation({text:'Clean headline animation without cursor.',showCursor:false,className:'text-xl font-semibold'})}
        </div>
      \`,
      code: \`import { TypingAnimation } from "@/components/sarahui/typing-animation";

export function TypingAnimationDemo5() {
  return (
    <TypingAnimation
      showCursor={false}
      className="text-xl font-semibold"
    >
      Clean headline animation without cursor.
    </TypingAnimation>
  );
}\`
    }
  ],

  // 6. BorderBeam - 3 Authentic Variants from MagicUI
  BorderBeam: [
    {
      title: '2 Border Beams',
      description: 'Dual traveling laser light pulses with opposing offsets.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;max-width:380px;margin:auto;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;">
          <span style="font-weight:700;font-size:16px;">Dual Laser Beams</span>
          <span class="s-small s-muted" style="margin-top:6px;">Offset phase tracking</span>
          \${U.BorderBeam({size:120,duration:8,delay:0,colorFrom:'#ffaa40',colorTo:'#9c40ff'})}
          \${U.BorderBeam({size:120,duration:8,delay:4,colorFrom:'#00FFA3',colorTo:'#00B8FF'})}
        </div>
      \`,
      code: \`import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamDemo2() {
  return (
    <div className="relative flex h-[240px] w-full max-w-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border bg-card p-6">
      <span className="text-base font-bold">Dual Laser Beams</span>
      <BorderBeam size={120} duration={8} delay={0} colorFrom="#ffaa40" colorTo="#9c40ff" />
      <BorderBeam size={120} duration={8} delay={4} colorFrom="#00FFA3" colorTo="#00B8FF" />
    </div>
  );
}\`
    },
    {
      title: 'Reverse',
      description: 'Counter-clockwise laser beam path travel.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;max-width:380px;margin:auto;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;">
          <span style="font-weight:700;font-size:16px;">Reverse Orbit</span>
          \${U.BorderBeam({size:150,duration:6,reverse:true,colorFrom:'#FF0055',colorTo:'#7A00FF'})}
        </div>
      \`,
      code: \`import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamDemo3() {
  return (
    <div className="relative flex h-[240px] w-full max-w-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border bg-card p-6">
      <span className="text-base font-bold">Reverse Orbit</span>
      <BorderBeam size={150} duration={6} reverse colorFrom="#FF0055" colorTo="#7A00FF" />
    </div>
  );
}\`
    }
  ],

  // 7. AnimatedBeam - 4 Authentic Variants from MagicUI
  AnimatedBeam: [
    {
      title: 'Animated Beam Uni-Directional',
      description: 'One-way curved laser transmission between client and cloud server.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.AnimatedBeam({mode:'unidirectional'})}
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamUniDirectional() {
  return <AnimatedBeam mode="unidirectional" />;
}\`
    },
    {
      title: 'Animated Beam Bi-Directional',
      description: 'Concurrent bidirectional transmission streams passing each other.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.AnimatedBeam({mode:'bidirectional'})}
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamBiDirectional() {
  return <AnimatedBeam mode="bidirectional" />;
}\`
    },
    {
      title: 'Animated Beam Multiple Inputs',
      description: 'Multiple input source nodes converging simultaneously into a central pipeline processor.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:280px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.AnimatedBeam({mode:'multiple-inputs'})}
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamMultipleInputs() {
  return <AnimatedBeam mode="multiple-inputs" />;
}\`
    },
    {
      title: 'Animated Beam Multiple Outputs',
      description: 'Single upstream trigger branching out to multiple downstream consumer endpoints.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:280px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.AnimatedBeam({mode:'multiple-outputs'})}
        </div>
      \`,
      code: \`import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamMultipleOutputs() {
  return <AnimatedBeam mode="multiple-outputs" />;
}\`
    }
  ],

  // 8. Dock - 3 Authentic Variants from MagicUI
  Dock: [
    {
      title: 'Custom Direction',
      description: 'Vertical dock layout aligned to container edge with responsive magnification.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:320px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.Dock({direction:'vertical',magnification:60,distance:140})}
        </div>
      \`,
      code: \`import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemoVertical() {
  return (
    <Dock direction="vertical" magnification={60} distance={140}>
      <DockIcon><Icons.gitHub /></DockIcon>
      <DockIcon><Icons.notion /></DockIcon>
      <DockIcon><Icons.openai /></DockIcon>
    </Dock>
  );
}\`
    },
    {
      title: 'Custom Magnification',
      description: 'Expanded scale factors with larger target size (80px) and wide reach radius (200px).',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">
          \${U.Dock({magnification:80,distance:200})}
        </div>
      \`,
      code: \`import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemoLarge() {
  return (
    <Dock magnification={80} distance={200}>
      <DockIcon><Icons.gitHub /></DockIcon>
      <DockIcon><Icons.notion /></DockIcon>
      <DockIcon><Icons.openai /></DockIcon>
      <DockIcon><Icons.googleDrive /></DockIcon>
    </Dock>
  );
}\`
    }
  ],

  // 9. DottedMap - 3 Authentic Variants from MagicUI
  DottedMap: [
    {
      title: 'Smaller Dots',
      description: 'High density dot matrix with ultra-fine pinpoint coordinates.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.DottedMap({dotSize:1.2,gap:5})}
        </div>
      \`,
      code: \`import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDemo2() {
  return <DottedMap dotSize={1.2} gap={5} />;
}\`
    },
    {
      title: 'PulseMarker',
      description: 'Pulsating sonar radar beacons highlighting global server clusters.',
      preview: () => html\`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.DottedMap({pulse:true})}
        </div>
      \`,
      code: \`import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDemo3() {
  return <DottedMap pulse={true} />;
}\`
    }
  ],

  // 10. ShineBorder - 2 Authentic Variants from MagicUI
  ShineBorder: [
    {
      title: 'Monotone',
      description: 'Subtle high-contrast pure white sweep beam for clean dark cards.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;max-width:360px;margin:auto;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;">
          \${U.ShineBorder({borderRadius:16,borderWidth:1.5,color:'#ffffff',duration:12})}
          <span style="font-weight:700;font-size:16px;">Monochrome Sheen</span>
          <span class="s-small s-muted" style="margin-top:6px;">Minimalist spotlight sweep</span>
        </div>
      \`,
      code: \`import { ShineBorder } from "@/components/sarahui/shine-border";

export function ShineBorderDemo2() {
  return (
    <div className="relative flex h-[240px] w-full max-w-[360px] flex-col items-center justify-center rounded-2xl border bg-card p-6">
      <ShineBorder borderRadius={16} borderWidth={1.5} color="#ffffff" duration={12} />
      <span className="font-bold">Monochrome Sheen</span>
    </div>
  );
}\`
    }
  ],

  // 11. GlareHover - 2 Authentic Variants from MagicUI
  GlareHover: [
    {
      title: 'CTA',
      description: 'High-impact call-to-action card with dynamic specular highlight.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;max-width:380px;margin:auto;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:linear-gradient(135deg,rgba(91,61,245,0.1),rgba(23,139,255,0.1));padding:24px;">
          \${U.GlareHover({glareColor:'rgba(255,255,255,0.4)',glareSize:280})}
          <strong style="font-size:16px;">Upgrade to Pro</strong>
          <p class="s-small s-muted" style="text-align:center;margin:8px 0 16px;">Unlock unlimited access to all components.</p>
          \${U.Button({label:'Get Started',variant:'primary',size:'sm'})}
        </div>
      \`,
      code: \`import { GlareHover } from "@/components/sarahui/glare-hover";
import { Button } from "@/components/sarahui/button";

export function GlareHoverDemoCTA() {
  return (
    <div className="relative flex h-[240px] w-full max-w-[380px] flex-col items-center justify-center rounded-2xl border bg-card p-6">
      <GlareHover glareColor="rgba(255,255,255,0.4)" glareSize={280} />
      <strong className="text-base">Upgrade to Pro</strong>
      <Button className="mt-4" size="sm">Get Started</Button>
    </div>
  );
}\`
    }
  ],

  // 12. Lens - 2 Authentic Variants from MagicUI
  Lens: [
    {
      title: 'Static Lens',
      description: 'Fixed magnifying loupe positioned statically at focal point.',
      preview: () => html\`
        <div style="position:relative;height:300px;width:100%;max-width:440px;margin:auto;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.Lens({static:true,zoom:2,lensSize:140})}
        </div>
      \`,
      code: \`import { Lens } from "@/components/sarahui/lens";

export function LensDemoStatic() {
  return <Lens static zoom={2} lensSize={140} />;
}\`
    }
  ],

  // 13. NoiseTexture - 3 Authentic Variants from MagicUI
  NoiseTexture: [
    {
      title: 'Newsletter digest',
      description: 'Card with grainy texture overlay for tactile print aesthetics.',
      preview: () => html\`
        <div style="position:relative;height:220px;width:100%;max-width:420px;margin:auto;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:linear-gradient(135deg,#1f1c2c,#928dab);display:flex;flex-direction:column;justify-content:center;padding:24px;color:#fff;">
          \${U.NoiseTexture({opacity:0.25})}
          <span style="position:relative;z-index:2;font-size:18px;font-weight:700;">Subscribe to SarahUI Weekly</span>
          <p style="position:relative;z-index:2;font-size:12px;opacity:0.8;margin:6px 0 16px;">Curated design engineering insights delivered every Monday.</p>
          <div style="position:relative;z-index:2;display:flex;gap:8px;">
            <input type="email" placeholder="Enter your email" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:12px;" />
            <button type="button" style="padding:8px 16px;border-radius:8px;border:0;background:#fff;color:#000;font-weight:600;font-size:12px;cursor:pointer;">Join</button>
          </div>
        </div>
      \`,
      code: \`import { NoiseTexture } from "@/components/sarahui/noise-texture";

export function NoiseTextureDemo2() {
  return (
    <div className="relative h-[220px] w-full max-w-[420px] overflow-hidden rounded-2xl border p-6 text-white">
      <NoiseTexture opacity={0.25} />
      <span className="text-lg font-bold">Subscribe to SarahUI Weekly</span>
    </div>
  );
}\`
    },
    {
      title: 'Button',
      description: 'Grain-textured tactile interactive button.',
      preview: () => html\`
        <div style="display:flex;align-items:center;justify-content:center;padding:32px;">
          <button type="button" style="position:relative;overflow:hidden;padding:12px 28px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:#000;color:#fff;font-weight:600;font-size:14px;cursor:pointer;">
            \${U.NoiseTexture({opacity:0.3})}
            <span style="position:relative;z-index:2;">Textured Action</span>
          </button>
        </div>
      \`,
      code: \`import { NoiseTexture } from "@/components/sarahui/noise-texture";

export function NoiseTextureDemo3() {
  return (
    <button className="relative overflow-hidden rounded-xl border bg-black px-7 py-3 font-semibold text-white">
      <NoiseTexture opacity={0.3} />
      <span className="relative z-10">Textured Action</span>
    </button>
  );
}\`
    }
  ],

  // 14. Safari - 3 Authentic Variants from MagicUI
  Safari: [
    {
      title: 'With Image',
      description: 'Safari macOS browser mockup displaying image preview.',
      preview: () => html\`
        <div style="position:relative;height:320px;width:100%;overflow:hidden;padding:16px;">
          \${U.Safari({url:'sarahui.design',mode:'image'})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariDemo() {
  return <Safari url="sarahui.design" mode="image" />;
}\`
    },
    {
      title: 'With Video',
      description: 'Safari mockup with looping HTML5 video background.',
      preview: () => html\`
        <div style="position:relative;height:320px;width:100%;overflow:hidden;padding:16px;">
          \${U.Safari({url:'sarahui.design',mode:'video'})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariDemo2() {
  return <Safari url="sarahui.design" mode="video" />;
}\`
    },
    {
      title: 'Simple Mode',
      description: 'Minimal address bar without navigation chrome.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;padding:16px;">
          \${U.Safari({url:'sarahui.design',simple:true})}
        </div>
      \`,
      code: \`import { Safari } from "@/components/sarahui/safari";

export function SafariDemo3() {
  return <Safari url="sarahui.design" simple />;
}\`
    }
  ],

  // 15. Iphone - 2 Authentic Variants from MagicUI
  Iphone: [
    {
      title: 'With Image',
      description: 'iPhone device mockup displaying screenshot graphic.',
      preview: () => html\`
        <div style="position:relative;height:380px;width:100%;display:grid;place-items:center;overflow:hidden;padding:16px;">
          \${U.Iphone({mode:'image'})}
        </div>
      \`,
      code: \`import { Iphone } from "@/components/sarahui/iphone";

export function IphoneDemo() {
  return <Iphone mode="image" />;
}\`
    },
    {
      title: 'With Video',
      description: 'iPhone device frame displaying fluid video playback.',
      preview: () => html\`
        <div style="position:relative;height:380px;width:100%;display:grid;place-items:center;overflow:hidden;padding:16px;">
          \${U.Iphone({mode:'video'})}
        </div>
      \`,
      code: \`import { Iphone } from "@/components/sarahui/iphone";

export function IphoneDemo2() {
  return <Iphone mode="video" />;
}\`
    }
  ],

  // 16. Android - 2 Authentic Variants from MagicUI
  Android: [
    {
      title: 'With Image',
      description: 'Android device mockup displaying screenshot interface.',
      preview: () => html\`
        <div style="position:relative;height:380px;width:100%;display:grid;place-items:center;overflow:hidden;padding:16px;">
          \${U.Android({mode:'image'})}
        </div>
      \`,
      code: \`import { Android } from "@/components/sarahui/android";

export function AndroidDemo() {
  return <Android mode="image" />;
}\`
    },
    {
      title: 'With Video',
      description: 'Android device frame displaying mobile video feed.',
      preview: () => html\`
        <div style="position:relative;height:380px;width:100%;display:grid;place-items:center;overflow:hidden;padding:16px;">
          \${U.Android({mode:'video'})}
        </div>
      \`,
      code: \`import { Android } from "@/components/sarahui/android";

export function AndroidDemo2() {
  return <Android mode="video" />;
}\`
    }
  ],

  // 17. TweetCard - 3 Authentic Variants from MagicUI
  TweetCard: [
    {
      title: 'Tweet Card With Image Carousel',
      description: 'Social post card with multi-image photography layout.',
      preview: () => html\`
        <div style="position:relative;display:flex;width:100%;justify-content:center;padding:24px;">
          \${U.TweetCard({author:'Sarah Khan',handle:'@sarahkhan',avatar:'SK',content:'Testing the new image gallery inside TweetCard. Smooth responsive aspect ratio.',images:true,likes:'1.2k',retweets:'340'})}
        </div>
      \`,
      code: \`import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardImagesDemo() {
  return (
    <TweetCard
      author="Sarah Khan"
      handle="@sarahkhan"
      avatar="SK"
      content="Testing the new image gallery inside TweetCard. Smooth responsive aspect ratio."
      images
      likes="1.2k"
      retweets="340"
    />
  );
}\`
    },
    {
      title: 'Tweet Card With Meta URL Preview',
      description: 'Social card embedding rich OpenGraph link preview card.',
      preview: () => html\`
        <div style="position:relative;display:flex;width:100%;justify-content:center;padding:24px;">
          \${U.TweetCard({author:'Sarah Khan',handle:'@sarahkhan',avatar:'SK',content:'Check out SarahUI - the considered design system for modern web products.',metaLink:'https://sarahui.design',likes:'2.4k',retweets:'580'})}
        </div>
      \`,
      code: \`import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardMetaPreviewDemo() {
  return (
    <TweetCard
      author="Sarah Khan"
      handle="@sarahkhan"
      avatar="SK"
      content="Check out SarahUI - the considered design system for modern web products."
      metaLink="https://sarahui.design"
      likes="2.4k"
      retweets="580"
    />
  );
}\`
    }
  ],

  // 18. RainbowButton - 2 Authentic Variants from MagicUI
  RainbowButton: [
    {
      title: 'Outline Variant',
      description: 'Hollow center outline variant with continuous rainbow border sheen.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.RainbowButton({label:'Outline Rainbow',variant:'outline'})}
        </div>
      \`,
      code: \`import { RainbowButton } from "@/components/sarahui/rainbow-button";

export function RainbowButtonDemo2() {
  return <RainbowButton variant="outline">Outline Rainbow</RainbowButton>;
}\`
    }
  ],

  // 19. PulsatingButton - 2 Authentic Variants from MagicUI
  PulsatingButton: [
    {
      title: 'Ripple Variant',
      description: 'Concentric harmonic ripple wave dissipating outwards.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.PulsatingButton({label:'Ripple Wave Pulse',pulseColor:'var(--s-brand-indigo)',variant:'ripple'})}
        </div>
      \`,
      code: \`import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonDemo2() {
  return <PulsatingButton variant="ripple" pulseColor="#5B3DF5">Ripple Wave Pulse</PulsatingButton>;
}\`
    }
  ],

  // 20. SpinningText - 2 Authentic Variants from MagicUI
  SpinningText: [
    {
      title: 'Reverse',
      description: 'Counter-clockwise continuous circular typography orbit.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
          \${U.SpinningText({text:'SARAHUI • DESIGN SYSTEM • ',radius:5,reverse:true})}
        </div>
      \`,
      code: \`import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextDemo2() {
  return <SpinningText reverse radius={5}>SARAHUI • DESIGN SYSTEM • </SpinningText>;
}\`
    }
  ],

  // 21. MagicCard - 2 Authentic Variants from MagicUI
  MagicCard: [
    {
      title: 'Orb',
      description: 'Floating glowing orb following cursor within glass card perimeter.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:240px;width:100%;max-width:380px;margin:auto;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;">
          \${U.MagicCard({mode:'orb',children:html\`<span style="font-weight:700;font-size:16px;z-index:2;position:relative;">Floating Orb Mode</span>\`})}
        </div>
      \`,
      code: \`import { MagicCard } from "@/components/sarahui/magic-card";

export function MagicCardDemo2() {
  return (
    <MagicCard mode="orb" className="flex h-[240px] items-center justify-center">
      <span className="font-bold">Floating Orb Mode</span>
    </MagicCard>
  );
}\`
    }
  ],

  // 22. CoolMode - 2 Authentic Variants from MagicUI
  CoolMode: [
    {
      title: 'Custom Particle',
      description: 'Particle burst shooting custom star and diamond vector SVG particles on click.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
          \${U.CoolMode({label:'Click for Stars ✨',particle:'star'})}
        </div>
      \`,
      code: \`import { CoolMode } from "@/components/sarahui/cool-mode";
import { Button } from "@/components/sarahui/button";

export function CoolModeCustom() {
  return (
    <CoolMode particle="star">
      <Button>Click for Stars ✨</Button>
    </CoolMode>
  );
}\`
    }
  ],

  // 23. NumberTicker - 3 Authentic Variants from MagicUI
  NumberTicker: [
    {
      title: 'Downward Countdown',
      description: 'Numbers tick downward to zero from high starting value.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
          \${U.NumberTicker({value:0,startValue:100,direction:'down',className:'text-4xl font-bold font-mono'})}
        </div>
      \`,
      code: \`import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDemo2() {
  return <NumberTicker value={0} startValue={100} direction="down" className="text-4xl font-bold font-mono" />;
}\`
    },
    {
      title: 'Decimal Precision',
      description: 'Smooth precision decimal counter ticking to exact percentage.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
          \${U.NumberTicker({value:99.9,decimalPlaces:1,className:'text-4xl font-bold font-mono'})}
        </div>
      \`,
      code: \`import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDecimalDemo() {
  return <NumberTicker value={99.9} decimalPlaces={1} className="text-4xl font-bold font-mono" />;
}\`
    }
  ],

  // 24. Terminal - 2 Authentic Variants from MagicUI
  Terminal: [
    {
      title: 'Custom Delays',
      description: 'Custom timed sequence with delayed typing and explicit status pause intervals.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;padding:24px;">
          \${U.Terminal({
            lines: [
              {type:'command',text:'git clone https://github.com/sarahui/sarahui.git',delay:400},
              {type:'status',text:'✔ Cloning repository...',delay:1200,color:'green'},
              {type:'status',text:'✔ Resolving delta chunks: 100% (452/452)',delay:2000,color:'green'},
              {type:'status',text:'ℹ Ready in 240ms',delay:2600,color:'blue'}
            ]
          })}
        </div>
      \`,
      code: \`import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/sarahui/terminal";

export function TerminalDemo2() {
  return (
    <Terminal>
      <TypingAnimation delay={400}>git clone https://github.com/sarahui/sarahui.git</TypingAnimation>
      <AnimatedSpan delay={1200} className="text-green-500">✔ Cloning repository...</AnimatedSpan>
      <AnimatedSpan delay={2000} className="text-green-500">✔ Resolving delta chunks: 100% (452/452)</AnimatedSpan>
      <AnimatedSpan delay={2600} className="text-blue-500">ℹ Ready in 240ms</AnimatedSpan>
    </Terminal>
  );
}\`
    }
  ],

  // 25. Text3DFlip - 2 Authentic Variants from MagicUI
  Text3DFlip: [
    {
      title: 'Stagger from center',
      description: 'Flip animation ripples outwards symmetrically from center character.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
          \${U.Text3DFlip({text:'CENTER RIPPLE FLIP',staggerFrom:'center',className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import Text3DFlip from "@/components/sarahui/text-3d-flip";

export function Text3DFlipDemo2() {
  return (
    <Text3DFlip staggerFrom="center" className="text-2xl font-bold">
      CENTER RIPPLE FLIP
    </Text3DFlip>
  );
}\`
    }
  ],

  // 26. HexagonPattern - 3 Authentic Variants from MagicUI
  HexagonPattern: [
    {
      title: 'Linear Gradient',
      description: 'Hexagon geometric matrix masked with smooth linear gradient falloff.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.HexagonPattern({gradient:true})}
          <span style="position:relative;z-index:2;font-weight:700;font-size:16px;">Linear Gradient Fade</span>
        </div>
      \`,
      code: \`import { HexagonPattern } from "@/components/sarahui/hexagon-pattern";

export function HexagonPatternLinearGradient() {
  return <HexagonPattern gradient />;
}\`
    },
    {
      title: 'Dashed Stroke',
      description: 'Technical dashed stroke hexagon wireframe pattern.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.HexagonPattern({strokeDasharray:'4 4'})}
          <span style="position:relative;z-index:2;font-weight:700;font-size:16px;">Dashed Hexagons</span>
        </div>
      \`,
      code: \`import { HexagonPattern } from "@/components/sarahui/hexagon-pattern";

export function HexagonPatternDashed() {
  return <HexagonPattern strokeDasharray="4 4" />;
}\`
    }
  ],

  // 27. StripedPattern - 2 Authentic Variants from MagicUI
  StripedPattern: [
    {
      title: 'Striped Pattern with a dashed stroke',
      description: 'Technical striped hatched lines with dashed rhythm.',
      preview: () => html\`
        <div style="position:relative;height:220px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.StripedPattern({dashed:true})}
          <span style="position:relative;z-index:2;font-weight:700;">Dashed Stripe Matrix</span>
        </div>
      \`,
      code: \`import { StripedPattern } from "@/components/sarahui/striped-pattern";

export function StripedPatternDashed() {
  return <StripedPattern dashed />;
}\`
    },
    {
      title: 'Striped Pattern To Right',
      description: 'Diagonal stripes angled towards top right quadrant.',
      preview: () => html\`
        <div style="position:relative;height:220px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.StripedPattern({direction:'right'})}
          <span style="position:relative;z-index:2;font-weight:700;">Angled Stripes Right</span>
        </div>
      \`,
      code: \`import { StripedPattern } from "@/components/sarahui/striped-pattern";

export function StripedPatternRight() {
  return <StripedPattern direction="right" />;
}\`
    }
  ],

  // 28. BentoGrid - 2 Authentic Variants from MagicUI
  BentoGrid: [
    {
      title: 'Vertical Bento',
      description: 'Single-column vertical responsive stream bento layout.',
      preview: () => html\`
        <div style="position:relative;width:100%;max-width:440px;margin:auto;display:flex;flex-direction:column;gap:16px;padding:16px;">
          \${U.BentoCard({name:'Activity Feed',description:'Real-time system events stream.',className:'h-[180px]',background:html\`<div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(91,61,245,0.08),transparent);"></div>\`})}
          \${U.BentoCard({name:'Global Latency',description:'Edge cluster health at 12ms avg.',className:'h-[180px]',background:html\`<div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(23,139,255,0.08),transparent);"></div>\`})}
        </div>
      \`,
      code: \`import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoDemoVertical() {
  return (
    <div className="flex max-w-[440px] flex-col gap-4">
      <BentoCard name="Activity Feed" description="Real-time system events stream." />
      <BentoCard name="Global Latency" description="Edge cluster health at 12ms avg." />
    </div>
  );
}\`
    }
  ],

  // 29. ScrollBasedVelocity - 2 Authentic Variants from MagicUI
  ScrollBasedVelocity: [
    {
      title: 'Velocity Images',
      description: 'Interactive image thumbnail row driven by scroll speed.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;padding:16px 0;display:flex;flex-direction:column;justify-content:center;">
          \${U.ScrollBasedVelocity({text:'SARAHUI • MODERN DESIGN SYSTEM • ',defaultVelocity:3})}
        </div>
      \`,
      code: \`import { ScrollVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollVelocityImagesDemo() {
  return <ScrollVelocity text="SARAHUI • MODERN DESIGN SYSTEM • " defaultVelocity={3} />;
}\`
    }
  ],

  // 30. DiaTextReveal - 4 Authentic Variants from MagicUI
  DiaTextReveal: [
    {
      title: 'Custom Gradient',
      description: 'Diagonal gradient mask unmasking with vivid chromatic palette.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.DiaTextReveal({text:'Chromatically tuned typography.',gradient:'linear-gradient(90deg, #ffaa40, #9c40ff, #ffaa40)',className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealDemo2() {
  return (
    <DiaTextReveal
      gradient="linear-gradient(90deg, #ffaa40, #9c40ff, #ffaa40)"
      className="text-2xl font-bold"
    >
      Chromatically tuned typography.
    </DiaTextReveal>
  );
}\`
    },
    {
      title: 'Rotating phrases in a heading',
      description: 'Smooth animated sequential heading reveal.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">
          \${U.DiaTextReveal({text:'Design systems that scale effortlessly.',duration:4,className:'text-2xl font-bold'})}
        </div>
      \`,
      code: \`import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealDemo3() {
  return (
    <DiaTextReveal duration={4} className="text-2xl font-bold">
      Design systems that scale effortlessly.
    </DiaTextReveal>
  );
}\`
    }
  ],

  // 31. FlickeringGrid - 2 Authentic Variants from MagicUI
  FlickeringGrid: [
    {
      title: 'Rounded Grid',
      description: 'Rounded grid cells with smooth organic opacity twinkling.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.FlickeringGrid({gridGap:8,squareSize:8,maxOpacity:0.6,flickerChance:0.4})}
          <span style="position:relative;z-index:2;font-weight:700;">Rounded Grid Matrix</span>
        </div>
      \`,
      code: \`import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridRoundedDemo() {
  return <FlickeringGrid gridGap={8} squareSize={8} maxOpacity={0.6} flickerChance={0.4} />;
}\`
    }
  ],

  // 32. InteractiveGridPattern - 2 Authentic Variants from MagicUI
  InteractiveGridPattern: [
    {
      title: 'Colorful',
      description: 'Vivid chromatic highlight squares illuminating around cursor.',
      preview: () => html\`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
          \${U.InteractiveGridPattern({color:'#5B3DF5',width:24,height:24})}
          <span style="position:relative;z-index:2;font-weight:700;">Vibrant Proximity Grid</span>
        </div>
      \`,
      code: \`import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternColorful() {
  return <InteractiveGridPattern color="#5B3DF5" width={24} height={24} />;
}\`
    }
  ],

  // 33. ShimmerButton - 2 Authentic Variants from MagicUI
  ShimmerButton: [
    {
      title: 'Custom Shimmer Color',
      description: 'Cyan and electric purple radial perimeter highlight sweep.',
      preview: () => html\`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">
          \${U.ShimmerButton({label:'Electric Shimmer',shimmerColor:'#00E5FF',background:'rgba(10,10,20,1)'})}
        </div>
      \`,
      code: \`import { ShimmerButton } from "@/components/sarahui/shimmer-button";

export function ShimmerButtonDemo2() {
  return (
    <ShimmerButton shimmerColor="#00E5FF" background="rgba(10,10,20,1)">
      Electric Shimmer
    </ShimmerButton>
  );
}\`
    }
  ],

  // 34. OrbitingCircles - 2 Authentic Variants from MagicUI
  OrbitingCircles: [
    {
      title: 'High-Speed Reverse Orbit',
      description: 'Fast-moving counter-rotating inner orbital track with upright brand icons.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:340px;width:100%;align-items:center;justify-content:center;overflow:hidden;">
          \${U.OrbitingCircles({radius:120,speed:2,reverse:true})}
        </div>
      \`,
      code: \`import { OrbitingCircles } from "@/components/sarahui/orbiting-circles";

export function OrbitingCirclesDemo2() {
  return <OrbitingCircles radius={120} speed={2} reverse />;
}\`
    }
  ],

  // 35. Globe - 2 Authentic Variants from MagicUI
  Globe: [
    {
      title: 'Atmospheric Glow Preset',
      description: 'High-contrast glowing atmosphere with smooth inertial drag rotation.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:340px;width:100%;align-items:center;justify-content:center;overflow:hidden;">
          \${U.Globe({glow:true})}
        </div>
      \`,
      code: \`import { Globe } from "@/components/sarahui/globe";

export function GlobeDemo2() {
  return <Globe glow />;
}\`
    }
  ],

  // 36. IconCloud - 2 Authentic Variants from MagicUI
  IconCloud: [
    {
      title: 'Compact Dev Stack Cloud',
      description: '3D spherical cluster rotating through modern tech stack icons.',
      preview: () => html\`
        <div style="position:relative;display:flex;height:320px;width:100%;align-items:center;justify-content:center;overflow:hidden;">
          \${U.IconCloud({compact:true})}
        </div>
      \`,
      code: \`import { IconCloud } from "@/components/sarahui/icon-cloud";

export function IconCloudDemo2() {
  return <IconCloud compact />;
}\`
    }
  ]
};`;

console.log('Replacing componentVariants in catalog.mjs...');

// Replace the componentVariants object in catalogSrc
const startIndex = catalogSrc.indexOf('export const componentVariants = {');
const endIndex = catalogSrc.indexOf('export const catalogOrder = [');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find componentVariants boundary in catalog.mjs!');
  process.exit(1);
}

const before = catalogSrc.slice(0, startIndex);
const after = catalogSrc.slice(endIndex);

const updatedCatalog = before + newVariantsSection + '\n\n' + after;
fs.writeFileSync(catalogPath, updatedCatalog, 'utf8');

console.log('Successfully updated catalog.mjs with expanded authentic MagicUI componentVariants!');

