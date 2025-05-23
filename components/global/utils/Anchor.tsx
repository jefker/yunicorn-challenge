"use client"
import * as React from "react";

export interface AnchorProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  target?: string;
}

const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>(
  ({ target, ...props }, ref) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (target) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    return (
      <div ref={ref} {...props} onClick={onClick} />
    )
  }
)
Anchor.displayName = "Anchor"

export { Anchor }
export default Anchor;