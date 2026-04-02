// ─────────────────────────────────────────────
// Tipos TypeScript do Diário Goiano
// ─────────────────────────────────────────────

export interface Category {
  readonly name: string
  readonly slug: string
  readonly color?: string
}

export interface News {
  readonly id: number
  readonly title: string
  readonly slug: string
  readonly summary: string
  readonly content: string
  readonly thumbnailUrl: string
  readonly category: Category
  readonly author: string
  readonly publishedAt: string
  readonly published: boolean
  readonly highlight: boolean
}

export interface Pessoa {
  readonly id: number
  readonly nome: string
  readonly cargo: string
  readonly bio: string
  readonly fotoUrl: string
  readonly email?: string
  readonly linkedin?: string
}

export interface PaginaEstatica {
  readonly titulo: string
  readonly conteudo: string
  readonly atualizadoEm: string
}

/** Resultado paginado retornado pela API */
export interface PaginatedResult<T> {
  readonly noticias: T[]
  readonly total: number
  readonly pagina: number
  readonly totalPaginas: number
}

/** Link de navegação usado na Navbar, Footer e Drawer */
export interface NavLink {
  readonly href: string
  readonly label: string
}
