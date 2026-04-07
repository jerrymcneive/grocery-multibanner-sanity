# Figma → GitHub Issues

You are converting a Figma design into GitHub issues for this project, optionally enriched with context from a feature walkthrough transcript.

## Inputs

- **Figma URL** (required): the design to convert
- **Transcript** (optional): file path or pasted text from a feature walkthrough meeting

---

## Step 0 — Load Transcript Context (if provided)

If a transcript file path is given, read it. If pasted text is given, use it directly. If no transcript is provided, skip this step.

Extract the following categories and hold them in context for use in Steps 3–5:

| Category | What to capture |
|---|---|
| **Scope decisions** | What is explicitly in scope, out of scope, or deferred to a future phase |
| **API dependencies** | Which screens or features require a backend API that is not yet available |
| **Content strategy** | What copy/media is CMS-driven (Sanity) vs. hardcoded for now; animation format (Lottie JSON, GIF, static) |
| **Platform notes** | iOS/Android parity requirements, framework (Expo/RN), gesture behavior |
| **Acceptance criteria** | Explicit behavioral requirements stated in the discussion |
| **Open questions** | Anything explicitly called out as unresolved |

---

## Step 1 — Parse Figma URL

Extract `fileKey` and `nodeId` from the URL (convert `-` to `:` in nodeId). If no `nodeId`, call `get_metadata` to list frames and ask the user which to scope to.

## Step 2 — Get Design Context

Call `get_design_context`. If tokens/variables are referenced, also call `get_variable_defs` and compare against `packages/theme-tokens/` and `src/theme/`.

## Step 3 — Extract Work Items

For each frame in the design, identify trackable work items. Cross-reference transcript context from Step 0 to inform labels, priority, and acceptance criteria.

Look for:
- Screens/frames with no matching component in `apps/web/` or `apps/mobile/` → `enhancement`
- Figma components with no Code Connect mapping → `tech-debt`
- Design annotations calling out a requirement → `enhancement` or `bug`
- Figma tokens not in the project theme layer → `enhancement` + `theme`
- Banner-specific layouts (Festival Foods vs Hometown Grocers) with no conditional in code → `enhancement` + `multi-banner`
- Accessibility annotations → `bug` if violated today, `enhancement` if not yet built
- Screens the transcript identifies as requiring a backend API → add `api-dependency`
- Screens/copy the transcript identifies as Sanity-driven → add `content/cms`

Skip anything Schnucks-scoped — note it in the report as "deferred to future phase."
Skip anything the transcript explicitly deferred — note it as "deferred per walkthrough."

## Step 4 — Deduplicate

Run `gh issue list --state open --limit 50 --json number,title` and skip any item already covered by an open issue.

## Step 5 — Create Issues

Create each remaining item with `gh issue create`. Every issue gets the `design` label plus any applicable labels and exactly one priority label.

**Labels:**
- `bug` · `enhancement` · `tech-debt` · `theme` · `multi-banner` · `accessibility`
- `api-dependency` — requires a backend API not yet available
- `content/cms` — content will be Sanity-driven (may be hardcoded now, to be replaced)
- Priority: `priority: high` / `priority: medium` / `priority: low`

**Issue body template:**
```
## Design Source
[Frame name](figma-url-with-node-id)

## Context
<what this is and why it needs tracking>

## Current State
<what exists today, or "Not yet implemented">

## Desired State
<what the design calls for>

## Acceptance Criteria
- [ ] <behavioral requirement from transcript or design annotation>

## Banner Scope
- [ ] Festival Foods
- [ ] Hometown Grocers
(omit if both banners are identical)

## Transcript Context
> <relevant quote or decision summary from the walkthrough>
(omit if no transcript was provided)

## Files Likely Affected
- `path/to/file.tsx`
```

Never put raw hex values or hardcoded brand copy in issue bodies — use token names instead.
Never invent requirements not visible in the design data or transcript.
Omit the "Banner Scope" section if both banners are identical for this item.
Omit the "Transcript Context" section if no transcript was provided.

## Step 6 — Summary

End with a summary table of all issues created and anything skipped:

```
Issues created:
  #N  [priority: high]   Title — https://github.com/.../issues/N

Skipped (deferred per walkthrough):
  - Item description

Skipped (deferred to future phase / Schnucks-scoped):
  - Item description

Skipped (duplicate of existing issue):
  - Item description → see #N
```
