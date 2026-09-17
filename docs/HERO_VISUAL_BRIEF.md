# Hero visual brief — "Market shifts into platform advantage"

Ideation notes and generation prompts for a cinematic 3D hero visual for the
MiddleLeap homepage. Companion to `components/MandateSystem.tsx`, which
currently renders the hero as an interactive SVG decision system.

## 1. What the visual has to sell

The homepage headline is the whole pitch: *From strategic mandate to market
execution.* The visual must make that turn feel inevitable and precise, not
decorative. Three ideas carry the proposition:

| Idea | What the viewer should feel | Brand device |
|---|---|---|
| A regulated market is a settled, rigid structure | Order, weight, institutional gravity | Grid of bone squares on ink |
| A mandate is a single decisive move | One deliberate act changes everything | **The pivot**: square → 45° diamond, ember |
| Execution is a working platform | Flow, connection, things actually moving | Signals travelling along sharp edges |

Everything in the brand system points at one motion: the pivot. The
cinematic should be that motion at architectural scale, not a generic
"fintech particle network".

## 2. Concept directions

### A. The Pivot at Scale (first pass)

A vast, perfectly ordered lattice of matte bone-coloured cubes rests on a near
black plane, seen from a low three-quarter angle. Nothing moves. One cube in
the middle distance rotates 45° on its vertical axis and lights ember from
within. The rotation propagates outward, row by row, like a decision moving
through an organisation. As the cubes turn, the gaps between them become
channels and fine ember lines run through the channels: transactions,
data, partners. The camera pushes in slowly and settles so the last frame
composes as a single ember diamond beside a bone square, the lockup.

Why it works: it *is* the brand mark, told as a story. Institution → decision
→ platform. Loops cleanly and tolerates text overlay.

First renders (17 Sep 2026) looked right but did not tell a first-time
visitor what MiddleLeap does. Superseded by Concept E below.

### B. Mandate to Market

A single monolithic ink slab, edge-lit, sits alone: the regulation, the
mandate, the board paper. Hairline seams appear on its surface in a precise
rectangular grid. The slab separates along those seams into modules that
lift and re-arrange in 3D into a layered platform: a base tier, an API tier,
a partner tier. Thin ember signals begin to run between tiers. The end frame
is a calm, working system.

Why it works: literal narrative of decomposition and re-assembly. Good for
the "One practice. Three connected systems." section rather than the hero.

### C. The Loom

Taut bone threads stretched across the frame in strict parallel, seen edge-on
so they read as rules on a page. A single ember thread enters at 45°, and
where it crosses, the bone threads tighten into a woven lattice. The weave
becomes a surface you could build on.

Why it works: ties to `/the-loom`. Best as a section-level band, not the
hero, since it is abstract about *what* is being built.

### D. Ecosystem field

Isometric field of low, sharp-edged glass-dark blocks of differing heights
(bank, fintech, infrastructure, telco). Bone edges, ink faces. Small ember
diamonds travel between blocks along orthogonal paths; where they pass, the
paths stay lit. Over 8 seconds the field goes from isolated blocks to a
connected system.

Why it works: most literal "platform and ecosystem" picture. Risk: drifts
toward generic smart-city renders unless the geometry stays severe.

### E. The Mark as the Loom (current direction)

Feedback on Concept A: it looks right but says nothing to a first-time
visitor. Concept E fixes that by using the logo itself to tell the method.

The pivot mark is a settled bone square that leaps 45° into an ember
diamond. The Loom is a double diamond: Discovery (diverge, converge), one
gate, Delivery (diverge, converge), then Run/Operations returning signal to
Discovery. So the mark *is* the Loom, told twice:

| Beat | What happens on screen | What it says |
|---|---|---|
| 1 Mandate | A single bone square rests alone on ink. | The institution, settled and rigid. |
| 2 Discovery | The square pivots 45° and lights ember. Fine bone threads, like a loom's warp, fan into the diamond's full width and pull tight to its right point. | Diverge around evidence, converge on one problem. |
| 3 Gate | At that point, a second pivot: a new ember diamond is born from the first one's tip. | One gate-green hand-off. |
| 4 Delivery | Threads fan out again across the second diamond and converge at its right point. | Develop across solutions, deliver under control. |
| 5 Run | From the second tip the threads run straight, level and parallel into the distance, woven tight. | Working software in operation. |
| 6 Feedback | One ember thread arcs back beneath both diamonds to the square on the left. The frame settles on square + ember diamond: the lockup. | Signal returns to Discovery. The loop closes on the logo. |

The words (Discover, Define, Develop, Deliver, Run) are **not** in the
render. They are HTML labels laid under the video and lit ember in sync with
the playback position, so a visitor reads the method as the mark draws it.
Under reduced motion the poster shows the finished loop with all labels lit.

Honest caveat: a generative model will not reproduce the mark's exact
proportions and 16% squircle radius. Two ways to handle that:

