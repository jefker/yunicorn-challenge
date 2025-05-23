'use client'

import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {PortableTextBlock} from "sanity";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";

import checkBig from "@/public/icons/check-big.svg";

type ListItem = {
  text: PortableTextBlock[]
}

export default function Chip({
  items,
  className = '',
}: {
  items?: ListItem[]
  className?: string;
}){
  if (!items) return null;

  const amount = items.length;

  console.log(amount)

  return (
    <div className={cn(
      "w-[min(154.5rem,100%)] grid grid-cols-1 sm:grid-cols-2 gap-[2rem]",
      amount === 3 ? "lg:grid-cols-3" : amount <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-4",
      className
    )}>
      {items.map((item, index) => (
        <div
          key={index}
          className="p-[2rem] bg-white border border-[#CFD6D3] rounded-[.5rem] flex flex-col justify-between relative after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]">
          <div className="flex flex-col flex-start justify-between h-full">
            <Image
              className="!w-[5rem] mb-[4rem] lg:mb-[10rem]"
              src={checkBig}
              alt=""
            />

            {item?.text && (
              <div className="richtext richtext-start prose-h3:font-sans prose-h3:text-[2.25rem] prose-h3:leading-[1.3] prose-h3:font-semibold prose-h3:text-[#303F48] prose-h3:mb-[.5rem] prose-p:text-[2.25rem] prose-p:text-[#002533] prose-p:text-opacity-80">
                <PortableText
                  value={item.text}
                  components={richTextComponent}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}