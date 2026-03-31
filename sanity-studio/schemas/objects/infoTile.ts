import { defineType, defineField } from 'sanity'

export const infoTile = defineType({
  name: 'infoTile',
  title: 'Info Tile',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(200),
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
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: `ℹ️ ${heading ?? ''}` }
    },
  },
})
