import { defineType, defineField } from 'sanity'

export const rewardsBanner = defineType({
  name: 'rewardsBanner',
  title: 'Rewards Banner',
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
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Primary loyalty program message, e.g. "Earn points on every purchase."',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      description: 'Supporting copy beneath the headline.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
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
    select: { headline: 'headline', banner: 'banner', media: 'heroImage' },
    prepare({ headline, banner, media }) {
      const icon = banner === 'festival-foods' ? '🎪' : banner === 'hometown-grocers' ? '🏡' : '🛒'
      return { title: `${icon} ${headline ?? ''}`, subtitle: 'Rewards Banner', media }
    },
  },
})
