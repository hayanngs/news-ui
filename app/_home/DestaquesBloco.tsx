// app/_home/DestaquesBloco.tsx
import {getHighlightedNews} from "@/lib/api"
import {CardHero} from "@/components/CardNoticia"
import Link from "next/link"
import Image from "next/image"
import {BADGE_CLASSE} from "@/constants"
import {formatarDataRelativa} from "@/lib/utils"
import type {News} from "@/types"

function CardDestaqueSec({noticia}: {noticia: News}) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{flex: 1, minWidth: 0}}>
      <article className="relative overflow-hidden rounded" style={{height: 185, background: "#1a1a2e"}}>
        {noticia.thumbnailUrl && (
          <Image src={noticia.thumbnailUrl} alt={noticia.title} fill
                 sizes="(max-width: 768px) 100vw, 400px"
                 className="object-cover opacity-[0.72] transition-transform duration-500 group-hover:scale-105"/>
        )}
        <div className="absolute inset-0" style={{background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)"}}/>
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <span className={BADGE_CLASSE[noticia.category.name] || "badge"} style={{marginBottom: 6, display: "inline-block"}}>
            {noticia.category.name}
          </span>
          <h3 className="group-hover:underline decoration-white underline-offset-2 line-clamp-3"
              style={{fontFamily: "var(--fonte-titulo)", fontWeight: 600, fontSize: "0.9rem", color: "#fff", lineHeight: 1.3}}>
            {noticia.title}
          </h3>
          <p style={{color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 5}}>
            {noticia.user.name} · <time dateTime={noticia.publishedAt}>{formatarDataRelativa(noticia.publishedAt)}</time>
          </p>
        </div>
      </article>
    </Link>
  )
}

export async function DestaquesBloco() {
  const destaques = await getHighlightedNews()
  if (!Array.isArray(destaques)) throw new Error("Resposta inválida")

  const [hero, sec1, sec2] = destaques
  if (!hero) return null

  return (
    <section style={{marginBottom: 24}}>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 md:gap-[6px]">
        <CardHero noticia={hero}/>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-[6px]">
          {sec1 && <CardDestaqueSec noticia={sec1}/>}
          {sec2 && <CardDestaqueSec noticia={sec2}/>}
        </div>
      </div>
    </section>
  )
}
