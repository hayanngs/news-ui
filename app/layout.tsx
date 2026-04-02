import type {Metadata, Viewport} from "next"
import "./globals.css"
import {Navbar} from "@/components/Navbar"
import {Footer} from "@/components/Footer"
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Diário Goiano",
    template: "%s | Diário Goiano",
  },
  description: "As últimas notícias com jornalismo independente e de qualidade.",
  openGraph: {
    siteName: "Diário Goiano",
    locale: "pt_BR",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E2D50",
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
    <body>
    <Navbar/>
    <main id="conteudo-principal">{children}</main>
    <Footer/>
    </body>
    </html>
  )
}
