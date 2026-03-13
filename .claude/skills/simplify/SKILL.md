# Simplify Skill

## Purpose
Identify and consolidate duplicate or overlapping code produced across
different task contexts. Distinct from refactor — this is about finding
structural similarity that should be unified.

## When to Use
- After large feature work
- When ship skill detects large diffs
- On-demand for codebase hygiene

## What to Look For

1. **Duplicate utilities**
   Same logic implemented multiple times with slight variations.

2. **Redundant components**
   Similar UI components that could be generalized.

3. **Copy-paste patterns**
   Identical code blocks across files.

4. **Parallel implementations**
   Same concept implemented differently for web vs. mobile.

## Workflow

1. **Scan recent changes**
```bash
   git diff --stat HEAD~10
```

2. **Identify candidates**
   Look for:
   - Files with similar names
   - Functions with similar signatures
   - Components with similar props

3. **Propose consolidation**
   For each candidate:
   - What should be unified?
   - Where should the shared code live?
   - What's the migration path?

4. **Execute (if approved)**
   Create shared utilities in `packages/`
   Update imports across consumers

## Output
Markdown report listing consolidation opportunities with effort estimates.
