import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'stack',
    title: 'Stack',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
    ]
})