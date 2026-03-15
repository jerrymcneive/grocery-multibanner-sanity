# Session Summary — 2026-03-15

## Overview

Starting point: `feature/phase-1-foundation` branch. The agent harness (skills, hooks, agents,
CLAUDE.md files) had been built before Sanity MCP was in play. The session had two goals:

1. **Wire Sanity MCP into the harness** — close the gap between documented MCP capabilities
   (`docs/sanity-mcp.md`) and the skills/agents that do CMS work.
2. **Stress-test the integration** — run the new skills against the live Sanity project to find
   real issues, then use those findings to improve the harness.

A third goal emerged mid-session through conversation: articulate and persist a design principle
for tool selection that the harness could embody going forward.

---

## Key Decisions

### 1. MCP as access layer, not knowledge layer
CMS-specific knowledge (banner-filter rules, GROQ patterns, lifecycle guidance) lives in skills
and agents. MCP tools stay primitive — `get_schema`, `query_documents`, etc. — providing access
without encoding theory. Rationale: access tools survive model improvements; theory tools
impose a ceiling.

**Persisted as:** one-liner in root `CLAUDE.md` `## Harness` section + full principle in
`memory/feedback_tool_design_principle.md`.

### 2. Tool-class scoping (convention, not enforcement)
Claude Code can't dynamically scope MCP tools per task — all 42 tools are always available.
The harness response: a task-class table in `cms-agent.md` that makes appropriate scope legible
so deviation is visible during review. Decided against trying to enforce via `.mcp.json`
(binary on/off only).

### 3. Conditional `get_schema` mandate
Original mandate: call `get_schema` before every GROQ query unconditionally. Changed to:
call when schema is absent from context, or when writing committed code. Re-fetching in a warm
session where the schema is already in context wastes round-trips and tokens.

### 4. Draft/published state: always live query
File-based tracking of content state (draft vs published) was considered and rejected —
goes stale the moment Studio is open. Split the concept: task intent can be tracked in a
scratch note; content state must always come from a live `query_documents` call.

### 5. GROQ + bash vs MCP
Considered using `curl` + GROQ directly instead of MCP for simple queries. Rejected: the
MCP auth boundary keeps credentials out of the harness entirely (Schnucks owns backend;
WWT should never handle tokens directly). MCP is justified on auth grounds alone.

### 6. `$banner in banners` bug
During PR review, found that `campaigns.ts` and `storeMessages.ts` had been using
`$banner in banners` (missing `[]`) — silently returning zero results in GROQ. Fixed in the
same PR that added the harness guidance to catch exactly this class of bug.

---

## What We Built / Changed

### Branch: `feature/sanity-mcp-harness` → merged into `feature/phase-1-foundation` as PR #2

| File | Change |
|---|---|
| `.claude/agents/cms-agent.md` | **NEW** — CMS specialist persona: schema-first mandate, banner-filter per-type table, MCP tool-class table, draft/publish lifecycle, migration awareness, task context convention |
| `.claude/agents/code-reviewer.md` | Added CMS Integration focus area (DTO boundary, banner filter with correct forms, no hardcoded IDs, tool-scope review check) |
| `.claude/agents/software-architect.md` | Added CMS Schema Changes section (get_schema before proposals, migration docs required, /cms-validate before /ship) |
| `.claude/hooks/post-edit.sh` | Full rewrite: jq availability guard, printf (backslash-safe), jq stdout/stderr separation, CLAUDE_PROJECT_DIR guard with cd exit check, pnpm exit-code check (TS errors vs infra failures), CMS reminder moved before .ts guard |
| `.claude/skills/cms-validate/SKILL.md` | **NEW** — 6-step workflow: get_schema → local glob → type diff → field diff → reachability probes → drift report. Gates /ship. |
| `.claude/skills/content-health/SKILL.md` | **NEW** — Orphaned drafts (batch query), broken refs (batch query), per-banner coverage (correct filter per field shape), triage report |
| `.claude/skills/ship/SKILL.md` | Step 5: schema gate now invokes /cms-validate; trigger simplified to "any file in sanity-studio/" |
| `.mcp.json` | **NEW** — Sanity MCP server entry (npx, OAuth, no token) |
| `docs/sanity-mcp.md` | **NEW** — MCP tool reference (42 tools, setup, common use cases) |
| `src/sanity/CLAUDE.md` | Added rule 5 (no DTO bypass), MCP tools section with conditional get_schema, live-query mandate |
| `packages/cms-adapters/src/queries/campaigns.ts` | Fixed: `$banner in banners` → `$banner in banners[]` |
| `packages/cms-adapters/src/queries/storeMessages.ts` | Fixed: `$banner in banners` → `$banner in banners[]` |

