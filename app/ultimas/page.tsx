import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getUltimasNoticias } from "@/lib/api"
import { Noticia } from "@/types"
import { CardLista } from "@/components/CardNoticia"

export const metadata: Metadata = { title: "Últimas Notícias" }

const POR_PAGINA = 15

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  })
}

const BADGE_CLASSE: Record<string, string> = {
  Política: "badge badge-politica", Economia: "badge badge-economia",
  Esporte: "badge badge-esporte", Entretenimento: "badge badge-entretenimento",
  Segurança: "badge badge-seguranca", Saúde: "badge badge-saude",
  Direitos: "badge badge-direitos",
}

// Card grande horizontal — exclusivo desta página
function CardNoticiaLista({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block">
      <article style={{
        display: "flex", gap: 16, padding: "16px 0",
        borderBottom: "1px solid var(--borda)", alignItems: "flex-start"
      }}>
        <div style={{
          position: "relative", width: 180, height: 120,
          borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "#ddd"
        }}>
          {noticia.imagemUrl
            ? <Image src={noticia.imagemUrl} alt={noticia.titulo} fill
                style={{ objectFit: "cover", transition: "transform 0.4s" }}
                className="group-hover:scale-105" />
            : <div style={{ position: "absolute", inset: 0, background: "var(--azul)" }} />
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 6 }}>
            <span className={BADGE_CLASSE[noticia.categoria] || "badge"}>{noticia.categoria}</span>
          </div>
          <h2 style={{
            fontFamily: "var(--fonte-titulo)", fontWeight: 600,
            fontSize: "1rem", lineHeight: 1.35, color: "var(--texto)", marginBottom: 6
          }}
          className="group-hover:text-[var(--azul)] transition-colors line-clamp-2">
            {noticia.titulo}
          </h2>
          <p style={{ fontSize: 13, color: "var(--cinza-texto)", lineHeight: 1.5, marginBottom: 8 }}
             className="line-clamp-2 hidden sm:block">
            {noticia.resumo}
          </p>
          <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--cinza-medio)" }}>
            <span style={{ fontWeight: 600, color: "var(--cinza-texto)" }}>{noticia.autor}</span>
            <span>·</span>
            <time className="capitalize">{formatarData(noticia.publicadoEm)}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Botão de página
function BtnPagina({ pagina, atual, disabled }: { pagina: number; atual: boolean; disabled?: boolean }) {
  const base: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    minWidth: 36, height: 36, borderRadius: 4, fontSize: 14, fontWeight: 600,
    textDecoration: "none", border: "1px solid var(--borda)",
    background: atual ? "var(--azul)" : "#fff",
    color: atual ? "#fff" : "var(--texto)",
    borderColor: atual ? "var(--azul)" : "var(--borda)",
    opacity: disabled ? 0.35 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "all 0.15s",
    padding: "0 4px",
  }
  if (disabled) return <span style={base}>{pagina}</span>
  return <Link href={`/ultimas?pagina=${pagina}`} style={base}>{pagina}</Link>
}

function Paginacao({ paginaAtual, totalPaginas }: { paginaAtual: number; totalPaginas: number }) {
  const paginas: (number | "...")[] = []
  if (totalPaginas <= 7) {
    for (let i = 1; i <= totalPaginas; i++) paginas.push(i)
  } else {
    paginas.push(1)
    if (paginaAtual > 3) paginas.push("...")
    for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) paginas.push(i)
    if (paginaAtual < totalPaginas - 2) paginas.push("...")
    paginas.push(totalPaginas)
  }

  const btnNav: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 36, height: 36, borderRadius: 4,
    border: "1px solid var(--borda)", background: "#fff",
    color: "var(--texto)", textDecoration: "none", transition: "all 0.15s"
  }
  const btnNavDisabled: React.CSSProperties = { ...btnNav, opacity: 0.3, pointerEvents: "none" }

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 32, flexWrap: "wrap" }}
         aria-label="Paginação">
      {/* Anterior */}
      {paginaAtual > 1
        ? <Link href={`/ultimas?pagina=${paginaAtual - 1}`} style={btnNav} title="Anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
        : <span style={btnNavDisabled}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg></span>
      }

      {paginas.map((p, i) =>
        p === "..."
          ? <span key={`e${i}`} style={{ width: 36, textAlign: "center", color: "var(--cinza-medio)" }}>…</span>
          : <BtnPagina key={p} pagina={p as number} atual={p === paginaAtual} />
      )}

      {/* Próxima */}
      {paginaAtual < totalPaginas
        ? <Link href={`/ultimas?pagina=${paginaAtual + 1}`} style={btnNav} title="Próxima">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
        : <span style={btnNavDisabled}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg></span>
      }
    </nav>
  )
}

export default async function UltimasNoticias({
  searchParams,
}: {
  searchParams: { pagina?: string }
}) {
  const paginaAtual = Math.max(1, parseInt(searchParams.pagina || "1", 10))
  const { noticias, totalPaginas, totalElementos } = await getUltimasNoticias(paginaAtual - 1, POR_PAGINA)

  const inicio = (paginaAtual - 1) * POR_PAGINA + 1
  const fim = Math.min(paginaAtual * POR_PAGINA, totalElementos)

  return (
    <>
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">Portal Notícias</p>
          <h1>Últimas Notícias</h1>
          <p>Página {paginaAtual}</p>
        </div>
      </div>

      <div className="w-portal" style={{ paddingBottom: 60 }}>
        <div style={{ display: "grid", gap: 24, alignItems: "start" }}
             className="md:grid-cols-[1fr_280px]">

          {/* ── Lista principal ── */}
          <div>
            <div style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, padding: "0 20px" }}>
              {/* Linha azul superior */}
              <div style={{ height: 3, background: "var(--azul)", marginBottom: 0 }} />

              {noticias.length === 0
                ? <p style={{ padding: "40px 0", textAlign: "center", color: "var(--cinza-medio)" }}>Nenhuma notícia encontrada.</p>
                : noticias.map((n, i) => (
                    <div key={n.id} className="fade-up" style={{ animationDelay: `${i * 0.025}s` }}>
                      <CardNoticiaLista noticia={n} />
                    </div>
                  ))
              }
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
              <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
            )}
          </div>

          {/* ── Sidebar: Mais lidas ── */}
          <aside style={{ position: "sticky", top: 150 }}>
            <div style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                background: "var(--azul)", padding: "10px 16px",
                fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#fff"
              }}>
                Mais lidas
              </div>
              <div style={{ padding: "0 14px" }}>
                {noticias.slice(0, 5).map((n, i) => (
                  <CardLista key={n.id} noticia={n} index={i} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
