import type {ImageLoaderProps} from "next/dist/shared/lib/image-config";
import {IPageLink} from "@/sanity/globals/CTA";
import {IPopup} from "@/sanity/globals/Popups";

export interface GROQImage {
  src: string;
  width: number;
  height: number;
  lqip: string;
  name: string;
}

export interface GROQCTA {
  name: string;
  title?: string;
  icon?: string;
  action: "link" | "popup" | "anchor";
  link?: IPageLink;
  popup?: IPopup;
  anchor?: string;
}

export interface GROQButton {
  type?: "default";
  size?: "sm" | "default" | "lg";
  shape?: "square" | "round";
  cta?: GROQCTA;
}

export interface IHeader {
  name: string;
  menu: {
    title: string;
    link?: IPageLink;
    isCategory: boolean;
    subItems?: {
      title: string;
      link: IPageLink;
    }[];
  }[];
}

export interface IFooter {
  name: string;
  bigText: string;
  menus: {
    menuTitle: string;
    menu: {
      title: string;
      link: IPageLink;
    }[];
  }[];
  impressum: IPageLink;
  datenschutz: IPageLink;
}

export interface IPerformanceGraph {
  name: string;
  graphTitle: string;
  performanceEntries: {
    date: string;
    performance: number;
  }[];
}

export interface GROQMuxVideo {
  playbackId: string;
  assetId: string;
  filename: string;
  status: string;
}

export function GROQImageLoader({
  src,
  width,
  quality = 90,
}: ImageLoaderProps): string {
  return src + "?auto=format&q=" + quality;
}

export function GROQUnoptimizedImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps): string {
  return src + "?q=100";
}

export const GROQImageSchema = '{"src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip, "name": asset->originalFilename}';

export const GROQPageLinkSchema = '{link,externalLink,openInNewTab,url,anchor,internalLink->{settings{"slug": slug.current}}}';

export const GROQFormSchema = `{
  _id,
  name,
  fields,
  settings{
    onSubmit,
    submitText,
    message,
    redirect${GROQPageLinkSchema},
    portalId,
    formId,
  }
}`;

export const GROQPopupSchemaQuery = `{
  name,
  content,
  showForm,
  form->${GROQFormSchema}
}`;

export const GROQPageCTASchema = `{
  name,
  title,
  icon,
  action,
  anchor,
  link${GROQPageLinkSchema},
  popup->${GROQPopupSchemaQuery}
}`;

export const GROQButtonSchema = `{
  type,
  size,
  cta->${GROQPageCTASchema}
}`;

export const GROQMuxVideoShema = `{
  "playbackId": asset->playbackId,
  "assetId": asset->assetId,
  "filename": asset->filename,
  "status": asset->status
}`;

export const MuxVideoPlayerSchema = `{
  embed,
  muxVideo${GROQMuxVideoShema},
  embedUrl,
  thumbnail${GROQImageSchema}
}`;

export const HeaderSchema = `->{
  name,
  menu[]{
    title,
    link${GROQPageLinkSchema},
    isCategory,
    subItems[]{
      title,
      link${GROQPageLinkSchema},
    },
  },
}`;

export const FooterSchema = `->{
  name,
  bigText,
  menus[]{
    menuTitle,
    menu[]{
      title,
      link${GROQPageLinkSchema},
    },
  },
  impressum${GROQPageLinkSchema},
  datenschutz${GROQPageLinkSchema},
}`;

export const PerformanceGraphSchema = `->{
  name,
  graphTitle,
  performanceEntries[]{
    date,
    performance
  }
}`;