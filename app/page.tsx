// app/page.tsx — Home corrigida
import { getNoticiasDestaque, getUltimasNoticias, getNoticiasPorCategoria } from "@/lib/api"
import { CardHero, CardDestaque, CardLista, CardGrid } from "@/components/CardNoticia"

export default async function PaginaInicial() {
  const [destaques, { noticias: ultimas }, politica, economia] = await Promise.all([
    getNoticiasDestaque(),
    getUltimasNoticias(0, 10),
    getNoticiasPorCategoria("Política"),
    getNoticiasPorCategoria("Economia"),
  ])

  const [hero, ...demaisDestaques] = destaques

  return (
    <div style={{ background: "var(--fundo)", minHeight: "100vh" }}>
      <div className="w-portal" style={{ paddingTop: 20, paddingBottom: 40 }}>

        {/* ── BLOCO 1: MANCHETES ── */}
        {hero && (
          <section style={{ marginBottom: 24 }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
              gap: 4,
            }}
            className="max-md:grid-cols-1">

              {/* Hero principal — altura controlada */}
              <div className="fade-up" style={{ animationDelay: "0s" }}>
                <CardHero noticia={hero} />
              </div>

              {/* Destaques secundários */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {demaisDestaques.slice(0, 3).map((n, i) => (
                  <div key={n.id} className="fade-up" style={{ animationDelay: `${(i+1)*0.07}s`, flex: 1 }}>
                    <CardDestaque noticia={n} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BLOCO 2: CONTEÚDO + SIDEBAR ── */}
        <div style={{ display: "grid", gap: 24 }}
             className="md:grid-cols-[1fr_300px]">

          {/* Coluna principal */}
          <div>
            <section style={{ background: "#fff", borderRadius: 4, border: "1px solid var(--borda)", marginBottom: 20, overflow: "hidden" }}>
              <div style={{ borderBottom: "3px solid var(--azul)", padding: "10px 16px" }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--azul)" }}>
                  Últimas notícias
                </span>
              </div>
              <div style={{ padding: "0 16px", display: "grid" }} className="md:grid-cols-2 md:divide-x divide-[var(--borda)]">
                {ultimas.slice(0, 6).map((n, i) => (
                  <div key={n.id} className={`fade-up ${i % 2 === 0 ? "md:pr-5" : "md:pl-5"}`}
                       style={{ animationDelay: `${i*0.05}s` }}>
                    <CardLista noticia={n} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div style={{ borderBottom: "3px solid var(--azul)", paddingBottom: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--azul)" }}>
                  Mais notícias
                </span>
              </div>
              <div style={{ display: "grid", gap: 12 }} className="grid-cols-2 md:grid-cols-4">
                {ultimas.slice(6, 10).map((n, i) => (
                  <div key={n.id} className="fade-up" style={{ animationDelay: `${i*0.06}s` }}>
                    <CardGrid noticia={n} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            {[
              { titulo: "Mais lidas", cor: "var(--azul)", noticias: ultimas.slice(0, 5) },
              { titulo: "Política", cor: "var(--cat-politica)", noticias: politica.slice(0, 4) },
              { titulo: "Economia", cor: "var(--cat-economia)", noticias: economia.slice(0, 4) },
            ].filter(s => s.noticias.length > 0).map(secao => (
              <div key={secao.titulo} style={{ background: "#fff", borderRadius: 4, border: "1px solid var(--borda)", marginBottom: 16, overflow: "hidden" }}>
                <div style={{ background: secao.cor, padding: "10px 14px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>
                  {secao.titulo}
                </div>
                <div style={{ padding: "0 14px" }}>
                  {secao.noticias.map((n, i) => (
                    <CardLista key={n.id} noticia={n} index={secao.titulo === "Mais lidas" ? i : undefined} />
                  ))}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
