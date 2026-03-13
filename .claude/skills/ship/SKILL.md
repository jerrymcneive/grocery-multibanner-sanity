# Ship Skill

## Purpose
Pre-merge verification workflow. Ensures code is ready for PR.

## When to Use
Before creating or updating a PR.

## Workflow

1. **Run full test suite**
```bash
   pnpm test
```

2. **Run type check**
```bash
   pnpm run typecheck
```

3. **Run lint**
```bash
   pnpm run lint
```

4. **Check for theme changes**
   If any file in `src/theme/` was modified:
   → MANDATORY: Invoke `.claude/skills/verify/SKILL.md`
   This is unconditional — theme changes affect all banners.

5. **Check for Sanity schema changes**
   If any file in `sanity-studio/schemas/` was modified:
   → Verify migration plan exists
   → Check `docs/cms/` for corresponding documentation

6. **Generate PR description**
   Include:
   - What changed
   - Why it changed
   - Testing performed
   - Banner impact (if any)

## Exit Criteria
- All checks pass
- Theme verified across all Phase 1 banners (if applicable)
- PR description ready
