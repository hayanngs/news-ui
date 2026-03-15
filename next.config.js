// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domínios de onde vêm as imagens das notícias.
    // Adicione o domínio do seu storage (S3, Cloudinary, etc.)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Em produção, restrinja para o seu domínio
      },
    ],
  },
  // Variáveis de ambiente que o Next.js expõe para o servidor
  env: {
    API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
