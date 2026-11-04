/**
 * Component usage snippets for sarahUI.
 * Consistent import from 'sarahui' matching installation & clean JSX composition.
 */
export const componentUsages = {
  "Icon": {
    "import": "import { Icon } from 'sarahui';",
    "usage": "<Icon name=\"spark\" size={24} />"
  },
  "Button": {
    "import": "import { Button } from 'sarahui';",
    "usage": "<Button variant=\"primary\">Button</Button>"
  },
  "IconButton": {
    "import": "import { IconButton } from 'sarahui';",
    "usage": "<IconButton icon=\"heart\" label=\"Save to favorites\" variant=\"outline\" />"
  },
  "ButtonGroup": {
    "import": "import { ButtonGroup } from 'sarahui';",
    "usage": "<ButtonGroup>\n  <Button variant=\"outline\">Preview</Button>\n  <Button variant=\"outline\">Code</Button>\n</ButtonGroup>"
  },
  "Input": {
    "import": "import { Input } from 'sarahui';",
    "usage": "<Input type=\"email\" placeholder=\"Email\" />"
  },
  "Textarea": {
    "import": "import { Textarea } from 'sarahui';",
    "usage": "<Textarea placeholder=\"Type your message here.\" />"
  },
  "Select": {
    "import": "import { Select } from 'sarahui';",
    "usage": "<Select options={[\"Option 1\", \"Option 2\"]} placeholder=\"Select an option\" />"
  },
  "Checkbox": {
    "import": "import { Checkbox } from 'sarahui';",
    "usage": "<Checkbox id=\"terms\" label=\"Accept terms and conditions\" />"
  },
  "Radio": {
    "import": "import { Radio } from 'sarahui';",
    "usage": "<Radio name=\"plan\" value=\"pro\" label=\"Pro Plan\" />"
  },
  "Switch": {
    "import": "import { Switch } from 'sarahui';",
    "usage": "<Switch id=\"airplane-mode\" label=\"Airplane Mode\" />"
  },
  "Slider": {
    "import": "import { Slider } from 'sarahui';",
    "usage": "<Slider defaultValue={[50]} max={100} step={1} />"
  },
  "Badge": {
    "import": "import { Badge } from 'sarahui';",
    "usage": "<Badge variant=\"outline\">Badge</Badge>"
  },
  "Chip": {
    "import": "import { Chip } from 'sarahui';",
    "usage": "<Chip label=\"Design System\" selected removable />"
  },
  "Avatar": {
    "import": "import { Avatar } from 'sarahui';",
    "usage": "<Avatar name=\"Sarah Khan\" size=\"lg\" />"
  },
  "Card": {
    "import": "import { Card } from 'sarahui';",
    "usage": "<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n</Card>"
  },
  "Alert": {
    "import": "import { Alert } from 'sarahui';",
    "usage": "<Alert title=\"Heads up!\" description=\"You can add components to your app using the cli.\" />"
  },
  "Tabs": {
    "import": "import { Tabs } from 'sarahui';",
    "usage": "<Tabs items={[\n  { label: \"Account\", content: \"Make changes to your account here.\" },\n  { label: \"Password\", content: \"Change your password here.\" }\n]} />"
  },
  "Breadcrumb": {
    "import": "import { Breadcrumb } from 'sarahui';",
    "usage": "<Breadcrumb items={[\n  { label: \"Home\", href: \"/\" },\n  { label: \"Components\", href: \"/components\" },\n  { label: \"Breadcrumb\" }\n]} />"
  },
  "Pagination": {
    "import": "import { Pagination } from 'sarahui';",
    "usage": "<Pagination pages={10} current={1} />"
  },
  "NavItem": {
    "import": "import { NavItem } from 'sarahui';",
    "usage": "<NavItem href=\"/dashboard\" icon=\"folder\" label=\"Dashboard\" active />"
  },
  "DataTable": {
    "import": "import { DataTable } from 'sarahui';",
    "usage": "<DataTable columns={[\n  { key: \"name\", label: \"Name\" },\n  { key: \"status\", label: \"Status\" }\n]} rows={[\n  { id: \"1\", name: \"Project Alpha\", status: \"Active\" }\n]} />"
  },
  "Accordion": {
    "import": "import { Accordion } from 'sarahui';",
    "usage": "<Accordion items={[\n  { title: \"Is it accessible?\", content: \"Yes. It adheres to the WAI-ARIA design pattern.\" }\n]} />"
  },
  "Dialog": {
    "import": "import { Dialog } from 'sarahui';",
    "usage": "<Dialog title=\"Edit profile\" description=\"Make changes to your profile here.\">\n  <p>Dialog content</p>\n</Dialog>"
  },
  "Tooltip": {
    "import": "import { Tooltip } from 'sarahui';",
    "usage": "<Tooltip text=\"Add to library\">\n  <span>Hover me</span>\n</Tooltip>"
  },
  "Progress": {
    "import": "import { Progress } from 'sarahui';",
    "usage": "<Progress value={33} />"
  },
  "Skeleton": {
    "import": "import { Skeleton } from 'sarahui';",
    "usage": "<Skeleton className=\"h-4 w-[250px]\" />"
  },
  "EmptyState": {
    "import": "import { EmptyState } from 'sarahui';",
    "usage": "<EmptyState title=\"No projects found\" description=\"Get started by creating a new project.\" />"
  },
  "Separator": {
    "import": "import { Separator } from 'sarahui';",
    "usage": "<Separator />"
  },
  "Spinner": {
    "import": "import { Spinner } from 'sarahui';",
    "usage": "<Spinner label=\"Loading...\" />"
  },
  "Toast": {
    "import": "import { Toast } from 'sarahui';",
    "usage": "toast(\"Event has been created.\", {\n  description: \"Sunday, December 03, 2023 at 9:00 AM\"\n})"
  },
  "Menu": {
    "import": "import { Menu } from 'sarahui';",
    "usage": "<Menu items={[\n  { label: \"Profile\", value: \"profile\" },\n  { label: \"Billing\", value: \"billing\" },\n  { label: \"Logout\", value: \"logout\", danger: true }\n]} />"
  },
  "CommandPalette": {
    "import": "import { CommandPalette } from 'sarahui';",
    "usage": "<CommandPalette items={[\n  { label: \"Suggestions\", items: [{ label: \"Calendar\" }, { label: \"Search Emoji\" }] }\n]} />"
  },
  "Toggle": {
    "import": "import { Toggle } from 'sarahui';",
    "usage": "<Toggle aria-label=\"Toggle italic\">\n  <Italic className=\"h-4 w-4\" />\n</Toggle>"
  },
  "ToggleGroup": {
    "import": "import { ToggleGroup } from 'sarahui';",
    "usage": "<ToggleGroup type=\"single\" items={[\n  { label: \"Bold\", value: \"bold\" },\n  { label: \"Italic\", value: \"italic\" }\n]} />"
  },
  "Kbd": {
    "import": "import { Kbd } from 'sarahui';",
    "usage": "<Kbd keys={[\"⌘\", \"K\"]} />"
  },
  "AspectRatio": {
    "import": "import { AspectRatio } from 'sarahui';",
    "usage": "<AspectRatio ratio={16 / 9}>\n  <img src=\"...\" alt=\"Image\" className=\"rounded-md object-cover\" />\n</AspectRatio>"
  },
  "BentoGrid": {
    "import": "import { BentoGrid } from 'sarahui';",
    "usage": "<BentoGrid>\n  <BentoCard />\n</BentoGrid>"
  },
  "Drawer": {
    "import": "import { Drawer } from 'sarahui';",
    "usage": "<Drawer title=\"Drawer Title\" description=\"Drawer Description\">\n  <div>Content</div>\n</Drawer>"
  },
  "Popover": {
    "import": "import { Popover } from 'sarahui';",
    "usage": "<Popover trigger={<Button>Open</Button>} content={<div>Popover Content</div>} />"
  },
  "Marquee": {
    "import": "import { Marquee } from 'sarahui';",
    "usage": "<Marquee>\n  <span>Next.js</span>\n  <span>React</span>\n  <span>TypeScript</span>\n  <span>Tailwind CSS</span>\n</Marquee>"
  },
  "BorderBeam": {
    "import": "import { BorderBeam } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <BorderBeam />\n</div>"
  },
  "AnimatedShinyText": {
    "import": "import { AnimatedShinyText } from 'sarahui';",
    "usage": "<AnimatedShinyText>Hello</AnimatedShinyText>"
  },
  "NumberTicker": {
    "import": "import { NumberTicker } from 'sarahui';",
    "usage": "<NumberTicker value={100} />"
  },
  "Ripple": {
    "import": "import { Ripple } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <Ripple />\n</div>"
  },
  "RetroGrid": {
    "import": "import { RetroGrid } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <RetroGrid />\n</div>"
  },
  "ShineBorder": {
    "import": "import { ShineBorder } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <ShineBorder />\n</div>"
  },
  "Meteors": {
    "import": "import { Meteors } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <Meteors />\n</div>"
  },
  "Particles": {
    "import": "import { Particles } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <Particles />\n</div>"
  },
  "Confetti": {
    "import": "import { Confetti } from 'sarahui';",
    "usage": "import { useRef } from \"react\"\nimport { Confetti } from 'sarahui'\n\nexport function ConfettiDemo() {\n  const confettiRef = useRef(null)\n\n  return (\n    <div>\n      <Confetti ref={confettiRef} manualstart />\n      <button onClick={() => confettiRef.current?.fire()}>\n        Trigger Confetti\n      </button>\n    </div>\n  )\n}"
  },
  "MagicCard": {
    "import": "import { MagicCard } from 'sarahui';",
    "usage": "<MagicCard>\n  <div className=\"p-4\">\n    <p>Hello World</p>\n    <span>Hover me</span>\n  </div>\n</MagicCard>"
  },
  "TypingAnimation": {
    "import": "import { TypingAnimation } from 'sarahui';",
    "usage": "<TypingAnimation>Hello World! 👋</TypingAnimation>"
  },
  "WordRotate": {
    "import": "import { WordRotate } from 'sarahui';",
    "usage": "<WordRotate words={[\"Word\", \"Rotate\"]} />"
  },
  "BlurFade": {
    "import": "import { BlurFade } from 'sarahui';",
    "usage": "<BlurFade>\n  <img src=\"https://picsum.photos/300/200?random=1\" alt=\"Sample 1\" />\n  <img src=\"https://picsum.photos/300/200?random=2\" alt=\"Sample 2\" />\n  <img src=\"https://picsum.photos/300/200?random=3\" alt=\"Sample 3\" />\n</BlurFade>"
  },
  "ShimmerButton": {
    "import": "import { ShimmerButton } from 'sarahui';",
    "usage": "<ShimmerButton>Shimmer Button</ShimmerButton>"
  },
  "RainbowButton": {
    "import": "import { RainbowButton } from 'sarahui';",
    "usage": "<RainbowButton>Rainbow Button</RainbowButton>"
  },
  "Dock": {
    "import": "import { Dock } from 'sarahui';",
    "usage": "<Dock>\n  <DockIcon>\n    <Home />\n  </DockIcon>\n  <DockIcon>\n    <Settings />\n  </DockIcon>\n  <DockIcon>\n    <Search />\n  </DockIcon>\n</Dock>"
  },
  "AvatarCircles": {
    "import": "import { AvatarCircles } from 'sarahui';",
    "usage": "<AvatarCircles\n  numPeople={99}\n  avatarUrls={[\n    {\n      imageUrl: \"https://avatars.githubusercontent.com/u/16860528\",\n      profileUrl: \"https://github.com/sarahui\",\n    },\n  ]}\n/>"
  },
  "AnimatedBeam": {
    "import": "import { AnimatedBeam } from 'sarahui';",
    "usage": "<AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />"
  },
  "Terminal": {
    "import": "import { Terminal } from 'sarahui';",
    "usage": "<Terminal>\n  <TypingAnimation>npx sarahui init</TypingAnimation>\n  <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>\n  <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>\n  <TypingAnimation>Success! Project initialization completed.</TypingAnimation>\n</Terminal>"
  },
  "OrbitingCircles": {
    "import": "import { OrbitingCircles } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <OrbitingCircles>\n    <File />\n    <Settings />\n    <File />\n  </OrbitingCircles>\n  <OrbitingCircles radius={100} reverse>\n    <File />\n    <Settings />\n    <File />\n    <Search />\n  </OrbitingCircles>\n</div>"
  },
  "Globe": {
    "import": "import { Globe } from 'sarahui';",
    "usage": "<Globe />"
  },
  "AnimatedList": {
    "import": "import { AnimatedList } from 'sarahui';",
    "usage": "<AnimatedList>\n  <p>Item 1</p>\n  <p>Item 2</p>\n  <p>Item 3</p>\n</AnimatedList>"
  },
  "InteractiveHoverButton": {
    "import": "import { InteractiveHoverButton } from 'sarahui';",
    "usage": "<InteractiveHoverButton>Interactive Hover Button</InteractiveHoverButton>"
  },
  "PulsatingButton": {
    "import": "import { PulsatingButton } from 'sarahui';",
    "usage": "<PulsatingButton>Pulsating Button</PulsatingButton>"
  },
  "SparklesText": {
    "import": "import { SparklesText } from 'sarahui';",
    "usage": "<SparklesText>Sparkles Text</SparklesText>"
  },
  "TextReveal": {
    "import": "import { TextReveal } from 'sarahui';",
    "usage": "<TextReveal>SarahUI will change the way you design.</TextReveal>"
  },
  "GridPattern": {
    "import": "import { GridPattern } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <GridPattern />\n</div>"
  },
  "DotPattern": {
    "import": "import { DotPattern } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <DotPattern />\n</div>"
  },
  "AnimatedGridPattern": {
    "import": "import { AnimatedGridPattern } from 'sarahui';",
    "usage": "<AnimatedGridPattern />"
  },
  "FlickeringGrid": {
    "import": "import { FlickeringGrid } from 'sarahui';",
    "usage": "<FlickeringGrid />"
  },
  "WarpBackground": {
    "import": "import { WarpBackground } from 'sarahui';",
    "usage": "<WarpBackground>\n  <div className=\"w-80\">\n    <p>Warp Background</p>\n    <p>This is a component that creates a warp background effect.</p>\n  </div>\n</WarpBackground>"
  },
  "NeonGradientCard": {
    "import": "import { NeonGradientCard } from 'sarahui';",
    "usage": "<NeonGradientCard>\n  <div className=\"p-4\">\n    <p>Hello</p>\n    <span>Hover me</span>\n  </div>\n</NeonGradientCard>"
  },
  "CoolMode": {
    "import": "import { CoolMode } from 'sarahui';",
    "usage": "<CoolMode>\n  <button>Click me</button>\n</CoolMode>"
  },
  "ScrollProgress": {
    "import": "import { ScrollProgress } from 'sarahui';",
    "usage": "<ScrollProgress />"
  },
  "ProgressiveBlur": {
    "import": "import { ProgressiveBlur } from 'sarahui';",
    "usage": "<div className=\"relative h-[400px] w-full overflow-auto\">\n  {/* Your scrollable content */}\n  <div className=\"space-y-4 p-4\">{/* Content items */}</div>\n\n  <ProgressiveBlur height=\"50%\" position=\"bottom\" />\n</div>"
  },
  "HyperText": {
    "import": "import { HyperText } from 'sarahui';",
    "usage": "<HyperText>Hover me</HyperText>"
  },
  "MorphingText": {
    "import": "import { MorphingText } from 'sarahui';",
    "usage": "<MorphingText texts={[\"Hello\", \"World\"]} />"
  },
  "AnimatedGradientText": {
    "import": "import { AnimatedGradientText } from 'sarahui';",
    "usage": "<AnimatedGradientText>Animated Gradient Text</AnimatedGradientText>"
  },
  "LineShadowText": {
    "import": "import { LineShadowText } from 'sarahui';",
    "usage": "<LineShadowText>SarahUI</LineShadowText>"
  },
  "AuroraText": {
    "import": "import { AuroraText } from 'sarahui';",
    "usage": "<AuroraText>Aurora Text</AuroraText>"
  },
  "Sheet": {
    "import": "import { Sheet } from 'sarahui';",
    "usage": "<Sheet title=\"Edit profile\" description=\"Make changes to your profile here.\">\n  <div>Sheet content</div>\n</Sheet>"
  },
  "ContextMenu": {
    "import": "import { ContextMenu } from 'sarahui';",
    "usage": "<ContextMenu trigger={<div>Right click here</div>} items={[\n  { label: \"Back\" },\n  { label: \"Forward\" },\n  { label: \"Reload\" }\n]} />"
  },
  "HoverCard": {
    "import": "import { HoverCard } from 'sarahui';",
    "usage": "<HoverCard trigger={<Button variant=\"link\">@nextjs</Button>}>\n  <p>The React Framework – created and maintained by @vercel.</p>\n</HoverCard>"
  },
  "Collapsible": {
    "import": "import { Collapsible } from 'sarahui';",
    "usage": "<Collapsible title=\"Can I use this with any framework?\">\n  Yes! sarahUI uses standard Web APIs.\n</Collapsible>"
  },
  "Android": {
    "import": "import { Android } from 'sarahui';",
    "usage": "<Android />"
  },
  "Iphone": {
    "import": "import { Iphone } from 'sarahui';",
    "usage": "<Iphone />"
  },
  "Safari": {
    "import": "import { Safari } from 'sarahui';",
    "usage": "<Safari url=\"https://sarahui.dev\" />"
  },
  "GlareHover": {
    "import": "import { GlareHover } from 'sarahui';",
    "usage": "<GlareHover className=\"rounded-lg\">\n  <Card>\n    <CardContent>\n      <CardTitle>Hello World</CardTitle>\n      <CardDescription>Hover to see the glare sweep</CardDescription>\n    </CardContent>\n  </Card>\n</GlareHover>"
  },
  "Backlight": {
    "import": "import { Backlight } from 'sarahui';",
    "usage": "<Backlight>\n  <img src=\"https://some-url/image.png\" />\n</Backlight>"
  },
  "Floating3DParticles": {
    "import": "import { Floating3DParticles } from 'sarahui';",
    "usage": "<div className=\"relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border\">\n  <Floating3DParticles color=\"#8B5CF6\" quantity={400} />\n  <div className=\"relative z-10 text-center\">\n    <h2 className=\"text-3xl font-bold\">Build Something Magical</h2>\n  </div>\n</div>"
  },
  "LightRays": {
    "import": "import { LightRays } from 'sarahui';",
    "usage": "<div className=\"relative h-[400px] w-full overflow-hidden rounded-xl border\">\n  <LightRays />\n</div>"
  },
  "AnimatedThemeToggler": {
    "import": "import { AnimatedThemeToggler } from 'sarahui';",
    "usage": "<AnimatedThemeToggler />"
  },
  "ComicText": {
    "import": "import { ComicText } from 'sarahui';",
    "usage": "<ComicText>Comic Text</ComicText>"
  },
  "KineticText": {
    "import": "import { KineticText } from 'sarahui';",
    "usage": "<KineticText text=\"some text\" />"
  },
  "DiaTextReveal": {
    "import": "import { DiaTextReveal } from 'sarahui';",
    "usage": "<DiaTextReveal text=\"SarahUI\" />"
  },
  "SpinningText": {
    "import": "import { SpinningText } from 'sarahui';",
    "usage": "<SpinningText>learn more • earn more • grow more •</SpinningText>"
  },
  "Text3DFlip": {
    "import": "import { Text3DFlip } from 'sarahui';",
    "usage": "<Text3DFlip\n  className=\"bg-background\"\n  textClassName=\"bg-background text-foreground\"\n  flipTextClassName=\"bg-background text-foreground\"\n  rotateDirection=\"top\"\n>\n  Stay hungry, stay foolish\n</Text3DFlip>"
  },
  "TextAnimate": {
    "import": "import { TextAnimate } from 'sarahui';",
    "usage": "<TextAnimate animation=\"blurInUp\" by=\"word\">\n  Blur in by word\n</TextAnimate>"
  },
  "VideoText": {
    "import": "import { VideoText } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <VideoText src=\"assets/ocean.webm\">OCEAN</VideoText>\n</div>"
  },
  "Highlighter": {
    "import": "import { Highlighter } from 'sarahui';",
    "usage": "<p>\n  The{\" \"}\n  <Highlighter action=\"underline\" color=\"#FF9800\">\n    SarahUI Highlighter\n  </Highlighter>{\" \"}\n  makes important{\" \"}\n  <Highlighter action=\"highlight\" color=\"#87CEFA\">\n    text stand out\n  </Highlighter>{\" \"}\n  effortlessly.\n</p>"
  },
  "ScrollBasedVelocity": {
    "import": "import { ScrollBasedVelocity } from 'sarahui';",
    "usage": "<ScrollVelocityContainer className=\"text-4xl font-bold md:text-7xl\">\n  <ScrollVelocityRow baseVelocity={20} direction={1}>\n    Velocity Scroll\n  </ScrollVelocityRow>\n  <ScrollVelocityRow baseVelocity={20} direction={-1}>\n    Velocity Scroll\n  </ScrollVelocityRow>\n</ScrollVelocityContainer>"
  },
  "AnimatedSubscribeButton": {
    "import": "import { AnimatedSubscribeButton } from 'sarahui';",
    "usage": "<AnimatedSubscribeButton\n  buttonColor=\"#000000\"\n  buttonTextColor=\"#ffffff\"\n  subscribeStatus={false}\n  initialText=\"Subscribe\"\n  changeText=\"Subscribed ✓\"\n/>"
  },
  "ShinyButton": {
    "import": "import { ShinyButton } from 'sarahui';",
    "usage": "<ShinyButton>Shiny Button</ShinyButton>"
  },
  "RippleButton": {
    "import": "import { RippleButton } from 'sarahui';",
    "usage": "<RippleButton>Ripple Button</RippleButton>"
  },
  "CodeComparison": {
    "import": "import { CodeComparison } from 'sarahui';",
    "usage": "<CodeComparison beforeCode={beforeCode} afterCode={afterCode} />"
  },
  "FileTree": {
    "import": "import { FileTree } from 'sarahui';",
    "usage": "const elements: TreeViewElement[] = [\n  {\n    id: \"src\",\n    type: \"folder\",\n    name: \"src\",\n    children: [\n      { id: \"components\", type: \"folder\", name: \"components\" },\n      { id: \"app\", type: \"folder\", name: \"app\" },\n      { id: \"page\", name: \"page.tsx\" },\n      { id: \"layout\", name: \"layout.tsx\" },\n    ],\n  },\n]\n\n<FileTree tree={elements} />"
  },
  "HeroVideoDialog": {
    "import": "import { HeroVideoDialog } from 'sarahui';",
    "usage": "<HeroVideoDialog\n  className=\"block dark:hidden\"\n  animationStyle=\"from-center\"\n  videoSrc=\"https://www.example.com/dummy-video\"\n  thumbnailSrc=\"https://www.example.com/dummy-thumbnail.png\"\n  thumbnailAlt=\"Dummy Video Thumbnail\"\n/>"
  },
  "IconCloud": {
    "import": "import { IconCloud } from 'sarahui';",
    "usage": "<div className=\"relative overflow-hidden\">\n  <IconCloud images={images} />\n</div>"
  },
  "Lens": {
    "import": "import { Lens } from 'sarahui';",
    "usage": "<Lens>\n  <img src=\"/images/lens-demo.jpg\" alt=\"Lens Demo\" />\n</Lens>"
  },
  "PixelImage": {
    "import": "import { PixelImage } from 'sarahui';",
    "usage": "<PixelImage src=\"/pixel-image-demo.jpg\" grid=\"8x8\" />"
  },
  "GlyphMatrix": {
    "import": "import { GlyphMatrix } from 'sarahui';",
    "usage": "<div className=\"border-border bg-background h-[400px] w-full overflow-hidden rounded-lg border\">\n  <GlyphMatrix />\n</div>"
  },
  "DottedMap": {
    "import": "import { DottedMap } from 'sarahui';",
    "usage": "<div className=\"relative h-[400px] w-full overflow-hidden rounded-xl border\">\n  <DottedMap />\n</div>"
  },
  "Pointer": {
    "import": "import { Pointer } from 'sarahui';",
    "usage": "<Pointer />"
  },
  "SmoothCursor": {
    "import": "import { SmoothCursor } from 'sarahui';",
    "usage": "<SmoothCursor />"
  },
  "TweetCard": {
    "import": "import { TweetCard } from 'sarahui';",
    "usage": "\"use client\"\n\nimport { TweetCard } from 'sarahui'\n\nexport default function App() {\n  return <TweetCard id=\"1441032681968212480\" />\n}"
  },
  "AnimatedCircularProgressBar": {
    "import": "import { AnimatedCircularProgressBar } from 'sarahui';",
    "usage": "<AnimatedCircularProgressBar />"
  },
  "HexagonPattern": {
    "import": "import { HexagonPattern } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <HexagonPattern />\n</div>"
  },
  "StripedPattern": {
    "import": "import { StripedPattern } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <StripedPattern />\n</div>"
  },
  "InteractiveGridPattern": {
    "import": "import { InteractiveGridPattern } from 'sarahui';",
    "usage": "<div className=\"relative h-[500px] w-full overflow-hidden\">\n  <InteractiveGridPattern />\n</div>"
  },
  "NoiseTexture": {
    "import": "import { NoiseTexture } from 'sarahui';",
    "usage": "<div className=\"relative h-64 overflow-hidden rounded-lg border\">\n  <NoiseTexture />\n</div>"
  }
};

export function getComponentUsage(name) {
  return componentUsages[name] || {
    import: "import { " + name + " } from 'sarahui';",
    usage: "<" + name + " />"
  };
}
