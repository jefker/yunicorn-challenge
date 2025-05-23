import localFont from "next/font/local";

export const segoe = localFont({
  src: [
    {
      path: "../app/fonts/segoe/segoe_ui.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/segoe/segoe_ui_semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/segoe/segoe_ui_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/segoe/segoe_ui_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/fonts/segoe/segoe_ui_bold_italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--segoe",
});
