import type { InfoTileDTO } from '@grocery-multibanner/cms-adapters'

export const festivalFoodsInfoTiles: InfoTileDTO[] = [
  {
    id: 'ff-tile-1',
    heading: 'Curbside Pickup',
    body: 'Order online and pick up at your local Festival Foods — ready in as little as 2 hours.',
    buttonLabel: 'Start your order',
    buttonHref: '#pickup',
  },
  {
    id: 'ff-tile-2',
    heading: 'Weekly Ad',
    body: 'See all the deals before you shop. New savings every Wednesday.',
    buttonLabel: 'View this week\'s ad',
    buttonHref: '#weekly-ad',
  },
  {
    id: 'ff-tile-3',
    heading: 'Digital Coupons',
    body: 'Clip coupons to your account and they apply automatically at checkout.',
    buttonLabel: 'Browse coupons',
    buttonHref: '#coupons',
  },
]
