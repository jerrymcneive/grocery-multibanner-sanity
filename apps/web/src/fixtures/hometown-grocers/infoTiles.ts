import type { InfoTileDTO } from '@grocery-multibanner/cms-adapters'

export const hometownGrocersInfoTiles: InfoTileDTO[] = [
  {
    id: 'hg-tile-1',
    heading: 'Easy Online Ordering',
    body: 'Shop your list online and choose curbside pickup or delivery at your local Hometown Grocers.',
    buttonLabel: 'Shop online',
    buttonHref: '#order',
  },
  {
    id: 'hg-tile-2',
    heading: 'This Week\'s Specials',
    body: 'Hand-picked savings on the items your family loves most. Updated every week.',
    buttonLabel: 'See specials',
    buttonHref: '#specials',
  },
  {
    id: 'hg-tile-3',
    heading: 'Community Giving',
    body: 'A portion of every Rewards purchase supports local schools and food banks in your neighborhood.',
    buttonLabel: 'Learn about our mission',
    buttonHref: '#community',
  },
]
