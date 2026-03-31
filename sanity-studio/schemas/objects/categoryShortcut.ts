import { defineType, defineField } from 'sanity'

export const categoryShortcut = defineType({
  name: 'categoryShortcut',
  title: 'Category Shortcut',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Category Key',
      type: 'string',
      options: {
        list: [
          { title: 'Meat & Seafood', value: 'meat' },
          { title: 'Produce',        value: 'produce' },
          { title: 'Dairy',          value: 'dairy' },
          { title: 'Bakery',         value: 'bakery' },
          { title: 'Beverages',      value: 'beverages' },
          { title: 'Snacks',         value: 'snacks' },
          { title: 'Frozen',         value: 'frozen' },
          { title: 'Deli',           value: 'deli' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Single emoji displayed alongside the category label, e.g. 🥩',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'href',
      title: 'Category Link',
      type: 'url',
      description: 'URL the shortcut navigates to.',
    }),
  ],
  preview: {
    select: { value: 'value', emoji: 'emoji' },
    prepare({ value, emoji }) {
      return { title: `${emoji ?? ''} ${value ?? ''}`.trim() }
    },
  },
})
