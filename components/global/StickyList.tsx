'use client'

import React from "react";
import {PortableTextBlock} from 'sanity';
import {GROQImage} from '@/sanity/lib/definitions';
import Image from "next/image";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";

type StickyListItem = {
  title: string;
  text: PortableTextBlock[];
  icon: GROQImage;
};

export default function StickyList({
  list
}: {
  list: StickyListItem[];
}){
  if (!list || list.length === 0) return null;

  return (
    <div className="flex flex-col gap-[4rem] lg:gap-[10rem]">
      {list.map((item, index) => (
        <div key={index}
             className={`bg-white rounded-[.5rem] py-[3rem] lg:py-[4.5rem] px-[2rem] sm:pr-[3rem] flex items-start gap-[3rem] relative lg:sticky lg:top-[12rem] ${index === 0 ? 'after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]' : ''}`}>
          <div className="w-[4rem] md:w-[6rem] lg:w-[8rem] flex justify-center flex-shrink-0">
            <Image
              className="!w-[4rem]"
              src={item?.icon ?? ''}
              alt=""
            />
          </div>

          <div className="grow">
            <p className="leading-none font-display text-[3rem] lg:text-[4rem] text-[#0F2736] pb-[2rem] mb-[2rem] border-b border-[#002533] border-opacity-10">{item?.title}</p>

            <div className="richtext richtext-start">
              <PortableText value={item?.text} components={richTextComponent}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}