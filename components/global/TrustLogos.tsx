"use client"

import Image from "@/helpers/Image";
import React from "react";
import trustDesktop from "@/public/global/trust-desktop.svg";
import trustMobile from "@/public/global/trust-mobile.svg";

export default function TrustLogos() {
  return (
    <div className="w-[min(161.5rem,100%)] lg:px-[2rem] overflow-clip">
      <Image className="!w-full hidden lg:block"
             src={trustDesktop}
             alt="Trust Logos" />

      <div className="overflow-clip lg:hidden">
        <Image className="!w-[187.5rem] max-w-[unset] trustScroll-animation"
               src={trustMobile}
               alt="Trust Logos" />
      </div>
    </div>
  )
}
