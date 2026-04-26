import Link from "next/link"
import {SocialIconsFooter} from "@/components/SocialIcons"
import {CATEGORIAS_FOOTER, INSTITUCIONAIS, CONTATOS} from "@/constants"
import React from "react";

const SECTION_TITLE_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 12,
}

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer style={{fontFamily: "var(--fonte-ui)", marginTop: 40}}>
      <div style={{background: "var(--azul-escuro)", padding: "32px 0"}}>
        <div
          className="w-portal"
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          {/* Logo + social */}
          <div>
            <span
              style={{
                fontFamily: "var(--fonte-titulo)",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                display: "block",
                marginBottom: 10,
              }}
            >
              Diário Goiano
            </span>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                marginBottom: 4,
              }}
            >
              Jornalismo independente.
              <br/>
              Goiás e Brasil.
            </p>
            <SocialIconsFooter/>
          </div>

          {/* Categorias */}
          <nav aria-label="Categorias">
            <p style={SECTION_TITLE_STYLE}>Categorias</p>
            <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 7}}>
              {CATEGORIAS_FOOTER.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Institucional */}
          <nav aria-label="Institucional">
            <p style={SECTION_TITLE_STYLE}>Institucional</p>
            <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 7}}>
              {INSTITUCIONAIS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p style={SECTION_TITLE_STYLE}>Contato</p>
            <address
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                fontStyle: "normal",
              }}
            >
              <span>{CONTATOS.redacao}</span>
            </address>
          </div>
        </div>
      </div>

      <div style={{background: "var(--azul)", padding: "10px 0"}}>
        <div
          className="w-portal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>© {ano} Diário Goiano. Todos os direitos reservados.</span>
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
