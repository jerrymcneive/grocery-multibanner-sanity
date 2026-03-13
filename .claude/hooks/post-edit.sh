#!/bin/bash
# Post-edit hook: runs after each file edit
# Quick feedback loop — fail fast on obvious issues

set -e

FILE="$1"

# Skip non-source files
[[ "$FILE" != *.ts && "$FILE" != *.tsx && "$FILE" != *.js && "$FILE" != *.jsx ]] && exit 0

# Type-check the changed file (fast, single-file)
npx tsc --noEmit "$FILE" 2>/dev/null || {
  echo "⚠️  Type error in $FILE"
  exit 1
}
