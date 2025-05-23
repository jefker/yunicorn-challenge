import {defineField, defineType} from "sanity";

export const RedirectType = defineType({
  name: 'redirect',
  type: 'document',
  title: 'Redirect',
  fields: [
    defineField({
      name: 'from',
      type: 'string',
      title: 'From',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'To',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'priority',
      type: 'number',
      title: 'Priority',
      initialValue: 0,
      validation: Rule => Rule.required(),
    })
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
      priority: 'priority',
    },
    prepare({from, to, priority}: IRedirect) {
      return {
        title: `${from} -> ${to}`,
        subtitle: `Priority: ${priority}`
      }
    }
  }
})

export interface IRedirect {
  from: string;
  to: string;
  priority: number;
}