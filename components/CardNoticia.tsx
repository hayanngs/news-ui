// components/CardNoticia.tsx

import Link from "next/link"
import Image from "next/image"
import type {News} from "@/types"
import {BADGE_CLASSE} from "@/constants"
import {formatarDataRelativa} from "@/lib/utils"

/* ── Subcomponentes internos ── */

function Badge({categoria}: { categoria: string }) {
  return (
    <span className={BADGE_CLASSE[categoria] || "badge"}>
      {categoria}
    </span>
  )
}

function NoticiaLink({slug, children, className = ""}: {
  slug: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={`/noticias/${slug}`}
      className={`group block ${className}`}
    >
      {children}
    </Link>
  )
}

/* ── Hero — altura fixa de 380px ── */

export function CardHero({noticia}: { noticia: News }) {
  return (
    <NoticiaLink slug={noticia.slug} className="h-full">
      <article
        className="relative overflow-hidden rounded h-[280px] sm:h-[340px] md:h-[380px]"
        style={{background: "#1a1a2e"}}
      >
        {noticia.thumbnailUrl && (
          <Image
            src={noticia.thumbnailUrl}
            alt={noticia.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
            priority
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Badge categoria={noticia.category.name}/>

          <h2
            className="group-hover:underline decoration-white underline-offset-2"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontWeight: 600,
              fontSize: "1.3rem",
              color: "#fff",
              lineHeight: 1.3,
              marginTop: 8,
            }}
          >
            {noticia.title}
          </h2>

          <p style={{color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 8}}>
            {noticia.summary}
          </p>

          <p style={{color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 8}}>
            {noticia.author} ·{" "}
            <time dateTime={noticia.publishedAt}>
              {formatarDataRelativa(noticia.publishedAt)}
            </time>
          </p>
        </div>
      </article>
    </NoticiaLink>
  )
}

/* ── Destaque secundário ── */

export function CardDestaque({noticia}: { noticia: News }) {
  return (
    <NoticiaLink slug={noticia.slug} className="h-full">
      <article
        className="flex overflow-hidden rounded"
        style={{
          background: "#fff",
          border: "1px solid var(--borda)",
          height: "100%",
          minHeight: 118,
        }}
      >
        {/* Imagem à esquerda */}
        <div className="relative shrink-0 w-[90px] sm:w-[110px]" style={{background: "#ddd"}}>
          {noticia.thumbnailUrl ? (
            <Image
              src={noticia.thumbnailUrl}
              alt={noticia.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              className="object-cover transition-transform duration-400 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0" style={{background: "var(--azul)"}}/>
          )}
        </div>

        {/* Texto à direita */}
        <div className="flex flex-col gap-1 p-3 min-w-0 flex-1">
          <Badge categoria={noticia.category.name}/>

          <h3
            className="group-hover:text-[var(--azul)] transition-colors line-clamp-3"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontWeight: 600,
              fontSize: "0.88rem",
              lineHeight: 1.3,
              color: "var(--texto)",
            }}
          >
            {noticia.title}
          </h3>

          <time
            dateTime={noticia.publishedAt}
            style={{fontSize: 11, color: "var(--cinza-medio)", marginTop: "auto"}}
          >
            {formatarDataRelativa(noticia.publishedAt)}
          </time>
        </div>
      </article>
    </NoticiaLink>
  )
}

/* ── Lista (com miniatura e número opcional) ── */

export function CardLista({noticia, index}: { noticia: News; index?: number }) {
  return (
    <NoticiaLink slug={noticia.slug}>
      <article
        className="flex items-start gap-2.5"
        style={{padding: "11px 0", borderBottom: "1px solid var(--borda)"}}
      >
        {index !== undefined && (
          <span
            className="shrink-0"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--borda)",
              lineHeight: 1,
              minWidth: 22,
              paddingTop: 2,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <div className="flex-1 min-w-0">
          <h3
            className="group-hover:text-[var(--azul)] transition-colors line-clamp-3"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontWeight: 600,
              fontSize: "0.88rem",
              lineHeight: 1.35,
              color: "var(--texto)",
            }}
          >
            {noticia.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-1">
            <Badge categoria={noticia.category.name}/>
            <time
              dateTime={noticia.publishedAt}
              style={{fontSize: 11, color: "var(--cinza-medio)"}}
            >
              {formatarDataRelativa(noticia.publishedAt)}
            </time>
          </div>
        </div>

        {noticia.thumbnailUrl && (
          <div className="relative shrink-0 overflow-hidden rounded-sm" style={{width: 68, height: 52}}>
            <Image src={noticia.thumbnailUrl} alt="" fill sizes="68px" className="object-cover"/>
          </div>
        )}
      </article>
    </NoticiaLink>
  )
}

/* ── Grid ── */

export function CardGrid({noticia}: { noticia: News }) {
  return (
    <NoticiaLink slug={noticia.slug}>
      <article
        className="overflow-hidden rounded"
        style={{background: "#fff", border: "1px solid var(--borda)"}}
      >
        <div className="relative" style={{aspectRatio: "16/9", background: "#ddd"}}>
          {noticia.thumbnailUrl ? (
            <Image
              src={noticia.thumbnailUrl}
              alt={noticia.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-400 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0" style={{background: "var(--azul)"}}/>
          )}
        </div>

        <div className="p-3">
          <Badge categoria={noticia.category.name}/>

          <h3
            className="group-hover:text-[var(--azul)] transition-colors line-clamp-3"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontWeight: 600,
              fontSize: "0.85rem",
              lineHeight: 1.35,
              marginTop: 6,
              color: "var(--texto)",
            }}
          >
            {noticia.title}
          </h3>

          <time
            dateTime={noticia.publishedAt}
            className="block mt-1"
            style={{fontSize: 11, color: "var(--cinza-medio)"}}
          >
            {formatarDataRelativa(noticia.publishedAt)}
          </time>
        </div>
      </article>
    </NoticiaLink>
  )
}
