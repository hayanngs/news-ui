// app/page.tsx
import { getUltimasNoticias, getNoticiasPorCategoria, getNoticiasDestaque } from "@/lib/api"
import { CardLista, CardGrid, CardHero } from "@/components/CardNoticia"
import Link from "next/link"
import Image from "next/image"
import { Noticia } from "@/types"
import { BADGE_CLASSE } from "@/constants"

function CardDestaqueSec({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{ flex: 1, minWidth: 0 }}>
      <article style={{ position: "relative", height: 185, borderRadius: 4, overflow: "hidden", background: "#1a1a2e" }}>
        {noticia.imagemUrl && (
          <Image src={noticia.imagemUrl} alt={noticia.titulo} fill
            style={{ objectFit: "cover", opacity: 0.72, transition: "transform 0.5s" }}
            className="group-hover:scale-105" />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px" }}>
          <span className={BADGE_CLASSE[noticia.categoria] || "badge"} style={{ marginBottom: 6, display: "inline-block" }}>
            {noticia.categoria}
          </span>
          <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "0.9rem", color: "#fff", lineHeight: 1.3 }}
              className="group-hover:underline decoration-white underline-offset-2 line-clamp-3">
            {noticia.titulo}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 5 }}>
            {noticia.autor} · <time>{new Date(noticia.publicadoEm).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}</time>
          </p>
        </div>
      </article>
    </Link>
  )
}

function TituloSecao({ label, href, cor = "var(--azul)" }: { label: string; href?: string; cor?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `3px solid ${cor}`, paddingBottom: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cor }}>{label}</span>
      {href && (
        <Link href={href} style={{ fontSize: 12, color: cor, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, opacity: 0.8 }}>
          Ver tudo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      )}
    </div>
  )
}

export default async function PaginaInicial() {
  const [destaques, { noticias: ultimas }, politica, economia, esporte, entretenimento, seguranca] = await Promise.all([
    getNoticiasDestaque(),
    getUltimasNoticias(0, 20),
    getNoticiasPorCategoria("Política"),
    getNoticiasPorCategoria("Economia"),
    getNoticiasPorCategoria("Esporte"),
    getNoticiasPorCategoria("Entretenimento"),
    getNoticiasPorCategoria("Segurança"),
  ])

  const [hero, sec1, sec2] = destaques
  const maisLidas = ultimas.slice(0, 5)

  return (
    <div style={{ background: "var(--fundo)", minHeight: "100vh" }}>
      <div className="w-portal" style={{ paddingTop: 20, paddingBottom: 60 }}>

        {/* ── BLOCO DE DESTAQUES: hero + 2 secundários à direita ── */}
        {hero && (
          <section style={{ marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6 }}>
              <CardHero noticia={hero} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sec1 && <CardDestaqueSec noticia={sec1} />}
                {sec2 && <CardDestaqueSec noticia={sec2} />}
              </div>
            </div>
          </section>
        )}

        {/* ── LAYOUT: coluna principal + sidebar ── */}
        <div style={{ display: "grid", gap: 24, alignItems: "start" }}
             className="md:grid-cols-[1fr_300px]">

          {/* COLUNA PRINCIPAL */}
          <div>

            {/* MAIS NOTÍCIAS — grade */}
            <section style={{ marginBottom: 24 }}>
              <TituloSecao label="Mais notícias" href="/ultimas" />
              <div style={{ display: "grid", gap: 14 }} className="grid-cols-2 md:grid-cols-3">
                {ultimas.slice(0, 6).map((n, i) => (
                  <div key={n.id} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <CardGrid noticia={n} />
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÕES POR CATEGORIA */}
            {[
              { label: "Política",       noticias: politica,       href: "/politica",       cor: "var(--cat-politica)" },
              { label: "Economia",       noticias: economia,       href: "/economia",       cor: "var(--cat-economia)" },
              { label: "Esporte",        noticias: esporte,        href: "/esporte",        cor: "var(--cat-esporte)" },
              { label: "Entretenimento", noticias: entretenimento, href: "/entretenimento", cor: "var(--cat-entretenimento)" },
              { label: "Segurança",      noticias: seguranca,      href: "/seguranca",      cor: "var(--cat-seguranca)" },
            ]
              .filter(s => s.noticias.length > 0)
              .map(secao => (
                <section key={secao.label} style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden", marginBottom: 24 }}>
                  <div style={{ background: secao.cor, padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>{secao.label}</span>
                    <Link href={secao.href} style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      Ver tudo
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                  {secao.noticias[0] && (
                    <div style={{ padding: "14px 18px 0" }}>
                      <CardHero noticia={secao.noticias[0]} />
                    </div>
                  )}
                  <div style={{ padding: "0 18px" }}>
                    {secao.noticias.slice(1, 4).map(n => (
                      <CardLista key={n.id} noticia={n} />
                    ))}
                  </div>
                </section>
              ))
            }
          </div>

          {/* ── SIDEBAR ──
              top: 140px = altura total da navbar
              (faixa topo ~32 + logo ~62 + categorias ~42 = ~136px, arredondado para 140)
          ── */}
          <aside style={{ position: "sticky", top: 150 }}>
            <div style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: "var(--azul)", padding: "10px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>
                Mais lidas
              </div>
              <div style={{ padding: "0 14px" }}>
                {maisLidas.map((n, i) => (
                  <CardLista key={n.id} noticia={n} index={i} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}