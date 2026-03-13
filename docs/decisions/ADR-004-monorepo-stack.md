# ADR-004: Monorepo & Technology Stack

## Status
Accepted

## Context
The platform needs web (Next.js) and mobile (React Native) apps sharing
common logic, with Sanity CMS for content management.

## Decision
**pnpm workspace monorepo** with:

### Apps
- `apps/web`: Next.js 14+ (App Router)
- `apps/mobile`: React Native (Expo)

### Packages
- `packages/cms-adapters`: Sanity queries + DTO transforms
- `packages/shared-ui`: Cross-platform UI components
- `packages/theme-tokens`: Design token definitions

### CMS
- `sanity-studio`: Sanity v3 Studio

## Rationale

### Why Monorepo?
- Shared code between web and mobile
- Single source of truth for types
- Atomic commits across packages

### Why Next.js + RN (not RN Web)?
- Better web performance with Next.js
- SSR/ISR for weekly ad pages
- Trade-off: Limited SSR pattern sharing

### Why Sanity?
- Headless, structured content
- GROQ for flexible queries
- Real-time preview

## Consequences

### Positive
- Code sharing via packages
- Consistent types across apps
- Sanity + Next.js caching integration

### Negative
- Two rendering paradigms (web vs. native)
- Package boundary discipline required
