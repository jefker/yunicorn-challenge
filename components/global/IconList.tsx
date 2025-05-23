import React from "react";
import {cn} from "@/lib/utils";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {PortableTextBlock} from "sanity";
import Image from "next/image";

import check from "@/public/icons/check-gold.svg";

type IconListItem = {
  text: PortableTextBlock[];
  icon?: string;
};

export default function IconList({
  items,
  columns = false,
  className = '',
}: {
  items?: IconListItem[];
  columns?: boolean;
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-[2rem]", className, columns ? 'lg:grid lg:grid-cols-2 lg:gap-x-[4rem]' : '')}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-[2rem]">
          <Image
            className="!w-[4rem] flex-shrink-0 translate-y-[.5rem]"
            src={item.icon || check}
            alt=""
          />

          <div className="richtext richtext-start">
            <PortableText value={item?.text} components={richTextComponent}/>
          </div>
        </li>
      ))}
    </ul>
  );
}