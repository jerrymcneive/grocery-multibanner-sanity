!/bin/bash
Guard hook: warns before writing to high-risk paths

json=$(cat)
file_path=$(echo "$json" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

[[ -z "$file_path" ]] && exit 0

if [[ "$file_path" == *"src/theme/tokens"* ]]; then
  echo "⚠️  THEME TOKENS: Changes affect ALL banners."
  exit 2
fi

if [[ "$file_path" == *"src/theme/types.ts"* ]]; then
  echo "🔒 BLOCKED: src/theme/types.ts is read-only."
  exit 2
fi

exit 0
