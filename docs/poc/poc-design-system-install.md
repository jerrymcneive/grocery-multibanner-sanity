# POC Design System — Installation Guide
### `grocery-multibanner-sanity`

The token pipeline, Tailwind integration, CSS variable injection, BannerProvider, and
`[banner]` routing are all already in place. This is not a ground-up install.
You are filling in three specific gaps: token completeness, missing components, and
page assembly.

---

## What Already Exists (Do Not Touch)

| What | Where | Status |
|---|---|---|
| CSS variable injection | `apps/web/src/app/[banner]/layout.tsx` | ✅ Done |
| Token → CSS var conversion | `packages/theme-tokens/src/cssVars.ts` | ✅ Done |
| Tailwind config bridged to tokens | `apps/web/tailwind.config.ts` | ✅ Done |
| `BannerProvider` + context | `apps/web/src/lib/banner/` | ✅ Done |
| `SiteHeader`, `SiteFooter` (stub) | `apps/web/src/components/layout/` | ✅ Exists, needs expansion |
| `Hero`, `WeeklyAdGrid`, `StoreMessages` | `apps/web/src/components/` | ✅ Exists, needs styling |
| Fixture data per banner | `apps/web/src/fixtures/` | ✅ Done |
| Banner-scoped routing | `apps/web/src/app/[banner]/page.tsx` | ✅ Done |

---

## Step 1 — Expand the Token Definitions

The `BannerTokens` type in `packages/theme-tokens/src/types.ts` needs two additional
tokens to support the full design system. Open that file and add:

```ts
// Add to BannerTokens interface
colorSurface: string           // card/section background
colorBorder: string            // dividers, card outlines
```

Then add the values to each banner token file:

**`packages/theme-tokens/src/tokens/festival-foods.ts`**
```ts
colorSurface: '#F7F7F7',
colorBorder: '#E5E7EB',
```

**`packages/theme-tokens/src/tokens/hometown-grocers.ts`**
```ts
colorSurface: '#F9FBF9',
colorBorder: '#E5E7EB',
```

The `tokensToCssVars` function is generic — it will automatically output
`--color-surface` and `--color-border` once these are added to the type.

Then expose them in Tailwind by adding to `packages/theme-tokens/src/tailwindTheme.ts`:

```ts
// Add inside the colors block
surface: 'var(--color-surface)',
border: 'var(--color-border)',   // note: this key already exists in default Tailwind,
                                  // so use `border-color` or a custom key like `outline`
```

> **Note:** Run `pnpm run theme:verify --banner=festival-foods` and
> `pnpm run theme:verify --banner=hometown-grocers` after this step.
> The post-edit hook will fire typechecks automatically.

---

## Step 2 — Expand Existing Stub Components

These components exist but are minimal stubs. Restyle them to match the design system spec.
Do not change their props interface — only their markup and Tailwind classes.

### `apps/web/src/components/layout/SiteHeader.tsx`
Current: single `<header>` with display name.
Target: utility bar strip on top + full nav row with logo placeholder, nav links,
search/sign-in/cart placeholder, store selector sub-bar.
All values from `useBanner()` — no hardcoded copy except nav link labels.

### `apps/web/src/components/Hero/Hero.tsx`
Current: centered text block on primary background.
Target: split layout (left: eyebrow + headline + subhead + price badge + dual CTAs;
right: grey placeholder rectangle). Headline and copy already wired to DTO props.
Add `callToAction` prop rendering once `WeeklyAdDTO` exposes it (see Step 3).

### `apps/web/src/components/layout/SiteFooter.tsx`
Current: single copyright line.
Target: 5-column link grid (static nav labels) + app store badge placeholders +
legal row. Banner name from `useBanner()`.

---

## Step 3 — Add New Components

Create these files. Each is a new component — no existing file to edit.

