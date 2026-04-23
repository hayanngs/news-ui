// components/JsonLdNoticia.tsx
// Dados estruturados — fazem o Google entender que é uma notícia
// e podem gerar rich results (resultado rico) na busca

interface Props {
  title: string
  summary: string
  thumbnailUrl?: string
  author: string
  publishedAt: string
  slug: string
}

export function JsonLdNews({ title, summary, thumbnailUrl, author, publishedAt, slug }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",                           // tipo: artigo de notícia
    "headline": title,                               // título (máx 110 chars recomendado)
    "description": summary,
    "image": thumbnailUrl ? [thumbnailUrl] : [],
    "datePublished": publishedAt,                     // ISO 8601
    "dateModified": publishedAt,
    "author": {
      "@type": "Person",
      "name": author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Diário Goiano",
      "logo": {
        "@type": "ImageObject",
        "url": "https://diariogoiano.com.br/logo.png", // logo do portal
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://diariogoiano.com.br/noticias/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
