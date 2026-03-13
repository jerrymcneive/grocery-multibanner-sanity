#!/bin/bash
# Session End Hook — self-evaluation checklist

cat << 'BANNER'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 SESSION END — SELF-EVALUATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before closing, confirm:
  ☐ pnpm typecheck passes (zero errors)
  ☐ No hardcoded brand values in components (run /white-label-audit)
  ☐ All intended changes are committed
  ☐ No PII in fixtures, comments, or logs

High-risk paths touched this session?
  ☐ src/theme/         → run /verify before merging
  ☐ src/rewards/       → confirm no backend logic added
  ☐ sanity-studio/schemas/ → migration plan documented?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BANNER
