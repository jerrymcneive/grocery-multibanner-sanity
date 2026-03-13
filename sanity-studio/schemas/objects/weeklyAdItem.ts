import { defineType, defineField } from 'sanity'

export const weeklyAdItem = defineType({
  name: 'weeklyAdItem',
  title: 'Ad Item',
  type: 'object',
  fields: [
    defineField({ name: 'productName', title: 'Product Name', type: 'string' }),
    defineField({ name: 'regularPrice', title: 'Regular Price', type: 'number' }),
    defineField({ name: 'salePrice', title: 'Sale Price', type: 'number' }),
  ],
})
