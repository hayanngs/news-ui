// app/admin/perfil/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import AdminGuard from "@/components/admin/AdminGuard"
import { useAuth } from "@/lib/auth-context"
import {
  fetchMyProfile,
  updateMyProfile,
  changeMyPassword,
} from "@/lib/admin-api"
import {
  IconIdCard,
  IconLock,
  IconCheck,
  IconAlert,
} from "@/components/admin/Icons"

export default function AdminPerfilPage() {
  const { token, refreshUser } = useAuth()

  // ── Estado do formulário de perfil ──
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [biography, setBiography] = useState("")
  const [position, setPosition] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  // ── Estado do formulário de senha ──
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // ── Carregar perfil ──
  useEffect(() => {
    if (!token) return
    fetchMyProfile(token)
      .then((profile) => {
        setName(profile.name)
        setEmail(profile.email)
        setBiography(profile.biography || "")
        setPosition(profile.position || "")
        setPhotoUrl(profile.photoUrl || "")
      })
      .catch(() => setErrorMsg("Erro ao carregar perfil"))
      .finally(() => setLoading(false))
  }, [token])

  // ── Salvar perfil ──
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setSuccessMsg("")
    setErrorMsg("")
    setSaving(true)

    try {
      const updated = await updateMyProfile(token, {
        name,
        email,
        biography,
        position,
        photoUrl: photoUrl || undefined,
      })
      refreshUser(updated)
      setSuccessMsg("Perfil atualizado com sucesso!")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao salvar perfil")
    } finally {
      setSaving(false)
    }
  }

  // ── Alterar senha ──
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setPasswordSuccess("")
    setPasswordError("")

    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.")
      return
    }

    setSavingPassword(true)
    try {
      await changeMyPassword(token, { currentPassword, newPassword })
      setPasswordSuccess("Senha alterada com sucesso!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Erro ao alterar senha"
      )
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <AdminGuard>
      <h1 className="admin-page-title">Meu Perfil</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="admin-perfil-grid">
          {/* ── Coluna: Preview do perfil ── */}
          <div className="admin-perfil-preview">
            <div className="admin-perfil-card">
              <div className="admin-perfil-avatar-lg">
                {photoUrl ? (
                  <img src={photoUrl} alt={name} />
                ) : (
                  <div className="admin-perfil-avatar-placeholder">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3>{name || "Seu Nome"}</h3>
              {position && <span className="admin-profile-position">{position}</span>}
              <p className="admin-profile-email">{email}</p>
              {biography && (
                <p className="admin-perfil-bio-preview">{biography}</p>
              )}
            </div>
          </div>

          {/* ── Coluna: Formulários ── */}
          <div className="admin-perfil-forms">
            {/* Form: Dados do perfil */}
            <form onSubmit={handleSaveProfile} className="admin-perfil-section">
              <header className="admin-perfil-section-header">
                <div className="admin-perfil-section-icon">
                  <IconIdCard size={20} />
                </div>
                <div>
                  <h2>Informações Pessoais</h2>
                  <p>Atualize seus dados públicos e biografia.</p>
                </div>
              </header>

              <div className="admin-perfil-section-body">
                {successMsg && (
                  <div className="admin-alert admin-alert-success">
                    <IconCheck size={16} />
                    <span>{successMsg}</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="admin-alert admin-alert-error">
                    <IconAlert size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label htmlFor="prof-name">Nome completo</label>
                    <input
                      id="prof-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="prof-email">Email</label>
                    <input
                      id="prof-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="prof-position">Cargo / Função</label>
                    <input
                      id="prof-position"
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Ex: Repórter, Editora-chefe, Colunista"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="prof-photo">URL da Foto</label>
                    <input
                      id="prof-photo"
                      type="url"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://exemplo.com/sua-foto.jpg"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="prof-bio">Biografia</label>
                  <textarea
                    id="prof-bio"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Conte um pouco sobre você, sua experiência e áreas de cobertura..."
                    rows={5}
                  />
                </div>
              </div>

              <footer className="admin-perfil-section-footer">
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar Perfil"}
                </button>
              </footer>
            </form>

            {/* Form: Alterar senha */}
            <form onSubmit={handleChangePassword} className="admin-perfil-section">
              <header className="admin-perfil-section-header">
                <div className="admin-perfil-section-icon">
                  <IconLock size={20} />
                </div>
                <div>
                  <h2>Alterar Senha</h2>
                  <p>Mantenha sua conta segura com uma senha forte.</p>
                </div>
              </header>

              <div className="admin-perfil-section-body">
                {passwordSuccess && (
                  <div className="admin-alert admin-alert-success">
                    <IconCheck size={16} />
                    <span>{passwordSuccess}</span>
                  </div>
                )}
                {passwordError && (
                  <div className="admin-alert admin-alert-error">
                    <IconAlert size={16} />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="admin-form-group">
                  <label htmlFor="current-pw">Senha atual</label>
                  <input
                    id="current-pw"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label htmlFor="new-pw">Nova senha</label>
                    <input
                      id="new-pw"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="confirm-pw">Confirmar nova senha</label>
                    <input
                      id="confirm-pw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a nova senha"
                      required
                    />
                  </div>
                </div>
              </div>

              <footer className="admin-perfil-section-footer">
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={savingPassword}
                >
                  {savingPassword ? "Alterando..." : "Alterar Senha"}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </AdminGuard>
  )
}
