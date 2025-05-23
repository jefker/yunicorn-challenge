"use client"

import React from "react";
import {cn} from "@/lib/utils";
import {ITestimonial} from "@/sanity/types/testimonials";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {SanityVideoPlayer} from "@/components/ui/SanityVideoPlayer";

export default function TestimonialsList({
  testimonialList,
  className = '',
}: {
  testimonialList: ITestimonial[];
  className?: string;
}) {
  if (!testimonialList || testimonialList.length === 0) return null;

  return (
    <div className={cn("flex flex-col items-center relative gap-[4rem] lg:gap-[7rem]", className)}>
      <div className="w-full flex flex-col gap-[5rem] md:gap-[10rem] lg:gap-[20rem] relative">
        {testimonialList.map((item, index) => (
          <div key={index}
               className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.75rem]">
            <div className={`flex flex-col gap-[1rem] lg:gap-[1.75rem] ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
              {item?.video && (
                <div className="rounded-[.5rem] overflow-clip relative flex w-full *:w-full">
                  <SanityVideoPlayer
                    playerData={item.video}
                    playsinline={true}
                  />
                </div>
              )}
              <div className="rounded-[.5rem] relative w-full flex p-[2rem] sm:p-[3rem] bg-white border border-[#CFD6D3] border-opacity-50">
                <p className="mb-0 text-[#303F48]">{item.quote}</p>
              </div>
            </div>

            <div className={`flex flex-col justify-center items-start rounded-[.5rem] w-full p-[2rem] sm:p-[3rem] lg:p-[4.5rem] bg-white border border-[#CFD6D3] border-opacity-50 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
              <h3 className="text-[5rem] lg:text-[6rem] italic text-[#0F2736]">{item.name}</h3>
              <p className="lg:text-[3rem] font-semibold text-[#A38753] w-full pb-[3rem] mb-[3rem] lg:mb-[4.5rem] border-b border-black border-opacity-10">{item.position}</p>

              {item?.text && (
                <div className="richtext richtext-start prose-p:text-[#0F2736]">
                  <PortableText value={item.text}
                                components={richTextComponent}/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
