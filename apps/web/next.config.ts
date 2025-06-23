import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Since we're using Biome instead
  },
  transpilePackages: [
    '@bleu-builders/tech-challenge-ui',
    'wagmi',
    '@tanstack/react-query',
    '@wagmi/core',
    'graphql-request',
    'connectkit',
  ],
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
      },
    ],
  },
};

export default nextConfig;
