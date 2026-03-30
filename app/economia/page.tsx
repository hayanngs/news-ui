import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Economia" }
export default async function Economia() {
  const noticias = await getNoticiasPorCategoria("economia")
  return <PaginaCategoria titulo="Economia" descricao="Mercado, finanças e negócios" noticias={noticias} cor="var(--cat-economia)" />
}
