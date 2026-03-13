#!/bin/bash
# Pre-commit hook: final gate before commit
# Must pass: lint, typecheck, tests

set -e

echo "🔍 Running pre-commit checks..."

# Lint staged files
pnpm run lint --quiet || {
  echo "❌ Lint failed"
  exit 1
}

# Full type check
pnpm run typecheck || {
  echo "❌ Type check failed"
  exit 1
}

# Run tests (affected only if available, else all)
pnpm test --passWithNoTests || {
  echo "❌ Tests failed"
  exit 1
}

echo "✅ Pre-commit checks passed"
