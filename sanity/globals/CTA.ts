import { defineArrayMember, defineField, defineType } from "sanity";
import { PageTemplates } from "@/sanity/pages/templates";
import { PageTemplateSchema } from "@/sanity/templates";
import { GROQCTA } from "@/sanity/lib/definitions";

export const PageLink = defineType({
  title: "Page Link",
  name: "pageLink",
  type: "object",
  fields: [
    defineField({
      title: "External Link",
      name: "externalLink",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      // @ts-ignore
      initialValue: (params, context) => context.parent?.externalLink || false,
    }),
    defineField({
      title: "External Link",
      name: "url",
      type: "url",
      // @ts-ignore
      placeholder: "https://www.google.com",
      initialValue: "",
      // @ts-ignore
      hidden: ({ parent, value }) => !parent?.externalLink,
      validation: (Rule) =>
        Rule.custom((link, context) => {
          if (
            // @ts-ignore
            typeof link === "undefined" && context.parent?.externalLink === true
          ) {
            return "Please provide a link";
          }
          return true;
        }).error(),
    }),
    defineField({
      title: "Internal Link",
      name: "internalLink",
      type: "reference",
      // @ts-ignore
      to: [
        ...PageTemplates.map((template) => ({ type: template.documentType })),
      ],
      // @ts-ignore
      hidden: ({ parent, value }) => !!parent?.externalLink,
      validation: (Rule) =>
        Rule.custom((internalLink, context) => {
          if (
            // @ts-ignore
            typeof internalLink === "undefined" && context.parent?.externalLink === false
          ) {
            return "Please select a page";
          }
          return true;
        }).error(),
    }),
    defineField({
      title: "Anchor",
      description: "CSS Selector",
      name: "anchor",
      type: "string",
      hidden: ({ parent, value }) => parent?.externalLink === true,
      // validation: Rule => Rule.custom((field, context) => {
      //   // @ts-ignore
      //   if (context.parent?.externalLink === false && !field) {
      //     return true;
      //   }else {
      //     return true;
      //   }
      // })
    }),
  ],
});

export interface IPageLink {
  externalLink: boolean;
  url: string;
  internalLink: PageTemplateSchema;
  anchor?: string;
  openInNewTab: boolean;
}

export function resolvePageLink(link: IPageLink | null) {
  if (!link) return null;

  if (link.externalLink) {
    return link.url;
  } else {
    if (link.anchor) {
      const base64Anchor = btoa(link.anchor);
      return `${link.internalLink?.settings?.slug}?a=${base64Anchor}`;
    }
    return link.internalLink?.settings?.slug?.current ?? ""
  }
}

export function resolveCTA(cta: GROQCTA | null) {
  if (!cta) return null;

  if (cta.action === "link" && cta.link) {
    return cta.link;
  } else if (cta.action === "popup" && cta.popup) {
    return cta.popup;
  } else if (cta.action === "anchor" && cta.anchor) {
    return cta.anchor;
  }

  return null;
}

export const CTA = defineType({
  title: "Call to Action",
  name: "globalCTA",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      initialValue: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      initialValue: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Select an icon for the CTA",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Arrow Top Right", value: "arrowTopRight" },
        ],
        layout: "dropdown",
      },
      initialValue: "none",
    }),
    defineField({
      name: "action",
      title: "Action",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Anchor", value: "anchor" },
          { title: "Popup", value: "popup" },
        ],
      },
      initialValue: "link",
      validation: (Rule) => Rule.required().error("Please select an action"),
    }),
    defineField({
      title: "Link",
      name: "link",
      type: "pageLink",
      hidden: ({ parent, value }) => parent?.action !== "link",
    }),
    defineField({
      title: "Anchor",
      name: "anchor",
      type: "string",
      hidden: ({ parent, value }) => parent?.action !== "anchor",
      validation: (Rule) =>
        Rule.custom((field, context) => {
          // @ts-ignore
          if (context.parent?.action === "anchor" && !field) {
            return "Please provide an anchor css selector";
          } else {
            return true;
          }
        }),
    }),
    defineField({
      name: "popup",
      title: "Popup",
      type: "reference",
      // @ts-ignore
      to: [{ type: "popup" }],
      hidden: ({ parent, value }) => parent?.action !== "popup",
      validation: (Rule) =>
        Rule.custom((field, context) => {
          // @ts-ignore
          if (context.parent?.action === "popup" && !field) {
            return "Please select a popup";
          } else {
            return true;
          }
        }).error(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
    },
  },
});

export const Button = defineType({
  title: "Button",
  name: "button",
  type: "object",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fieldsets: [
    {
      title: "Style",
      name: "style",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "White", value: "white" },
          { title: "GreyBlue", value: "greyBlue" },
        ],
      },
      initialValue: "default",
      validation: (Rule) =>
        Rule.required().error("Please select a button type"),
      fieldset: "style",
    }),
    defineField({
      title: "Size",
      name: "size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Default", value: "default" },
          { title: "Large", value: "lg" },
        ],
      },
      initialValue: "default",
      validation: (Rule) =>
        Rule.required().error("Please select a button size"),
      fieldset: "style",
    }),
    defineField({
      name: "shape",
      title: "Shape",
      type: "string",
      options: {
        list: [
          { title: "Pill", value: "pill" },
          { title: "Square", value: "square" },
          { title: "Round", value: "round" },
        ],
      },
      initialValue: "pill",
      fieldset: "style",
      validation: (Rule) =>
        Rule.required().error("Please select a button shape"),
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "reference",
      // @ts-ignore
      to: [{ type: "globalCTA" }],
    }),
  ],
});
