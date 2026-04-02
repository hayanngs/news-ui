"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SocialIconsNavbar, SocialIconsDrawer } from "@/components/SocialIcons"

const CATEGORIAS = [
  { href: "/",                label: "Home" },
  { href: "/ultimas",         label: "Últimas notícias" },
  { href: "/politica",        label: "Política" },
  { href: "/esporte",         label: "Esporte" },
  { href: "/economia",        label: "Economia" },
  { href: "/entretenimento",  label: "Entretenimento" },
  { href: "/seguranca",       label: "Segurança" },
]

const INSTITUCIONAIS = [
  { href: "/sobre",        label: "Sobre" },
  { href: "/pessoas",      label: "Quem somos" },
  { href: "/termos",       label: "Termos de Uso" },
  { href: "/privacidade",  label: "Política de Privacidade" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuAberto, setMenuAberto] = useState(false)

  // Fecha o menu ao navegar
  useEffect(() => { setMenuAberto(false) }, [pathname])

  // Bloqueia scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuAberto])

  return (
    <>
      <header style={{ fontFamily: "var(--fonte-ui)", position: "sticky", top: 0, zIndex: 100 }}>

        {/* ── Faixa topo: data + redes sociais ── */}
        <div style={{ background: "var(--azul)" }}>
          <div className="w-portal border-b border-transparent [border-image:linear-gradient(to_right,transparent,rgba(255,255,255,0.35),transparent)_1]" style={{ 
            display: "flex", justifyContent: "space-between", 
            alignItems: "center", padding: "5px 24px", 
            fontSize: 12, color: "rgba(255,255,255,0.75)" 
          }}>
            <span className="hidden md:block">
              {new Date().toLocaleDateString("pt-BR", { 
                weekday: "long", day: "numeric", month: "long", year: "numeric" 
              })}
            </span>
            <span className="md:hidden" style={{ fontSize: 11 }}>
              {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <SocialIconsNavbar />
          </div>
        </div>

        {/* ── Barra principal: hambúrguer | logo | busca ── */}
        <div style={{ background: "var(--azul)", padding: "10px 0" }}>
          <div className="w-portal" style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr auto 1fr", 
            alignItems: "center", 
            gap: 16,}}
            >

            {/* Esquerda: botão hambúrguer */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button 
                onClick={() => setMenuAberto(!menuAberto)} 
                aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                style={{ 
                  background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", 
                  borderRadius: 4, padding: "7px 10px", display: "flex", 
                  flexDirection: "column", gap: 5, transition: "background 0.2s"}}
                >
                {[0,1,2].map(i => (
                  <span key={i} style={{ 
                    display: "block", width: 20, height: 2, background: "#fff", 
                    borderRadius: 2, transition: "all 0.25s",
                    transform: menuAberto ? (i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)") : "none",
                    opacity: menuAberto && i===1 ? 0 : 1 }} />
                ))}
              </button>
            </div>

            {/* Centro: logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ fontFamily: "var(--fonte-titulo)", fontSize: 28, color: "#fff", lineHeight: 1, whiteSpace: "nowrap" }}>
                    Diário <strong style={{fontWeight: 700}}>Goiano</strong>
                  </div>
                </div>
              </div>
            </Link>

            {/* Direita: busca */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={{ 
                background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", 
                borderRadius: 4, padding: "7px 14px", display: "flex", 
                alignItems: "center", gap: 7, transition: "background 0.2s"}}
                >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="hidden md:inline" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
                  Buscar
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Barra de categorias — centralizada ── */}
        <nav style={{ 
          background: "var(--fundo-branco)", 
          borderBottom: "1px solid var(--borda)", 
          overflowX: "auto", 
          scrollbarWidth: "none" 
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            minWidth: "max-content", 
            maxHeight: "40px",
            margin: "0 auto", 
            padding: "0 16px",
          }}>
            {CATEGORIAS.map(link => {
              const ativo = pathname === link.href
              return (
                <Link key={link.href} href={link.href} 
                className={ativo ? "nav-link-ativo" : "nav-link"} 
                style={{ whiteSpace: "nowrap" }}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {/* ── Overlay escuro quando menu aberto ── */}
      {menuAberto && (
        <div 
        onClick={() => setMenuAberto(false)}
          style={{ 
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", 
            zIndex: 101, backdropFilter: "blur(2px)" 
          }} 
        />
      )}

      {/* ── Gaveta lateral (drawer) ── */}
      <div
        role="dialog"
        aria-modal={menuAberto ? "true" : undefined}
        aria-hidden={!menuAberto}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: 300, background: "#fff",
          zIndex: 102, overflowY: "auto",
          transform: menuAberto ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: menuAberto ? "4px 0 24px rgba(0,0,0,0.15)" : "none",
          visibility: menuAberto ? "visible" : "hidden",
          pointerEvents: menuAberto ? "auto" : "none",
        }}
      >

        {/* Cabeçalho da gaveta */}
        <div style={{ 
          background: "var(--azul)", padding: "16px 20px", 
          display: "flex", alignItems: "center", justifyContent: "space-between" 
        }}>
          <span style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: 16, color: "#fff" }}>
            Menu
          </span>
          <button onClick={() => setMenuAberto(false)}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", borderRadius: 4, padding: "4px 8px", color: "#fff", fontSize: 18, lineHeight: 1 }}>
              ✕
          </button>
        </div>

        {/* Seção: Categorias */}
        <div style={{ padding: "8px 0" }}>
          <p style={{ 
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", 
            letterSpacing: "0.12em", color: "var(--cinza-medio)", 
            padding: "10px 20px 6px" 
            }}>
              Categorias
          </p>
          {CATEGORIAS.map(link => {
            const ativo = pathname === link.href
            return (
              <Link key={link.href} href={link.href} 
              onClick={() => setMenuAberto(false)}
                style={{ 
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 20px", 
                  fontSize: 14, fontWeight: ativo ? 700 : 500,
                  color: ativo ? "var(--azul)" : "var(--texto)", 
                  textDecoration: "none",
                  borderLeft: ativo ? "3px solid var(--azul)" : "3px solid transparent",
                  background: ativo ? "var(--azul-claro)" : "transparent", 
                  transition: "all 0.15s",
                }}>
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Divisória */}
        <div style={{ height: 1, background: "var(--borda)", margin: "4px 20px" }} />

        {/* Seção: Institucional */}
        <div style={{ padding: "8px 0" }}>
          <p style={{ 
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", 
            letterSpacing: "0.12em", color: "var(--cinza-medio)", 
            padding: "10px 20px 6px" 
            }}>
              Institucional
          </p>
          {INSTITUCIONAIS.map(link => {
            const ativo = pathname === link.href
            return (
              <Link key={link.href} href={link.href} 
                onClick={() => setMenuAberto(false)}
                style={{ 
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 20px", 
                  fontSize: 14, fontWeight: ativo ? 700 : 500,
                  color: ativo ? "var(--azul)" : "var(--texto)", 
                  textDecoration: "none",
                  borderLeft: ativo ? "3px solid var(--azul)" : "3px solid transparent",
                  background: ativo ? "var(--azul-claro)" : "transparent", 
                  transition: "all 0.15s",
                }}>
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Redes sociais — agora com SocialIconsDrawer (ícones escuros) */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--borda)", marginTop: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--cinza-medio)", marginBottom: 10 }}>
            Redes sociais
          </p>
          <SocialIconsDrawer />
        </div>
      </div>
    </>
  )
}
