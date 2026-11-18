/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wubik.dev',
        pathname: '/s02/hotdang-course.com/**',
      },
    ],
  },
};

module.exports = nextConfig;