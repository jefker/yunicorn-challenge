import {defineArrayMember, defineField, defineType} from "sanity";

export const Footer = defineType({
  title: "Footer",
  name: "footer",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "bigText",
      title: "Text",
      type: "string",
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "richtext",
    }),

    defineField({
      name: "cta",
      title: "CTA",
      type: "button",
    }),

    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'menusItem',
          title: 'Menus Item',
          type: 'object',
          fields: [
            defineField({
              name: "menuTitle",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: 'menu',
              title: 'Menu',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'menu',
                  title: 'Menu',
                  type: 'object',
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "pageLink",
                    }),
                  ]
                })
              ],
            }),
          ]
        })
      ],
      validation: (Rule) => Rule.max(4).error("You can have a maximum of 4 menus."),
    }),

    defineField({
      name: "impressum",
      title: "Impressum Link",
      type: "pageLink",
    }),
    defineField({
      name: "datenschutz",
      title: "Datenschutz Link",
      type: "pageLink",
    }),
  ],
});
