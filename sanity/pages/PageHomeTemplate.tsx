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
      name: 'introSecond',
      title: 'Intro - 2',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'values',
      title: 'Our Values',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'work',
      title: 'Work for Us',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'advantages',
      title: 'Advantages',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'health',
      title: 'Health System',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'openStars',
      title: 'Our Open Stars',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'application',
      title: 'Application Process',
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
      name: 'heroChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'hero',
    }),
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
      name: 'introSecondChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'introSecond',
    }),
    defineField({
      name: 'introSecondText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'introSecond',
    }),
    defineField({
      name: 'introSecondCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'introSecond',
    }),

    defineField({
      name: 'valuesChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Title',
      type: 'richtext',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesFirstTextTitle',
      title: 'First Field Title',
      type: 'string',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesFirstText',
      title: 'First Field Text',
      type: 'richtext',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesSecondTextTitle',
      title: 'Second Field Title',
      type: 'string',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesSecondText',
      title: 'Second Field Text',
      type: 'richtext',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesThirdTextTitle',
      title: 'Third Field Title',
      type: 'string',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesThirdText',
      title: 'Third Field Text',
      type: 'richtext',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesFourthTextTitle',
      title: 'Fourth Field Title',
      type: 'string',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesFourthText',
      title: 'Fourth Field Text',
      type: 'richtext',
      fieldset: 'values',
    }),
    defineField({
      name: 'valuesCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'values',
    }),

    defineField({
      name: 'workTitle',
      title: 'Title',
      type: 'string',
      fieldset: 'work',
    }),
    defineField({
      name: 'workFirstTextTitle',
      title: 'First Field Title',
      type: 'string',
      fieldset: 'work',
    }),
    defineField({
      name: 'workFirstText',
      title: 'First Field Text',
      type: 'richtext',
      fieldset: 'work',
    }),
    defineField({
      name: 'workSecondTextTitle',
      title: 'Second Field Title',
      type: 'string',
      fieldset: 'work',
    }),
    defineField({
      name: 'workSecondText',
      title: 'Second Field Text',
      type: 'richtext',
      fieldset: 'work',
    }),
    defineField({
      name: 'workThirdTextTitle',
      title: 'Third Field Title',
      type: 'string',
      fieldset: 'work',
    }),
    defineField({
      name: 'workThirdText',
      title: 'Third Field Text',
      type: 'richtext',
      fieldset: 'work',
    }),
    defineField({
      name: 'workFourthTextTitle',
      title: 'Fourth Field Title',
      type: 'string',
      fieldset: 'work',
    }),
    defineField({
      name: 'workFourthText',
      title: 'Fourth Field Title',
      type: 'richtext',
      fieldset: 'work',
    }),

    defineField({
      name: 'advantageChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageText',
      title: 'Header',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFirstText',
      title: 'First Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFirstSubtitle',
      title: 'First Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageSecondText',
      title: 'Second Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageSecondSubtitle',
      title: 'Second Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageThirdText',
      title: 'Third Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageThirdSubtitle',
      title: 'Third Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFourthText',
      title: 'Fourth Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFourthSubtitle',
      title: 'Fourth Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFifthText',
      title: 'Fifth Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageFifthSubtitle',
      title: 'Fifth Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageSixthText',
      title: 'Sixth Check Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageSixthSubtitle',
      title: 'Sixth Check Subtitle',
      type: 'richtext',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageLastText',
      title: 'Last Text',
      type: 'string',
      fieldset: 'advantages',
    }),
    defineField({
      name: 'advantageCTA',
      title: 'CTA',
      type: 'button',
      fieldset: 'advantages',
    }),
    
    defineField({
      name: 'healthChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'health',
    }),
    defineField({
      name: 'healthText',
      title: 'Text',
      type: 'richtext',
      fieldset: 'health',
    }),
    defineField({
      name: 'health',
      title: 'List',
      type: 'array',
      fieldset: 'health',
      of: [
        defineArrayMember({
          name: 'numbersItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'richtext',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ]
        })
      ],
    }),
    
    defineField({
      name: 'openStarsChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'openStars',
    }),
    defineField({
      name: 'openStarsText',
      title: 'HeaderText',
      type: 'richtext',
      fieldset: 'openStars',
    }),
    defineField({
      name: 'openStarsFisrtTitle',
      title: 'First Title',
      type: 'string',
      fieldset: 'openStars',
    }),
    defineField({
      name: 'openStarsSecondTitle',
      title: 'Second Title',
      type: 'string',
      fieldset: 'openStars',
    }),
    defineField({
      name: 'openStarsThirdTitle',
      title: 'Third Title',
      type: 'string',
      fieldset: 'openStars',
    }),
    
    defineField({
      name: 'applicationChip',
      title: 'Chip',
      type: 'string',
      fieldset: 'application',
    }),
    defineField({
      name: 'applicationText',
      title: 'Text',
      type: 'string',
      fieldset: 'application',
    }),
    defineField({
      name: 'application',
      title: 'List',
      type: 'array',
      fieldset: 'application',
      of: [
        defineArrayMember({
          name: 'numbersItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'richtext',
            }),
          ]
        })
      ],
    }),
  ],
})

