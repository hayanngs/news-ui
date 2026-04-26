import type {NavLink} from "@/types"

// ── Badge CSS classes ──
export const BADGE_CLASSE: Readonly<Record<string, string>> = {
  Política: "badge badge-politica",
  Economia: "badge badge-economia",
  Direitos: "badge badge-direitos",
  Cultura: "badge badge-cultura",
  Saúde: "badge badge-saude",
  Esporte: "badge badge-esporte",
  Entretenimento: "badge badge-entretenimento",
  Segurança: "badge badge-seguranca",
} as const

// ── Links de navegação (usados na Navbar, Footer e Drawer) ──
export const CATEGORIAS: readonly NavLink[] = [
  {href: "/", label: "Home"},
  {href: "/ultimas", label: "Últimas notícias"},
  {href: "/politica", label: "Política"},
  {href: "/esporte", label: "Esporte"},
  {href: "/economia", label: "Economia"},
  {href: "/entretenimento", label: "Entretenimento"},
  {href: "/seguranca", label: "Segurança"},
] as const

export const CATEGORIES_CONFIG = [
  {name: "Política", slug: "politica", href: "/politica", color: "var(--cat-politica)"},
  {name: "Segurança", slug: "seguranca", href: "/seguranca", color: "var(--cat-seguranca)"},
  {name: "Esporte", slug: "esporte", href: "/esporte", color: "var(--cat-esporte)"},
  {name: "Entretenimento", slug: "entretenimento", href: "/entretenimento", color: "var(--cat-entretenimento)"},
  {name: "Economia", slug: "economia", href: "/economia", color: "var(--cat-economia)"},
] as const

export const INSTITUCIONAIS: readonly NavLink[] = [
  {href: "/sobre", label: "Sobre"},
  {href: "/pessoas", label: "Quem somos"},
  {href: "/termos", label: "Termos de Uso"},
  {href: "/privacidade", label: "Política de Privacidade"},
] as const

// ── Categorias do footer (sem "Home") ──
export const CATEGORIAS_FOOTER: readonly NavLink[] = CATEGORIAS.filter(
  (c) => c.href !== "/"
)

// ── Contatos ──
export const CONTATOS = {
  redacao: "diariogoianooficial@gmail.com"
} as const
