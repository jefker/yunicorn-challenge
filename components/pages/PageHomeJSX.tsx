import React from "react";
import {PageHomeSchema} from "@/sanity/pages/PageHomeTemplate";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {CTAButton} from "@/shadcn/ui/button";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";
import Image from "next/image";
import Chip from "@/components/global/Chip";
import CountingNumbers from "@/components/global/CountingNumbers";
import OrderedList from "@/components/global/OrderedList";
import StickyTestimonials from "@/components/global/StickyTestimonials";
import {padStart} from "lodash";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";

import hero from "@/public/home/hero.png";
import heroM from "@/public/home/heroM.png";
import starsGold from "@/public/global/stars-gold.svg";
import intro from "@/public/home/intro.png";
import introM from "@/public/home/introM.png";
import how from "@/public/home/how.png";
import howM from "@/public/home/howM.png";
import trading from "@/public/home/trading.png";
import investment from "@/public/home/investment.png";
import who from "@/public/global/who.png";
import whoM from "@/public/global/whoM.png";
import badge1 from "@/public/global/badges/badge1.svg";
import provenExpert from "@/public/global/badges/provenexpert.png";
import badge2 from "@/public/global/badges/badge2.svg";
import insightsMdi from "@/public/global/badges/insights-mdi.png";
import reviewStars from "@/public/global/review-stars.svg";


