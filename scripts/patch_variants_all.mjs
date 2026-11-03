import fs from 'node:fs';

const catalogPath = 'apps/docs/catalog.mjs';
let content = fs.readFileSync(catalogPath, 'utf8');

// Let's import the file dynamically to get existing variants
import('../apps/docs/catalog.mjs').then(async (mod) => {
  const existing = mod.componentVariants;
  console.log(`Currently has ${Object.keys(existing).length} componentVariants keys.`);

  // Let's verify our additions
  const patches = {
    AnimatedThemeToggler: [
      {
        title: 'Square',
        description: 'Square expanding clip-path transition with View Transitions API.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'square'})}<span class="s-small s-muted">Click the sun/moon icon to trigger square transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerSquareDemo() {\n  return <AnimatedThemeToggler shape="square" />;\n}`
      },
      {
        title: 'Diamond',
        description: 'Diamond expanding clip-path transition.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'diamond'})}<span class="s-small s-muted">Click the sun/moon icon to trigger diamond transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerDiamondDemo() {\n  return <AnimatedThemeToggler shape="diamond" />;\n}`
      },
      {
        title: 'Rectangle',
        description: 'Horizontal rectangle split transition effect.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'rectangle'})}<span class="s-small s-muted">Click to trigger rectangle transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerRectangleDemo() {\n  return <AnimatedThemeToggler shape="rectangle" />;\n}`
      },
      {
        title: 'Hexagon',
        description: 'Geometric hexagon polygon clip-path reveal.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'hexagon'})}<span class="s-small s-muted">Click to trigger hexagon transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerHexagonDemo() {\n  return <AnimatedThemeToggler shape="hexagon" />;\n}`
      },
      {
        title: 'Triangle',
        description: 'Triangular angular polygon mask sweep.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'triangle'})}<span class="s-small s-muted">Click to trigger triangle transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerTriangleDemo() {\n  return <AnimatedThemeToggler shape="triangle" />;\n}`
      },
      {
        title: 'Star',
        description: '10-point star burst clip-path reveal.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;">${U.AnimatedThemeToggler({shape:'star'})}<span class="s-small s-muted">Click to trigger star transition</span></div>`,
        code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";\n\nexport function AnimatedThemeTogglerStarDemo() {\n  return <AnimatedThemeToggler shape="star" />;\n}`
      }
    ],

    Confetti: [
      {
        title: 'Basic Cannon',
        description: 'Classic single blast confetti explosion from screen center.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">${U.Confetti({label:'Trigger Confetti',mode:'basic'})}</div>`,
        code: `import { ConfettiButton } from "@/components/sarahui/confetti";\n\nexport function ConfettiBasicCannon() {\n  return <ConfettiButton>Trigger Confetti</ConfettiButton>;\n}`
      },
      {
        title: 'Fireworks',
        description: 'Multi-burst continuous fireworks display with random colors.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">${U.Confetti({label:'Launch Fireworks',mode:'fireworks'})}</div>`,
        code: `import { ConfettiButton } from "@/components/sarahui/confetti";\n\nexport function ConfettiFireworks() {\n  return (\n    <ConfettiButton\n      options={{\n        get count() { return 200; },\n      }}\n    >\n      Launch Fireworks\n    </ConfettiButton>\n  );\n}`
      },
      {
        title: 'Side Cannons',
        description: 'Synchronized diagonal cannons shooting from both left and right screen edges.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">${U.Confetti({label:'Fire Side Cannons',mode:'side'})}</div>`,
        code: `import { ConfettiButton } from "@/components/sarahui/confetti";\n\nexport function ConfettiSideCannons() {\n  return <ConfettiButton>Fire Side Cannons</ConfettiButton>;\n}`
      },
      {
        title: 'Stars',
        description: 'Particle burst using geometric gold star shapes.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">${U.Confetti({label:'Star Shower',mode:'stars'})}</div>`,
        code: `import { ConfettiButton } from "@/components/sarahui/confetti";\n\nexport function ConfettiStars() {\n  return (\n    <ConfettiButton\n      options={{\n        shapes: ["star"],\n        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],\n      }}\n    >\n      Star Shower\n    </ConfettiButton>\n  );\n}`
      },
      {
        title: 'Emoji',
        description: 'Playful confetti burst shooting animated emoji characters.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;">${U.Confetti({label:'Emoji Explosion 🦄',mode:'emoji'})}</div>`,
        code: `import { ConfettiButton } from "@/components/sarahui/confetti";\n\nexport function ConfettiEmoji() {\n  return (\n    <ConfettiButton\n      options={{\n        emojis: ["🦄", "✨", "💫", "🚀", "🎉"],\n      }}\n    >\n      Emoji Explosion 🦄\n    </ConfettiButton>\n  );\n}`
      }
    ],

    TextAnimate: [
      {
        title: 'Blur In by Text',
        description: 'Smooth blur-in unmasking applied across entire headline block.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">${U.TextAnimate({text:'Transform your product design with precision.',animation:'blurIn',by:'text',className:'text-2xl font-bold'})}</div>`,
        code: `import { TextAnimate } from "@/components/sarahui/text-animate";\n\nexport function TextAnimateDemo() {\n  return (\n    <TextAnimate animation="blurIn" by="text" className="text-2xl font-bold">\n      Transform your product design with precision.\n    </TextAnimate>\n  );\n}`
      },
      {
        title: 'Slide Up by Word',
        description: 'Staggered vertical translation ascending word by word.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">${U.TextAnimate({text:'Every component crafted with purpose.',animation:'slideUp',by:'word',className:'text-2xl font-bold'})}</div>`,
        code: `import { TextAnimate } from "@/components/sarahui/text-animate";\n\nexport function TextAnimateDemo2() {\n  return (\n    <TextAnimate animation="slideUp" by="word" className="text-2xl font-bold">\n      Every component crafted with purpose.\n    </TextAnimate>\n  );\n}`
      },
      {
        title: 'Scale Up by Text',
        description: 'Dynamic scale spring entrance expanding from center.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">${U.TextAnimate({text:'Interactive physics at 60 FPS.',animation:'scaleUp',by:'text',className:'text-2xl font-bold'})}</div>`,
        code: `import { TextAnimate } from "@/components/sarahui/text-animate";\n\nexport function TextAnimateDemo3() {\n  return (\n    <TextAnimate animation="scaleUp" by="text" className="text-2xl font-bold">\n      Interactive physics at 60 FPS.\n    </TextAnimate>\n  );\n}`
      },
      {
        title: 'Fade In by Line',
        description: 'Clean staggered opacity unmasking applied per line of text.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">${U.TextAnimate({text:'Minimal zero-runtime dependencies.\\nNative Web APIs and pure CSS.',animation:'fadeIn',by:'line',className:'text-xl font-medium text-center'})}</div>`,
        code: `import { TextAnimate } from "@/components/sarahui/text-animate";\n\nexport function TextAnimateDemo4() {\n  return (\n    <TextAnimate animation="fadeIn" by="line" className="text-xl font-medium">\n      Minimal zero-runtime dependencies.\n      Native Web APIs and pure CSS.\n    </TextAnimate>\n  );\n}`
      },
      {
        title: 'Slide Left by Character',
        description: 'High-frequency character-by-character horizontal stagger reveal.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:160px;padding:24px;">${U.TextAnimate({text:'PRECISION TYPOGRAPHY',animation:'slideLeft',by:'character',className:'text-xl font-bold tracking-widest'})}</div>`,
        code: `import { TextAnimate } from "@/components/sarahui/text-animate";\n\nexport function TextAnimateDemo5() {\n  return (\n    <TextAnimate animation="slideLeft" by="character" className="text-xl font-bold tracking-widest">\n      PRECISION TYPOGRAPHY\n    </TextAnimate>\n  );\n}`
      }
    ],

    TypingAnimation: [
      {
        title: 'Multiple Words with Loop',
        description: 'Rotates through a list of phrases typing and deleting seamlessly.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">${U.TypingAnimation({words:['Build modern web apps.','Ship beautiful UIs.','Design with clarity.'],duration:80,className:'text-2xl font-bold'})}</div>`,
        code: `import { TypingAnimation } from "@/components/sarahui/typing-animation";\n\nexport function TypingAnimationDemo2() {\n  return (\n    <TypingAnimation\n      words={["Build modern web apps.", "Ship beautiful UIs.", "Design with clarity."]}\n      duration={80}\n      className="text-2xl font-bold"\n    />\n  );\n}`
      },
      {
        title: 'Custom Speed',
        description: 'Ultra-fast 20ms typing cadence for interactive terminal logs.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">${U.TypingAnimation({text:'pnpm add sarahui @sarahui/tokens',duration:20,className:'font-mono text-lg'})}</div>`,
        code: `import { TypingAnimation } from "@/components/sarahui/typing-animation";\n\nexport function TypingAnimationDemo3() {\n  return (\n    <TypingAnimation\n      duration={20}\n      className="font-mono text-lg"\n    >\n      pnpm add sarahui @sarahui/tokens\n    </TypingAnimation>\n  );\n}`
      },
      {
        title: 'Without Cursor',
        description: 'Smooth text typing animation with cursor hidden.',
        preview: () => html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;padding:24px;">${U.TypingAnimation({text:'Clean headline animation without cursor.',showCursor:false,className:'text-xl font-semibold'})}</div>`,
        code: `import { TypingAnimation } from "@/components/sarahui/typing-animation";\n\nexport function TypingAnimationDemo5() {\n  return (\n    <TypingAnimation\n      showCursor={false}\n      className="text-xl font-semibold"\n    >\n      Clean headline animation without cursor.\n    </TypingAnimation>\n  );\n}`
      }
    ],

    AnimatedBeam: [
      {
        title: 'Animated Beam Uni-Directional',
        description: 'One-way curved laser transmission between client and cloud server.',
        preview: () => html`<div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">${U.AnimatedBeam({mode:'unidirectional'})}</div>`,
        code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";\n\nexport function AnimatedBeamUniDirectional() {\n  return <AnimatedBeam mode="unidirectional" />;\n}`
      },
      {
        title: 'Animated Beam Bi-Directional',
        description: 'Concurrent bidirectional transmission streams passing each other.',
        preview: () => html`<div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">${U.AnimatedBeam({mode:'bidirectional'})}</div>`,
        code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";\n\nexport function AnimatedBeamBiDirectional() {\n  return <AnimatedBeam mode="bidirectional" />;\n}`
      },
      {
        title: 'Animated Beam Multiple Inputs',
        description: 'Multiple input source nodes converging simultaneously into a central pipeline processor.',
        preview: () => html`<div style="position:relative;display:flex;height:280px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">${U.AnimatedBeam({mode:'multiple-inputs'})}</div>`,
        code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";\n\nexport function AnimatedBeamMultipleInputs() {\n  return <AnimatedBeam mode="multiple-inputs" />;\n}`
      },
      {
        title: 'Animated Beam Multiple Outputs',
        description: 'Single upstream trigger branching out to multiple downstream consumer endpoints.',
        preview: () => html`<div style="position:relative;display:flex;height:280px;width:100%;align-items:center;justify-content:center;overflow:hidden;padding:24px;">${U.AnimatedBeam({mode:'multiple-outputs'})}</div>`,
        code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";\n\nexport function AnimatedBeamMultipleOutputs() {\n  return <AnimatedBeam mode="multiple-outputs" />;\n}`
      }
    ]
  };

  console.log('Patches prepared.');
});

