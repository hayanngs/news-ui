import { Metadata } from "next"
import { getNoticiasPorCategoria } from "@/lib/api"
import { PaginaCategoria } from "@/components/PaginaCategoria"
export const metadata: Metadata = { title: "Entretenimento" }
export default async function Entretenimento() {
  const noticias = await getNoticiasPorCategoria("entretenimento")
  return <PaginaCategoria titulo="Entretenimento" descricao="Cultura, cinema, música e celebridades" noticias={noticias} cor="var(--cat-entretenimento)" />
}
