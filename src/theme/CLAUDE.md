# src/theme/ — White-Label Theme Layer

⚠️ HIGH RISK: Changes here affect ALL banners simultaneously.

## What Lives Here
- Design tokens (colors, spacing, typography)
- Banner-specific token overrides
- Theme context provider
- Token resolution utilities

## Rules
1. NEVER hardcode values — all from tokens
2. NEVER edit tokens/ without multi-banner verification
3. ALWAYS use verify skill after theme changes
4. Token changes require ADR review

## Verification
After ANY change:
```bash
pnpm run theme:verify --banner=festival-foods
pnpm run theme:verify --banner=hometown-grocers
```

## CI
Theme changes trigger `.github/workflows/theme-verify.yml` automatically.
