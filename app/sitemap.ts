// app/sitemap.ts
// O Next.js gera automaticamente o /sitemap.xml a partir deste arquivo
// O Google usa o sitemap para descobrir e indexar todas as páginas

import { MetadataRoute } from "next"
import { getAllSlugsNews } from "@/lib/api"

const BASE_URL = "https://diariogoiano.com.br"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas — sempre presentes
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",   // home muda com frequência
      priority: 1.0,               // página mais importante
    },
    {
      url: `${BASE_URL}/ultimas`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/politica`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/economia`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/esporte`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/entretenimento`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seguranca`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/pessoas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    },
  ]

  // Páginas dinâmicas — uma entrada por notícia publicada
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllSlugsNews()
    newsPages = slugs.map(slug => ({
      url: `${BASE_URL}/noticias/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  } catch {
    // Backend offline durante o build — sitemap fica só com páginas estáticas
  }

  return [...staticPages, ...newsPages]
}
