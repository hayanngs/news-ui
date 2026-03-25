import { Metadata } from "next"
export const metadata: Metadata = { title: "Política de Privacidade" }

const secoes = [
  { titulo: "Quais dados coletamos", conteudo: "Coletamos dados de navegação anônimos (páginas visitadas, tempo de acesso, dispositivo e localização aproximada) por meio de ferramentas de analytics. Não coletamos dados pessoais identificáveis sem seu consentimento explícito." },
  { titulo: "Como usamos seus dados", conteudo: "Os dados de navegação são usados exclusivamente para melhorar a experiência do usuário, entender o desempenho do portal e orientar decisões editoriais. Não usamos seus dados para fins de publicidade personalizada sem consentimento." },
  { titulo: "Compartilhamento de dados", conteudo: "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Podemos compartilhar dados anonimizados e agregados com parceiros editoriais para fins estatísticos." },
  { titulo: "Cookies", conteudo: "Utilizamos cookies essenciais para o funcionamento do portal e cookies de analytics para entender o comportamento dos usuários. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar a experiência de uso." },
  { titulo: "Seus direitos (LGPD)", conteudo: "Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito de: acessar seus dados, corrigir informações incorretas, solicitar a exclusão de dados, revogar consentimentos e obter informações sobre o uso de seus dados." },
  { titulo: "Segurança dos dados", conteudo: "Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição. Nenhum sistema é 100% seguro, mas nos comprometemos a notificar em caso de incidentes." },
  { titulo: "Contato e encarregado", conteudo: "Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail privacidade@diariogoiano.com.br. Respondemos em até 15 dias úteis, conforme exigido pela LGPD." },
]

export default function Privacidade() {
  return (
    <>
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">Legal</p>
          <h1>Política de Privacidade</h1>
          <p>Como coletamos, usamos e protegemos seus dados.</p>
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
                  <a key={i} href={`#p-${i}`} style={{ display: "block", padding: "7px 16px", fontSize: 13, color: "var(--cinza-texto)", textDecoration: "none", borderLeft: "3px solid transparent", transition: "all 0.15s" }}
                    className="hover:text-[var(--azul)] hover:border-l-[var(--azul)] hover:bg-[var(--azul-claro)]">
                    {i + 1}. {s.titulo}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div>
            {secoes.map((s, i) => (
              <section key={i} id={`p-${i}`} style={{ background: "#fff", border: "1px solid var(--borda)", borderRadius: 6, padding: "24px 28px", marginBottom: 12 }}>
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
              Última atualização: {new Date().toLocaleDateString("pt-BR")} · <a href="mailto:privacidade@diariogoiano.com.br" style={{ color: "var(--azul)" }}>privacidade@diariogoiano.com.br</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
