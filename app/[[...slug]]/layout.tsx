import React, {Suspense} from "react";
import StyledJsxRegistry from "@/app/registry";
import {CSPostHogProvider} from "@/app/providers";
import {PathnameProvider} from "@/components/global/partials/HeaderContext";
import AnchorListener from "@/components/global/utils/AnchorListener";

export default function PageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledJsxRegistry>
      <CSPostHogProvider>
        <PathnameProvider>
          { children }
          <Suspense fallback={null}>
            <AnchorListener />
          </Suspense>
        </PathnameProvider>
      </CSPostHogProvider>
    </StyledJsxRegistry>
  )
}