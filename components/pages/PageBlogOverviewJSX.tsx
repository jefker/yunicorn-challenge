import React from "react";
import {PageBlogOverviewSchema} from "@/sanity/pages/PageBlogOverviewTemplate";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";
import Image from "next/image";

import bgBanner from "@/public/global/bg-banner-2.png";
import starsGold from "@/public/global/stars-gold.svg";
import arrowTopRight from "@/public/icons/arrow-top-right.svg";

export default function PageBlogOverviewJSX({data}: {data: PageBlogOverviewSchema}) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="relative pt-[15rem] lg:pt-[20rem] pb-[8rem] lg:pb-[10rem]">
        <div className="bg-[#172329] w-full h-full absolute top-0 left-0 pointer-events-none">
          <Image
            className="!w-full !h-full object-cover object-top"
            src={bgBanner}
            quality={90}
            alt=""
          />
        </div>

        <div className="container relative flex flex-col items-center">
          <Image
            className="!w-[12.125rem] mb-[2rem]"
            src={starsGold}
            alt=""
          />

          {data?.heroText && (
            <div className="richtext prose-h1:text-white prose-p:text-white prose-h1:text-[8rem] prose-p:text-opacity-80 w-[min(77.75rem,100%)]">
              <PortableText
                value={data.heroText}
                components={richTextComponent}
              />
            </div>
          )}
        </div>
      </section>

      <section className="pt-[7rem] lg:pt-[11rem] pb-[10rem] lg:pb-[15rem]">
        <div className="container">
          <div className="w-[min(145rem,100%)] mx-auto flex flex-col gap-[12rem] lg:gap-[15rem]">

            {/* featured article index === 0 */}
            <div className="w-full bg-white border border-[#537589] border-opacity-25 p-[1.25rem] grid grid-cols-1 lg:grid-cols-2 gap-[3rem] rounded-[.5rem]">
              <div className="p-[1.5rem] sm:p-[3rem]">

                {/* date */}
                <p className="text-[#002533] text-opacity-80 text-[2rem] mb-[2.5rem]">27/02/2025</p>

                {/* title */}
                <h2 className="text-[#0F2736] text-[4rem] md:text-[5rem] mb-[2.5rem]">
                  Wo endet Trading, wo beginnt Investment? Von schnellen Trades zu langfristigen Anlagen
                </h2>

                {/* tags */}
                <div className="flex gap-[1rem] flex-wrap lg:w-4/5">
                  <div className="border border-[#002533] border-opacity-80 rounded-full px-[2.25rem] py-[1.25rem]">
                    <p className="mb-0 text-[2rem] text-[#002533] text-opacity-80 leading-none">Trading</p>
                  </div>

                  <div className="border border-[#002533] border-opacity-80 rounded-full px-[2.25rem] py-[1.25rem]">
                    <p className="mb-0 text-[2rem] text-[#002533] text-opacity-80 leading-none">Investment</p>
                  </div>
                </div>

                {/* url */}
                <div className="flex items-center gap-[.5rem] mt-[3rem] lg:mt-[10rem]">
                  <span className="text-[#A38753] font-semibold leading-none">Mehr lesen</span>
                  <Image
                    className="!w-[3rem] -rotate-45"
                    src={arrowTopRight}
                    alt=""
                  />
                </div>
              </div>

              {/* featured image */}
              <Image
                className="aspect-[378/229] lg:aspect-[546/442] !w-full !h-full object-cover rounded-[.5rem]"
                src={starsGold}
                alt=""
              />
            </div>


            {/* articles list */}
            <div className="">

            </div>

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