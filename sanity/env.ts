export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const useCdn = false
export const STUDIO_ORIGIN = process.env.NODE_ENV !== 'production' ? (process.env.NEXT_PUBLIC_STUDIO_ORIGIN || "/studio") : (process.env.NEXT_PUBLIC_STUDIO_ORIGIN || "/studio");


if (!token) {
  throw new Error(
    'A secret is provided but there is no `NEXT_PUBLIC_SANITY_API_READ_TOKEN` environment variable setup. '+process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ,
  )
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

