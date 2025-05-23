'use client'

import {cn} from "@/lib/utils";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {PortableTextBlock} from 'sanity';
import {padStart} from "lodash";

export default function OrderedList({
  items,
  className = '',
}: {
  items: { text: PortableTextBlock[] }[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <ol className={cn("flex flex-col gap-[2rem] list-none", className)}>
      {items.map((item, index) => (
        <li key={index}
            className="flex items-start gap-[1.5rem] p-0 m-0">
          <span className="text-[2.25rem] font-display text-[#A38753] italic flex-shrink-0">{padStart((index + 1).toString(), 2, '0')}.</span>

          <div className="richtext richtext-start prose-p:text-[2.25rem]">
            <PortableText value={item?.text}
                          components={richTextComponent} />
          </div>
        </li>
      ))}
    </ol>
  );
}