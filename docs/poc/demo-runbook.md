# Demo Runbook — `grocery-multibanner-sanity` POC
### Unified Sanity Studio · Multi-Banner Architecture · Monorepo Benefits

**Audience:** Internal WWT team + Schnucks stakeholders (Ryan, Chris, Gina, Ray)
**Duration:** ~25–35 minutes
**Goal:** Show that one CMS serves many banners, and that the monorepo makes banner additions cheap and safe.

---

## Pre-Demo Checklist

Run these before the call. Don't skip them.

```bash
# 1. Ensure schema is deployed
cd sanity-studio && npx sanity@latest schema deploy

# 2. Start all apps
pnpm run dev                     # runs web + sanity-studio via Turbo

# 3. Verify both banner routes render
open http://localhost:3000/festival-foods
open http://localhost:3000/hometown-grocers

# 4. Verify Sanity Studio loads
open http://localhost:3333

# 5. Confirm seed data is present
cd sanity-studio && pnpm run seed   # idempotent — safe to re-run
```

### Browser tabs to have open before demo starts

| Tab | URL | Purpose |
|---|---|---|
| Festival Foods web | `localhost:3000/festival-foods` | Live render |
| Hometown Grocers web | `localhost:3000/hometown-grocers` | Live render |
| Sanity Studio | `localhost:3333` | Content authoring |
| Repo root | GitHub / VS Code | Monorepo structure walkthrough |

---

## Act 1 — The Problem (2 min)

