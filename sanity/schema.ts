import {Richtext} from "@/sanity/types/richtext";
import {PageTypes} from "@/sanity/pages";
import {Button, CTA, PageLink} from "@/sanity/globals/CTA";
import {PopupType} from "@/sanity/globals/Popups";
import {FormFieldType, FormSubmission, FormType} from "@/sanity/globals/Forms";
import {RedirectType} from "@/sanity/globals/Redirect";
import {PageSettingsType} from "./globals/PageGlobals";
import {Header} from "@/sanity/globals/Header";
import {MuxVideoPlayer} from "@/sanity/globals/VideoPlayer";
import {TestimonialListType, TestimonialType} from "@/sanity/types/testimonials";
import {Footer} from "./globals/Footer";
import {PerformanceGraph} from "./globals/PerformanceGraph";

export const schema = {
  types: [
    // Base types
    Richtext,
    PageLink,
    CTA,
    Button,
    Header,
    Footer,
    PerformanceGraph,
    MuxVideoPlayer,

    //Special types
    TestimonialType,
    TestimonialListType,

    //Global types
    PageSettingsType,
    PopupType,
    FormFieldType,
    FormSubmission,
    FormType,
    RedirectType,

    // Page types
    ...PageTypes
  ],
}
