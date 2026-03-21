import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Esporte" }
export default async function Esporte() {
  const noticias = await getNoticiasPorCategoria("Esporte")
  return <PaginaCategoria titulo="Esporte" descricao="Futebol, olimpíadas e muito mais" noticias={noticias} cor="var(--cat-esporte)" />
}
