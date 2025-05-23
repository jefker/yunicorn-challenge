'use client'

import {useEffect, useRef, Fragment} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from "next/image";
import star from "@/public/global/stars-gold-single.svg";

gsap.registerPlugin(ScrollTrigger);

type CountingItem = {
  number: number;
  text: string;
};

const formatter = new Intl.NumberFormat('de-DE');

export default function CountingNumbers({
  items,
  size = 'md',
}: {
  items: CountingItem[];
  size?: 'md' | 'lg';
}) {
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    numberRefs.current.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: items[index].number,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            el.innerText = formatter.format(Math.floor(+el.innerText));
          },
        }
      );
    });
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-[3rem]">
      {items.map((item, index) => (
        <Fragment key={index}>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <div className="relative">
              <p className={`${size === 'lg' ? 'text-[7rem] lg:text-[12rem]' : 'text-[6rem] lg:text-[8rem]'} leading-none font-display text-transparent mb-[1rem]`}>{formatter.format(item.number)}</p>
              <p ref={(el) => (numberRefs.current[index] = el)}
                 className={`${size === 'lg' ? 'text-[7rem] lg:text-[12rem]' : 'text-[6rem] lg:text-[8rem]'} absolute left-0 top-0 leading-none font-display text-[#002533] text-opacity-80 mb-[1rem]`}>{item.number}</p>
            </div>
            <p className="text-[2.25rem] text-[#002533] text-opacity-80 mb-0">{item.text}</p>
          </div>

          {index < items.length - 1 && (
            <Image className="!w-[2rem]"
                   src={star}
                   alt="" />
          )}
        </Fragment>
      ))}
    </div>
  );
}