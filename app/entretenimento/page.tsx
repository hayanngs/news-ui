import { Metadata } from "next"
import { getNewsByCategory } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Entretenimento" }
export default async function Entretenimento() {
  const noticias = await getNewsByCategory("entretenimento")
  return <PaginaCategoria titulo="Entretenimento" descricao="Cultura, cinema, música e celebridades" noticias={noticias} cor="var(--cat-entretenimento)" />
}
