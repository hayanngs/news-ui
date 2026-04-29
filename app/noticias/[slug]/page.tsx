// app/noticias/[slug]/page.tsx
import {Metadata} from "next"
import {notFound} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {getNewsBySlug, getAllSlugsNews, getLastNews} from "@/lib/api"
import {BotoesCompartilhar} from "@/components/BotoesCompartilhar"
import {BADGE_CLASSE} from "@/constants"
import {News} from "@/types";
import {JsonLdNews} from "@/components/JsonLdNews";
import {CardLista} from "@/components/CardNoticia";
import React from "react";
import {PillList} from "@/components/PillList";

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  try {
    const news = await getNewsBySlug(slug)

    return {
      // Título com nome do portal — aparece na aba e no Google
      title: `${news.title}`,
      description: news.summary,

      // Palavras-chave (menos importante hoje, mas ainda válido)
      keywords: [news.category.name, "Goiás", "Goiânia", "notícias"],

      // Canonical — evita conteúdo duplicado se a mesma notícia
      // aparecer em múltiplas URLs
      alternates: {
        canonical: `https://diariogoiano.com.br/noticias/${news.slug}`,
      },

      // Open Graph — aparece quando compartilhado no WhatsApp, Facebook, etc.
      openGraph: {
        title: news.title,
        description: news.summary,
        url: `https://diariogoiano.com.br/noticias/${news.slug}`,
        siteName: "Diário Goiano",
        locale: "pt_BR",
        type: "article",
        publishedTime: news.publishedAt,      // data de publicação
        authors: [news.user.name],
        section: news.category.name,          // "Política", "Esporte", etc.
        images: news.thumbnailUrl ? [{
          url: news.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        }] : [],
      },

      // Twitter Card — aparece quando compartilhado no Twitter/X
      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: news.summary,
        images: news.thumbnailUrl ? [news.thumbnailUrl] : [],
      },
    }
  } catch {
    return {title: "Notícia não encontrada"}
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugsNews()
    return slugs.map(slug => ({slug}))
  } catch {
    return []
  }
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Define formato 24h
  }).replace(',', '');
}

export default async function PaginaNoticia({params}: Props) {
  const {slug} = await params

  let noticia
  try {
    noticia = await getNewsBySlug(slug)
  } catch {
    notFound()
  }

  let leiaTambem: News[] = []
  try {
    const {noticias: relacionadas} = await getLastNews(0, 4)
    if (Array.isArray(relacionadas)) {
      leiaTambem = relacionadas.filter((n: News) => n.slug !== slug).slice(0, 3)
    }
  } catch {
    leiaTambem = []
  }

  return (
    <div style={{background: "var(--fundo)", minHeight: "100vh"}}>
      <div className="w-portal" style={{paddingTop: 24, paddingBottom: 60}}>

        {/* Breadcrumb */}
        <nav style={{display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--cinza-medio)", marginBottom: 24, flexWrap: "wrap"}}>
          <Link href="/" style={{color: "var(--azul)", textDecoration: "none"}}>Home</Link>
          {noticia.category.slug ? (
            <>
              <span>/</span>
              <Link href={`/${noticia.category.slug}`} style={{color: "var(--cinza-texto)", textDecoration: "none"}}>
                {noticia.category.name}
              </Link>
            </>
          ) : null}
          <span>/</span>
          <span className="line-clamp-1" style={{color: "var(--cinza-medio)"}}>{noticia.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8" style={{alignItems: "start"}}>

          {/* ── ARTIGO ── */}
          <article style={{background: "#fff", borderRadius: 4, border: "1px solid var(--borda)", overflow: "hidden"}}>

            {/* Cabeçalho do artigo */}
            <div className="p-5 sm:p-7 pb-5 sm:pb-6">
              <span className={BADGE_CLASSE[noticia.category.name] || "badge"} style={{marginBottom: 14, display: "inline-block"}}>
                {noticia.category.name}
              </span>

              <h1 style={{fontFamily: "var(--fonte-titulo)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.25, color: "var(--texto)", marginBottom: 16}}>
                {noticia.title}
              </h1>

              <p style={{fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--cinza-texto)", lineHeight: 1.7, borderLeft: "3px solid var(--azul)", paddingLeft: 14, marginBottom: 20, fontStyle: "italic"}}>
                {noticia.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4" style={{borderTop: "1px solid var(--borda)", fontSize: 13, color: "var(--cinza-texto)"}}>
                <div style={{width: 45, height: 45, borderRadius: "50%", background: "var(--azul)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0, overflow: "hidden", border: "2px solid var(--azul)"}}>
                  {noticia.user.photoUrl ? (
                    <img src={noticia.user.photoUrl} alt={noticia.user.name} style={{width: "100%", height: "100%", objectFit: "cover", flexShrink: 0}} />
                  ) : noticia.user.name.charAt(0)}
                </div>
                <div>
                  <span style={{fontWeight: 600, color: "var(--texto)"}}>{noticia.user.name}</span>
                  <span className="hidden sm:inline" style={{margin: "0 8px", color: "var(--borda)"}}>·</span>
                  <br className="sm:hidden"/>
                  <div>
                    <span className="hidden sm:inline" style={{marginRight: "8px"}}>
                      Publicado em:
                    </span>
                    <time dateTime={noticia.publishedAt} style={{fontSize: 12}}>{formatarData(noticia.publishedAt)}</time>
                  </div>
                  <div>
                    <span className="hidden sm:inline" style={{marginRight: "8px"}}>
                      Última atualização:
                    </span>
                    <time dateTime={noticia.updatedAt} style={{fontSize: 12}}>{formatarData(noticia.updatedAt)}</time>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem — dentro do card, antes do conteúdo */}
            {noticia.thumbnailUrl && (
              <figure style={{margin: 0}}>
                <div style={{position: "relative", aspectRatio: "16/9", background: "#ddd"}}>
                  <Image
                    src={noticia.thumbnailUrl}
                    alt={noticia.thumbnailCaption || noticia.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    style={{objectFit: "cover"}}
                    priority
                  />
                </div>
                {noticia.thumbnailCaption && (
                  <figcaption style={{
                    fontSize: 12,
                    color: "var(--cinza-texto)",
                    padding: "6px 28px",
                    borderTop: "1px solid var(--borda)",
                    background: "#fafafa",
                    fontStyle: "italic",
                  }}>
                    {noticia.thumbnailCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Conteúdo */}
            <div className="p-5 sm:p-7">
              <div className="conteudo-noticia"
                   dangerouslySetInnerHTML={{__html: noticia.content}}/>
              <PillList titulo="CATEGORIAS" items={noticia.category} buildHref={item => `/${item.slug}`}/>
              <PillList titulo="TAGS" items={noticia.tags} buildHref={item => `/tag/${item.slug}`}/>
              <BotoesCompartilhar titulo={noticia.title}/>
            </div>

            {/* JsonLD */}
            <JsonLdNews
              title={noticia.title}
              summary={noticia.summary}
              author={noticia.user.name}
              publishedAt={noticia.publishedAt}
              slug={noticia.slug}
              thumbnailUrl={noticia.thumbnailUrl}/>
          </article>

          {/* ── Sidebar: Leia também ── */}
          {leiaTambem.length > 0 && (
            <aside className="md:sticky md:top-[150px]">
              <div style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden"}}>
                <div style={{background: "var(--azul)", padding: "10px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff"}}>
                  Leia também
                </div>
                <div style={{padding: "0 14px"}}>
                  {leiaTambem.map((news: News) => (
                    <CardLista key={news.id} noticia={news} />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
