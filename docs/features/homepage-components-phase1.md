# Homepage Components — Phase 1

Scoped to the five content sections visible between the site header and footer.
All content is authored in Sanity CMS.

---

## Sanity document architecture

The homepage is driven by two document types:

| Document type | Purpose | Desk path |
|---|---|---|
| `homePageOverride` | One document per banner. Contains hero ref, price callout, quick links, editorial cards, and rewards spotlight. | Homepage → 🎪 / 🏡 |
| `weeklyAdBannerOverride` | Hero content (image, headline, CTAs). Referenced by `homePageOverride.heroWeeklyAdRef`. | Weekly Ad → Banner Overrides → 🎪 / 🏡 |

The frontend resolves homepage content in two steps:
1. Fetch `homePageOverride` for the active banner.
2. Follow `heroWeeklyAdRef` to `weeklyAdBannerOverride` for hero-specific fields.

There is no standalone `quickLinksSection`, `rewardsBanner`, or `featuredContent` document — all of that content lives inside `homePageOverride`.

---

## Components in scope

| # | Component | Status | Source document | Schema work |
|---|---|---|---|---|
| 1 | `Hero` | Update | `homePageOverride` + `weeklyAdBannerOverride` | None — `priceCallout` already on `homePageOverride` |
| 2 | `StoreMessageCard` | Update (styles) | `storeMessage` | None |
| 3 | `QuickLinksCarousel` | New | `homePageOverride` | None — `quickLinkTiles` already on `homePageOverride` |
| 4 | `EditorialCardGrid` | Validate + polish | `homePageOverride` | None — `editorialCard1` / `editorialCard2` already on `homePageOverride` |
| 5 | `RewardsBanner` | Update (layout) | `homePageOverride` | None — `spotlight*` fields already on `homePageOverride` |

No schema changes are needed for this phase. All required fields are present.

---

## Implementation order

Build in this sequence.

---

## 1. Hero

**File**: `apps/web/src/components/Hero/Hero.tsx`

### Content sources

| UI element | Field path |
|---|---|
| Hero image | `weeklyAdBannerOverride.heroImage` |
| Eyebrow | `weeklyAdBannerOverride.heroEyebrow` |
| Headline | `weeklyAdBannerOverride.heroHeadline` |
| Promo copy | `weeklyAdBannerOverride.promotionalCopy` |
| Primary CTA | `weeklyAdBannerOverride.callToAction.{ label, url }` |
| Secondary CTA | `weeklyAdBannerOverride.secondaryCta.{ label, url }` |
| Price callout | `homePageOverride.priceCallout` (optional — see below) |

Reach `weeklyAdBannerOverride` by following `homePageOverride.heroWeeklyAdRef`.

### Price callout badge

- Circular white badge, overlaid on the hero image at bottom-left
- Optional — renders only when `homePageOverride.priceCallout` is non-null
- Fields available:

```ts
priceCallout: {
  price:       string   // e.g. "$1.49"
  unit:        string   // 'lb' | 'ea' | 'oz' | 'pk'
  productName: string
  badge?:      string   // optional, e.g. "SAVE NOW"
}
```

### DTO change

Add to the homepage DTO (not `WeeklyAdDTO`):

```ts
priceCallout?: {
  price:       string
  unit:        string
  productName: string
  badge?:      string
}
```

---

## 2. StoreMessageCard

**File**: `apps/web/src/components/StoreMessages/StoreMessageCard.tsx`

### Content source

`storeMessage` document — fields: `headline`, `body`, `ctaLabel`, `ctaUrl`.

### What changes

Layout update only — schema is sufficient:

- Full-width light gray card with generous vertical padding
- Bold centered headline (`text-2xl font-bold`)
- Centered body copy below
- Centered CTA button using `colorPrimary` (matches banner theme)

No schema changes needed.

---

## 3. QuickLinksCarousel

**Files to create**:
- `apps/web/src/components/QuickLinksCarousel/QuickLinksCarousel.tsx`
- `apps/web/src/components/QuickLinksCarousel/QuickLinksTile.tsx`
- `packages/cms-adapters/src/types/QuickLinkDTO.ts`

### Content source

`homePageOverride` — fields:

```ts
quickLinksHeading: string          // default: "Quick Links"
quickLinkTiles: Array<{
  image: SanityImageSource         // hotspot enabled
  label: string
  url:   string
}>
// validation: min 3, max 8 tiles
```

### Component structure

- Section heading driven by `quickLinksHeading`
- Horizontally scrollable row of tiles
- Left/right chevron nav buttons (prev/next)
- Each tile: square image → bold label + `>` arrow below
- Tiles overflow on mobile (scroll); show ~5–6 on desktop

### QuickLinksTile props

```ts
{
  label:    string
  imageUrl: string
  href:     string   // mapped from Sanity field `url`
}
```

### DTO (`QuickLinkDTO`)

```ts
z.object({
  label:    z.string(),
  imageUrl: z.string().url(),
  href:     z.string().url(),   // adapter maps `url` → `href`
})
```

No new schema file needed.

---

## 4. EditorialCardGrid

**Files**: `apps/web/src/components/EditorialCardGrid/`

### Content source

`homePageOverride` — two fixed slots:

```ts
editorialCard1: editorialCard   // required
editorialCard2: editorialCard   // required
```

Where `editorialCard` (object type) has:

```ts
{
  image:    SanityImageSource   // required, hotspot
  eyebrow?: string
  headline: string              // required
  body?:    string
  ctaLabel?: string
  ctaUrl?:   string
}
```

### What to do

Read the current `EditorialCardGrid.tsx` and `EditorialCard.tsx` before making changes. The design shows:

- Two equal-width columns
- Large image (fills card top)
- Bold headline, body copy, CTA button (primary color, full-width on mobile)

Validate the existing component against these requirements. Make only the adjustments needed to match. No structural rebuild unless the current implementation diverges significantly.

Any adapter logic must map `homePageOverride.editorialCard1` and `editorialCard2` — there is no standalone `featuredContent` document type.

---

## 5. RewardsBanner

**File**: `apps/web/src/components/RewardsBanner/RewardsBanner.tsx`

### Content source

`homePageOverride` — `spotlight` group fields:

```ts
spotlightHeadline:  string              // required
spotlightBody?:     string
spotlightCtaLabel?: string
spotlightCtaUrl?:   string
spotlightImage:     SanityImageSource   // required, hotspot
```

### What changes

**Two-panel split layout:**

- **Left panel** (light background, ~50% width): `spotlightHeadline`, `spotlightBody`, CTA button
- **Right panel** (dark navy background, ~50% width): `spotlightImage` filling the panel, with a static loyalty badge (Schnucks Rewards logo) in the upper-right corner

The loyalty badge is decorative/static — no CMS field needed.

### DTO change

Rename any references to the old `rewardsBanner` document fields. The correct adapter source is `homePageOverride`:

```ts
rewardsBanner: {
  headline:  string
  body?:     string
  ctaLabel?: string
  ctaUrl?:   string
  imageUrl:  string   // adapter maps spotlightImage → URL
}
```

---

## Out of scope for this phase

The following are planned but deferred:

- `UtilityNav` (utility link bar above header)
- `SiteHeader` navigation update
- `StoreSelector` bar
- `SiteFooter`
- `InfoTileRow` reskin
