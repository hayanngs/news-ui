// ─────────────────────────────────────────────
// app/not-found.tsx
// Página 404 customizada
// Exibida quando notFound() é chamado ou rota não existe
// ─────────────────────────────────────────────

import Link from "next/link"

export default function NaoEncontrado() {
  return (
    <div className="container-portal py-32 text-center">
      <p
        className="text-[10rem] font-black leading-none text-[var(--cor-borda)]"
        style={{ fontFamily: "var(--fonte-titulo)" }}
      >
        404
      </p>
      <h1
        className="text-3xl font-bold -mt-4 mb-4"
        style={{ fontFamily: "var(--fonte-titulo)" }}
      >
        Página não encontrada
      </h1>
      <p className="text-[var(--cor-texto-suave)] mb-8">
        A notícia ou página que você procura não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="inline-block bg-[var(--cor-acento)] text-white px-8 py-3 
                   font-semibold hover:bg-[var(--cor-acento-hover)] transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