export default function PageHomeJSX({data}: {data: PageHomeSchema}) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="relative p-[.5rem] md:p-[1rem] bg-white">
        <div className="relative rounded-[.5rem] overflow-clip pt-[21rem] pb-[15.75rem] lg:py-[39rem]">
          <div className="bg-[#172329] w-full h-full absolute top-0 left-0 pointer-events-none">
            <Image
              className="absolute top-0 translate-x-0 left-0 !w-full !h-full object-cover object-top rounded-[.5rem] pointer-events-none hidden md:block"
              src={hero}
              quality={100}
              alt=""
            />
            <Image
              className="absolute top-0 translate-x-0 left-0 !w-full !h-full object-cover object-top rounded-[.5rem] pointer-events-none md:hidden"
              src={heroM}
              quality={100}
              alt=""
            />
          </div>

          <div className="container relative flex flex-col items-center">
            <Image
              className="!w-[12.125rem] mb-[2rem]"
              src={starsGold}
              alt=""
            />

            {data?.heroTitle && (
              <div className="richtext prose-h1:text-[5rem] sm:prose-h1:text-[6rem] lg:prose-h1:text-[8rem] prose-h1:text-white prose-h1:w-[min(125rem,100%)] prose-p:w-[min(101.25rem,100%)] prose-p:text-white prose-p:text-opacity-80">
                <PortableText value={data.heroTitle}
                              components={richTextComponent}/>
              </div>
            )}

            <div className="w-full flex flex-col md:flex-row items-center md:justify-center gap-y-[3rem] md:gap-x-[2rem] mt-[4rem] md:mt-[5rem]">
              {data?.heroCTA1 && (
                <CTAButton
                  data={data.heroCTA1}
                />
              )}

              {data?.heroCTA2 && (
                <CTAButton
                  data={data.heroCTA2}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[10rem] lg:pt-[15rem] pb-[14rem] lg:pb-[20rem] bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-center">
              <Image
                className="!w-full rounded-[.5rem]"
                src={intro}
                quality={95}
                alt=""
              />
            </div>

            <div className="flex flex-col items-center lg:items-end justify-center">
              <div className="flex flex-col items-center lg:items-start w-[min(72.5rem,100%)]">
                <Chip text={data?.introChip} />

                {data?.introText && (
                  <div className="richtext lg:richtext-start lg:prose-h2:text-[6rem] prose-h2:w-[min(60rem,100%)] prose-h2:mb-[3rem]">
                    <PortableText value={data?.introText}
                                  components={richTextComponent}/>
                  </div>
                )}

                <Image
                  className="!w-full rounded-[.5rem] lg:hidden mt-[2.5rem]"
                  src={introM}
                  quality={100}
                  alt=""
                />

                {data?.introCTA && (
                  <CTAButton
                    className="mt-[4rem]"
                    data={data.introCTA}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white">
        <div className="container">
          <CountingNumbers items={data?.numbersItems} />
        </div>
      </section>

      <section className="relative py-[14rem] lg:py-[20rem] bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start justify-center">
              <div className="flex flex-col items-center lg:items-start w-[min(72.5rem,100%)]">
                <Chip text={data?.howChip} />

                {data?.howText && (
                  <div className="richtext lg:richtext-start lg:prose-h2:text-[6rem] prose-h2:mb-[3rem]">
                    <PortableText value={data?.howText}
                                  components={richTextComponent}/>
                  </div>
                )}

                <Image
                  className="!w-full rounded-[.5rem] lg:hidden mt-[2.5rem]"
                  src={howM}
                  quality={100}
                  alt=""
                />

                {data?.howCTA && (
                  <CTAButton
                    className="mt-[4rem]"
                    data={data.howCTA}
                  />
                )}
              </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center">
              <Image
                className="!w-full rounded-[.5rem]"
                src={how}
                quality={95}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-[12rem] lg:pb-[16rem] bg-white">
        <div className="container">
          <div className="w-[min(131.5rem,100%)] mx-auto flex flex-col items-center">
            <Chip text={data?.trainingsChip} />

            {data?.trainingsTitle && (
              <div className="richtext lg:prose-h2:text-[6rem] prose-h2:w-[min(87rem,100%)] mb-[4rem] lg:mb-[5rem]">
                <PortableText value={data.trainingsTitle}
                              components={richTextComponent}/>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] w-full">
              <div className="flex flex-col lg:justify-between border border-[#CFD6D3] rounded-[.5rem] p-[1rem] bg-white">
                <div className="flex flex-col">
                  <Image
                    className="!w-full rounded-[.5rem] mb-[3rem]"
                    src={trading}
                    alt=""
                  />
                </div>

                <div className="px-[1.5rem]">
                  <h3 className="text-[3rem] md:text-[4rem] text-[#303F48] text-opacity-100 mb-[2rem]">{data?.trainings1Title}</h3>

                  <OrderedList items={data?.trainings1List} />
                </div>

                {data?.trainings1CTA && (
                  <CTAButton
                    className="mt-[6rem] lg:mt-[7rem] px-[1rem] sm:px-[1.5rem] pb-[2rem]"
                    data={data.trainings1CTA}
                  />
                )}
              </div>

              <div className="flex flex-col lg:justify-between border border-[#CFD6D3] rounded-[.5rem] p-[1rem] bg-white">
                <div className="flex flex-col">
                  <Image
                    className="!w-full rounded-[.5rem] mb-[3rem]"
                    src={investment}
                    alt=""
                  />
                </div>

                <div className="px-[1.5rem]">
                  <h3 className="text-[3rem] md:text-[4rem] text-[#303F48] text-opacity-100 mb-[2rem]">{data?.trainings2Title}</h3>

                  <OrderedList items={data?.trainings2List} />
                </div>

                {data?.trainings2CTA && (
                  <CTAButton
                    className="mt-[6rem] lg:mt-[7rem] px-[1rem] sm:px-[1.5rem] pb-[2rem]"
                    data={data.trainings2CTA}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-[12rem] lg:py-[16rem]">
        <div className="container">
          <StickyTestimonials chip={data?.testimonialsChip}
                              title={data?.testimonialsTitle}
                              testimonialList={data.testimonials?.testimonials} />
        </div>
      </section>

      <section className="relative sm:px-[1rem] bg-gradient-to-t from-white">
        <div className="sm:rounded-[.5rem] overflow-clip relative pt-[36rem] pb-[12rem] lg:py-[20rem]">
          <Image
            className="absolute top-0 left-0 !h-full !w-full object-cover object-top hidden lg:block sm:rounded-[.5rem] pointer-events-none"
            src={who}
            quality={100}
            alt=""
          />
          <Image
            className="absolute top-0 left-0 !h-full !w-full object-cover object-top lg:hidden sm:rounded-[.5rem] pointer-events-none"
            src={whoM}
            quality={100}
            alt=""
          />

          <div className="container relative">
            <div className="w-[min(140rem,100%)] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5rem]">
                <div className="flex flex-col items-start">
                  <Chip text={data?.aboutChip}
                        className="mb-[4rem]"
                        style="light" />

                  {data?.aboutText && (
                    <div className="richtext richtext-start prose-h2:!text-white prose-h2:text-[6rem] lg:prose-h2:text-[8rem] prose-h2:mb-[4rem] prose-p:text-[2.25rem] prose-p:!text-white mb-[5rem] w-[min(68.5rem,100%)]">
                      <PortableText value={data.aboutText}
                                    components={richTextComponent}/>
                    </div>
                  )}

                  {data?.aboutCTA && (
                    <CTAButton
                      data={data.aboutCTA}
                    />
                  )}
                </div>

                <div className="flex flex-col items-start lg:items-end justify-end gap-[1.5rem]">
                  <div className="gradient-border-greyblue relative rounded-[.5rem] bg-[#172329] bg-opacity-50 backdrop-blur-[2rem] flex flex-col items-center px-[2rem] py-[2.5rem] w-full sm:w-[min(33.875rem,100%)]">
                    <Image
                      className="!w-[12rem] sm:!w-[8.375rem] absolute top-[.5rem] right-[.5rem]"
                      src={provenExpert}
                      alt=""
                    />
                    <Image
                      className="!w-[33.375rem] sm:!w-[22.625rem]"
                      src={badge1}
                      alt=""
                    />
                  </div>

                  <div className="gradient-border-greyblue relative rounded-[.5rem] bg-[#172329] bg-opacity-50 backdrop-blur-[2rem] flex flex-col items-center p-[2rem] py-[2.5rem] w-full sm:w-[min(33.875rem,100%)]">
                    <Image
                      className="!w-[8.5rem] sm:!w-[6.875rem] absolute top-[.5rem] right-[.5rem]"
                      src={insightsMdi}
                      alt=""
                    />
                    <Image
                      className="!w-[43.5rem] lg:!w-[29.625rem]"
                      src={badge2}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-[12rem] lg:py-[16rem] bg-white">
        <div className="container flex flex-col items-center">
          <Chip text={data?.ebooksChip} />

          {data?.ebooksTitle && (
            <div className="richtext lg:prose-h2:text-[6rem] prose-h2:mb-[1rem] mb-[4rem] lg:mb-[5rem]">
              <PortableText value={data?.ebooksTitle}
                            components={richTextComponent}/>
            </div>
          )}

          {data?.ebooksItems && data.ebooksItems.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
              {data.ebooksItems.map((item, index) => {
                return (
                  <div key={index}
                       className="bg-white rounded-[.5rem] border border-[#CFD6D3] p-[1rem] sm:p-[1.5rem] flex flex-col justify-between">
                    <div className="flex flex-col">
                      <div className="bg-[#F3F4F2] rounded-[.5rem] mb-[2.5rem] !w-full aspect-[436/397] flex items-center justify-center py-[3rem]">
                        <Image
                          className="!w-auto !h-full"
                          src={item?.image ?? ''}
                          quality={100}
                          alt=""
                        />
                      </div>

                      <div className="px-[1.5rem]">
                        <h3 className="text-[3rem] md:text-[4rem] text-[#303F48] text-opacity-100 border-b border-black border-opacity-10 pb-[2.5rem] mb-[2.5rem]">{item?.title}</h3>
                        <p className="mb-0 text-[#A38753] text-[2.25rem] font-semibold">{item?.text}</p>
                      </div>
                    </div>

                    {item?.cta && (
                      <CTAButton
                        className="mt-[4rem] px-[1rem] sm:px-[1.5rem] pb-[2rem]"
                        data={item.cta}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-red-500 text-center font-medium mb-0">No Ebooks available, please add some</p>
          )}
        </div>
      </section>

      <section className="pt-[10rem] pb-[14rem] lg:pt-[18rem] lg:pb-[22rem]">
        <div className="container">
          {data?.faqTitle && (
            <div className="richtext richtext-center mb-[5rem]">
              <PortableText value={data.faqTitle}
                            components={richTextComponent}/>
            </div>
          )}

          <div className="w-[min(139.75rem,100%)] mx-auto">
            {data?.faqItems && data.faqItems.length > 0 ? (
              <div className="bg-white rounded-[.5rem] border border-[#CFD6D3] px-[2rem] sm:px-[4rem] lg:px-[6rem]">
                <Accordion type="single" collapsible>
                  {data.faqItems.map((item, index) => {
                    return (
                      <AccordionItem
                        key={index + 1}
                        value={`item-${index + 1}`}
                        className="py-[4rem] lg:py-[6rem] border-b border-[#CFD6D3] last:border-0"
                      >
                        <AccordionTrigger className="py-0">
                          <div className="flex gap-[1.25rem] items-start mr-[3rem] lg:mr-[10rem]">
                            <span className="text-[#A38753] text-[2.5rem] lg:text-[3rem] font-display italic font-light flex-shrink-0 translate-y-[.35rem]">{padStart((index + 1).toString(), 2, '0')}.</span>
                            <span className="text-[#303F48] text-[2.5rem] lg:text-[3rem] font-sans text-start">{item?.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 mr-[5rem] pl-[4.25rem] lg:pl-[4.75rem]">
                          <div className="richtext richtext-start prose-p:text-[2.25rem] mt-[2rem] lg:mt-[3rem]">
                            <PortableText value={item.text}
                                          components={richTextComponent}/>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            ) : (
              <p className="text-red-500 text-center font-medium mb-0">No FAQ items available, please add some</p>
            )}
          </div>
        </div>
      </section>

      <section className="pb-[12rem] lg:pb-[18rem]">
        <div className="container">
          <div className="w-[min(154.5rem,100%)] mx-auto bg-white rounded-[.5rem] py-[4rem] lg:pt-[5rem] lg:pb-[6rem] px-[2rem] sm:px-[4rem] relative after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753] flex flex-col items-center">
            <Image
              className="!w-[14rem] mb-[4rem]"
              src={reviewStars}
              alt=""
            />

            {data?.boxText && (
              <div className="richtext prose-h2:mb-[2rem] lg:prose-h2:text-[7rem] prose-p:text-black prose-p:text-opacity-70 prose-h2:w-[min(138.25rem,100%)] prose-p:w-[min(95rem,100%)]">
                <PortableText value={data.boxText}
                              components={richTextComponent}/>
              </div>
            )}

            {data?.boxCTA && (
              <CTAButton
                className="mt-[4rem]"
                data={data.boxCTA}
              />
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