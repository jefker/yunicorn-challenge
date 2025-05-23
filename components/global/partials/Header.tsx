"use client"

import React, {forwardRef, Fragment, HTMLAttributes, SVGProps, useEffect, useRef, useState} from "react";
import {IHeader} from "@/sanity/lib/definitions";
import {cn} from "@/lib/utils";
import {IPageLink, resolvePageLink} from "@/sanity/globals/CTA";
import {useResizeMemo} from "@/helpers/utilFunctions";
import {createPortal} from "react-dom";
import {useGlobalPathname} from "@/components/global/partials/HeaderContext";
import {usePathname} from "next/navigation";
import {Tooltip, TooltipCustomContent, TooltipProvider, TooltipTrigger} from "@/shadcn/ui/tooltip";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/shadcn/ui/collapsible";
import {padStart} from "lodash";
import Image from "@/helpers/Image";
import Link from "next/link";

import dropdownLight from "@/public/global/dropdown-light.svg";
import dropdownDark from "@/public/global/dropdown-dark.svg";
import HeaderLogoLight from "@/public/global/logo-white-gradient.svg"
import HeaderLogoDark from "@/public/global/logo-dark2.svg"

const IconMobileMenuClosed = () => (
  <svg width="41" height="10" viewBox="0 0 41 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="0.327602" width="39" height="2.5" fill="#A38753"/>
    <rect x="13" y="6.8276" width="28" height="2.5" fill="#A38753"/>
  </svg>
);

const IconMobileMenuOpen = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.432617" y="19.8432" width="28" height="2.5" transform="rotate(-45 0.432617 19.8432)" fill="#A38753"/>
    <rect x="2.2002" y="0.0442238" width="28" height="2.5" transform="rotate(45 2.2002 0.0442238)" fill="#A38753"/>
  </svg>
);


const TooltipLink = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div
    className={cn("cursor-pointer select-none group", className)}
    ref={ref}
    {...props}
  />
))
TooltipLink.displayName = "TooltipLink"

function MenuItemPopover(
  {
    item,
    currentPath,
    style
  }: {
    item: {
      title: string;
      subItems?: {
        title: string;
        link: IPageLink;
      }[];
    };
    currentPath: string;
    style?: "dark" | "light";
  }) {
  const pathname = usePathname();

  return (
    <>
      {item.subItems?.map((subItem, index) => {
        const link = resolvePageLink(subItem?.link) ?? '/';
        const isActive = pathname === link;
        return (
          <Fragment key={index}>
            <Link
              href={link}
              target={subItem.link.externalLink ? "_blank" : "_self"}
              className={`text-[2rem] leading-none px-4 py-5 transition-all duration-150 rounded-[.25rem]
                ${style === "dark" ? "text-[#172329] bg-[#F3F4F2] bg-opacity-0 hover:bg-opacity-70" : "text-white bg-white bg-opacity-0 hover:bg-opacity-5"} 
                ${isActive ? "opacity-100 bg-opacity-5" : "opacity-80 hover:opacity-100"} 
              `}
            >
              {subItem.title}
            </Link>
          </Fragment>
        )
      })}
    </>
  )
}

