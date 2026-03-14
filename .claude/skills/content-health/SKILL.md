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
Query for all draft documents that have no corresponding published document:
```groq
*[_id in path("drafts.**")]{ _id, _type, _updatedAt }
```
A draft is "orphaned" if its base ID (stripping `drafts.` prefix) has no published counterpart.
Flag as **warning** — drafts are not errors but may indicate forgotten unpublished work.

### Step 2 — Broken references
For each document type that contains reference fields (identified via `get_schema`), query for
documents where referenced `_ref` values point to non-existent documents.

Strategy: fetch all `_ref` values for a reference field, then verify each referenced ID exists:
```groq
*[_type == "X" && defined(refField._ref)]{ _id, "ref": refField._ref }
```
Then check each `_ref` with `get_document`. Missing documents = broken references.
Flag as **critical** — broken references cause runtime errors in the front end.

### Step 3 — Per-banner content coverage
For each Phase 1 banner (`festival-foods`, `hometown-grocers`), check that banner-scoped
document types have at least one published document:
```groq
*[_type == "X" && banner == $banner && !(_id in path("drafts.**"))][0]{ _id }
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
