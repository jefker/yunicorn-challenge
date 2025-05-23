"use client"

import React from "react";

interface AnchorProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
  querySelector: string;
}

const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>(
  (
    {
      querySelector,
      children,
      ...props
    }: AnchorProps,
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        onClick={() => {
          if (querySelector) {
            const el = document.querySelector(querySelector);

            if (el) {
              el.scrollIntoView({behavior: 'smooth'});
            }
          }
        }}
      >
        {children}
      </div>
    );
  }
);
Anchor.displayName = 'Anchor';
export default Anchor;
