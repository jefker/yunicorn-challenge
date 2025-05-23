import {PageTemplate, PageTemplateSchema} from "@/sanity/templates";
import PageHomeJSX from "@/components/pages/PageHomeJSX";
import {BasePageQuery, definePageType } from "../globals/PageGlobals";
import {defineArrayMember, defineField, PortableTextBlock} from "sanity";
import {GROQButton, GROQButtonSchema, GROQImage, GROQImageSchema} from "@/sanity/lib/definitions";
import {ITestimonialList, TestimonialListSchema} from "@/sanity/types/testimonials";

export const PageHomeType = definePageType({
  name: 'pageHome',
  title: 'Page Home',
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
      name: 'intro',
      title: 'Intro',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'numbers',
      title: 'Numbers',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'how',
      title: 'How',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'trainings',
      title: 'Trainings',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'about',
      title: 'About',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'ebooks',
      title: 'eBooks',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'faq',
      title: 'FAQ',
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
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'richtext',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroCTA1',
      title: 'CTA 1',
      type: 'button',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroCTA2',
      title: 'CTA 2',
      type: 'button',
      fieldset: 'hero',
    }),

    defineField({
      name: 'introChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'intro',
    }),
    defineField({
      name: 'introText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'intro',
    }),
    defineField({
      name: 'introCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'intro',
    }),

    defineField({
      name: 'numbersItems',
      title: 'Numbers Items',
      type: 'array',
      fieldset: 'numbers',
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          name: 'numbersItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'number',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
          ]
        })
      ],
    }),

    defineField({
      name: 'howChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'how',
    }),
    defineField({
      name: 'howText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'how',
    }),
    defineField({
      name: 'howCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'how',
    }),

    defineField({
      name: 'trainingsChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'trainings',
    }),
    defineField({
      name: 'trainingsTitle',
      title: 'Title',
      type: 'richtext',
      fieldset: 'trainings',
    }),
    defineField({
      name: 'trainings1Title',
      title: 'Title 1',
      type: 'string',
      fieldset: 'trainings',
    }),
    defineField({
      name: 'trainings1List',
      title: 'List 1',
      type: 'array',
      fieldset: 'trainings',
      of: [
        defineArrayMember({
          name: 'numbersItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richtext',
            }),
          ]
        })
      ],
    }),
    defineField({
      name: 'trainings1CTA',
      title: 'CTA 1',
      type: 'button',
      fieldset: 'trainings',
    }),
    defineField({
      name: 'trainings2Title',
      title: 'Title 2',
      type: 'string',
      fieldset: 'trainings',
    }),
    defineField({
      name: 'trainings2List',
      title: 'List 2',
      type: 'array',
      fieldset: 'trainings',
      of: [
        defineArrayMember({
          name: 'numbersItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richtext',
            }),
          ]
        })
      ],
    }),
    defineField({
      name: 'trainings2CTA',
      title: 'CTA 2',
      type: 'button',
      fieldset: 'trainings',
    }),

    defineField({
      name: 'testimonialsChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'testimonials',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Title',
      type: 'richtext',
      fieldset: 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'reference',
      to: [
        {
          type: 'testimonialList'
        }
      ],
      fieldset: 'testimonials',
    }),

    defineField({
      name: 'aboutChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'about',
    }),

    defineField({
      name: 'ebooksChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'ebooks',
    }),
    defineField({
      name: 'ebooksTitle',
      title: 'Title',
      type: 'richtext',
      fieldset: 'ebooks',
    }),
    defineField({
      name: 'ebooksItems',
      title: 'eBooks',
      type: 'array',
      fieldset: 'ebooks',
      of: [
        defineArrayMember({
          name: 'ebooksItem',
          title: 'eBook',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'button',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'faqTitle',
      title: 'Title',
      type: 'richtext',
      fieldset: 'faq',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      fieldset: 'faq',
      of: [
        defineArrayMember({
          name: 'faqItem',
          title: 'FAQ Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richtext',
            }),
          ],
        }),
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

export interface PageHomeSchema extends PageTemplateSchema {
  heroTitle: PortableTextBlock[];
  heroCTA1: GROQButton;
  heroCTA2: GROQButton;

  introChip: string;
  introText: PortableTextBlock[];
  introCTA: GROQButton;

  numbersItems: {
    number: number;
    text: string;
  }[];

  howChip: string;
  howText: PortableTextBlock[];
  howCTA: GROQButton;

  trainingsChip: string;
  trainingsTitle: PortableTextBlock[];
  trainings1Title: string;
  trainings1List: {
    text: PortableTextBlock[];
  }[];
  trainings1CTA: GROQButton;
  trainings2Title: string;
  trainings2List: {
    text: PortableTextBlock[];
  }[];
  trainings2CTA: GROQButton;

  testimonialsChip: string;
  testimonialsTitle: PortableTextBlock[];
  testimonials: ITestimonialList;

  aboutChip: string;
  aboutText: PortableTextBlock[];
  aboutCTA: GROQButton;

  ebooksChip: string;
  ebooksTitle: PortableTextBlock[];
  ebooksItems: {
    title: string;
    text: string;
    cta: GROQButton;
    image: GROQImage;
  }[];

  faqTitle: PortableTextBlock[];
  faqItems: {
    title: string;
    text: PortableTextBlock[];
  }[];

  boxText: PortableTextBlock[];
  boxCTA: GROQButton;
}

export class PageHomeTemplate implements PageTemplate<PageHomeSchema> {
  title: string = 'Home'; // Internal
  documentType: string = 'pageHome'; // Internal
  schema: PageHomeSchema | undefined;
  query: (id: string) => string = (id: string) => `
    *[_type == "pageHome" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},
      
      heroTitle,
      heroCTA1${GROQButtonSchema},
      heroCTA2${GROQButtonSchema},
      
      introChip,
      introText,
      introCTA${GROQButtonSchema},
      
      numbersItems[]{
        number,
        text
      },
      
      howChip,
      howText,
      howCTA${GROQButtonSchema},
      
      trainingsChip,
      trainingsTitle,
      trainings1Title,
      trainings1List[]{
        text
      },
      trainings1CTA${GROQButtonSchema},
      trainings2Title,
      trainings2List[]{
        text
      },
      trainings2CTA${GROQButtonSchema},
      
      aboutChip,
      aboutText,
      aboutCTA${GROQButtonSchema},
      
      testimonialsChip,
      testimonialsTitle,
      testimonials->${TestimonialListSchema},
      
      ebooksChip,
      ebooksTitle,
      ebooksItems[]{
        title,
        text,
        cta${GROQButtonSchema},
        image${GROQImageSchema},
      },
      
      faqTitle,
      faqItems[]{
        title,
        text,
      },

      boxText,
      boxCTA${GROQButtonSchema},
    }
  `;
  component(data: PageHomeSchema): JSX.Element {
    return <PageHomeJSX data={data} />
  }
}

export default PageHomeTemplate;