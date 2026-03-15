# Schnucks Omnichannel Rewards Rebuild
# Keep SHORT. Rules are earned, not planned.

## Purpose
React Native (mobile) + Next.js (web) rewards platform.
White-label: Festival Foods, Hometown Grocers (Phase 1). Schnucks deferred.
WWT owns frontend + CMS only.

## Repo Map
src/theme/      → White-label (HIGH RISK — local CLAUDE.md)
src/rewards/    → Rewards (HIGH RISK — local CLAUDE.md)
src/sanity/     → CMS schemas (local CLAUDE.md)
sanity-studio/  → Sanity Studio v3
apps/mobile/    → React Native
apps/web/       → Next.js
packages/       → Shared libs (cms-adapters, shared-ui, theme-tokens)
docs/           → ADRs, setup, feature specs
.claude/        → Skills, hooks, agents
.github/        → CI/CD workflows

## Commands
build:     pnpm run build
test:      pnpm test
typecheck: pnpm run typecheck
ship:      use .claude/skills/ship/SKILL.md

## First Day?
→ Read docs/dev-setup.md first.

## Hard Rules
NEVER hardcode brand values — all from theme layer
NEVER add backend logic — Schnucks owns backend
NEVER put PII in fixtures, comments, or logs
NEVER commit with failing tests or type errors
ALWAYS verify theme changes across all Phase 1 banners (Festival Foods, Hometown Grocers)

## Harness
Tool test: does it give the model access, or pre-solve a step the model should own?
Access survives model improvements. Theory fights them.
