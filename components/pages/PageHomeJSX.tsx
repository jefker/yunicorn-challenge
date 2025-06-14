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
import values from "@/public/home/values.png";
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
import fairfamily from "@/public/global/fairfamily.png";
import face from "@/public/icons/Face--satisfied.svg"
import balancer from "@/public/icons/Load-balancer--local.svg"
import pedestrian from "@/public/icons/Pedestrian--family.svg"
import flag from "@/public/icons/Flag.svg"
import bg_dots from "@/public/global/bg-dots.png"
import square from "@/public/home/square.png"
import bussola from "@/public/home/bussola.png"
import curve from "@/public/home/curve.png"
import save from "@/public/home/save.png"
import target from "@/public/home/target.png"
import check from "@/public/home/check.png"
import advantageImage from "@/public/home/advantage.png";
import advantageBG from "@/public/home/advantageBG.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel"
import arrow from "@/public/home/arrow.png";
import arrow2 from "@/public/home/arrow 2.png";
import lastimage from "@/public/home/lastimage.png";


export default function PageHomeJSX({data}: {data: PageHomeSchema}) {
  return (
    <>
      <div className="bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url(${bg_dots.src})` }}
      >

      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="relative bg-white">
        <div className="relative overflow-clip pt-[29rem] pb-[39rem]">
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
            <Chip text={data?.heroChip} style="light" />

            {data?.heroTitle && (
              <div className="richtext prose-h1:text-[5rem] sm:prose-h1:text-[6rem] lg:prose-h1:text-[9rem] prose-h1:text-white prose-h1:w-[min(125rem,100%)] prose-p:w-[min(101.25rem,100%)] prose-p:text-white prose-p:text-opacity-80">
                <PortableText value={data.heroTitle} components={richTextComponent}/>
              </div>
            )}

            <div className="scale-[0.8] flex flex-col md:flex-row items-center md:justify-center gap-y-[3rem] md:gap-x-[2rem] mt-[2.5rem]">
              {data?.heroCTA1 && (
                <CTAButton
                  data={data.heroCTA1}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-[14rem] lg:py-[20rem]">
        <div className="container container flex gap-[7rem] items-center">
          <div className="flex flex-col items-center lg:items-start w-[52%]">
            <Chip text={data?.introChip} />

            {data?.introText && (
              <div className="richtext lg:richtext-start mb-[3rem]">
                <PortableText value={data?.introText}
                  components={richTextComponent} />
              </div>
            )}

            <Image
              className="!w-full rounded-[.5rem] lg:hidden mt-[2.5rem]"
              src={howM}
              quality={100}
              alt=""
            />

            <div className="max-w-56">
              {data?.introCTA && (
                <CTAButton
                  data={data.introCTA}
                />
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-end">
            <Image
              className="!w-full rounded-[.5rem]"
              src={how}
              quality={95}
              alt=""
            />

            <div className="absolute flex items-center h-[19rem] gap-4 mb-8 ml-8">
              <div className="bg-[#FFA944] w-[4px] h-full"></div>

              <div className="relative h-full flex items-center gap-10 bg-[#ffa7421a] bg-opacity-10 backdrop-blur-[2rem] p-[3rem] clip-corner-top-right">
                <Image className="w-[16rem]" src={fairfamily} alt="" />

                <div className="w-full flex flex-col text-white mb-0 gap-2">
                  <p className="text-[20px]">Top Arbeitgeber Award</p>
                  <p className="text-[16px]">Nachhaltig gesunder Arbeitgeber</p>
                  <p className="text-[#ffa944] text-[18px] mt-2">Fair Family</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[10rem] lg:pt-[15rem] pb-[14rem] lg:pb-[20rem]">
        <div className="container flex gap-[7.5rem] items-center">
          <div className="hidden lg:flex flex-col justify-center">
            <Image
              className="w-full rounded-[.5rem]"
              src={intro}
              quality={100}
              alt=""
            />
          </div>

          <div className="flex flex-col items-center lg:items-start w-[51%]">
            <Chip text={data?.introSecondChip} />

            {data?.introSecondText && (
              <div className="w-full richtext lg:richtext-start lg:prose-h2:text-[6rem] mb-[3rem]">
                <PortableText value={data?.introSecondText}
                  components={richTextComponent} />
              </div>
            )}

            <Image
              className="!w-full rounded-[.5rem] lg:hidden mt-[2.5rem]"
              src={introM}
              quality={100}
              alt=""
            />

            <div className="max-w-56">
              {data?.introSecondCTA && (
                <CTAButton
                  data={data.introSecondCTA}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-[14rem] lg:py-[20rem]">
        <div className="container flex gap-[7rem] items-center">
          <div className="flex flex-col lg:items-start w-[52%]">
            <Chip text={data?.valuesChip} />

            {data?.valuesTitle && (
              <div className="richtext lg:richtext-start mb-[2rem]">
                <PortableText value={data?.valuesTitle}
                  components={richTextComponent} />
              </div>
            )}

            <Image
              className="!w-full rounded-[.5rem] lg:hidden mt-[2.5rem]"
              src={howM}
              quality={100}
              alt=""
            />

            <div className="flex justify-center gap-4 pb-[2rem] h-[64rem]">
              <div className="bg-[#1C55C2] w-[1rem] h-full"></div>

              <div className="flex flex-col text-lg divide-y divide-[#1c55c233] bg-[#1c55c21a] gradient-border-greyblue backdrop-blur-[2rem] px-[2.2rem] py-[2rem] clip-corner-top-right">
                <div className="flex items-start gap-12 pb-7">
                  <Image
                    className="w-[5.3rem]"
                    src={face}
                    quality={100}
                    alt=""
                  />
                  {data?.valuesFirstText && (
                    <div className="flex flex-col gap-4 text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem]">
                      <p className="font-medium">{data?.valuesFirstTextTitle}</p>
                      <PortableText value={data?.valuesFirstText} components={richTextComponent} />
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-12 py-7">
                  <Image
                    className="w-[8rem]"
                    src={balancer}
                    quality={100}
                    alt=""
                  />
                  {data?.valuesSecondText && (
                    <div className="flex flex-col gap-4 text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem]">
                      <p className="font-medium">{data?.valuesSecondTextTitle}</p>
                      <PortableText value={data?.valuesSecondText}
                        components={richTextComponent} />
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-12 py-7">
                  <Image
                    className="w-[9rem]"
                    src={pedestrian}
                    quality={100}
                    alt=""
                  />
                  {data?.valuesThirdText && (
                    <div className="flex flex-col gap-4 text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem]">
                      <p className="font-medium">{data?.valuesThirdTextTitle}</p>
                      <PortableText value={data?.valuesThirdText}
                        components={richTextComponent} />
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-12 pt-7">
                  <Image
                    className="w-[6.8rem]"
                    src={flag}
                    quality={100}
                    alt=""
                  />
                  {data?.valuesFourthText && (
                    <div className="flex flex-col gap-4 text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem]">
                      <p className="font-medium">{data?.valuesFourthTextTitle}</p>
                      <PortableText value={data?.valuesFourthText}
                        components={richTextComponent} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="max-w-56">
              {data?.valuesCTA && (
                <CTAButton
                  data={data.valuesCTA}
                />
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-center">
            <Image
              className="!w-full rounded-[.5rem]"
              src={values}
              quality={95}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="relative bg-[#000918] sm:px-[1rem] sm:rounded-[.5rem] mx-[2rem]">
        <div className="container relative z-10 gap-[20rem] flex flex-col items-center w-full lg:prose-h2:text-[7.2rem] pt-[20.5rem] pb-[70rem] px-0">
          <section className="w-full">
            <div className="flex justify-center">
              <h2 className="text-white">{data?.workTitle}</h2>
            </div>

            <div className="flex justify-between mt-24">
              <div className="w-[344px] h-[275px] p-12" style={{ backgroundImage: `url(${square.src})` }}>
                <Image
                  className="my-0"
                  src={bussola}
                  quality={100}
                  alt=""
                />
                
                {data?.workFirstText && (
                  <div className="w-full richtext lg:richtext-start mb-[2rem] [&_p]:text-[#ffffff99]">
                    <h4 className="text-white mt-9 mb-12">{data?.workFirstTextTitle}</h4>
                    <PortableText value={data?.workFirstText}
                      components={richTextComponent} />
                  </div>
                )}
              </div>
              <div className="w-[344px] h-[275px] p-12" style={{ backgroundImage: `url(${square.src})` }}>
                <Image
                  className="my-0"
                  src={curve}
                  quality={100}
                  alt=""
                />
                
                {data?.workSecondText && (
                  <div className="w-full richtext lg:richtext-start mb-[2rem] [&_p]:text-[#ffffff99]">
                    <h4 className="text-white mt-9 mb-12">{data?.workSecondTextTitle}</h4>
                    <PortableText value={data?.workSecondText}
                      components={richTextComponent} />
                  </div>
                )}
              </div>
              <div className="w-[344px] h-[275px] p-12" style={{ backgroundImage: `url(${square.src})` }}>
                <Image
                  className="my-0"
                  src={save}
                  quality={100}
                  alt=""
                />
                
                {data?.workThirdText && (
                  <div className="w-full richtext lg:richtext-start mb-[2rem] [&_p]:text-[#ffffff99]">
                    <h4 className="text-white mt-9 mb-12">{data?.workThirdTextTitle}</h4>
                    <PortableText value={data?.workThirdText}
                      components={richTextComponent} />
                  </div>
                )}
              </div>
              <div className="w-[344px] h-[275px] p-12" style={{ backgroundImage: `url(${square.src})` }}>
                <Image
                  className="my-0"
                  src={target}
                  quality={100}
                  alt=""
                />
                
                {data?.workFourthText && (
                  <div className="w-full richtext lg:richtext-start mb-[2rem] [&_p]:text-[#ffffff99]">
                    <h4 className="text-white mt-9 mb-12">{data?.workFourthTextTitle}</h4>
                    <PortableText value={data?.workFourthText}
                      components={richTextComponent} />
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="w-full flex flex-col justify-center items-center">
            <div className="w-max mb-2 [&_p]:uppercase">
              <Chip text={data?.advantageChip} style="light" />
            </div>

            {data?.advantageText && (
              <div className="richtext mb-[6rem] [&_h2]:text-white text-[#ffffff99]">
                <PortableText value={data?.advantageText}
                  components={richTextComponent} />
              </div>
            )}

            <div className="flex justify-between w-full">
              <div className="flex justify-center gap-4 h-[64rem] w-[50%]">
                <div className="bg-[#FFA944] w-[0.5rem] h-full"></div>

                <div className="w-full flex flex-col text-lg divide-y divide-[#ffffff1a] bg-[#0D1423] gradient-border-greyblue backdrop-blur-[2rem] px-[2.2rem] py-[2rem] clip-corner-top-right">
                  <div className="flex gap-12 pb-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageFirstText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageFirstText}</p>
                        <PortableText value={data?.advantageFirstSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-12 py-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageSecondText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageSecondText}</p>
                        <PortableText value={data?.advantageSecondSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-12 py-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageThirdText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageThirdText}</p>
                        <PortableText value={data?.advantageThirdSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-12 py-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageFourthText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageFourthText}</p>
                        <PortableText value={data?.advantageFourthSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-12 py-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageFifthText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageFifthText}</p>
                        <PortableText value={data?.advantageFifthSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-12 pt-7 items-center">
                    <Image
                      className="m-0"
                      src={check}
                      quality={100}
                      alt=""
                    />
                    {data?.advantageSixthText && (
                      <div className="flex flex-col text-[2.25rem] richtext lg:richtext-start lg:prose-h2:text-[6rem] [&>p:last-child]:text-[#ffffffb3]">
                        <p className="font-medium text-white">{data?.advantageSixthText}</p>
                        <PortableText value={data?.advantageSixthSubtitle} components={richTextComponent} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-center">
                <Image
                  className="!w-full rounded-[.5rem] m-0"
                  src={advantageImage}
                  quality={95}
                  alt=""
                />
              </div>
            </div>

            <div className="w-full border border-[#ffffff1a] rounded flex items-center justify-between bg-[#0D1423] gradient-border-greyblue backdrop-blur-[2rem] mt-10 p-4">
              <p className="ml-7 font-medium text-white">{data?.advantageLastText}</p>
              
              <div className="w-max">
                {data?.advantageCTA && (
                  <CTAButton
                    data={data.advantageCTA}
                  />
                )}
              </div>
            </div>
          </section>
        </div>

        <Image
          className="absolute bottom-0 translate-x-0 left-0 object-cover object-top pointer-events-none hidden md:block"
          src={advantageBG}
          quality={100}
          alt=""
        />
      </section>

      <section className="relative py-[14rem] lg:py-[20rem]">
        <div className="flex flex-col gap-[7rem] items-start">
          <div className="container flex flex-col items-center lg:items-start">
            <Chip text={data?.healthChip} />

            {data?.introText && (
              <div className="richtext lg:richtext-start">
                <PortableText value={data?.healthText}
                  components={richTextComponent} />
              </div>
            )}
          </div>

          {data?.health?.length > 0 && (
            <section className="w-full relative">
              <Carousel opts={{ loop: false, align: "start" }}>
                <CarouselContent className="gap-[3rem] pl-[31rem]">
                  {data.health.map((item, index) => (
                    <CarouselItem key={index} className="relative basis-[464px] h-[80rem] pl-0 text-white overflow-hidden">
                      <Image className="absolute inset-0 bg-cover bg-center z-0" alt="" src={item.image} />

                      <div className="absolute inset-0 bg-[#000817] opacity-60 z-10"></div>

                      <div className="flex flex-col gap-[40rem] w-full h-full relative z-20 p-12">
                        <div className="w-max">
                          <Chip text={String(index + 1).padStart(2, "0")} style="light" />
                        </div>
                        <div className="flex gap-10">
                          <div className="flex flex-col">                            
                            <div className="bg-[#FFA944] w-[0.2rem] h-[30%]"></div>
                            <div className="bg-[#ffffff1a] w-[0.2rem] h-full"></div>
                          </div>

                          <div className="flex flex-col">
                            {item.title && (
                              <h3 className="text-[4rem] tracking-wider mb-4">
                                {item.title}
                              </h3>
                            )}
                            {item.subtitle && (
                              <div className="">
                                <PortableText value={item.subtitle} components={richTextComponent} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <div className="flex gap-10 bg-black [&>button:first-child]:rotate-180 [&>button:first-child]:cursor-pointer [&>button:before]:border-none [&>button:before]:content-none [&>button]:color-[#000000]">
                  <CarouselPrevious />
                  <CarouselNext />            
                </div> */}
              </Carousel>
            </section>
          )}
        </div>
      </section>

      <section className="relative py-[14rem] lg:py-[20rem]">
        <div className="container p-0">
          <div className="flex flex-col items-center lg:items-start w-[50%]">
            <Chip text={data?.openStarsChip} />

            {data?.introText && (
              <div className="richtext lg:richtext-start mb-[7rem] [&_h2]:text-[6.2rem]">
                <PortableText value={data?.openStarsText}
                  components={richTextComponent} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[5rem] items-start">
            <div className="flex w-full items-center justify-between bg-[#1C55C21a] border border-[#1C55C2] rounded-sm px-12 py-14">
              <h3 className="w-1/2 m-0">{data?.openStarsFisrtTitle}</h3>
              <div className="flex gap-4">
                <p className="py-5 px-10 bg-[#1C55C2] text-white uppercase">Business consulting</p>
                <p className="py-5 px-10 bg-[#1C55C2] text-white uppercase">Full-time</p>
                <p className="py-5 px-10 bg-[#1C55C2] text-white uppercase">Remote</p>
              </div>
              <div className="flex justify-end">
                <Image src={arrow} alt=""/>
              </div>
            </div>
            <div className="flex w-full items-center justify-between px-12">
              <h3 className="w-1/2 m-0">{data?.openStarsSecondTitle}</h3>
              <div className="flex gap-4">
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233 uppercase">Marketing Manager</p>
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233] uppercase">Full-time</p>
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233] uppercase">Remote</p>
              </div>
              <div className="flex justify-end">
                <Image src={arrow2} alt=""/>
              </div>
            </div>
            <div className="flex w-full items-center justify-between px-12 mt-10">
              <h3 className="w-1/2 m-0">{data?.openStarsSecondTitle}</h3>
              <div className="flex gap-4">
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233] uppercase">Marketing Manager</p>
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233] uppercase">Full-time</p>
                <p className="py-5 px-10 bg-[#1C55C21a] text-[#1C55C2] border-[#1C55C233] uppercase">Remote</p>
              </div>
              <div className="flex justify-end">
                <Image src={arrow2} alt=""/>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <section className="relative bg-[#F5F5F5] sm:px-[1rem] border border-[#0000001a] sm:rounded-[.5rem] mx-[2rem]">
        <div className="container relative z-10 gap-[6rem] flex flex-col items-center w-full lg:prose-h2:text-[7.2rem] py-[15rem] px-0">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col items-center lg:items-start w-1/2">
              <Chip text={data?.applicationChip} />

              {data?.applicationText && (
                <div className="richtext lg:richtext-start mb-[3rem]">
                  <h2>So läuft unser Bewerbungsprozess ab</h2>
                </div>
              )}
            </div>

            <div className="hidden lg:flex flex-col items-end w-1/2">
              <Image
                className="rounded-[.5rem]"
                src={lastimage}
                quality={95}
                alt=""
              />
            </div>
          </div>
          <div className="w-full">
            <div className="bg-[#FFFFFF] border border-[#0000001a] rounded-t-[.5rem]">
              {data?.application?.length > 0 && (
                <section className="relative flex px-10 py-20 gap-12">
                  {data.application.map((item, index) => (
                    <div key={index} className="flex flex-col items-center w-1/4">
                      <Image className="w-[64px] pb-10" alt="" src={item.image} />
                      
                      <div className="flex flex-col justify-center">
                        <div className="flex gap-4 justify-center mb-4">
                          <h4 className="text-[#999999]">{String(index + 1).padEnd(2, "/")}</h4>
                          {item.title && (
                            <h4 className="tracking-wider">
                              {item.title}
                            </h4>
                          )}
                        </div>
                        <div className="text-center text-[#999999] max-w-[293px]">
                          {item.subtitle && (
                            <PortableText value={item.subtitle} components={richTextComponent} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
            <div className="w-full border-x border-b border-[#0000001a] rounded-b-[.5rem] flex items-center justify-between bg-[#ffffff] p-10">
              <p className="font-medium">{data?.advantageLastText}</p>

              <div className="w-max">
                {data?.advantageCTA && (
                  <CTAButton
                    data={data.advantageCTA}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        data={data.settings?.footer}
        footerType={data.settings?.footerType}
      />

      </div>
    </>
  )
}