

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com'],
  },
});
export default nextConfig;
