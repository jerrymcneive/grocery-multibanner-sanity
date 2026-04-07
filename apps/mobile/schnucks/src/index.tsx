// DEFERRED — Schnucks is Phase 1+. Schema-ready but not active.
// packages/mobile-app does not exist yet — create it when
// shared RN logic is ready to extract from these shells.
import { AppRoot } from '@grocery-multibanner/mobile-app'
import { registerRootComponent } from 'expo'

function SchnucksApp() {
  return <AppRoot banner="schnucks" />
}

registerRootComponent(SchnucksApp)
