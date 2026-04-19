// app/admin/noticias/page.tsx
"use client"

import React, {useEffect, useState} from "react"
import Link from "next/link"
import AdminGuard from "@/components/admin/AdminGuard"
import {useAuth} from "@/lib/auth-context"
import {News} from "@/types"
import {fetchAdminNews, deleteNews} from "@/lib/admin-api"

export default function AdminNoticiasPage() {
  const { token } = useAuth()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token)
      return

    fetchAdminNews(token)
      .then(setNews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  async function handleDelete(id: string) {
    if (!token || !confirm("Tem certeza que deseja excluir esta notícia?"))
      return
    try {
      await deleteNews(token, id)
      setNews((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      alert("Erro ao excluir notícia")
    }
  }

  return (
    <AdminGuard>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Notícias</h1>
        <Link
          href="/admin/noticias/nova"
          className="admin-btn admin-btn-primary"
        >
          + Nova Notícia
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : news.length === 0 ? (
        <p className="admin-empty">Nenhuma notícia encontrada.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {news.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title}</strong>
                  <br/>
                  <small style={{color: "#999"}}>/{item.slug}</small>
                </td>
                <td>
                    <span
                      className="admin-cat-badge"
                      style={{
                        background: item.category.color || "#0E2D50",
                      }}
                    >
                      {item.category.name}
                    </span>
                </td>
                <td>{item.author}</td>
                <td>
                  {item.isPublished ? (
                    <span className="admin-status published">Publicado</span>
                  ) : (
                    <span className="admin-status draft">Não publicado</span>
                  )}
                  {item.isHighlight ? (
                    <span className="admin-status highlight">Destaque</span>
                  ) : (
                    <span className="admin-status highlight">Destaque</span>
                  )}
                </td>
                <td>
                  <div className="admin-actions">
                    <Link
                      href={`/admin/noticias/${item.id}`}
                      className="admin-btn admin-btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="admin-btn admin-btn-sm admin-btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminGuard>
  )
}
