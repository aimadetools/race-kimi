/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  cleanDistDir: true,
  images: {
    unoptimized: true
  },
  trailingSlash: false
}

module.exports = nextConfig
