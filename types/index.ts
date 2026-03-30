// ─────────────────────────────────────────────
// Tipos TypeScript do Diário Goiano
// ─────────────────────────────────────────────

export interface Category {
  name: string    // "Política"
  slug: string    // "politica"
  color?: string    // "#C0392B"
}

export interface News {
  id: number
  title: string
  slug: string          // ex: "governo-anuncia-novo-programa"
  summary: string        // texto curto para o card
  content: string      // HTML completo da notícia
  thumbnailUrl: string
  category: Category     // "Política", "Economia", etc.
  author: string
  publishedAt: string   // ISO 8601: "2024-03-15T14:30:00"
  published: boolean
  highlight: boolean     // aparece maior na home
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
