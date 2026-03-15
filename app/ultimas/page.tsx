import { Metadata } from "next"
import { getUltimasNoticias } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Últimas Notícias" }
export default async function UltimasNoticias() {
  const { noticias } = await getUltimasNoticias(0, 20)
  return <PaginaCategoria titulo="Últimas Notícias" descricao="As notícias mais recentes do portal" noticias={noticias} />
}
