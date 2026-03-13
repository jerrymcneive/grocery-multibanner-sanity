# ADR-002: Sanity Content Model — Decision Framework

## Status
Open — Hybrid approach recommended, pending confirmation

## Context
The CMS must support content for two Phase 1 banners (Festival Foods, Hometown Grocers)
with Schnucks joining in a future phase. Content needs vary:
- Some content is shared across banners (simple targeting)
- Some content needs field-level differences per banner (overrides)

## Decision Framework

### Pattern A: `banners[]` Field (Lightweight)
Use for content that is shown/hidden by banner but doesn't differ in fields.
- Store messages
- Simple promotions
- Navigation items

### Pattern B: Base Doc + Banner Override (Rich)
Use for content that needs field-level differences per banner.
- Weekly ads (different hero images per banner)
- Campaigns (different promotional copy)
- Featured merchandising

## Recommendation
**Hybrid approach** — Pattern A for lightweight content, Pattern B for rich content.
This avoids over-engineering simple cases while supporting divergence where needed.

## Open Questions
- [ ] Confirm with Schnucks PO: Do Festival Foods and Hometown Grocers need field-level overrides?
- [ ] Define which content types use which pattern

## Phase 1 Scope
- Festival Foods: ✅ In scope
- Hometown Grocers: ✅ In scope
- Schnucks: ⏳ Deferred — schema extension-ready
