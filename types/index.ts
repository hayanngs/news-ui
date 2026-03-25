// ─────────────────────────────────────────────
// Tipos TypeScript do Diário Goiano
// ─────────────────────────────────────────────

export interface category {
  
}

export interface Noticia {
  id: number
  titulo: string
  slug: string          // ex: "governo-anuncia-novo-programa"
  resumo: string        // texto curto para o card
  conteudo: string      // HTML completo da notícia
  imagemUrl: string
  categoria: string     // "Política", "Economia", etc.
  href: string          // "/politica", "/economia", etc.
  autor: string
  publicadoEm: string   // ISO 8601: "2024-03-15T14:30:00"
  publicado: boolean
  destaque: boolean     // aparece maior na home
}

export interface Pessoa {
  id: number
  nome: string
  cargo: string
  bio: string
  fotoUrl: string
  email?: string
  linkedin?: string
}

export interface PaginaEstatica {
  titulo: string
  conteudo: string      // HTML da página
  atualizadoEm: string
}
