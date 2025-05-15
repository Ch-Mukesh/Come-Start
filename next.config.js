/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
        protocol: 'https',
      }
    ],
    domains: ['placehold.co', 'encrypted-tbn0.gstatic.com'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@sanity/ui', 'lucide-react', 'react-icons'],
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}

module.exports = nextConfig 