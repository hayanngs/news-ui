// components/PaginaCategoria.tsx
import Link from "next/link"
import Image from "next/image"
import {News} from "@/types"
import {BADGE_CLASSE} from "@/constants"

function Badge({categoria}: { categoria: string }) {
  return <span className={BADGE_CLASSE[categoria] || "badge"}>{categoria}</span>
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {day: "numeric", month: "long", year: "numeric"})
}

// ── Card destaque principal ──────────────────────────────────────────
function CardDestaquePrincipal({noticia}: { noticia: News }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{height: "100%"}}>
      <article style={{
        background: "#fff", border: "1px solid var(--borda)",
        borderRadius: 4, overflow: "hidden",
        display: "flex", flexDirection: "column", height: "100%",
      }}>
        <div style={{position: "relative", aspectRatio: "16/9", background: "#ddd", overflow: "hidden", flexShrink: 0}}>
          {noticia.thumbnailUrl
            ? <Image
              src={noticia.thumbnailUrl}
              alt={noticia.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              style={{objectFit: "cover", transition: "transform 0.4s"}}
              className="group-hover:scale-105" priority/>
            : <div style={{position: "absolute", inset: 0, background: "var(--azul)"}}/>
          }
        </div>
        <div style={{padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1}}>
          <Badge categoria={noticia.category.name}/>
          <h3 style={{
            fontFamily: "var(--fonte-titulo)", fontWeight: 700,
            fontSize: "1.2rem", lineHeight: 1.35, color: "var(--texto)"
          }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.title}
          </h3>
          {noticia.summary && (
            <p style={{fontSize: 13, color: "var(--cinza-texto)", lineHeight: 1.6}}
               className="line-clamp-2">
              {noticia.summary}
            </p>
          )}
          <div style={{fontSize: 12, color: "var(--cinza-medio)", marginTop: "auto", display: "flex", gap: 6}}>
            <span>{noticia.user.name}</span>
            <span>·</span>
            <time>{formatarData(noticia.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ── Card lateral ─────────────────────────────────────────────────────
function CardLateral({noticia}: { noticia: News }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{flex: 1}}>
      <article style={{
        display: "flex", gap: 0,
        background: "#fff", border: "1px solid var(--borda)",
        borderRadius: 4, overflow: "hidden", height: "100%",
      }}>
        <div style={{
          position: "relative", flexShrink: 0,
          width: 110, overflow: "hidden", background: "#ddd",
        }}>
          {noticia.thumbnailUrl
            ? <Image
              src={noticia.thumbnailUrl}
              alt={noticia.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              style={{objectFit: "cover", transition: "transform 0.4s"}}
              className="group-hover:scale-105"/>
            : <div style={{position: "absolute", inset: 0, background: "var(--azul)"}}/>
          }
        </div>
        <div style={{
          padding: "12px 14px",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", flex: 1, minWidth: 0,
        }}>
          <Badge categoria={noticia.category.name}/>
          <h3 style={{
            fontFamily: "var(--fonte-titulo)", fontWeight: 600,
            fontSize: "0.9rem", lineHeight: 1.35, color: "var(--texto)"
          }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.title}
          </h3>
          <div style={{fontSize: 11, color: "var(--cinza-medio)", display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap"}}>
            <span>{noticia.user.name}</span>
            <span>·</span>
            <time>{formatarData(noticia.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ── Card grade "Mais Notícias" ────────────────────────────────────────
function CardGrade({noticia}: { noticia: News }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{height: "100%"}}>
      <article style={{
        background: "#fff", border: "1px solid var(--borda)",
        borderRadius: 4, overflow: "hidden",
        display: "flex", flexDirection: "column", height: "100%",
      }}>
        <div style={{position: "relative", aspectRatio: "16/9", background: "#ddd", overflow: "hidden", flexShrink: 0}}>
          {noticia.thumbnailUrl
            ? <Image
              src={noticia.thumbnailUrl}
              alt={noticia.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              style={{objectFit: "cover", transition: "transform 0.4s"}}
              className="group-hover:scale-105"/>
            : <div style={{position: "absolute", inset: 0, background: "var(--azul)"}}/>
          }
        </div>
        <div style={{padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1}}>
          <Badge categoria={noticia.category.name}/>
          <h3 style={{
            fontFamily: "var(--fonte-titulo)", fontWeight: 600,
            fontSize: "0.92rem", lineHeight: 1.35, color: "var(--texto)", flex: 1
          }}
              className="group-hover:text-[var(--azul)] transition-colors line-clamp-3">
            {noticia.title}
          </h3>
          {noticia.summary && (
            <p style={{fontSize: 12, color: "var(--cinza-texto)", lineHeight: 1.5}}
               className="line-clamp-2">
              {noticia.summary}
            </p>
          )}
          <div style={{fontSize: 11, color: "var(--cinza-medio)", display: "flex", gap: 5, marginTop: "auto"}}>
            <span>{noticia.user.name}</span>
            <span>·</span>
            <time>{formatarData(noticia.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

interface Props {
  titulo: string
  descricao?: string
  noticias: News[]
  cor?: string
}

export function PaginaCategoria({titulo, descricao, noticias, cor = "var(--azul)"}: Props) {
  const [principal, ...restantes] = noticias

  return (
    <>
      <div style={{background: cor, padding: "28px 0", marginBottom: 32}}>
        <div className="w-portal">
          <h1 style={{fontFamily: "var(--fonte-titulo)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: 4}}>
            {titulo}
          </h1>
          {descricao && (
            <p style={{fontSize: 14, color: "rgba(255,255,255,0.75)"}}>{descricao}</p>
          )}
        </div>
      </div>

      <div className="w-portal" style={{paddingBottom: 60}}>
        {noticias.length === 0 ? (
          <div style={{textAlign: "center", padding: "60px 0", color: "var(--cinza-medio)"}}>
            <p style={{fontSize: "1.1rem"}}>Nenhuma notícia encontrada nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[68%_31%] gap-3" style={{alignItems: "stretch"}}>
            <CardDestaquePrincipal noticia={principal}/>

            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
              {restantes.slice(0, 4).map(n => (
                <CardLateral key={n.id} noticia={n}/>
              ))}
            </div>
          </div>
        )}

        {restantes.length > 4 && (
          <div style={{marginTop: 32}}>
            <div style={{borderBottom: `3px solid ${cor}`, paddingBottom: 8, marginBottom: 16}}>
              <span style={{fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cor}}>
                Mais notícias
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" style={{gridAutoRows: "1fr"}}>
              {restantes.slice(4).map(n => (
                <CardGrade key={n.id} noticia={n}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
