// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Adicione aqui o domínio do seu backend / storage:
      // {
      //   protocol: "https",
      //   hostname: "seu-bucket.s3.amazonaws.com",
      // },
    ],
  },
}

module.exports = nextConfig
