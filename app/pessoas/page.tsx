import {Metadata} from "next"
import {getPessoas} from "@/lib/api"
import {CardPessoa} from "@/components/CardPessoa"
import {Pessoa} from "@/types";

export const metadata: Metadata = {title: "Quem Somos"}

export default async function QuemSomos() {
  let pessoas: Pessoa[] = []
  try {
    pessoas = await getPessoas()
  } catch {
  }
  const fallback = [
    {id: 1, nome: "Ana Souza", cargo: "Editora-chefe", bio: "15 anos de experiência em jornalismo político e investigativo.", fotoUrl: "", email: "ana@diariogoiano.com.br"},
    {id: 2, nome: "Carlos Lima", cargo: "Editor de Economia", bio: "Especializado em cobertura econômica e mercado financeiro.", fotoUrl: "", email: "carlos@diariogoiano.com.br"},
    {id: 3, nome: "Maria Santos", cargo: "Jornalista", bio: "Cobre pautas sociais, direitos humanos e políticas públicas.", fotoUrl: "", email: "maria@diariogoiano.com.br"},
    {id: 4, nome: "Pedro Alves", cargo: "Repórter", bio: "Fotojornalista especializado em cultura e meio ambiente.", fotoUrl: "", email: "pedro@diariogoiano.com.br"},
  ]
  const lista = pessoas.length > 0 ? pessoas : fallback

  return (
    <>
      <div className="pagina-header">
        <div className="pagina-header-inner">
          <p className="label">A equipe</p>
          <h1>Quem somos</h1>
          <p>Conheça quem faz o jornalismo acontecer todos os dias.</p>
        </div>
      </div>
      <div className="w-portal" style={{paddingBottom: 60}}>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 48}}>
          {lista.map((pessoa, i) => (
            <div key={pessoa.id} className="fade-up" style={{animationDelay: `${i * 0.08}s`, opacity: 0}}>
              <CardPessoa pessoa={pessoa}/>
            </div>
          ))}
        </div>
        <div style={{background: "var(--azul-claro)", border: "1px solid var(--borda)", borderLeft: "4px solid var(--azul)", borderRadius: "0 6px 6px 0", padding: "24px 28px", maxWidth: 600}}>
          <h2 style={{fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8, color: "var(--azul-escuro)"}}>Quer fazer parte da equipe?</h2>
          <p style={{fontSize: 14, color: "var(--cinza-texto)", marginBottom: 16, lineHeight: 1.7}}>Estamos sempre em busca de jornalistas comprometidos. Envie seu portfólio.</p>
          <a href="mailto:redacao@diariogoiano.com.br" style={{display: "inline-block", background: "var(--azul)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 3, textDecoration: "none"}}>
            Enviar candidatura
          </a>
        </div>
      </div>
    </>
  )
}
