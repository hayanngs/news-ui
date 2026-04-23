// app/_home/SecaoCategoriaBloco.tsx
import {getNewsByCategory} from "@/lib/api"
import {CardHero, CardLista} from "@/components/CardNoticia"
import Link from "next/link"

interface Props {
  label: string
  slug: string
  href: string
  cor: string
}

export async function SecaoCategoriaBloco({label, slug, href, cor}: Props) {
  const noticias = await getNewsByCategory(slug)
  if (!Array.isArray(noticias)) throw new Error("Resposta inválida")
  if (noticias.length === 0) return null

  return (
    <section style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden", marginBottom: 24}}>
      <div style={{background: cor, padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <span style={{fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff"}}>
          {label}
        </span>
        <Link href={href} style={{fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600}}>Ver tudo</Link>
      </div>

      {noticias[0] && (
        <div style={{padding: "14px 18px 0"}}>
          <CardHero noticia={noticias[0]}/>
        </div>
      )}
      <div style={{padding: "0 18px"}}>
        {noticias.slice(1, 4).map(n => <CardLista key={n.id} noticia={n}/>)}
      </div>
    </section>
  )
}
