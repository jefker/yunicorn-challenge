import localFont from "next/font/local";

export const figtree = localFont({
  src: [
    {
      path: "../app/fonts/figtree/Figtree-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/figtree/Figtree-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/fonts/figtree/Figtree-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/figtree/Figtree-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../app/fonts/figtree/Figtree-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/figtree/Figtree-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../app/fonts/figtree/Figtree-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/figtree/Figtree-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--figtree",
});
