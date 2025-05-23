'use client'

import {cn} from "@/lib/utils";
import Image from "next/image";
import faviconBlue from "@/public/global/favicon-dark-blue.svg";
import faviconWhite from "@/public/global/favicon-white.svg";

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
      "flex items-center mb-[2rem]",
      style === 'dark' ? "opacity-50" : "opacity-60",
      className
    )}>
      <div className={`flex-shrink-0 pr-[2.25rem] py-[.75rem] mr-[2rem] border-r ${style === 'dark' ? 'border-[#002533]' : 'border-white'}`}>
        <Image
          className="!w-[3.25rem]"
          src={style === 'dark' ? faviconBlue : faviconWhite}
          alt=""
        />
      </div>
      <p className={`mb-0 leading-[1.3em] text-[2rem] ${style === 'dark' ? 'text-[#002533]' : 'text-white'}`}>{text}</p>
    </div>
  );
}