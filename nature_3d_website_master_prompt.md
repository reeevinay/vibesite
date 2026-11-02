Master Prompt: Organic 3D Nature Agency Website (Anti-AI Editorial Aesthetic)

Use the prompts below in **Cursor, Claude Code, Windsurf, Bolt, or v0** to build a bespoke, Awwwards-level interactive 3D nature website for your two-person web studio—explicitly engineered to avoid every "AI-generated" cliché.

## Why Previous Designs Felt "AI-Made" (And How This Prompt Fixes It)

| Design Element | Typical "AI-Generated" Look (Banned) | Authentic Human Studio Craft (Enforced) | 
| ----- | ----- | ----- | 
| **Icons & Glyphs** | Emoji icons, stock Lucide/FontAwesome icons inside colored circles | Custom 1px monoline architectural SVGs, botanical line-art etchings, and raw typographic indices (`01`, `02`, `↗`) | 
| **Color Palette** | Neon cyan, purple, emerald gradients (`from-emerald-400 to-teal-300`) on dark slate | Earthy editorial pigments: Deep Forest Obsidian (`#0B0E0B`), Warm Parchment (`#F2EFE9`), Dried Moss (`#3A473C`), Raw Ochre (`#C47D52`) | 
| **UI Layout** | Floating rounded glassmorphic dashboard cards (`rounded-2xl`, heavy drop shadows) | Unboxed editorial Swiss grid, exposed `1px solid` hairlines (`rgba(242, 239, 233, 0.12)`), asymmetric whitespace | 
| **3D Nature Scene** | Low-poly geometric primitives (`Icosahedron`, `Cone`, `Cylinder`) that look like programmer art | Custom GLSL vertex/fragment shaders: 12,000+ wind-swaying grass blades (`InstancedMesh`), cursor-parting physics, Fresnel water ripples, and volumetric mist | 
| **Typography** | Generic Inter/Roboto bold headers with uppercase pill badges above every title | High-contrast editorial serif (*Cormorant Garamond* or *Instrument Serif* italic) paired with tight neo-grotesque body (*Syne* or *Plus Jakarta Sans*) | 

## 1. Master Full-Stack Build Prompt (Copy & Paste)

```
ROLE & ART DIRECTION:
You are a Creative Developer and Art Director from an Awwwards Site-of-the-Year studio (inspired by Lusion, Unseen Studio, and Locomotive). Build a complete, production-ready, interactive 3D nature website for our two-founder digital studio.

STRICT "ANTI-AI" VISUAL RULES (MANDATORY):
1. ZERO EMOJIS OR STOCK ICONS: Never use a single emoji or generic icon library. Every visual mark must be a custom, hand-crafted 1px stroke inline SVG (delicate botanical line drawings, architectural crosshairs `+`, compass ticks, and minimal diagonal arrows `↗`).
2. NO GLASSMORPHIC SAAS CARDS OR PILL BADGES: Do not put text inside floating `rounded-2xl` blurred cards with glowing borders. Use an open, breathable Swiss editorial layout with exposed 1px hairline dividers (`border-white/10`), oversized serif typography, and raw typographic numbering (`I.`, `II.`, `III.`, `IV.`).
3. NO NEON GRADIENTS: Ban all cyan, purple, or bright emerald Tailwind gradients. Use a tactile, organic earth palette:
   - Background / Deep Shadow: `#0B0E0B` (Deep Forest Obsidian)
   - Primary Typography: `#F2EFE9` (Warm Raw Parchment)
   - Muted Secondary Text: `#A3A89E` (Weathered Lichen)
   - Warm Accent: `#C87D55` (Terracotta / Sunlit Clay)
   - Botanical Accent: `#5E7161` (Sage Canopy)
4. SUBTLE FILM GRAIN: Overlay a fixed, pointer-events-none SVG fractalNoise film grain texture (`opacity: 0.035`) across the viewport so the screen feels like tactile paper and cinema rather than flat digital plastic.
5. NO LOW-POLY "PROGRAMMER ART" 3D SHAPES: Do not use basic `IcosahedronGeometry` or `ConeGeometry` pretending to be trees. Build the 3D nature experience using custom GLSL shaders, `InstancedMesh` organic foliage, and smooth procedural terrain.

