# VisualCNS Design System

The brand, foundations, components, and product recreations for **VisualCNS** —
a software studio that *"builds software systems for modern businesses."* This
project is the single source of truth for designing on-brand VisualCNS artifacts
(marketing pages, the client dashboard, decks, mocks).

> **Namespace:** components are exposed at `window.VisualCNSDesignSystem_306574`
> in card/kit HTML. Consumers link `styles.css` and load `_ds_bundle.js`.

---

## 1. Company & product context

VisualCNS (the studio historically also branded **VisualHQ**) is a Lagos-based
software company that designs and engineers digital products across **ecommerce,
AI tooling, and experience platforms**, and offers **consulting / workflow
automation** retainers. Positioning line: *"Software systems, product businesses,
and AI-enabled tools built from Lagos for modern teams."*

**Products (sub-brands):**
- **Pasive** — ecommerce & creator-commerce ecosystem ("Your House, Your Rules"). Accent green `#10b981`.
- **Juju** — AI marketing suite. Accent orange `#f97316`.
- **Waddi** — AI experience / event planning ("Brief to Go"). Accent green `#10b981`.
- **ColussusIQ** — marketing intelligence platform. Accent violet `#8b5cf6`.
- **VisualHQ** — the consulting arm (portfolio, capabilities, industries).

**Capabilities:** Product Engineering · Business Automation · AI Enablement · Brand Systems.

**Surfaces represented here:** the marketing website (agency homepage, portfolio,
pricing) and the client/admin dashboard app.

### Sources this system was built from
- **Codebase:** `visualhq/` — a Next.js 16 + React 19 app (v0.app export). Tailwind v4, shadcn/ui (New York, radius 0), Radix UI, lucide-react, Firebase. Key reads:
  - Global CSS/tokens: `visualhq/app/globals.css`
  - Fonts: `visualhq/app/layout.tsx` (Inter, EB Garamond, Geist Mono, Outfit, Geist Pixel)
  - Brand lockup: `visualhq/components/brand-lockup.tsx`
  - Marketing: `components/header.tsx`, `footer.tsx`, `home-accordion.tsx`, `portfolio-section.tsx`, `pricing-section.tsx`, `lib/{brands,capabilities,news,plans,marketing}.ts`
  - App shell: `components/dashboard-shell.tsx`, `app-sidebar.tsx`, `app/dashboard/*`, `lib/projects.ts`
  - UI primitives: `components/ui/*.tsx`
- **Uploaded asset:** `uploads/visualhqlogo.svg` → the radiant star glyph (electric blue `#0E32FC`), copied to `assets/logo.svg`.
- Original repo referenced in codebase README: v0.app project "VisualHQ agency website".

---

## 2. Content fundamentals (voice & tone)

**Overall vibe:** confident, plainspoken, editorial. Reads like a senior studio
that ships — not a hype startup. Serif headlines give it a considered, almost
publication-like calm; the copy underneath is direct and jargon-light.

- **Person:** speaks as **"we"** (the studio) to **"you/your business"**. Never first-person singular. E.g. *"We connect your leads, content, and follow-up into one system that runs itself."*
- **Sentence style:** short, declarative, outcome-first. Names the pain, then the fix. E.g. *"Your tools don't talk to each other — so leads slip, follow-ups get missed."*
- **Casing:** Sentence case for headings and body. **UPPERCASE + wide tracking** (0.18em) for nav items, eyebrows, and section labels (`SOFTWARE`, `CONSULTING`, `PORTFOLIO`). Numbered sections use mono numerals (`01`, `02`).
- **Numbers & pricing:** concrete and up front. Dual currency (USD / ₦ naira). Timelines stated plainly (*"1 week"*, *"3–5 days"*, *"45 min"*).
- **CTAs:** imperative, friendly — *"Book Now"*, *"Get plan"*, *"Get Quote"*, *"Book a discovery call"*, *"Join →"*.
- **Emoji:** used **only in social/marketing ad captions** (🚀 ⚡ 📈 🧩) — never in product UI, headings, or docs.
- **Punctuation flourish:** arrow glyphs (`→`, `->`) for links and workflow steps (*"Plan campaign → Create content → Run ads"*).
- **Locale:** Lagos / Nigeria proudly present; naira pricing, local founder references. Global-but-rooted.

