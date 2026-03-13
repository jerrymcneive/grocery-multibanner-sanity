# ADR-001: White-Label Architecture Approach

## Status
Accepted

## Context
Schnucks operates three grocery banners (Schnucks, Festival Foods, Hometown Grocers)
that need distinct branding but share core functionality.

## Decision
Implement a **design token-based white-label system**:

1. Single codebase serves all banners
2. All brand values (colors, logos, copy) come from theme layer
3. Banner is determined at runtime via context
4. Components never contain banner conditionals

## Consequences

### Positive
- Single codebase to maintain
- Consistent UX patterns across banners
- Easy to add new banners

### Negative
- Theme layer is high-risk (changes affect all banners)
- Requires discipline to avoid hardcoding

### Mitigations
- Theme changes require multi-banner verification
- Guard hooks prevent accidental token edits
- CI enforces verification on theme PRs
