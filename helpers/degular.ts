import localFont from "next/font/local";

export const degular = localFont({
  src: [
    {
      path: "../app/fonts/degular/DegularDisplay-Medium.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--degular",
});
