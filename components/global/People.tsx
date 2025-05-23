"use client"

import React from "react";
import {cn} from "@/lib/utils";
import Image from "@/helpers/Image";
import people from "@/public/global/people.png";

export default function People({
  textColor = 'light',
  className = '',
}: {
  textColor?: 'light' | 'dark'
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-[2rem]">
          <Image className="!w-[13rem]"
                 src={people}
                 quality={100}
                 alt="" />
        </div>
        <p className={`mb-0 leading-[1.3em] text-[2.25rem] sm:text-[2rem] text-opacity-80 ${textColor === 'light' ? 'text-white' : 'text-[#002533]'}`}>
          <strong className="font-semibold">Über 10.000+<br/></strong>Trader & Investoren betreut
        </p>
      </div>
    </div>
  )
}