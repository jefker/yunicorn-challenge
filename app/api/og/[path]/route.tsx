import { BasePageQuery } from "@/sanity/globals/PageGlobals";
import { sanityFetch } from "@/sanity/lib/client";
import { PageTemplateSchema } from "@/sanity/templates";
import { notFound } from "next/navigation";
import {ImageResponse} from "next/og";

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 86400


export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string }> }
) {
  const loadedParams = await params
  const pathEncoded = loadedParams.path // 'a', 'b', or 'c'
  const path = atob(pathEncoded)

  const pageData = (await sanityFetch({
    query: `
      *[settings.slug.current == $slug][0]{
         _type,
        _id,
        _rev,
        ${BasePageQuery}
      }
    `,
    params: {
      slug: path,
    },
  })).result as PageTemplateSchema | undefined;

  const thumbnail = pageData?.settings?.metaImage;

  const aspectRatio = thumbnail ? thumbnail.width / thumbnail.height : 16 / 9;

  const targetWidth = 800;
  const height = targetWidth / aspectRatio;

  if (!thumbnail) {
    return notFound();
  }

  return new ImageResponse((
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <img width={targetWidth} height={height} src={(thumbnail.src+ `?auto=format&q=90&w=${targetWidth}&h=${Math.round(height)}`)}/>
    </div>
  ), {
    width: targetWidth,
    height: height,
  })
}
