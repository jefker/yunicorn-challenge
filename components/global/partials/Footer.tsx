'use client'

import React from "react";
import {IFooter} from "@/sanity/lib/definitions";
import {usePathname} from "next/navigation";
import Image from "@/helpers/Image";
import Link from "next/link";

import logoWhite from "@/public/global/logo-white.svg";

export default function Footer({
  data,
  footerType
}: {
  data: IFooter;
  footerType: "main" | "lp";
}) {

  const pathname = usePathname();

  return (
    <footer className="lg:p-[1rem] relative z-10">
      <div className={`lg:rounded-[.5rem] px-[4rem] lg:px-[2rem] ${footerType === "main" ? 'bg-[#172329] pt-[6.25rem] lg:pt-[11.25rem]' : 'bg-white'}`}>
        <div className="w-[min(224rem,100%)] mx-auto">

          {footerType === "main" && (
            <div className="flex flex-col lg:flex-row lg:justify-between gap-[9rem] pb-[8rem] lg:pb-[12.5rem] border-b border-white border-opacity-[.15]">
              <div className="w-full lg:w-[78.125rem] flex flex-col items-start">
                <Image
                  className="!w-[22.5rem] mb-[3rem]"
                  src={logoWhite}
                  alt=""
                />
                {data?.bigText && (
                  <h2 className="text-[#FDFBF4] text-[4rem] lg:text-[8rem]">{data.bigText}</h2>
                )}
              </div>

              {data?.menus && data.menus.length > 0 && (
                <div className="w-full lg:w-[125rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  {data.menus.map((menu, index) => {
                    const lastItem = index === data.menus.length - 1;
                    const isSmScreen = data.menus.length > 2 && index < 2;
                    return (
                      <div key={index}
                           className={`flex flex-col items-start gap-[2.75rem]
                                      ${lastItem ? '' : 'border-b md:border-0 border-white border-opacity-[.15] pb-[5rem] mb-[5rem] md:pb-0 md:mb-0'}
                                      ${isSmScreen ? 'sm:border-b pb-[5rem] mb-[5rem] md:pb-0 md:mb-0' : 'sm:border-0 sm:pb-0 sm:mb-0'}`}>
                        <h3 className="text-[#FDFBF4] text-[3rem]">{menu?.menuTitle}</h3>
                        {menu?.menu && menu.menu.length > 0 && (
                          <ul className="flex flex-col items-start gap-[2.75rem] list-none p-0 m-0">
                            {menu.menu.map((item, index) => {
                              const href = item?.link?.externalLink && item?.link?.url
                                ? item?.link?.url
                                : item?.link?.internalLink?.settings?.slug;

                              const isActive = pathname === href;

                              return (
                                <li key={index}
                                    className={`text-[#FDFBF4] text-[2.25rem] sm:text-[2rem] opacity-60 relative flex items-center
                                    before:absolute before:-translate-x-[1.75rem] before:bg-[#FDFBF4] before:opacity-0 before:w-[1rem] before:h-[1rem] before:rounded-[.25rem]
                                    hover:opacity-100 transition-all
                                    ${isActive ? '!opacity-100 ' : 'hover:before:opacity-100'}`}>
                                  <Link
                                    href={
                                      item?.link?.externalLink && item?.link?.url
                                        ? item?.link?.url
                                        : item?.link?.internalLink?.settings?.slug?.current ?? ""
                                    }
                                    target={
                                      item?.link?.openInNewTab ? "_blank" : "_self"
                                    }
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          <div className="pt-[5rem] pb-[3rem] lg:pb-[5rem] grid grid-cols-1 md:grid-cols-3 gap-[4rem]">
            <div className="flex items-center justify-center md:justify-start text-center md:text-start">
              <p className={`mb-0  text-[2rem] leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'}`}>Copyright © {new Date().getFullYear()} Lüddemann Investments</p>
            </div>

            <div className="flex justify-center items-center gap-[2rem]">
              {data?.impressum && (() => {
                const href = data.impressum?.externalLink && data.impressum?.url
                  ? data.impressum?.url
                  : data.impressum?.internalLink?.settings?.slug?.current ?? ""

                const isActive = pathname === href;

                return href ? (
                  <Link className={`text-[2rem] hover:opacity-100 transition-opacity leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'} ${isActive ? '!opacity-100' : ''}`}
                        href={href} target={data.impressum?.openInNewTab ? "_blank" : "_self"}>
                    <span>Impressum</span>
                  </Link>
                ) : null;
              })()}

              <div className={`w-[1rem] h-[1rem] rounded-[.25rem] flex-shrink-0 ${footerType === "main" ? 'bg-[#FDFBF4] bg-opacity-60' : 'bg-[#a38753]'}`}></div>

              {data?.datenschutz && (() => {
                const href = data.datenschutz?.externalLink && data.datenschutz?.url
                  ? data.datenschutz?.url
                  : data.datenschutz?.internalLink?.settings?.slug?.current ?? ""

                const isActive = pathname === href;

                return href ? (
                  <Link className={`text-[2rem] hover:opacity-100 transition-opacity leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'} ${isActive ? '!opacity-100' : ''}`}
                        href={href} target={data.datenschutz?.openInNewTab ? "_blank" : "_self"}>
                    <span>Datenschutz</span>
                  </Link>
                ) : null;
              })()}
            </div>

            <div className="flex items-center justify-center md:justify-end text-center md:text-end">
              <Link className={`text-[2rem] hover:opacity-100 transition-opacity leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'}`}
                    href={'https://yunicorn.vc/'}
                    target={'_blank'}>
                <span>Design by Yunicorn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
