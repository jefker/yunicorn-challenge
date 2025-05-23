"use client"

import React, {useState, useEffect } from "react";
import {PortableText} from '@portabletext/react';
import {PortableTextBlock} from 'sanity';
import {richTextComponent} from '@/sanity/sanityPortableText';
import {GROQImage} from '@/sanity/lib/definitions';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import Image from "@/helpers/Image";

import quoteIcon from "@/public/global/quote-icon-dark.svg";

const ArrowIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_675_41182)">
      <path d="M3.75 12H20.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_675_41182">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

type QuoteItem = {
  name: string;
  position: string;
  text: PortableTextBlock[];
  image: GROQImage;
};

export default function QuoteSlider({
  items
}: {
  items: QuoteItem[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateSlideState = () => {
      const selectedSnap = api.selectedScrollSnap();
      setCurrentSlide(selectedSnap);
      setIsFirstSlide(selectedSnap === 0);
      setIsLastSlide(selectedSnap === api.scrollSnapList().length - 1);
    };

    api.on("select", updateSlideState);
    updateSlideState();

    return () => api.off("select", updateSlideState);
  }, [api]);

  if (!items || items.length === 0) return null;

  return (
    <>
      <Carousel
        setApi={setApi}
      >
        <CarouselContent className="flex gap-[4rem]">
          {items.map((item, index) => {
            return (
              <CarouselItem key={index}
                            className="w-full flex flex-col lg:flex-row gap-[1.5rem] !p-0">
                <Image className="!w-full lg:!w-[66.25rem] rounded-[.5rem] flex-shrink-0"
                       src={item?.image ?? ''}
                       quality={100}
                       alt="" />

                <div className="bg-white rounded-[.5rem] border border-[#537589] border-opacity-25 px-[3rem] sm:px-[4rem] lg:px-[6rem] py-[4rem] flex flex-col items-start justify-center grow">
                  <p className="font-display text-[4rem] sm:text-[5rem] md:text-[6rem] mb-0">{item?.name}</p>
                  <p className="font-semibold text-[#A38753] lg:text-[3rem] w-full border-b border-black border-opacity-10 pb-[2.5rem] mb-[2.5rem]">{item?.position}</p>

                  <Image className="!w-[4.5rem] mb-[3rem]"
                         src={quoteIcon}
                         alt="" />

                  <div className="richtext richtext-start prose-p:text-[2.25rem]">
                    <PortableText value={item.text}
                                  components={richTextComponent}/>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="relative flex items-start justify-between mt-[2rem]">
        <div className="w-[26rem] lg:w-[58.75rem] flex justify-center gap-[1rem] mt-[1.25rem]">
          {items.map((_, index) => (
            <div key={index}
                 className={`transition-all h-[.375rem] bg-[#A38753] ${currentSlide === index ? "grow-[2.5]" : "grow bg-opacity-10"}`}/>
          ))}
        </div>

        <div className="flex gap-[2rem] h-[6.75rem] md:h-auto">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={isFirstSlide}
            className={`flex items-center justify-center p-[2rem] rounded-[1rem] transition-all bg-[#A38753] border [&_svg]:rotate-180 [&_svg]:w-[2.75rem] lg:[&_svg]:w-[3rem] [&_svg]:h-[2.75rem] lg:[&_svg]:h-[3rem] ${
              isFirstSlide ? "bg-opacity-10 border-[#A38753] border-opacity-20 cursor-not-allowed [&_svg]:text-[#A38753]" : "border-[#CFD6D3] hover:cursor-pointer [&_svg]:text-[#F9F6EB]"
            }`}
          >
            {ArrowIcon}
          </button>

          <button
            onClick={() => api?.scrollNext()}
            disabled={isLastSlide}
            className={`flex items-center justify-center p-[2rem] rounded-[1rem] transition-all bg-[#A38753] border [&_svg]:w-[2.75rem] lg:[&_svg]:w-[3rem] [&_svg]:h-[2.75rem] lg:[&_svg]:h-[3rem] ${
              isLastSlide ? "bg-opacity-10 border-[#A38753] border-opacity-20 cursor-not-allowed [&_svg]:text-[#A38753]" : "border-[#CFD6D3] hover:cursor-pointer [&_svg]:text-[#F9F6EB]"
            }`}
          >
            {ArrowIcon}
          </button>
        </div>
      </div>
    </>
  )
}
