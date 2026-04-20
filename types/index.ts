// types/index.ts

// ══════════════════════════════════════════════
// USUÁRIO
// Reflete exatamente o UserData.java do backend
// ══════════════════════════════════════════════

export type UserRole = "ADMIN" | "JORNALISTA"

// Tipo completo — usado no painel admin
// Coincide com o que o backend retorna em /api/admin/users
export interface User {
  readonly id: string           // UUID no backend → string no frontend
  readonly name: string         // NAM_USER
  readonly email: string        // DES_EMAIL
  readonly userRole: UserRole   // IND_USER_ROLE
  readonly active: boolean      // FLG_ACTIVE
  readonly photoUrl?: string    // URL_PHOTO
  readonly biography?: string   // DES_BIOGRAPHY
  readonly position?: string    // IND_POSITION
  readonly createdAt?: string   // DAT_CREATION (ISO 8601)
  readonly updatedAt?: string   // DAT_UPDATED  (ISO 8601)
}

// Tipo público — usado na página "Quem somos" do portal
// Coincide com o que o backend retorna em /api/pessoas (sem dados sensíveis)
export interface Person {
  readonly id: string
  readonly name: string         // mesmo campo do backend, sem tradução
  readonly position?: string    // IND_POSITION (ex: "Editora-chefe")
  readonly biography?: string   // DES_BIOGRAPHY
  readonly photoUrl?: string    // URL_PHOTO
  readonly email?: string       // exposto opcionalmente no perfil público
}

// Resposta do endpoint POST /api/auth/login
export interface LoginResponse {
  readonly token: string       // JWT
  readonly user: User          // dados do usuário logado
}

// ══════════════════════════════════════════════
// NOTÍCIA
// ══════════════════════════════════════════════

// O que o backend retorna em GET /api/admin/news
export interface News {
  readonly id: string
  readonly title: string
  readonly slug: string
  readonly summary: string
  readonly content: string
  readonly thumbnailUrl: string
  readonly category: Category
  readonly author: string
  readonly publishedAt: string
  readonly isPublished: boolean
  readonly isHighlight: boolean
  readonly createdAt?: string
  readonly updatedAt: string
}

// O que o frontend envia em POST/PUT /api/admin/news
export interface NewsFormData {
  title: string
  slug: string
  summary: string
  content: string
  thumbnailUrl?: string
  categorySlug: string
  tagIds: number[]
  author: string
  published: boolean
  highlight: boolean
}

// ══════════════════════════════════════════════
// ADMIN — CATEGORIA E TAG
// ══════════════════════════════════════════════

export interface Category {
  readonly name: string
  readonly slug: string
  readonly color?: string
}

export interface Tag {
  readonly id: number
  readonly name: string
  readonly slug: string
}

// ══════════════════════════════════════════════
// PÁGINA ESTÁTICA
// ══════════════════════════════════════════════

export interface PaginaEstatica {
  readonly titulo: string
  readonly conteudo: string     // HTML
  readonly atualizadoEm: string
}

/** Link de navegação usado na Navbar, Footer e Drawer */
export interface NavLink {
  readonly href: string
  readonly label: string
}
