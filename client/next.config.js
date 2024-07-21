/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["encrypted-tbn0.gstatic.com"]
  }
});
