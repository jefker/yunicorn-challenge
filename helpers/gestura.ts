import localFont from "next/font/local";

export const gestura = localFont({
  src: [
    {
      path: "../app/fonts/gestura/gestura-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/gestura/gestura-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--gestura",
});
