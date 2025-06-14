'use client'

import {cn} from "@/lib/utils";
import Image from "next/image";
import faviconBlue from "@/public/global/favicon-blue.svg";
import faviconYellow from "@/public/global/favicon-yellow.svg";

export default function Chip({
  text,
  style = 'dark',
  className = '',
}: {
  text?: string
  style?: 'dark' | 'light';
  className?: string;
}){
  if (!text) return null;

  return (
    <div className={cn(
      "flex items-center mb-[2rem] gap-5 pt-[1.2rem] pb-[1rem] px-[2rem] clip-corner",
      style === 'dark' ? "bg-[#E7EDF8] boder border-[#A7BDE7]" : "bg-[#ffa9441c] border border-[#6E4F2B]",
      className
    )}>
      <div className={`flex-shrink-0 mb-[0.5rem]`}>
        <Image
          className=""
          src={style === 'dark' ? faviconBlue : faviconYellow}
          alt=""
        />
      </div>
      <p className={`mb-0 leading-[1.3em] text-[2.4rem] ${style === 'dark' ? 'text-[#1C55C2] uppercase' : 'text-[#FFA944]'}`}>{text}</p>
    </div>
  );
}