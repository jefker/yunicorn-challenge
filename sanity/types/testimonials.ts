import {defineType, PortableTextBlock} from "sanity";
import {IMuxVideoPlayer, MuxVideoPlayerSchema} from "@/sanity/globals/VideoPlayer";

export const TestimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'richtext'
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'muxVideoPlayer'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'video.thumbnail'
    }
  }
})

export const TestimonialListType = defineType({
  name: 'testimonialList',
  title: 'Testimonial List',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'testimonial'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
})

export interface ITestimonial {
  name: string;
  position: string;
  quote: string;
  text: PortableTextBlock[];
  video: IMuxVideoPlayer;
}

export interface ITestimonialList {
  name: string;
  testimonials: ITestimonial[];
}

export const TestimonialSchema: string = `
  {
    name,
    position,
    quote,
    text,
    video${MuxVideoPlayerSchema}
  }
`

export const TestimonialListSchema: string = `
  {
    name,
    testimonials[]->${TestimonialSchema}
  }
`