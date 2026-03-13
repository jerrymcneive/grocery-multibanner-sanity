import { defineType, defineField } from 'sanity'

export const categorySpotlight = defineType({
  name: 'categorySpotlight',
  title: 'Category Spotlight',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayTitle',
      title: 'Display Title',
      type: 'string',
      description: 'Optional override for the category label shown to customers.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      title: 'Destination URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'categoryName', subtitle: 'displayTitle', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: `🗂 Category: ${title}`, subtitle, media }
    },
  },
})
