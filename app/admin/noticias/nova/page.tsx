// app/admin/noticias/nova/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
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
      <h1 className="admin-page-title">Nova Notícia</h1>
      <NewsEditor onSubmit={handleCreate} submitLabel="Publicar Notícia" />
    </AdminGuard>
  )
}
