// app/admin/tags/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import AdminGuard from "@/components/admin/AdminGuard"
import { useAuth } from "@/lib/auth-context"
import { Tag } from "@/types"
import { fetchTags, createTag, deleteTag } from "@/lib/admin-api"
import { generateSlug } from "@/lib/utils"
import { IconPlus, IconTrash } from "@/components/admin/Icons"


export default function AdminTagsPage() {
  const { token } = useAuth()
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token)
      return

    fetchTags(token)
      .then(setTags)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    setSlug(generateSlug(name))
  }, [name])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!token || !name.trim()) return
    setSaving(true)
    try {
      const newTag = await createTag(token, { name: name.trim(), slug })
      setTags((prev) => [...prev, newTag])
      setName("")
      setSlug("")
    } catch (err) {
      alert("Erro ao criar tag")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!token || !confirm("Excluir esta tag?")) return
    try {
      await deleteTag(token, id)
      setTags((prev) => prev.filter((t) => t.id !== id))
    } catch {
      alert("Erro ao excluir tag")
    }
  }

  return (
    <AdminGuard>
      <h1 className="admin-page-title">Tags</h1>

      {/* Formulário de criação */}
      <form onSubmit={handleCreate} className="admin-inline-form">
        <div className="admin-form-group">
          <label htmlFor="tagName">Nome da Tag</label>
          <input
            id="tagName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Meio Ambiente"
            required
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="tagSlug">Slug</label>
          <input
            id="tagSlug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="meio-ambiente"
            required
          />
        </div>
        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={saving}
        >
          <IconPlus size={16} />
          {saving ? "Criando..." : "Criar Tag"}
        </button>
      </form>

      {/* Lista de tags */}
      {loading ? (
        <p>Carregando...</p>
      ) : tags.length === 0 ? (
        <p className="admin-empty">Nenhuma tag cadastrada.</p>
      ) : (
        <div className="admin-tags-list">
          {tags.map((tag) => (
            <div key={tag.id} className="admin-tag-item">
              <div>
                <strong>{tag.name}</strong>
                <small>/{tag.slug}</small>
              </div>
              <button
                onClick={() => handleDelete(tag.id)}
                className="admin-btn admin-btn-sm admin-btn-danger"
              >
                <IconTrash size={14} />
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminGuard>
  )
}
