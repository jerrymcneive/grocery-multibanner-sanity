# Verify Skill — Multi-Banner Verification

## Purpose
Verify changes work correctly across ALL Phase 1 banners.
This skill is MANDATORY when src/theme/ files are modified.

## Phase 1 Banners
- 🎪 Festival Foods (`festival-foods`)
- 🏡 Hometown Grocers (`hometown-grocers`)

(Schnucks deferred to future phase — schema ready but not active)

## Workflow

1. **Identify changed theme files**
```bash
   git diff --name-only HEAD | grep "src/theme/"
```

2. **For each Phase 1 banner, verify:**
```bash
   pnpm run theme:verify --banner=festival-foods
   pnpm run theme:verify --banner=hometown-grocers
```

3. **Check for fallback values**
   Theme tokens must resolve — no undefined or fallback values allowed.

4. **Visual spot-check**
   For significant UI changes, confirm rendering in both banner contexts.

## Failure Handling
If verification fails for ANY banner:
- Do NOT proceed with PR
- Fix the issue
- Re-run verification

## CI Integration
This skill has a CI counterpart: `.github/workflows/theme-verify.yml`
The CI workflow runs automatically on any PR touching `src/theme/**`.
