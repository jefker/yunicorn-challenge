import {PageTemplate, PageTemplateSchema} from "@/sanity/templates";
import PageAboutFounderJSX from "@/components/pages/PageAboutFounderJSX";
import {BasePageQuery, definePageType } from "../globals/PageGlobals";
import {defineArrayMember, defineField, PortableTextBlock} from "sanity";
import {GROQButton, GROQButtonSchema, MuxVideoPlayerSchema} from "@/sanity/lib/definitions";
import {IMuxVideoPlayer} from "@/sanity/globals/VideoPlayer";

export const PageAboutFounderType = definePageType({
  name: 'pageAboutFounder',
  title: 'Page About Founder',
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'career',
      title: 'Career',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'box',
      title: 'Box',
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
    defineField({
      name: 'heroCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'hero',
    }),

    defineField({
      name: 'overviewChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'overview',
    }),
    defineField({
      name: 'overviewText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'overview',
    }),
    defineField({
      name: "overviewVideo",
      title: "Video",
      type: "muxVideoPlayer",
      fieldset: "overview",
    }),

    defineField({
      name: 'careerChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'career',
    }),
    defineField({
      name: 'careerText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'career',
    }),
    defineField({
      name: 'careerCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'career',
    }),
    defineField({
      name: 'careerItems',
      title: 'Career Items',
      type: 'array',
      fieldset: 'career',
      of: [
        defineArrayMember({
          name: 'careerItem',
          title: 'Career Item',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ]
        })
      ],
    }),

    defineField({
      name: 'boxText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'box',
    }),
    defineField({
      name: 'boxCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'box',
    }),
  ],
})

export interface PageAboutFounderSchema extends PageTemplateSchema {
  heroText: PortableTextBlock[];
  heroCTA: GROQButton;

  overviewChip: string;
  overviewText: PortableTextBlock[];
  overviewVideo: IMuxVideoPlayer;

  careerChip: string;
  careerText: PortableTextBlock[];
  careerCTA: GROQButton;
  careerItems: {
    year: string;
    text: string;
  }[];

  boxText: PortableTextBlock[];
  boxCTA: GROQButton;
}

export class PageAboutFounderTemplate implements PageTemplate<PageAboutFounderSchema> {
  title: string = 'AboutFounder'; // Internal
  documentType: string = 'pageAboutFounder'; // Internal
  schema: PageAboutFounderSchema | undefined;
  query: (id: string) => string = (id: string) => `
    *[_type == "pageAboutFounder" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},
     
      heroText,
      heroCTA${GROQButtonSchema},
      
      overviewChip,
      overviewText,
      overviewVideo${MuxVideoPlayerSchema},
      
      careerChip,
      careerText,
      careerCTA${GROQButtonSchema},
      careerItems[]{
        year,
        text,
      },
      
      boxText,
      boxCTA${GROQButtonSchema},
    }
  `;
  component(data: PageAboutFounderSchema): JSX.Element {
    return <PageAboutFounderJSX data={data} />
  }
}

export default PageAboutFounderTemplate;