THE INTERACTIVE 3D NATURE WORLD (THREE.JS / WEBGL):
Instead of a static 3D background, the entire website is a continuous, living 3D natural landscape that responds physically to the user's cursor, scroll, and clicks:
- Layer 1: Custom GLSL Wind-Swept Botanical Meadow (`InstancedMesh`):
  Render 12,000+ curved, tapered botanical blades across gently rolling procedural terrain (using 2D Simplex noise heightmap). Write a custom GLSL vertex shader that animates undulating wind waves across the field AND calculates the 3D world-space position of the user's mouse cursor so the grass/reeds physically bend and part away from the cursor in real time.
- Layer 2: Interactive Water Mirror & Ripple Shader:
  In the center clearing, create a reflective still water basin. Clicking or dragging across the water triggers expanding ring ripples and releases warm, rising golden spore particles that drift upward into the mist.
- Layer 3: Organic Canopy & Volumetric Sunbeams:
  Use soft alpha-blended volumetric light shafts (god-rays) and drifting atmospheric mist planes that shift angle and warmth as the user scrolls from Dawn (Chapter I) through Midday Sun (Chapter II), Golden Hour (Chapter III), and Starlit Fireflies (Chapter IV).

HOW NATURE MAPS TO OUR 4 BUSINESS SERVICES (ZERO TECH JARGON):
As the user scrolls or clicks the 4 editorial chapter markers along the left hairline margin, smoothly glide the 3D camera along a `CatmullRomCurve3` path through four distinct natural clearings, shifting the lighting and terrain mood automatically:

- Chapter I — The Clearing (Fast Launch Websites / Framer & Custom Web):
  - Visual State: Morning mist parting over sunlit water and swaying reeds.
  - Headline: "First impressions that feel effortless."
  - Copy: We design and launch bespoke, fast-loading websites in 7 to 10 days for brands, clinics, and founders who refuse to look like everyone else.
  - Interactive Trigger: Hovering or clicking "Part the Mist" accelerates the wind shader and reveals an interactive before/after typography & motion showcase right inside the editorial grid.

- Chapter II — The Greenhouse (Online Stores & D2C Commerce / Shopify):
  - Visual State: Warm terracotta sunlight filtering through dense botanical foliage.
  - Headline: "Storefronts built to welcome and sell."
  - Copy: Complete online shops crafted for product brands—with instant UPI/card checkout, automated shipping, and WhatsApp cart recovery woven in from day one.
  - Interactive Trigger: An interactive "Storefront Flow" toggle that lets the visitor test a tactile product card transition and instant drawer checkout right on the page.

- Chapter III — The Root System (Search Visibility, Content & WordPress):
  - Visual State: Rich earthen tones with glowing subterranean root pathways across the terrain floor.
  - Headline: "Deep roots that bring people to your door."
  - Copy: Structured, easy-to-edit websites and local Google search foundations that compound your visibility month after month.
  - Interactive Trigger: Clicking "Trace Reach" illuminates glowing pathways across the 3D terrain showing how local searches connect to instant WhatsApp and phone inquiries.

- Chapter IV — The Open Sky (Custom Web Apps & Worry-Free Cloud Care):
  - Visual State: Twilight indigo sky with warm drifting fireflies and calm horizon water.
  - Headline: "Custom tools and quiet, year-round care."
  - Copy: From custom booking systems and client portals to managed cloud hosting (Vercel & AWS), the two of us handle every update, backup, and server detail personally.
  - Interactive Trigger: Clicking anywhere in the night sky spawns constellations of connected fireflies representing live uptime and instant scalability.

