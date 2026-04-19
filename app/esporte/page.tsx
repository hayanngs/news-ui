import { Metadata } from "next"
import { getNewsByCategory } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Esporte" }
export default async function Esporte() {
  const noticias = await getNewsByCategory("esporte")
  return <PaginaCategoria titulo="Esporte" descricao="Futebol, olimpíadas e muito mais" noticias={noticias} cor="var(--cat-esporte)" />
}
