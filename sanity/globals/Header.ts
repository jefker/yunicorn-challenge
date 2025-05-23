import {defineArrayMember, defineField, defineType} from "sanity";

export const Header = defineType({
  title: 'Header',
  name: 'header',
  type: 'document',
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: 'Menu',
      name: 'menu',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Item',
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              initialValue: 'Title',
              validation: Rule => Rule.required()
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'pageLink',
              hidden: ({parent}) => parent?.isCategory,
            }),
            defineField({
              title: 'Is Category',
              name: 'isCategory',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'subItems',
              title: 'Sub Items',
              type: 'array',
              hidden: ({parent}) => !parent?.isCategory,
              of: [
                defineArrayMember({
                  name: 'subItem',
                  title: 'Sub Item',
                  type: 'object',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                      initialValue: 'Title',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'pageLink',
                      validation: Rule => Rule.required()
                    })
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link.title'
            }
          }
        }),
      ]
    }),
  ]
});