function MenuItem(
  {
    item,
    style,
  }: {
    item: {
      title: string;
      isCategory: boolean;
      subItems?:{
        title: string;
        link: IPageLink;
      }[];
      link?: IPageLink;
    };
    style?: "dark" | "light";
  }
) {
  const pathnames = useGlobalPathname();
  const link = resolvePageLink(item.link ?? null) ?? "/";
  const isActive = pathnames.currentPathname === link && !item.isCategory;
  const LinkWrapper = item.isCategory ? TooltipLink : Link;

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={60}>
      <Tooltip>
        <TooltipTrigger asChild>
          <LinkWrapper
            href={link}
            className={`px-8 text-[2rem] leading-none inline-flex items-center transition-opacity ${style === "dark" ? "text-[#172329]" : "text-white"} ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"} data-[state=delayed-open]:opacity-100`}
          >
            <>
              {item.title}

              {item.isCategory && (
                <Image
                  className={`ml-3 !w-[1.25rem] group-data-[state=delayed-open]:rotate-180 ${isActive ? "opacity-100" : "opacity-80"}`}
                  src={style === "dark" ? dropdownDark : dropdownLight}
                  alt=""
                />
              )}
            </>
          </LinkWrapper>

        </TooltipTrigger>
        {item?.isCategory && item?.subItems && item.subItems?.length > 0 && (
          <TooltipCustomContent
            className={`mt-2 ml-[2rem] relative flex flex-col items-stretch justify-start gap-[.75rem] p-[.75rem] rounded-[.25rem] border ${style === "dark" ? "border-[#CFD6D3] bg-white" : "border-white/5 bg-[#172329]"}`}
            align="start"
            sideOffset={0}
          >
            <MenuItemPopover item={item} currentPath={pathnames.currentPathname} style={style} />
          </TooltipCustomContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Header({
  data,
  headerType,
  style,
}: {
  data: IHeader;
  headerType?: "main" | "lp";
  style?: "dark" | "light";
}) {
  const pathnames = useGlobalPathname();
  const menuItemsContainer = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuContainer, setMobileMenuContainer] = useState<HTMLElement | null>(null);

  const menuItemsContainerPosition = useResizeMemo(() => {
    if (menuItemsContainer.current) {
      const rect = menuItemsContainer.current.getBoundingClientRect()
      return {
        left: rect.left,
        width: rect.width
      }
    }
    return null
  }, [], 20)

  useEffect(() => {
    setIsMounted(true)
    if (typeof document !== 'undefined') {
      const portal = document.createElement('div')
      portal.id = 'mobile-menu'
      portal.style.position = 'fixed'
      portal.style.top = '0'
      portal.style.left = '0'
      portal.style.width = '100%'
      portal.style.height = '100%'
      portal.style.zIndex = '100'
      portal.style.transform = 'translateX(100%)'
      document.body.appendChild(portal)
      setMobileMenuContainer(portal)
    }

    return () => {
      setIsMounted(false)
      const portal = document.getElementById('mobile-menu')
      if (portal) {
        portal.remove()
      }
      setMobileMenuContainer(null)
    }
  }, []);

  if (!data) {
    return null;
  }
  return (
    <header className="absolute top-[4rem] lg:top-[5rem] left-0 w-full z-50">
      <div className={`container flex ${headerType === "main" ? 'justify-between' : 'justify-center'} `}>
        <div className="flex">
          {style === 'dark' ? (
            <Link href="/">
              <Image className="!w-[20.5rem] lg:!w-[22.25rem]"
                     src={HeaderLogoDark}
                     alt="Header Logo" />
            </Link>
          ) : (
            <Link href="/">
              <Image className="!w-[20.5rem] lg:!w-[22.25rem]"
                     src={HeaderLogoLight}
                     alt="Header Logo" />
            </Link>
          )}
        </div>

        {headerType === "main" && (
          <>
            <div className="hidden lg:flex relative"
                 ref={menuItemsContainer}>
              {data.menu && data.menu.map((item, index) => (
                <MenuItem item={item}
                          key={index}
                          style={style}/>
              ))}
            </div>

            <button
              className="!w-[5.125rem] lg:hidden [&_svg]:!w-full"
              onClick={() => {
                setIsMobileMenuOpen(true)
              }}
            >
              <IconMobileMenuClosed/>
            </button>
          </>
        )}
      </div>

      {mobileMenuContainer && createPortal(<>
        <div className={`fixed lg:hidden z-[80] w-full h-full transition-all duration-500 ease-out bg-[#172329] ${isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className="container flex flex-row justify-between items-center mb-[6rem] pt-[4rem]">
            <Image src={HeaderLogoLight}
                   alt="Header Logo"
                   className="flex-shrink-0 !w-[20.5rem] lg:!w-[22.25rem]"/>

            <button
              className="!w-[2.75rem] [&_svg]:!w-full"
              onClick={() => {
                setIsMobileMenuOpen(false)
              }}
            >
              <IconMobileMenuOpen/>
            </button>
          </div>

          <div className="flex flex-col items-stretch justify-start px-8">
            {data.menu && data.menu.map((item, index) => {
              const link = resolvePageLink(item.link ?? null) ?? "/";
              const isActive = pathnames.currentPathname === link;
              const isCategoryActive = item.isCategory && item.subItems?.some(subItem => {
                const subLink = resolvePageLink(subItem?.link) ?? '/';
                return pathnames.currentPathname === subLink;
              })
              const LinkWrapper = item.isCategory ? TooltipLink : Link;
              const isLastItem = index === data.menu.length - 1;

              return (
                <>
                  {item.isCategory ? (
                    <Collapsible className="group w-full" defaultOpen={isCategoryActive && item?.isCategory && item?.subItems && item?.subItems?.length > 0}>
                      <CollapsibleTrigger asChild>
                        <LinkWrapper href={link}
                                     className={`w-full py-[3rem] text-[3rem] leading-none flex justify-between items-center border-b border-[#CFD6D3] border-opacity-[.15] last:border-0 group-data-[state=open]:border-opacity-0 ${isLastItem ? 'border-opacity-0' : ''}`}>
                          <>
                            <div className="block">
                              <span className="text-highlight-light font-display italic mr-[1rem]">
                                {padStart((index + 1).toString(), 2, '0')}.
                              </span>
                              <span className="text-white">{item.title}</span>
                            </div>

                            {item.isCategory && (
                              <Image
                                className={`ml-[1rem] !w-[1.5rem] group-data-[state=open]:rotate-180 ${isActive ? "opacity-100" : "opacity-80"}`}
                                src={dropdownLight}
                                alt=""
                              />
                            )}
                          </>
                        </LinkWrapper>
                      </CollapsibleTrigger>

                      {item?.isCategory && item?.subItems && item.subItems?.length > 0 && (
                        <CollapsibleContent className="relative w-full">
                          <div className="flex flex-col items-stretch justify-start gap-[2.75rem] pt-[.25rem]">
                            {item.subItems?.map((subItem, index) => {
                              const link = resolvePageLink(subItem?.link) ?? '/';
                              const isActive = pathnames.currentPathname === link;
                              const isLastSubmenuItem = index === (item.subItems?.length ?? 0) - 1;
                              return (
                                <Link key={index} href={link}
                                      className={`text-[2.75rem] text-white ps-[6rem] ${isLastSubmenuItem && !isLastItem ? 'border-b border-[#CFD6D3] border-opacity-[.15] pb-[3rem]' : ''}`}>
                                  {subItem.title}
                                </Link>
                              )
                            })}
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <Link key={index}
                          className={`w-full py-[3rem] text-[3rem] leading-none flex justify-between items-center border-b border-[#CFD6D3] border-opacity-[.15] last:border-0 group-data-[state=open]:border-0`}
                          href={link ?? "/"}
                          target={item.link?.externalLink ? '_blank' : '_self'}>
                      <div className="block">
                        <span className="text-highlight-light font-display italic mr-[1rem]">
                          {padStart((index + 1).toString(), 2, '0')}.
                        </span>
                        <span className="text-white">{item.title}</span>
                      </div>
                    </Link>
                  )}
                </>
              )
            })}
          </div>
        </div>
      </>, mobileMenuContainer, "mobile-menu")}
    </header>
  )
}