### Branch: `feature/harness-tool-principles` → open PR off `feature/phase-1-foundation`

| File | Change |
|---|---|
| `CLAUDE.md` | Added `## Harness` section with access-vs-theory tool test |
| `.claude/agents/cms-agent.md` | Tool-class table (read / schema dev / content ops / migration); conditional get_schema; multi-step task context convention; live-query mandate |
| `.claude/agents/code-reviewer.md` | Tool-scope review check (flag MCP tool use outside task class) |
| `.claude/skills/content-health/SKILL.md` | Prominent "always query live" callout; weeklyAdBase skip moved to prose |
| `src/sanity/CLAUDE.md` | Conditional get_schema rule; live-query note |

### Memory (persisted across sessions)

| File | Content |
|---|---|
| `.claude/projects/.../memory/MEMORY.md` | Index |
| `.claude/projects/.../memory/feedback_tool_design_principle.md` | Access vs theory principle with why/how-to-apply |

---

## Current State

### Git
```
main
└── feature/phase-1-foundation       ← base; contains PR #2 (merged)
    ├── feature/sanity-mcp-harness   ← merged, stale; do not use
    └── feature/harness-tool-principles  ← open, ready for PR
```

### Harness
All 8 original plan items delivered and reviewed (2 rounds, 18 issues found and fixed).
`feature/harness-tool-principles` adds 5 refinements from post-merge conversation;
raised as PR #3.

### Sanity project (15lskz7p / development dataset)
- **Schema: undeployed.** All 11 types are local-only. `get_schema` returns "no schema deployed".
- **Content:** 2 drafts exist (`featuredContent` orphan, `storeMessage` with published counterpart).
  6 `weeklyAdBannerOverride` docs with valid references to 3 `weeklyAdBase` docs.
  `bannerConfig` published for both Phase 1 banners.
- **Drift:** Run `npx sanity@latest schema deploy` from `sanity-studio/` before any live
  schema-dependent work.

### cms-adapters gap
`BannerConfigDTO` type exists but has no transform function and no query. `weeklyAdBannerOverride`
has no type, transform, or query. These are the primary adapter gaps.

---

## Technical Details

### Schema types (local, undeployed)
**Documents:** `bannerConfig`, `campaign`, `featuredContent`, `storeMessage`,
`weeklyAdBannerOverride`, `weeklyAdBase`
**Objects:** `categorySpotlight`, `heroTile`, `promotionTile`, `recipeTile`, `weeklyAdItem`

### Banner field shapes (critical for GROQ)
| Type | Field | Correct filter |
|---|---|---|
| `bannerConfig` | `banner` (string) | `banner == $banner` |
| `featuredContent` | `banner` (string) | `banner == $banner` |
| `weeklyAdBannerOverride` | `banner` (string) | `banner == $banner` |
| `campaign` | `banners` (array) | `$banner in banners[]` |
| `storeMessage` | `banners` (array) | `$banner in banners[]` |
| `weeklyAdBase` | none | not banner-scoped |

### post-edit.sh architecture (post-rewrite)
```
stdin (JSON) → jq guard → parse file_path → CMS reminder (all types) →
.ts/.tsx guard → package filter map → CLAUDE_PROJECT_DIR guard →
cd (checked) → pnpm typecheck → exit-code check → exit 0
```
All stderr. All branches exit 0.

