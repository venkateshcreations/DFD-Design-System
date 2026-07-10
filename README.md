# Deepfake Defense — Design System v1.0

**Author:** Venkatesh Ammireddy  
**Version:** 1.0  
**Stack:** HTML5 · CSS3 · Vanilla JS · Chart.js

> A comprehensive reference for engineers, designers, and system integrators building on the Deepfake Defense program. This document covers every design token, component specification, layout pattern, and usage convention in the system. Use it as the source of truth for extending the site, building the Interactive Dashboard, or integrating detection signals into existing security tooling.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Design Tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Color System](#4-color-system)
5. [Spacing & Layout](#5-spacing--layout)
6. [Component Catalog](#6-component-catalog)
7. [Patterns & Integration](#7-patterns--integration)
8. [Engineering Rules](#8-engineering-rules)

---

## 1. Overview

| Property | Value |
|---|---|
| **Project** | Deepfake Defense Design System |
| **Version** | v1.0 |
| **Theme** | Dark theme on midnight indigo field |
| **Fonts** | Inter (UI/body), JetBrains Mono (code/data) |
| **Accents** | Cyan (`#4cd2ff`), Violet (`#8b5cf6`), Magenta (`#f472b6`) |
| **Architecture** | Static HTML/CSS/JS + Companion Next.js 16 app |
| **Target** | Engineers, designers, system integrators |

**Gradient system:** `--grad` (135deg cyan → violet → magenta), `--grad-cyan`, `--grad-violet`, `--grad-pink`, `--grad-soft`, `--grad-glow`.

---

## 2. Design Tokens

All design decisions are encoded as CSS custom properties on `:root`. This is the single source of truth. Never hardcode values.

### Surfaces

| Token | Value | Usage |
|---|---|---|
| `--bg-0` | `#05060d` | Page background, darkest surface |
| `--bg-1` | `#0a0d1c` | Secondary background, card backdrop |
| `--bg-2` | `#11163a` | Elevated surface, active states |
| `--surface` | `rgba(255,255,255,0.035)` | Subtle card/container surface |
| `--surface-2` | `rgba(255,255,255,0.06)` | Hover state surface |
| `--surface-3` | `rgba(255,255,255,0.09)` | Active/selected surface |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border` | `rgba(140,180,255,0.14)` | Default borders, dividers |
| `--border-strong` | `rgba(140,180,255,0.32)` | Hover borders, header underlines |
| `--border-glow` | `rgba(76,210,255,0.45)` | Focused/glowing border states |

### Text

| Token | Value | Usage |
|---|---|---|
| `--text` | `#eaf0ff` | Primary body & heading text |
| `--text-dim` | `#95a3c8` | Secondary text, descriptions |
| `--text-mute` | `#6a7596` | Metadata, footnotes, captions |
| `--text-faint` | `#4a547a` | Placeholder text, disabled |

### Shadows

| Token | Usage |
|---|---|
| `--shadow-sm` | Cards, small surfaces |
| `--shadow-md` | Hovered cards, modals |
| `--shadow-lg` | Hero, banners, overlays |
| `--shadow-glow-cyan` | Cyan accent glow |
| `--shadow-glow-pink` | Magenta accent glow |

### Radii & Layout

| Token | Value | Usage |
|---|---|---|
| `--r-sm` | `8px` | Small elements, badges, tags |
| `--radius` | `14px` | Default card & container radius |
| `--radius-lg` | `22px` | Hero sections, large banners |
| `--radius-xl` | `28px` | Outer containers, modals |
| `--maxw` | `1400px` | Maximum container width |

---

## 3. Typography

Two font families, strictly scoped.

### Inter (Display & Body)

Weights 400, 500, 600, 700, 800. Token: `--font-sans` for UI, `--font-display` for headings. Uses `letter-spacing: -0.015em` on headings and `-0.025em` on h1.

### JetBrains Mono (Code & Data)

Weights 400, 500, 700. Token: `--font-mono`. Reserved for forensic readouts, signal tables, detection scores, timeline dates, and technical labels. Never use for prose.

### Heading Scale

| Level | Size | Weight | Letter-spacing | Context |
|---|---|---|---|---|
| h1 | `clamp(2.4rem, 5vw, 3.8rem)` | 800 | `-0.025em` | Page hero titles |
| h2 | `clamp(1.7rem, 2.8vw, 2.4rem)` | 700 | `-0.015em` | Section headers |
| h3 | `1.2rem` | 600 | `-0.015em` | Card titles |
| h4 | `0.95rem–1.08rem` | 600 | normal | Subsection heads, timeline items |

### Eyebrow Label Pattern

`.eyebrow` — `0.74rem`, JetBrains Mono, `letter-spacing: 0.22em`, always uppercase. Includes a pulsing `::before` pseudo-element (6px cyan dot). Use at the top of every major section as the visual anchor for module-numbering conventions.

```
<span class="eyebrow">MODULE 02 · DETECTION STACK</span>
```

---

## 4. Color System

### Semantic Role Map

Three accent colors — cyan, violet, magenta — on a midnight indigo field. These are **roles** with locked semantic meaning.

| Accent | Hard Token | Soft Token | Role | Never use for |
|---|---|---|---|---|
| Cyan | `--cyan: #4cd2ff` | `--cyan-soft: #8fe6ff` | Primary UI (buttons, links, active), data highlights, "go" signals | Warning, error, synthetic-score labels |
| Violet | `--violet: #8b5cf6` | `--violet-soft: #b794f6` | NIST controls, standards, compliance badges, "authority" context | Primary CTAs, real-time scan data |
| Magenta | `--magenta: #f472b6` | `--magenta-soft: #f9a8d4` | Synthetic alerts, warning verdicts, "suspect" labels, attack indicators | Positive metrics, verified status |
| Green | `--green: #34d399` | — | Success, pass, verified, "all clear" | Neutral/unverified states |
| Red | `--red: #f87171` | — | Error, block, high-risk, false | Informational labels |
| Amber | `--amber: #fbbf24` | `--amber-soft: #fde68a` | Warning, caution, challenge, medium-risk | Critical alerts |

### Golden Rule

cyan is primary action, violet is NIST/standards/authority, magenta is alert/synthetic/warning. Never use cyan for a warning badge or magenta for a primary button.

### Gradient System

| Token | Stops | Usage |
|---|---|---|
| `--grad` | 135deg · cyan → violet → magenta | Primary gradient for CTAs, stat numbers, progress bars, decorative dividers |
| `--grad-cyan` | cyan → blue | Detection/Layer 1 accent |
| `--grad-violet` | violet → purple | NIST controls accent |
| `--grad-pink` | magenta → pink | Warning/synthetic accent |
| `--grad-soft` | 12% opacity cyan/violet | Subtle surface overlay |
| `--grad-glow` | radial · violet center → transparent | Hero glow, ambient effect |

### Swatch Gallery

| Token | Value | Swatch |
|---|---|---|
| `--bg-0` | `#05060d` | █ |
| `--bg-1` | `#0a0d1c` | █ |
| `--bg-2` | `#11163a` | █ |
| `--text` | `#eaf0ff` | █ |
| `--text-dim` | `#95a3c8` | █ |
| `--text-mute` | `#6a7596` | █ |
| `--cyan` | `#4cd2ff` | █ |
| `--violet` | `#8b5cf6` | █ |
| `--magenta` | `#f472b6` | █ |
| `--green` | `#34d399` | █ |
| `--red` | `#f87171` | █ |
| `--amber` | `#fbbf24` | █ |

---

## 5. Spacing & Layout

### Container & Sections

| Element | Value | Notes |
|---|---|---|
| `.container` | `max-width: 1400px; padding: 0 24px;` | Single source of truth for page width |
| `.section` | `padding: 100px 0;` | Standard vertical section spacing |
| `.section--tight` | `padding: 64px 0;` | Compact variant |

### Grid System

| Class | Columns | Gap | Breakpoints |
|---|---|---|---|
| `.grid-2` | 2 | 22px | → 1 col at 640px |
| `.grid-3` | 3 | 22px | → 2 col at 980px → 1 col at 640px |
| `.grid-4` | 4 | 22px | → 2 col at 980px → 1 col at 640px |

Usage: `class="grid grid-3"`. Always pair both classes.

### Split Layout

| Class | Columns | Gap | Breakpoint |
|---|---|---|---|
| `.split` | 1fr 1fr | 56px | → 1 col at 880px |

Use `.split` for paired content blocks (text explanation + visual example). Not a general-purpose grid.

### Special Layouts

| Pattern | Columns | Used for |
|---|---|---|
| `.stat-strip-grid` | 4 → 2 at 720px | Statistical metric row below hero |
| `.pillars` | 4 → 2 at 980px → 1 at 560px | Four-pillar overview section |
| `.framework` | 5 → 2 at 980px → 1 at 560px | Five-step implementation framework |
| `.footer-grid` | 1.5fr 1fr 1fr 1fr → 2 col at 760px → 1 at 480px | Footer column structure |

---

## 6. Component Catalog

### Button System (`.btn`, `.btn--primary`, `.btn--ghost`)

| Class | Variant | Background | Usage |
|---|---|---|---|
| `.btn` | Base | transparent, border: 1px | Never use bare — always pair with a modifier |
| `.btn--primary` | Primary | `var(--grad)` gradient | Primary CTAs, "next page", "launch" |
| `.btn--ghost` | Ghost | `var(--surface)` with backdrop-blur | Secondary CTAs, "back" |

Arrow pattern: `<span class="arrow">→</span>` inside buttons slides 4px right on hover via `.btn:hover .arrow { transform: translateX(4px) }`.

### Card (`.card`)

Gradient background + 1px border + `var(--radius)`. Has `::before` hover overlay and `translateY(-3px)` on hover. Contains `.card-icon` (46×46px with gradient), `h3`, `p` (`--text-dim`), and optional `.tag-row`.

### Case Card (`.case-card`)

Relative-positioned card with absolute `.tag` in top-right corner. Color-coded tags: `--red` (financial), `--amber` (reputation), `--cyan` (insider), `--violet` (identity). Contains `.victim` (monospace, uppercase, muted) and `.impact` paragraph.

### Pillar (`.pillar` inside `.pillars`)

Must be inside `.pillars` grid container. Each pillar has a 3px gradient top bar via `::before`. `.step` label is JetBrains Mono, uppercase, cyan. Hover lifts 4px.

### Maturity Row (`.maturity-row` inside `.maturity`)

3-column grid: `90px · 1fr · 110px`. `.lvl` is monospace cyan centered in 40px box. `.pct` is right-aligned percentage. Hover shifts right by 2px.

### NIST Chip + Popover (`.nist-chip` + `.nist-popover`)

JS-driven popover with viewport-aware positioning. Data attributes: `data-nist-id`, `data-nist-title`, `data-nist-body`, `data-nist-link`, `data-nist-link-label`. Closes on Escape / scroll / click-outside. Single shared DOM element.

### CVE Row (`.cve-row`)

2-column grid: `180px · 1fr`, wraps to single at 720px. `.cve-id` is monospace, magenta, bold with optional CVSS score. `.cve-tags` is a flex row of CWE links.

### Training Quiz (`[data-quiz]` + JS)

JSON-driven. Schema: `{ q: string, options: string[4], answer: number, explain: string }`. JS renders, locks after answer, scores, provides feedback, and shows restart. Extend by adding objects to the JSON array — no HTML changes needed.

### Timeline (`.timeline` + `.timeline-item`)

Relative container with `padding-left: 32px`. `::before` creates a 2px gradient vertical line (cyan→violet→magenta) with glow. Each `.timeline-item` has a 16px glowing dot on the line. `.when` is monospace, uppercase, cyan.

### Signal Table Card (`.signal-card` + `.signal-table`)

`.card` with `padding: 0; overflow: hidden`. `.signal-card-head` has padding + bottom border. `.signal-table` is full-width, first column monospace cyan, rows highlight on hover.

### NIST Control Card (`.control-card`)

Card with 3px violet `::before` top bar. `.cc-id` is monospace, violet-soft, uppercase. `.cc-impl` is monospace implementation note with violet left border.

### Framework Step (`.fw-step` inside `.framework`)

Centered card with gradient background, `z-index: 1`. `.num` is a 40px circle with gradient background + glow shadow. Hover: `translateY(-4px)`.

### Face Scanner Homepage Hero (`.hero-visual`, `.face-frame`, `.face-meta`, `.verdict`)

Animated scanner with parallax. `.scan-line` sweeps top→bottom (5.5s). `.face-frame` is centered box with cyan border + corner brackets. `.verdict` has `backdrop-filter: blur(12px)` and animated `.bar-fill`. `faceData` array drives all values. Thumbnail strip (`data-scan-id`, `data-verdict`).

### Download Card (`.download-card`)

3-column grid: `60px · 1fr · auto`. Hover shifts border to glow. Published as a link (`<a>`). Gradient button pill on right side.

### Dashboard Promo Card (`.dashboard-promo-card`)

`.card` with `padding: 32px 40px` + radial glow pseudo-element. Inner flex row layout. CTA links to Vercel-hosted dashboard.

### Contact Form (`.form` inside `.card`)

Grid with `gap: 16px`. `.form-row` is 2-column at desktop, 1-column at <600px. Inputs have cyan focus ring. JS handler hides form and shows success message — wire to real endpoint for production.

### Utility Components

- **`.bullets`**: `list-style: none`, each `li` has cyan `::before` arrow
- **`.callout`**: 3px cyan left border + gradient background
- **`.tag-row`**: Flex row of monospace pill-shaped tags with border
- **`.divider`**: 1px border line, `margin: 60px 0`

---

## 7. Patterns & Integration

### Component State Matrix

Every interactive component handles these states: default, hover, focus-visible (keyboard users), disabled (where applicable).

| Component | Hover | Active | Focus-visible |
|---|---|---|---|
| `.btn` | translateY(-2px), glow | translateY(0) | Needs cyan outline |
| `.card` | translateY(-3px), border brightens | Not defined | Needs cyan outline |
| `.pillar` | translateY(-4px), top bar glow | — | — |
| `.maturity-row` | translateX(2px) | — | — |
| `.fw-step` | translateY(-4px) | — | — |
| `.nist-chip` | translateY(-1px), bg brightens | aria-expanded | 2px cyan outline |
| `.opt` (quiz) | translateX(4px), cyan tint | correct/wrong states | Needs cyan outline |
| Form inputs | — | — | 3px cyan ring shadow |

### Motion & Animation

| Animation | Duration | Easing | Element | Purpose |
|---|---|---|---|---|
| scan | 5.5s linear infinite | linear | `.scan-line` | Hero face-scan sweep |
| pulse | 1.4s–2.4s infinite | ease-in-out | `.eyebrow::before`, `.live` dot | Breathing indicator |
| pageIn | 0.5s ease-out | ease-out | body | Page-load fade-in |
| card hover | 0.25s ease | ease | `.card`, `.pillar`, etc. | translateY lift |
| button hover | 0.18s ease | ease | `.btn` | translateY(-2px) |
| bar fill | 1.2s cubic-bezier | cubic-bezier(0.4,0,0.2,1) | `.bar-fill` | Confidence bar animation |
| arrow slide | 0.2s ease | ease | `.btn .arrow` | → slides 4px right |

**Accessibility:** `@media (prefers-reduced-motion: reduce)` kills all animations globally. Do not add `!important` overrides.

### Responsive Breakpoints

| Breakpoint | Target | What changes |
|---|---|---|
| 900px | Tablet / small desktop | Nav → hamburger; hero → single-column; grid-3 → grid-2; pillars → 2-col; framework → 2-col; footer → 2-col |
| 640px (560–720 range) | Mobile | All grids → 1 column; stat-strip → 2-col; maturity → stacked; CTA → single-col; form row → single-col; CVE row → stacked |

Test at exactly these two breakpoints. Do not add custom breakpoints without team review.

### Page Architecture Template (7-layer)

1. `.scroll-progress` — Fixed 2px gradient bar
2. `nav.nav > .container.nav-inner` — Sticky nav with brand + links + toggle
3. `header.hero` — Eyebrow + h1 + lede + optional CTA
4. `section.section` × N — Each major content block
5. `section.section .cta-banner` — Optional CTA before footer
6. `footer.footer` — Grid footer
7. `script(src="js/main.js")` — Always load last

### Z-Index Layer System

| z-index | Element(s) |
|---|---|
| 999 | Next.js scroll-progress bar |
| 100 | `.scroll-progress` |
| 80 | `.nist-popover` |
| 50 | `.nav` |
| 10 | `.hero::before` |
| 6 | `.face-grid` |
| 5 | `.face-meta`, `.verdict` |
| 4 | `.scan-line` |
| 2 | `.hero::after` |
| 1 | `.face-frame`, `.fw-step` |
| 0 | `.face-silhouette` |
| -1 | `.hero-visual::before/::after` |
| -2 | `body::before` |

If you need a z-index not in this set, add it to the registry and explain why.

### JS Contracts & Data Attributes

| Attribute | Type | Behavior |
|---|---|---|
| `data-count` | Number | Animated stat counters on scroll |
| `data-suffix` | String | Suffix for counter (e.g., "M") |
| `data-fusion-bar` | Number (0–1) | Detection fusion bar fill |
| `data-quiz` | JSON array | Training quiz engine |
| `data-form` | Boolean | Contact form handler |
| `data-scan-id` | String | Face scanner ID label |
| `data-verdict` | String | Face scanner verdict panel |

### Accessibility (WCAG 2.1 AA)

| Pair | Ratio | WCAG |
|---|---|---|
| `--text` on `--bg-0` | ~14.5:1 | AAA |
| `--text-dim` on `--bg-0` | ~7.1:1 | AA |
| `--text-mute` on `--bg-0` | ~4.8:1 | AA (large text) |
| `--cyan` on `--bg-0` | ~6.5:1 | AA |

**Known gaps:** skip-to-content link absent, focus-visible only on `.nist-chip`, semantic landmarks are correct.

### Boilerplate Template

Copy-paste template available at the bottom of `designsystem.html` containing the full 7-layer architecture with correct CSS/JS loading, nav with active state, and footer. Save as a new `.html` and replace hero/section content.

### Deploy

**Static site** requires zero build tooling. Serve locally with `npx serve deepfake-defense` or `python3 -m http.server 8080`. Deploy to Vercel/Netlify by pointing root to `deepfake-defense/`. No `package.json`.

**Next.js app** uses standard commands: `npm run dev` (localhost:3000), `npm run build`, `npm run start`, `npm run lint`.

### Browser Support

Targets Chrome 85+, Firefox 88+, Safari 14.1+, Edge 85+. No IE support. CSS custom properties are required (no fallback). `backdrop-filter`, `background-clip: text`, `mask-image`, IntersectionObserver, `clamp()`, `scroll-behavior`, `prefers-reduced-motion` all have acceptable degradations.

### Git Conventions

- **Token rename** touches exactly 3 files: `style.css`, `designsystem.html`, `design-tokens.json`
- **New component** requires minimum 4 files: CSS + design system spec + state matrix + one production page
- **Breakpoint change** must be validated on real devices with screenshots in PR
- **State fix** updates CSS + state matrix entry

PR template must answer: (1) What changed? (2) Which files? (3) Token JSON in sync? (4) Docs updated? (5) Tested at both breakpoints?

---

## 8. Engineering Rules

1. **No hardcoded values.** If you type a hex, rgb, or raw pixel in CSS, stop. Reference `var(--token-name)`.
2. **Golden rule of the palette:** cyan is primary action, violet is NIST/authority, magenta is alert/synthetic. Never swap roles.
3. **Section rhythm.** Every major section is `<section class="section">` wrapping `.container`. Never use margin-top on sections.
4. **Fonts are scoped.** Inter for UI/body, JetBrains Mono for code/data only. Never mix.
5. **Eyebrow everywhere.** Every major section starts with `.eyebrow`. It's the only label component.
6. **Two breakpoints.** Test at 900px and 640px. No custom breakpoints without team review.
7. **Reduced motion.** Every animation must be covered by `@media (prefers-reduced-motion: reduce)`.
8. **Z-index registry.** If your z-index isn't in `{-2, -1, 0, 1, 4, 5, 6, 10, 50, 80, 100, 999}`, add it to the table.
9. **Component diff pattern.** A new component = CSS + spec + state matrix + one production page. Minimum 4 files.
10. **Token rename rule.** Update `style.css` + `designsystem.html` + `design-tokens.json` in the same commit.
