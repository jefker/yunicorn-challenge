import React from "react";
import {PageAboutFounderSchema} from "@/sanity/pages/PageAboutFounderTemplate";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {CTAButton} from "@/shadcn/ui/button";
import {SanityVideoPlayer} from "@/components/ui/SanityVideoPlayer";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";
import Image from "next/image";
import Chip from "@/components/global/Chip";

import founder from "@/public/about-mario/mario.png";
import founderM from "@/public/about-mario/marioM.png";
import starsGoldBright from "@/public/global/stars-gold-bright.svg";
import signature from "@/public/global/mario-signature.png";
import checkGold from "@/public/icons/check-gold.svg";
import reviewStars from "@/public/global/review-stars.svg";

export default function PageAboutFounderJSX({data}: {data: PageAboutFounderSchema}) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="relative p-[.5rem] md:p-[1rem] bg-white">
        <div className="relative rounded-[.5rem] overflow-clip pt-[23.5rem] pb-[12rem] lg:py-[30rem]">
          <div className="bg-[#172329] w-full h-full absolute top-0 left-0 pointer-events-none">
            <Image
              className="absolute top-0 left-0 !h-full !w-full object-cover object-top hidden lg:block sm:rounded-[.5rem] pointer-events-none"
              src={founder}
              quality={90}
              alt=""
            />
            <Image
              className="absolute top-0 left-0 !h-full !w-full object-cover object-top lg:hidden sm:rounded-[.5rem] pointer-events-none"
              src={founderM}
              quality={90}
              alt=""
            />
          </div>

          <div className="container relative flex flex-col items-center lg:items-start">
            <Image
              className="!w-[12.125rem] mb-[2rem]"
              src={starsGoldBright}
              alt=""
            />

            {data?.heroText && (
              <div className="richtext lg:richtext-start prose-h1:text-[5rem] sm:prose-h1:text-[6rem] lg:prose-h1:text-[8rem] prose-h1:text-white prose-h1:w-[min(99.75rem,100%)] prose-p:w-[min(87rem,100%)] prose-p:text-white prose-p:text-opacity-80">
                <PortableText value={data.heroText}
                              components={richTextComponent}/>
              </div>
            )}

            {data?.heroCTA && (
              <CTAButton
                className="mt-[4rem] lg:mt-[5rem]"
                data={data.heroCTA}
              />
            )}

            <div className="flex flex-col items-center lg:items-start gap-[1.5rem] mt-[4rem] lg:mt-[5rem]">
              <Image
                className="!w-[23rem]"
                src={signature}
                quality={100}
                alt=""
              />
              <p className="mb-0 text-white text-opacity-80 text-[2rem]">Mario Lüddemann, Geschäftsführer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-[10rem] pb-[12rem] lg:pt-[15rem] lg:pb-[18rem] bg-white">
        <div className="container flex flex-col items-center">
          <Chip text={data?.overviewChip} />

          {data?.overviewText && (
            <div className="richtext prose-h2:text-[3.5rem] sm:prose-h2:text-[5rem] lg:prose-h2:text-[6rem] prose-h2:mb-[2rem] prose-p:text-[2.25rem] mb-[3rem] lg:mb-[4rem] w-[min(150rem,100%)]">
              <PortableText value={data.overviewText}
                            components={richTextComponent}/>
            </div>
          )}

          {data?.overviewVideo && (
            <div className="rounded-[.5rem] overflow-clip relative flex w-full *:w-full">
              <SanityVideoPlayer
                playerData={data.overviewVideo}
                playsinline={true}
              />
            </div>
          )}
        </div>
      </section>

      <section className="relative pt-[10rem] pb-[15rem] lg:pt-[15rem] lg:pb-[25rem]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5rem] lg:gap-[1.25rem]">
            <div className="flex flex-col">
              <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-[12rem]">
                <Chip text={data?.careerChip} />

                {data?.careerText && (
                  <div className="richtext lg:richtext-start lg:prose-h2:text-[6rem] mb-[4rem]">
                    <PortableText value={data.careerText}
                                  components={richTextComponent}/>
                  </div>
                )}

                {data?.careerCTA && (
                  <CTAButton
                    data={data.careerCTA}
                  />
                )}
              </div>
            </div>

            {data?.careerItems && data.careerItems.length > 0 ? (
              <div className="relative flex flex-col items-center lg:items-end">
                <div className="w-[min(85.25rem,100%)] flex flex-col gap-[4rem] lg:gap-[6rem]">
                  {data.careerItems.map((item, index) => {
                    return (
                      <div key={index}
                           className="bg-white rounded-[.5rem] relative after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]">
                        <div className="px-[3rem] py-[2.75rem] lg:p-[4rem] flex items-start gap-[3rem]">
                          <Image
                            className="!w-[4.75rem] flex-shrink-0"
                            src={checkGold}
                            alt=""
                          />

                          <div className="flex flex-col items-start">
                            <p className="mb-[1rem] font-semibold lg:text-[2.5rem] leading-none">{item?.year}</p>
                            <p className="mb-0 lg:text-[2.5rem]">{item?.text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-center font-medium mb-0">No career Items available, please add some</p>
            )}
          </div>
        </div>
      </section>

      <section className="pb-[15rem] lg:pb-[25rem]">
        <div className="container">
          <div className="w-[min(154.5rem,100%)] mx-auto">
            <div className="bg-white rounded-[.5rem] py-[4rem] lg:py-[5rem] px-[2rem] sm:px-[4rem] relative after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753] flex flex-col items-center gap-[4rem]">
              <Image
                className="!w-[14rem]"
                src={reviewStars}
                alt=""
              />

              {data?.boxText && (
                <div className="richtext prose-h2:mb-[2rem] prose-h2:text-[4.5rem] lg:prose-h2:text-[8rem] prose-p:text-black prose-p:text-opacity-70 prose-p:w-[min(95rem,100%)] w-[min(118.5rem,100%)]">
                  <PortableText value={data.boxText}
                                components={richTextComponent}/>
                </div>
              )}

              {data?.boxCTA && (
                <CTAButton
                  className="mt-[1rem]"
                  data={data.boxCTA}
                />
              )}
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