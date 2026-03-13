# ADR-003: CI/CD Strategy

## Status
Accepted

## Context
AI tooling (Claude Code) assists development but cannot replace traditional
verification. Schnucks requires a 5-day review window before deployments.

## Decision
Implement **layered verification**:

### Layer 1: Claude Code (development-time)
- Hooks run on edits and commits
- Skills provide structured workflows
- Fast feedback during development

### Layer 2: GitHub Actions (merge-time)
- `ci.yml`: Runs on all PRs (lint, typecheck, test)
- `theme-verify.yml`: Runs on theme PRs (multi-banner verification)
- Blocks merge on failure — independent of Claude

### Layer 3: Deployment Pipeline (release-time)
- Staging deployment for review
- Production deployment after approval
- (Schnucks-owned infrastructure)

## Consequences

### Positive
- Independent verification at each layer
- Schnucks reviewers can trust CI results
- Clear paper trail for auditing

### Negative
- Slower feedback than Claude-only
- Requires CI maintenance

## Files
- `.github/workflows/ci.yml`
- `.github/workflows/theme-verify.yml`
