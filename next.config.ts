import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'knight-dash-back.up.railway.app' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

export default nextConfig
