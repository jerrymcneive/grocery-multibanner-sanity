#!/bin/bash
# Post-edit hook: type-check after file edits

json=$(cat)
file_path=$(echo "$json" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

[[ -z "$file_path" ]] && exit 0
[[ "$file_path" != *.ts && "$file_path" != *.tsx ]] && exit 0

cd "$CLAUDE_PROJECT_DIR"
npx tsc --noEmit "$file_path" 2>/dev/null || echo "⚠️ Type error in $file_path"
exit 0
