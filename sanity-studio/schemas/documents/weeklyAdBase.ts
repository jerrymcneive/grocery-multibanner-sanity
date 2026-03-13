import { defineType, defineField } from 'sanity'

export const weeklyAdBase = defineType({
  name: 'weeklyAdBase',
  title: 'Weekly Ad',
  type: 'document',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'weekOf', title: 'Week Of', type: 'date' }),
    defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'weeklyAdItem' }] }),
  ],
})
