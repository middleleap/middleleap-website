# MiddleLeap Brand Kit · v2.0

Everything an agent — or a human — needs to build on the MiddleLeap brand. Verified against middleleap.com computed styles, July 2026. WCAG AA verified (`node scripts/check-contrast.mjs`).

## Contents

```
brand-kit/
├── DESIGN.md                      # master spec — load into agent context
├── README.md                      # this file
├── tokens.css                     # drop-in :root custom properties
├── tokens.json                    # W3C Design Tokens (Figma / Style Dictionary)
├── tailwind.preset.js             # Tailwind theme mapping
├── middleleap-design-system.html  # living reference implementation (open in browser)
├── components/
│   ├── components.css             # component styles (imports tokens.css)
│   └── index.jsx                  # React: PivotMark, Lockup, Button, Field, Checkbox,
│                                  #   Toggle, Badge, Card, Alert, Loader, Eyebrow
├── scripts/
│   └── check-contrast.mjs         # WCAG AA gate — exits 1 on failure, wire into CI
├── skill/middleleap-brand/
│   └── SKILL.md                   # Claude Code skill
└── assets/
    ├── pivot_primary.svg          # primary lockup (dark)
    ├── pivot_icon.svg             # 512 app icon
    ├── pivot_anim.svg             # animated lockup (SMIL)
    ├── og-image.png               # 1200×630 social card
    ├── favicon.ico                # 16/32/48 multi-size
    ├── favicon-16.png · favicon-32.png
    └── apple-touch-icon.png       # 180×180
```

## Wiring

**Claude Code** — copy `skill/middleleap-brand/` into `~/.claude/skills/` (or the project's `.claude/skills/`). Alternatively add to `CLAUDE.md`:
```
For any MiddleLeap UI, document, or copy: read brand-kit/DESIGN.md first,
import brand-kit/tokens.css, and run node brand-kit/scripts/check-contrast.mjs
after color changes.
```

**Codex / other agents** — add the same instruction to `AGENTS.md`, or include `DESIGN.md` directly in context. It is plain markdown, tool-agnostic.

**Plain CSS project** — `<link rel="stylesheet" href="brand-kit/tokens.css">`, then use the custom properties. Component markup reference: `middleleap-design-system.html`.

**React** — import `components/components.css` once at the root, then:
```jsx
import { Button, Card, Badge, Lockup } from './brand-kit/components/index.jsx';
<Button variant="primary">Discuss a mandate</Button>
```

**Tailwind** —
```js
// tailwind.config.js
module.exports = { presets: [require('./brand-kit/tailwind.preset.js')], content: ['./src/**/*.{js,jsx,html}'] };
```

**Fonts** —
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Favicons / OG** —
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://middleleap.com/og-image.png">
```

**CI gate** — add to the pipeline before deploy:
```
node brand-kit/scripts/check-contrast.mjs
```

## Versioning

Tokens are the contract. Any change to `tokens.css` must be mirrored in `tokens.json`, `tailwind.preset.js`, the pair list in `check-contrast.mjs`, and `DESIGN.md` — and the gate must pass. Bump the version in this file and `DESIGN.md` together.
