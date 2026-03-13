import { defineType, defineField } from 'sanity'

export const heroTile = defineType({
  name: 'heroTile',
  title: 'Hero Tile',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
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
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: `🦸 Hero: ${title}`, media }
    },
  },
})
