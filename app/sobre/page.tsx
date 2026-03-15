// app/sobre/page.tsx
import { Metadata } from "next"
import { getPaginaEstatica } from "@/lib/api"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o Portal de Notícias, nossa missão e valores.",
}

export default async function PaginaSobre() {
  let pagina = null
  try { pagina = await getPaginaEstatica("sobre") } catch {}

  return (
    <>
      {/* Cabeçalho azul */}
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">Quem somos</p>
          <h1>Sobre o Portal</h1>
          <p>Conheça nossa missão, valores e história.</p>
        </div>
      </div>

      <div className="w-portal" style={{ paddingBottom: 60 }}>
        {pagina ? (
          <div className="conteudo-noticia" style={{ maxWidth: 760 }}
               dangerouslySetInnerHTML={{ __html: pagina.conteudo }} />
        ) : (
          <div style={{ maxWidth: 760 }}>

            {/* Missão */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--fonte-titulo)", fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, color: "var(--texto)" }}>
                Nossa missão
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--cinza-texto)", lineHeight: 1.8 }}>
                O Portal de Notícias nasceu com um propósito claro: oferecer jornalismo
                independente, rigoroso e comprometido com a verdade. Em um cenário de
                desinformação crescente, acreditamos que a imprensa livre é um pilar
                indispensável da democracia.
              </p>
            </section>

            {/* Valores */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--fonte-titulo)", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, color: "var(--texto)" }}>
                Nossos valores
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {[
                  { titulo: "Independência", desc: "Sem vínculos com partidos políticos ou grupos econômicos.", cor: "var(--azul)" },
                  { titulo: "Rigor", desc: "Cada informação é verificada antes de ser publicada.", cor: "var(--cat-economia)" },
                  { titulo: "Transparência", desc: "Erros são corrigidos publicamente, sem apagamentos.", cor: "var(--cat-politica)" },
                ].map(v => (
                  <div key={v.titulo} style={{
                    border: "1px solid var(--borda)", borderRadius: 6,
                    padding: "20px 18px", background: "#fff",
                    borderTop: `3px solid ${v.cor}`
                  }}>
                    <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: "1rem", marginBottom: 8, color: "var(--texto)" }}>
                      {v.titulo}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--cinza-texto)", lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* História */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--fonte-titulo)", fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, color: "var(--texto)" }}>
                História
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--cinza-texto)", lineHeight: 1.8 }}>
                Fundado em 2024, o Portal surgiu da iniciativa de jornalistas que acreditam
                no poder da informação para transformar a sociedade. Com uma equipe enxuta
                e comprometida, publicamos notícias verificadas sobre política, economia,
                direitos e cultura.
              </p>
            </section>

            {/* Contato CTA */}
            <section style={{
              background: "var(--azul-claro)", borderLeft: "4px solid var(--azul)",
              padding: "20px 24px", borderRadius: "0 6px 6px 0"
            }}>
              <h3 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: "1.1rem", marginBottom: 6, color: "var(--azul-escuro)" }}>
                Fale conosco
              </h3>
              <p style={{ fontSize: 14, color: "var(--cinza-texto)", marginBottom: 14 }}>
                Sugestões de pauta, denúncias e críticas são sempre bem-vindas.
              </p>
              <a href="mailto:contato@portal.com.br" style={{
                display: "inline-block", background: "var(--azul)", color: "#fff",
                fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 3,
                textDecoration: "none"
              }}>
                contato@portal.com.br
              </a>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
