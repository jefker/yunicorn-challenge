"use client"

import React from "react";
import {useEffect, useState} from "react";
import debounce from "lodash/debounce";
import {PortableTextBlock} from "sanity";
import {ITestimonial} from "@/sanity/types/testimonials";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import Chip from "@/components/global/Chip";
import {SanityVideoPlayer} from "@/components/ui/SanityVideoPlayer";

export default function StickyTestimonials({
  chip,
  title,
  testimonialList,
}: {
  chip?: string;
  title?: PortableTextBlock[];
  testimonialList: ITestimonial[];
}) {

  const [paddingBottom, setPaddingBottom] = useState<string | undefined>(undefined);

  useEffect(() => {
    const header = document.getElementById('testimonial-header');
    const lastItem = document.querySelector('.testimonial-item:last-of-type');
    if (!header || !lastItem) return;

    const isLargeScreen = () => window.innerWidth >= 993;
    const lastScrollY = { current: window.scrollY };

    const updatePadding = (show: boolean) => {
      if (!isLargeScreen()) {
        setPaddingBottom("0");
        return;
      }

      if (show) {
        const height = lastItem.getBoundingClientRect().height;
        setPaddingBottom(`calc(${height}px + 7rem)`);
      } else {
        const scrollingUp = window.scrollY < lastScrollY.current;
        if (scrollingUp) {
          setPaddingBottom("0");
        }
      }

      lastScrollY.current = window.scrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        updatePadding(entry.isIntersecting);
      },
      { root: null, threshold: 0.01 }
    );

    observer.observe(lastItem);

    const debouncedResize = debounce(() => {
      if (paddingBottom !== "0") {
        const height = lastItem.getBoundingClientRect().height;
        setPaddingBottom(`calc(${height}px + 7rem)`);
      }
    }, 200);

    window.addEventListener("resize", debouncedResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", debouncedResize);
    };
  }, [paddingBottom]);


  const [stickyTop, setStickyTop] = useState<string | undefined>(undefined);

  useEffect(() => {
    const header = document.getElementById("testimonial-header");

    if (!header) return;

    const updateStickyTop = () => {
      const isLarge = window.innerWidth >= 993;

      if (isLarge) {
        const height = header.getBoundingClientRect().height;
        setStickyTop(`calc(${height}px + 11rem)`);
      } else {
        setStickyTop(undefined);
      }
    };

    updateStickyTop();
    const debouncedResize = debounce(updateStickyTop, 200);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  if (!testimonialList || testimonialList.length === 0) return null;

  return (
    <div className="testimonial-wrapper flex flex-col items-center relative gap-[4rem] lg:gap-[7rem]">
      <div id="testimonial-header"
           style={{ paddingBottom }}
           className="flex flex-col items-center lg:sticky lg:top-[4rem]">
        <Chip text={chip} />

        {title && (
          <div className="richtext richtext-highlight-dark lg:prose-h2:text-[6rem] w-[min(73rem,100%)]">
            <PortableText value={title}
                          components={richTextComponent}/>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-[5rem] md:gap-[10rem] lg:gap-[20rem] relative">
        {testimonialList.map((item, index) => (
          <div className="testimonial-item flex flex-col lg:flex-row gap-[1.5rem] lg:sticky"
               key={index}
               style={{ zIndex: index, top: stickyTop }}>
            <div className="w-full lg:grow rounded-[.5rem] overflow-clip *:w-full flex">
              <SanityVideoPlayer
                playerData={item?.video}
                playsinline={true}
              />
            </div>

            <div className="w-full flex-shrink-0 lg:w-[72.55rem] flex flex-col justify-center items-start bg-white rounded-[.5rem] border border-[#537589] border-opacity-25 px-[2rem] py-[3rem] sm:px-[3rem]">
              <h3 className="text-[#303F48] leading-none text-[5rem]">{item.name}</h3>

              {item?.position && (
                <p className="text-[#A38753] text-[2.5rem] font-semibold mt-[1rem] mb-0">{item.position}test</p>
              )}

              <div className="richtext richtext-start prose-p:text-[2.25rem] lg:prose-p:text-[2rem] mt-[3rem] pt-[2.5rem] border-t border-black border-opacity-10">
                <PortableText value={item?.text}
                              components={richTextComponent} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
