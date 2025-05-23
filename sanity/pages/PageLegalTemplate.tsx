import {PageTemplate, PageTemplateSchema} from "@/sanity/templates";
import PageLegalJSX from "@/components/pages/PageLegalJSX";
import {BasePageQuery, definePageType } from "../globals/PageGlobals";
import {defineField, PortableTextBlock} from "sanity";

export const PageLegalType = definePageType({
  name: 'pageLegal',
  title: 'Page Legal',
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'richtext',
      fieldset: 'content',
    }),
  ],
})

export interface PageLegalSchema extends PageTemplateSchema {
  text: PortableTextBlock[];
}

export class PageLegalTemplate implements PageTemplate<PageLegalSchema> {
  title: string = 'Legal'; // Internal
  documentType: string = 'pageLegal'; // Internal
  schema: PageLegalSchema | undefined;
  query: (id: string) => string = (id: string) => `
    *[_type == "pageLegal" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},
     
      text,
    }
  `;
  component(data: PageLegalSchema): JSX.Element {
    return <PageLegalJSX data={data} />
  }
}

export default PageLegalTemplate;