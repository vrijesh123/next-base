/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.drguinwa.com'],
    minimumCacheTTL: 60, // Cache images for 60 seconds
  },
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  // Compress bundles
  compress: true,
  // Enable React strict mode
  reactStrictMode: false,
  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      'axios',
      'framer-motion',
      'react-intersection-observer'
    ],
    // Enable modularize imports (if using many icons from same library)
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
  },
  // Webpack optimizations
  webpack: (config) => {
    // Add your custom webpack configurations here
    return config;
  },
};

export default nextConfig;