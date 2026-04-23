// app/page.tsx
import {LoadingSlot} from "@/components/LoadingBoundary"
import {
  DestaquesSkeleton,
  UltimasSkeleton,
  SecaoCategoriaSkeleton,
  MaisLidasSkeleton,
} from "@/components/Skeletons"
import {DestaquesBloco} from "./_home/DestaquesBloco"
import {UltimasBloco} from "./_home/UltimasBloco"
import {SecaoCategoriaBloco} from "./_home/SecaoCategoriaBloco"
import {MaisLidasBloco} from "./_home/MaisLidasBloco"
import {CATEGORIES_CONFIG} from "@/constants";

// Garante que a página NÃO seja estática — senão o erro é capturado no build
export const dynamic = "force-dynamic"

export default function PaginaInicial() {
  return (
    <div style={{background: "var(--fundo)", minHeight: "100vh"}}>
      <div className="w-portal" style={{paddingTop: 20, paddingBottom: 60}}>

        <LoadingSlot fallback={<DestaquesSkeleton/>}>
          <DestaquesBloco/>
        </LoadingSlot>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6" style={{alignItems: "start"}}>
          <div>
            <LoadingSlot fallback={<UltimasSkeleton/>}>
              <UltimasBloco/>
            </LoadingSlot>

            {CATEGORIES_CONFIG.map(s => (
              <LoadingSlot key={s.slug} fallback={<SecaoCategoriaSkeleton cor={s.color}/>}>
                <SecaoCategoriaBloco label={s.name} slug={s.slug}  href={s.href} cor={s.color} />
              </LoadingSlot>
            ))}
          </div>

          <aside style={{position: "sticky", top: 150}}>
            <LoadingSlot fallback={<MaisLidasSkeleton/>}>
              <MaisLidasBloco/>
            </LoadingSlot>
          </aside>
        </div>
      </div>
    </div>
  )
}
