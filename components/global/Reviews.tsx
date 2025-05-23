"use client"

import React from "react";
import Image from "@/helpers/Image";
import people from "@/public/global/people.png";

export default function Reviews() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <div className="flex-shrink-0 pr-[2.25rem] border-r border-[#002533] border-opacity-30 mr-[2rem]">
          <Image className="!w-[17.375rem]"
                 src={people}
                 quality={100}
                 alt="" />
        </div>
        <p className="mb-0 text-[#002533] text-opacity-50 leading-[1.3em] text-[2.25rem] sm:text-[2rem]">793+ Bewertungen</p>
      </div>
    </div>
  )
}
