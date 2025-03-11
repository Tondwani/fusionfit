import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      loaders: {}
    }
  },
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  }
}

export default nextConfig
