// app/_home/UltimasBloco.tsx
import {getLastNews} from "@/lib/api"
import {CardGrid} from "@/components/CardNoticia"
import Link from "next/link"
import type {News} from "@/types"

export async function UltimasBloco() {
  const resp = await getLastNews(0, 20)
  const ultimas = resp?.noticias
  if (!Array.isArray(ultimas)) throw new Error("Resposta inválida")

  return (
    <section style={{marginBottom: 24}}>
      <div style={{display: "flex", justifyContent: "space-between", borderBottom: "3px solid var(--azul)", paddingBottom: 8, marginBottom: 16}}>
        <span style={{fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--azul)"}}>
          Mais notícias
        </span>
        <Link href="/ultimas" style={{fontSize: 12, color: "var(--azul)", fontWeight: 600}}>Ver tudo</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {ultimas.slice(0, 6).map((n: News, i: number) => (
          <div key={n.id} className="fade-up" style={{animationDelay: `${i * 0.05}s`}}>
            <CardGrid noticia={n}/>
          </div>
        ))}
      </div>
    </section>
  )
}