1. Use the render as an atmospheric backdrop and draw the actual mark and
   threads on top as an SVG animation in the codebase, using the brand
   tokens and `ease-leap`. Exact, accessible, small, and it stays inside
   the pivot motion vocabulary. This is the recommended production path.
2. Upload a rasterised `brand-kit/assets/pivot_icon.svg` as a reference
   image in Higgsfield so the render's geometry is anchored to the mark.

### 3.6 Keyframe image prompt — Concept E (end state of the loop)

```
Cinematic 3D render on a near-black matte background (#080808). Wide
composition, centred, generous negative space, editorial and severe. A
single geometric sequence reads left to right like a logo drawn in space.
Far left: a settled matte bone-white square block (#DEDBD4), very slightly
softened corners, resting flat and still. To its right the same block has
pivoted 45 degrees into a diamond and glows warm ember orange (#E65C2D)
from within, like heated ceramic, not neon. Dozens of fine, taut
bone-white threads, like the warp threads of a loom, leave the square,
fan out across the full width of the ember diamond and pull tight to its
right point. At that exact point a second identical ember diamond begins;
the threads fan out across it and converge again at its right point. From
there the threads run straight, level and perfectly parallel into the
distance, woven into a tight fabric that fades into darkness. One single
ember thread curves back beneath both diamonds and returns to the square
on the left, closing the loop. Everything precise and sharp, matte
ceramic and matte stone materials, restrained reflections. Soft
directional key light from upper left, deep shadows, subtle floor haze,
fine film grain. No text, no letters, no wordmark, no circles, no
spheres, no particles, no glass, no lens flare, no people. Octane render
quality, 8k.
```

Negative prompt: as 3.1, plus `wordmark, typography, arrows, icons,
diagram, infographic, flowchart, glowing wires, neon tubes`.

### 3.7 Video prompt — Concept E (image-to-video from the keyframe)

```
Slow, precise, mechanical animation on a black background, camera locked
off with a very slight push-in. Start: a single matte bone-white square
rests alone, nothing else visible. Beat one: the square pivots 45 degrees
with a crisp snap and a slight overshoot as it lands, and lights warm
ember orange from within. Fine bone-white loom threads pull out of the
square, fan across the ember diamond's full width and draw tight to its
right point. Beat two: at that point a second identical square appears and
pivots 45 degrees into a second ember diamond; the threads fan out across
it and draw tight again at its right point. Beat three: from that point
the threads run straight, level and parallel into the distance and weave
into a tight, calm fabric. Beat four: one single ember thread travels back
beneath both diamonds to the square on the left and the loop closes. Final
second: the threads dim to faint, the scene settles on the bone square and
the ember diamond side by side, holding still like a logo. Warm matte
ember light, not neon. Deep blacks, film grain, no flicker, no text, no
particles. 10 seconds, ends on a still frame.
```

## 3. Prompt pack for Higgsfield

Higgsfield works best when you generate a keyframe **image** first, approve
it, then animate it **image-to-video**. Text prompts alone drift off-brand.
Generate the still, then use it as the first (and ideally last) frame.

Recommended settings for a web hero:

- Aspect ratio 16:9 for desktop hero background, plus a 4:5 or 1:1 variant
  for the mobile stack. Do not crop the 16:9 to mobile; regenerate.
- 8 to 10 seconds, loop-friendly: ask for the end state to match the start
  state, or generate a "settle" that can be held as a still.
- No text, no logos, no UI in the generation. The wordmark and copy are
  laid on in HTML.
- Camera: slow push-in or slow orbit only. No handheld, no whip pans.

### 3.1 Keyframe image prompt — Concept A

```
Cinematic 3D render, architectural scale. A vast perfectly ordered grid of
matte cubes in warm bone off-white (#DEDBD4) resting on a near-black matte
plane (#080808), seen from a low three-quarter angle with a long lens.
Severe, minimal, editorial. In the middle distance one single cube has
rotated 45 degrees into a diamond and glows from within in ember orange
(#E65C2D), the only saturated colour in the frame. Around it the nearest
cubes have begun to rotate, the gaps between them opening into narrow
channels. Hairline ember light runs through the channels like circuitry.
Soft directional key light from upper left, deep shadows, subtle volumetric
haze near the floor, fine film grain. Sharp 90 degree edges everywhere, no
rounded corners, no spheres, no circles, no particles, no glass, no lens
flare, no text, no logos, no people. Photoreal materials, matte ceramic
and matte stone, restrained reflections. Octane render quality, 8k.
```

Negative prompt (if the model exposes one):

```
rounded corners, spheres, circles, glowing particles, neon blue, purple,
gradient sky, city skyline, holograms, glass, chrome, lens flare, bokeh
orbs, text, letters, logo, watermark, people, hands, low contrast,
cluttered, busy, cartoon, illustration, isometric clip-art
```

