// components/Skeletons.tsx
import React from "react"

function Bar({w, h, mb, r = 2}: {w?: number | string; h: number; mb?: number; r?: number}) {
  return <div className="skeleton" style={{width: w ?? "100%", height: h, marginBottom: mb, borderRadius: r}} />
}

function CardGridSkeleton() {
  return (
    <div style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden"}}>
      <div className="skeleton" style={{aspectRatio: "16/9"}} />
      <div style={{padding: 14}}>
        <Bar w={60} h={14} mb={10} />
        <Bar h={14} mb={6} />
        <Bar w="70%" h={14} />
      </div>
    </div>
  )
}

function CardListaSkeleton() {
  return (
    <div style={{display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--borda)"}}>
      <div className="skeleton" style={{width: 64, height: 48, borderRadius: 3, flexShrink: 0}} />
      <div style={{flex: 1}}>
        <Bar w={60} h={10} mb={6} />
        <Bar h={12} mb={4} />
        <Bar w="80%" h={12} />
      </div>
    </div>
  )
}

/** Bloco de destaques (hero + 2 secundários) */
export function DestaquesSkeleton() {
  return (
    <section style={{marginBottom: 24}}>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 md:gap-[6px]">
        <div className="skeleton" style={{height: 376, borderRadius: 4}} />
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-[6px]">
          <div className="skeleton" style={{height: 185, borderRadius: 4}} />
          <div className="skeleton" style={{height: 185, borderRadius: 4}} />
        </div>
      </div>
    </section>
  )
}

/** Grade "Mais notícias" (6 cards) */
export function UltimasSkeleton() {
  return (
    <section style={{marginBottom: 24}}>
      <Bar w={140} h={18} mb={16} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {Array.from({length: 6}).map((_, i) => <CardGridSkeleton key={i} />)}
      </div>
    </section>
  )
}

/** Bloco de uma seção por categoria */
export function SecaoCategoriaSkeleton({cor = "var(--azul)"}: {cor?: string}) {
  return (
    <section style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden", marginBottom: 24}}>
      <div style={{background: cor, padding: "8px 18px", height: 36}} />
      <div style={{padding: 18}}>
        <div className="skeleton" style={{aspectRatio: "16/9", marginBottom: 12, borderRadius: 3}} />
        {Array.from({length: 3}).map((_, i) => <CardListaSkeleton key={i} />)}
      </div>
    </section>
  )
}

/** Sidebar "Mais lidas" */
export function MaisLidasSkeleton() {
  return (
    <div style={{background: "#fff", border: "1px solid var(--borda)", borderRadius: 4, overflow: "hidden"}}>
      <div style={{background: "var(--azul)", padding: "10px 16px", height: 36}} />
      <div style={{padding: "0 14px"}}>
        {Array.from({length: 5}).map((_, i) => <CardListaSkeleton key={i} />)}
      </div>
    </div>
  )
}

/** Utilitário: quando o fetch falha, mostra o mesmo skeleton — efeito "carregando infinito" */
export function ForeverLoading({children}: {children: React.ReactNode}) {
  return <>{children}</>
}
