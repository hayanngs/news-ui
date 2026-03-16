// components/PaginaCategoria.tsx
// Componente reutilizado por todas as páginas de categoria

import Link from "next/link"
import Image from "next/image"
import { Noticia } from "@/types"
import { BADGE_CLASSE } from "@/constants"

function formatarData(iso: string) {
  const data = new Date(iso)
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
}

function Badge({ categoria }: { categoria: string }) {
  return <span className={BADGE_CLASSE[categoria] || "badge"}>{categoria}</span>
}

function CardCategoria({ noticia, destaque }: { noticia: Noticia; destaque?: boolean }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block">
      <article style={{
        background: "#fff", border: "1px solid var(--borda)",
        borderRadius: 4, overflow: "hidden",
        display: "flex", flexDirection: destaque ? "column" : "row",
        height: "100%",
      }}>
        <div style={{
          position: "relative",
          width: destaque ? "100%" : 120,
          flexShrink: 0,
          aspectRatio: destaque ? "16/9" : undefined,
          height: destaque ? undefined : 90,
          background: "#ddd",
        }}>
          {noticia.imagemUrl
            ? <Image src={noticia.imagemUrl} alt={noticia.titulo} fill style={{ objectFit: "cover", transition: "transform 0.4s" }} className="group-hover:scale-105" />
            : <div style={{ position: "absolute", inset: 0, background: "var(--azul)" }} />
          }
        </div>
        <div style={{ padding: destaque ? "14px 16px 16px" : "10px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
          <Badge categoria={noticia.categoria} /> 
          <h3 style={{
            fontFamily: "var(--fonte-titulo)", fontWeight: 600,
            fontSize: destaque ? "1.05rem" : "0.88rem",
            lineHeight: 1.35, color: "var(--texto)"
          }}
          className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.titulo}
          </h3>
          {destaque && noticia.resumo && (
            <p style={{ fontSize: 13, color: "var(--cinza-texto)", lineHeight: 1.6 }} className="line-clamp-2">
              {noticia.resumo}
            </p>
          )}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: "auto", fontSize: 12, color: "var(--cinza-medio)" }}>
            <span>{noticia.autor}</span>
            <span>·</span>
            <time>{formatarData(noticia.publicadoEm)}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

interface Props {
  titulo: string
  descricao?: string
  noticias: Noticia[]
  cor?: string
}

export function PaginaCategoria({ titulo, descricao, noticias, cor = "var(--azul)" }: Props) {
  const [principal, ...restantes] = noticias

  return (
    <>
      {/* Cabeçalho colorido */}
      <div style={{ background: cor, padding: "28px 0", marginBottom: 32 }}>
        <div className="w-portal">
          <h1 style={{ fontFamily: "var(--fonte-titulo)", fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            {titulo}
          </h1>
          {descricao && (
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{descricao}</p>
          )}
        </div>
      </div>

      <div className="w-portal" style={{ paddingBottom: 60 }}>
        {noticias.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--cinza-medio)" }}>
            <p style={{ fontSize: "1.1rem" }}>Nenhuma notícia encontrada nesta categoria.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 20 }} className="md:grid-cols-[2fr_1fr]">

            {/* Principal em destaque */}
            <div>
              {principal && <CardCategoria noticia={principal} destaque />}
            </div>

            {/* Lista lateral */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {restantes.slice(0, 4).map(n => (
                <CardCategoria key={n.id} noticia={n} />
              ))}
            </div>
          </div>
        )}

        {/* Grade de mais notícias */}
        {restantes.length > 4 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ borderBottom: `3px solid ${cor}`, paddingBottom: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cor }}>
                Mais notícias
              </span>
            </div>
            <div style={{ display: "grid", gap: 14 }} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {restantes.slice(4).map(n => (
                <CardCategoria key={n.id} noticia={n} destaque />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
