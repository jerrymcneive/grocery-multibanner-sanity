# White-Label Audit Skill

## Purpose
Verify no hardcoded brand values exist in the codebase.
All banner-specific values must come from the theme layer.

## What to Check

1. **Hardcoded colors**
   Search for hex values (#RRGGBB) outside of theme tokens.
```bash
   grep -rn "#[0-9A-Fa-f]\{6\}" src/ --include="*.tsx" --include="*.ts"
```

2. **Hardcoded brand names**
   Search for literal banner names in UI code.
```bash
   grep -rn "Schnucks\|Festival Foods\|Hometown" src/ --include="*.tsx"
```

3. **Hardcoded URLs**
   Banner-specific URLs must be in config, not code.

4. **Image paths**
   Brand logos/images must come from theme or CMS.

## Exceptions
- Test fixtures (clearly marked)
- Documentation
- Comments explaining banner differences

## Workflow

1. Run automated checks (above)
2. Review flagged items
3. For each violation:
   - Move value to theme layer, OR
   - Document exception with justification

## Output
Report listing violations and recommended fixes.
