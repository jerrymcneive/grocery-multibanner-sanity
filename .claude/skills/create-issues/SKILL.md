# Create Issues Skill

## Purpose
Convert review findings from the current session into tracked GitHub issues.
Handles deduplication, labeling, and prioritization — you decide *when* to run it.

## When to Use
After any review agent has run and produced findings that should outlive the current
session. Typical triggers:
- After `/ship` or a PR review surfaces non-blocking items worth tracking
- After `code-reviewer`, `pr-test-analyzer`, or `silent-failure-hunter` output
- When the user says "create issues from the review" or similar

## Inputs
Findings already present in the current conversation context. If none are visible,
ask the user: "Which findings should I file? Paste the review output or describe
the items."

## Workflow

### Step 1 — Collect findings
Gather all findings from the current conversation that have not already been fixed
inline. Include findings from any review agents that ran this session.

### Step 2 — Triage: file vs. skip
For each finding, decide whether it warrants an issue using this test:

**File as issue if:**
- It cannot be fixed in the current branch (wrong scope, needs design decision, deferred)
- It is a known limitation that future developers need to understand
- It requires setup or infrastructure work before it can be addressed
- It was explicitly flagged as "important" or "critical" by a reviewer but not fixed

**Skip (do not file) if:**
- It was already fixed inline during this session
- It is purely stylistic with no functional consequence and no reviewer flagged it
- An open issue already covers it (check Step 3)

### Step 3 — Deduplicate against open issues
Run:
```bash
gh issue list --state open --limit 50 --json number,title
```
For each finding, check if an existing open issue covers the same problem.
If a match exists, skip creation and note the existing issue number in your output.

### Step 4 — Determine labels and priority

**Label selection:**
- `bug` — incorrect behavior, silent failure, data loss risk
- `enhancement` — improvement to working code
- `tech-debt` — code quality, maintainability, forward-compatibility
- `testing` — missing or insufficient test coverage
- `documentation` — missing or incorrect docs

**Priority selection:**
- `priority: high` — production risk, CI gap on critical path, blocks other work
- `priority: medium` — important but not blocking current work
- `priority: low` — nice to have, forward-compat, cosmetic

A finding can have multiple labels. Every issue gets exactly one priority label.

### Step 5 — Create issues
For each finding that passes triage, create a GitHub issue:

```bash
gh issue create \
  --title "<concise title: component/area + problem>" \
  --label "<comma-separated labels>" \
  --body "<body>"
```

**Body format:**
```markdown
## Context
<1–3 sentences: what the code does today and why it's a problem>

## Current Behavior
<specific: file path, line number if applicable, what happens>

## Desired Behavior / Fix
<concrete recommendation or options if trade-offs exist>

## Files Affected
- `path/to/file.ts`
```

Keep titles specific: prefer `"fetchActiveCampaigns: silent catch swallows all errors"`
over `"improve error handling"`.

### Step 6 — Report
Print a summary table:

```
Issues created:
  #N  [priority: high]   Title of issue — https://github.com/.../issues/N
  #N  [priority: medium] Title of issue — https://github.com/.../issues/N

Skipped (already fixed inline):
  - Description of skipped item

Skipped (duplicate of existing issue):
  - Description → see #N
```

## Exit Criteria
- All non-fixed, non-duplicate findings are tracked
- Each issue has a title, body, and labels including exactly one priority
- Summary table printed to output
- No issue created without user-supplied or conversation-visible findings
  (do not invent findings)
