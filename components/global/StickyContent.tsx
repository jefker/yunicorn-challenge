"use client"

import React from "react";
import {useEffect, useState} from "react";
import debounce from "lodash/debounce";
import {GROQImage} from "@/sanity/lib/definitions";
import {PortableTextBlock} from "sanity";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import Chip from "@/components/global/Chip";
import Image from "next/image";
import {padStart} from "lodash";

import starsGold from "@/public/global/stars-gold-bright.svg";
import starsGold3 from "@/public/global/stars-gold-3-bright.svg";

export default function StickyContent({
  chip,
  title,
  items,
  indexPosition,
}: {
  chip?: string;
  title?: PortableTextBlock[];
  items: {
    text: PortableTextBlock[];
    image: GROQImage;
  }[];
  indexPosition?: 'top' | 'bottom';
}) {

  const [paddingBottom, setPaddingBottom] = useState<string | undefined>(undefined);

  useEffect(() => {
    const header = document.getElementById('list-header');
    const lastItem = document.querySelector('.list-content-item:last-of-type');
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
    const header = document.getElementById("list-header");

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

  if (!items || items.length === 0) return null;

  return (
    <div className="list-wrapper flex flex-col items-center relative gap-[4rem] lg:gap-[7rem]">
      <div id="list-header"
           style={{ paddingBottom }}
           className="flex flex-col items-center lg:sticky lg:top-[4rem]">
        <Chip
          text={chip}
        />

        {title && (
          <div className="richtext richtext-highlight-dark lg:prose-h2:text-[6rem] w-[min(84rem,100%)]">
            <PortableText
              value={title}
              components={richTextComponent}
            />
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-[5rem] md:gap-[10rem] lg:gap-[20rem] relative">
        {items.map((item, index) => (
          <div className={`list-content-item lg:sticky grid grid-cols-1 lg:grid-cols-2 gap-[4rem] bg-white rounded-[.5rem] p-[2rem] ${index === 0 ? 'after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]' : ''}`}
               key={index}
               style={{ zIndex: index, top: stickyTop }}>
            <div className="flex flex-col items-start justify-between sm:p-[1.5rem]">
              <div className="flex items-center gap-[1.5rem] mb-[10rem]">
                <Image
                  className={`${indexPosition === 'top' ? '!w-[7.125rem]' : '!w-[12.125rem]'}  flex-shrink-0`}
                  src={indexPosition === 'top' ? starsGold3 : starsGold}
                  alt=""
                />
                {indexPosition === 'top' && (
                  <p className="leading-none mb-0">Schritt {padStart((index + 1).toString(), 2, '0')}</p>
                )}
              </div>


              <div className="flex flex-col items-start">
                {indexPosition !== 'top' && (
                  <p className="text-[4rem] font-display text-[#A38753] italic mb-0">{padStart((index + 1).toString(), 2, '0')}.</p>
                )}

                {item?.text && (
                  <div className="richtext richtext-start richtext-highlight-dark prose-h3:text-[3rem] md:prose-h3:text-[4rem] prose-p:text-[2.25rem] w-[min(64.75rem,100%)]
                  prose-ul:mb-[1em] prose-ul:list-none prose-ul:flex prose-ul:flex-col prose-ul:gap-[2rem] prose-ul:!pl-0 prose-li:relative prose-li:m-0 prose-li:!pl-[2.5rem] prose-li:text-[2rem] prose-li:text-[#002533] prose-li:text-opacity-80 prose-li:text-start
                  prose-li:before:absolute prose-li:before:w-[1rem] prose-li:before:h-[1rem] prose-li:before:bg-[#A38753] prose-li:before:left-0 prose-li:before:top-[1.125rem] prose-li:before:rounded-[.25rem]">
                    <PortableText
                      value={item.text}
                      components={richTextComponent}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[.5rem] overflow-clip">
              <Image
                className="!w-full"
                src={item?.image ?? ''}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
