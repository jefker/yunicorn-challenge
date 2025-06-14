'use client'

import React from "react";
import {IFooter} from "@/sanity/lib/definitions";
import {usePathname} from "next/navigation";
import Image from "@/helpers/Image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import footerbg from "@/public/home/footerbg.png"
import { CTAButton } from "@/shadcn/ui/button";


export default function Footer({
  data,
  footerType
}: {
  data: IFooter;
  footerType: "main" | "lp";
}) {

  const pathname = usePathname();

  return (
    <footer className="mx-[2rem] mb-[2rem] mt-[1.5rem] relative z-10">
      <div className={`lg:rounded-[.5rem] px-[7.6rem] bg-[#000918] pt-[7rem] pb-[35rem]`}>
        <div className="relative z-10 w-[min(224rem,100%)] w-full">
          {footerType === "main" && (
            <div className="flex flex-col lg:flex-row lg:justify-between gap-[9rem] pb-[44rem] border-b border-white border-opacity-[.15]">
              <div className="w-full flex flex-col items-start max-w-[410px] gap-[2rem]">
                {data?.bigText && (
                  <h2 className="text-white tracking-wider text-normal text-[4.5rem] mb-0">{data.bigText}</h2>
                )}
              
                {data?.text && (
                  <div className="text-[#ffffff66] ">
                    <PortableText value={data.text} components={richTextComponent}/>
                  </div>
                )}

                {data?.cta && (
                  <CTAButton
                    data={data.cta}
                  />
                )}
              </div>

              {data?.menus && data.menus.length > 0 && (
                <div className="w-full lg:w-[82rem] grid grid-cols-2">
                  {data.menus.map((menu, index) => {
                    const lastItem = index === data.menus.length - 1;
                    const isSmScreen = data.menus.length > 2 && index < 2;
                    return (
                      <div key={index}
                           className={`flex flex-col items-start gap-[2.35rem]
                                      ${lastItem ? '' : 'border-b md:border-0 border-white border-opacity-[.15] pb-[5rem] mb-[5rem] md:pb-0 md:mb-0'}
                                      ${isSmScreen ? 'sm:border-b pb-[5rem] mb-[5rem] md:pb-0 md:mb-0' : 'sm:border-0 sm:pb-0 sm:mb-0'}`}>
                        <h3 className="text-[#ffffff66] text-normal uppercase tracking-widest text-[2.5rem]">{menu?.menuTitle}</h3>
                        {menu?.menu && menu.menu.length > 0 && (
                          <ul className="flex flex-col items-start gap-[2.75rem] list-none p-0 m-0">
                            {menu.menu.map((item, index) => {
                              const href = item?.link?.externalLink && item?.link?.url
                                ? item?.link?.url
                                : item?.link?.internalLink?.settings?.slug;

                              const isActive = pathname === href;

                              return (
                                <li key={index}
                                    className={`text-white text-[2.35rem] tracking-wide sm:text-[2rem] relative flex items-center
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

          <div className="pt-[5rem] pb-[5rem] grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
            <div className="flex items-center justify-center md:justify-start text-center md:text-start">
              <p className={`mb-0  text-[2rem] leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'}`}>{new Date().getFullYear()} Social Selling.</p>
            </div>

            <div className="flex gap-10 items-center justify-end">
              <Link className={`text-[2rem] hover:opacity-100 transition-opacity leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'}`}
                    href={''}
                    target={'_blank'}>
                <span>Privacy Policy</span>
              </Link>
              <Link className={`text-[2rem] hover:opacity-100 transition-opacity leading-none ${footerType === "main" ? 'text-[#FDFBF4] opacity-60' : 'text-[#002533] opacity-80'}`}
                    href={''}
                    target={'_blank'}>
                <span>Terms & Conditions</span>
              </Link>
            </div>
          </div>
        </div>

        <Image
          className="absolute z-0 bottom-0 translate-x-0 left-0 object-cover object-top pointer-events-none hidden md:block"
          src={footerbg}
          quality={100}
          alt=""
        />
      </div>
    </footer>
  );
}
