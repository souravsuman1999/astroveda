/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tezpqmdpkmsktzciyyyx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Allow any Supabase storage domain (for flexibility)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'vimalbhatt.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

