// packages/mobile-app does not exist yet — create it when
// shared RN logic is ready to extract from these shells.
import { AppRoot } from '@grocery-multibanner/mobile-app'
import { registerRootComponent } from 'expo'

function FestivalFoodsApp() {
  return <AppRoot banner="festival-foods" />
}

registerRootComponent(FestivalFoodsApp)
