import {defineType} from "sanity";

export const Richtext = defineType({
  title: "Rich Text",
  name: "richtext",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Text Highlight Light", value: "textHighlightLight" },
          { title: "Text Highlight Dark", value: "textHighlightDark" },
        ],
      },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
      ],
    },
    {
      type: "object",
      name: "dashedLine",
      title: "Dashed Line",
      fields: [
        {
          name: "marginSize",
          title: "Spacing",
          type: "string",
          description: "Select the top & bottom margin size",
          initialValue: "my-[5rem]",
          options: {
            list: [
              { title: "Small", value: "my-[3rem]" },
              { title: "Medium", value: "my-[3.5rem] lg:my-[5rem]" },
              { title: "Large", value: "mt-[5rem] lg:my-[6.25rem]" },
            ],
            layout: "dropdown",
          },
        },
      ],
      preview: {
        select: {
          marginSize: "marginSize",
        },
        prepare({ marginSize }: { marginSize?: string }) {
          const marginTitles: Record<string, string> = {
            "my-[3rem]": "Small",
            "my-[3.5rem] lg:my-[5rem]": "Medium",
            "mt-[5rem] lg:my-[6.25rem]": "Large",
          };

          return {
            title: "Dashed Line",
            subtitle: `Spacing: ${marginTitles[marginSize as keyof typeof marginTitles] || "Medium"}`,
          };
        },
      },
    },
    {
      type: "object",
      name: "checkList",
      title: "Check List",
      fields: [
        {
          name: "items",
          title: "List Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "listItem",
              title: "List Item",
              fields: [
                {
                  name: "content",
                  title: "Content",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
          ],
        },
      ],
      preview: {
        select: {
          items: "items",
        },
        prepare({ items }) {
          return {
            title: "Check List",
            subtitle: `Items: ${items ? items.length : 0}`,
          };
        },
      },
    }
  ],
});