#!/bin/bash
# Post-edit hook: scoped typecheck after TS/TSX edits
# Runs typecheck for only the affected package — non-blocking (always exits 0)

json=$(cat)
file_path=$(echo "$json" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

[[ -z "$file_path" ]] && exit 0
[[ "$file_path" != *.ts && "$file_path" != *.tsx ]] && exit 0

# Map file path to pnpm package filter
filter=""
case "$file_path" in
  */apps/web/*)                filter="@grocery-multibanner/web" ;;
  */packages/cms-adapters/*)   filter="@grocery-multibanner/cms-adapters" ;;
  */packages/theme-tokens/*)   filter="@grocery-multibanner/theme-tokens" ;;
  */packages/shared-ui/*)      filter="@grocery-multibanner/shared-ui" ;;
  */sanity-studio/*)           filter="grocery-multibanner-sanity-studio" ;;
esac

[[ -z "$filter" ]] && exit 0

cd "$CLAUDE_PROJECT_DIR"
output=$(pnpm --filter "$filter" typecheck 2>&1)
errors=$(echo "$output" | grep -E "error TS" | head -5)

if [[ -n "$errors" ]]; then
  echo "⚠️  Type errors in $filter:"
  echo "$errors"
fi

exit 0
