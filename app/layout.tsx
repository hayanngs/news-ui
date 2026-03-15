// ─────────────────────────────────────────────
// app/layout.tsx
// Layout raiz: envolve TODAS as páginas do site.
// Aqui ficam: <html>, <body>, Navbar e Footer.
// ─────────────────────────────────────────────

import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

// metadata exportado → Next.js injeta automaticamente nas <meta> tags
export const metadata: Metadata = {
  title: {
    default: "Portal de Notícias",
    // Em subpáginas: "Título da Notícia | Portal de Notícias"
    template: "%s | Portal de Notícias",
  },
  description: "As últimas notícias com jornalismo independente e de qualidade.",
  openGraph: {
    siteName: "Portal de Notícias",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Navbar aparece em todas as páginas */}
        <Navbar />

        {/* children = conteúdo da página atual */}
        <main>{children}</main>

        {/* Footer aparece em todas as páginas */}
        <Footer />
      </body>
    </html>
  )
}
