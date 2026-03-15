# Schnucks Omnichannel Rewards — Grocery Multi-Banner

White-label rewards platform for grocery banners. WWT owns frontend and CMS. Schnucks owns backend, loyalty API, and DevOps.

**Phase 1 banners:** Festival Foods · Hometown Grocers
**Deferred:** Schnucks (schema-ready, not active)

---

## Repo layout

```
apps/
  web/              Next.js storefront (banner-scoped routing)
  mobile/           React Native app
packages/
  cms-adapters/     GROQ queries, DTO types, transforms
  shared-ui/        Cross-banner UI primitives
  theme-tokens/     Per-banner design tokens
sanity-studio/      Sanity Studio v3 (schema, desk, seed, migrations)
src/
  theme/            White-label theme layer  ⚠️ high risk
  rewards/          Rewards logic            ⚠️ high risk
  sanity/           CMS DTO layer
docs/               ADRs, setup, feature specs
```

## Commands

```bash
pnpm install          # install all workspace deps
pnpm run dev          # all apps
pnpm run dev:web      # Next.js only
pnpm run dev:sanity   # Sanity Studio only
pnpm run build        # full build
pnpm test             # all tests
pnpm run typecheck    # all type checks
```

## Sanity Studio

```bash
cd sanity-studio
pnpm run dev          # local Studio
npx sanity@latest schema deploy   # deploy local schema to cloud
```

**Schema is local-only until deployed.** Run `/cms-validate` before any schema work.

Seed the development dataset:
```bash
cd sanity-studio && pnpm run seed
```

Run a data migration (example):
```bash
cd sanity-studio
npx sanity@latest migration run <migration-name> --dry-run
npx sanity@latest migration run <migration-name>
```

## First day?

→ Read `docs/dev-setup.md`

## Ownership boundary

| Area | Owner |
|---|---|
| Frontend (React Native, Next.js) | WWT |
| CMS (Sanity schema, content) | WWT |
| Backend, Loyalty API, DevOps | Schnucks |

Never add backend logic or call loyalty APIs directly from this repo.
