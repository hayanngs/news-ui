// components/admin/NewsEditor.tsx
"use client"

import React, {useState, useEffect, useMemo} from "react"
import dynamic from "next/dynamic"
import {useAuth} from "@/lib/auth-context"
import {Category, Tag, NewsFormData} from "@/types"
import {
  fetchCategories,
  fetchTags,
} from "@/lib/admin-api"
import {generateSlug} from "@/lib/utils"

// Importar React Quill dinamicamente (SSR não suportado)
const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false})
import "react-quill-new/dist/quill.snow.css"

interface NewsEditorProps {
  initialData?: Partial<NewsFormData>
  onSubmit: (data: NewsFormData) => Promise<void>
  submitLabel: string
}

const QUILL_MODULES = {
  toolbar: [
    [{header: [2, 3, false]}],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{list: "ordered"}, {list: "bullet"}],
    ["link", "image"],
    ["clean"],
  ],
}

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "link",
  "image",
]

export default function NewsEditor({
                                     initialData,
                                     onSubmit,
                                     submitLabel,
                                   }: NewsEditorProps) {
  const {token} = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [summary, setSummary] = useState(initialData?.summary || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnailUrl || ""
  )
  const [categorySlug, setCategorySlug] = useState(
    initialData?.categorySlug || ""
  )
  const [selectedTags, setSelectedTags] = useState<number[]>(
    initialData?.tagIds || []
  )
  const [author, setAuthor] = useState(initialData?.author || "")
  const [published, setPublished] = useState(
    initialData?.published ?? false
  )
  const [highlight, setHighlight] = useState(
    initialData?.highlight ?? false
  )
  const [slugManual, setSlugManual] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  // Carregar categorias e tags
  useEffect(() => {
    if (!token) return
    fetchCategories(token).then(setCategories).catch(console.error)
    fetchTags(token).then(setTags).catch(console.error)
  }, [token])

  // Auto-gerar slug quando o título muda (a menos que o slug tenha sido editado manualmente)
  useEffect(() => {
    if (!slugManual) {
      setSlug(generateSlug(title))
    }
  }, [title, slugManual])

  function handleSlugChange(value: string) {
    setSlugManual(true)
    setSlug(generateSlug(value))
  }

  function handleTagToggle(tagId: number) {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      await onSubmit({
        title,
        slug,
        summary,
        content,
        thumbnailUrl,
        categorySlug,
        tagIds: selectedTags,
        author,
        published,
        highlight,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-news-form">
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {/* Título */}
      <div className="admin-form-group">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da notícia"
          required
        />
      </div>

      {/* Slug */}
      <div className="admin-form-group">
        <label htmlFor="slug">
          Slug
          <small style={{fontWeight: 400, marginLeft: 8, color: "#999"}}>
            (gerado automaticamente, edite se necessário)
          </small>
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          placeholder="titulo-da-noticia"
          required
        />
      </div>

      {/* Resumo */}
      <div className="admin-form-group">
        <label htmlFor="summary">Resumo</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Breve resumo da notícia..."
          rows={3}
          required
        />
      </div>

      {/* Editor de conteúdo (HTML) */}
      <div className="admin-form-group">
        <label>Conteúdo</label>
        <div className="admin-editor-wrapper">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={QUILL_MODULES}
            formats={QUILL_FORMATS}
            placeholder="Escreva o conteúdo da notícia aqui..."
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div className="admin-form-group">
        <label htmlFor="thumbnailUrl">URL da Thumbnail</label>
        <input
          id="thumbnailUrl"
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Preview"
            className="admin-thumbnail-preview"
          />
        )}
      </div>

      {/* Categoria */}
      <div className="admin-form-group">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="admin-form-group">
        <label>Tags</label>
        <div className="admin-tags-grid">
          {tags.map((tag) => (
            <label key={tag.id} className="admin-tag-check">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
              />
              <span>{tag.name}</span>
            </label>
          ))}
          {tags.length === 0 && (
            <p style={{color: "#999", fontSize: 13}}>
              Nenhuma tag cadastrada.{" "}
              <a href="/admin/tags" style={{color: "var(--azul)"}}>
                Criar tags
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Autor */}
      <div className="admin-form-group">
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nome do autor"
          required
        />
      </div>

      {/* Opções */}
      <div className="admin-form-row">
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>Publicado</span>
        </label>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={highlight}
            onChange={(e) => setHighlight(e.target.checked)}
          />
          <span>Destaque</span>
        </label>
      </div>

      {/* Botão submit */}
      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={saving}
        >
          {saving ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  )
}