```
apps/web/src/components/
  AnnouncementStrip/
    AnnouncementStrip.tsx       ← full-width strip, emoji + message + CTA
  CategoryShortcuts/
    CategoryShortcuts.tsx       ← 6-up horizontal scroll grid
    CategoryShortcutItem.tsx    ← single icon tile
  EditorialCardGrid/
    EditorialCardGrid.tsx       ← 2-col editorial card layout
    EditorialCard.tsx           ← image + eyebrow + headline + copy + CTA
  RewardsBanner/
    RewardsBanner.tsx           ← full-width primary bg, headline + CTA + image placeholder
  InfoTileRow/
    InfoTileRow.tsx             ← 3-col tile row, primary bg
    InfoTile.tsx                ← heading + body + outlined button
  layout/
    HelpBar.tsx                 ← single-row help strip (already partially in Footer stub)
  DataSourceLabel/
    DataSourceLabel.tsx         ← POC-only ribbon overlay (absolute positioned)
```

All components consume values from:
- `useBanner()` for display name, colors (via CSS vars)
- Props typed against DTOs from `@grocery-multibanner/cms-adapters`
- **No hardcoded hex values** — Tailwind token classes only (`bg-primary`, `text-foreground`, etc.)

---

## Step 4 — Update the Page Assembly

`apps/web/src/app/[banner]/page.tsx` currently renders:
```
Hero → CampaignCarousel → StoreMessages → WeeklyAdGrid
```

Update it to render the full zone sequence from the design system:
```
StoreMessage (utility bar)     ← already in SiteHeader zone via layout.tsx
AnnouncementStrip
Hero
CategoryShortcuts
EditorialCardGrid
RewardsBanner
InfoTileRow
HelpBar
```

`SiteHeader` and `SiteFooter` are rendered by `layout.tsx` — don't add them in `page.tsx`.

Data for new zones comes from fixtures initially (Step 5), then Sanity fetchers once
content is seeded.

---

## Step 5 — Expand Fixtures for New Zones

Add fixture data for each new zone to the existing fixture files:

**`apps/web/src/fixtures/festival-foods/`** — add:
- `announcementStrip.ts`
- `categoryShortcuts.ts`
- `editorialCards.ts`
- `rewardsPromo.ts`
- `infoTiles.ts`

**`apps/web/src/fixtures/hometown-grocers/`** — same files, different copy.

Use the content from the design system's **§7 Demo Content Model** table as the
fixture values. This is the copy that will be live-typed into Sanity during the demo —
having it in fixtures first lets you validate the layout before the demo day.

Update `apps/web/src/fixtures/index.ts` to export the new fixture shapes and add
them to the `BannerFixtures` interface.

---

## Step 6 — Add the DataSourceLabel Overlay (POC Only)

`DataSourceLabel` is a small absolute-positioned ribbon used during the demo to make
the Sanity override mechanism visually obvious.

```tsx
// apps/web/src/components/DataSourceLabel/DataSourceLabel.tsx
interface Props {
  source: 'default' | 'override'
}
// Renders a small ribbon in top-right corner of its nearest `relative` parent
// 'default' → grey background, "Sanity default"
// 'override' → primary color background, "Banner override"
```

Wrap it inside `Hero` and `RewardsBanner` — the two components most likely to show
override behavior during the demo. Gate it on an env var or a query param so it
can be hidden quickly:

```ts
// Only render if NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS=true
```

---

## Step 7 — Run Verification

```bash
# From repo root
pnpm run typecheck          # all packages
pnpm run theme:verify --banner=festival-foods
pnpm run theme:verify --banner=hometown-grocers
pnpm run dev:web            # visual check both routes
```

Open:
- `http://localhost:3000/festival-foods`
- `http://localhost:3000/hometown-grocers`

Confirm: different colors, same layout, all zones render from fixture data.

---

## What This Is NOT

This installation guide does not cover:

- Wiring new components to live Sanity fetchers (that's the demo day setup in the runbook)
- Mobile (`apps/mobile`) — POC is web-first
- Accessibility audit
- Any production performance optimization

Once fixtures validate the layout, swap fixtures → Sanity fetchers one zone at a time,
following the runbook sequence.

---

## Suggested Branch Name

```
feature/poc-design-system
```

Branch off `feature/phase-1-foundation`. Single PR. All new component files are additive —
no destructive changes to existing architecture.
