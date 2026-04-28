"use client"

import {useState, useEffect} from "react"

interface BotaoConfig {
  readonly label: string
  readonly buildHref: (titulo: string, url: string) => string
  readonly cor: string
}

const BOTOES: readonly BotaoConfig[] = [
  {
    label: "WhatsApp",
    buildHref: (titulo, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${titulo} - ${url}`)}`,
    cor: "bg-green-600 hover:bg-green-700",
  },
  {
    label: "Twitter / X",
    buildHref: (titulo, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
    cor: "bg-neutral-900 hover:bg-black",
  },
] as const

export function BotoesCompartilhar({titulo}: { titulo: string }) {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) return null

  return (
    <div className="mt-12 pt-6 border-t border-[var(--cor-borda)]">
      <p className="text-sm font-semibold text-[var(--texto)] mb-3">
        Compartilhar
      </p>
      <div className="flex gap-3">
        {BOTOES.map((b) => (
          <a
            key={b.label}
            href={b.buildHref(titulo, url)}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs text-white px-4 py-2 rounded-sm font-semibold transition-colors ${b.cor}`}
          >
            {b.label}
          </a>
        ))}
      </div>
    </div>
  )
}
