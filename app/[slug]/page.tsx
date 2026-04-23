// app/[slug]/page.tsx
import {Metadata} from "next";
import {getAllCategories, getCategoryBySlug, getNewsByCategory} from "@/lib/api";
import {notFound} from "next/navigation";
import {PaginaCategoria} from "@/components/PaginaCategoria";

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  try {
    const category = await getCategoryBySlug(slug)

    return {
      // Título com nome do portal — aparece na aba e no Google
      title: `${category.name}`,
      description: category.description,

      // Palavras-chave (menos importante hoje, mas ainda válido)
      keywords: [category.name, "Goiás", "Goiânia", "notícias"],

      // Canonical — evita conteúdo duplicado se a mesma notícia
      // aparecer em múltiplas URLs
      alternates: {
        canonical: `https://diariogoiano.com.br/${category.slug}`,
      },

      // Open Graph — aparece quando compartilhado no WhatsApp, Facebook, etc.
      openGraph: {
        title: category.name,
        description: category.description,
        url: `https://diariogoiano.com.br/${category.slug}`,
        siteName: "Diário Goiano",
        locale: "pt_BR",
        type: "article",
        section: category.name,          // "Política", "Esporte", etc.
      },

      // Twitter Card — aparece quando compartilhado no Twitter/X
      twitter: {
        card: "summary_large_image",
        title: category.name,
        description: category.description
      },
    }
  } catch {
    return {title: "Notícia não encontrada"}
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategories()
    return slugs.map(category => ({slug: category.slug}))
  } catch {
    return []
  }
}

export default async function Page({params,}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let category, news
  try {
    category = await getCategoryBySlug(slug)
    news = await getNewsByCategory(category.slug)
  } catch {
    return notFound()
  }

  return <PaginaCategoria titulo={category.name} descricao={category.description} noticias={news} cor={category.color} />
}
