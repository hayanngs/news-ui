import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Política" }
export default async function Politica() {
  const noticias = await getNoticiasPorCategoria("politica")
  return <PaginaCategoria titulo="Política" descricao="Cobertura política nacional e estadual" noticias={noticias} cor="var(--cat-politica)" />
}
