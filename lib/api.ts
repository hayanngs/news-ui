// lib/api.ts
import {Category, News, PaginaEstatica, Person} from "@/types"
import {CATEGORIES_MOCK, NOTICIAS_MOCK, PESSOAS_MOCK} from "@/lib/api-mock"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const MOCK_ENABLED = process.env.NEXT_PUBLIC_MOCK_ENABLED === "true"

// Helper: usa mock se MOCK_ENABLED, senão chama a API.
// Se a API falhar, LANÇA erro — quem chama decide o que fazer
// (normalmente deixar o Suspense/ErrorBoundary mostrar o skeleton).
async function fetchApi<T>(
  url: string,
  mock: T,
  opcoes?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, {
      ...opcoes,
      signal: AbortSignal.timeout(3000),
    })

    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)

    return res.json()
  } catch (error) {
    if (MOCK_ENABLED)
      return mock

    throw error
  }
}

// -- Notícias ----------------------------------------------------------

export async function getLastNews(page = 0, size = 12) {
  const inicio = page * size
  const mock = {
    noticias: NOTICIAS_MOCK.slice(inicio, inicio + size),
    totalPaginas: Math.ceil(NOTICIAS_MOCK.length / size),
    totalElementos: NOTICIAS_MOCK.length,
  }

  try {
    const res = await fetch(
      `${API_URL}/api/news?page=${page}&size=${size}&sort=publishedAt,desc`,
      {next: {revalidate: 60}, signal: AbortSignal.timeout(3000)}
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    return {
      noticias: data.content as News[],
      totalPaginas: data.totalPages as number,
      totalElementos: data.totalElements as number,
    }
  } catch (error) {
    if (MOCK_ENABLED)
      return mock

    throw error
  }
}

export async function getTopViews(): Promise<News[]> {
  return fetchApi(
    `${API_URL}/api/news/top-views?size=5`,
    NOTICIAS_MOCK.slice(0, 5),
    {next: {revalidate: 300}}
  )
}

export async function getHighlightedNews(): Promise<News[]> {
  return fetchApi(
    `${API_URL}/api/news/highlights?size=4`,
    NOTICIAS_MOCK.filter(n => n.isHighlight).slice(0, 4),
    {next: {revalidate: 60}}
  )
}

export async function getNewsBySlug(slug: string): Promise<News> {
  try {
    const res = await fetch(`${API_URL}/api/news/${slug}`, {
      next: {revalidate: 300},
      signal: AbortSignal.timeout(3000),
    })

    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)

    return res.json()
  } catch (error) {
    if (MOCK_ENABLED) {
      const mock = NOTICIAS_MOCK.find(n => n.slug === slug)
      if (!mock)
        throw new Error(`Notícia não encontrada no mock: ${slug}`)
      return mock
    }

    throw error
  }
}

export async function getNewsByCategory(category: string): Promise<News[]> {
  try {
    const res = await fetch(`${API_URL}/api/news/category/${category}?size=20`, {
      next: {revalidate: 120},
      signal: AbortSignal.timeout(3000)
    })

    if (!res.ok)
      throw new Error()

    const data = await res.json()

    return data.content?.length ? data.content : []
  } catch (error) {
    if (MOCK_ENABLED)
      return NOTICIAS_MOCK.filter(n => n.category.slug === category)

    throw error
  }
}

export async function getAllSlugsNews(): Promise<string[]> {
  return fetchApi(
    `${API_URL}/api/news/slugs`,
    NOTICIAS_MOCK.map(n => n.slug),
    {cache: "no-store"}
  )
}

// -- Equipe ------------------------------------------------------------

export async function getPessoas(): Promise<Person[]> {
  return fetchApi(`${API_URL}/api/team`, PESSOAS_MOCK, {
    next: {revalidate: 3600},
  })
}

// -- Categorias --------------------------------------------------------

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/api/categories`, {
      next: {revalidate: 3600},
      signal: AbortSignal.timeout(3000)
    })

    if (!response.ok)
      throw new Error()

    const data = await response.json()

    if (Array.isArray(data)) {
      return data
    }

    if (Array.isArray(data.content)) {
      return data.content
    }

    return []
  } catch (error) {
    if (MOCK_ENABLED) {
      return CATEGORIES_MOCK.map(c => ({id: c.id, name: c.name, slug: c.slug, color: c.color})) as Category[]
    }
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  try {
    const response = await fetch(`${API_URL}/api/categories/${slug}`, {
      next: {revalidate: 3600},
      signal: AbortSignal.timeout(3000)
    })

    if (!response.ok)
      throw new Error()

    return await response.json()
  } catch (error) {
    if (MOCK_ENABLED) {
      const categoryConfig = CATEGORIES_MOCK.find(c => c.slug === slug)
      if (!categoryConfig) {
        throw new Error(`Category with slug '${slug}' not found`)
      }
      return {
        id: categoryConfig.id,
        name: categoryConfig.name,
        slug: categoryConfig.slug,
        description: "categoryConfig.description",
        isHighlight: true,
        color: categoryConfig.color}
    } else {
      throw error
    }
  }
}

// -- Páginas estáticas -------------------------------------------------

export async function getPaginaEstatica(
  pagina: "sobre" | "direitos"
): Promise<PaginaEstatica> {
  try {
    const res = await fetch(`${API_URL}/api/pages/${pagina}`, {
      next: {revalidate: 3600},
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error(`Página não encontrada: ${pagina}`)
    return res.json()
  } catch (error) {
    if (MOCK_ENABLED) {
      return {
        titulo: pagina === "sobre" ? "Sobre o Diário Goiano" : "Direitos e Privacidade",
        conteudo: "<p>Conteúdo disponível em breve.</p>",
        atualizadoEm: new Date().toISOString(),
      }
    }
    throw error
  }
}
