import { defineType, defineField } from 'sanity'

export const announcementStrip = defineType({
  name: 'announcementStrip',
  title: 'Announcement Strip',
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
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'Promotional text shown in the strip, e.g. "Free delivery on orders over $50".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Optional link label shown after the message.',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    }),
    defineField({
      name: 'activeFrom',
      title: 'Active From',
      type: 'datetime',
    }),
    defineField({
      name: 'activeUntil',
      title: 'Active Until',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const from = (ctx.document as { activeFrom?: string })?.activeFrom
          if (value && from && value < from) return 'Must be after Active From'
          return true
        }),
    }),
  ],
  preview: {
    select: { message: 'message', banner: 'banner' },
    prepare({ message, banner }) {
      const icon = banner === 'festival-foods' ? '🎪' : banner === 'hometown-grocers' ? '🏡' : '🛒'
      return { title: `${icon} ${message ?? ''}` }
    },
  },
})
