import {defineField, defineType, FieldDefinition, FieldsetDefinition} from "sanity";
import {IHeader, HeaderSchema, IFooter, FooterSchema, GROQImageSchema, GROQImage} from "@/sanity/lib/definitions";

export const PageSettingsType = defineType({
  name: "pageSettings",
  type: "object",
  title: "Page Settings",
  groups: [
    {
      name: "main",
      title: "Main",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    }
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name [Internal]",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: "main",
    }),

    // SEO
    defineField({
      name: "shouldIndex",
      title: "Should Index",
      type: "boolean",
      group: "seo",
      initialValue: true,
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
    }),

    defineField({
      name: 'headerType',
      title: 'Header Type',
      type: 'string',
      options: {
        list: [
          { title: "Main", value: "main" },
          { title: "Landing Page", value: "lp" },
        ]
      },
      initialValue: 'main',
    }),
    defineField({
      name: 'headerStyle',
      title: 'Header Style',
      type: 'string',
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ]
      },
      initialValue: 'light',
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "reference",
      to: [{ type: "header" }],
    }),
    defineField({
      name: 'footerType',
      title: 'Footer Type',
      type: 'string',
      options: {
        list: [
          { title: "Main", value: "main" },
          { title: "Landing Page", value: "lp" },
        ]
      },
      initialValue: 'main',
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "reference",
      to: [{ type: "footer" }],
    }),
  ],
  fieldsets: [
    {
      title: "SEO",
      name: "seo",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
});

export const definePageType = ({
  name,
  title,
  fields,
  fieldsets,
}: {
  name: string;
  title: string;
  fields?: FieldDefinition[];
  fieldsets?: FieldsetDefinition[];
}) => {
  return defineType({
    name: name,
    type: "document",
    title: title,
    groups: [
      {
        title: "Settings",
        name: "settings",
      },
      {
        title: "Fields",
        name: "fields",
      },
    ],
    fieldsets: [...(fieldsets ?? [])],
    fields: [
      defineField({
        name: "settings",
        type: "pageSettings",
        title: "Settings",
        group: "settings",
      }),
      ...(fields ?? []),
    ],
    preview: {
      select: {
        title: "settings.name",
      },
    },
  });
};

export interface IPageSettingsMetaFields {
  shouldIndex?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: GROQImage;
  metaKeywords?: string[];
}

export interface IPageSettings extends IPageSettingsMetaFields {
  _type: 'pageSettings';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  headerType: "main" | "lp";
  headerStyle: "light" | "dark";
  header: IHeader;
  footerType: "main" | "lp";
  footer: IFooter;
}

export const BasePageQuery: string = `
  settings{
    name,
    slug,
    shouldIndex,
    metaTitle,
    metaDescription,
    metaImage${GROQImageSchema},
    metaKeywords,
    headerType,
    headerStyle,
    header${HeaderSchema},
    footerType,
    footer${FooterSchema},
  }
`;