**Do:** name the outcome, quote a real price, keep it to one idea per line.
**Don't:** hedge, over-explain, use startup buzzwords, or bold the serif headings (they stay weight 400).

---

## 3. Visual foundations

**Signature:** editorial **EB Garamond** headings (always weight 400) over clean
**Inter** body, on **white with warm-cream cards**, punctuated by a single
**electric blue** accent and a **pixel wordmark**. Corners are **square** at the
base; **pills** for CTAs/nav; **soft 16px** for marketing cards.

### Color
- **Foundation:** white background `#fff`; warm off-white cards `#f3f2f0`; near-black ink text `hsl(222 84% 5%)`. A cool tinted surface `#e9eef6` for search fields and `#f8fafd` for app panels.
- **Accent:** one blue does the work — `hsl(221 83% 53%)` (~`#3b82f6`) for links, active states, focus rings, primary marketing CTAs, chart data. The **logo** uses a hotter electric blue `#0E32FC` — reserved for the glyph.
- **Neutrals:** a straight grey ramp; `#525252` for muted/secondary text; `hsl(214 32% 91%)` hairline borders (the workhorse — most structure is borders, not shadows).
- **Semantic:** destructive red `hsl(0 84% 60%)`, success green `#10b981`, warning orange `#f97316`. Status pills in the app: blue=in-progress, amber=review, emerald=done, muted=on-hold.
- **Imagery color:** warm, natural, real photography (Lagos studio, portraits, product screenshots) — not cool, not b&w, not heavily filtered. Brand identity mockups skew minimal/neutral.

### Type
- **Headings:** EB Garamond, **weight 400 always** (never bold), tight leading (~1.1). This regular-weight serif at large sizes is the single most recognizable trait.
- **Body/UI:** Inter, 14–18px, weights 400/500/600.
- **Labels/numerals:** Geist Mono for eyebrow numbers, small caps labels, codes, prices-as-data.
- **Wordmark:** **Geist Pixel** — used *only* for the "VisualCNS" logotype, never for anything else.
- **Display alt:** Outfit (geometric) for big numeric price figures.
- **Tracking:** wide (0.18–0.24em) uppercase for nav/eyebrows/kickers.

### Space & layout
- 4px base grid. Content maxes at `max-w-7xl` (80rem). Desktop gutters are generous (up to 80px). Sections breathe (~80px vertical rhythm).
- Fixed/sticky glass header (blurred, translucent white, hairline bottom border). App shell is a fixed sidebar + sticky topbar; only the content column scrolls.

### Shape, border, elevation
- **Radius:** base UI is **square** (`--radius: 0`) — buttons, inputs. Cards get a subtle 4px. Marketing offer cards and mega-menus use 16px. **Pills (9999px)** for nav links, CTAs, currency toggles, tool chips, status badges, progress bars.
- **Borders:** one hairline (`1px solid` border token) carries most of the structure — dividers between portfolio rows, footer groups, table rows, card edges.
- **Shadows:** restrained. `xs` on inputs, `sm` on cards, `md` on menus/popovers, `lg` on modals. No heavy or colored elevation. Elevation is a supporting actor to borders.

### Motion & states
- Quiet and functional. Color/opacity fades at 150–200ms, standard easing. **No bounce, no spring.** One playful exception: portfolio thumbnails scale to 1.05 over 500ms on hover.
- **Hover:** links/nav → turn blue; ghost/secondary buttons → light blue wash (`accent/15`); primary → slightly darker fill; portfolio → image zoom + blue title.
- **Focus:** 3px blue ring at 50% opacity (`--shadow-ring`).
- **Active/press:** color change only (no shrink).
- **Transparency/blur:** reserved for the sticky header and app topbar (backdrop blur over translucent white), and modal scrims (ink at 50% + slight blur).

### Backgrounds
No gradients as a rule. Flat white / cream / ink fields. Full-bleed real photography for portfolio and marketing imagery. No repeating patterns or textures. The footer is a solid ink block with an inverted (white) logo.

