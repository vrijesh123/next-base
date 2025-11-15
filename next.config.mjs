/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.drguinwa.com",
      },
    ],
    minimumCacheTTL: 60,
  },

  compress: true,
  reactStrictMode: false,

  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      'axios',
      'framer-motion',
      'react-intersection-observer'
    ]
  },

  // Silence the turbopack warning
  turbopack: {},
};

export default nextConfig;
