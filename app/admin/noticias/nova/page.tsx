// app/admin/noticias/nova/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminGuard from "@/components/admin/AdminGuard"
import NewsEditor from "@/components/admin/NewsEditor"
import { useAuth } from "@/lib/auth-context"
import { createNews } from "@/lib/admin-api"
import { NewsFormData } from "@/types"

export default function NovaNoticiaPage() {
  const { token } = useAuth()
  const router = useRouter()

  async function handleCreate(data: NewsFormData) {
    if (!token)
      return

    await createNews(token, data)
    router.push("/admin/noticias")
  }

  return (
    <AdminGuard>
      {/* Cabeçalho da página */}
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
            <span style={{ color: "var(--texto)" }}>Nova Notícia</span>
          </nav>

          <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Nova Notícia</h1>
          <p style={{ fontSize: 14, color: "var(--cinza-texto)", marginTop: 4 }}>
            Preencha os campos abaixo para publicar uma nova notícia.
          </p>
        </div>

        {/* Botão voltar */}
        <Link href="/admin/noticias" className="admin-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Voltar
        </Link>
      </div>

      <NewsEditor onSubmit={handleCreate} submitLabel="Publicar Notícia" />
    </AdminGuard>
  )
}
