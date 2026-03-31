import { defineType, defineField } from 'sanity'

export const infoTileRow = defineType({
  name: 'infoTileRow',
  title: 'Info Tile Row',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'string',
      options: {
        list: [
          { title: '🎪 Festival Foods',    value: 'festival-foods' },
          { title: '🏡 Hometown Grocers',  value: 'hometown-grocers' },
          { title: '🛒 Schnucks (future)', value: 'schnucks' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [{ type: 'infoTile' }],
      description: 'Service tiles shown in the row (e.g. Delivery, Pickup, Pharmacy).',
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { banner: 'banner', tiles: 'tiles' },
    prepare({ banner, tiles }) {
      const icon = banner === 'festival-foods' ? '🎪' : banner === 'hometown-grocers' ? '🏡' : '🛒'
      const count = Array.isArray(tiles) ? tiles.length : 0
      return { title: `${icon} Info Tile Row`, subtitle: `${count} tile${count !== 1 ? 's' : ''}` }
    },
  },
})
