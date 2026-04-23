// app/admin/noticias/[id]/page.tsx
"use client"

import React, {useEffect, useState, use} from "react"
import {useRouter} from "next/navigation"
import AdminGuard from "@/components/admin/AdminGuard"
import NewsEditor from "@/components/admin/NewsEditor"
import {useAuth} from "@/lib/auth-context"
import {fetchNewsById, updateNews} from "@/lib/admin-api"
import {News, NewsFormData} from "@/types"

export default function EditarNoticiaPage({
                                            params,
                                          }: {
  params: Promise<{ id: string }>
}) {
  const {id} = use(params)
  const {token} = useAuth()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token)
      return

    fetchNewsById(token, id)
      .then((data) => {
        console.log(data)
        setNews(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token, id])

  async function handleUpdate(data: NewsFormData) {
    if (!token) return
    await updateNews(token, id, data)
    router.push("/admin/noticias")
  }

  if (loading) {
    return (
      <AdminGuard>
        <p>Carregando...</p>
      </AdminGuard>
    )
  }

  if (!news) {
    return (
      <AdminGuard>
        <p>Notícia não encontrada.</p>
      </AdminGuard>
    )
  }

  return (
    <AdminGuard>
      <h1 className="admin-page-title">Editar Notícia</h1>
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
    </AdminGuard>
  )
}
