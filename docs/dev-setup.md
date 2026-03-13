# Developer Setup Guide

## Prerequisites
- Node.js ≥ 20.x
- pnpm ≥ 8.x
- Git ≥ 2.x
- Claude Code CLI (for AI-assisted development)

## Quick Start
```bash
# Clone repository
git clone <repo-url>
cd grocery-multibanner-sanity

# Install dependencies
pnpm install

# Start development servers
pnpm run dev           # All apps
pnpm run dev:web       # Next.js only
pnpm run dev:mobile    # React Native only
pnpm run dev:sanity    # Sanity Studio only
```

## Claude Code Setup

1. Install Claude Code CLI
2. Open project: `claude-code .`
3. Session start hook will run automatically
4. Review `.claude/settings.json` for permissions

## Project Structure

See root `CLAUDE.md` for repo map.

## Key Commands

| Command | Purpose |
|---------|---------|
| `pnpm run build` | Build all packages |
| `pnpm test` | Run tests |
| `pnpm run typecheck` | TypeScript check |
| `pnpm run lint` | ESLint |
| `pnpm run theme:verify --banner=<id>` | Verify theme for banner |

## Banner IDs (Phase 1)
- `festival-foods`
- `hometown-grocers`

## Getting Help
- Check `docs/` for architecture and decisions
- Read local `CLAUDE.md` files in high-risk directories
- Use `.claude/skills/` for common workflows
