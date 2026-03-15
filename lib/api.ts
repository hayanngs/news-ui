// ─────────────────────────────────────────────
// lib/api.ts
// Busca dados do backend Java.
// Se o backend não estiver rodando, usa dados mock.
// ─────────────────────────────────────────────

import { Noticia, Pessoa, PaginaEstatica } from "@/types"

const API_URL = process.env.API_URL || "http://localhost:8080"

// ── Dados mock para desenvolvimento ──────────

const NOTICIAS_MOCK: Noticia[] = [
  {
    id: 1,
    titulo: "Governo anuncia novo programa de habitação popular",
    slug: "governo-anuncia-programa-habitacao-popular",
    resumo: "Iniciativa prevê construção de 500 mil unidades habitacionais até 2026 em regiões metropolitanas.",
    conteudo: "<p>O governo federal anunciou nesta segunda-feira um ambicioso programa de habitação popular que prevê a construção de 500 mil unidades habitacionais até o final de 2026.</p><p>O programa, batizado de <strong>Casa Digna</strong>, terá investimento total de R$ 45 bilhões e vai priorizar famílias com renda mensal de até três salários mínimos.</p><blockquote>Este é o maior investimento em habitação da história do país, disse o ministro durante a coletiva.</blockquote><p>As inscrições começam no próximo mês pelo aplicativo oficial do governo.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    categoria: "Política",
    autor: "Ana Souza",
    publicadoEm: "2025-03-10T09:00:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 2,
    titulo: "Banco Central reduz taxa de juros pela terceira vez consecutiva",
    slug: "banco-central-reduz-taxa-juros",
    resumo: "Decisão unânime do Copom leva a Selic a 10,5% ao ano, menor patamar em dois anos.",
    conteudo: "<p>O Comitê de Política Monetária (Copom) decidiu por unanimidade reduzir a taxa Selic em 0,5 ponto percentual, levando-a para 10,5% ao ano.</p><p>Esta é a terceira redução consecutiva e marca o início de um ciclo de afrouxamento monetário.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    categoria: "Economia",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-09T14:30:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 3,
    titulo: "STF decide sobre direito à desconexão digital no trabalho remoto",
    slug: "stf-decide-direito-desconexao-digital",
    resumo: "Decisão histórica pode beneficiar mais de 20 milhões de trabalhadores em regime de home office.",
    conteudo: "<p>O Supremo Tribunal Federal concluiu nesta semana o julgamento que estabelece o direito à desconexão digital como um direito fundamental dos trabalhadores em regime remoto.</p><p>A decisão, aprovada por 8 votos a 3, determina que empresas não podem exigir disponibilidade de funcionários fora do horário contratual.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    categoria: "Direitos",
    autor: "Maria Santos",
    publicadoEm: "2025-03-08T11:15:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 4,
    titulo: "Festival de cinema independente bate recorde de público",
    slug: "festival-cinema-independente-recorde",
    resumo: "Edição deste ano recebeu mais de 80 mil visitantes em dez dias de evento.",
    conteudo: "<p>O Festival Internacional de Cinema Independente encerrou sua 15ª edição batendo todos os recordes de público da história do evento.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    categoria: "Cultura",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-07T16:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 5,
    titulo: "Pesquisa aponta queda na taxa de desemprego entre jovens",
    slug: "pesquisa-queda-desemprego-jovens",
    resumo: "IBGE registra menor índice de desocupação entre 18 e 24 anos desde 2012.",
    conteudo: "<p>Uma nova pesquisa do IBGE revelou que a taxa de desemprego entre jovens de 18 a 24 anos atingiu o menor patamar desde 2012.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    categoria: "Economia",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-06T10:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 6,
    titulo: "Município inaugura maior parque urbano da região",
    slug: "municipio-inaugura-parque-urbano",
    resumo: "Espaço de 120 hectares oferece área verde, pistas de caminhada e centro cultural.",
    conteudo: "<p>A prefeitura inaugurou o maior parque urbano da região metropolitana, um espaço de 120 hectares que inclui lagos, trilhas ecológicas e um moderno centro cultural.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    categoria: "Cultura",
    autor: "Ana Souza",
    publicadoEm: "2025-03-05T08:30:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 7,
    titulo: "Congresso aprova marco regulatório da inteligência artificial",
    slug: "congresso-aprova-marco-regulatorio-ia",
    resumo: "Lei estabelece diretrizes para uso ético de IA por empresas e órgãos públicos.",
    conteudo: "<p>O Congresso Nacional aprovou por ampla maioria o marco regulatório da inteligência artificial no Brasil.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    categoria: "Política",
    autor: "Maria Santos",
    publicadoEm: "2025-03-04T13:45:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 8,
    titulo: "Ministério da Saúde lança campanha de vacinação contra dengue",
    slug: "ministerio-saude-campanha-vacinacao-dengue",
    resumo: "Imunizante estará disponível gratuitamente para crianças de 6 a 16 anos.",
    conteudo: "<p>O Ministério da Saúde lançou uma ampla campanha de vacinação contra a dengue voltada para crianças e adolescentes.</p>",
    imagemUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    categoria: "Saúde",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-03T09:00:00",
    publicado: true,
    destaque: false,
  },
]

