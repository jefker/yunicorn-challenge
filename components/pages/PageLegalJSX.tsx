import React from "react";
import {PageLegalSchema} from "@/sanity/pages/PageLegalTemplate";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";

export default function PageLegalJSX({data}: {data: PageLegalSchema}) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="relative pt-[18.75rem] lg:pt-[22rem] pb-[12rem] lg:pb-[15rem]">
        <div className="container flex flex-col items-center">
          <h1 className="text-[#303F48] mb-[5rem] text-center">{data.settings?.name}</h1>

          <div className="w-[min(148.125rem,100%)] bg-white rounded-[.5rem] px-[2rem] py-[3rem] sm:p-[4rem] lg:p-[5rem] relative after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]">
            {data?.text && (
              <div className="richtext richtext-start !block prose-h2:text-[3.5rem] sm:prose-h2:text-[4rem] prose-h2:mb-[3rem] prose-h3:text-[3rem] sm:prose-h3:text-[3.5rem] prose-h3:mb-[2rem] prose-headings:mt-[4rem] [&_:first-child]:mt-0 break-words">
                <PortableText value={data.text}
                              components={richTextComponent}/>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer
        data={data.settings?.footer}
        footerType={data.settings?.footerType}
      />
    </>
  )
}