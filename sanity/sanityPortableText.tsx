import {PortableText, PortableTextComponents} from '@portabletext/react'
import React from "react";
import _ from "lodash";
import Image from "next/image";
import checkmarkIcon from "@/public/icons/check-gold.svg";

export const richTextComponent: PortableTextComponents = {
  marks: {
    textHighlightLight: ({ children }) => (
      <mark className="bg-clip-text text-transparent bg-gradient-to-r from-[#A69577] via-[#C1A26C] to-[#E3C898]">
        {children}
      </mark>
    ),
    textHighlightDark: ({ children }) => (
      <mark className="bg-clip-text text-transparent bg-gradient-to-r from-[#685E4C] via-[#76684D] to-[#A28550]">
        {children}
      </mark>
    ),
    underline: ({ children }) => <u className="underline">{children}</u>,
    em: ({ children }) => <em className="pr-[.125em]">{children}</em>,
  },
  block: {
    h1: ({ children }) => <h1 className="">{children}</h1>,
    h2: ({ children }) => <h2 className="">{children}</h2>,
    h3: ({ children }) => <h3 className="">{children}</h3>,
    h4: ({ children }) => <h4 className="">{children}</h4>,
    h5: ({ children }) => <h5 className="">{children}</h5>,
    h6: ({ children }) => <h6 className="">{children}</h6>,
    normal: ({ children }) => <p className="p-normal">{children}</p>,
  },
  types: {
    dashedLine: ({ value }) => {
      const marginClass = value?.marginSize || "my-[5rem]";

      return (
        <hr className={`w-full border-t-[.175rem] [border-image:repeating-linear-gradient(to_right,black_0,black_5px,transparent_5px,transparent_10px)_1] opacity-20 ${marginClass}`} />
      );
    },
    checkList: ({ value }) => {
      return (
        <ul className="list-none p-0 my-[3rem] flex flex-col items-start gap-[2.25rem]">
          {value?.items?.map((item: any, index: number) => {
            return (
              <li key={index}
                  className="flex items-start m-0 p-0 gap-[1.5rem]">
                <Image className="!w-[4rem] !m-0 translate-y-[.45rem] flex-shrink-0"
                       src={checkmarkIcon}
                       alt="Checkmark"/>
                <div className="richtext richtext-start">
                  <PortableText value={item.content} components={richTextComponent} />
                </div>
              </li>
            )
          })}
        </ul>
      );
    },
  }
}

export const customRichTextComponent = (props: PortableTextComponents) => {
  return _.merge(_.cloneDeep(richTextComponent), props)
}