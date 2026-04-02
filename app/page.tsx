import {
  getUltimasNoticias,
  getNoticiasPorCategoria,
  getNoticiasDestaque,
  getMaisLidas,
} from "@/lib/api"
import {CardLista, CardGrid, CardHero} from "@/components/CardNoticia"
import Link from "next/link"
import Image from "next/image"
import type {News} from "@/types"
import {BADGE_CLASSE} from "@/constants"
import {formatarDataRelativa} from "@/lib/utils"

/* ── Subcomponentes da página ── */

function CardDestaqueSec({noticia}: { noticia: News }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group block" style={{flex: 1, minWidth: 0}}>
      <article className="relative overflow-hidden rounded" style={{height: 185, background: "#1a1a2e"}}>
        {noticia.thumbnailUrl && (
          <Image
            src={noticia.thumbnailUrl}
            alt={noticia.title}
            fill
            className="object-cover opacity-[0.72] transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <span
            className={BADGE_CLASSE[noticia.category.name] || "badge"}
            style={{marginBottom: 6, display: "inline-block"}}
          >
            {noticia.category.name}
          </span>
          <h3
            className="group-hover:underline decoration-white underline-offset-2 line-clamp-3"
            style={{
              fontFamily: "var(--fonte-titulo)",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            {noticia.title}
          </h3>
          <p style={{color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 5}}>
            {noticia.author} ·{" "}
            <time dateTime={noticia.publishedAt}>
              {formatarDataRelativa(noticia.publishedAt)}
            </time>
          </p>
        </div>
      </article>
    </Link>
  )
}

function ArrowIcon({size = 12}: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function TituloSecao({
                       label,
                       href,
                       cor = "var(--azul)",
                     }: {
  label: string
  href?: string
  cor?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `3px solid ${cor}`,
        paddingBottom: 8,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: cor,
        }}
      >
        {label}
      </span>
      {href && (
        <Link
          href={href}
          style={{
            fontSize: 12,
            color: cor,
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
            opacity: 0.8,
          }}
        >
          Ver tudo
          <ArrowIcon/>
        </Link>
      )}
    </div>
  )
}

interface SecaoCategoria {
  readonly label: string
  readonly noticias: News[]
  readonly href: string
  readonly cor: string
}

const SECOES_CONFIG = [
  {label: "Política", slug: "politica", href: "/politica", cor: "var(--cat-politica)"},
  {label: "Economia", slug: "economia", href: "/economia", cor: "var(--cat-economia)"},
  {label: "Esporte", slug: "esporte", href: "/esporte", cor: "var(--cat-esporte)"},
  {label: "Entretenimento", slug: "entretenimento", href: "/entretenimento", cor: "var(--cat-entretenimento)"},
  {label: "Segurança", slug: "seguranca", href: "/seguranca", cor: "var(--cat-seguranca)"},
] as const

/* ── Página principal ── */

export default async function PaginaInicial() {
  const [destaques, {noticias: ultimas}, ...categorias] = await Promise.all([
    getNoticiasDestaque(),
    getUltimasNoticias(0, 20),
    ...SECOES_CONFIG.map((s) => getNoticiasPorCategoria(s.slug)),
  ])

  // Monta as seções com os dados carregados
  const secoes: SecaoCategoria[] = SECOES_CONFIG.map((config, i) => ({
    label: config.label,
    noticias: categorias[i],
    href: config.href,
    cor: config.cor,
  })).filter((s) => s.noticias.length > 0)

  const maisLidas = await getMaisLidas()
  const [hero, sec1, sec2] = destaques

  return (
    <div style={{background: "var(--fundo)", minHeight: "100vh"}}>
      <div className="w-portal" style={{paddingTop: 20, paddingBottom: 60}}>
        {/* ── BLOCO DE DESTAQUES ── */}
        {hero && (
          <section style={{marginBottom: 24}}>
            <div style={{display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6}}>
              <CardHero noticia={hero}/>
              <div style={{display: "flex", flexDirection: "column", gap: 6}}>
                {sec1 && <CardDestaqueSec noticia={sec1}/>}
                {sec2 && <CardDestaqueSec noticia={sec2}/>}
              </div>
            </div>
          </section>
        )}

        {/* ── LAYOUT: coluna principal + sidebar ── */}
        <div
          className="md:grid-cols-[1fr_300px]"
          style={{display: "grid", gap: 24, alignItems: "start"}}
        >
          {/* COLUNA PRINCIPAL */}
          <div>
            {/* MAIS NOTÍCIAS — grade */}
            <section style={{marginBottom: 24}}>
              <TituloSecao label="Mais notícias" href="/ultimas"/>
              <div className="grid-cols-2 md:grid-cols-3" style={{display: "grid", gap: 14}}>
                {ultimas.slice(0, 6).map((n, i) => (
                  <div key={n.id} className="fade-up" style={{animationDelay: `${i * 0.05}s`}}>
                    <CardGrid noticia={n}/>
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÕES POR CATEGORIA */}
            {secoes.map((secao) => (
              <section
                key={secao.label}
                style={{
                  background: "#fff",
                  border: "1px solid var(--borda)",
                  borderRadius: 4,
                  overflow: "hidden",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    background: secao.cor,
                    padding: "8px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#fff",
                    }}
                  >
                    {secao.label}
                  </span>
                  <Link
                    href={secao.href}
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    Ver tudo
                    <ArrowIcon size={11}/>
                  </Link>
                </div>

                {secao.noticias[0] && (
                  <div style={{padding: "14px 18px 0"}}>
                    <CardHero noticia={secao.noticias[0]}/>
                  </div>
                )}

                <div style={{padding: "0 18px"}}>
                  {secao.noticias.slice(1, 4).map((n) => (
                    <CardLista key={n.id} noticia={n}/>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── SIDEBAR ── */}
          <aside style={{position: "sticky", top: 150}}>
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--borda)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "var(--azul)",
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fff",
                }}
              >
                Mais lidas
              </div>
              <div style={{padding: "0 14px"}}>
                {maisLidas.map((n, i) => (
                  <CardLista key={n.id} noticia={n} index={i}/>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
