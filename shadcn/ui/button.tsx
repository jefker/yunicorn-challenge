import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";
import {GROQButton} from "@/sanity/lib/definitions";
import {IPageLink, resolveCTA, resolvePageLink} from "@/sanity/globals/CTA";
import Link from "next/link";
import {stegaClean} from "@sanity/client/stega";
import Anchor from "@/components/global/utils/Anchor";
import {Dialog, DialogContent, DialogTrigger} from "@/shadcn/ui/dialog";
import {customRichTextComponent, richTextComponent} from "@/sanity/sanityPortableText";
import {PortableText} from "@portabletext/react";
import SanityForm from "@/components/global/partials/SanityForm";
import {IPopup} from "@/sanity/globals/Popups";
import {Slot} from "@radix-ui/react-slot";
import Image from "next/image";


const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button-gold",
      white: "button-white",
      greyBlue: "button-grey-blue",
    },
    size: {
      default: "button-size-default",
      sm: "button-size-small",
      lg: "button-size-large",
    },
    shape: {
      square: "button-shape-square",
      round: "button-shape-round",
      pill: "button-shape-pill",
    },
    action: {
      link: "",
      popup: "",
      anchor: "",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
    shape: "round",
    action: "none",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, shape, action, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const children = props.children;
    return (
      <Comp
        className={cn("group", buttonVariants({ variant, size, className }))}
        data-type={variant}
        data-size={size}
        data-shape={shape}
        data-action={action}
        ref={ref}
        {...props}
      >
        <span className="button-cta relative z-[4] flex items-center gap-[2rem]">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data: GROQButton;
}


const iconMap = {
  none: null,
  arrowTopRight: (
    <svg width="3.125rem" height="3rem" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_924_8265)">
        <path d="M19.9825 16.5283L18.4825 16.5224L18.52 7.07994L6.02819 19.4729L4.9749 18.4113L17.4667 6.01825L8.02427 5.98077L8.03023 4.48078L20.0301 4.52842L19.9825 16.5283Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_924_8265">
          <rect width="24" height="24" fill="white" transform="none"/>
        </clipPath>
      </defs>
    </svg>
  ),
};

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, data, ...props }, ref) => {
    const cleanedData = stegaClean(data ?? {}) ?? null;

    const type = cleanedData?.type ?? "default";
    const size = cleanedData?.size ?? "default";
    const shape = cleanedData?.shape ?? "pill";

    const hasIcon = cleanedData?.cta?.icon ?? "none";
    const icon = iconMap[hasIcon as keyof typeof iconMap];

    const action = cleanedData?.cta?.action ?? null;
    const actionData = resolveCTA(cleanedData?.cta ?? null);

    const isLink = action === "link" && actionData;
    const link = isLink
      ? resolvePageLink(actionData as IPageLink | null)
      : null;

    const isAnchor = action === "anchor" && actionData;
    const anchor = isAnchor ? (actionData as string) : null;

    const isPopup = action === "popup" && actionData;
    const popup = isPopup ? (actionData as IPopup) : null;

    const renderButton = () => {
      return (
        <Button
          className="w-full relative group "
          variant={type}
          size={size}
          shape={shape}
          action={action ?? "none"}
          ref={ref}
          {...props}
        >
          <div className="button-text relative">
            <div className="button-text-initial transition-all duration-300">
              {data?.cta ? data.cta.title ?? "Please add a title" : "Please select a CTA"}
            </div>
            <div className="button-text-hover absolute top-[3rem] transition-all duration-300 pointer-events-none">
              {data?.cta ? data.cta.title ?? "Please add a title" : "Please select a CTA"}
            </div>
          </div>

          {icon && (
            <div className="button-icon relative w-[3rem] h-[3rem] [&_svg]:w-full overflow-clip">
              <div className="button-icon-initial transition-all duration-300">{icon}</div>
              <div className="button-icon-hover absolute top-[2.25rem] -left-[2.25rem] transition-all duration-300 pointer-events-none">{icon}</div>
            </div>
          )}
        </Button>
      );
    };

    return isLink && link ? (
      <Link href={`${link}`} className={cn("inline-block mx-[.75rem] w-[calc(100%-1.5rem)] min-w-[37.25rem] sm:w-auto relative z-10", className)}>
        {renderButton()}
      </Link>
    ) : isAnchor && anchor ? (
      <Anchor target={anchor} className={cn("inline-block mx-[.75rem] w-[calc(100%-1.5rem)] min-w-[37.25rem] sm:w-auto relative z-10", className)}>
        {renderButton()}
      </Anchor>
    ) : isPopup && popup && popup?.form && popup?.showForm ? (
      <Dialog>
        <div className={cn("inline-block mx-[.75rem] w-[calc(100%-1.5rem)] min-w-[37.25rem] sm:w-auto relative z-10", className)}>
          <DialogTrigger asChild>
            {renderButton()}
          </DialogTrigger>
        </div>
        <DialogContent>
          <div className="flex flex-col justify-center items-center text-center pt-[4rem] sm:pt-0">
            {popup?.content && (
              <div className="richtext prose-headings:text-[3rem] lg:prose-headings:text-[4rem] prose-p:text-[2rem] w-2/3">
                <PortableText
                  value={popup.content}
                  components={richTextComponent}
                />
              </div>
            )}
          </div>
          {popup?.form && <SanityForm formData={popup?.form} />}
        </DialogContent>
      </Dialog>
    ) : (
      renderButton()
    );
  }
);
CTAButton.displayName = "CTAButton";

export {Button, buttonVariants, CTAButton};
