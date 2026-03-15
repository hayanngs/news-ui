"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SocialIconsNavbar } from "@/components/SocialIcons"

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/pessoas", label: "Pessoas" },
  { href: "/direitos", label: "Direitos" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header style={{ fontFamily: "var(--fonte-ui)" }}>

      {/* ── Faixa superior: data + redes sociais ── */}
      <div style={{ background: "var(--azul-escuro)" }}>
        <div className="w-portal" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "5px 24px",
          fontSize: 12, color: "rgba(255,255,255,0.75)"
        }}>
          <span>
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long", day: "numeric", month: "long", year: "numeric"
            })}
          </span>
          {/* Ícones sociais na faixa superior */}
          <SocialIconsNavbar />
        </div>
      </div>

      {/* ── Barra do logo ── */}
      <div style={{ background: "var(--azul)", padding: "12px 0" }}>
        <div className="w-portal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 40, height: 40, background: "#fff", borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <span style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: 22, color: "var(--azul)", lineHeight: 1 }}>N</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1 }}>
                  Portal Notícias
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", marginTop: 2 }}>
                  GOIÁS
                </div>
              </div>
            </div>
          </Link>

          {/* Busca — desktop */}
          <div className="hidden md:flex" style={{
            background: "rgba(255,255,255,0.15)", borderRadius: 4,
            alignItems: "center", gap: 8, padding: "7px 14px", cursor: "pointer"
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Buscar notícias</span>
          </div>

          {/* Hambúrguer mobile */}
          <button className="md:hidden" onClick={() => setMenuAberto(!menuAberto)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }} aria-label="Menu">
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 2, background: "#fff",
                  borderRadius: 2, transition: "all 0.2s",
                  transform: menuAberto
                    ? i===0 ? "rotate(45deg) translate(5px,5px)"
                    : i===1 ? "scaleX(0)"
                    : "rotate(-45deg) translate(5px,-5px)"
                    : "none"
                }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* ── Barra de navegação desktop ── */}
      <nav className="hidden md:block" style={{ background: "var(--fundo-branco)", borderBottom: "1px solid var(--borda)" }}>
        <div className="w-portal" style={{ display: "flex" }}>
          {LINKS.map(link => {
            const ativo = pathname === link.href
            return (
              <Link key={link.href} href={link.href} className={ativo ? "nav-link-ativo" : "nav-link"}>
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── Menu mobile ── */}
      {menuAberto && (
        <nav style={{ background: "var(--fundo-branco)", borderBottom: "1px solid var(--borda)" }}>
          {LINKS.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuAberto(false)}
              className={pathname === link.href ? "nav-mobile-ativo" : "nav-mobile-link"}>
              {link.label}
            </Link>
          ))}
          {/* Ícones sociais no menu mobile também */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--borda)", display: "flex", gap: 4 }}>
            <SocialIconsNavbar />
          </div>
        </nav>
      )}
    </header>
  )
}
