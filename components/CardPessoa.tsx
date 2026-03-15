// ─────────────────────────────────────────────
// components/CardPessoa.tsx
// Card para exibir membros da equipe
// ─────────────────────────────────────────────

import Image from "next/image"
import { Pessoa } from "@/types"

export function CardPessoa({ pessoa }: { pessoa: Pessoa }) {
  return (
    <article className="group text-center">
      
      {/* Foto circular */}
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden 
                      border-4 border-[var(--cor-borda)] bg-neutral-200
                      transition-transform duration-300 group-hover:scale-105">
        {pessoa.fotoUrl ? (
          <Image
            src={pessoa.fotoUrl}
            alt={pessoa.nome}
            fill
            className="object-cover"
          />
        ) : (
          // Avatar placeholder com inicial do nome
          <div className="absolute inset-0 flex items-center justify-center 
                          bg-[var(--cor-acento)] text-white text-3xl font-bold"
               style={{ fontFamily: "var(--fonte-titulo)" }}>
            {pessoa.nome.charAt(0)}
          </div>
        )}
      </div>

      {/* Informações */}
      <h3
        className="text-lg font-bold"
        style={{ fontFamily: "var(--fonte-titulo)" }}
      >
        {pessoa.nome}
      </h3>
      <p className="text-xs font-semibold tracking-wider uppercase text-[var(--cor-acento)] mt-0.5">
        {pessoa.cargo}
      </p>
      <p className="mt-3 text-sm text-[var(--cor-texto-suave)] leading-relaxed">
        {pessoa.bio}
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
        {pessoa.linkedin && (
          <a
            href={pessoa.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--cor-texto-suave)] hover:text-[var(--cor-acento)] 
                       transition-colors border border-[var(--cor-borda)] rounded-full px-3 py-1"
          >
            LinkedIn
          </a>
        )}
      </div>
    </article>
  )
}