**Talking points (don't read verbatim):**

> "Traditional multi-banner setups give you two choices: duplicate everything and maintain two codebases, or share everything and fight merge conflicts. Neither works at scale.
>
> What we've built is a third option: one codebase, one CMS, intentional separation where separation earns its keep."

**Visual:** Show the repo tree in the terminal or IDE.

```
apps/
  web/              ← one Next.js app, routing is banner-scoped
  mobile/           ← one React Native app
packages/
  shared-ui/        ← components that work for any banner
  theme-tokens/     ← per-banner brand values, no component changes needed
  cms-adapters/     ← Sanity queries + DTO layer
sanity-studio/      ← ONE Studio for all banners
```

**Key point to land:** Adding a third banner (Schnucks) requires adding tokens and a config doc. It does not require a new repo, a new Studio, or a new deployment pipeline.

---

## Act 2 — Sanity Studio Tour (5 min)

Navigate to `localhost:3333`.

### 2a. Desk Structure

Show the left rail. Walk through the content-type-first organization:

- **Weekly Ads** → Weekly Ad Base (shared) + Banner Overrides (per-banner)
- **Featured Content** → Editorial card grid content, including promotion tiles with eyebrow labels
- **Announcement Strip** → Promotional strip across the top of the page, with optional CTA and date window
- **Rewards Banner** → Dedicated loyalty messaging per banner — separate from product promotions
- **Info Tile Row** → Service tiles (Delivery, Pickup, Pharmacy, etc.) — up to 6 per banner
- **Store Messages** → Operational notices (closures, hours); `banners[]` array targets which banners see them
- **Banner Config** → Singleton per banner; drives display name, colors, tagline

> "Notice we didn't split the Studio into a Festival Foods section and a Hometown Grocers section. Content lives by *type*, not by banner. A content author doesn't need to know which banner they're in — they just work on the document type that matches what they need to update."

### 2b. Open the Banner Config docs

Open `Banner Config → Festival Foods`. Show the fields:
- Display name, primary/secondary color, tagline, support email, store count, regions

Open `Banner Config → Hometown Grocers`. Same fields, different values.

> "This is the only place brand values live in the CMS. The frontend reads these and never has a hardcoded hex value."

### 2c. Open an Announcement Strip doc

Open or create an `Announcement Strip` for Festival Foods. Show:
- **Message** — the strip copy (max 120 chars)
- **CTA Label / URL** — optional link shown after the message
- **Active From / Until** — date-windowed; the strip self-deactivates

> "Before this schema existed, the announcement strip was fixture-only — frozen in code. Now a content author can change it without a deployment."

### 2d. Open the Rewards Banner doc

Open or create a `Rewards Banner` for one of the banners. Show:
- **Headline** — primary loyalty message
- **Body** — supporting copy
- **Hero Image** — optional visual
- **CTA Label / URL** — enrollment or learn-more link
- **Active From / Until** — same date-windowing as the announcement strip

> "The campaign document type is great for product promotions with point multipliers and linked SKUs. The Rewards Banner is purpose-built for loyalty program messaging — joining, earning, redeeming. Different intent, different schema."

---

## Act 3 — Default Content Creation (8 min)

### 3a. Create a new Weekly Ad Base

In Studio: `Weekly Ads → Weekly Ad Base → New`

Fill in:
- **Title:** `Demo Week — Fresh Deals`
- **Valid dates:** this week
- **Items:** Add 2–3 items (generic: "Chicken Breast — $3.99/lb", "Whole Milk — $2.49", "Russet Potatoes 5lb — $1.99")

Publish.

> "This document is the shared foundation. Every banner that has a weekly ad will reference this. If we change a price here, all banners inherit it — unless a banner has overridden that specific item."

### 3b. Watch it appear on both frontends

Switch to the Festival Foods web tab. Hard-refresh.

> "The web app picks this up immediately. No deployment. No rebuild. That's the Sanity real-time layer working."

Switch to Hometown Grocers tab. Same content renders.

> "Same data. Two banners. Different themes — watch the colors."

Point out:
- Festival Foods: red primary, gold badge accents
- Hometown Grocers: green primary, cream surface tones
- **Same components. Same Sanity query. Different tokens.**

---

## Act 4 — Banner Override in Action (8 min)

### 4a. Create a Banner Override

In Studio: `Weekly Ads → Banner Overrides → New`

Fill in:
- **Weekly Ad:** select `Demo Week — Fresh Deals` (the base we just created)
- **Banner:** `Festival Foods`
- **Hero Eyebrow:** `THIS WEEK'S DEALS` ← was hardcoded before; now CMS-controlled
- **Hero Headline:** `Spring Into Savings at Festival Foods!`
- **Promotional Copy:** `Wisconsin's freshest deals. Valid at all 34 Festival Foods locations.`
- **Primary CTA Label:** `Shop Festival Deals`
- **Primary CTA URL:** `/weekly-ad`
- **Secondary CTA Label:** `View Weekly Ad` ← new field; previously no schema existed for this link
- **Secondary CTA URL:** `/weekly-ad/browse`
- **Featured Categories:** Add 3–4 entries. For each, select a category key, add an emoji, and add a href.
  - `meat` · 🥩 · `/departments/meat`
  - `produce` · 🥦 · `/departments/produce`
  - `dairy` · 🥛 · `/departments/dairy`
- **Badge for Chicken Breast:** `Manager's Special` (via Item Override)

Publish.

> "Two things to call out here. First, the eyebrow label 'THIS WEEK'S DEALS' used to be hardcoded in the component — a developer had to change it. Now it's a field. Second, the category shortcuts now carry an emoji and a link, not just a string enum. The component can render them directly."

### 4b. Show the differential

Switch to Festival Foods tab. Refresh.

> "Festival Foods now has its own eyebrow, its own headline, its own CTAs, its own category shortcuts. It didn't require a separate document from scratch — it's a targeted override on top of the shared base."

Switch to Hometown Grocers tab.

> "Hometown Grocers still shows the base content. It has no override yet, so it inherits everything from the shared document. The DTO layer merges these — base first, override on top."

### 4c. Create the Hometown Grocers override

Back in Studio, create another override:
- **Banner:** `Hometown Grocers`
- **Hero Eyebrow:** `FRESH THIS WEEK`
- **Hero Headline:** `Neighbors Helping Neighbors Save`
- **Promotional Copy:** `Great prices from your local Missouri and Kansas grocer.`
- **Primary CTA Label:** `See This Week's Deals`
- **Featured Categories:**
  - `produce` · 🥦 · `/departments/produce`
  - `bakery` · 🥖 · `/departments/bakery`
- **Badge for Potatoes:** `Locally Sourced` (via Item Override)

Publish. Refresh Hometown Grocers tab.

> "Now both banners have their own voice. One base document. Two override documents. Content authors can work independently on their banners without touching what the other banner sees."

---

## Act 5 — Content Author UX (3 min)

Walk through Studio from a content author's perspective:

1. **I need to update a price across all banners.**
   → Edit the Weekly Ad Base. Done. Both banners inherit.

2. **I need Festival Foods to say something different in their hero, including a custom eyebrow.**
   → Open the Festival Foods Banner Override. Edit `heroEyebrow` and `heroHeadline`.

3. **I need to add a category shortcut with an emoji and a link.**
   → Open the Banner Override → Featured Categories → add an entry with `value`, `emoji`, and `href`.

4. **I want to run a promotional announcement strip for Hometown Grocers only.**
   → Create an Announcement Strip. Set `banner` to Hometown Grocers, write the message, add a CTA, set the active window. No code change.

5. **I want to update the loyalty program messaging in the Rewards Banner.**
   → Open the Rewards Banner for that banner. Edit headline, body, and CTA. Publish.

6. **I want a store closure notice that only Hometown Grocers customers see.**
   → Create a Store Message. In `banners[]`, select only Hometown Grocers.

7. **I want a message all banners see.**
   → Create a Store Message. Select all banners in the array.

> "No training on which repo to commit to. No asking a developer to push a content change. One Studio, clear affordances."

---

## Act 6 — Monorepo Benefits (5 min)

This is the engineering-facing part. Adjust depth based on audience.

### 6a. Show the theme-tokens package

Open `packages/theme-tokens/src/tokens/festival-foods.ts` and `hometown-grocers.ts`.

> "Every color you've seen in the demo comes from these files. The components don't know what `#E31837` is — they know `--color-primary`. When we activate a new banner, we add a token file and a config doc. Zero component changes."

### 6b. Show the cms-adapters package

Open `packages/cms-adapters/src/`.

> "This is the DTO layer. Raw Sanity documents never reach a React component. They pass through typed adapters that merge base + override and hand a clean, typed object to the frontend. The frontend doesn't know Pattern A from Pattern B — it just gets a DTO."

### 6c. Show Turbo's build graph (optional, if audience is technical)

```bash
pnpm run build --dry-run
```

> "Turbo knows that `shared-ui` depends on `theme-tokens`, and that `web` depends on `shared-ui` and `cms-adapters`. When we change one package, only its dependents rebuild. A token change doesn't rebuild mobile if mobile didn't change."

### 6d. The Schnucks activation story

> "We said Schnucks is deferred. What does activation actually look like?
>
> 1. Add `schnucksTokens` to `packages/theme-tokens/`
> 2. Publish the `bannerConfig` doc in Sanity (already schema-ready)
> 3. Add a banner route in `apps/web/` and `apps/mobile/`
>
> That's it. The schema already supports Schnucks in every document type — the banner dropdown in the Studio already has the Schnucks option. The components already read from tokens. We're adding configuration, not building new infrastructure."

---

## Act 7 — Q&A Setup (2 min)

Before opening to questions, set the table:

> "What you've seen today is the CMS and frontend working together as one system. The Studio is the single source of truth for all banners. The monorepo means that a change to shared logic touches every surface in one commit. And the token + override model means banners can diverge exactly as much as they need to — no more, no less.
>
> The open questions we're tracking are around backend integration, loyalty API handoff, and the Schnucks activation timeline. Those live outside this repo — WWT owns what you saw today."

---

## Common Questions & Prepared Answers

| Question | Answer |
|---|---|
| What if Festival Foods wants a completely different layout, not just different copy? | The override model handles field-level differences. Structural layout changes would be handled via a banner-specific component variant — still in the same monorepo, still using the same tokens. |
| Who manages Sanity user access? | Studio access is managed through Sanity's built-in roles. We can scope content authors to specific document types. This is a setup task, not an architecture change. |
| Can a content author accidentally publish something to the wrong banner? | The `banner` field on override docs is a required radio button. Authors explicitly select the target banner. `banners[]` array fields on Store Messages and Campaigns require at least one selection. Sanity's validation blocks publishing without it. |
| How does this handle scheduled content? | Sanity supports document scheduling natively. Announcement Strips and Rewards Banners have built-in `activeFrom`/`activeUntil` fields. Weekly Ad Bases can also be scheduled; their overrides publish independently or alongside the base. |
| Why a separate Rewards Banner type instead of reusing Campaign? | Campaign is designed for product promotions — it has `rewardPointMultiplier` and `linkedProducts`. Rewards Banner is for loyalty program messaging: joining, earning, redeeming. Different intent, different fields. Keeping them separate prevents content authors from having to ignore irrelevant fields. |
| What does adding a fourth banner cost? | Token file + config doc + route. Estimated 1–2 dev days for a new banner that fits the existing content model. More if new content types are needed. |

---

## If Something Breaks

| Problem | Recovery |
|---|---|
| Studio won't load | `cd sanity-studio && pnpm run dev` — check for port conflict on 3333 |
| Web app 404 on banner route | Confirm `pnpm run dev:web` is running; check `[banner]` route exists in `apps/web/src/app/` |
| Override not appearing | Check doc is **published** (not draft) in Studio; hard-refresh browser |
| Schema type not found | Run `cd sanity-studio && npx sanity@latest schema deploy` |
| Seed data missing | `cd sanity-studio && pnpm run seed` |
| `categoryShortcut` fields missing from override | Schema may not be deployed — run `npx sanity@latest schema deploy` from `sanity-studio/` |
| Announcement Strip / Rewards Banner / Info Tile Row not in left rail | Same as above — deploy schema and reload Studio |

---

## Post-Demo Next Steps to Offer

1. Walk through the AI development harness (Claude Code + hooks) in a separate session
2. Schema evolution demo — add a field, migrate existing docs, zero downtime
3. Schnucks activation planning — what's the actual activation checklist?
4. Content author training session — Studio-only, no engineering required
