// components/Footer.tsx
import Link from "next/link"
import {SocialIconsFooter} from "@/components/SocialIcons"
import {CATEGORIAS_FOOTER, INSTITUCIONAIS, CONTATOS} from "@/constants"
import React from "react"

const SECTION_TITLE_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 14,
}

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer style={{fontFamily: "var(--fonte-ui)", marginTop: 40}}>
      <div style={{background: "var(--azul-escuro)", padding: "40px 0 32px"}}>
        <div className="w-portal">
          <div className="footer-grid">

            {/* ── Logo + descrição + redes sociais ── */}
            <div>
              <Link href="/" style={{textDecoration: "none"}}>
                <span style={{
                  fontFamily: "var(--fonte-titulo)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#fff",
                  display: "block",
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}>
                  Diário <strong>Goiano</strong>
                </span>
              </Link>

              <p style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: 16,
                maxWidth: 260,
              }}>
                Jornalismo independente e de qualidade.<br/>
                Cobrindo Goiás e o Brasil.
              </p>

              <SocialIconsFooter/>
            </div>

            {/* ── Categorias ── */}
            <nav aria-label="Categorias">
              <p style={SECTION_TITLE_STYLE}>Categorias</p>
              <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 8}}>
                {CATEGORIAS_FOOTER.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Institucional ── */}
            <nav aria-label="Institucional">
              <p style={SECTION_TITLE_STYLE}>Institucional</p>
              <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 8}}>
                {INSTITUCIONAIS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Contato ── */}
            <div>
              <p style={SECTION_TITLE_STYLE}>Contato</p>
              <address style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontStyle: "normal",
              }}>
                <a
                  href={`mailto:${CONTATOS.redacao}`}
                  className="footer-link"
                  style={{fontSize: 13}}
                >
                  {CONTATOS.redacao}
                </a>
              </address>
            </div>
          </div>

          {/* Divisória */}
          <div style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "28px 0 0",
          }}/>
        </div>
      </div>

      {/* ── Barra inferior: copyright + links legais ── */}
      <div style={{background: "var(--azul)", padding: "12px 0"}}>
        <div
          className="w-portal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{fontSize: 11, color: "rgba(255,255,255,0.35)"}}>
            © {ano} Diário Goiano. Todos os direitos reservados.
          </span>

          <div style={{display: "flex", gap: 16}}>
            <Link href="/termos" className="footer-link" style={{fontSize: 11}}>
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="footer-link" style={{fontSize: 11}}>
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