EVERY CONTROL & INTERACTION MUST WORK:
1. Top Architectural Header:
   - Studio wordmark in editorial serif on the left.
   - A custom SVG "Season / Light" dial that smoothly interpolates the 3D shaders between *Misty Dawn*, *Terracotta Sun*, and *Starlit Night*.
   - A custom SVG sound wave toggle that plays subtle, procedural Web Audio ambient wind and warm acoustic harmonic chords on interaction.
   - An underlined editorial link (`Start a Conversation ↗`) that opens the interactive Project Scope Drawer.
2. Interactive Project Scope & Estimate Drawer (Slide-Over Editorial Sheet):
   - Styled like a printed architectural specification sheet on warm parchment (`#F2EFE9` background with `#0B0E0B` ink text).
   - Interactive toggles for project type (Launch Website, Online Store, Content & Search Site, Custom Web App) and optional add-ons (WhatsApp Lead Automation, Year-Round Hosting & Care).
   - Live currency switcher (`INR ₹` / `USD $`) with instant transparent calculation and a working "Copy Brief" action.
3. Custom Magnetic Cursor:
   - A subtle 1px ring cursor that expands and snaps magnetically to interactive links and projects a soft warm light onto the 3D terrain below it.

PERFORMANCE & OPTIMIZATION REQUIREMENTS:
- Clamp `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- Use `THREE.InstancedMesh` with a single draw call for all 12,000+ botanical blades.
- Do all wind and cursor-repulsion math inside the GLSL vertex shader (`uniform float uTime; uniform vec3 uCursorWorldPos;`) so CPU overhead stays near zero and frame rate stays locked at 60 FPS on laptops and mobile.

```

## 2. Prompt for Custom 3D GLSL Nature Shader Only (If Using Next.js + React Three Fiber)

If you are building the project modularly in **Next.js (App Router) + `@react-three/fiber`** on Vercel, paste this prompt to generate the core 3D nature canvas component first:

```
Write a self-contained React Three Fiber (`@react-three/fiber` and `@react-three/drei`) component called `<LivingMeadowScene />` that renders an Awwwards-quality organic nature landscape at 60 FPS with zero external texture files.

Include:
1. A procedural rolling terrain mesh using a custom Simplex noise height function in a dark moss/obsidian palette (`#0B0E0B` to `#1E2820`).
2. An `InstancedMesh` of 15,000 slender, curved botanical reed/grass blades distributed organically across the terrain heightmap.
3. A custom `ShaderMaterial` for the blades:
   - Vertex shader: Takes `uTime`, `uWindStrength`, and `uMouseWorld` uniforms. Uses layered sine/noise waves to create natural wind gusts across the field, and smoothly bends blades away within a 2.5-unit radius of `uMouseWorld`.
   - Fragment shader: Vertical gradient from deep root shadow (`#0B0E0B`) to warm sunlit sage/ochre tips (`#8FA392` and `#C87D55`), with subtle rim-lighting based on view normal.
4. A central circular water plane with a custom fragment shader that renders soft concentric ripples radiating from recent cursor click points.
5. Smooth damped camera rig (`useFrame`) that interpolates between 4 camera waypoints based on a `currentChapter` prop (0 to 3) plus subtle mouse parallax.

```

## 3. Quick Typography & Icon Snippet to Paste into Your CSS / HTML

To immediately strip away the "AI look" in any build, enforce this exact font pairing and SVG icon rule in your prompt or global stylesheet:

```
<!-- Editorial High-Contrast Serif + Clean Geometric Sans -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

```

* **Headlines:** `font-family: 'Cormorant Garamond', serif; font-weight: 400; letter-spacing: -0.02em; line-height: 1.05;` (Use *italic* on key emotional words like *"alive"*, *"effortless"*, or *"cultivated"*).

* **Body & Index Numbers:** `font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400; letter-spacing: 0.01em;`

* **Icon Rule:** Replace all icons with `1px` inline SVGs (`stroke="currentColor" stroke-width="1" fill="none"`), such as a minimal `14x14` diagonal arrow (`M2 12L12 2M12 2H4M12 2V10`) or a `16x16` four-point botanical star.