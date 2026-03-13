import type { StoreMessageDTO } from '@grocery-multibanner/cms-adapters'

export const hometownGrocersStoreMessages: StoreMessageDTO[] = [
  {
    id: 'fixture-hg-msg-001',
    title: 'Updated Store Hours',
    body: 'We are open 7 AM to 9 PM daily. Pharmacy hours may vary by location.',
    messageType: 'hours',
    activeFrom: '2026-03-01T00:00:00Z',
    activeUntil: '2026-06-30T23:59:59Z',
  },
  {
    id: 'fixture-hg-msg-002',
    title: 'Farmers Market Weekend',
    body: 'Local vendors will be set up outside our main entrance this Saturday and Sunday.',
    messageType: 'event',
    activeFrom: '2026-03-13T00:00:00Z',
    activeUntil: '2026-03-15T23:59:59Z',
  },
]
