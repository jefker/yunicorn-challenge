import {sanityFetch} from "@/sanity/lib/client";
import {PageTemplates, PageTypes} from "@/sanity/pages";
import {Metadata} from "next";
import {draftMode} from "next/headers";
import {PageTemplateSchema} from "@/sanity/templates";
import {stegaClean} from "@sanity/client/stega"
import {notFound, redirect, RedirectType} from "next/navigation";
import PreviewProvider from "@/components/global/sanity/PreviewProvider";
import PageProvider from "@/components/pages/PageProvider";
import type {WithContext, AnalysisNewsArticle} from 'schema-dts'
import {token} from "@/sanity/env";
import { BasePageQuery } from "@/sanity/globals/PageGlobals";
import { IPageSettings } from "@/sanity/lib/types";
import { PortableTextBlock } from "@portabletext/react";
import React from "react";

export const dynamicParams = false

let structuredData: WithContext<AnalysisNewsArticle> | undefined = undefined;

const defaults = {nonTextBehavior: 'remove'}

function blocksToText(blocks: PortableTextBlock[], opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export async function generateStaticParams() {
  const data = await sanityFetch({
    query: `
      *[_type in [${PageTypes.map(type => type.name).map(name => `"${name}"`).toString()}]]{
        _type,
        "slug": settings.slug.current,
      }
    `,
  });

  type SlugResult = {
    slug: string;
  }
  // @ts-ignore
  const slugs: Array<SlugResult> = data?.result ?? [];
  const transformedSlugs: string[][] = slugs.map(item => {
    const splitSlug = item.slug?.split('/').filter(part => part !== '');
    return splitSlug?.length > 0 ? splitSlug : [''];
  });

  const finishedSlugs = transformedSlugs.map((slug) => {
    return {
      slug: slug
    }
  });

  // Get redirect slugs
  const redirectData = await sanityFetch({
    query: `
      *[_type == "redirect"]{
        from,
        to
      }
    `,
  });

  // @ts-ignore
  if (redirectData?.result?.length > 0) {
    // @ts-ignore
    redirectData?.result.forEach((redirect) => {
      const from = redirect?.from;
      const to = redirect?.to;
      if (from && to) {
        // @ts-ignore
        const splitSlug = from.split('/').filter(part => part !== '');
        finishedSlugs.push({
          slug: splitSlug
        });
      }
    });
  }

  return finishedSlugs;
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const loadedParams = params;
  const slug = (loadedParams?.slug?.join('/') ?? '') || "/";

  const page = await sanityFetch({
    query: `
      *[settings.slug.current == $slug][0]{
        _type,
        _id,
        settings
      }
    `,
    params: {
      slug,
    },
  });

  if (!page.result) {
    return {
      title: "Page not found",
    };
  }

  // @ts-ignore
  if (page.result.length && page.result.length < 1) {
    return {
      title: "Page not found",
    };
  }

  // @ts-ignore
  const data = page.result[0]

  if (!data) {
    return {
      title: "Page not found",
    };
  }

  const documentType = data._type;
  const id = data?._id;
  const settings = data?.settings as IPageSettings


  const template = PageTemplates.find(
    (template) => template.documentType === documentType
  );
  console.log(template)

  if (!template) {
    return {
      title: "Template not found",
    };
  }

  // const query = template.template.query(id);

  // const pageData = await sanityFetch({
  //   query,
  //   perspective: isDraft ? 'previewDrafts' : 'published',
  // });

  const thumbnail = settings?.metaImage;
  const keywords = stegaClean(settings?.metaKeywords ?? "Investment, Finance, Capital".split(","));

  const descriptionRaw = stegaClean(settings?.metaDescription ?? "");

  const descriptionTrimmed = descriptionRaw.length > 155 ? (descriptionRaw.substring(0, 150) + "...") : descriptionRaw;
  return {
    title: stegaClean(settings?.metaTitle ?? "Mario Lueddemann"),
    description: descriptionTrimmed,
    referrer: 'origin-when-cross-origin',
    keywords: keywords,
    category: settings?.metaKeywords?.[0] ?? "Finance",
    authors: [
      {
        name: "Mario Lueddemann",
        url: "https://mariolueddemann.com/"
      }
    ],
    creator: "Mario Lueddemann",
    publisher: "Mario Lueddemann",
    alternates: {
      canonical: "https://" + process.env.NEXT_PUBLIC_DOMAIN + "/" + slug,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': 'large',
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: stegaClean(settings?.metaTitle ?? "Mario Lueddemann"),
      description: descriptionTrimmed,
      siteName: "Mario Lueddemann",
      url: 'https://' + process.env.NEXT_PUBLIC_DOMAIN + '/' + slug,
      images: thumbnail ? [
        {
          url: `api/og/${btoa(slug)}`,
          width: thumbnail.width,
          height: thumbnail.height,
          alt: stegaClean(settings?.metaTitle ?? "Mario Lueddemann")
        }
      ] : undefined,
      locale: "de",
      type: template.template.documentType === "pageBlogPost" ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: stegaClean(settings?.metaTitle ?? "Mario Lueddemann"),
      description: descriptionTrimmed,
      site: 'https://' + process.env.NEXT_PUBLIC_DOMAIN + '/' + slug,
      creator: "@mariolueddemann",
      images: thumbnail ? [
        {
          url: `api/og/${btoa(slug)}`,
          width: thumbnail.width,
          height: thumbnail.height,
          alt: stegaClean(settings?.metaTitle ?? "Mario Lueddemann")
        }
      ] : undefined
    }
  };
}

// @ts-ignore
export default async function Page({params}: { params: { slug: string[] } }) {
  // transform slug back to string
  const slug = '/' + (params?.slug?.join('/') ?? '');

  const url = `${slug}`.replace(/\/$/, '');

  // retrieve documentType from slug
  const data = await sanityFetch({
    query: `
      *[settings.slug.current == $slug]{
        _type,
        _id,
      }
    `,
    params: {
      slug: slug
    }
  });

  // @ts-ignore
  if (data?.result?.length === 0) {
    // Check if redirect exists
    const redirectData = await sanityFetch({
      query: `
        *[_type == "redirect" && from == $slug]{
          to,
        }
      `,
      params: {
        slug: slug
      }
    });

    // @ts-ignore
    if (redirectData?.result?.length > 0) {
      // @ts-ignore
      const redirectTo = redirectData?.result[0]?.to;
      redirect(redirectTo, RedirectType.replace);
    }

    return {
      status: 404,
      body: 'Not found'
    }
  }

  // @ts-ignore
  const documentType = data?.result[0]?._type;


  // @ts-ignore
  const id = data?.result[0]?._id;

  // get template for documentType
  const template = PageTemplates.find(template => template.documentType === documentType);

  if (!template) {
    return notFound();
  }

  const query = template.template.query(id);

  // check if draft mode is enabled
  const isDraft = draftMode().isEnabled

  // Get PageData from Sanity
  const pageData = await sanityFetch({
    query: query ?? '',
    isDraftMode: isDraft,
  });

  if (!pageData) {
    return notFound();
  }

  if (template.documentType === "pageBlogPost") {
    // try {
    //   const settings = pageData.data?.settings as IPageSettings
    //   const data: IPageBlogPost = pageData.data as IPageBlogPost;

    //   const text = data.content ? blocksToText(data.content) : undefined

    //   structuredData = {
    //     '@context': "https://schema.org",
    //     '@type': "AnalysisNewsArticle",
    //     name: settings.metaTitle,
    //     description: settings.metaDescription,
    //     thumbnailUrl: settings.metaImage?.src ?? undefined,
    //     printColumn: "1",
    //     articleBody: text,
    //     wordCount: text?.split(" ").length ?? undefined,
    //     author: {
    //       '@type': "Organization",
    //       name: "Capital Compass",
    //     },
    //     countryOfOrigin: "Germany",
    //     datePublished: page.data?._createdAt ?? undefined,
    //   }
    // }catch (error) {
    //   console.error("Error generating structured data for blog post", slug, error)
    // }
  }

  const renderedComponent = template?.template?.component(pageData?.result ?? {});
  const isValidReactElement = React.isValidElement(renderedComponent);

  return (
  <>
    {pageData?.result != null && isDraft ? (
      <PreviewProvider token={token}>
        <PageProvider url={url} init={pageData} query={query ?? ''} draftMode={isDraft}>
          {isValidReactElement ? renderedComponent : <div><h1>Page not found</h1></div>}
        </PageProvider>
      </PreviewProvider>
    ) : (
      isValidReactElement ? renderedComponent : <div><h1>Page not found</h1></div>
    )}
  </>
  );
}
