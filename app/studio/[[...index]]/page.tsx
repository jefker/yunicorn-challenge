/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import '@/scss/studio/main.scss'

import {Studio} from './Studio'
import StudioStyle from "@/components/global/sanity/StudioStyle";
export const dynamic = 'force-static'

export {metadata} from 'next-sanity/studio/metadata'

// million-ignore
export default function StudioPage() {
  // @ts-ignore
  return (
      <div data-lenis-prevent={true}>
        <Studio />
        <StudioStyle />
      </div>
  )
}