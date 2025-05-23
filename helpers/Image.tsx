"use client"
import { ImageProps } from "next/image"
import {forwardRef} from "react";
import NextImage from "next/image"
import {GROQImageLoader} from "@/sanity/lib/definitions";

export const GroqImage = (props: ImageProps) => {
  return <Image {...props} loader={GROQImageLoader} />
}


// eslint-disable-next-line react/display-name
export const Image = forwardRef<HTMLImageElement | null, ImageProps>(
  (props, ref) => {
    const setWidth = (width: number) => {
      if (props.style && props.style.width === undefined) {
        props.style.width = `${width}rem`
        props.style.height = 'auto'
      }else if (props.style === undefined) {
        props = {...props, style: {width: `${width}rem`, height: 'auto'} }
      }
    }

    if (props?.width) {
      const w = props.width;
      let width = 0;
      if (typeof w === "string") {
        width = parseInt(w);
      } else {
        width = w;
      }
      const rem = width / 8;

      setWidth(rem);
    // @ts-ignore
    }else if(props.src && props.src.width) {
      // @ts-ignore
      const width = props.src.width;
      const rem = width / 8;
      setWidth(rem);
    }
    return <NextImage {...props} ref={ref} />;
  });
export default Image;