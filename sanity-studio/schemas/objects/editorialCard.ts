import { defineType, defineField } from 'sanity'

export const editorialCard = defineType({
  name: 'editorialCard',
  title: 'Editorial Card',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the headline, e.g. "SPRING RECIPES".',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { headline: 'headline', eyebrow: 'eyebrow' },
    prepare({ headline, eyebrow }) {
      return { title: headline, subtitle: eyebrow }
    },
  },
})
