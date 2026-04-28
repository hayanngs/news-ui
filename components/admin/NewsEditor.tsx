// components/admin/NewsEditor.tsx
"use client"

import React, {useState, useEffect, useRef, useCallback} from "react"
import dynamic from "next/dynamic"
import {useAuth} from "@/lib/auth-context"
import {Category, Tag, NewsFormData} from "@/types"
import {fetchCategories, fetchTags, uploadImage} from "@/lib/admin-api"
import {generateSlug} from "@/lib/utils"

interface ReactQuillProps {
  ref?: (instance: any) => void
}

const ReactQuill = dynamic(
  async () => {
    const {default: RQ} = await import("react-quill-new")
    const Quill = (await import("quill")).default
    const {FigureBlot} = await import("@/lib/quill-figure-blot")
    Quill.register(FigureBlot, true)
    return RQ
  },
  {ssr: false}
) as any  // <-- evita o conflito de tipagem do ref com dynamic()

import "react-quill-new/dist/quill.snow.css"

interface NewsEditorProps {
  initialData?: Partial<NewsFormData>
  onSubmit: (data: NewsFormData) => Promise<void>
  submitLabel: string
}

interface FigureModalProps {
  token: string | null
  onConfirm: (url: string, caption: string) => void
  onClose: () => void
}

