"use client"

import React, {useState, useEffect } from "react";
import {Carousel, CarouselContent, CarouselItem} from "@/shadcn/ui/carousel";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {PortableText} from "@portabletext/react";

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

export default function TestimonialSlider({ items }: { items: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSlideState = () => {
      const selectedSnap = api.selectedScrollSnap();
      setCurrentSlide(selectedSnap);
      setIsFirstSlide(selectedSnap === 0);
      setIsLastSlide(selectedSnap === api.scrollSnapList().length - 1);
      setSnapCount(api.scrollSnapList().length);
    };

    api.on("select", updateSlideState);
    updateSlideState();

    return () => api.off("select", updateSlideState);
  }, [api]);

  return (
    <div className="w-[min(165rem,100%)] mx-auto">
      {items && items.length > 0 ? (
        <>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
          >
            <CarouselContent className="flex gap-[2.25rem]">
              {items.map((item, index) => {
                return (
                  <CarouselItem key={index}
                                className="bg-white rounded-[.5rem] border border-[#CFD6D3] px-[2rem] py-[3rem] sm:px-[3rem] lg:p-[5rem] flex flex-col items-start gap-[6rem] w-full md:w-[calc(50%-1.25rem)]">
                    <div className="richtext richtext-start prose-p:text-[2.5rem] lg:prose-p:text-[3rem] prose-p:font-semibold">
                      <PortableText value={item?.text} components={richTextComponent}/>
                    </div>
                    <p className="text-[2.25rem] lg:text-[3rem] mb-0">{item?.from}</p>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>

          <div className="relative flex items-start justify-between mt-[2rem]">
            <div className="w-[26rem] lg:w-[58.75rem] flex justify-center gap-[1rem] mt-[1.25rem]">
              {Array.from({ length: snapCount }).map((_, index) => (
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
      ) : (
        <p className="text-red-500 text-center font-medium mb-0">No testimonial items added. Please add some</p>
      )}
    </div>
  )
}
