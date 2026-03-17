// app/noticias/[slug]/page.tsx
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getNoticia, getTodosOsslugs, getUltimasNoticias } from "@/lib/api"
import { BotoesCompartilhar } from "@/components/BotoesCompartilhar"
import { BADGE_CLASSE } from "@/constants"

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const n = await getNoticia(params.slug)
    return { title: n.titulo, description: n.resumo, openGraph: { title: n.titulo, description: n.resumo, images: n.imagemUrl ? [n.imagemUrl] : [] } }
  } catch { return { title: "Notícia não encontrada" } }
}

export async function generateStaticParams() {
  const slugs = await getTodosOsslugs()
  return slugs.slice(0, 50).map(slug => ({ slug }))
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
  })
}

export default async function PaginaNoticia({ params }: Props) {
  let noticia
  try { 
    noticia = await getNoticia(params.slug) 
  } catch { 
    notFound() 
  }

  const { noticias: relacionadas } = await getUltimasNoticias(0, 4)
  const leiaTambem = relacionadas.filter(n => n.slug !== params.slug).slice(0, 3)

  return (
    <div style={{ background: "var(--fundo)", minHeight: "100vh" }}>
      <div className="w-portal" style={{ paddingTop: 24, paddingBottom: 60 }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--cinza-medio)", marginBottom: 24, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--azul)", textDecoration: "none" }}>Home</Link>
          {noticia.href ? (
            <>
              <span>/</span>
              <Link href={noticia.href} style={{ color: "var(--cinza-texto)", textDecoration: "none" }}>
                {noticia.categoria}
              </Link>
            </>
          ) : null}
          <span>/</span>
          <span className="line-clamp-1" style={{ color: "var(--cinza-medio)" }}>{noticia.titulo}</span>
        </nav>

        <div style={{ display: "grid", gap: 32, alignItems: "start" }} className="md:grid-cols-[1fr_300px]">

          {/* ── ARTIGO ── */}
          <article style={{ background: "#fff", borderRadius: 4, border: "1px solid var(--borda)", overflow: "hidden" }}>

            {/* Cabeçalho do artigo */}
            <div style={{ padding: "28px 32px 24px" }}>
              <span className={BADGE_CLASSE[noticia.categoria] || "badge"} style={{ marginBottom: 14, display: "inline-block" }}>
                {noticia.categoria}
              </span>

              <h1 style={{ fontFamily: "var(--fonte-titulo)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.25, color: "var(--texto)", marginBottom: 16 }}>
                {noticia.titulo}
              </h1>

              <p style={{ fontSize: "1.1rem", color: "var(--cinza-texto)", lineHeight: 1.7, borderLeft: "3px solid var(--azul)", paddingLeft: 14, marginBottom: 20, fontStyle: "italic" }}>
                {noticia.resumo}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--borda)", fontSize: 13, color: "var(--cinza-texto)" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--azul)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {noticia.autor.charAt(0)}
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--texto)" }}>{noticia.autor}</span>
                  <span style={{ margin: "0 8px", color: "var(--borda)" }}>·</span>
                  <time className="capitalize">{formatarData(noticia.publicadoEm)}</time>
                </div>
              </div>
            </div>

            {/* Imagem — dentro do card, antes do conteúdo */}
            {noticia.imagemUrl && (
              <div style={{ position: "relative", aspectRatio: "16/9", background: "#ddd" }}>
                <Image src={noticia.imagemUrl} alt={noticia.titulo} fill style={{ objectFit: "cover" }} priority />
              </div>
            )}

            {/* Conteúdo */}
            <div style={{ padding: "28px 32px" }}>
              <div className="conteudo-noticia"
                   dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
              <BotoesCompartilhar titulo={noticia.titulo} />
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside style={{ position: "sticky", top: 150 }}>
            <div style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: "var(--azul)", padding: "10px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>
                Leia também
              </div>
              <div style={{ padding: "0 14px" }}>
                {leiaTambem.map(n => (
                  <Link key={n.id} href={`/noticias/${n.slug}`} className="group block">
                    <div style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--borda)", alignItems: "flex-start" }}>
                      {n.imagemUrl && (
                        <div style={{ position: "relative", width: 64, height: 48, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
                          <Image src={n.imagemUrl} alt="" fill style={{ objectFit: "cover" }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--azul)", letterSpacing: "0.05em" }}>{n.categoria}</span>
                        <p style={{ fontFamily: "var(--fonte-titulo)", fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.3, marginTop: 3, color: "var(--texto)" }}
                           className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
                          {n.titulo}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
