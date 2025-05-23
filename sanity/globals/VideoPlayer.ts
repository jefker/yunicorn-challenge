import {
  defineField,
  defineType,
} from "sanity";

import {GROQImageSchema, GROQMuxVideo, GROQMuxVideoShema} from "@/sanity/lib/definitions";

export const MuxVideoPlayer = defineType({
  title: 'Mux Video Player',
  name: 'muxVideoPlayer',
  type: 'object',
  fields: [
    defineField({
      name: 'embed',
      title: 'Embed',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'muxVideo',
      title: 'Mux Video',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.embed,
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      hidden: ({ parent }) => !parent?.embed,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    })
  ]
})

export interface IMuxVideoPlayer {
  embed: boolean;
  muxVideo: GROQMuxVideo;
  embedUrl: string;
  thumbnail: any;
}

export const MuxVideoPlayerSchema = `
  {
    embed,
    muxVideo${GROQMuxVideoShema},
    embedUrl,
    thumbnail${GROQImageSchema}
  }
`