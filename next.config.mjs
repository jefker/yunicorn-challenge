import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
/** @type {import('next').NextConfig} */

const nextConfig = withVercelToolbar()({
  reactStrictMode: true,

  transpilePackages: [
    '@sanity/overlays',
    '@sanity/preview-kit-compat',
    '@sanity/react-loader',
    'apps-common',
    'channels',
    'visual-editing-helpers',
  ],

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    deviceSizes: [640, 768, 992, 1280, 1536, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
  }
})

export default nextConfig;