### Live content-health findings (2026-03-14)
- Critical: 0
- Warning: 1 (orphaned draft `featuredContent` — `drafts.0c9f67a0-...`, updated 2026-03-13)
- Info: 2 (festival-foods and hometown-grocers have no published featuredContent)

---

## Next Steps

### Immediate
1. ~~Raise PR for `feature/harness-tool-principles`~~ → PR #3 raised
2. Deploy schema: `cd sanity-studio && npx sanity@latest schema deploy`

### Planned (4-task Sanity build + MCP stress test)

**Task 1 — Deploy schema + seed Phase 1 content**
MCP: `deploy_schema`, `create_documents_from_json`, `publish_documents`
Verify with `/cms-validate` (expect zero drift) and `/content-health` (expect green)

**Task 2 — Fill BannerConfig adapter gap**
Add `transformBannerConfig` to `packages/cms-adapters/src/transforms/`
Add `BANNER_CONFIG_QUERY` to `packages/cms-adapters/src/queries/`
MCP: `get_schema` (conditional), `get_sanity_rules` (sanity-groq), `query_documents` to validate

**Task 3 — Add weeklyAdBannerOverride to adapter layer**
Add `WeeklyAdOverrideDTO` type, transform, query. Complex: reference field + nested objects.
MCP: `get_schema` (reference field projection), `query_documents` (6 docs exist to test against)

**Task 4 — Schema evolution: add isActive to bannerConfig**
Add field → post-edit reminder → /cms-validate shows drift → deploy_schema → /cms-validate green
→ update DTO + transform → patch existing docs with new field
MCP: `migration_guide`, `deploy_schema`, `patch_document_from_json`

---

## Resumable Prompt

```
We're working on the `grocery-multibanner-sanity` repo — a white-label grocery rewards
platform (React Native + Next.js). WWT owns frontend + CMS only. Phase 1 banners:
Festival Foods and Hometown Grocers. Schnucks deferred.

The Sanity MCP server is configured in `.mcp.json` (project 15lskz7p, dataset: development,
OAuth auth). The harness has been extended with:
- `.claude/agents/cms-agent.md` — CMS specialist persona
- `.claude/skills/cms-validate/SKILL.md` — schema drift check
- `.claude/skills/content-health/SKILL.md` — content audit
- Updated `code-reviewer.md`, `software-architect.md`, `ship/SKILL.md`, `post-edit.sh`

Current git state:
- `feature/phase-1-foundation` — base branch (PR #2 merged)
- `feature/harness-tool-principles` — open branch, NOT yet PR'd (raise this first)

Current Sanity state:
- Schema UNDEPLOYED — run `cd sanity-studio && npx sanity@latest schema deploy` first
- 6 weeklyAdBannerOverride docs + 3 weeklyAdBase docs exist in dataset
- bannerConfig published for both Phase 1 banners
- Orphaned draft: featuredContent (drafts.0c9f67a0-833b-413e-85b7-fb1502270794)

Adapter gaps in `packages/cms-adapters/src/`:
- `BannerConfigDTO.ts` type exists but no transform and no query
- `weeklyAdBannerOverride` — no type, transform, or query

The planned next work is a 4-task sequence to update the adapter layer and stress-test the
Sanity MCP:
1. Deploy schema + seed Phase 1 content (MCP: deploy_schema, create_documents_from_json, publish)
2. Fill BannerConfig adapter gap (MCP: get_schema, get_sanity_rules, query_documents)
3. Add weeklyAdBannerOverride to adapter layer (MCP: get_schema for reference projections)
4. Schema evolution: add isActive to bannerConfig (MCP: migration_guide, deploy_schema, patch)

Key rules:
- NEVER hardcode brand values — from theme layer only
- Banner filter: `banner == $banner` for string fields; `$banner in banners[]` for array fields
- All CMS data through DTO layer — raw Sanity docs never reach components
- Tool test: does it give the model access, or pre-solve a step the model should own?
  Access survives model improvements. Theory fights them.

Start by raising a PR for `feature/harness-tool-principles` against `feature/phase-1-foundation`,
then proceed with Task 1.
```
