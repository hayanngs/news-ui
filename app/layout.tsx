// app/layout.ts

import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import React from "react"

export const metadata: Metadata = {
  title: {
    default: "Diário Goiano",
    template: "%s | Diário Goiano",
  },
  description: "As últimas notícias com jornalismo independente e de qualidade.",
  keywords: ["notícias Goiás", "Goiânia", "jornalismo goiano", "Diário Goiano"],

  // Domínio base — necessário para URLs absolutas no sitemap e open graph
  metadataBase: new URL("https://diariogoiano.com.br"),

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    siteName: "Diário Goiano",
    locale: "pt_BR",
    type: "website",
    url: "https://diariogoiano.com.br",
  },

  // Controla indexação — permite tudo exceto o que robots.ts bloquear
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Cole aqui o código do Google Search Console quando criar a conta
  // verification: {
  //   google: "seu-codigo-de-verificacao-aqui",
  // },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E2D50",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
    <body>
    <Navbar />
    <main id="conteudo-principal">{children}</main>
    <Footer />
    </body>
    </html>
  )
}
