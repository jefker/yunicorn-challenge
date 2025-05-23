import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import React from "react";

const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], preload: true})
export const metadata: Metadata = {
  title: 'Lueddemann Investments',
  description: '',
  // icons: {
  //   icon: favicon.src,
  //   shortcut: favicon.src,
  // },
  robots: 'noindex, nofollow'
}

// million-ignore
export default function StudioLayout({
                                       children, params
                                     }: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
