import {ReactNode} from "react";
import {BasePageQuery, definePageType} from "../globals/PageGlobals";
import {defineField, PortableTextBlock} from "sanity";
import {PageTemplate, PageTemplateSchema} from "../templates";
import PageBlogPostJSX from "@/components/pages/PageBlogPostJSX";

export const PageBlogPostType = definePageType({
  name: 'pageBlogPost',
  title: 'Page Blog Post',
  fields: [
    defineField({
      name: "title",
      type: "text",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    })
  ],
})

export interface PageBlogPostSchema extends PageTemplateSchema {
  title: string;
  description: string;
  content: PortableTextBlock[];
}

export class PageBlogPostTemplate implements PageTemplate<PageBlogPostSchema> {
  title: string = 'Blog Post';
  documentType: string = 'pageBlogPost';
  schema: PageBlogPostSchema | undefined;
  query: (id: string) => string = (id: string) => `
    *[_type == "pageBlogPost" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},

      title,
      description,
      content,
    }
  `;
  component: (data: PageBlogPostSchema) => ReactNode = (data: PageBlogPostSchema) => {
    return <PageBlogPostJSX data={data} />
  }
}