---

## 4. Iconography

- **Primary set:** **Lucide** (via `lucide-react` in the codebase) — thin, 2px stroke, rounded caps, 24px grid. This is the app + marketing icon language. In this system, the dashboard kit ships an inline Lucide subset (`ui_kits/dashboard/Icons.jsx`) using **exact Lucide path data**; for new work, use Lucide (CDN `https://unpkg.com/lucide@latest` or `lucide-react`).
- **Secondary set:** **react-icons/fi** (Feather) appears in the pricing plan icons (`FiShoppingCart`, `FiBarChart2`, …). Feather and Lucide share a lineage (same stroke feel), so they mix cleanly.
- **Brand glyph:** the radiant 12-point star (`assets/logo.svg`, `assets/logoblue.svg`) and the "N/arrow" favicon monogram (`assets/icon.svg`). The star is the mark; pair with the Geist Pixel wordmark via `BrandLockup`.
- **Tool/vendor marks:** pricing/workflow chips reference third-party tools (Webflow, Framer, Meta, SendPulse, Notion, WhatsApp, Cal.com…) as small labeled chips, sometimes with brand-colored initials.
- **Emoji:** only inside social ad captions. **Unicode glyphs** used lightly as inline arrows (`→`, `->`) and social/action affordances.
- **Rule:** never hand-draw brand icons or the logo; use Lucide/Feather for UI glyphs and the copied SVGs for the brand mark.

---

## 5. Index / manifest

**Root**
- `styles.css` — entry point (only `@import`s). Link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `thumbnail.html` — homepage tile.
- `readme.md` — this guide. `SKILL.md` — Agent-Skills wrapper.
- `assets/` — `logo.svg`, `logoblue.svg`, `icon.svg`, `brands/`, `imagery/`, `people/`, `screenshots/`.

**Components** (`window.VisualCNSDesignSystem_306574`), grouped:
- **forms/** — `Button`, `Input`, `Textarea`, `Label`, `Select`, `Switch`
- **data-display/** — `Card` (+ `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`), `Badge`, `Table` (+ `TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell`), `Avatar`, `Separator`, `Skeleton`
- **navigation/** — `Accordion`, `Breadcrumb`, `DropdownMenu`
- **feedback/** — `Tooltip`, `Dialog`
- **brand/** — `BrandLockup`

**UI kits** (`ui_kits/`)
- **website/** — marketing homepage recreation (Header, HomeSections/Accordion+Portfolio, Pricing, Footer). Open `ui_kits/website/index.html`.
- **dashboard/** — client dashboard recreation (Login → Sidebar/Topbar shell → Overview/Projects/Tasks/Drive/Marketing). Open `ui_kits/dashboard/index.html`.

**Foundations** (`guidelines/*.card.html`) — specimen cards for the Design System tab: colors (brand, neutrals, surfaces, status, products, charts), type (display, body, mono, wordmark), spacing (scale, radius, in-use), brand (elevation, logo).

### Intentional additions
- **`BrandLockup`** — not a shadcn primitive, but the studio's real brand component (`brand-lockup.tsx`). Included because typesetting "VisualCNS" correctly (star glyph + Geist Pixel wordmark) is a brand rule.

### Coverage notes / not built
The codebase's shadcn set includes several primitives folded into the patterns
above rather than shipped standalone: **AlertDialog / Sheet** → use `Dialog`;
**Popover / ContextMenu** → use `DropdownMenu`; **Collapsible** → use `Accordion`.
Two heavyweight app-specific pieces — the **Sidebar** block and the **Command**
palette — are demonstrated in-context inside the dashboard UI kit rather than as
standalone primitives. Ask if you want any of these promoted to first-class
components.

## Font substitution
None required — every VisualCNS typeface (Inter, EB Garamond, Geist Mono, Outfit,
**Geist Pixel**) is a real Google Font, loaded via `tokens/fonts.css` exactly as
the production app loads them. No local binaries were needed, so the compiler
lists 0 `@font-face` rules; consumers still get the fonts through the Google
`@import` in `styles.css`.
