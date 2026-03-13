import type { StoreMessageDTO } from '@grocery-multibanner/cms-adapters'

export const festivalFoodsStoreMessages: StoreMessageDTO[] = [
  {
    id: 'fixture-ff-msg-001',
    title: 'Extended Spring Hours',
    body: 'All locations now open until 11 PM Monday through Saturday through the end of April.',
    messageType: 'hours',
    activeFrom: '2026-03-01T00:00:00Z',
    activeUntil: '2026-04-30T23:59:59Z',
  },
  {
    id: 'fixture-ff-msg-002',
    title: 'Spring Community Cookout',
    body: 'Join us this Saturday for free samples and live demos at our flagship location.',
    messageType: 'event',
    activeFrom: '2026-03-09T00:00:00Z',
    activeUntil: '2026-03-15T23:59:59Z',
  },
]