export interface PageHomeSchema extends PageTemplateSchema {
  heroChip: string;
  heroTitle: PortableTextBlock[];
  heroCTA1: GROQButton;
  heroCTA2: GROQButton;

  introChip: string;
  introText: PortableTextBlock[];
  introCTA: GROQButton;

  introSecondChip: string;
  introSecondText: PortableTextBlock[];
  introSecondCTA: GROQButton;

  valuesChip: string;
  valuesTitle: PortableTextBlock[];
  valuesFirstTextTitle: string;
  valuesFirstText: PortableTextBlock[];
  valuesSecondTextTitle: string;
  valuesSecondText: PortableTextBlock[];
  valuesThirdTextTitle: string;
  valuesThirdText: PortableTextBlock[];
  valuesFourthTextTitle: string;
  valuesFourthText: PortableTextBlock[];
  valuesCTA: GROQButton;

  workTitle: string;
  workFirstTextTitle: string;
  workFirstText: PortableTextBlock[];
  workSecondTextTitle: string;
  workSecondText: PortableTextBlock[];
  workThirdTextTitle: string;
  workThirdText: PortableTextBlock[];
  workFourthTextTitle: string;
  workFourthText: PortableTextBlock[];

  advantageChip: string;
  advantageText: PortableTextBlock[];
  advantageFirstText: string;
  advantageFirstSubtitle: PortableTextBlock[];
  advantageSecondText: string;
  advantageSecondSubtitle: PortableTextBlock[];
  advantageThirdText: string;
  advantageThirdSubtitle: PortableTextBlock[];
  advantageFourthText: string;
  advantageFourthSubtitle: PortableTextBlock[];
  advantageFifthText: string;
  advantageFifthSubtitle: PortableTextBlock[];
  advantageSixthText: string;
  advantageSixthSubtitle: PortableTextBlock[];
  advantageLastText: string;
  advantageCTA: GROQButton;
  
  healthChip: string;
  healthText: PortableTextBlock[];
  health: {
    title: string;
    subtitle: PortableTextBlock[];
    image: GROQImage;
  }[];
  
  openStarsChip: string;
  openStarsText: PortableTextBlock[];
  openStarsFisrtTitle: string;
  openStarsSecondTitle: string;
  openStarsThirdTitle: string;
 
  applicationChip: string;
  applicationText: string[];
  application: {
    image: GROQImage;
    title: string;
    subtitle: PortableTextBlock[];
  }[];
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
      
      heroChip,
      heroTitle,
      heroCTA1${GROQButtonSchema},
      heroCTA2${GROQButtonSchema},
      
      introChip,
      introText,
      introCTA${GROQButtonSchema},

      introSecondChip,
      introSecondText,
      introSecondCTA${GROQButtonSchema},

      valuesChip,
      valuesTitle,
      valuesFirstTextTitle,
      valuesFirstText,
      valuesSecondTextTitle,
      valuesSecondText,
      valuesThirdTextTitle,
      valuesThirdText,
      valuesFourthTextTitle,
      valuesFourthText,
      valuesCTA${GROQButtonSchema},

      workTitle,
      workFirstTextTitle,
      workFirstText,
      workSecondTextTitle,
      workSecondText,
      workThirdTextTitle,
      workThirdText,
      workFourthTextTitle,
      workFourthText,

      advantageChip,
      advantageText,
      advantageFirstText,
      advantageFirstSubtitle,
      advantageSecondText,
      advantageSecondSubtitle,
      advantageThirdText,
      advantageThirdSubtitle,
      advantageFourthText,
      advantageFourthSubtitle,
      advantageFifthText,
      advantageFifthSubtitle,
      advantageSixthText,
      advantageSixthSubtitle,
      advantageLastText,
      advantageCTA${GROQButtonSchema},
      
      healthChip,
      healthText,
      health[]{
        title,
        subtitle,
        image${GROQImageSchema},
      },
      
      applicationChip,
      applicationText,
      application[]{
        image${GROQImageSchema},
        title,
        subtitle,
      },

      openStarsChip,
      openStarsText,
      openStarsFisrtTitle,
      openStarsSecondTitle,
      openStarsThirdTitle,
    }
  `;
  component(data: PageHomeSchema): JSX.Element {
    return <PageHomeJSX data={data} />
  }
}

export default PageHomeTemplate;