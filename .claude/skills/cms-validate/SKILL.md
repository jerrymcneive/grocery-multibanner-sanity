# CMS Validate Skill

## Purpose
Diff local schema files against the deployed Sanity schema. Confirms documents are reachable.
Run before `/ship` whenever `sanity-studio/schemaTypes/` or `sanity-studio/schemas/` changed.

## When to Use
- Automatically invoked by `/ship` when Sanity schema files are modified
- Manually when you suspect schema drift between local and deployed

## Workflow

### Step 1 — Retrieve deployed schema
Call `get_schema` (MCP) to retrieve the currently deployed schema for the project.
Extract all top-level document type names from the result.

### Step 2 — Read local schema
Glob `sanity-studio/schemas/**/*.{ts,tsx,js}` (this project's active directory) and, as a
fallback, `sanity-studio/schemaTypes/**/*.{ts,tsx,js}` (Sanity's default scaffold path — not
present today, but checked so this skill survives a directory rename). Union all results.
Expect zero results from `schemaTypes/` in the current repo; that is not an error.
Extract all `defineType({ name: "..." })` names from the matched files.

### Step 3 — Diff type names
- **Local only (not deployed):** Schema types defined locally but absent from deployed schema.
  These are undeployed changes.
- **Deployed only (not local):** Schema types in deployed schema but absent from local files.
  These are stale/orphaned deployed types.
- **Shared types:** Types present in both — proceed to field-level diff.

### Step 4 — Field-level diff on shared types
For each shared type, compare field names between local `defineField` declarations and the
deployed schema fields. Report added and removed fields.

### Step 5 — Probe document reachability
For each top-level document type in the deployed schema, run:
```groq
*[_type == "X"][0]{ _id, _type }
```
via `query_documents`. A `null` result is acceptable — it means the type is queryable but has
no documents yet. This probe confirms reachability only, not content presence; per-banner
content coverage is checked separately by `/content-health`.
If `query_documents` returns an authentication or network-level error, abort Step 5 and
report "Reachability check could not complete — verify project ID, dataset, and MCP auth."
Only flag a type as unreachable if the query is rejected by the dataset itself (not by a
transport/auth layer).

### Step 6 — Report

**Zero drift — schema is in sync:**
```
✅ Schema in sync. N types match. All document types reachable.
```

**Drift found:**
```
⚠️  Schema drift detected:

Local only (not deployed):
  - promoBlock
  - heroBanner

Deployed only (not local):
  - legacyCard

Field mismatches on shared types:
  - productCard: local has [price, sku], deployed missing [sku]

Recommendation: run `npx sanity@latest schema deploy` to deploy local schema.
Migration docs required in docs/ for any removed or renamed fields.
```

## Exit Criteria
- Report printed to output
- Exits 0 in all cases (non-blocking diagnostic)
- If drift found, `/ship` must block until drift is resolved (see `ship/SKILL.md`)
