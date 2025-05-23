import { createClient, RawQueryResponse } from 'next-sanity'

import {apiVersion, dataset, projectId, STUDIO_ORIGIN, token, useCdn} from '../env'

// @ts-ignore
export type QueryParams = {[key: string]: Any}

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  encodeSourceMap: true,
  resultSourceMap: true,
  studioUrl: STUDIO_ORIGIN,
})

export const prodClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  encodeSourceMap: false,
  resultSourceMap: false,
  studioUrl: STUDIO_ORIGIN,
})

export async function sanityFetch<QueryResponse>({
                                                   query,
                                                   params = DEFAULT_PARAMS,
                                                   tags = DEFAULT_TAGS,
                                                   isDraftMode = false,
                                                   sourceMap = true,
                                                 }: {
  query: string
  params?: QueryParams
  tags?: string[],
  isDraftMode?: boolean,
  sourceMap?: boolean
}): Promise<RawQueryResponse<QueryResponse>> {
  if (isDraftMode && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.')
  }

  return (isDraftMode ? client : prodClient).fetch<QueryResponse>(query, params, {
    ...(isDraftMode && {
      token: token,
      perspective: 'previewDrafts',
    }),
    resultSourceMap: sourceMap,
    next: {
      revalidate: isDraftMode ? 0 : 20,
      tags,
    },
    filterResponse: false
  })
}