import {PageTemplate, PageTemplateSchema} from "@/sanity/templates";
import PageBlogOverviewJSX from "@/components/pages/PageBlogOverviewJSX";
import {BasePageQuery, definePageType } from "../globals/PageGlobals";
import {defineField, PortableTextBlock} from "sanity";

export const PageBlogOverviewType = definePageType({
  name: 'pageBlogOverview',
  title: 'Page Blog Overview',
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: 'heroText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'hero',
    }),
  ],
})

export interface PageBlogOverviewSchema extends PageTemplateSchema {
  heroText: PortableTextBlock[];
}

export class PageBlogOverviewTemplate implements PageTemplate<PageBlogOverviewSchema> {
  title: string = 'BlogOverview'; // Internal
  documentType: string = 'pageBlogOverview'; // Internal
  schema: PageBlogOverviewSchema | undefined;
  query: (id: string) => string = (id: string) => `
    *[_type == "pageBlogOverview" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},
     
      heroText,
    }
  `;
  component(data: PageBlogOverviewSchema): JSX.Element {
    return <PageBlogOverviewJSX data={data} />
  }
}

export default PageBlogOverviewTemplate;