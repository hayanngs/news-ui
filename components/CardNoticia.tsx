// components/CardNoticia.tsx — cards corrigidos com altura controlada

import Link from "next/link"
import Image from "next/image"
import { Noticia } from "@/types"

function formatarData(iso: string) {
  const data = new Date(iso)
  const agora = new Date()
  const diffMin = Math.floor((agora.getTime() - data.getTime()) / 60000)
  if (diffMin < 60) return `Há ${diffMin} min`
  if (diffMin < 1440) return `Há ${Math.floor(diffMin / 60)}h`
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
}

const BADGE_CLASSE: Record<string, string> = {
  Política: "badge badge-politica",
  Economia: "badge badge-economia",
  Direitos: "badge badge-direitos",
  Cultura:  "badge badge-cultura",
  Saúde:    "badge badge-saude",
}

function Badge({ categoria }: { categoria: string }) {
  return <span className={BADGE_CLASSE[categoria] || "badge"}>{categoria}</span>
}

// Hero — altura FIXA de 380px, não ocupa a tela toda
export function CardHero({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{ height: "100%" }}>
      <article style={{ position: "relative", height: 380, borderRadius: 4, overflow: "hidden", background: "#1a1a2e" }}>
        {noticia.imagemUrl && (
          <Image src={noticia.imagemUrl} alt={noticia.titulo} fill
            style={{ objectFit: "cover", opacity: 0.75, transition: "transform 0.5s" }}
            className="group-hover:scale-105" priority />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
          <Badge categoria={noticia.categoria} />
          <h2 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "1.3rem", color: "#fff", lineHeight: 1.3, marginTop: 8 }}
              className="group-hover:underline decoration-white underline-offset-2">
            {noticia.titulo}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 8 }}>
            {noticia.resumo}
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 8 }}>
            {noticia.autor} · <time>{formatarData(noticia.publicadoEm)}</time>
          </p>
        </div>
      </article>
    </Link>
  )
}

// Destaque secundário — altura fixa de 122px cada (3 = 380px total)
export function CardDestaque({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{ height: "100%" }}>
      <article style={{
        display: "flex", gap: 0, background: "#fff",
        border: "1px solid var(--borda)", borderRadius: 4,
        overflow: "hidden", height: "100%", minHeight: 118,
      }}>
        {/* Imagem à esquerda */}
        <div style={{ position: "relative", width: 110, flexShrink: 0, background: "#ddd" }}>
          {noticia.imagemUrl
            ? <Image src={noticia.imagemUrl} alt={noticia.titulo} fill style={{ objectFit: "cover", transition: "transform 0.4s" }} className="group-hover:scale-105" />
            : <div style={{ position: "absolute", inset: 0, background: "var(--azul)" }} />
          }
        </div>
        {/* Texto à direita */}
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 }}>
          <Badge categoria={noticia.categoria} />
          <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.3, color: "var(--texto)" }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.titulo}
          </h3>
          <time style={{ fontSize: 11, color: "var(--cinza-medio)", marginTop: "auto" }}>
            {formatarData(noticia.publicadoEm)}
          </time>
        </div>
      </article>
    </Link>
  )
}

// Lista (com miniatura e número opcional)
export function CardLista({ noticia, index }: { noticia: Noticia; index?: number }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block">
      <article style={{ display: "flex", gap: 10, padding: "11px 0", borderBottom: "1px solid var(--borda)", alignItems: "flex-start" }}>
        {index !== undefined && (
          <span style={{ fontFamily: "var(--fonte-titulo)", fontSize: 20, fontWeight: 700, color: "var(--borda)", lineHeight: 1, flexShrink: 0, minWidth: 22, paddingTop: 2 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.35, color: "var(--texto)" }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.titulo}
          </h3>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 5 }}>
            <Badge categoria={noticia.categoria} />
            <time style={{ fontSize: 11, color: "var(--cinza-medio)" }}>{formatarData(noticia.publicadoEm)}</time>
          </div>
        </div>
        {noticia.imagemUrl && (
          <div style={{ position: "relative", width: 68, height: 52, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
            <Image src={noticia.imagemUrl} alt="" fill style={{ objectFit: "cover" }} />
          </div>
        )}
      </article>
    </Link>
  )
}

// Grid 4 colunas
export function CardGrid({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block">
      <article style={{ background: "#fff", borderRadius: 4, overflow: "hidden", border: "1px solid var(--borda)" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#ddd" }}>
          {noticia.imagemUrl
            ? <Image src={noticia.imagemUrl} alt={noticia.titulo} fill style={{ objectFit: "cover", transition: "transform 0.4s" }} className="group-hover:scale-105" />
            : <div style={{ position: "absolute", inset: 0, background: "var(--azul)" }} />
          }
        </div>
        <div style={{ padding: "10px 12px 12px" }}>
          <Badge categoria={noticia.categoria} />
          <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.35, marginTop: 6, color: "var(--texto)" }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.titulo}
          </h3>
          <time style={{ fontSize: 11, color: "var(--cinza-medio)", display: "block", marginTop: 5 }}>
            {formatarData(noticia.publicadoEm)}
          </time>
        </div>
      </article>
    </Link>
  )
}

export const CardNoticia         = CardLista
export const CardNoticiaDestaque = CardHero
export const CardNoticiaGrid     = CardGrid
