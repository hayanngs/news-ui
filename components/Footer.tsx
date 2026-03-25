import Link from "next/link"
import { SocialIconsFooter } from "@/components/SocialIcons"

export function Footer() {
  return (
    <footer style={{ fontFamily: "var(--fonte-ui)", marginTop: 40 }}>
      <div style={{ background: "var(--azul-escuro)", padding: "32px 0" }}>
        <div className="w-portal" style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>

          {/* Logo + social */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: 20, color: "#fff" }}>Diário Goiano</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 4 }}>Jornalismo independente.<br/>Goiás e Brasil.</p>
            <SocialIconsFooter />
          </div>

          {/* Categorias */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Categorias</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                { href: "/ultimas", label: "Últimas notícias" },
                { href: "/politica", label: "Política" },
                { href: "/esporte", label: "Esporte" },
                { href: "/economia", label: "Economia" },
                { href: "/entretenimento", label: "Entretenimento" },
                { href: "/seguranca", label: "Segurança" },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Institucional</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                { href: "/sobre", label: "Sobre" },
                { href: "/pessoas", label: "Quem somos" },
                { href: "/termos", label: "Termos de Uso" },
                { href: "/privacidade", label: "Política de Privacidade" },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Contato</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              <span>redacao@diariogoiano.com.br</span>
              <span>contato@diariogoiano.com.br</span>
              <span>privacidade@diariogoiano.com.br</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#001f33", padding: "10px 0" }}>
        <div className="w-portal" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.3)", flexWrap: "wrap", gap: 4 }}>
          <span>© {new Date().getFullYear()} Diário Goiano. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/termos" className="footer-link" style={{ fontSize: 11 }}>Termos de Uso</Link>
            <Link href="/privacidade" className="footer-link" style={{ fontSize: 11 }}>Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
