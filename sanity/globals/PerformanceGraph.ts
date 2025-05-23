import {defineArrayMember, defineField, defineType} from "sanity";

export const PerformanceGraph = defineType({
  title: "PerformanceGraph",
  name: "performanceGraph",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "graphTitle",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: 'performanceEntries',
      title: 'Performance Entries',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'performanceEntry',
          title: 'Performance Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
            }),
            defineField({
              name: 'performance',
              title: 'Performance',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              date: 'date',
              performance: 'performance',
            },
            prepare({ date, performance }) {
              const formattedDate = date
                ? new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
                : 'No date';

              return {
                title: `${formattedDate} — ${performance ?? "No performance"}%`
              };
            }
          }
        })
      ],
    }),
  ],
});