### 3.2 Video prompt — Concept A (image-to-video from the keyframe)

```
Slow cinematic push-in on a vast ordered grid of matte bone-white cubes on a
black plane. At first everything is perfectly still. One cube in the middle
distance rotates 45 degrees on its vertical axis with a precise mechanical
snap and a slight overshoot as it lands, and lights up warm ember orange
from inside. The rotation spreads outward through the grid one row at a
time, like a wave moving through an organisation, each cube snapping
45 degrees into a diamond. As the cubes turn, the gaps between them become
channels, and thin ember light begins to travel through the channels in
straight lines and right-angle turns, accelerating as more of the grid
turns. The camera keeps pushing in slowly and steadily, no shake. In the
final second the movement settles and the frame holds on a calm, fully
connected lattice with the original ember diamond in the centre. Even
lighting throughout, deep blacks, film grain, no flicker. Duration 8
seconds, seamless loop, end frame matches the start composition.
```

### 3.3 Keyframe image prompt — Concept B (Mandate to Market)

```
Cinematic 3D render. A single monolithic slab of near-black matte stone
(#080808 to #181817) stands alone on a dark reflective floor, edge-lit with
a thin warm bone-white rim light (#ECE9E1). Its front face is scored with
hairline seams in a precise rectangular grid. Along the seams a faint ember
orange (#E65C2D) light is beginning to show, as if the slab is about to
separate into modules. Severe, minimal, editorial composition, lots of
negative space, long lens, slight low angle. Sharp edges only, no rounded
corners, no circles, no particles, no text, no logos, no people. Fine film
grain, subtle floor haze. Photoreal, 8k.
```

### 3.4 Video prompt — Concept B

```
The monolithic dark slab separates cleanly along its grid of seams. The
modules lift away from each other in a slow, precise, mechanical motion,
rotating 45 degrees as they move, and re-arrange in mid-air into three
stacked horizontal tiers of a platform: a wide base tier, a narrower middle
tier, a small top tier. Thin ember orange light runs between the tiers in
straight lines with right-angle turns, then holds steady. The camera orbits
very slowly about 15 degrees to the right during the re-assembly and
settles. Deep blacks, warm bone rim light, film grain, no flicker, no
particles, no text. 10 seconds, ends on a still composition.
```

### 3.5 Keyframe image prompt — Concept D (Ecosystem field)

```
Cinematic isometric 3D render of a field of low rectangular blocks of
varying heights on a near-black plane (#080808), like an abstract financial
district reduced to pure geometry. Block faces are matte charcoal
(#181817), every edge picked out in a thin warm bone-white line (#DEDBD4).
Orthogonal paths run between the blocks on the ground. On a few paths,
small ember orange (#E65C2D) 45 degree diamonds are travelling, and the
segments of path they have passed remain faintly lit in ember. Most of the
field is still dark and disconnected. Severe, minimal, no rounded corners,
no circles, no spheres, no glass, no text, no logos, no people, no lens
flare. Directional key light from upper left, fine film grain. 8k.
```

## 4. Iteration tips for Higgsfield

- If the ember becomes a "neon" look, add: `ember light is warm and matte,
  like heated ceramic, not neon, not glowing tube`.
- If the model adds circles or spheres (it will), add to the negative prompt
  and lower the guidance a step. The brand explicitly forbids circles as
  emphasis.
- If the grid looks like a data-centre or server room, add
  `architectural ceramic, gallery installation, not electronics`.
- Ask for "matte stone" and "matte ceramic" rather than "metal" to keep it
  calm and executive.
- For a light-theme variant, generate the same scene with
  `paper off-white plane (#F7F5EF), cubes in deep ink (#1B1B1B), ember
  unchanged`. Do not colour-invert the dark render in post.

## 5. How it lands on the page

Keep `MandateSystem` as the interactive decision system: it is the tool.
Place the cinematic where the current hero background is flat:

1. **Hero backdrop** (preferred): full-bleed muted video behind the hero
   copy, the interactive panel sitting on top with its existing dark card.
   Dim to ~60% and add a left-to-right ink gradient so the headline stays
   AA. Poster image is the approved keyframe.
2. **"The new mandate" band**: a full-width strip between the hero and the
   shift grid, using Concept B or C.

Production constraints for the static export:

- Export both `.webm` (VP9 or AV1) and `.mp4` (H.264) and keep each under
  ~2.5 MB for 8 seconds at 1440 wide. Lighthouse budgets in
  `lighthouserc.js` will catch anything heavier.
- `autoplay muted loop playsinline preload="metadata"`, with the keyframe
  as `poster`.
- Honour `prefers-reduced-motion`: do not render the `<video>` at all; show
  the poster. This is a hard brand rule as well as an accessibility one.
- Do not autoplay on the mobile stack; use the 4:5 poster there.
- Keep the video purely decorative: `aria-hidden="true"`, no captions
  needed, and never put copy inside the render.
