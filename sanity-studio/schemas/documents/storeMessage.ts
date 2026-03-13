import { defineType, defineField } from 'sanity'

export const storeMessage = defineType({
  name: 'storeMessage',
  title: 'Store Message',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Message Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'body',
      title: 'Message Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'messageType',
      title: 'Message Type',
      type: 'string',
      options: {
        list: [
          { title: 'Store Closure',  value: 'closure' },
          { title: 'Hours Change',   value: 'hours' },
          { title: 'Local Event',    value: 'event' },
          { title: 'General Notice', value: 'notice' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'banners',
      title: 'Show on Banners',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🎪 Festival Foods',    value: 'festival-foods' },
          { title: '🏡 Hometown Grocers',  value: 'hometown-grocers' },
          { title: '🛒 Schnucks (future)', value: 'schnucks' },
        ],
        layout: 'grid',
      },
      initialValue: ['festival-foods', 'hometown-grocers'],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'stores',
      title: 'Limit to Specific Stores',
      description: 'Leave empty to show at all stores in the selected banners.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'activeFrom',
      title: 'Active From',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'activeUntil',
      title: 'Active Until',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'messageType',
      banners: 'banners',
    },
    prepare({ title, subtitle, banners }) {
      const bannerIcons = (banners ?? [])
        .map((b: string) => (b === 'festival-foods' ? '🎪' : b === 'hometown-grocers' ? '🏡' : '🛒'))
        .join(' ')
      return { title, subtitle: `${subtitle} · ${bannerIcons}` }
    },
  },
})
