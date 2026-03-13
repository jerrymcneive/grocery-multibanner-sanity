import { defineType, defineField } from 'sanity'

export const weeklyAdItem = defineType({
  name: 'weeklyAdItem',
  title: 'Ad Item',
  type: 'object',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'regularPrice',
      title: 'Regular Price (cents)',
      type: 'number',
      description: 'Store as integer cents — e.g., 499 for $4.99',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'salePrice',
      title: 'Sale Price (cents)',
      type: 'number',
      validation: (rule) =>
        rule.integer().positive().lessThan(rule.valueOfField('regularPrice')),
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      options: {
        list: [
          { title: 'per lb',   value: 'lb' },
          { title: 'each',     value: 'ea' },
          { title: 'per oz',   value: 'oz' },
          { title: 'per pack', value: 'pk' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'dealType',
      title: 'Deal Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sale',            value: 'sale' },
          { title: 'Buy One Get One', value: 'bogo' },
          { title: 'Digital Coupon',  value: 'coupon' },
          { title: 'Bonus Points',    value: 'points' },
          { title: 'Mix & Match',     value: 'mix-match' },
        ],
      },
    }),
    defineField({
      name: 'loyaltyExclusive',
      title: 'Loyalty Members Only',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'limitPerCustomer',
      title: 'Limit Per Customer',
      type: 'number',
      description: 'Leave blank for no limit.',
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'dealType',
      media: 'image',
    },
  },
})
