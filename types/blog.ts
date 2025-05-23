// Blog API Types - Shared between client and server

export interface BlogArticleImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  pubDate: string; // ISO date string
  categories: string[];
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: BlogArticleImage;
  shouldIndex: boolean;
}

export interface BlogApiResponse {
  success: true;
  data: BlogArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BlogApiError {
  error: string;
}

export type BlogApiResult = BlogApiResponse | BlogApiError;

// Type guard to check if response is successful
export function isBlogApiSuccess(response: BlogApiResult): response is BlogApiResponse {
  return 'success' in response && response.success === true;
}

// Type guard to check if response is an error
export function isBlogApiError(response: BlogApiResult): response is BlogApiError {
  return 'error' in response;
}