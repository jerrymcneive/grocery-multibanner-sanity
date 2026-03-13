import { defineType, defineField } from 'sanity'

export const recipeTile = defineType({
  name: 'recipeTile',
  title: 'Recipe Tile',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'prepTimeMinutes',
      title: 'Prep Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'url',
      title: 'Recipe URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: `🍽 Recipe: ${title}`, media }
    },
  },
})
