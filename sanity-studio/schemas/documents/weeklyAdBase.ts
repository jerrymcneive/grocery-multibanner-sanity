import { defineType, defineField } from 'sanity'

export const weeklyAdBase = defineType({
  name: 'weeklyAdBase',
  title: 'Weekly Ad',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title',
      description: 'Used in Studio only — not shown to customers.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'weekOf',
      title: 'Week Of',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
      validation: (rule) =>
        rule.required().min(rule.valueOfField('validFrom')),
    }),
    defineField({
      name: 'items',
      title: 'Ad Items',
      type: 'array',
      of: [{ type: 'weeklyAdItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'internalTitle', subtitle: 'weekOf' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Week of ${subtitle}` }
    },
  },
})
