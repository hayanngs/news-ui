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

const SECOES_CONFIG = [
  {label: "Política", slug: "politica", href: "/politica", cor: "var(--cat-politica)"},
  {label: "Economia", slug: "economia", href: "/economia", cor: "var(--cat-economia)"},
  {label: "Esporte", slug: "esporte", href: "/esporte", cor: "var(--cat-esporte)"},
  {label: "Entretenimento", slug: "entretenimento", href: "/entretenimento", cor: "var(--cat-entretenimento)"},
  {label: "Segurança", slug: "seguranca", href: "/seguranca", cor: "var(--cat-seguranca)"},
] as const

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

            {SECOES_CONFIG.map(s => (
              <LoadingSlot key={s.slug} fallback={<SecaoCategoriaSkeleton cor={s.cor}/>}>
                <SecaoCategoriaBloco label={s.label} slug={s.slug}  href={s.href} cor={s.cor} />
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