const PESSOAS_MOCK: Pessoa[] = [
  { id: 1, nome: "Ana Souza", cargo: "Editora-chefe", bio: "15 anos de experiência em jornalismo político e investigativo. Ex-correspondente internacional.", fotoUrl: "", email: "ana@portal.com.br", linkedin: "" },
  { id: 2, nome: "Carlos Lima", cargo: "Editor de Economia", bio: "Especializado em cobertura econômica e mercado financeiro. MBA em Finanças pela FGV.", fotoUrl: "", email: "carlos@portal.com.br", linkedin: "" },
  { id: 3, nome: "Maria Santos", cargo: "Jornalista", bio: "Cobre pautas sociais, direitos humanos e políticas públicas há 8 anos.", fotoUrl: "", email: "maria@portal.com.br", linkedin: "" },
  { id: 4, nome: "Pedro Alves", cargo: "Repórter", bio: "Fotojornalista e repórter multimídia. Especializado em cultura e meio ambiente.", fotoUrl: "", email: "pedro@portal.com.br", linkedin: "" },
]

// ── Função auxiliar ───────────────────────────

async function fetchComFallback<T>(url: string, fallback: T, opcoes?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, { ...opcoes, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    // Backend offline → retorna dados mock silenciosamente
    return fallback
  }
}

// ── Notícias ──────────────────────────────────

export async function getUltimasNoticias(pagina = 0, tamanho = 12) {
  const fallback = {
    noticias: NOTICIAS_MOCK.slice(pagina * tamanho, (pagina + 1) * tamanho),
    totalPaginas: 1,
    totalElementos: NOTICIAS_MOCK.length,
  }

  try {
    const res = await fetch(
      `${API_URL}/api/noticias?page=${pagina}&size=${tamanho}&sort=publicadoEm,desc`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) }
    )
    if (!res.ok) throw new Error()
    const data = await res.json()
    return { noticias: data.content, totalPaginas: data.totalPages, totalElementos: data.totalElements }
  } catch {
    return fallback
  }
}

export async function getNoticiasDestaque(): Promise<Noticia[]> {
  const fallback = NOTICIAS_MOCK.filter((n) => n.destaque).slice(0, 3)
  return fetchComFallback(`${API_URL}/api/noticias?destaque=true&size=3`, fallback, { next: { revalidate: 60 } })
    .then((data: any) => data.content ?? fallback)
    .catch(() => fallback)
}

export async function getNoticia(slug: string): Promise<Noticia> {
  const fallback = NOTICIAS_MOCK.find((n) => n.slug === slug)
  if (!fallback) throw new Error(`Notícia não encontrada: ${slug}`)

  try {
    const res = await fetch(`${API_URL}/api/noticias/${slug}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error()
    return res.json()
  } catch {
    return fallback
  }
}

export async function getNoticiasPorCategoria(categoria: string): Promise<Noticia[]> {
  const fallback = NOTICIAS_MOCK.filter((n) => n.categoria === categoria).slice(0, 6)
  try {
    const res = await fetch(`${API_URL}/api/noticias?categoria=${categoria}&size=6`, {
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.content
  } catch {
    return fallback
  }
}

export async function getTodosOsslugs(): Promise<string[]> {
  return NOTICIAS_MOCK.map((n) => n.slug)
}

// ── Pessoas ───────────────────────────────────

export async function getPessoas(): Promise<Pessoa[]> {
  try {
    const res = await fetch(`${API_URL}/api/pessoas`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error()
    return res.json()
  } catch {
    return PESSOAS_MOCK
  }
}

// ── Páginas estáticas ─────────────────────────

export async function getPaginaEstatica(pagina: "sobre" | "direitos"): Promise<PaginaEstatica> {
  // Sem fallback aqui — as páginas já têm conteúdo padrão embutido no componente
  const res = await fetch(`${API_URL}/api/paginas/${pagina}`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(3000),
  })
  if (!res.ok) throw new Error(`Página não encontrada: ${pagina}`)
  return res.json()
}