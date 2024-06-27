/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  publicRuntimeConfig: {
    baseImageUrl: '/images',
  },
  transpilePackages: ['antd'],
};

module.exports = nextConfig;
