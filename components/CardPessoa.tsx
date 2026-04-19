// ─────────────────────────────────────────────
// components/CardPessoa.tsx
// Card para exibir membros da equipe
// ─────────────────────────────────────────────

import Image from "next/image"
import {Person} from "@/types"

export function CardPessoa({pessoa}: { pessoa: Person }) {
  return (
    <article className="group text-center">

      {/* Foto circular */}
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden 
                      border-4 border-[var(--cor-borda)] bg-neutral-200
                      transition-transform duration-300 group-hover:scale-105">
        {pessoa.photoUrl ? (
          <Image
            src={pessoa.photoUrl}
            alt={pessoa.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover"
          />
        ) : (
          // Avatar placeholder com inicial do nome
          <div className="absolute inset-0 flex items-center justify-center 
                          bg-[var(--cor-acento)] text-white text-3xl font-bold"
               style={{fontFamily: "var(--fonte-titulo)"}}>
            {pessoa.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Informações */}
      <h3
        className="text-lg font-bold"
        style={{fontFamily: "var(--fonte-titulo)"}}
      >
        {pessoa.name}
      </h3>
      <p className="text-xs font-semibold tracking-wider uppercase text-[var(--cor-acento)] mt-0.5">
        {pessoa.position}
      </p>
      <p className="mt-3 text-sm text-[var(--cor-texto-suave)] leading-relaxed">
        {pessoa.biography}
      </p>

      {/* Links sociais */}
      <div className="mt-4 flex justify-center gap-3">
        {pessoa.email && (
          <a
            href={`mailto:${pessoa.email}`}
            className="text-xs text-[var(--cor-texto-suave)] hover:text-[var(--cor-acento)] 
                       transition-colors border border-[var(--cor-borda)] rounded-full px-3 py-1"
          >
            Email
          </a>
        )}
      </div>
    </article>
  )
}
