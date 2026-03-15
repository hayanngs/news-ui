// app/direitos/page.tsx
import { Metadata } from "next"
import { getPaginaEstatica } from "@/lib/api"

export const metadata: Metadata = {
  title: "Direitos",
  description: "Política editorial, direitos autorais e uso de conteúdo.",
}

const secoes = [
  { titulo: "Política editorial", conteudo: "Este portal é comprometido com a cobertura jornalística isenta, plural e verificada. Não publicamos conteúdo pago disfarçado de notícia. Todo o patrocínio é claramente identificado. Nossa linha editorial é definida exclusivamente pela equipe jornalística." },
  { titulo: "Direitos autorais", conteudo: "Todo o conteúdo produzido por este portal é protegido pela Lei de Direitos Autorais (Lei nº 9.610/98). É proibida a reprodução parcial ou total sem autorização expressa. Compartilhamentos com link e crédito são permitidos." },
  { titulo: "Correções e erros", conteudo: "Cometemos erros. Quando isso acontece, corrigimos publicamente, com nota visível no texto original. Nunca apagamos matérias sem aviso. Envie erros para redacao@portal.com.br." },
  { titulo: "Proteção de fontes", conteudo: "A identidade de fontes que solicitarem anonimato é protegida de forma absoluta, em conformidade com os princípios éticos do jornalismo e a legislação brasileira vigente." },
  { titulo: "Política de privacidade", conteudo: "Coletamos apenas dados necessários para o funcionamento do portal. Não vendemos dados de usuários. Em conformidade com a LGPD (Lei nº 13.709/2018), você pode solicitar exclusão de qualquer dado pelo e-mail contato@portal.com.br." },
  { titulo: "Publicidade", conteudo: "O portal se mantém por meio de publicidade responsável. Anunciantes não têm qualquer influência sobre o conteúdo editorial. Publicidade e conteúdo jornalístico são sempre claramente separados." },
]

export default async function PaginaDireitos() {
  let pagina = null
  try { pagina = await getPaginaEstatica("direitos") } catch {}

  return (
    <>
      {/* Cabeçalho azul */}
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">Transparência</p>
          <h1>Direitos e Políticas</h1>
          <p>Nossas políticas editoriais, de privacidade e uso de conteúdo.</p>
        </div>
      </div>

      <div className="w-portal" style={{ paddingBottom: 60 }}>
        {pagina ? (
          <div className="conteudo-noticia" style={{ maxWidth: 760 }}
               dangerouslySetInnerHTML={{ __html: pagina.conteudo }} />
        ) : (
          <div style={{ display: "grid", gap: 24 }} className="md:grid-cols-[220px_1fr]">

            {/* Índice lateral fixo */}
            <aside>
              <div style={{
                position: "sticky", top: 80,
                background: "#fff", border: "1px solid var(--borda)",
                borderRadius: 6, overflow: "hidden"
              }}>
                <div style={{ background: "var(--azul)", padding: "10px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>
                  Neste documento
                </div>
                <nav style={{ padding: "8px 0" }}>
                  {secoes.map((s, i) => (
                    <a key={i} href={`#secao-${i}`} style={{
                      display: "block", padding: "7px 16px",
                      fontSize: 13, color: "var(--cinza-texto)",
                      textDecoration: "none", borderLeft: "3px solid transparent",
                      transition: "all 0.15s"
                    }}
                    className="hover:text-[var(--azul)] hover:border-l-[var(--azul)] hover:bg-[var(--azul-claro)]">
                      {i + 1}. {s.titulo}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Conteúdo */}
            <div>
              {secoes.map((secao, i) => (
                <section key={i} id={`secao-${i}`} style={{
                  background: "#fff", border: "1px solid var(--borda)",
                  borderRadius: 6, padding: "24px 28px", marginBottom: 12
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{
                      background: "var(--azul)", color: "#fff",
                      fontSize: 11, fontWeight: 700, padding: "3px 8px",
                      borderRadius: 3, flexShrink: 0
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: "1.1rem", color: "var(--texto)" }}>
                      {secao.titulo}
                    </h2>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--cinza-texto)", lineHeight: 1.8 }}>
                    {secao.conteudo}
                  </p>
                </section>
              ))}

              <div style={{ fontSize: 12, color: "var(--cinza-medio)", marginTop: 8 }}>
                Última atualização: {new Date().toLocaleDateString("pt-BR")} · Dúvidas?{" "}
                <a href="mailto:contato@portal.com.br" style={{ color: "var(--azul)" }}>contato@portal.com.br</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
