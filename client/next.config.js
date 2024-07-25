/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'k.kakaocdn.net'],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
