#!/bin/bash
# Post-edit hook: scoped typecheck after TS/TSX edits + CMS drift reminder
# Non-blocking — always exits 0

# --- Parse file path from stdin ---
if ! command -v jq &>/dev/null; then
  echo "⚠️  post-edit hook: jq not found — typecheck skipped. Install jq to enable." >&2
  exit 0
fi

json=$(cat)
jq_stderr=$(printf '%s' "$json" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>&1)
jq_exit=$?

if [[ $jq_exit -ne 0 ]]; then
  echo "⚠️  post-edit hook: failed to parse hook payload (jq exit $jq_exit)" >&2
  exit 0
fi

file_path="$jq_stderr"
[[ -z "$file_path" ]] && exit 0

# --- CMS reminder (fires for all file types in CMS dirs) ---
if [[ "$file_path" == */sanity-studio/* || "$file_path" == */src/sanity/* ]]; then
  echo "⚠️  CMS file changed: run /cms-validate to check schema drift before shipping."
fi

# --- Typecheck only applies to TS/TSX files ---
[[ "$file_path" != *.ts && "$file_path" != *.tsx ]] && exit 0

# --- Map file path to pnpm package filter ---
filter=""
case "$file_path" in
  */apps/web/*)                filter="@grocery-multibanner/web" ;;
  */packages/cms-adapters/*)   filter="@grocery-multibanner/cms-adapters" ;;
  */packages/theme-tokens/*)   filter="@grocery-multibanner/theme-tokens" ;;
  */packages/shared-ui/*)      filter="@grocery-multibanner/shared-ui" ;;
  */sanity-studio/*)           filter="grocery-multibanner-sanity-studio" ;;
esac

[[ -z "$filter" ]] && exit 0

# --- Guard project dir ---
if [[ -z "$CLAUDE_PROJECT_DIR" || ! -d "$CLAUDE_PROJECT_DIR" ]]; then
  echo "⚠️  post-edit hook: CLAUDE_PROJECT_DIR not set or invalid — typecheck skipped." >&2
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# --- Run typecheck ---
output=$(pnpm --filter "$filter" typecheck 2>&1)
pnpm_exit=$?

if [[ $pnpm_exit -ne 0 ]]; then
  errors=$(echo "$output" | grep -E "error TS" | head -5)
  if [[ -n "$errors" ]]; then
    echo "⚠️  Type errors in $filter:"
    echo "$errors"
  else
    # pnpm failed but not due to TS errors (missing script, workspace issue, etc.)
    echo "⚠️  Typecheck could not run for $filter — check pnpm setup:" >&2
    echo "$output" | head -3 >&2
  fi
fi

exit 0
