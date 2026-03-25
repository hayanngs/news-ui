import { Metadata } from "next"
export const metadata: Metadata = { title: "Termos de Uso" }

const secoes = [
  { titulo: "Aceitação dos termos", conteudo: "Ao acessar e usar este portal, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o portal. O uso contínuo do site após alterações constitui aceitação das mesmas." },
  { titulo: "Uso do conteúdo", conteudo: "Todo o conteúdo publicado neste portal — textos, imagens, vídeos e infográficos — é protegido pela Lei de Direitos Autorais (Lei nº 9.610/98). É permitido o compartilhamento com link e crédito ao portal. É proibida a reprodução total ou parcial sem autorização expressa da redação." },
  { titulo: "Conduta do usuário", conteudo: "O usuário compromete-se a utilizar o portal de forma ética e legal. É proibido usar o portal para disseminar informações falsas, discurso de ódio, conteúdo ilegal ou qualquer material que viole direitos de terceiros." },
  { titulo: "Comentários e interações", conteudo: "Comentários e interações nas publicações são de responsabilidade exclusiva de seus autores. O portal reserva o direito de remover conteúdos que violem as regras de conduta, sem necessidade de aviso prévio." },
  { titulo: "Links externos", conteudo: "O portal pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas desses sites. O acesso a links externos é de total responsabilidade do usuário." },
  { titulo: "Limitação de responsabilidade", conteudo: "O portal se compromete com a precisão das informações, mas não garante que o conteúdo seja livre de erros. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso das informações publicadas." },
  { titulo: "Alterações nos termos", conteudo: "Estes Termos de Uso podem ser atualizados a qualquer momento. As alterações entram em vigor imediatamente após a publicação. Recomendamos a leitura periódica desta página." },
]

export default function TermosDeUso() {
  return (
    <>
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">Legal</p>
          <h1>Termos de Uso</h1>
          <p>Regras e condições para uso deste portal.</p>
        </div>
      </div>
      <div className="w-portal" style={{ paddingBottom: 60 }}>
        <div style={{ display: "grid", gap: 24 }} className="md:grid-cols-[220px_1fr]">
          <aside>
            <div style={{ position: "sticky", top: 80, background: "#fff", border: "1px solid var(--borda)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ background: "var(--azul)", padding: "10px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>
                Neste documento
              </div>
              <nav style={{ padding: "8px 0" }}>
                {secoes.map((s, i) => (
                  <a key={i} href={`#t-${i}`} style={{ display: "block", padding: "7px 16px", fontSize: 13, color: "var(--cinza-texto)", textDecoration: "none", borderLeft: "3px solid transparent", transition: "all 0.15s" }}
                    className="hover:text-[var(--azul)] hover:border-l-[var(--azul)] hover:bg-[var(--azul-claro)]">
                    {i + 1}. {s.titulo}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div>
            {secoes.map((s, i) => (
              <section key={i} id={`t-${i}`} style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 6, padding: "24px 28px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ background: "var(--azul)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: "1.1rem", color: "var(--texto)" }}>{s.titulo}</h2>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--cinza-texto)", lineHeight: 1.8 }}>{s.conteudo}</p>
              </section>
            ))}
            <p style={{ fontSize: 12, color: "var(--cinza-medio)", marginTop: 8 }}>
              Última atualização: {new Date().toLocaleDateString("pt-BR")} · Dúvidas? <a href="mailto:contato@diariogoiano.com.br" style={{ color: "var(--azul)" }}>contato@diariogoiano.com.br</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
