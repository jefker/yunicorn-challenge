import "./globals.scss";
import "@/scss/global/main.scss";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { Suspense } from "react";
import { StaffToolbar } from "@/components/staff-toolbar";
import { Toaster } from "@/shadcn/ui/sonner";
import favicon from "@/public/social-selling_favicon.svg";
import { cn } from "@/lib/utils";
import { figtree } from "@/helpers/figtree";
import { degular } from "@/helpers/degular";

export const metadata: Metadata = {
  title: "Lueddemann Investments",
  description: "",
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
  },
};

// million-ignore
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={cn(
          "min-h-screen bg-[#F3F4F2] antialiased relative overflow-x-clip font-sans",
          degular.variable,
          figtree.variable,
        )}
      >
        {children}
        <Suspense>
          <>
            <StaffToolbar isDraftMode={draftMode().isEnabled} />
          </>
        </Suspense>
        <Toaster />
        <div className="hidden">
          <div className="h1 hidden"></div>
          <div className="h2 hidden"></div>
          <div className="h3 hidden"></div>
          <div className="h4 hidden"></div>
          <div className="h5 hidden"></div>
          <div className="p-large hidden"></div>
          <div className="p-medium hidden"></div>
          <div className="p-normal hidden"></div>
          <div className="p-small hidden"></div>
          <div className="p-xsmall hidden"></div>
          <div className="gradient hidden"></div>
        </div>
      </body>
    </html>
  );
}