function FigureModal({token, onConfirm, onClose}: FigureModalProps) {
  const [url, setUrl] = useState("")
  const [caption, setCaption] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !token) return
    setUploading(true)
    try {
      const {key} = await uploadImage(token, file)
      setUrl(`https://media.diariogoiano.com.br/${key}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.45)", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 10, padding: 28,
          width: 480, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{fontFamily: "var(--fonte-titulo)", marginBottom: 20}}>
          Inserir imagem com legenda
        </h3>

        <div className="admin-form-group">
          <label>Upload</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} disabled={uploading}/>
          {uploading && <small style={{color: "var(--cinza-texto)"}}>Enviando…</small>}
        </div>

        <div className="admin-form-group">
          <label>Ou cole a URL</label>
          <input
            type="url"
            className="admin-input-inline"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>

        {url && (
          <img
            src={url}
            alt="preview"
            style={{width: "100%", borderRadius: 6, marginBottom: 16, maxHeight: 200, objectFit: "cover"}}
          />
        )}

        <div className="admin-form-group">
          <label>Legenda / Fonte</label>
          <input
            type="text"
            className="admin-input-inline"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Ex: Foto: Agência Brasil"
          />
        </div>

        <div style={{display: "flex", gap: 10, justifyContent: "flex-end"}}>
          <button className="admin-btn" onClick={onClose}>Cancelar</button>
          <button
            className="admin-btn admin-btn-primary"
            disabled={!url}
            onClick={() => {
              onConfirm(url, caption)
              onClose()
            }}
          >
            Inserir
          </button>
        </div>
      </div>
    </div>
  )
}

function sanitizeHtmlContent(html: string): string {
  return html
    .replace(/\r\n|\r|\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\u00A0/g, " ")
    .trim()
}

export default function NewsEditor({initialData, onSubmit, submitLabel}: NewsEditorProps) {
  const {token} = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [summary, setSummary] = useState(initialData?.summary || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl || "")
  const [thumbnailCaption, setThumbnailCaption] = useState(initialData?.thumbnailCaption || "")
  const [categorySlug, setCategorySlug] = useState(initialData?.categorySlug || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tagIds || [])
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [highlight, setHighlight] = useState(initialData?.highlight ?? false)
  const [editorial, setEditorial] = useState(initialData?.editorial ?? false)
  const [slugManual, setSlugManual] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [showFigureModal, setShowFigureModal] = useState(false)

  // useRef<any> + callback ref para contornar limitação de tipagem do dynamic()
  const quillInstanceRef = useRef<any>(null)
  const refCallback = useCallback((instance: any) => {
    quillInstanceRef.current = instance
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!token) return
    fetchCategories(token).then(setCategories).catch(console.error)
    fetchTags(token).then(setTags).catch(console.error)
  }, [token])

  useEffect(() => {
    if (!slugManual) setSlug(generateSlug(title))
  }, [title, slugManual])

  const insertFigure = useCallback((url: string, caption: string) => {
    const editor = quillInstanceRef.current?.getEditor()
    if (!editor) return
    const range = editor.getSelection(true)
    editor.insertEmbed(range.index, "figure", {url, caption}, "user")
    editor.setSelection(range.index + 1, 0)
  }, [])

  const QUILL_MODULES = {
    toolbar: {
      container: [
        [{header: [2, 3, false]}],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{list: "ordered"}, {list: "bullet"}],
        ["link"],
        ["figure-with-caption"],
        ["clean"],
      ],
      handlers: {
        "figure-with-caption": () => setShowFigureModal(true),
      },
    },
  }

  const QUILL_FORMATS = [
    "header", "bold", "italic", "underline", "strike",
    "blockquote", "list", "link", "figure",
  ]

  function handleSlugChange(value: string) {
    setSlugManual(true)
    setSlug(generateSlug(value))
  }

  function handleTagToggle(id: string) {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !token) return
    setUploading(true)
    setError("")
    try {
      const {key} = await uploadImage(token, file)
      setThumbnailUrl(`https://media.diariogoiano.com.br/${key}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer upload")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      await onSubmit({
        title, slug, summary,
        content: sanitizeHtmlContent(content),
        thumbnailUrl, thumbnailCaption,
        categorySlug, tagIds: selectedTags,
        published, highlight, editorial,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {showFigureModal && (
        <FigureModal
          token={token}
          onConfirm={insertFigure}
          onClose={() => setShowFigureModal(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="admin-news-form">
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        {/* — Título — */}
        <div className="admin-form-group">
          <label htmlFor="title">Título</label>
          <input id="title" type="text" value={title}
                 onChange={e => setTitle(e.target.value)}
                 placeholder="Título da notícia" required/>
        </div>

        {/* — Slug — */}
        <div className="admin-form-group">
          <label htmlFor="slug">
            Slug
            <small style={{fontWeight: 400, marginLeft: 8, color: "#999"}}>
              (gerado automaticamente)
            </small>
          </label>
          <input id="slug" type="text" value={slug}
                 onChange={e => handleSlugChange(e.target.value)}
                 placeholder="titulo-da-noticia" required/>
        </div>

        {/* — Resumo — */}
        <div className="admin-form-group">
          <label htmlFor="summary">Resumo</label>
          <textarea id="summary" value={summary}
                    onChange={e => setSummary(e.target.value)}
                    placeholder="Breve resumo da notícia…" rows={3} required/>
        </div>

        {/* — Conteúdo — */}
        <div className="admin-form-group">
          <label>Conteúdo</label>
          <div className="admin-editor-wrapper">
            <ReactQuill
              ref={refCallback}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={QUILL_MODULES}
              formats={QUILL_FORMATS}
              placeholder="Escreva o conteúdo da notícia aqui…"
            />
          </div>
          <small style={{color: "var(--cinza-texto)", fontSize: 12, marginTop: 4, display: "block"}}>
            Use o botão <strong>🖼</strong> na toolbar para inserir imagem com legenda.
          </small>
        </div>

        {/* — Thumbnail — */}
        <div className="admin-form-group">
          <label>Thumbnail</label>
          <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 8}}>
            <input ref={fileInputRef} type="file" accept="image/*"
                   onChange={handleThumbnailUpload} disabled={uploading} style={{flex: 1}}/>
            {uploading && <small style={{color: "var(--cinza-texto)"}}>Enviando…</small>}
          </div>
          <input type="url" value={thumbnailUrl}
                 onChange={e => setThumbnailUrl(e.target.value)}
                 placeholder="Ou cole a URL da imagem" style={{marginBottom: 8}}/>
          <input type="text" value={thumbnailCaption}
                 onChange={e => setThumbnailCaption(e.target.value)}
                 placeholder="Legenda / fonte (ex: Foto: Agência Brasil)"/>
          {thumbnailUrl && (
            <figure style={{marginTop: 10}}>
              <img src={thumbnailUrl} alt="Preview" className="admin-thumbnail-preview"/>
              {thumbnailCaption && (
                <figcaption style={{fontSize: 12, color: "var(--cinza-texto)", marginTop: 4}}>
                  {thumbnailCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>

        {/* — Categoria — */}
        <div className="admin-form-group">
          <label htmlFor="category">Categoria</label>
          <select id="category" value={categorySlug}
                  onChange={e => setCategorySlug(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* — Tags — */}
        <div className="admin-form-group">
          <label>Tags</label>
          <div className="admin-tags-grid">
            {tags.map(tag => (
              <label key={tag.id} className="admin-tag-check">
                <input type="checkbox"
                       checked={selectedTags.includes(tag.id)}
                       onChange={() => handleTagToggle(tag.id)}/>
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* — Opções — */}
        <div className="admin-form-row">
          {[
            {label: "Publicado", val: published, set: setPublished},
            {label: "Destaque", val: highlight, set: setHighlight},
            {label: "Redação", val: editorial, set: setEditorial},
          ].map(({label, val, set}) => (
            <label key={label} className="admin-checkbox">
              <input type="checkbox" checked={val} onChange={e => set(e.target.checked)}/>
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary"
                  disabled={saving || uploading}>
            {saving ? "Salvando…" : submitLabel}
          </button>
        </div>
      </form>
    </>
  )
}
