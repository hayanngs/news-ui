// app/admin/noticias/[id]/page.tsx
"use client"

import React, { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminGuard from "@/components/admin/AdminGuard"
import NewsEditor from "@/components/admin/NewsEditor"
import { useAuth } from "@/lib/auth-context"
import { fetchNewsById, updateNews } from "@/lib/admin-api"
import { News, NewsFormData } from "@/types"

// Skeleton do formulário enquanto carrega a notícia
function EditorSkeleton() {
  return (
    <div className="admin-news-form" style={{ pointerEvents: "none" }}>
      {[200, 120, 80, 320, 160, 80].map((width, i) => (
        <div key={i} className="admin-form-group">
          <div className="skeleton" style={{ height: 13, width: 80, borderRadius: 4, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: i === 3 ? 180 : 42, width: "100%", borderRadius: 8 }} />
        </div>
      ))}
    </div>
  )
}

export default function EditarNoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { token } = useAuth()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    if (!token) return
    fetchNewsById(token, id)
      .then(setNews)
      .catch(() => setErro(true))
      .finally(() => setLoading(false))
  }, [token, id])

  async function handleUpdate(data: NewsFormData) {
    if (!token) return
    await updateNews(token, id, data)
    router.push("/admin/noticias")
  }

  return (
    <AdminGuard>
      {/* Cabeçalho */}
      <div className="admin-page-header">
        <div>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--cinza-medio)", marginBottom: 8 }}>
            <Link href="/admin" style={{ color: "var(--cinza-medio)", textDecoration: "none" }}>
              Painel
            </Link>
            <span>/</span>
            <Link href="/admin/noticias" style={{ color: "var(--cinza-medio)", textDecoration: "none" }}>
              Notícias
            </Link>
            <span>/</span>
            <span style={{ color: "var(--texto)" }}>
              {loading ? "Carregando..." : news?.title ? truncate(news.title, 40) : "Editar Notícia"}
            </span>
          </nav>

          <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Editar Notícia</h1>
          {news && (
            <p style={{ fontSize: 14, color: "var(--cinza-texto)", marginTop: 4 }}>
              Última atualização:{" "}
              {news.updatedAt
                ? new Date(news.updatedAt).toLocaleDateString("pt-BR", {
                  day: "numeric", month: "long", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })
                : "—"}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {/* Visualizar no portal */}
          {news?.slug && (
            <a
              href={`/noticias/${news.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Ver no portal
            </a>
          )}

          {/* Voltar */}
          <Link href="/admin/noticias" className="admin-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Voltar
          </Link>
        </div>
      </div>

      {/* Conteúdo */}
      {loading && <EditorSkeleton />}

      {!loading && erro && (
        <div className="admin-alert admin-alert-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Não foi possível carregar a notícia. Verifique se ela existe ou tente novamente.
        </div>
      )}

      {!loading && !erro && !news && (
        <div className="admin-empty">
          Notícia não encontrada.{" "}
          <Link href="/admin/noticias" style={{ color: "var(--azul)" }}>
            Voltar para a lista
          </Link>
        </div>
      )}

      {!loading && news && (
        <NewsEditor
          initialData={{
            title: news.title,
            slug: news.slug,
            summary: news.summary,
            content: news.content,
            thumbnailUrl: news.thumbnailUrl,
            thumbnailCaption: news.thumbnailCaption,
            categorySlug: news.category.slug,
            tagIds: [],
            published: news.isPublished,
            highlight: news.isHighlight,
            editorial: news.isEditorial,
          }}
          onSubmit={handleUpdate}
          submitLabel="Salvar Alterações"
        />
      )}
    </AdminGuard>
  )
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + "…" : str
}
