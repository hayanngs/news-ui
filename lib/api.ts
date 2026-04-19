// lib/api.ts

import { News, Person, PaginaEstatica } from "@/types"
import {NOTICIAS_MOCK, PESSOAS_MOCK} from "@/lib/api-mock";

const API_URL = process.env.API_URL || "http://localhost:8080"

// ══════════════════════════════════════════════
// FUNÇÕES DE ACESSO
// ══════════════════════════════════════════════

async function fetchComFallback<T>(url: string, fallback: T, opcoes?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, { ...opcoes, signal: AbortSignal.timeout(3000) })
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return fallback

    throw e
  }
}

export async function getLastNews(page = 0, size = 12) {
  const inicio = page * size
  const fallback = {
    noticias: NOTICIAS_MOCK.slice(inicio, inicio + size),
    totalPaginas: Math.ceil(NOTICIAS_MOCK.length / size),
    totalElementos: NOTICIAS_MOCK.length,
  }
  try {
    const res = await fetch(`${API_URL}/api/news?page=${page}&size=${size}&sort=publishedAt,desc`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return { noticias: data.content, totalPaginas: data.totalPages, totalElementos: data.totalElements }
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return fallback

    throw e
  }
}

/**
 * Retorna as notícias mais lidas.
 * Fallback: primeiras 5 do mock (sempre fixas, independente de paginação).
 * Backend: GET /api/news/mais-lidas?size=5
 */
export async function getTopViews(): Promise<News[]> {
  const fallback = NOTICIAS_MOCK.slice(0, 5)
  try {
    const res = await fetch(`${API_URL}/api/news/top-views?size=5`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    return res.json()
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return fallback

    throw e
  }
}

export async function getHighlightedNews(): Promise<News[]> {
  const fallback = NOTICIAS_MOCK.filter(n => n.isHighlight).slice(0, 4)
  try {
    const res = await fetch(`${API_URL}/api/news?highlight=true&size=4`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.content?.length ? data.content : fallback
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return fallback

    throw e
  }
}

export async function getNewsBySlug(slug: string): Promise<News> {
  try {
    const res = await fetch(`${API_URL}/api/news/${slug}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok)
      throw new Error()
    return res.json()
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled) {
      const fallback = NOTICIAS_MOCK.find(n => n.slug === slug)
      if (!fallback)
        throw new Error(`Notícia não encontrada: ${slug}`)

      return fallback
    }

    throw e
  }
}

export async function getNewsByCategory(category: string): Promise<News[]> {
  const fallback = NOTICIAS_MOCK.filter(n => n.category.slug === category)
  try {
    const res = await fetch(`${API_URL}/api/news/category/${category}?size=20`, { next: { revalidate: 120 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.content?.length ? data.content : fallback
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return fallback

    throw e
  }
}

export async function getAllSlugsNews(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/news/slugs`, { cache: "no-store", signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    return res.json()
  } catch(e: any) {
    const isMockEnabled: boolean = process.env.MOCK_ENABLED === 'true'
    if (isMockEnabled)
      return NOTICIAS_MOCK.map(n => n.slug)

    throw e
  }
}

export async function getPessoas(): Promise<Person[]> {
  return fetchComFallback(`${API_URL}/api/team`, PESSOAS_MOCK, { next: { revalidate: 60 } })
}

export async function getPaginaEstatica(pagina: "sobre" | "direitos"): Promise<PaginaEstatica> {
  const res = await fetch(`${API_URL}/api/paginas/${pagina}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) })
  if (!res.ok) throw new Error(`Página não encontrada: ${pagina}`)
  return res.json()
}
