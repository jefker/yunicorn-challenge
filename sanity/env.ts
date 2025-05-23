export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || 'skpvSMduURYDxkPfNvqq9efYxsEu8NrIpkysqSvqFgnniwlYO6Df6SyJZ9HSNLX1w6GKxXSZYc2vOcWCWgM4TNFZKyLuJELniNDH7zECxSMCEnBobf8VghJJlCREynwruUX9ccloPAI4cIB5q5PsYXAvaIRrkIZ5C7dWWVOsMTCP3wTXchvS'

if (!token) {
  throw new Error(
    'A secret is provided but there is no `NEXT_PUBLIC_SANITY_API_READ_TOKEN` environment variable setup. '+process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ,
  )
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yt1ed4l0'

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

export const STUDIO_ORIGIN = process.env.NODE_ENV !== 'production' ? (process.env.NEXT_PUBLIC_STUDIO_ORIGIN || "/studio") : (process.env.NEXT_PUBLIC_STUDIO_ORIGIN || "/studio");
