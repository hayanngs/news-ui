// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "media.diariogoiano.com.br"
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'diariogoiano.com.br' }],
        destination: 'https://www.diariogoiano.com.br/:path*',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
