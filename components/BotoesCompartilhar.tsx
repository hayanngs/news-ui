"use client"
// components/BotoesCompartilhar.tsx
// Client Component — usa window.location para pegar a URL atual

export function BotoesCompartilhar({ titulo }: { titulo: string }) {
  // window só existe no navegador — aqui é seguro porque é "use client"
  const url = typeof window !== "undefined" ? window.location.href : ""

  const botoes = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(titulo + " - " + url)}`,
      cor: "bg-green-600 hover:bg-green-700",
    },
    {
      label: "Twitter / X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
      cor: "bg-neutral-900 hover:bg-black",
    },
  ]

  return (
    <div className="mt-12 pt-6 border-t border-[var(--cor-borda)]">
      <p className="text-sm font-semibold text-[var(--cor-texto-suave)] mb-3">
        Compartilhar
      </p>
      <div className="flex gap-3">
        {botoes.map((b) => (
          <a
            key={b.label}
            href={b.href}
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
