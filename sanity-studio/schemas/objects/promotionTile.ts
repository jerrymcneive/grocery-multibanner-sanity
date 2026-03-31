import { defineType, defineField } from 'sanity'

export const promotionTile = defineType({
  name: 'promotionTile',
  title: 'Promotion Tile',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the title, e.g. "Fresh Picks" or "Limited Time".',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g., "20% OFF" or "New"',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Destination URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'badgeText', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: `🏷 Promo: ${title}`, subtitle, media }
    },
  },
})
