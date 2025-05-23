import {PageTemplate} from "@/sanity/templates";
import {PageHomeTemplate, PageHomeType} from "@/sanity/pages/PageHomeTemplate";
import {PageAboutFounderTemplate, PageAboutFounderType} from "@/sanity/pages/PageAboutFounderTemplate";
import {PageLegalTemplate, PageLegalType} from "@/sanity/pages/PageLegalTemplate";
import {PageBlogOverviewTemplate, PageBlogOverviewType} from "@/sanity/pages/PageBlogOverviewTemplate";
import {PageBlogPostTemplate, PageBlogPostType} from "@/sanity/pages/PageBlogPostTemplate";

export const PageTypes = [
  PageHomeType,
  PageAboutFounderType,
  PageLegalType,
  PageBlogOverviewType,
  PageBlogPostType,
];

export type AvailablePageTemplates = {
  documentType: string;
  template: PageTemplate<any>;
};

export const PageTemplates: AvailablePageTemplates[] = [
  {
    documentType: "pageHome",
    template: new PageHomeTemplate(),
  },
  {
    documentType: "pageAboutFounder",
    template: new PageAboutFounderTemplate(),
  },
  {
    documentType: "pageLegal",
    template: new PageLegalTemplate(),
  },
  {
    documentType: "pageBlogOverview",
    template: new PageBlogOverviewTemplate(),
  },
  {
    documentType: "pageBlogPost",
    template: new PageBlogPostTemplate(),
  },
]
