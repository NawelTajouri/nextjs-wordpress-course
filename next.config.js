/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.dev',
        pathname: '/folder/project-name.com/**',
      },
    ],
  },
};

module.exports = nextConfig;