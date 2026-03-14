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
Glob `sanity-studio/schemas/**/*.ts` (check for `sanity-studio/schemaTypes/**/*.ts` as well — some projects use that path).
Extract all `defineType({ name: "..." })` names from local files.

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
via `query_documents`. A `null` result is acceptable (no documents yet). An error indicates
the type is unreachable or the query is malformed.

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
