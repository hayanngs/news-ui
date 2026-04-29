// app/robots.ts
// Gera automaticamente o /robots.txt
// Diz para os robôs o que podem e não podem indexar

import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",         // aplica para todos os robôs
        allow: "/",             // permite indexar tudo
        disallow: [
          "/admin",             // bloqueia o painel admin
          "/admin/*",
          "/api/*",             // bloqueia endpoints da API
        ],
      },
    ],
    sitemap: "https://www.diariogoiano.com.br/sitemap.xml",
  }
}
