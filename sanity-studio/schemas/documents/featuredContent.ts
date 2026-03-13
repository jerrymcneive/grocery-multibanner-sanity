import { defineType, defineField } from 'sanity'

export const featuredContent = defineType({
  name: 'featuredContent',
  title: 'Featured Content',
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
      name: 'blocks',
      title: 'Content Blocks',
      description: 'Drag to reorder. Order here is the order customers see.',
      type: 'array',
      of: [
        { type: 'heroTile' },
        { type: 'promotionTile' },
        { type: 'recipeTile' },
        { type: 'categorySpotlight' },
      ],
    }),
  ],
  preview: {
    select: { title: 'banner' },
    prepare({ title }) {
      const icon = title === 'festival-foods' ? '🎪' : title === 'hometown-grocers' ? '🏡' : '🛒'
      return { title: `${icon} Featured Content — ${title}` }
    },
  },
})
