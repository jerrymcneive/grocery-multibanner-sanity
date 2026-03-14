# Content Health Skill

## Purpose
Audit Sanity content for orphaned drafts, broken references, and missing banner content.
Outputs a triage report: critical / warning / info.

## When to Use
- After a content migration or schema deployment
- When content appears missing or broken in staging/production
- As part of release readiness checks

## Workflow

### Step 1 — Orphaned drafts
Fetch all drafts and all published doc IDs in two queries, then diff:

```groq
// Query A — all drafts
*[_id in path("drafts.**")]{ _id, _type, _updatedAt }

// Query B — published IDs for those same base IDs
// (strip "drafts." prefix client-side, then run)
*[_id in $baseIds]{ _id }
```

Build the set of `baseIds` by stripping the `drafts.` prefix from each result of Query A.
Any baseId not found in Query B result has no published counterpart → orphaned.
Flag as **warning** — drafts are not errors but may indicate forgotten unpublished work.

Do NOT call `get_document` per draft — use the two-query batch approach above.

### Step 2 — Broken references
For each document type that contains reference fields (identified via `get_schema`), query for
documents where referenced `_ref` values point to non-existent documents.

Strategy: fetch all `_ref` values in one query, then validate existence in a second batch query:
```groq
// Query A — collect all ref values
*[_type == "X" && defined(refField._ref)]{ _id, "ref": refField._ref }

// Query B — check which IDs actually exist (pass collected refs as $ids param)
*[_id in $ids]{ _id }
```
Any `_ref` value from Query A absent from Query B results is a broken reference.
Flag as **critical** — broken references cause runtime errors in the front end.

Do NOT call `get_document` per reference — use the two-query batch approach above.

Always derive the full reference-field list from `get_schema` output — do not rely on a hardcoded
list. As an example: at initial schema, `weeklyAdBannerOverride.weeklyAdBase` was the only
reference field, but this will change as the schema grows.

### Step 3 — Per-banner content coverage
For each Phase 1 banner (`festival-foods`, `hometown-grocers`), check that banner-scoped
document types have at least one published document. Use the correct filter for each type's
field shape (field shape differs per type — see `src/sanity/CLAUDE.md` Rule 3):

Do not query `weeklyAdBase` — it carries no banner field and is not banner-scoped. Check only:
- String-field types (`bannerConfig`, `featuredContent`, `weeklyAdBannerOverride`): use `banner == $banner`
- Array-field types (`campaign`, `storeMessage`): use `$banner in banners[]`

```groq
// String-field types: bannerConfig, featuredContent, weeklyAdBannerOverride
*[_type == "X" && banner == $banner && !(_id in path("drafts.**"))][0]{ _id }

// Array-field types: campaign, storeMessage
*[_type == "X" && $banner in banners[] && !(_id in path("drafts.**"))][0]{ _id }
```

Flag as **info** if a banner has zero published documents for a content type — may be expected
for new banners, but worth surfacing.

### Step 4 — Report

```
## Content Health Report — <timestamp>

### Critical (broken references)
  ❌ productCard/abc123 → refField → xyz789 (not found)

### Warning (orphaned drafts)
  ⚠️  drafts.heroBanner/def456 — last updated 2026-03-10 — no published counterpart

### Info (empty banner content)
  ℹ️  hometown-grocers has no published "promoBlock" documents

### Summary
  Critical: 1  |  Warning: 2  |  Info: 1
```

If all checks pass:
```
✅ Content health OK. No critical issues found.
```

## Exit Criteria
- Report printed to output
- Exits 0 in all cases (diagnostic only)
- Critical items should be resolved before shipping content-dependent features
