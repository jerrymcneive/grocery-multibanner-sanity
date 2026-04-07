# ADR-005: Scenario B Mobile Restructure — Per-Banner Native Builds

## Status
Accepted

## Context
Each banner (Festival Foods, Hometown Grocers, Schnucks) requires its own
App Store listing, app name, and bundle identifier. A single binary with
runtime banner resolution (Scenario A) cannot support separate store
presence per brand.

## Decision
Restructure the mobile workspace into:
- `packages/mobile-app/` — shared RN app logic, screens, navigation
- `apps/mobile/{banner}/` — thin per-banner shells with own app.json,
  eas.json, and bundle identifiers

## Consequences

### Positive
- Each banner has its own App Store listing and store presence
- Independent release cadence per banner
- OTA updates scoped per banner via EAS release channels
- Shared packages remain unchanged

### Negative
- Three EAS build pipelines to maintain instead of one
- Each banner requires its own Apple Developer App ID and
  App Store Connect listing
- Banner shell directories must stay in sync (new shared packages
  must be added to all three shells)

## Migration
Original `apps/mobile/` is deprecated but not deleted.
Deletion tracked in follow-up issue.
