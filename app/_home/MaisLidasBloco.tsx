// app/_home/MaisLidasBloco.tsx
import {getTopViews} from "@/lib/api"
import {CardLista} from "@/components/CardNoticia"

export async function MaisLidasBloco() {
  const maisLidas = await getTopViews()
  if (!Array.isArray(maisLidas)) throw new Error("Resposta inválida")

  return (
    <div style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden"}}>
      <div style={{background: "var(--azul)", padding: "10px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff"}}>
        Mais lidas
      </div>
      <div style={{padding: "0 14px"}}>
        {maisLidas.map((n, i) => <CardLista key={n.id} noticia={n} index={i}/>)}
      </div>
    </div>
  )
}
