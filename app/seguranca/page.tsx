import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Segurança" }
export default async function Seguranca() {
  const noticias = await getNoticiasPorCategoria("Segurança")
  return <PaginaCategoria titulo="Segurança" descricao="Segurança pública, ocorrências e polícia" noticias={noticias} cor="var(--cat-seguranca)" />
}
