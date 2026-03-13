#!/bin/bash
# Guard hook: warns before writing to high-risk paths

FILE="$1"

# Theme tokens — require explicit confirmation
if [[ "$FILE" == *"src/theme/tokens"* ]]; then
  echo "⚠️  THEME TOKENS: Changes affect ALL banners. Confirm multi-banner verification."
  exit 1
fi

# Theme types — read-only in normal flow
if [[ "$FILE" == *"src/theme/types.ts"* ]]; then
  echo "🔒 BLOCKED: src/theme/types.ts is read-only. Use ADR process for schema changes."
  exit 1
fi

# Sanity schemas — require confirmation
if [[ "$FILE" == *"sanity-studio/schemas"* ]]; then
  echo "⚠️  SANITY SCHEMA: Changes require migration plan. See docs/cms/sanity-schema.md"
  exit 1
fi

exit 0
