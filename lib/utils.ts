// lib/utils.ts

/**
 * Formata uma data ISO para exibição relativa (ex: "Há 5 min", "Há 3h")
 * ou absoluta (ex: "10 mar.").
 */
export function formatarDataRelativa(iso: string): string {
  const data = new Date(iso)
  const agora = new Date()
  const diffMin = Math.floor((agora.getTime() - data.getTime()) / 60_000)

  if (diffMin < 1) return "Agora"
  if (diffMin < 60) return `Há ${diffMin} min`
  if (diffMin < 1_440) return `Há ${Math.floor(diffMin / 60)}h`

  return data.toLocaleDateString("pt-BR", {day: "numeric", month: "short"})
}

/**
 * Formata uma data ISO no formato longo (ex: "10 de março de 2025").
 */
export function formatarDataLonga(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Retorna a data atual formatada por extenso.
 */
export function dataHojeExtenso(): string {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Retorna a data atual no formato curto (ex: "10 mar. 2025").
 */
export function dataHojeCurta(): string {
  return new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
